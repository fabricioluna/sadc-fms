// src/pages/Dashboard.jsx
import React from 'react';
import { Users, Dna, Calculator, ArrowLeft, LayoutDashboard, Activity } from 'lucide-react';
import logoFms from '../assets/logo-fms.png';
import logoLiga from '../assets/logo-liga.png';

export default function Dashboard({ onAbrirProntuario, onVoltar, onHome }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* Cabeçalho Padronizado */}
      <header className="bg-white p-3 shadow-sm border-b-4 border-[var(--color-fms-verde)] sticky top-0 z-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button onClick={onVoltar} className="text-gray-400 hover:text-[var(--color-fms-azul)] transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div onClick={onHome} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" title="Voltar ao Início">
            <img src={logoFms} alt="FMS" className="h-8 object-contain" />
            <div className="h-6 w-px bg-gray-300"></div>
            <img src={logoLiga} alt="Liga" className="h-8 object-contain" />
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-gray-800">Dra. Gleyka Santos</p>
          <p className="text-[10px] text-[var(--color-fms-verde)] font-bold">CRM-PE Ativo</p>
        </div>
      </header>

      <main className="flex-1 p-4 pb-12 overflow-y-auto">
        
        {/* Painel de Boas-Vindas */}
        <div className="bg-[var(--color-fms-azul)] rounded-2xl p-6 text-white shadow-md mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-extrabold mb-1">Olá, Dra. Gleyka!</h2>
            <p className="text-sm text-blue-200">Plantão Ativo • Hospital Mestre Vitalino</p>
          </div>
          <Activity size={100} className="absolute -right-4 -bottom-6 text-blue-800 opacity-50" />
        </div>

        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1 flex items-center gap-1">
          <LayoutDashboard size={16} /> Módulos do Sistema
        </h3>

        {/* Grid de Módulos */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <button 
            onClick={onAbrirProntuario} 
            className="bg-[var(--color-fms-verde)] p-5 rounded-xl shadow-md flex items-center justify-between hover:bg-green-700 transition-colors text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-xl text-[var(--color-fms-verde)] shadow-sm">
                <Users size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Meus Pacientes</h3>
                <p className="text-xs text-green-100 font-medium mt-1">
                  Triagem, Prontuários e NLP
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Módulos Secundários */}
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1 mt-6">
          Ferramentas Auxiliares
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-start gap-3 hover:border-purple-500 transition-colors text-left group">
            <div className="bg-purple-50 p-2 rounded-lg text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Dna size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-800">Base Genômica</h4>
              <p className="text-[10px] text-gray-500 mt-1">Painéis WES / Fenótipos</p>
            </div>
          </button>
          <button className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-start gap-3 hover:border-[var(--color-fms-azul)] transition-colors text-left group">
            <div className="bg-blue-50 p-2 rounded-lg text-[var(--color-fms-azul)] group-hover:bg-[var(--color-fms-azul)] group-hover:text-white transition-colors">
              <Calculator size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-800">Escores Clínicos</h4>
              <p className="text-[10px] text-gray-500 mt-1">HAS-BLED, qSOFA, etc.</p>
            </div>
          </button>
        </div>
      </main>

      {/* Rodapé Padronizado com Créditos */}
      <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={onHome}>
            <img src={logoFms} alt="FMS" className="h-6 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
            <div className="h-4 w-px bg-gray-300"></div>
            <img src={logoLiga} alt="Liga" className="h-6 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
          </div>
          <p className="text-[10px] text-gray-400">Desenvolvido por <span className="text-[var(--color-fms-azul)] font-extrabold">Fabrício Luna</span></p>
        </div>
      </footer>
    </div>
  );
}