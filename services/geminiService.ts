
import { GoogleGenAI, ThinkingLevel, Type } from "@google/genai";
import { PASSENGER_PROFILES } from "@/src/data/passengerProfiles";
import AddressManager from "@/src/services/addressManager";

// Cache de Rotas OSRM - Versão 6 (Limpa caches antigos de linhas retas)
const CACHE_KEY = 'UBER_V6_ROUTE_CACHE_FIXED';
const ROUTE_CACHE: Record<string, any> = (() => {
  try {
    const saved = localStorage.getItem(CACHE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    return {};
  }
})();

export const getCachedRoute = (key: string) => {
  return ROUTE_CACHE[key];
};

export const setCachedRoute = (key: string, data: any) => {
  // NUNCA salvar rotas mockadas/retas no cache persistente
  if (!data || data.isMock) return;
  
  ROUTE_CACHE[key] = data;
  try {
    const keys = Object.keys(ROUTE_CACHE);
    if (keys.length > 150) {
      delete ROUTE_CACHE[keys[0]];
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(ROUTE_CACHE));
  } catch (e) {
    console.warn("Erro ao salvar cache de rotas:", e);
  }
};
// Lista ampliada e otimizada de mirrors do OSRM
const OSRM_ENDPOINTS = [
  "https://router.project-osrm.org/route/v1/driving/",
  "https://routing.openstreetmap.de/routed-car/route/v1/driving/",
  "https://osrm.map.ir/route/v1/driving/",
  "https://routing.openstreetmap.de/routed-bike/route/v1/driving/",
  "https://routing.openstreetmap.de/routed-foot/route/v1/driving/",
  "https://router.project-osrm.org/route/v1/driving/"
];

let currentEndpointIndex = 0;

const getNextEndpoint = () => {
  const endpoint = OSRM_ENDPOINTS[currentEndpointIndex];
  currentEndpointIndex = (currentEndpointIndex + 1) % OSRM_ENDPOINTS.length;
  return endpoint;
};

/**
 * Tenta buscar a rota em múltiplos mirrors com timeout e retentativas inteligentes
 */
export const fetchRouteFromOSRM = async (pickup: [number, number], destination: [number, number], retries = 4): Promise<any> => {
  const pickupStr = `${pickup[1]},${pickup[0]}`;
  const destStr = `${destination[1]},${destination[0]}`;
  
  for (let i = 0; i <= retries; i++) {
    const baseUrl = getNextEndpoint();
    const url = `${baseUrl}${pickupStr};${destStr}?overview=full&geometries=geojson&steps=true`;
    
    try {
      // Timeout aumentado para 8s para dar chance a conexões lentas
      const response = await withTimeout(fetch(url), 8000, null);
      
      if (response && response.ok) {
        const data = await response.json();
        if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
          const geometry = data.routes[0].geometry;
          // Verifica se a geometria é válida e tem pontos suficientes para não ser uma linha reta
          // Aumentado para 10 pontos para garantir que siga ruas
          if (geometry && geometry.coordinates && geometry.coordinates.length > 10) {
            return geometry;
          }
          console.warn(`[OSRM] Rota muito simples (${geometry?.coordinates?.length} pontos). Tentando outro mirror...`);
        }
      }
    } catch (e) {
      console.error(`[OSRM] Falha no mirror ${baseUrl} (Tentativa ${i+1})`);
    }
    
    // Delay exponencial curto entre tentativas
    await new Promise(r => setTimeout(r, 200 * (i + 1)));
  }
  
  return null;
};

/**
 * ESTRATÉGIA AGRESSIVA: Usa a Inteligência Artificial para "desenhar" a rota seguindo as ruas
 * reais da cidade quando o OSRM está fora do ar.
 */
