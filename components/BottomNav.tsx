import React from 'react';
import { AppView } from '../types';

interface BottomNavProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  isDarkMode: boolean;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate, isDarkMode }) => {
  const navItems = [
    { id: AppView.DASHBOARD, icon: 'fa-house', label: 'Página inicial' },
    { id: AppView.EARNINGS, icon: 'fa-money-bill-1', label: 'Ganhos' },
    { id: AppView.INBOX, icon: 'fa-envelope', label: 'Mensagens' },
    { id: AppView.PROFILE, icon: 'fa-bars', label: 'Menu' },
  ];

  const bgColor = isDarkMode ? 'bg-[#121212]' : 'bg-white';
  const borderColor = isDarkMode ? 'border-gray-800' : 'border-gray-100';
  const activeTextColor = isDarkMode ? 'text-white' : 'text-black';
  const inactiveTextColor = isDarkMode ? 'text-gray-500' : 'text-gray-500';

  return (
    <nav className={`h-20 ${bgColor} border-t ${borderColor} flex items-center justify-around px-2 bottom-nav-shadow z-[9000] transition-colors duration-300`}>
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex flex-col items-center gap-1 relative ${
            currentView === item.id ? activeTextColor : inactiveTextColor
          }`}
        >
          <div className="relative">
            <i className={`fa-solid ${item.icon} text-xl`}></i>
          </div>
          <span className={`text-[11px] ${currentView === item.id ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;