// src/pages/CadastroPaciente.jsx
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Save, User, Dna, AlertCircle, 
  Fingerprint, Ruler, Beaker, Syringe, CheckCircle2, XCircle, Info, ClipboardList, Users
} from 'lucide-react';
import logoFms from '../assets/logo-fms.png';
import logoLiga from '../assets/logo-liga.png';

export default function CadastroPaciente({ onVoltar, onFinalizar, onHome }) {
  const [codigoSADC, setCodigoSADC] = useState('');
  const [temAlergia, setTemAlergia] = useState(false);
  const [possuiGenetica, setPossuiGenetica] = useState(false);
  const [statusVacinal, setStatusVacinal] = useState('ignorado');

  useEffect(() => {
    const randomID = Math.random().toString(36).substring(2, 6).toUpperCase();
    setCodigoSADC(`SADC-2026-${randomID}`);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      
      {/* Header Padronizado */}
      <header className="bg-white p-3 shadow-sm border-b-4 border-[var(--color-fms-verde)] sticky top-0 z-50 flex justify-between items-center">
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
          <p className="text-[10px] text-gray-400 font-bold uppercase leading-none">ID SADC</p>
          <p className="text-xs font-mono font-bold text-[var(--color-fms-azul)]">{codigoSADC}</p>
        </div>
      </header>

      <main className="flex-1 p-4 pb-12 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-[var(--color-fms-azul)] mb-2">Admissão SADC</h2>
          <p className="text-sm text-gray-500 mb-8 font-medium">Mapeamento de variáveis biológicas e histórico clínico.</p>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onFinalizar(); }}>
            
            {/* 1. IDENTIFICAÇÃO E DOCUMENTAÇÃO */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center gap-2 text-[var(--color-fms-verde)] mb-2">
                <Fingerprint size={20} />
                <h3 className="text-xs font-bold uppercase tracking-widest">Identificação Civil</h3>
              </div>
              <input required type="text" placeholder="Nome Completo" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-fms-verde)] font-bold" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input required type="text" placeholder="CPF (Obrigatório)" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-fms-verde)]" />
                <input required type="date" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-fms-verde)]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none">
                  <option value="">Sexo Biológico</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
                <select required className="w-full p-3 bg-blue-50 border border-blue-100 rounded-xl text-sm outline-none font-bold text-[var(--color-fms-azul)]">
                  <option value="">Ancestralidade...</option>
                  <option value="E">Europeia</option>
                  <option value="A">Africana</option>
                  <option value="L">Latina (Admixed)</option>
                  <option value="AS">Asiática</option>
                  <option value="I">Indígena</option>
                </select>
              </div>
            </section>

            {/* 2. BIOMETRIA (Creatinina e QTc removidos conforme solicitado) */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6 text-[var(--color-fms-azul)]">
                <Ruler size={20} />
                <h3 className="text-xs font-bold uppercase tracking-widest">Biometria de Base</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-bold text-gray-400 ml-1 uppercase">Peso (kg)</label>
                  <input type="number" step="0.1" placeholder="70.0" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-fms-azul)]" />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-gray-400 ml-1 uppercase">Altura (m)</label>
                  <input type="number" step="0.01" placeholder="1.70" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-fms-azul)]" />
                </div>
              </div>
            </section>

            {/* 3. COMORBIDADES E HISTÓRICO FAMILIAR (Nomes e campos novos) */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4 text-orange-600">
                  <ClipboardList size={20} />
                  <h3 className="text-xs font-bold uppercase tracking-widest">Comorbidades e Condições Clínicas</h3>
                </div>
                <textarea 
                  placeholder="Liste patologias crônicas ou agudas recentes (Ex: Hipertensão, Diabetes, Insuficiência Renal)..." 
                  className="w-full h-20 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4 text-teal-600">
                  <Users size={20} />
                  <h3 className="text-xs font-bold uppercase tracking-widest">Histórico Familiar</h3>
                </div>
                <textarea 
                  placeholder="Descreva brevemente condições relevantes em familiares de 1º grau..." 
                  className="w-full h-20 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-none"
                />
              </div>
            </section>

            {/* 4. ALERGIAS E REAÇÕES ADVERSAS (Termo atualizado e abrangente) */}
            <section className={`p-6 rounded-2xl shadow-sm border transition-all ${temAlergia ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle size={20} />
                  <h3 className="text-xs font-bold uppercase tracking-widest">Alergias e Reações Adversas</h3>
                </div>
                <input type="checkbox" className="w-6 h-6 accent-red-600 rounded-lg" checked={temAlergia} onChange={(e) => setTemAlergia(e.target.checked)} />
              </div>
              {temAlergia && (
                <textarea 
                  placeholder="Liste qualquer substância (alimentos, látex, fármacos) e a reação apresentada..." 
                  className="w-full h-24 p-3 mt-3 bg-white border border-red-200 rounded-xl text-sm outline-none text-red-900 font-bold" 
                />
              )}
            </section>

            {/* 5. IMUNIZAÇÃO */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4 text-blue-600">
                <Syringe size={20} />
                <h3 className="text-xs font-bold uppercase tracking-widest">Status Vacinal</h3>
              </div>
              <div className="flex gap-2 mb-4">
                <button type="button" onClick={() => setStatusVacinal('dia')} className={`flex-1 p-3 rounded-xl border text-[10px] font-bold flex flex-col items-center gap-1 transition-all ${statusVacinal === 'dia' ? 'bg-green-100 border-green-500 text-green-700 shadow-inner' : 'bg-gray-50 border-gray-200 text-gray-400'}`}><CheckCircle2 size={16} /> Em Dia</button>
                <button type="button" onClick={() => setStatusVacinal('pendente')} className={`flex-1 p-3 rounded-xl border text-[10px] font-bold flex flex-col items-center gap-1 transition-all ${statusVacinal === 'pendente' ? 'bg-orange-100 border-orange-500 text-orange-700 shadow-inner' : 'bg-gray-50 border-gray-200 text-gray-400'}`}><XCircle size={16} /> Pendências</button>
              </div>
              {statusVacinal === 'pendente' && (
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 animate-fade-in">
                  <div className="grid grid-cols-2 gap-2">
                    {['Influenza', 'Antitetânica', 'Febre Amarela*', 'Tríplice*', 'Hepatite B', 'Pneumo'].map(v => (
                      <label key={v} className="flex items-center gap-2 bg-white p-2 rounded border border-gray-100 text-[10px] font-medium"><input type="checkbox" className="w-3 h-3 accent-blue-600" /> {v}</label>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 6. FARMACOGENÔMICA (Painel Mantido) */}
            <section className={`p-6 rounded-2xl shadow-sm border transition-all ${possuiGenetica ? 'bg-purple-50 border-purple-200 shadow-inner' : 'bg-white border-gray-100'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-purple-600">
                  <Dna size={22} />
                  <h3 className="text-xs font-bold uppercase tracking-widest">Farmacogenômica</h3>
                </div>
                <input type="checkbox" className="w-6 h-6 accent-purple-600 rounded-lg" checked={possuiGenetica} onChange={(e) => setPossuiGenetica(e.target.checked)} />
              </div>
              
              {possuiGenetica && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h4 className="text-[10px] font-black text-purple-800 mb-2 uppercase border-b border-purple-100 flex items-center gap-1"><Info size={12}/> Citocromos (Metabolismo)</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {['CYP2D6', 'CYP2C9', 'CYP2C19', 'CYP3A4', 'CYP3A5', 'CYP2B6'].map(gene => (
                        <div key={gene}>
                          <label className="text-[9px] font-bold text-purple-400 ml-1">{gene}</label>
                          <select className="w-full p-2 bg-white border border-purple-100 rounded-lg text-[10px] font-bold text-purple-900 outline-none">
                            <option value="">N/A</option>
                            <option value="NM">NM (Normal)</option>
                            <option value="IM">IM (Interm.)</option>
                            <option value="PM">PM (Lento)</option>
                            <option value="RM">RM (Rápido)</option>
                            <option value="UM">UM (Ultra)</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black text-purple-800 mb-2 uppercase border-b border-purple-100 flex items-center gap-1"><Info size={12}/> Outros Biomarcadores</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {['DPYD', 'TPMT', 'SLCO1B1', 'VKORC1', 'NUDT15', 'G6PD'].map(gene => (
                        <div key={gene}>
                          <label className="text-[9px] font-bold text-purple-400 ml-1">{gene}</label>
                          <select className="w-full p-2 bg-white border border-purple-100 rounded-lg text-[10px] font-bold text-purple-900 outline-none">
                            <option value="">N/A</option>
                            <option value="NM">Normal</option>
                            <option value="IM">Interm.</option>
                            <option value="PM">Lento</option>
                            <option value="DEF">Deficiente</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black text-purple-800 mb-2 uppercase border-b border-purple-100 flex items-center gap-1"><Info size={12}/> Imunogenética (HLA)</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {['HLA-B*57:01', 'HLA-B*15:02', 'HLA-A*31:01'].map(gene => (
                        <div key={gene} className="flex items-center justify-between bg-white p-2 rounded-lg border border-purple-100">
                          <label className="text-[9px] font-bold text-purple-400">{gene}</label>
                          <select className="p-1 bg-purple-50 border-none rounded text-[9px] font-black text-purple-900 outline-none">
                            <option value="">N/A</option>
                            <option value="NEG">NEGATIVO</option>
                            <option value="POS">POSITIVO ⚠️</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </section>

            <button type="submit" className="w-full bg-[var(--color-fms-azul)] text-white font-black py-5 rounded-2xl shadow-xl flex justify-center items-center gap-3 hover:bg-[var(--color-fms-verde)] transition-all transform active:scale-95 border-b-4 border-blue-900">
              <Beaker size={24} />
              FINALIZAR ADMISSÃO
            </button>
          </form>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-auto text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={onHome}>
            <img src={logoFms} alt="FMS" className="h-6 object-contain grayscale opacity-60" />
            <div className="h-4 w-px bg-gray-300"></div>
            <img src={logoLiga} alt="Liga" className="h-6 object-contain grayscale opacity-60" />
          </div>
          <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">
            SADC FMS • DESENVOLVIDO POR <span className="text-[var(--color-fms-azul)] font-black">Fabrício Luna</span>
          </p>
        </div>
      </footer>
    </div>
  );
}