export const fetchRouteFromAI = async (pickup: string, destination: string, city: string): Promise<any> => {
  console.log(`[🤖 AI Route] OSRM falhou. Solicitando rota inteligente para Gemini em ${city}...`);
  const key = process.env.GEMINI_API_KEY || (window as any).process?.env?.API_KEY;
  if (!key) return null;

  try {
    const ai = new GoogleGenAI({ apiKey: key });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Você é um motor de roteamento GPS de altíssima precisão.
      Cidade: ${city}, Brasil.
      Origem: ${pickup}
      Destino: ${destination}

      Sua tarefa: Trace o caminho exato seguindo as ruas reais. 
      REGRAS CRÍTICAS:
      1. A rota deve ser SUAVE e seguir o eixo das vias.
      2. NUNCA gere zigue-zagues ou ruído nas coordenadas.
      3. Siga o traçado real das ruas e avenidas de ${city}.
      4. Retorne um JSON com a lista de coordenadas [[lat, lng], ...] que formam o caminho.
      5. Gere entre 30 e 50 pontos para uma linha limpa e profissional.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            coordinates: {
              type: Type.ARRAY,
              items: {
                type: Type.ARRAY,
                items: { type: Type.NUMBER },
                description: "[latitude, longitude]"
              }
            }
          },
          required: ["coordinates"]
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      if (data.coordinates && Array.isArray(data.coordinates) && data.coordinates.length > 10) {
        console.log(`[🤖 AI Route] Rota gerada pela IA com ${data.coordinates.length} pontos.`);
        return {
          type: "LineString",
          coordinates: data.coordinates.map((c: any) => [c[1], c[0]])
        };
      }
    }
  } catch (e) {
    console.error("[🤖 AI Route] Erro crítico na IA:", e);
  }
  return null;
};

/**
 * Gera uma rota mockada de última instância (Multi-Step Manhattan Style)
 * Simula múltiplas curvas em 90 graus para parecer que segue quarteirões reais.
 */
export const generateMockRoute = (pickup: [number, number], destination: [number, number]) => {
  const points = [];
  const segments = 6; 
  const pointsPerSegment = 8;
  
  const startLat = pickup[0];
  const startLng = pickup[1];
  const endLat = destination[0];
  const endLng = destination[1];

  points.push([startLng, startLat]);

  let currentLat = startLat;
  let currentLng = startLng;

  for (let s = 0; s < segments; s++) {
    const isLast = s === segments - 1;
    const targetLat = isLast ? endLat : startLat + (endLat - startLat) * ((s + 1) / segments);
    const targetLng = isLast ? endLng : startLng + (endLng - startLng) * ((s + 1) / segments);

    const latFirst = (s % 2 === 0);
    
    if (latFirst) {
      // Mover Lat (Sem jitter para evitar zigue-zague estranho)
      for (let i = 1; i <= pointsPerSegment / 2; i++) {
        const t = i / (pointsPerSegment / 2);
        const lat = currentLat + (targetLat - currentLat) * t;
        points.push([currentLng, lat]);
      }
      currentLat = targetLat;

      // Mover Lng
      for (let i = 1; i <= pointsPerSegment / 2; i++) {
        const t = i / (pointsPerSegment / 2);
        const lng = currentLng + (targetLng - currentLng) * t;
        points.push([lng, currentLat]);
      }
      currentLng = targetLng;
    } else {
      // Mover Lng
      for (let i = 1; i <= pointsPerSegment / 2; i++) {
        const t = i / (pointsPerSegment / 2);
        const lng = currentLng + (targetLng - currentLng) * t;
        points.push([lng, currentLat]);
      }
      currentLng = targetLng;

      // Mover Lat
      for (let i = 1; i <= pointsPerSegment / 2; i++) {
        const t = i / (pointsPerSegment / 2);
        const lat = currentLat + (targetLat - currentLat) * t;
        points.push([currentLng, lat]);
      }
      currentLat = targetLat;
    }
  }
  
  points[points.length - 1] = [endLng, endLat];

  return {
    type: "LineString",
    coordinates: points,
    isMock: true
  };
};

/**
 * Helper para timeout em promessas
 */
const withTimeout = <T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms))
  ]);
};

/**
 * Função principal de geração de viagens
 */
