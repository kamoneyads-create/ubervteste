
import React from 'react';

interface AddBankAccountProps {
  onBack: () => void;
  onNext: () => void;
}

const AddBankAccount: React.FC<AddBankAccountProps> = ({ onBack, onNext }) => {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header with Close Button */}
      <div className="pt-8 px-5 pb-3">
        <button onClick={onBack} className="active:opacity-40 transition-opacity">
          <i className="fa-solid fa-xmark text-[24px] text-black"></i>
        </button>
      </div>

      {/* Content */}
      <div className="px-5 pt-6 flex-1">
        <h1 className="text-[26px] font-bold text-black leading-[1.1] tracking-tight mb-6">
          Adicione uma conta bancária
        </h1>
        <p className="text-[15px] font-medium text-gray-500 leading-snug tracking-tight">
          Use a conta bancária em que você quer receber os ganhos automaticamente.
        </p>
      </div>

      {/* Footer with Button */}
      <div className="px-5 pb-4">
        <button 
          onClick={onNext}
          className="w-full bg-black text-white py-3.5 rounded-lg text-[16px] font-bold active:bg-gray-900 transition-colors"
        >
          Avançar
        </button>
      </div>
    </div>
  );
};

export default AddBankAccount;
