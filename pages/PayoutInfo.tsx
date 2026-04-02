
import React from 'react';

interface PayoutInfoProps {
  bankAccount: string;
  onBack: () => void;
  onAddBankAccount?: () => void;
}

const BankIcon = () => (
  <div className="w-[32px] h-[32px] bg-[#276EF1] rounded flex items-center justify-center shrink-0">
    <i className="fa-solid fa-building-columns text-white text-[14px]"></i>
  </div>
);

const PayoutInfo: React.FC<PayoutInfoProps> = ({ bankAccount, onBack, onAddBankAccount }) => {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="pt-8 px-5 pb-3 bg-white flex items-center gap-3">
        <button onClick={onBack} className="active:opacity-40 transition-opacity">
          <i className="fa-solid fa-arrow-left text-[20px] text-black"></i>
        </button>
        <h1 className="text-[16px] font-bold text-black flex-1 text-center mr-8">
          Pagamentos
        </h1>
      </div>

      {/* Content */}
      <div className="px-5 pt-6">
        <h2 className="text-[26px] font-bold text-black leading-[1.1] tracking-tight mb-8">
          Como você prefere que suas transferências sejam feitas?
        </h2>

        <div 
          onClick={onAddBankAccount}
          className="flex items-start gap-3 py-3 active:bg-gray-50 -mx-2 px-2 rounded-xl transition-colors cursor-pointer group"
        >
          <div className="w-[32px] h-[32px] bg-[#276EF1] rounded flex items-center justify-center shrink-0 mt-0.5">
            <i className="fa-solid fa-building-columns text-white text-[14px]"></i>
          </div>
          <div className="flex-1 flex flex-col gap-0.5">
            <span className="text-[15px] font-bold text-black leading-tight">
              Conectar conta bancária
            </span>
            <p className="text-[13px] font-medium text-gray-400 leading-tight">
              Obtenha seus ganhos semanalmente sem pagar taxas
            </p>
          </div>
          <div className="pt-2">
            <i className="fa-solid fa-chevron-right text-[12px] text-black font-bold"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoutInfo;
