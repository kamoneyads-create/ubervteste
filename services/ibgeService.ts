
export interface IBGECity {
  id: number;
  nome: string;
  microrregiao?: {
    mesorregiao?: {
      UF?: {
        sigla: string;
      }
    }
  }
}

export interface CityData {
  nome: string;
  uf: string;
}

let cachedCities: CityData[] | null = null;

export const fetchAllBrazilianCities = async (): Promise<CityData[]> => {
  if (cachedCities) return cachedCities;
  
  try {
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome');
    const data: IBGECity[] = await response.json();
    cachedCities = data.map(city => ({
      nome: city.nome,
      uf: city.microrregiao?.mesorregiao?.UF?.sigla || ''
    }));
    return cachedCities;
  } catch (error) {
    console.error('Error fetching cities from IBGE:', error);
    return [];
  }
};
