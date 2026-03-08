// src/pages/MeusPacientes.jsx
import React, { useState } from 'react';
import { ArrowLeft, Search, UserPlus, Clock, AlertTriangle, ChevronRight, Filter } from 'lucide-react';
import logoFms from '../assets/logo-fms.png';
import logoLiga from '../assets/logo-liga.png';

export default function MeusPacientes({ onVoltar, onAbrirProntuario, onHome }) {
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
          <h1 className="text-sm font-bold text-[var(--color-fms-azul)] leading-none">Gestão de Pacientes</h1>
          <span className="text-[10px] text-gray-500 font-semibold uppercase">Ambulatório / Triagem</span>
        </div>
      </header>

      <main className="flex-1 p-4 pb-12 overflow-y-auto">
        <section className="mb-8">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block px-1">
            Localizar ou Cadastrar Paciente
          </label>
          <div className="flex flex-col gap-3">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Digite o CPF, Nome ou Prontuário..." 
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="w-full p-4 pl-12 bg-white border-2 border-gray-200 rounded-xl shadow-sm text-sm focus:ring-2 focus:ring-[var(--color-fms-azul)] focus:border-transparent outline-none transition-all"
              />
              <Search className="absolute left-4 top-4 text-gray-400" size={20} />
            </div>
            <button className="w-full bg-[var(--color-fms-verde)] text-white font-bold py-3.5 rounded-xl shadow-md hover:bg-green-700 transition-colors flex justify-center items-center gap-2 border border-green-600">
              <UserPlus size={18} /> 
              {termoBusca.length > 0 ? `Cadastrar "${termoBusca}"` : 'Cadastrar Novo Paciente'}
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-2 px-1 text-center">
            * Busque o paciente antes de cadastrar para evitar prontuários duplicados.
          </p>
        </section>

        <div className="flex justify-between items-end mb-3 px-1">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
            <Clock size={14} /> Fila de Atendimento (Hoje)
          </h2>
          <button className="text-[10px] bg-gray-200 text-gray-600 px-2 py-1 rounded font-bold hover:bg-gray-300 flex items-center gap-1">
            <Filter size={12}/> Filtrar
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
          <div onClick={onAbrirProntuario} className="p-4 flex items-center justify-between hover:bg-blue-50 cursor-pointer transition-colors group">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-yellow-100 border border-yellow-200 flex items-center justify-center text-yellow-700 relative shadow-sm group-hover:scale-105 transition-transform">
                <span className="font-bold text-sm">JS</span>
                <span className="absolute -top-1 -right-1 bg-[var(--color-alerta-amarelo)] text-yellow-900 rounded-full p-0.5 shadow-sm border border-white">
                  <AlertTriangle size={10} />
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800">João Silva</h4>
                <p className="text-[10px] text-gray-500">68 anos | Retorno | 14:00</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[9px] font-bold bg-[var(--color-alerta-amarelo)] text-yellow-900 px-2 py-0.5 rounded-sm">
                Alerta Triagem
              </span>
              <ChevronRight size={18} className="text-[var(--color-fms-azul)] opacity-50 group-hover:opacity-100" />
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
          <p className="text-[10px] text-gray-400">Desenvolvido por <span className="text-[var(--color-fms-azul)] font-extrabold">Fabrício Luna</span></p>
        </div>
      </footer>
    </div>
  );
}