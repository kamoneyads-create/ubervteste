
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, X, Loader2, ChevronRight } from 'lucide-react';
import { fetchAllBrazilianCities, CityData } from '../services/ibgeService';

interface CitySelectorProps {
  value: string;
  onChange: (city: string) => void;
  label?: string;
}

const CitySelector: React.FC<CitySelectorProps> = ({ value, onChange, label = "Cidade de Atuação" }) => {
  const [cities, setCities] = useState<CityData[]>([]);
  const [searchTerm, setSearchTerm] = useState(value || '');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchTerm(value ? value.split(',')[0].trim() : '');
  }, [value]);

  useEffect(() => {
    const loadCities = async () => {
      setIsLoading(true);
      try {
        const allCities = await fetchAllBrazilianCities();
        setCities(allCities);
      } catch (error) {
        console.error('Failed to load cities:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCities();
  }, []);

  const filteredCities = React.useMemo(() => {
    if (!isOpen) return [];
    
    const normalize = (str: string) => 
      str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      
    const normalizedSearch = normalize(searchTerm);
    
    if (normalizedSearch.length === 0) {
      return cities.slice(0, 50); // Mostra as primeiras 50 se não houver busca
    }

    const filtered = [];
    for (const city of cities) {
      if (normalize(city.nome).includes(normalizedSearch)) {
        filtered.push(city);
        if (filtered.length >= 50) break; // Limita a 50 para performance
      }
    }
    return filtered;
  }, [searchTerm, cities, isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (city: CityData) => {
    const cityName = `${city.nome}, ${city.uf}`;
    onChange(cityName);
    setSearchTerm(city.nome); // Mostra apenas o nome da cidade no campo, sem a UF
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div 
        className={`group bg-gray-50 rounded-2xl p-4 border transition-all shadow-sm ${isOpen ? 'border-black ring-1 ring-black' : 'border-transparent hover:border-black'}`}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <p className="text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest">{label}</p>
            <div className="flex items-center gap-2">
              <MapPin size={14} className={isOpen ? "text-black" : "text-gray-400"} />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                placeholder="Digite sua cidade..."
                className="w-full bg-transparent font-bold text-[17px] text-black outline-none placeholder:text-gray-300"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {searchTerm && isOpen && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchTerm('');
                  inputRef.current?.focus();
                }}
                className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              >
                <X size={12} className="text-gray-600" />
              </button>
            )}
            <ChevronRight size={18} className={`text-gray-300 transition-transform ${isOpen ? 'rotate-90 text-black' : ''}`} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute z-[100] left-0 right-0 top-[calc(100%+8px)] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
          >
            <div className="max-h-[250px] overflow-y-auto scrollbar-hide py-1">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-8 gap-2">
                  <Loader2 className="animate-spin text-black" size={20} />
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Carregando...</p>
                </div>
              ) : (
                filteredCities.length > 0 ? (
                  filteredCities.map((city, index) => (
                    <button
                      key={`${city.nome}-${city.uf}-${index}`}
                      onClick={() => handleSelect(city)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left group"
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                        <MapPin size={14} />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-black text-sm">{city.nome}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{city.uf} • Brasil</p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-xs font-bold text-gray-400">Nenhuma cidade encontrada</p>
                  </div>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CitySelector;

