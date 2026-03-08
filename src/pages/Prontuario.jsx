// src/pages/Prontuario.jsx
import React, { useState } from 'react';
import { ArrowLeft, Activity, Stethoscope, Pill, Droplet, Dna, FileText, AlertOctagon } from 'lucide-react';
import logoFms from '../assets/logo-fms.png';
import logoLiga from '../assets/logo-liga.png';

export default function Prontuario({ onVoltar, onHome }) {
  const [abaProntuario, setAbaProntuario] = useState('clinica');
  const [evolucao, setEvolucao] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* Cabeçalho Global Padronizado */}
      <header className="bg-white p-3 shadow-sm border-b border-gray-200 sticky top-0 z-30 flex justify-between items-center">
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
      </header>

      {/* Banner Clínico do Paciente */}
      <div className="bg-[var(--color-fms-azul)] text-white p-3 shadow-md z-20 relative">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] bg-blue-800 px-2 py-1 rounded font-bold border border-blue-700 flex items-center gap-1">
            <Activity size={12}/> Monitoramento Ativo
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-lg font-bold tracking-wide">João Silva</h1>
              <p className="text-[11px] text-blue-200 mt-0.5">68 anos | Sexo Biológico: Masc | Etnia: Parda</p>
            </div>
            <div className="flex flex-col items-end">
               <span className="text-[10px] font-bold bg-white text-[var(--color-fms-azul)] px-2 py-0.5 rounded shadow-sm mb-1">72kg | 1.70m</span>
              <span className="text-[10px] font-bold bg-blue-900 text-blue-100 px-2 py-0.5 rounded shadow-sm border border-blue-700">PA: 130/80</span>
            </div>
          </div>
        </div>
      </div>

      {/* Abas de Navegação */}
      <nav className="bg-white border-b border-gray-200 sticky top-[60px] z-10 shadow-sm flex overflow-x-auto hide-scrollbar">
        <button onClick={() => setAbaProntuario('clinica')} className={`flex-1 min-w-[100px] py-3 text-xs font-bold flex flex-col items-center gap-1 transition-colors border-b-2 ${abaProntuario === 'clinica' ? 'border-[var(--color-fms-verde)] text-[var(--color-fms-verde)]' : 'border-transparent text-gray-500'}`}>
          <Stethoscope size={18} /> Evolução
        </button>
        <button onClick={() => setAbaProntuario('prescricao')} className={`flex-1 min-w-[100px] py-3 text-xs font-bold flex flex-col items-center gap-1 transition-colors border-b-2 ${abaProntuario === 'prescricao' ? 'border-[var(--color-fms-verde)] text-[var(--color-fms-verde)]' : 'border-transparent text-gray-500'}`}>
          <Pill size={18} /> Prescrição
        </button>
      </nav>

      <main className="flex-1 p-4 pb-8 overflow-y-auto">
        {abaProntuario === 'clinica' && (
          <div className="animate-fade-in">
            <section className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <h2 className="text-[var(--color-fms-azul)] font-bold mb-2 flex items-center gap-2 text-sm"><FileText size={18} className="text-[var(--color-fms-verde)]" /> Nova Evolução</h2>
              <textarea className="w-full h-40 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-fms-verde)] outline-none resize-none text-gray-700 text-sm shadow-inner bg-gray-50" placeholder="Evolução..." value={evolucao} onChange={(e) => setEvolucao(e.target.value)} />
            </section>
          </div>
        )}
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