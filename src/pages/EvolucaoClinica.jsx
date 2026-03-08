// src/pages/EvolucaoClinica.jsx
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Save, Activity, Beaker, Heart, Brain, 
  AlertTriangle, ShieldAlert, Thermometer, Pill, Search, 
  ClipboardCheck, Droplet, Stethoscope, Syringe, Scissors
} from 'lucide-react';
import logoFms from '../assets/logo-fms.png';
import logoLiga from '../assets/logo-liga.png';

export default function EvolucaoClinica({ onVoltar, onFinalizar, onHome }) {
  const [idEvolucao, setIdEvolucao] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [analisando, setAnalisando] = useState(false);

  useEffect(() => {
    const now = new Date();
    setIdEvolucao(`EV-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    setDataHora(now.toLocaleString('pt-BR'));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 pb-10">
      
      {/* 1. CABEÇALHO DE IDENTIFICAÇÃO DA CONSULTA */}
      <header className="bg-white p-3 shadow-sm border-b-4 border-[var(--color-fms-azul)] sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button onClick={onVoltar} className="text-gray-400 hover:text-[var(--color-fms-azul)] transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div onClick={onHome} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <img src={logoFms} alt="FMS" className="h-8 object-contain" />
            <div className="h-6 w-px bg-gray-300"></div>
            <img src={logoLiga} alt="Liga" className="h-8 object-contain" />
          </div>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-black text-[var(--color-fms-azul)] uppercase tracking-tighter leading-none">{idEvolucao}</p>
          <p className="text-[10px] text-gray-400 font-bold mt-1">{dataHora}</p>
        </div>
      </header>

      <main className="flex-1 p-4 overflow-y-auto max-w-4xl mx-auto w-full">
        
        {/* Banner do Paciente */}
        <div className="flex items-center gap-3 mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-[var(--color-fms-azul)] font-black">JS</div>
          <div>
            <h2 className="text-lg font-black text-gray-800 leading-tight">João Silva</h2>
            <p className="text-[10px] bg-blue-50 text-[var(--color-fms-azul)] px-2 py-0.5 rounded-full inline-block font-bold mt-1">Monitoramento Ativo: Dra. Gleyka Santos</p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          
          {/* 2. BIOMETRIA E SINAIS VITAIS (DINÂMICOS) */}
          <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Activity size={16} className="text-[var(--color-fms-verde)]" /> Biometria e Sinais Vitais
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="bg-gray-50 p-2 rounded-xl border border-gray-100">
                <label className="text-[9px] font-bold text-gray-400 block mb-1 uppercase">Peso (kg)</label>
                <input type="number" step="0.1" placeholder="70.5" className="w-full bg-transparent text-xs font-bold outline-none focus:text-[var(--color-fms-azul)]" />
              </div>
              <div className="bg-gray-50 p-2 rounded-xl border border-gray-100">
                <label className="text-[9px] font-bold text-gray-400 block mb-1 uppercase">P.A. (mmHg)</label>
                <input type="text" placeholder="120/80" className="w-full bg-transparent text-xs font-bold outline-none focus:text-[var(--color-fms-azul)]" />
              </div>
              <div className="bg-gray-50 p-2 rounded-xl border border-gray-100">
                <label className="text-[9px] font-bold text-gray-400 block mb-1 uppercase">F.C. (bpm)</label>
                <input type="number" placeholder="80" className="w-full bg-transparent text-xs font-bold outline-none focus:text-[var(--color-fms-azul)]" />
              </div>
              <div className="bg-gray-50 p-2 rounded-xl border border-gray-100">
                <label className="text-[9px] font-bold text-gray-400 block mb-1 uppercase">Temp. (°C)</label>
                <input type="number" step="0.1" placeholder="36.5" className="w-full bg-transparent text-xs font-bold outline-none focus:text-[var(--color-fms-azul)]" />
              </div>
              <div className="bg-gray-50 p-2 rounded-xl border border-gray-100">
                <label className="text-[9px] font-bold text-gray-400 block mb-1 uppercase">F.R. (ipm)</label>
                <input type="number" placeholder="18" className="w-full bg-transparent text-xs font-bold outline-none focus:text-[var(--color-fms-azul)]" />
              </div>
            </div>
          </section>

          {/* 3. MONITORAMENTO MULTISSISTÊMICO (EIXOS LABORATORIAIS) */}
          <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Beaker size={16} className="text-purple-600" /> Eixos Laboratoriais de Segurança
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Eixo Renal */}
              <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                <label className="text-[9px] font-black text-red-700 uppercase mb-1 block">Creatinina (mg/dL)</label>
                <input type="number" step="0.01" placeholder="0.00" className="w-full bg-transparent text-sm font-bold outline-none text-red-900" />
              </div>
              {/* Eixo Hepático */}
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                <label className="text-[9px] font-black text-amber-700 uppercase mb-1 block">TGO / TGP (U/L)</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="TGO" className="w-1/2 bg-transparent text-xs font-bold outline-none text-amber-900" />
                  <input type="number" placeholder="TGP" className="w-1/2 bg-transparent text-xs font-bold outline-none text-amber-900" />
                </div>
              </div>
              {/* Bilirrubinas */}
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                <label className="text-[9px] font-black text-amber-700 uppercase mb-1 block">Bilirrubinas (T/D)</label>
                <input type="text" placeholder="0.0 / 0.0" className="w-full bg-transparent text-xs font-bold outline-none text-amber-900" />
              </div>
              {/* Eixo Hematológico */}
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                <label className="text-[9px] font-black text-gray-600 uppercase mb-1 block">Neutrófilos / Plaquetas</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="Neut" className="w-1/2 bg-transparent text-xs font-bold outline-none" />
                  <input type="number" placeholder="Plaq" className="w-1/2 bg-transparent text-xs font-bold outline-none" />
                </div>
              </div>
              {/* Eixo Cardio */}
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                <label className="text-[9px] font-black text-blue-700 uppercase mb-1 block">Intervalo QTc (ms)</label>
                <input type="number" placeholder="000" className="w-full bg-transparent text-sm font-bold outline-none text-blue-900" />
              </div>
              {/* Eixo Metabólico */}
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                <label className="text-[9px] font-black text-gray-600 uppercase mb-1 block">Glicemia / Lípides</label>
                <input type="text" placeholder="Glic / Col / Trig" className="w-full bg-transparent text-[10px] font-bold outline-none" />
              </div>
            </div>
          </section>

          {/* 4. ATUALIZAÇÃO DE HISTÓRICO E CONDIÇÕES CLÍNICAS */}
          <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <ClipboardCheck size={16} className="text-orange-500" /> Atualização de Status Clínico
            </h3>
            <div className="space-y-4">
              <div className="relative">
                <label className="text-[9px] font-bold text-gray-400 uppercase mb-1 block">Novas Patologias / CID-10</label>
                <input type="text" placeholder="Buscar CID-10..." className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <Scissors size={18} className="text-gray-400" />
                  <input type="text" placeholder="Cirurgias Recentes..." className="bg-transparent text-xs outline-none w-full" />
                </div>
                <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-xl border border-blue-100">
                  <Syringe size={18} className="text-blue-500" />
                  <span className="text-[10px] font-bold text-blue-700">Atualizar Vacinas?</span>
                  <input type="checkbox" className="w-4 h-4 accent-blue-600 ml-auto" />
                </div>
              </div>
            </div>
          </section>

          {/* 5. EVOLUÇÃO CLÍNICA E ANAMNESE (CORAÇÃO DO NLP) */}
          <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Brain size={18} className="text-[var(--color-fms-verde)]" /> Anamnese e Evolução Subjetiva (NLP)
              </h3>
              <div className="flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[9px] text-green-700 font-bold uppercase">Motor F.O.N.T.E Online</span>
              </div>
            </div>
            <textarea 
              placeholder="Ex: Paciente relata cefaleia persistente e epigastralgia após início de novo fármaco. Ao exame físico nota-se tremor de extremidades..." 
              className="w-full h-64 p-5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-[var(--color-fms-verde)] transition-all resize-none shadow-inner leading-relaxed"
            />
          </section>

          {/* 6. MÓDULO DE PRESCRIÇÃO E AÇÃO */}
          <section className="bg-gray-900 p-6 rounded-[2.5rem] shadow-2xl text-white border-b-8 border-blue-900">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                <Pill size={18} /> Módulo de Prescrição Inteligente
              </h3>
              <span className="text-[9px] bg-gray-800 text-gray-400 px-2 py-1 rounded border border-gray-700 font-mono italic">DrugBank Integrated</span>
            </div>
            
            <div className="relative mb-8">
              <input 
                type="text" 
                placeholder="Digitar fármaco para análise de interação..." 
                className="w-full p-5 pl-14 bg-gray-800 border border-gray-700 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-500/30 text-white placeholder-gray-500 transition-all font-bold"
              />
              <Search className="absolute left-5 top-5 text-gray-500" size={24} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => { setAnalisando(true); setTimeout(() => setAnalisando(false), 2000); }}
                className={`group py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl ${analisando ? 'bg-orange-500 animate-pulse ring-4 ring-orange-500/20' : 'bg-blue-600 hover:bg-blue-500'}`}
              >
                {analisando ? <ShieldAlert size={22} /> : <ShieldAlert size={22} className="group-hover:animate-bounce" />}
                {analisando ? "Processando 5 Eixos..." : "Analisar Segurança"}
              </button>
              
              <button 
                type="submit" 
                onClick={onFinalizar}
                className="py-5 bg-[var(--color-fms-verde)] hover:bg-green-500 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl"
              >
                <Save size={22} /> Finalizar e Assinar
              </button>
            </div>
          </section>

        </form>
      </main>

      {/* RODAPÉ INSTITUCIONAL */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={onHome}>
            <img src={logoFms} alt="FMS" className="h-6 object-contain grayscale opacity-60" />
            <div className="h-4 w-px bg-gray-300"></div>
            <img src={logoLiga} alt="Liga" className="h-6 object-contain grayscale opacity-60" />
          </div>
          <p className="text-[10px] text-gray-400 font-black tracking-[0.2em] uppercase">
            DESENVOLVIDO POR <span className="text-[var(--color-fms-azul)]">FABRÍCIO LUNA</span>
          </p>
        </div>
      </footer>
    </div>
  );
}