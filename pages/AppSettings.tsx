
import React from 'react';
import { motion } from 'framer-motion';
import { AppView, DarkModeOption } from '../types';

interface AppSettingsProps {
  onBack: () => void;
  onNavigate: (view: AppView) => void;
  isDarkMode: boolean;
  darkModeOption: DarkModeOption;
}

const AppSettings: React.FC<AppSettingsProps> = ({ onBack, onNavigate, isDarkMode, darkModeOption }) => {
  const getDarkModeLabel = (option: DarkModeOption) => {
    switch (option) {
      case DarkModeOption.AUTOMATIC: return 'Automático';
      case DarkModeOption.ALWAYS_ON: return 'Ligado';
      case DarkModeOption.ALWAYS_OFF: return 'Desligado';
      case DarkModeOption.USE_PHONE_SETTING: return 'Config. do telefone';
      default: return 'Desligado';
    }
  };

  const settingsGroups = [
    {
      items: [
        { id: 'sounds', title: 'Sons e voz', icon: 'fa-volume-high' },
        { id: 'navigation', title: 'Navegação', icon: 'fa-location-arrow' },
        { id: 'accessibility', title: 'Acessibilidade', icon: 'fa-universal-access' },
        { id: 'dark_mode', title: 'Modo noturno', icon: 'fa-moon', value: getDarkModeLabel(darkModeOption), onClick: () => onNavigate(AppView.DARK_MODE_SETTINGS) },
      ]
    },
    {
      items: [
        { id: 'speed_limit', title: 'Limite de velocidade', icon: 'fa-gauge-high' },
        { id: 'follow_trip', title: 'Siga minha viagem', icon: 'fa-share-nodes' },
        { id: 'emergency', title: 'Botão de emergência', icon: 'fa-shield-heart' },
      ]
    },
    {
      items: [
        { id: 'calls', title: 'Chamadas e mensagens', icon: 'fa-comment' },
        { id: 'data_sharing', title: 'Compartilhamento de dados', icon: 'fa-chart-simple' },
        { id: 'video', title: 'Vídeo', icon: 'fa-video' },
        { id: 'language', title: 'Linguagem', icon: 'fa-language', value: 'Português (Brasil)' },
        { id: 'units', title: 'Unidades de distância', icon: 'fa-ruler', value: 'Quilômetros' },
        { id: 'clear_cache', title: 'Limpar cache de rotas', icon: 'fa-trash-can', onClick: () => {
          localStorage.removeItem('UBER_V6_ROUTE_CACHE_FIXED');
          window.location.reload();
        }},
      ]
    }
  ];

  const bgColor = isDarkMode ? 'bg-[#121212]' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const borderColor = isDarkMode ? 'border-gray-800' : 'border-gray-100';
  const hoverColor = isDarkMode ? 'active:bg-gray-900' : 'active:bg-gray-50';
  const iconColor = isDarkMode ? 'text-white' : 'text-black';
  const secondaryTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className={`h-full ${bgColor} flex flex-col transition-colors duration-300`}>
      {/* Header */}
      <div className={`pt-6 px-6 pb-4 flex items-center border-b ${borderColor}`}>
        <button onClick={onBack} className="p-2 -ml-4 active:opacity-40 transition-opacity">
          <i className={`fa-solid fa-arrow-left text-[22px] ${textColor}`}></i>
        </button>
        <h1 className={`text-[20px] font-bold ${textColor} ml-2`}>
          Configurações do app
        </h1>
      </div>

      {/* Content */}
      <div className={`flex-1 overflow-y-auto ${bgColor}`}>
        {settingsGroups.map((group, groupIdx) => (
          <div key={groupIdx} className={bgColor}>
            {group.items.map((item: any, itemIdx) => (
              <div 
                key={item.id}
                onClick={item.onClick}
                className={`flex items-center px-5 py-3.5 ${hoverColor} transition-colors cursor-pointer`}
              >
                <div className="w-8 flex items-center justify-center mr-3">
                  <i className={`fa-solid ${item.icon} text-[16px] ${iconColor}`}></i>
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <span className={`text-[16px] font-medium ${textColor}`}>
                    {item.title}
                  </span>
                  {item.value && (
                    <span className={`text-[14px] ${secondaryTextColor} mr-2`}>
                      {item.value}
                    </span>
                  )}
                </div>
                <div className="ml-2">
                  <i className={`fa-solid fa-chevron-right text-[10px] ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}></i>
                </div>
              </div>
            ))}
          </div>
        ))}
        
        {/* Bottom spacer */}
        <div className="h-6"></div>
      </div>
    </div>
  );
};

export default AppSettings;
