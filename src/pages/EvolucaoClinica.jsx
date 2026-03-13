// src/pages/EvolucaoClinica.jsx
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Save, Activity, Beaker, Brain, 
  ShieldAlert, Pill, Search, User, AlertTriangle, FileText, ChevronRight,
  ClipboardCheck, Syringe, Scissors, Plus, Trash2, Calendar, Dna, Info, Clock, Loader2
} from 'lucide-react';
import logoFms from '../assets/logo-fms.png';
import logoLiga from '../assets/logo-liga.png';
import { salvarEvolucaoDb, listarEvolucoesDb } from '../services/firebase';

export default function EvolucaoClinica({ pacienteSelecionado, onVoltar, onFinalizar, onHome }) {
  // Fases: 'resumo' (Tela de Confirmação) ou 'form' (Preenchimento)
  const [fase, setFase] = useState(pacienteSelecionado ? 'resumo' : 'selecao');
  const [pacienteAtual, setPacienteAtual] = useState(pacienteSelecionado || null);
  const [termoBusca, setTermoBusca] = useState('');

  const [idEvolucao, setIdEvolucao] = useState('');
  const [dataSistema, setDataSistema] = useState('');
  const [dataAtendimento, setDataAtendimento] = useState('');
  
  const [historicoReal, setHistoricoReal] = useState([]);
  const [carregandoHist, setCarregandoHist] = useState(true);
  const [salvando, setSalvando] = useState(false);

  // Estados Dinâmicos do Formulário
  const [peso, setPeso] = useState('');
  const [pa, setPa] = useState('');
  const [fc, setFc] = useState('');
  const [temp, setTemp] = useState('');
  const [fr, setFr] = useState('');
  const [anamnese, setAnamnese] = useState('');
  
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
  const [transcricaoExames, setTranscricaoExames] = useState('');
  
  const [vacinasAplicadas, setVacinasAplicadas] = useState([]);
  const [vacinaSelecionada, setVacinaSelecionada] = useState('');
  const [vacinaDigitada, setVacinaDigitada] = useState('');
  const [novaVacinaData, setNovaVacinaData] = useState('');
  
  const [genetica, setGenetica] = useState({});
  const [novaPrescricaoFaco, setNovaPrescricaoFaco] = useState('');
  const [novaPrescricaoTempo, setNovaPrescricaoTempo] = useState('');

  // Controles de Visibilidade
  const [possuiExames, setPossuiExames] = useState(false);
  const [tipoInputExame, setTipoInputExame] = useState('unidade');
  const [atualizarVacinas, setAtualizarVacinas] = useState(false);
  const [possuiGenetica, setPossuiGenetica] = useState(false);
  const [possuiPrescricao, setPossuiPrescricao] = useState(false);
  const [analisando, setAnalisando] = useState(false);

  // EFEITOS
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fase]);

  useEffect(() => {
    const now = new Date();
    setIdEvolucao(`EV-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    setDataSistema(now.toLocaleString('pt-BR'));
    setDataAtendimento(now.toISOString().split('T')[0]);
    
    if (pacienteAtual?.id) {
      listarEvolucoesDb(pacienteAtual.id).then(dados => {
        setHistoricoReal(dados);
        setCarregandoHist(false);
      });
    }
  }, [pacienteAtual]);

  // Funções de Lista do Form
  const addPatologia = () => { if (novaPatologia) { setPatologias([...patologias, novaPatologia]); setNovaPatologia(''); } };
  const addCirurgia = () => { if (novaCirurgia) { setCirurgias([...cirurgias, novaCirurgia]); setNovaCirurgia(''); } };
  const addMedicacao = () => { if (medNome) { setMedicacoes([...medicacoes, { nome: medNome, dose: medDose, freq: medFreq, inicio: medInicio, fim: medFim }]); setMedNome(''); setMedDose(''); setMedFreq(''); setMedInicio(''); setMedFim(''); } };
  const addExame = () => { const nomeFinal = exameSelecionado === 'Outros' ? exameDigitado : exameSelecionado; if (nomeFinal && novoExameResultado) { setExames([...exames, { nome: nomeFinal, resultado: novoExameResultado, data: novoExameData }]); setExameSelecionado(''); setExameDigitado(''); setNovoExameResultado(''); setNovoExameData(''); } };
  const addVacina = () => { const nomeFinal = vacinaSelecionada === 'Outra' ? vacinaDigitada : vacinaSelecionada; if (nomeFinal) { setVacinasAplicadas([...vacinasAplicadas, { nome: nomeFinal, data: novaVacinaData }]); setVacinaSelecionada(''); setVacinaDigitada(''); setNovaVacinaData(''); } };

  // Salvar Firebase
  const handleFinalizar = async () => {
    if (!anamnese) return alert("Por favor, preencha a anamnese antes de finalizar.");
    setSalvando(true);
    const dados = {
      idEvolucao, dataAtendimento, anamnese,
      sinaisVitais: { peso, pa, fc, temp, fr },
      patologias, cirurgias, medicacoes, exames, vacinas: vacinasAplicadas, genetica,
      prescricao: possuiPrescricao ? { farmaco: novaPrescricaoFaco, tempo: novaPrescricaoTempo } : null,
      medico: "Dra. Gleyka Santos"
    };
    const ok = await salvarEvolucaoDb(pacienteAtual.id, dados);
    setSalvando(false);
    if (ok) onFinalizar();
  };

  const handleVoltar = () => {
    if (fase === 'form') setFase('resumo');
    else if (fase === 'resumo' && !pacienteSelecionado) setFase('selecao');
    else onVoltar();
  };

  if (!pacienteAtual && fase !== 'selecao') return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      
      {/* HEADER PADRONIZADO */}
      <header className="bg-white p-3 shadow-sm border-b-4 border-green-600 sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button onClick={handleVoltar} className="text-gray-400 hover:text-blue-600 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div onClick={onHome} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <img src={logoFms} alt="FMS" className="h-8 object-contain" />
            <div className="h-6 w-px bg-gray-300"></div>
            <img src={logoLiga} alt="Liga" className="h-8 object-contain" />
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-400 font-bold uppercase leading-none">ID SISTEMA</p>
          <p className="text-xs font-mono font-bold text-blue-700">{idEvolucao}</p>
        </div>
      </header>

      {/* =========================================================
          FASE 1: TELA DE CONFIRMAÇÃO DO PACIENTE (RESUMO)
          ========================================================= */}
      {fase === 'resumo' && pacienteAtual && (
        <main className="flex-1 p-4 pb-12 overflow-y-auto max-w-2xl mx-auto w-full space-y-6 mt-4 animate-fade-in">
          
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 text-center">
            <div className="h-20 w-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white font-black text-3xl mx-auto mb-4 shadow-lg transform rotate-3">
              {pacienteAtual.nome?.charAt(0)}
            </div>
            <h2 className="text-2xl font-black text-gray-900 leading-tight">{pacienteAtual.nome}</h2>
            <p className="text-xs font-black text-blue-600 uppercase tracking-widest mt-1">{pacienteAtual.id}</p>
            <div className="flex justify-center gap-4 mt-4 text-sm font-bold text-gray-600">
              <span>{pacienteAtual.idade} anos</span>
              <span>•</span>
              <span>{pacienteAtual.sexo === 'M' ? 'Masculino' : 'Feminino'}</span>
              <span>•</span>
              <span className="text-red-500">Sangue {pacienteAtual.tipoSanguineo || 'N/I'}</span>
            </div>
          </div>

          <div className="bg-red-50 p-5 rounded-2xl border-2 border-red-200">
            <h3 className="text-xs font-black text-red-700 uppercase tracking-widest mb-3 flex items-center gap-2">
              <AlertTriangle size={18} /> Alergias Cadastradas
            </h3>
            <div className="flex flex-wrap gap-2">
              {pacienteAtual.alergias?.length > 0 ? pacienteAtual.alergias.map((alergia, i) => (
                <span key={i} className="bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-sm">
                  {alergia}
                </span>
              )) : <span className="text-xs font-bold text-red-400 italic">Nenhuma alergia relatada</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Comorbidades Base</h3>
              <ul className="space-y-2">
                {pacienteAtual.comorbidades?.length > 0 ? pacienteAtual.comorbidades.map((c, i) => (
                  <li key={i} className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div> {c}
                  </li>
                )) : <li className="text-sm font-bold text-gray-400 italic">Nenhuma registrada</li>}
              </ul>
            </div>

            <div className="bg-purple-50 p-5 rounded-2xl border border-purple-200 shadow-sm">
              <h3 className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-3 flex items-center gap-1"><Dna size={14}/> Genômica (Alertas)</h3>
              {pacienteAtual.genetica && Object.keys(pacienteAtual.genetica).length > 0 ? (
                <ul className="space-y-2">
                  {Object.entries(pacienteAtual.genetica).map(([gene, status], i) => (
                    <li key={i} className="text-xs font-bold text-purple-900 bg-white p-2 rounded-lg border border-purple-100 flex justify-between">
                      <span>{gene}</span> <span className="text-purple-600">{status}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs font-bold text-purple-400 italic">Nenhum exame genético mapeado.</p>
              )}
            </div>
          </div>

          {/* HISTÓRICO DA TELA DE RESUMO */}
          <div className="mb-6 bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-slate-600">
              <Clock size={18} />
              <h3 className="text-xs font-bold uppercase tracking-widest">Histórico de Evoluções Anteriores</h3>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 max-h-[300px] overflow-y-auto shadow-inner space-y-4">
              {carregandoHist ? <Loader2 className="animate-spin mx-auto text-blue-500" /> : historicoReal.length > 0 ? (
                historicoReal.map((evo, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-center mb-2 border-b border-gray-100 pb-2">
                      <span className="text-xs font-black text-blue-800">{new Date(evo.dataAtendimento).toLocaleDateString('pt-BR')}</span>
                      <span className="text-[10px] font-bold text-gray-500 uppercase">{evo.medico}</span>
                    </div>
                    <p className="text-xs font-medium text-gray-700 whitespace-pre-line leading-relaxed">
                      {evo.anamnese}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs font-bold text-gray-400 text-center py-6">Nenhum histórico de evolução encontrado para este paciente.</p>
              )}
            </div>
          </div>

          <div className="pt-6">
            <button 
              onClick={() => setFase('form')}
              style={{ backgroundColor: '#16A34A', color: '#FFFFFF' }}
              className="w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:opacity-90 transition-all transform active:scale-95"
            >
              <FileText size={24} /> Iniciar Nova Evolução
            </button>
          </div>
        </main>
      )}

      {/* =========================================================
          FASE 2: FORMULÁRIO DE EVOLUÇÃO COMPLETO
          ========================================================= */}
      {fase === 'form' && pacienteAtual && (
        <main className="flex-1 p-4 pb-12 overflow-y-auto max-w-2xl mx-auto w-full space-y-6 mt-4 animate-fade-in">
          
          {/* ==========================================
              CABEÇALHO FIXO DO FORMULÁRIO: DADOS + HISTÓRICO 
              ========================================== */}
          <div className="mb-6 bg-white p-5 rounded-3xl border-2 border-blue-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-black text-blue-900 leading-tight">{pacienteAtual.nome}</h2>
                <p className="text-xs font-black text-blue-600 uppercase tracking-widest mt-1">
                  {pacienteAtual.id} • {pacienteAtual.idade} anos • {pacienteAtual.sexo === 'M' ? 'Masculino' : 'Feminino'} • Sangue <span className="text-red-500">{pacienteAtual.tipoSanguineo || 'N/I'}</span>
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md transform rotate-3">
                {pacienteAtual.nome?.charAt(0)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-gray-100">
              <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                <h3 className="text-[9px] font-black text-red-700 uppercase mb-1 tracking-widest flex items-center gap-1"><AlertTriangle size={12}/> Alergias</h3>
                <p className="text-xs font-bold text-red-900">{pacienteAtual.alergias?.join(', ') || 'Nenhuma'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                <h3 className="text-[9px] font-black text-gray-500 uppercase mb-1 tracking-widest">Comorbidades</h3>
                <p className="text-xs font-bold text-gray-700">{pacienteAtual.comorbidades?.join(', ') || 'Nenhuma'}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-xl border border-purple-100">
                <h3 className="text-[9px] font-black text-purple-600 uppercase mb-1 tracking-widest flex items-center gap-1"><Dna size={12}/> Genética</h3>
                <p className="text-xs font-bold text-purple-900">
                  {pacienteAtual.genetica && Object.keys(pacienteAtual.genetica).length > 0
                    ? Object.entries(pacienteAtual.genetica).map(([g, s]) => `${g}:${s}`).join(' | ')
                    : 'Nenhum laudo'}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6 bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-slate-600">
              <Clock size={18} />
              <h3 className="text-xs font-bold uppercase tracking-widest">Histórico de Evoluções Anteriores</h3>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 max-h-[300px] overflow-y-auto shadow-inner space-y-4">
              {carregandoHist ? <Loader2 className="animate-spin mx-auto text-blue-500" /> : historicoReal.length > 0 ? (
                historicoReal.map((evo, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-center mb-2 border-b border-gray-100 pb-2">
                      <span className="text-xs font-black text-blue-800">{new Date(evo.dataAtendimento).toLocaleDateString('pt-BR')}</span>
                      <span className="text-[10px] font-bold text-gray-500 uppercase">{evo.medico}</span>
                    </div>
                    <p className="text-xs font-medium text-gray-700 whitespace-pre-line leading-relaxed">
                      {evo.anamnese}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs font-bold text-gray-400 text-center py-6">Nenhum histórico de evolução encontrado.</p>
              )}
            </div>
          </div>
          {/* ========================================== */}

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

            {/* DATA DO ATENDIMENTO */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4 text-blue-800">
                <Calendar size={20} />
                <h3 className="text-xs font-bold uppercase tracking-widest">Data do Atendimento</h3>
              </div>
              <div className="w-full sm:w-1/2">
                <label className="text-[10px] font-bold text-gray-500 block ml-1 mb-1 uppercase">Confirmar Data</label>
                <input type="date" value={dataAtendimento} onChange={(e) => setDataAtendimento(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-600" />
              </div>
            </section>
            
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
                    <input type="text" placeholder="--" onChange={e => {
                      if(label.includes('Peso')) setPeso(e.target.value);
                      if(label.includes('P.A')) setPa(e.target.value);
                      if(label.includes('F.C')) setFc(e.target.value);
                      if(label.includes('Temp')) setTemp(e.target.value);
                      if(label.includes('F.R')) setFr(e.target.value);
                    }} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-green-500" />
                  </div>
                ))}
              </div>
            </section>

            {/* 2. MEDICAMENTOS EM USO */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4 text-blue-600">
                <Pill size={20} />
                <h3 className="text-xs font-bold uppercase tracking-widest">Medicamentos em Uso</h3>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <input value={medNome} onChange={(e) => setMedNome(e.target.value)} type="text" placeholder="Nome da medicação" className="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-500" />
                  <input value={medDose} onChange={(e) => setMedDose(e.target.value)} type="text" placeholder="Dose (Ex: 50mg)" className="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-500" />
                  <input value={medFreq} onChange={(e) => setMedFreq(e.target.value)} type="text" placeholder="Vezes/dia (Ex: 12/12h)" className="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-500" />
                  <div className="grid grid-cols-2 gap-2">
                    <div><label className="text-[9px] font-bold text-gray-500 block ml-1 mb-1 uppercase">Início</label><input type="date" value={medInicio} onChange={(e) => setMedInicio(e.target.value)} className="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-500" /></div>
                    <div><label className="text-[9px] font-bold text-gray-500 block ml-1 mb-1 uppercase">Fim</label><input type="date" value={medFim} onChange={(e) => setMedFim(e.target.value)} className="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-500" /></div>
                  </div>
                </div>
                <button type="button" onClick={addMedicacao} style={{ backgroundColor: '#2563EB', color: '#FFFFFF' }} className="w-full font-bold p-3 rounded-xl flex items-center justify-center gap-2 shadow-md hover:opacity-90">
                  <Plus size={20} color="#FFFFFF" /> Adicionar Medicação à Lista
                </button>
              </div>
              {medicacoes.length > 0 && (
                <div className="grid grid-cols-1 gap-2">
                  {medicacoes.map((m, i) => (
                    <div key={i} className="bg-blue-50 p-3 rounded-xl border border-blue-200 flex justify-between items-center">
                      <div><p className="text-sm font-black text-blue-900">{m.nome} <span className="text-[11px] font-bold text-blue-600">- {m.dose} ({m.freq})</span></p><p className="text-[10px] text-blue-600 font-medium mt-1">Início: {m.inicio || '--'} | Fim: {m.fim || 'Contínuo'}</p></div>
                      <Trash2 size={18} className="cursor-pointer text-blue-400 hover:text-red-500" onClick={() => setMedicacoes(medicacoes.filter((_, idx) => idx !== i))} />
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* 3. PATOLOGIAS */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4 text-orange-600">
                <ClipboardCheck size={20} />
                <h3 className="text-xs font-bold uppercase tracking-widest">Novas Patologias / Condições</h3>
              </div>
              <div className="flex gap-2">
                <input value={novaPatologia} onChange={(e) => setNovaPatologia(e.target.value)} type="text" placeholder="Adicionar diagnóstico..." className="flex-1 p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-orange-500" />
                <button type="button" onClick={addPatologia} style={{ backgroundColor: '#EA580C' }} className="p-3 px-5 rounded-xl flex items-center justify-center shadow-md hover:opacity-90">
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

            {/* 4. CIRURGIAS */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4 text-slate-600">
                <Scissors size={20} />
                <h3 className="text-xs font-bold uppercase tracking-widest">Cirurgias Recentes</h3>
              </div>
              <div className="flex gap-2">
                <input value={novaCirurgia} onChange={(e) => setNovaCirurgia(e.target.value)} type="text" placeholder="Descreva o procedimento..." className="flex-1 p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-gray-500" />
                <button type="button" onClick={addCirurgia} style={{ backgroundColor: '#000000' }} className="p-3 px-5 rounded-xl flex items-center justify-center shadow-md hover:opacity-80">
                  <Plus size={24} color="#FFFFFF" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {cirurgias.map((c, i) => (
                  <span key={i} className="bg-gray-100 text-slate-900 text-xs font-bold px-3 py-2 rounded-lg border border-slate-300 flex items-center gap-2">
                    {c} <Trash2 size={16} className="cursor-pointer text-slate-500 hover:text-slate-700" onClick={() => setCirurgias(cirurgias.filter((_, idx) => idx !== i))} />
                  </span>
                ))}
              </div>
            </section>

            {/* 5. EXAMES */}
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
                  <div className="flex gap-4 mb-4 p-2 rounded-xl" style={{ backgroundColor: '#F3E8FF', border: '1px solid #D8B4FE' }}>
                    <button type="button" onClick={() => setTipoInputExame('unidade')} style={{ backgroundColor: tipoInputExame === 'unidade' ? '#9333EA' : '#FFFFFF', color: tipoInputExame === 'unidade' ? '#FFFFFF' : '#7E22CE', border: '1px solid #D8B4FE' }} className="flex-1 py-2 text-[10px] font-black rounded-lg shadow-sm transition-all">ITEM POR ITEM</button>
                    <button type="button" onClick={() => setTipoInputExame('texto')} style={{ backgroundColor: tipoInputExame === 'texto' ? '#9333EA' : '#FFFFFF', color: tipoInputExame === 'texto' ? '#FFFFFF' : '#7E22CE', border: '1px solid #D8B4FE' }} className="flex-1 py-2 text-[10px] font-black rounded-lg shadow-sm transition-all">TRANSCREVER RESULTADO</button>
                  </div>
                  {tipoInputExame === 'unidade' ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-3">
                        <select value={exameSelecionado} onChange={(e) => setExameSelecionado(e.target.value)} className="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-purple-500">
                          <option value="">Escolher exame...</option><option value="Creatinina Sérica">Creatinina (mg/dL)</option><option value="Intervalo QTc">Intervalo QTc (ms)</option><option value="TGO / TGP">TGO / TGP (U/L)</option><option value="Plaquetas">Plaquetas</option><option value="Outros">Outros / Qual?</option>
                        </select>
                        {exameSelecionado === 'Outros' && <input value={exameDigitado} onChange={(e) => setExameDigitado(e.target.value)} type="text" placeholder="Qual exame?" className="w-full p-3 bg-white border border-purple-300 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-purple-500" />}
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input value={novoExameResultado} onChange={(e) => setNovoExameResultado(e.target.value)} type="text" placeholder="Resultado" className="flex-1 min-w-0 p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-purple-500" />
                          <input value={novoExameData} onChange={(e) => setNovoExameData(e.target.value)} type="date" className="flex-1 min-w-0 p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-500 outline-none focus:border-purple-500" />
                          <button type="button" onClick={addExame} style={{ backgroundColor: '#9333EA' }} className="w-full sm:w-auto p-3 px-6 rounded-xl flex items-center justify-center shadow-md hover:opacity-90"><Plus size={24} color="#FFFFFF" /></button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-2 mt-4">
                        {exames.map((ex, i) => (
                          <div key={i} className="bg-purple-50 p-3 rounded-lg border border-purple-200 flex justify-between items-center">
                            <div><span className="text-xs font-bold text-purple-900 block">{ex.nome}: <span className="text-purple-600">{ex.resultado}</span></span>{ex.data && <span className="text-[10px] text-purple-500 font-medium">Data: {ex.data}</span>}</div>
                            <Trash2 size={16} className="cursor-pointer text-purple-400 hover:text-red-500" onClick={() => setExames(exames.filter((_, idx) => idx !== i))} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (<textarea value={transcricaoExames} onChange={(e) => setTranscricaoExames(e.target.value)} placeholder="Digite aqui os exames..." className="w-full min-h-[150px] p-4 bg-gray-50 border border-purple-300 rounded-2xl text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-purple-500 shadow-inner" />)}
                </div>
              )}
            </section>

            {/* 6. VACINAS */}
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
                  <div className="grid grid-cols-1 gap-3">
                    <select value={vacinaSelecionada} onChange={(e) => setVacinaSelecionada(e.target.value)} className="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-500">
                      <option value="">Escolher vacina...</option><option value="Influenza">Influenza</option><option value="Antitetânica">Antitetânica</option><option value="Febre Amarela*">Febre Amarela*</option><option value="Hepatite B">Hepatite B</option><option value="Pneumocócica">Pneumocócica</option><option value="Outra">Outra / Qual?</option>
                    </select>
                    {vacinaSelecionada === 'Outra' && <input value={vacinaDigitada} onChange={(e) => setVacinaDigitada(e.target.value)} type="text" placeholder="Qual vacina?" className="w-full p-3 bg-white border border-blue-300 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-500" />}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input value={novaVacinaData} onChange={(e) => setNovaVacinaData(e.target.value)} type="date" className="flex-1 min-w-0 p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-500 outline-none focus:border-blue-500" />
                      <button type="button" onClick={addVacina} style={{ backgroundColor: '#2563EB' }} className="w-full sm:w-auto p-3 px-6 rounded-xl flex items-center justify-center shadow-md hover:opacity-90"><Plus size={24} color="#FFFFFF" /></button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {vacinasAplicadas.map((v, i) => (
                      <span key={i} className="bg-blue-50 text-blue-900 text-xs font-bold px-3 py-2 rounded-lg border border-blue-200 flex items-center gap-2">{v.nome} {v.data && `(${v.data})`} <Trash2 size={14} className="cursor-pointer text-blue-400 hover:text-red-500" onClick={() => setVacinasAplicadas(vacinasAplicadas.filter((_, idx) => idx !== i))} /></span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 7. FARMACOGENÔMICA (EXAME GENÉTICO) */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-purple-600"><Dna size={22} /><h3 className="text-xs font-bold uppercase tracking-widest">Exame Genético (Farmacogenômica)</h3></div>
                <input type="checkbox" className="w-5 h-5 accent-purple-600 rounded-lg cursor-pointer" checked={possuiGenetica} onChange={(e) => setPossuiGenetica(e.target.checked)} />
              </div>
              {possuiGenetica && (
                <div className="space-y-6 animate-fade-in pt-4 border-t border-gray-100">
                  <div>
                    <h4 className="text-[10px] font-black text-purple-800 mb-2 uppercase border-b border-purple-100 flex items-center gap-1"><Info size={12}/> Citocromos (Metabolismo)</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {['CYP2D6', 'CYP2C9', 'CYP2C19', 'CYP3A4', 'CYP3A5', 'CYP2B6'].map(gene => (
                        <div key={gene}>
                          <label className="text-[9px] font-bold text-purple-400 ml-1">{gene}</label>
                          <select onChange={(e) => setGenetica({...genetica, [gene]: e.target.value})} className="w-full p-2 bg-white border border-purple-100 rounded-lg text-[10px] font-bold text-purple-900 outline-none">
                            <option value="">N/A</option><option value="NM">Normal (NM)</option><option value="IM">Intermediário (IM)</option><option value="PM">Lento (PM)</option><option value="RM">Rápido (RM)</option><option value="UM">Ultra (UM)</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* 8. ANAMNESE E EVOLUÇÃO (Reduzida para 400px e com scroll) */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4 text-green-600"><Brain size={22} /><h3 className="text-xs font-bold uppercase tracking-widest">Anamnese e Evolução</h3></div>
              <textarea required value={anamnese} onChange={(e) => setAnamnese(e.target.value)} placeholder="Relate as queixas, sintomas atuais e o exame físico..." style={{ minHeight: '400px' }} className="w-full p-5 bg-gray-50 border border-gray-300 rounded-2xl text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-green-600 transition-all resize-y shadow-inner leading-relaxed overflow-y-auto" />
            </section>

            {/* BOTÃO FINALIZAR (Totalmente Independente no final da página) */}
            <div className="pt-6 border-t border-gray-200 mt-8">
              <button disabled={salvando} type="button" onClick={handleFinalizar} style={{ backgroundColor: '#16A34A', color: '#FFFFFF' }} className="w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:opacity-90 transition-all transform active:scale-95 disabled:bg-gray-400">
                {salvando ? <Loader2 className="animate-spin" /> : <Save size={24} color="#FFFFFF" />} Finalizar e Assinar Evolução
              </button>
            </div>

          </form>
        </main>
      )}

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