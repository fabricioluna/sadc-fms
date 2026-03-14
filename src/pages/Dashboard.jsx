// src/pages/Dashboard.jsx
import React from 'react';
import { Users, Dna, Calculator, ArrowLeft, LayoutDashboard, Activity } from 'lucide-react';
import logoFms from '../assets/logo-fms.png';
import logoLiga from '../assets/logo-liga.png';

export default function Dashboard({ onAbrirProntuario, onVoltar, onHome }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* Cabeçalho Padronizado Profissional */}
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
        
        {/* Informações da Médica Assistente */}
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-gray-800">Dra. Gleyka Santos</p>
          <p className="text-[10px] text-[var(--color-fms-verde)] font-bold uppercase tracking-wider">CRM-PE Ativo</p>
        </div>
      </header>

      <main className="flex-1 p-4 pb-12 overflow-y-auto max-w-5xl mx-auto w-full">
        
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

        {/* Módulo Principal: Meus Pacientes */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <button 
            onClick={onAbrirProntuario} 
            className="bg-[var(--color-fms-verde)] p-6 rounded-2xl shadow-md flex items-center justify-between hover:bg-green-700 transition-all transform active:scale-[0.98] text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-xl text-[var(--color-fms-verde)] shadow-sm">
                <Users size={32} />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">Meus Pacientes</h3>
                <p className="text-xs text-green-100 font-medium mt-1 uppercase tracking-tight">
                  Gestão de Prontuários, Triagem e Análise NLP
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Ferramentas Auxiliares de Suporte à Decisão */}
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1 mt-6">
          Suporte à Decisão Baseado em Evidências
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-start gap-3 hover:border-purple-500 transition-all text-left group">
            <div className="bg-purple-50 p-3 rounded-xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Dna size={28} />
            </div>
            <div>
              <h4 className="text-base font-black text-gray-800 uppercase tracking-tight">Base Genómica</h4>
              <p className="text-xs text-gray-500 mt-1 font-medium">Interação Fármaco-Gene (CPIC / PharmGKB)</p>
            </div>
          </button>
          
          <button className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-start gap-3 hover:border-[var(--color-fms-azul)] transition-all text-left group">
            <div className="bg-blue-50 p-3 rounded-xl text-[var(--color-fms-azul)] group-hover:bg-[var(--color-fms-azul)] group-hover:text-white transition-colors">
              <Calculator size={28} />
            </div>
            <div>
              <h4 className="text-base font-black text-gray-800 uppercase tracking-tight">Escores Clínicos</h4>
              <p className="text-xs text-gray-500 mt-1 font-medium">HAS-BLED, CHA2DS2-VASc, qSOFA</p>
            </div>
          </button>
        </div>
      </main>

      {/* Rodapé Padronizado Institucional */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={onHome}>
            <img src={logoFms} alt="FMS" className="h-6 object-contain grayscale opacity-60" />
            <div className="h-4 w-px bg-gray-300"></div>
            <img src={logoLiga} alt="Liga" className="h-6 object-contain grayscale opacity-60" />
          </div>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
            Desenvolvido por <span className="text-[var(--color-fms-azul)] font-black">Fabrício Luna</span>
          </p>
        </div>
      </footer>
    </div>
  );
}