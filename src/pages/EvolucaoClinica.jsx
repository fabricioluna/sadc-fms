// src/pages/EvolucaoClinica.jsx
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Save, Activity, Beaker, Brain, 
  ShieldAlert, Pill, Search, 
  ClipboardCheck, Syringe, Scissors, Plus, Trash2
} from 'lucide-react';
import logoFms from '../assets/logo-fms.png';
import logoLiga from '../assets/logo-liga.png';

export default function EvolucaoClinica({ onVoltar, onFinalizar, onHome }) {
  const [idEvolucao, setIdEvolucao] = useState('');
  const [dataHora, setDataHora] = useState('');
  
  // Estados Dinâmicos
  const [patologias, setPatologias] = useState([]);
  const [novaPatologia, setNovaPatologia] = useState('');
  
  const [cirurgias, setCirurgias] = useState([]);
  const [novaCirurgia, setNovaCirurgia] = useState('');
  
  const [medicacoes, setMedicacoes] = useState([]);
  const [medNome, setMedNome] = useState('');
  const [medDose, setMedDose] = useState('');
  const [medFreq, setMedFreq] = useState('');
  const [medInicio, setMedInicio] = useState('');
  const [medFim, setMedFim] = useState('');

  const [exames, setExames] = useState([]);
  const [exameSelecionado, setExameSelecionado] = useState('');
  const [exameDigitado, setExameDigitado] = useState('');
  const [novoExameResultado, setNovoExameResultado] = useState('');
  const [novoExameData, setNovoExameData] = useState('');

  const [outrasVacinas, setOutrasVacinas] = useState([]);
  const [novaVacinaNome, setNovaVacinaNome] = useState('');
  const [novaVacinaData, setNovaVacinaData] = useState('');

  // Controles de Visibilidade
  const [possuiExames, setPossuiExames] = useState(false);
  const [tipoInputExame, setTipoInputExame] = useState('unidade');
  const [atualizarVacinas, setAtualizarVacinas] = useState(false);
  const [analisando, setAnalisando] = useState(false);

  useEffect(() => {
    const now = new Date();
    setIdEvolucao(`EV-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    setDataHora(now.toLocaleString('pt-BR'));
  }, []);

  // Funções de Lista
  const addPatologia = () => { if (novaPatologia) { setPatologias([...patologias, novaPatologia]); setNovaPatologia(''); } };
  const addCirurgia = () => { if (novaCirurgia) { setCirurgias([...cirurgias, novaCirurgia]); setNovaCirurgia(''); } };
  const addMedicacao = () => {
    if (medNome) {
      setMedicacoes([...medicacoes, { nome: medNome, dose: medDose, freq: medFreq, inicio: medInicio, fim: medFim }]);
      setMedNome(''); setMedDose(''); setMedFreq(''); setMedInicio(''); setMedFim('');
    }
  };
  const addExame = () => { 
    const nomeFinal = exameSelecionado === 'Outros' ? exameDigitado : exameSelecionado;
    if (nomeFinal && novoExameResultado) { 
      setExames([...exames, { nome: nomeFinal, resultado: novoExameResultado, data: novoExameData }]); 
      setExameSelecionado(''); setExameDigitado(''); setNovoExameResultado(''); setNovoExameData(''); 
    } 
  };
  const addOutraVacina = () => {
    if (novaVacinaNome) {
      setOutrasVacinas([...outrasVacinas, { nome: novaVacinaNome, data: novaVacinaData }]);
      setNovaVacinaNome(''); setNovaVacinaData('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      
      {/* HEADER PADRONIZADO */}
      <header className="bg-white p-3 shadow-sm border-b-4 border-green-600 sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button onClick={onVoltar} className="text-gray-400 hover:text-blue-600 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div onClick={onHome} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <img src={logoFms} alt="FMS" className="h-8 object-contain" />
            <div className="h-6 w-px bg-gray-300"></div>
            <img src={logoLiga} alt="Liga" className="h-8 object-contain" />
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-400 font-bold uppercase leading-none">ID EVOLUÇÃO</p>
          <p className="text-xs font-mono font-bold text-blue-700">{idEvolucao}</p>
        </div>
      </header>

      <main className="flex-1 p-4 pb-12 overflow-y-auto max-w-2xl mx-auto w-full space-y-6">
        
        <div className="mb-4">
          <h2 className="text-2xl font-black text-blue-800 mb-1">Evolução Clínica</h2>
          <p className="text-sm text-gray-500 font-medium italic underline decoration-green-600">João Silva • SADC-2026-X812</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          
          {/* 1. SINAIS VITAIS */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6 text-green-600">
              <Activity size={20} />
              <h3 className="text-xs font-bold uppercase tracking-widest">Sinais Vitais (Opcional)</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {['Peso (kg)', 'P.A.', 'F.C. (bpm)', 'Temp (°C)', 'F.R.'].map((label) => (
                <div key={label}>
                  <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">{label}</label>
                  <input type="text" placeholder="--" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-green-500" />
                </div>
              ))}
            </div>
          </section>

          {/* 2. MEDICAMENTOS EM USO ATUALMENTE OU RECENTEMENTE */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-blue-600">
              <Pill size={20} />
              <h3 className="text-xs font-bold uppercase tracking-widest">Medicamentos em Uso Atualmente ou Recentemente</h3>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input value={medNome} onChange={(e) => setMedNome(e.target.value)} type="text" placeholder="Nome da medicação" className="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-500" />
                <input value={medDose} onChange={(e) => setMedDose(e.target.value)} type="text" placeholder="Dose (Ex: 50mg)" className="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-500" />
                <input value={medFreq} onChange={(e) => setMedFreq(e.target.value)} type="text" placeholder="Vezes por dia (Ex: 12/12h)" className="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-500" />
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] font-bold text-gray-500 block ml-1 mb-1 uppercase">Data Início</label>
                    <input type="date" value={medInicio} onChange={(e) => setMedInicio(e.target.value)} className="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-gray-500 block ml-1 mb-1 uppercase">Data Fim</label>
                    <input type="date" value={medFim} onChange={(e) => setMedFim(e.target.value)} className="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-500" />
                  </div>
                </div>
              </div>
              
              {/* BOTÃO CORRIGIDO: Forçando cor via style para garantir visibilidade */}
              <button 
                type="button" 
                onClick={addMedicacao} 
                style={{ backgroundColor: '#2563EB', color: '#FFFFFF' }}
                className="w-full font-bold p-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition-opacity hover:opacity-90"
              >
                <Plus size={20} color="#FFFFFF" /> Adicionar Medicação à Lista
              </button>
            </div>

            {medicacoes.length > 0 && (
              <div className="grid grid-cols-1 gap-2">
                {medicacoes.map((m, i) => (
                  <div key={i} className="bg-blue-50 p-3 rounded-xl border border-blue-200 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-black text-blue-900">{m.nome} <span className="text-[11px] font-bold text-blue-600">- {m.dose} ({m.freq})</span></p>
                      <p className="text-[10px] text-blue-600 font-medium mt-1">Início: {m.inicio || '--'} | Fim: {m.fim || 'Contínuo'}</p>
                    </div>
                    <Trash2 size={18} className="cursor-pointer text-blue-400 hover:text-red-500 transition-colors" onClick={() => setMedicacoes(medicacoes.filter((_, idx) => idx !== i))} />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 3. NOVAS PATOLOGIAS / CONDIÇÕES */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-orange-600">
              <ClipboardCheck size={20} />
              <h3 className="text-xs font-bold uppercase tracking-widest">Novas Patologias / Condições</h3>
            </div>
            <div className="flex gap-2">
              <input value={novaPatologia} onChange={(e) => setNovaPatologia(e.target.value)} type="text" placeholder="Adicionar diagnóstico..." className="flex-1 p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-orange-500" />
              {/* BOTÃO CORRIGIDO: Laranja sólido */}
              <button 
                type="button" 
                onClick={addPatologia} 
                style={{ backgroundColor: '#EA580C' }}
                className="p-3 px-5 rounded-xl flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"
              >
                <Plus size={24} color="#FFFFFF" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {patologias.map((p, i) => (
                <span key={i} className="bg-orange-50 text-orange-900 text-xs font-bold px-3 py-2 rounded-lg border border-orange-200 flex items-center gap-2">
                  {p} <Trash2 size={16} className="cursor-pointer text-orange-500 hover:text-orange-700" onClick={() => setPatologias(patologias.filter((_, idx) => idx !== i))} />
                </span>
              ))}
            </div>
          </section>

          {/* 4. CIRURGIAS RECENTES */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-gray-600">
              <Scissors size={20} />
              <h3 className="text-xs font-bold uppercase tracking-widest">Cirurgias Recentes</h3>
            </div>
            <div className="flex gap-2">
              <textarea value={novaCirurgia} onChange={(e) => setNovaCirurgia(e.target.value)} placeholder="Descreva o procedimento realizado..." className="flex-1 p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-gray-500 h-16 resize-none" />
              {/* BOTÃO CORRIGIDO: Preto sólido */}
              <button 
                type="button" 
                onClick={addCirurgia} 
                style={{ backgroundColor: '#000000' }}
                className="p-3 px-5 rounded-xl flex items-center justify-center h-16 shadow-md hover:opacity-80 transition-opacity"
              >
                <Plus size={24} color="#FFFFFF" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {cirurgias.map((c, i) => (
                <span key={i} className="bg-gray-100 text-gray-900 text-xs font-bold px-3 py-2 rounded-lg border border-gray-300 flex items-center gap-2">
                  {c} <Trash2 size={16} className="cursor-pointer text-gray-500 hover:text-gray-700" onClick={() => setCirurgias(cirurgias.filter((_, idx) => idx !== i))} />
                </span>
              ))}
            </div>
          </section>

          {/* 5. REGISTRO DE EXAMES */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-purple-600">
                <Beaker size={20} />
                <h3 className="text-xs font-bold uppercase tracking-widest">Registro de Exames</h3>
              </div>
              <input type="checkbox" className="w-5 h-5 accent-purple-600 cursor-pointer" checked={possuiExames} onChange={(e) => setPossuiExames(e.target.checked)} />
            </div>

            {possuiExames && (
              <div className="space-y-4 animate-fade-in">
                {/* BOTÕES CORRIGIDOS: Contraste explícito via inline styles */}
                <div className="flex gap-4 mb-4 p-2 rounded-xl" style={{ backgroundColor: '#F3E8FF', border: '1px solid #D8B4FE' }}>
                  <button 
                    type="button" 
                    onClick={() => setTipoInputExame('unidade')} 
                    style={{ 
                      backgroundColor: tipoInputExame === 'unidade' ? '#9333EA' : '#FFFFFF', 
                      color: tipoInputExame === 'unidade' ? '#FFFFFF' : '#7E22CE',
                      border: '1px solid #D8B4FE'
                    }}
                    className="flex-1 py-2 text-[10px] font-black rounded-lg shadow-sm transition-all"
                  >
                    ITEM POR ITEM
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setTipoInputExame('texto')} 
                    style={{ 
                      backgroundColor: tipoInputExame === 'texto' ? '#9333EA' : '#FFFFFF', 
                      color: tipoInputExame === 'texto' ? '#FFFFFF' : '#7E22CE',
                      border: '1px solid #D8B4FE'
                    }}
                    className="flex-1 py-2 text-[10px] font-black rounded-lg shadow-sm transition-all"
                  >
                    TRANSCREVER RESULTADO
                  </button>
                </div>

                {tipoInputExame === 'unidade' ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <select value={exameSelecionado} onChange={(e) => setExameSelecionado(e.target.value)} className="p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-purple-500">
                        <option value="">Escolher exame...</option>
                        <option value="Creatinina Sérica">Creatinina (mg/dL)</option>
                        <option value="Intervalo QTc">Intervalo QTc (ms)</option>
                        <option value="TGO / TGP">TGO / TGP (U/L)</option>
                        <option value="Plaquetas">Plaquetas</option>
                        <option value="Outros">Outros / Qual?</option>
                      </select>
                      
                      {exameSelecionado === 'Outros' && (
                        <input value={exameDigitado} onChange={(e) => setExameDigitado(e.target.value)} type="text" placeholder="Qual exame?" className="p-3 bg-white border border-purple-300 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-purple-500" />
                      )}

                      <div className="flex gap-2 sm:col-span-2">
                        <input value={novoExameResultado} onChange={(e) => setNovoExameResultado(e.target.value)} type="text" placeholder="Resultado" className="flex-1 p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-purple-500" />
                        <input value={novoExameData} onChange={(e) => setNovoExameData(e.target.value)} type="date" className="p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-500 outline-none focus:border-purple-500" />
                        
                        {/* BOTÃO CORRIGIDO: Roxo sólido */}
                        <button 
                          type="button" 
                          onClick={addExame} 
                          style={{ backgroundColor: '#9333EA' }}
                          className="p-3 px-5 rounded-xl flex items-center justify-center shadow-md hover:opacity-90"
                        >
                          <Plus size={24} color="#FFFFFF" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <textarea placeholder="Digite aqui os exames e resultados como no papel (Ex: Hemoglobina: 14g/dL, Glicose: 90mg/dL)..." className="w-full h-32 p-4 bg-gray-50 border border-purple-300 rounded-2xl text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-purple-500 shadow-inner" />
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                  {exames.map((ex, i) => (
                    <div key={i} className="bg-purple-50 p-3 rounded-lg border border-purple-200 flex justify-between items-center">
                      <div>
                        <span className="text-xs font-bold text-purple-900 block">{ex.nome}: <span className="text-purple-600">{ex.resultado}</span></span>
                        {ex.data && <span className="text-[10px] text-purple-500 font-medium">Data: {ex.data}</span>}
                      </div>
                      <Trash2 size={16} className="cursor-pointer text-purple-400 hover:text-red-500 transition-colors" onClick={() => setExames(exames.filter((_, idx) => idx !== i))} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* 6. ATUALIZAR VACINAS */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 text-blue-600">
                <Syringe size={20} />
                <h3 className="text-xs font-bold uppercase tracking-widest">Atualizar Vacinas</h3>
              </div>
              <input type="checkbox" className="w-5 h-5 accent-blue-600 cursor-pointer" checked={atualizarVacinas} onChange={(e) => setAtualizarVacinas(e.target.checked)} />
            </div>
            
            {atualizarVacinas && (
              <div className="space-y-4 mt-4 animate-fade-in">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['Influenza', 'Antitetânica', 'Febre Amarela*', 'Tríplice*', 'Hepatite B'].map(v => (
                    <label key={v} className="flex items-center gap-2 text-[10px] font-bold text-gray-600 uppercase cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 accent-blue-600" /> {v}
                    </label>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <label className="text-[10px] font-bold text-blue-600 mb-2 block uppercase">Outra vacina / Qual?</label>
                  <div className="flex gap-2 mb-3">
                    <input value={novaVacinaNome} onChange={(e) => setNovaVacinaNome(e.target.value)} type="text" placeholder="Nome da vacina" className="flex-1 p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-500" />
                    <input value={novaVacinaData} onChange={(e) => setNovaVacinaData(e.target.value)} type="date" className="p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold text-gray-500 outline-none focus:border-blue-500" />
                    
                    {/* BOTÃO CORRIGIDO: Azul sólido */}
                    <button 
                      type="button" 
                      onClick={addOutraVacina} 
                      style={{ backgroundColor: '#2563EB' }}
                      className="p-3 px-5 rounded-xl flex items-center justify-center shadow-md hover:opacity-90"
                    >
                      <Plus size={24} color="#FFFFFF" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {outrasVacinas.map((v, i) => (
                      <span key={i} className="bg-blue-50 text-blue-900 text-xs font-bold px-3 py-2 rounded-lg border border-blue-200 flex items-center gap-2">
                        {v.nome} {v.data && `(${v.data})`} <Trash2 size={14} className="cursor-pointer text-blue-400 hover:text-red-500" onClick={() => setOutrasVacinas(outrasVacinas.filter((_, idx) => idx !== i))} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* 7. ANAMNESE E EVOLUÇÃO (NLP) */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-green-600">
              <Brain size={22} />
              <h3 className="text-xs font-bold uppercase tracking-widest">Anamnese e Evolução</h3>
            </div>
            <textarea placeholder="Relate as queixas, sintomas atuais e o exame físico..." className="w-full h-64 p-4 bg-gray-50 border border-gray-300 rounded-2xl text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-green-600 transition-all resize-none shadow-inner leading-relaxed" />
          </section>

          {/* 8. MÓDULO DE PRESCRIÇÃO E BOTÕES */}
          <section className="bg-white p-6 rounded-2xl shadow-lg border-2 border-blue-800">
            <h3 className="text-xs font-black uppercase tracking-widest text-blue-800 mb-4 flex items-center gap-2">
              <Pill size={18} /> Módulo de Prescrição Inteligente
            </h3>
            <div className="relative mb-6">
              <input type="text" placeholder="Digitar fármaco para análise de interação..." className="w-full p-4 pl-12 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-600" />
              <Search className="absolute left-4 top-4 text-gray-500" size={20} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* BOTÃO CORRIGIDO: Forçado com inline style Azul */}
              <button 
                type="button"
                onClick={() => { setAnalisando(true); setTimeout(() => setAnalisando(false), 2000); }}
                style={{ backgroundColor: analisando ? '#F97316' : '#2563EB', color: '#FFFFFF' }}
                className="py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-all"
              >
                <ShieldAlert size={20} color="#FFFFFF" /> {analisando ? "Analisando..." : "Analisar Segurança"}
              </button>
              
              {/* BOTÃO CORRIGIDO: Forçado com inline style Verde */}
              <button 
                type="button"
                onClick={onFinalizar} 
                style={{ backgroundColor: '#16A34A', color: '#FFFFFF' }}
                className="py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-all"
              >
                <Save size={20} color="#FFFFFF" /> Finalizar e Assinar
              </button>
            </div>
          </section>

        </form>
      </main>

      {/* RODAPÉ PADRONIZADO */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={onHome}>
            <img src={logoFms} alt="FMS" className="h-6 object-contain grayscale opacity-60" />
            <div className="h-4 w-px bg-gray-300"></div>
            <img src={logoLiga} alt="Liga" className="h-6 object-contain grayscale opacity-60" />
          </div>
          <p className="text-[10px] text-gray-400 font-medium">Desenvolvido por <span className="text-blue-800 font-extrabold">Fabrício Luna</span></p>
        </div>
      </footer>
    </div>
  );
}