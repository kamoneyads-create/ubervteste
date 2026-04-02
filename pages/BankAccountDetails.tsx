
import React from 'react';

interface BankAccountDetailsProps {
  onBack: () => void;
  onNext: () => void;
}

const BankAccountDetails: React.FC<BankAccountDetailsProps> = ({ onBack, onNext }) => {
  return (
    <div className="h-full bg-white flex flex-col overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div className="pt-8 px-5 pb-3">
        <button onClick={onBack} className="active:opacity-40 transition-opacity">
          <i className="fa-solid fa-arrow-left text-[20px] text-black"></i>
        </button>
      </div>

      {/* Content */}
      <div className="px-5 pt-4 flex-1">
        <div className="space-y-6 pb-8">
          {/* Nome do Titular */}
          <div className="flex flex-col gap-2">
            <label className="text-[15px] font-bold text-black leading-tight">
              Nome do titular da conta (exatamente como aparece no seu extrato bancário)
            </label>
            <input 
              type="text" 
              placeholder="Nome do Favorecido"
              className="w-full bg-[#F3F3F7] border-none rounded-lg py-3 px-4 text-[15px] focus:ring-0 placeholder:text-gray-400"
            />
            <p className="text-[12px] text-gray-400 leading-tight">
              Indique o nome do destinatário na conta bancária. Se a conta for de uma empresa, informe a razão social da empresa titular da conta.
            </p>
          </div>

          {/* Endereço */}
          <div className="flex flex-col gap-2">
            <label className="text-[15px] font-bold text-black leading-tight">
              Endereço
            </label>
            <input 
              type="text" 
              placeholder="Endereço do titular da conta"
              className="w-full bg-[#F3F3F7] border-none rounded-lg py-3 px-4 text-[15px] focus:ring-0 placeholder:text-gray-400"
            />
            <p className="text-[12px] text-gray-400 leading-tight">
              Informe o endereço do destinatário na conta bancária. Se a conta for de uma empresa, informe o endereço comercial associado à conta.
            </p>
          </div>

          {/* Cidade */}
          <div className="flex flex-col gap-2">
            <label className="text-[15px] font-bold text-black leading-tight">
              Cidade
            </label>
            <input 
              type="text" 
              placeholder="Ex: São Paulo"
              className="w-full bg-[#F3F3F7] border-none rounded-lg py-3 px-4 text-[15px] focus:ring-0 placeholder:text-gray-400"
            />
            <p className="text-[12px] text-gray-400 leading-tight">
              Informe a sua cidade.
            </p>
          </div>

          {/* CEP */}
          <div className="flex flex-col gap-2">
            <label className="text-[15px] font-bold text-black leading-tight">
              CEP
            </label>
            <input 
              type="text" 
              placeholder="00000-000"
              className="w-full bg-[#F3F3F7] border-none rounded-lg py-3 px-4 text-[15px] focus:ring-0 placeholder:text-gray-400"
            />
          </div>

          {/* Data de nascimento */}
          <div className="flex flex-col gap-2">
            <label className="text-[15px] font-bold text-black leading-tight">
              Data de nascimento
            </label>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <select className="w-full bg-[#F3F3F7] border-none rounded-lg py-3 px-4 text-[15px] focus:ring-0 text-gray-400 appearance-none">
                  <option>Dia</option>
                </select>
                <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-black"></i>
              </div>
              <div className="flex-1 relative">
                <select className="w-full bg-[#F3F3F7] border-none rounded-lg py-3 px-4 text-[15px] focus:ring-0 text-gray-400 appearance-none">
                  <option>Mês</option>
                </select>
                <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-black"></i>
              </div>
              <div className="flex-1 relative">
                <select className="w-full bg-[#F3F3F7] border-none rounded-lg py-3 px-4 text-[15px] focus:ring-0 text-gray-400 appearance-none">
                  <option>Ano</option>
                </select>
                <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-black"></i>
              </div>
            </div>
            <p className="text-[12px] text-gray-400 leading-tight">
              A data de nascimento do titular da conta.
            </p>
          </div>

          {/* Nome do banco */}
          <div className="flex flex-col gap-2">
            <label className="text-[15px] font-bold text-black leading-tight">
              Nome do banco
            </label>
            <div className="relative">
              <select className="w-full bg-[#F3F3F7] border-none rounded-lg py-3 px-4 text-[15px] focus:ring-0 text-gray-400 appearance-none">
                <option>AILOS</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-black"></i>
            </div>
            <p className="text-[12px] text-gray-400 leading-tight">
              Ex: Banco do Brasil
            </p>
          </div>

          {/* Cidade da agência do banco */}
          <div className="flex flex-col gap-2">
            <label className="text-[15px] font-bold text-black leading-tight">
              Cidade da agência do banco
            </label>
            <input 
              type="text" 
              placeholder="Cidade da agência do banco"
              className="w-full bg-[#F3F3F7] border-none rounded-lg py-3 px-4 text-[15px] focus:ring-0 placeholder:text-gray-400"
            />
          </div>

          {/* Número da Agência (sem dígito) */}
          <div className="flex flex-col gap-2">
            <label className="text-[15px] font-bold text-black leading-tight">
              Número da Agência (sem dígito)
            </label>
            <input 
              type="text" 
              placeholder="123"
              className="w-full bg-[#F3F3F7] border-none rounded-lg py-3 px-4 text-[15px] focus:ring-0 placeholder:text-gray-400"
            />
          </div>

          {/* Número da conta bancária */}
          <div className="flex flex-col gap-2">
            <label className="text-[15px] font-bold text-black leading-tight">
              Número da conta bancária
            </label>
            <input 
              type="text" 
              placeholder="Número da conta (com dígito)"
              className="w-full bg-[#F3F3F7] border-none rounded-lg py-3 px-4 text-[15px] focus:ring-0 placeholder:text-gray-400"
            />
            <p className="text-[12px] text-gray-400 leading-tight">
              O número da conta bancária na qual você deseja receber as transferências
            </p>
          </div>

          {/* Tipo de conta */}
          <div className="flex flex-col gap-2">
            <label className="text-[15px] font-bold text-black leading-tight">
              Tipo de conta
            </label>
            <div className="relative">
              <select className="w-full bg-[#F3F3F7] border-none rounded-lg py-3 px-4 text-[15px] focus:ring-0 text-black appearance-none">
                <option>Conta corrente</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-black"></i>
            </div>
            <p className="text-[12px] text-gray-400 leading-tight">
              Tipo de conta
            </p>
          </div>

          {/* CPF/CNPJ */}
          <div className="flex flex-col gap-2">
            <label className="text-[15px] font-bold text-black leading-tight">
              CPF/CNPJ
            </label>
            <div className="relative">
              <select className="w-full bg-[#F3F3F7] border-none rounded-lg py-3 px-4 text-[15px] focus:ring-0 text-black appearance-none">
                <option>CPF</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-black"></i>
            </div>
            <p className="text-[12px] text-gray-400 leading-tight">
              Selecione "CPF" para Conta Pessoa Fisica e "CNPJ" para Conta Jurídica
            </p>
          </div>

          {/* CPF/CNPJ do destinatário */}
          <div className="flex flex-col gap-2">
            <label className="text-[15px] font-bold text-black leading-tight">
              CPF/CNPJ do destinatário
            </label>
            <input 
              type="text" 
              placeholder="CPF/CNPJ do beneficiário"
              className="w-full bg-[#F3F3F7] border-none rounded-lg py-3 px-4 text-[15px] focus:ring-0 placeholder:text-gray-400"
            />
            <p className="text-[12px] text-gray-400 leading-tight">
              Use o formato 000.000.000-00 para CPF e
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
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

export default BankAccountDetails;
