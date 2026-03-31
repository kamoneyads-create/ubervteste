
import React from 'react';
import { motion } from 'framer-motion';
import { DarkModeOption } from '../types';

interface DarkModeSettingsProps {
  onBack: () => void;
  currentOption: DarkModeOption;
  onSelect: (option: DarkModeOption) => void;
  isDarkMode: boolean;
}

const DarkModeSettings: React.FC<DarkModeSettingsProps> = ({ onBack, currentOption, onSelect, isDarkMode }) => {
  const options = [
    { id: DarkModeOption.AUTOMATIC, title: 'Automático (hora do dia)' },
    { id: DarkModeOption.ALWAYS_ON, title: 'Sempre ligado' },
    { id: DarkModeOption.ALWAYS_OFF, title: 'Sempre desligado' },
    { id: DarkModeOption.USE_PHONE_SETTING, title: 'Usar a configuração do telefone' },
  ];

  const bgColor = isDarkMode ? 'bg-[#121212]' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const borderColor = isDarkMode ? 'border-gray-800' : 'border-gray-100';
  const hoverColor = isDarkMode ? 'active:bg-gray-900' : 'active:bg-gray-50';

  return (
    <div className={`h-full ${bgColor} flex flex-col transition-colors duration-300`}>
      {/* Header */}
      <div className={`pt-6 px-6 pb-4 flex items-center border-b ${borderColor}`}>
        <button onClick={onBack} className="p-2 -ml-4 active:opacity-40 transition-opacity">
          <i className={`fa-solid fa-arrow-left text-[22px] ${textColor}`}></i>
        </button>
        <h1 className={`text-[20px] font-bold ${textColor} ml-2`}>
          Modo noturno
        </h1>
      </div>

      {/* Content */}
      <div className={`flex-1 overflow-y-auto ${bgColor}`}>
        <div className="py-2">
          {options.map((option) => (
            <div 
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`flex items-center px-6 py-4 ${hoverColor} transition-colors cursor-pointer`}
            >
              <div className="flex-1">
                <span className={`text-[16px] font-medium ${textColor}`}>
                  {option.title}
                </span>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                currentOption === option.id 
                  ? isDarkMode ? 'border-white bg-white' : 'border-black bg-black' 
                  : isDarkMode ? 'border-gray-600' : 'border-gray-300'
              }`}>
                {currentOption === option.id && (
                  <div className={`w-2.5 h-2.5 ${isDarkMode ? 'bg-black' : 'bg-white'} rounded-full`}></div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="px-6 py-4">
          <p className={`text-[14px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>
            O modo noturno ajuda a reduzir o cansaço visual e economizar bateria em telas OLED.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DarkModeSettings;
