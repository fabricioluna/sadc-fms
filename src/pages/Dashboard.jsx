// src/pages/Dashboard.jsx
import React from 'react';
import { Users, PlusCircle, Activity, ClipboardList } from 'lucide-react';
// 1. IMPORTA O BOTÃO AQUI:
import BotaoMagico from '../components/BotaoMagico';

export default function Dashboard({ onNavigate, medicoNome = "Dra. Gleyka Santos" }) {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header de Boas-vindas */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Olá, <span className="text-blue-600">{medicoNome}</span>
          </h1>
          <p className="text-slate-500 font-medium">Bem-vinda ao Centro de Comando SADC-PGx.</p>
        </div>
        
        {/* 2. COLOCA O BOTÃO AQUI NO TOPO PARA ACESSO FÁCIL: */}
        <BotaoMagico />
      </header>

      {/* Grid de Ações Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button 
          onClick={() => onNavigate('cadastro')}
          className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm hover:border-blue-500 hover:shadow-md transition-all group text-left"
        >
          <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <PlusCircle size={24} />
          </div>
          <h3 className="font-bold text-slate-900">Novo Paciente</h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">Admissão e triagem inicial.</p>
        </button>

        <button 
          onClick={() => onNavigate('pacientes')}
          className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm hover:border-green-500 hover:shadow-md transition-all group text-left"
        >
          <div className="h-12 w-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
            <Users size={24} />
          </div>
          <h3 className="font-bold text-slate-900">Meus Pacientes</h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">Gestão de prontuários ativos.</p>
        </button>

        {/* ... Outros botões do dashboard ... */}
      </div>

      {/* Seção de Estatísticas Rápidas (Exemplo Profissional) */}
      <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
         <div className="relative z-10">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
               <Activity size={20} className="text-blue-400" /> 
               Monitor de Segurança Clínica
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
               <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Interações Evitadas</p>
                  <p className="text-4xl font-black text-blue-400">12</p>
               </div>
               <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Alertas Farmacogenómicos</p>
                  <p className="text-4xl font-black text-purple-400">05</p>
               </div>
               <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Pacientes Monitorizados</p>
                  <p className="text-4xl font-black text-green-400">248</p>
               </div>
            </div>
         </div>
         {/* Efeito visual de fundo */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
      </section>

    </div>
  );
}