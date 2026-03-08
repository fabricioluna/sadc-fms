// src/pages/MeusPacientes.jsx
import React, { useState } from 'react';
import { ArrowLeft, Search, UserPlus, History, ChevronRight, Stethoscope } from 'lucide-react';
import logoFms from '../assets/logo-fms.png';
import logoLiga from '../assets/logo-liga.png';

export default function MeusPacientes({ onVoltar, onAbrirProntuario, onNovoPaciente, onEvolucaoRapida, onHome }) {
  const [termoBusca, setTermoBusca] = useState('');

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
          <p className="text-[10px] text-[var(--color-fms-verde)] font-bold">Gestão de Pacientes</p>
        </div>
      </header>

      <main className="flex-1 p-4 pb-12 overflow-y-auto">
        
        {/* Busca Ativa */}
        <section className="mb-6 mt-4">
          <label className="text-sm font-bold text-[var(--color-fms-azul)] mb-3 block px-1">
            Localizar Paciente
          </label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Nome, CPF ou ID SADC..." 
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="w-full p-4 pl-12 bg-white border-2 border-gray-200 rounded-xl shadow-sm text-sm focus:ring-2 focus:ring-[var(--color-fms-azul)] outline-none transition-all"
            />
            <Search className="absolute left-4 top-4 text-gray-400" size={20} />
          </div>
        </section>

        {/* BOTÕES DE AÇÃO LADO A LADO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          <button 
            onClick={onNovoPaciente}
            className="w-full bg-[var(--color-fms-verde)] text-white font-bold py-4 rounded-xl shadow-md hover:bg-green-700 transition-colors flex justify-center items-center gap-2 border border-green-600"
          >
            <UserPlus size={20} /> 
            Novo Paciente
          </button>

          <button 
            onClick={onEvolucaoRapida}
            className="w-full bg-[var(--color-fms-azul)] text-white font-bold py-4 rounded-xl shadow-md hover:opacity-90 transition-colors flex justify-center items-center gap-2 border border-blue-900"
          >
            <Stethoscope size={20} /> 
            Evolução Clínica
          </button>
        </div>

        {/* HISTÓRICO RECENTE */}
        <div className="flex justify-between items-end mb-3 px-1">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
            <History size={14} /> Pacientes Recentes
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
          <div onClick={onAbrirProntuario} className="p-4 flex items-center justify-between hover:bg-blue-50 cursor-pointer transition-colors group">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[var(--color-fms-azul)] shadow-sm group-hover:scale-105 transition-transform">
                <span className="font-bold text-sm">JS</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800">João Silva</h4>
                <p className="text-[10px] text-gray-500">68 anos | Prontuário #SADC-2026-X812</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Preditivo Ativo</span>
              <ChevronRight size={18} className="text-gray-300" />
            </div>
          </div>
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
          <p className="text-[10px] text-gray-400 font-medium italic">
            Desenvolvido por <span className="text-[var(--color-fms-azul)] font-extrabold">Fabrício Luna</span>
          </p>
        </div>
      </footer>
    </div>
  );
}