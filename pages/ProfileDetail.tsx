
import React from 'react';

interface ProfileDetailProps {
  userName: string;
  profileImage: string;
  profileImageScale?: number;
  profileImageX?: number;
  profileImageY?: number;
  acceptanceRate?: number;
  cancellationRate?: number;
  onBack: () => void;
  onPublicProfile?: () => void;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ 
  userName, 
  profileImage, 
  profileImageScale = 1,
  profileImageX = 0,
  profileImageY = 0,
  acceptanceRate = 100, 
  cancellationRate = 0, 
  onBack, 
  onPublicProfile 
}) => {
  return (
    <div className="h-full bg-white flex flex-col overflow-y-auto pt-4 px-6 pb-0 transition-colors duration-300">
      {/* Header with back arrow */}
      <div className="pt-4 mb-6">
        <button onClick={onBack} className="p-2 -ml-3 active:opacity-50 transition-opacity">
          <i className="fa-solid fa-arrow-left text-[22px] text-black"></i>
        </button>
        <h1 className="text-[32px] font-black text-black tracking-tighter mt-3 leading-none">
          Perfil
        </h1>
      </div>

      {/* Main User Info Card */}
      <div className="bg-white rounded-[20px] border border-gray-100 p-6 shadow-sm flex items-center gap-5 mb-8">
        <div className="relative">
          {/* Blue ring around avatar */}
          <div className="w-[86px] h-[86px] rounded-full border-[2.5px] border-[#276EF1] flex items-center justify-center p-0.5 overflow-hidden">
            <img 
              src={profileImage} 
              alt={userName} 
              className="w-full h-full rounded-full object-cover transition-transform duration-200"
              style={{
                transform: `scale(${profileImageScale}) translate(${profileImageX}%, ${profileImageY}%)`
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/seed/junior/200/200";
              }}
            />
          </div>
          {/* Blue diamond "Azul" Badge */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white border border-gray-100 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm whitespace-nowrap">
             <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                 <path d="M12 2L4 12L12 22L20 12L12 2Z" fill="#276EF1" />
             </svg>
             <span className="text-[11px] font-bold text-black">Azul</span>
          </div>
        </div>

        <div className="flex flex-col items-start pt-1">
          <h2 className="text-[24px] font-black text-black leading-none mb-3">{userName}</h2>
          <button 
            onClick={onPublicProfile}
            className="bg-[#EEEEEE] text-black px-4 py-2 rounded-full text-[13px] font-bold active:bg-gray-200 active:scale-95 transition-all"
          >
            Ver perfil público
          </button>
        </div>
      </div>

      {/* Viagens Section */}
      <div className="flex items-center justify-between mb-5 pr-1">
        <h3 className="text-[24px] font-black text-black tracking-tight">Viagens</h3>
        <button className="w-10 h-10 rounded-full bg-[#F3F3F3] flex items-center justify-center active:scale-95 transition-transform">
          <i className="fa-solid fa-arrow-right text-black text-base"></i>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 mb-10">
        <div className="bg-white rounded-[20px] border border-gray-100 p-5 shadow-sm flex flex-col justify-between min-h-[160px] overflow-hidden">
          <div>
            <h4 className="text-[28px] font-black text-black leading-none mb-3">{cancellationRate}%</h4>
            <p className="text-[15px] font-bold text-black leading-tight">Taxa de cancelamento</p>
          </div>
          <div className="mt-3">
             <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-green-50">
               <i className="fa-solid fa-circle-check text-green-600 text-[9px]"></i>
               <span className="text-[10px] font-black text-green-600">Uber Pro</span>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-[20px] border border-gray-100 p-5 shadow-sm flex flex-col justify-between min-h-[160px] overflow-hidden">
          <div>
            <h4 className="text-[28px] font-black text-black leading-none mb-3">{acceptanceRate}%</h4>
            <p className="text-[15px] font-bold text-black leading-tight">Taxa de aceitação</p>
          </div>
          <div className="mt-3">
             <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-green-50">
               <i className="fa-solid fa-circle-check text-green-600 text-[9px]"></i>
               <span className="text-[10px] font-black text-green-600">Uber Pro</span>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-[20px] border border-gray-100 p-5 shadow-sm flex flex-col justify-between min-h-[160px] overflow-hidden">
          <div>
            <div className="flex items-baseline gap-1 mb-3">
              <h4 className="text-[28px] font-black text-black leading-none">5,00</h4>
              <i className="fa-solid fa-star text-black text-[18px]"></i>
            </div>
            <p className="text-[15px] font-bold text-black leading-tight">Avaliação média em estrelas</p>
          </div>
          <div className="mt-3">
             <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-green-50">
               <i className="fa-solid fa-circle-check text-green-600 text-[9px]"></i>
               <span className="text-[10px] font-black text-green-600">Uber Pro</span>
             </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-12 pr-1">
        <h3 className="text-[24px] font-black text-black tracking-tight">Entregas</h3>
        <button className="w-10 h-10 rounded-full bg-[#F3F3F3] flex items-center justify-center active:scale-95 transition-transform">
          <i className="fa-solid fa-arrow-right text-black text-base"></i>
        </button>
      </div>

      {/* Destaques da trajetória Section */}
      <div className="mb-12">
        <h3 className="text-[24px] font-black text-black tracking-tight mb-6">Destaques da trajetória</h3>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-8">
          {/* Total de viagens */}
          <div className="flex flex-col gap-3">
            <div className="w-full aspect-[1.6/1] bg-white rounded-2xl overflow-hidden relative border border-gray-100">
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-[#FF6B00] rounded-full flex items-center justify-center shadow-lg border-[3px] border-white">
                    <i className="fa-solid fa-location-dot text-white text-[18px]"></i>
                  </div>
               </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[24px] font-black text-black leading-none tracking-tighter">0</span>
              <span className="text-[13px] font-bold text-black tracking-tight mt-1 opacity-80">Total de viagens</span>
            </div>
          </div>

          {/* Tempo usando o app */}
          <div className="flex flex-col gap-3">
            <div className="w-full aspect-[1.6/1] bg-white rounded-2xl overflow-hidden relative border border-gray-100">
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <i className="fa-solid fa-person-walking text-[#276EF1] text-[40px] drop-shadow-md"></i>
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <div className="w-1.5 h-1.5 bg-[#276EF1] rounded-full"></div>
                    </div>
                  </div>
               </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[24px] font-black text-black leading-none tracking-tighter">0/anos</span>
              <span className="text-[13px] font-bold text-black tracking-tight mt-1 leading-tight opacity-80">Tempo usando o app da Uber</span>
            </div>
          </div>

          {/* Viagens */}
          <div className="flex flex-col gap-3">
            <div className="w-full aspect-[1.6/1] bg-white rounded-2xl overflow-hidden relative border border-gray-100">
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative scale-110">
                    <i className="fa-solid fa-car-side text-black text-[36px] drop-shadow-sm"></i>
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white"></div>
                  </div>
               </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[24px] font-black text-black leading-none tracking-tighter">0</span>
              <span className="text-[13px] font-bold text-black tracking-tight mt-1 opacity-80">Viagens</span>
            </div>
          </div>

          {/* Entregas */}
          <div className="flex flex-col gap-3">
            <div className="w-full aspect-[1.6/1] bg-white rounded-2xl overflow-hidden relative border border-gray-100">
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <i className="fa-solid fa-box-archive text-[#FFC000] text-[36px] drop-shadow-sm"></i>
                    <div className="absolute -top-1 -right-1">
                      <i className="fa-solid fa-circle-check text-green-500 text-[12px] bg-white rounded-full"></i>
                    </div>
                  </div>
               </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[24px] font-black text-black leading-none tracking-tighter">0</span>
              <span className="text-[13px] font-bold text-black tracking-tight mt-1 opacity-80">Entregas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
