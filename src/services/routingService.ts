
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Motor de Roteamento Inteligente (V6)
 * Substitui o OSRM instável por uma solução híbrida:
 * 1. Gemini AI Routing (Primário) - Gera caminhos realistas baseados em conhecimento urbano.
 * 2. OSRM Mirror (Secundário) - Fallback se o Gemini falhar.
 * 3. Fallback Determinístico - Garante que o app nunca fique sem rota.
 */

const OSRM_MIRRORS = [
  "https://routing.openstreetmap.de/routed-car/route/v1/driving/",
  "https://router.project-osrm.org/route/v1/driving/"
];

class RoutingService {
  private static ROUTE_CACHE: Record<string, any> = {};

  /**
   * Obtém uma rota entre dois pontos.
   */
  public static async getRoute(
    city: string,
    pickup: [number, number],
    destination: [number, number]
  ): Promise<any> {
    const cacheKey = `${pickup[0].toFixed(5)},${pickup[1].toFixed(5)}|${destination[0].toFixed(5)},${destination[1].toFixed(5)}`;
    
    if (this.ROUTE_CACHE[cacheKey]) {
      console.log(`[Routing] Usando rota do cache para ${city}`);
      return this.ROUTE_CACHE[cacheKey];
    }

    console.log(`[Routing] Iniciando busca de rota para ${city}...`);

    // 1. Tentar Gemini AI Routing (O "Motor Ilimitado e Grátis") - Agora como PRIMÁRIO
    try {
      const aiRoute = await this.fetchGeminiRoute(city, pickup, destination);
      if (aiRoute) {
        console.log(`[Routing] Rota gerada com sucesso via Gemini AI para ${city}`);
        this.ROUTE_CACHE[cacheKey] = aiRoute;
        return aiRoute;
      }
    } catch (e) {
      console.warn("[Routing] Falha no Gemini Routing, tentando OSRM Mirror...", e);
    }

    // 2. Tentar OSRM Mirror (Fallback Secundário)
    try {
      const osrmRoute = await this.fetchOSRM(pickup, destination);
      if (osrmRoute) {
        console.log(`[Routing] Rota obtida via OSRM Mirror para ${city}`);
        this.ROUTE_CACHE[cacheKey] = osrmRoute;
        return osrmRoute;
      }
    } catch (e) {
      console.warn("[Routing] Falha no OSRM Mirror, usando fallback determinístico.", e);
    }

    // 3. Fallback Determinístico (Linha reta com "curvas" simuladas)
    console.log(`[Routing] Usando fallback determinístico para ${city}`);
    const fallback = this.generateFallbackRoute(pickup, destination);
    this.ROUTE_CACHE[cacheKey] = fallback;
    return fallback;
  }

  /**
   * Busca rota em espelhos OSRM com timeout.
   */
  private static async fetchOSRM(p: [number, number], d: [number, number]): Promise<any | null> {
    for (const baseUrl of OSRM_MIRRORS) {
      try {
        const url = `${baseUrl}${p[1]},${p[0]};${d[1]},${d[0]}?overview=full&geometries=geojson`;
        
        // Adiciona timeout de 5 segundos para evitar travamentos
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
            return data.routes[0].geometry;
          }
        }
      } catch (e) {
        console.warn(`[Routing] Erro ao acessar mirror OSRM ${baseUrl}:`, e);
        continue;
      }
    }
    return null;
  }

  /**
   * Usa a inteligência do Gemini para "alucinar" uma rota realista seguindo ruas.
   */
  private static async fetchGeminiRoute(city: string, p: [number, number], d: [number, number]): Promise<any | null> {
    const key = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!key) {
      console.warn("[Routing] Gemini API Key não encontrada.");
      return null;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: key });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Você é um motor de roteamento GPS de alta precisão especializado em cidades brasileiras. 
        Na cidade de ${city}, Brasil, trace uma rota realista e detalhada entre:
        Ponto de Partida (Lat, Lng): [${p[0]}, ${p[1]}]
        Ponto de Destino (Lat, Lng): [${d[0]}, ${d[1]}]
        
        REGRAS:
        1. A rota deve seguir as ruas reais da cidade de ${city}.
        2. Retorne um JSON contendo uma lista de coordenadas [[lat, lng], [lat, lng], ...] que formam o caminho.
        3. A rota deve ter entre 20 e 40 pontos para ser suave e realista.
        4. Certifique-se de que o primeiro ponto é exatamente a partida e o último é exatamente o destino.`,
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
                  description: "[lat, lng]"
                }
              }
            },
            required: ["coordinates"]
          }
        }
      });

      if (response.text) {
        const data = JSON.parse(response.text);
        if (data.coordinates && Array.isArray(data.coordinates) && data.coordinates.length > 0) {
          console.log(`[Routing] Gemini retornou ${data.coordinates.length} pontos para a rota.`);
          // Converter para formato GeoJSON esperado pelo Leaflet: [lng, lat]
          return {
            type: "LineString",
            coordinates: data.coordinates.map((c: any) => [c[1], c[0]])
          };
        }
      }
    } catch (e) {
      console.error("[Routing] Erro crítico no Gemini Route:", e);
    }
    return null;
  }

  /**
   * Gera uma rota simulada se tudo falhar.
   */
  private static generateFallbackRoute(p: [number, number], d: [number, number]): any {
    const points = [];
    const segments = 8;
    const pointsPerSegment = 12;
    
    const startLat = p[0];
    const startLng = p[1];
    const endLat = d[0];
    const endLng = d[1];

    points.push([startLng, startLat]);

    let currentLat = startLat;
    let currentLng = startLng;

    for (let s = 0; s < segments; s++) {
      const isLast = s === segments - 1;
      const targetLat = isLast ? endLat : startLat + (endLat - startLat) * ((s + 1) / segments);
      const targetLng = isLast ? endLng : startLng + (endLng - startLng) * ((s + 1) / segments);

      const latFirst = (s % 2 === 0);
      
      if (latFirst) {
        for (let i = 1; i <= pointsPerSegment / 2; i++) {
          const t = i / (pointsPerSegment / 2);
          const lat = currentLat + (targetLat - currentLat) * t;
          points.push([currentLng, lat]);
        }
        currentLat = targetLat;
        for (let i = 1; i <= pointsPerSegment / 2; i++) {
          const t = i / (pointsPerSegment / 2);
          const lng = currentLng + (targetLng - currentLng) * t;
          points.push([lng, currentLat]);
        }
        currentLng = targetLng;
      } else {
        for (let i = 1; i <= pointsPerSegment / 2; i++) {
          const t = i / (pointsPerSegment / 2);
          const lng = currentLng + (targetLng - currentLng) * t;
          points.push([lng, currentLat]);
        }
        currentLng = targetLng;
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
      coordinates: points
    };
  }
}

export default RoutingService;
