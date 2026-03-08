// src/pages/Splash.jsx
import React from 'react';
import { ShieldPlus } from 'lucide-react';
import logoFms from '../assets/logo-fms.png';
import logoLiga from '../assets/logo-liga.png';

export default function Splash({ onIniciar, onHome }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-between p-4 font-sans">
      
      {/* Cabeçalho Vazio para manter o alinhamento flex */}
      <div className="w-full pt-4"></div>

      <main className="bg-white max-w-md w-full rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col items-center text-center z-10">
        <div className="flex justify-center items-center gap-6 mb-8 w-full cursor-pointer hover:opacity-80 transition-opacity" onClick={onHome}>
          <img src={logoFms} alt="FMS" className="h-16 object-contain" />
          <div className="h-12 w-px bg-gray-200"></div> 
          <img src={logoLiga} alt="Liga de Farmacologia" className="h-16 object-contain" />
        </div>
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-[var(--color-fms-azul)] tracking-tight mb-2">SADC FMS</h1>
          <h2 className="text-xs font-bold text-[var(--color-fms-verde)] uppercase tracking-widest mb-4">Prontuário & CDSS Preditivo</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Sistema Inteligente de Suporte à Decisão Clínica integrado à Farmacogenômica e Farmacologia Translacional.
          </p>
        </div>
        <button 
          onClick={onIniciar}
          className="w-full bg-[var(--color-fms-azul)] text-white font-bold text-lg py-4 rounded-xl shadow-md hover:bg-[var(--color-fms-verde)] transition-colors duration-300 active:scale-[0.98] flex justify-center items-center gap-3"
        >
          <ShieldPlus size={24} /> Acessar Sistema
        </button>
      </main>

      {/* Rodapé Padronizado */}
      <footer className="w-full py-6 flex flex-col items-center gap-3 mt-8">
        <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={onHome}>
          <img src={logoFms} alt="FMS" className="h-6 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
          <div className="h-4 w-px bg-gray-300"></div>
          <img src={logoLiga} alt="Liga" className="h-6 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
        </div>
        <p className="text-xs text-gray-400">Desenvolvido por <span className="text-[var(--color-fms-azul)] font-extrabold">Fabrício Luna</span></p>
      </footer>
    </div>
  );
}