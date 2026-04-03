
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SecurityLockProps {
  onUnlock: () => void;
}

const SecurityLock: React.FC<SecurityLockProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const CORRECT_PASSWORD = 'Seboso14@';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
      setPassword('');
    }
  };

  return (
    <div className="absolute inset-0 z-[11000] bg-black flex flex-col items-center justify-center px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md flex flex-col items-center gap-8"
      >
        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
          <i className="fa-solid fa-lock text-white text-3xl"></i>
        </div>
        
        <div className="text-center space-y-2">
          <h1 className="text-white text-2xl font-black tracking-tight">Acesso Bloqueado</h1>
          <p className="text-gray-400 text-sm font-medium">Insira a senha para iniciar</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <motion.div
            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha"
              autoFocus
              className={`w-full bg-white/10 border-2 ${error ? 'border-red-500' : 'border-transparent focus:border-white'} rounded-2xl py-4 px-6 text-white text-center text-lg font-bold outline-none transition-all placeholder:text-gray-600`}
            />
          </motion.div>
          
          <button 
            type="submit"
            className="w-full bg-white text-black py-4 rounded-2xl text-lg font-black active:scale-95 transition-transform"
          >
            Entrar
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SecurityLock;