export const generateTripRequest = async (city: string, tripType: string = 'UberX', forcedIndex?: number, driverCoords?: [number, number]) => {
  const timestamp = Date.now();
  const cityNormalized = city.trim();
  
  // Se forcedIndex for fornecido, usa ele (sem incrementar o ciclo global)
  // Caso contrário, incrementa e pega o próximo
  const cycleIndex = forcedIndex !== undefined ? forcedIndex : AddressManager.getNextIndex(cityNormalized);
  const cityAddresses = await AddressManager.getAddressesForCity(cityNormalized);
  
  // Garante que pegamos um dos 5 endereços (ou o que estiver disponível)
  const realAddr = cityAddresses[cycleIndex % cityAddresses.length];

  const passenger = PASSENGER_PROFILES[cycleIndex];
  
  const pickupAddress = realAddr.pickup.address;
  const destinationAddress = realAddr.destination.address;
  const pickupCoords = [realAddr.pickup.lat, realAddr.pickup.lng] as [number, number];
  const destinationCoords = [realAddr.destination.lat, realAddr.destination.lng] as [number, number];

  // 4. Busca de Rota com Hierarquia de Falha
  let routeGeometry = null;
  const routeKey = `${pickupCoords[0].toFixed(4)},${pickupCoords[1].toFixed(4)}|${destinationCoords[0].toFixed(4)},${destinationCoords[1].toFixed(4)}`;
  
  const cached = getCachedRoute(routeKey);
  if (cached) {
    routeGeometry = cached;
  } else {
    // 1ª Tentativa: OSRM Mirrors
    routeGeometry = await fetchRouteFromOSRM(pickupCoords, destinationCoords);
    
    // 2ª Tentativa (Agressiva): Gemini AI gerando rota pelas ruas
    if (!routeGeometry) {
      routeGeometry = await fetchRouteFromAI(pickupAddress, destinationAddress, cityNormalized);
    }
    
    if (routeGeometry) {
      setCachedRoute(routeKey, routeGeometry);
    } else {
      // Último recurso: Mock visual
      routeGeometry = generateMockRoute(pickupCoords, destinationCoords);
    }
  }

  // 5. Cálculos de Preço e Distância
  const basePrice = 15 + (cycleIndex * 8) + Math.random() * 5;
  const tripDistNum = 5 + (cycleIndex * 3);
  const tripDurNum = Math.floor(tripDistNum * 2.2);

  return {
    id: `TRIP-${city.substring(0,3).toUpperCase()}-${timestamp}-${cycleIndex + 1}`,
    passengerName: passenger.name.split(' ')[0],
    fullName: passenger.name,
    rating: passenger.rating,
    ratingCount: passenger.trips,
    passengerImage: passenger.image,
    passengerBio: passenger.bio,
    passengerJoined: passenger.joinedDate,
    distanceToPickup: `${(0.8 + cycleIndex * 0.5).toFixed(1)} km`,
    timeToPickup: `${3 + cycleIndex} min`,
    tripDistance: `${tripDistNum.toFixed(1)} km`,
    duration: `${tripDurNum} min`,
    price: basePrice,
    surgePrice: 1.0 + (cycleIndex * 0.1),
    pickup: pickupAddress,
    destination: destinationAddress,
    pickupCoords,
    destinationCoords,
    routeGeometry,
    type: tripType,
    timestamp,
    cycleIndex: cycleIndex + 1
  };
};

/**
 * Gera uma viagem instantânea (Fallback de emergência)
 */
export const generateInstantMockTrip = async (city: string, tripType: string = 'UberX') => {
  const timestamp = Date.now();
  const cityNormalized = city.trim();
  const cycleIndex = AddressManager.getCurrentIndex(cityNormalized);
  const passenger = PASSENGER_PROFILES[cycleIndex];
  
  const cityAddresses = await AddressManager.getAddressesForCity(cityNormalized);
  const realAddr = cityAddresses[cycleIndex % cityAddresses.length];

  return {
    id: `TRIP-MOCK-${timestamp}-${cycleIndex + 1}`,
    passengerName: passenger.name.split(' ')[0],
    fullName: passenger.name,
    rating: passenger.rating,
    ratingCount: passenger.trips,
    passengerImage: passenger.image,
    passengerBio: passenger.bio,
    passengerJoined: passenger.joinedDate,
    distanceToPickup: "1.2 km",
    timeToPickup: "4 min",
    tripDistance: "8.5 km",
    duration: "18 min",
    price: 25.50,
    surgePrice: 1.0,
    pickup: realAddr.pickup.address,
    destination: realAddr.destination.address,
    pickupCoords: [realAddr.pickup.lat, realAddr.pickup.lng],
    destinationCoords: [realAddr.destination.lat, realAddr.destination.lng],
    routeGeometry: generateMockRoute([realAddr.pickup.lat, realAddr.pickup.lng], [realAddr.destination.lat, realAddr.destination.lng]),
    type: tripType,
    timestamp,
    cycleIndex: cycleIndex + 1
  };
};

/**
 * Pre-carrega os dados da cidade e as 5 rotas do ciclo para latência zero
 * Agora de forma SEQUENCIAL e com rotação de mirrors para evitar 429.
 */
export const preloadCityData = async (city: string) => {
  console.log(`[🚀 Preload] Iniciando pré-carregamento para: ${city}`);
  const cityAddresses = await AddressManager.getAddressesForCity(city);
  
  if (!cityAddresses || cityAddresses.length === 0) {
    console.warn(`[🚀 Preload] Nenhum endereço encontrado para ${city}`);
    return;
  }

  // Execução SEQUENCIAL para evitar 429 (Too Many Requests)
  for (let i = 0; i < cityAddresses.length; i++) {
    const addr = cityAddresses[i];
    const pCoords: [number, number] = [addr.pickup.lat, addr.pickup.lng];
    const dCoords: [number, number] = [addr.destination.lat, addr.destination.lng];
    const routeKey = `${pCoords[0].toFixed(4)},${pCoords[1].toFixed(4)}|${dCoords[0].toFixed(4)},${dCoords[1].toFixed(4)}`;
    
    // Se já estiver no cache, pula
    if (getCachedRoute(routeKey)) continue;

    try {
      console.log(`[🚀 Preload] Carregando rota ${i + 1}/5 para ${city}...`);
      let routeGeometry = await fetchRouteFromOSRM(pCoords, dCoords);
      
      if (!routeGeometry) {
        console.log(`[🚀 Preload] OSRM falhou para rota ${i + 1}. Tentando IA...`);
        routeGeometry = await fetchRouteFromAI(addr.pickup.address, addr.destination.address, city);
      }

      if (routeGeometry) {
        setCachedRoute(routeKey, routeGeometry);
        console.log(`[🚀 Preload] Rota ${i + 1} salva no cache.`);
      } else {
        // Se falhar tudo, não cacheia mock no preload para permitir tentativa real depois
        console.log(`[🚀 Preload] Rota ${i + 1} falhou totalmente (OSRM + IA).`);
      }
      
      // Delay de 1.2s entre requisições de preload para ser mais "educado" com a API
      await new Promise(r => setTimeout(r, 1200));
    } catch (e) {
      console.warn(`[🚀 Preload] Falha ao pré-carregar rota ${i + 1}:`, e);
    }
  }
  
  console.log(`[🚀 Preload] Finalizado para ${city}.`);
};

export const cacheRoute = async (pCoords: [number, number], dCoords: [number, number], pickupAddr?: string, destAddr?: string, city?: string) => {
  const routeKey = `${pCoords[0].toFixed(4)},${pCoords[1].toFixed(4)}|${dCoords[0].toFixed(4)},${dCoords[1].toFixed(4)}`;
  if (!getCachedRoute(routeKey)) {
    let routeGeometry = await fetchRouteFromOSRM(pCoords, dCoords);
    
    if (!routeGeometry && pickupAddr && destAddr && city) {
      routeGeometry = await fetchRouteFromAI(pickupAddr, destAddr, city);
    }

    if (routeGeometry) {
      setCachedRoute(routeKey, routeGeometry);
    }
  }
};

export const getDriverAdvice = async (query: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: "Você é um assistente virtual para motoristas da Uber. Forneça respostas curtas, úteis e profissionais em português.",
      }
    });
    return response.text || "Desculpe, não consegui processar sua solicitação.";
  } catch (error) {
    return "Estou com dificuldades de conexão, mas posso te ajudar com o que está salvo localmente.";
  }
};

export const getCityCoords = async (city: string): Promise<[number, number]> => {
  return await AddressManager.getCityCoords(city);
};
