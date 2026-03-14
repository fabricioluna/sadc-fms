// src/pages/EvolucaoClinica.jsx
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Save, Activity, Beaker, Brain, 
  ShieldAlert, Pill, Search, AlertTriangle, FileText,
  ClipboardCheck, Syringe, Scissors, Plus, Trash2, Calendar, Dna, Info, Clock, Loader2, Printer, CheckCircle2, ShieldCheck, ShieldX, DatabaseZap, BookOpen, Library, X
} from 'lucide-react';
import logoFms from '../assets/logo-fms.png';
import logoLiga from '../assets/logo-liga.png';
import { salvarEvolucaoDb, listarEvolucoesDb } from '../services/firebase';
import { analisarPrescricaoIA } from '../services/ai';

// ==========================================
// COMPONENTES DE INTERFACE (Reutilizáveis)
// ==========================================
const HeaderTop = ({ onVoltar, onHome, idEvolucao }) => (
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
      <p className="text-[10px] text-gray-400 font-bold uppercase leading-none">ID SISTEMA</p>
      <p className="text-xs font-mono font-bold text-blue-700">{idEvolucao}</p>
    </div>
  </header>
);

const PacienteSummaryCard = ({ paciente }) => (
  <div className="mb-6 space-y-4">
    <div className="bg-white p-5 rounded-3xl border-2 border-blue-100 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-black text-blue-900 leading-tight">{paciente.nome}</h2>
          <p className="text-xs font-black text-blue-600 uppercase tracking-widest mt-1">
            {paciente.id} • {paciente.idade} anos • {paciente.sexo === 'M' ? 'Masculino' : 'Feminino'} • Sangue <span className="text-red-500">{paciente.tipoSanguineo || 'N/I'}</span>
          </p>
        </div>
        <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md transform rotate-3">
          {paciente.nome?.charAt(0)}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-gray-100">
        <div className="bg-red-50 p-3 rounded-xl border border-red-100">
          <h3 className="text-[9px] font-black text-red-700 uppercase mb-1 tracking-widest flex items-center gap-1"><AlertTriangle size={12}/> Alergias</h3>
          <p className="text-xs font-bold text-red-900">{paciente.alergias?.join(', ') || 'Nenhuma'}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
          <h3 className="text-[9px] font-black text-gray-500 uppercase mb-1 tracking-widest">Comorbidades</h3>
          <p className="text-xs font-bold text-gray-700">{paciente.comorbidades?.join(', ') || 'Nenhuma'}</p>
        </div>
        <div className="bg-purple-50 p-3 rounded-xl border border-purple-100">
          <h3 className="text-[9px] font-black text-purple-600 uppercase mb-1 tracking-widest flex items-center gap-1"><Dna size={12}/> Genética</h3>
          <p className="text-xs font-bold text-purple-900">
            {paciente.genetica && Object.keys(paciente.genetica).length > 0
              ? Object.entries(paciente.genetica).map(([g, s]) => `${g}:${s}`).join(' | ')
              : 'Nenhum laudo'}
          </p>
        </div>
      </div>
    </div>
  </div>
);

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function EvolucaoClinica({ pacienteSelecionado, onVoltar, onFinalizar, onHome }) {
  const [fase, setFase] = useState(pacienteSelecionado ? 'resumo' : 'selecao');
  const [pacienteAtual, setPacienteAtual] = useState(pacienteSelecionado || null);
  
  const [idEvolucao, setIdEvolucao] = useState('');
  const [dataSistema, setDataSistema] = useState('');
  const [dataAtendimento, setDataAtendimento] = useState('');
  
  const [historicoReal, setHistoricoReal] = useState([]);
  const [carregandoHist, setCarregandoHist] = useState(true);
  const [salvando, setSalvando] = useState(false);

  // Estados Dinâmicos do Formulário Completo
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
  
  // Fluxo de Prescrição Rápida/Múltipla
  const [listaPrescricao, setListaPrescricao] = useState([]);
  const [novaPrescricaoFaco, setNovaPrescricaoFaco] = useState('');
  const [novaPrescricaoTempo, setNovaPrescricaoTempo] = useState('');
  const [novaPrescricaoInicio, setNovaPrescricaoInicio] = useState('');
  const [novaPrescricaoFim, setNovaPrescricaoFim] = useState('');
  const [novaPrescricaoObs, setNovaPrescricaoObs] = useState('');
  
  const [analisando, setAnalisando] = useState(false);
  const [analiseConcluida, setAnaliseConcluida] = useState(false);
  const [resultadoAnalise, setResultadoAnalise] = useState(null);

  const [possuiExames, setPossuiExames] = useState(false);
  const [tipoInputExame, setTipoInputExame] = useState('unidade');
  const [atualizarVacinas, setAtualizarVacinas] = useState(false);
  const [possuiGenetica, setPossuiGenetica] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fase]);

  useEffect(() => {
    const now = new Date();
    setIdEvolucao(`EV-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    setDataSistema(now.toLocaleString('pt-BR'));
    const today = now.toISOString().split('T')[0];
    setDataAtendimento(today);
    setNovaPrescricaoInicio(today);
    
    if (pacienteAtual?.id) {
      listarEvolucoesDb(pacienteAtual.id).then(dados => {
        setHistoricoReal(dados);
        setCarregandoHist(false);
      });
    }
  }, [pacienteAtual]);

  // Handlers do Formulário
  const addPatologia = () => { if (novaPatologia) { setPatologias([...patologias, novaPatologia]); setNovaPatologia(''); } };
  const addCirurgia = () => { if (novaCirurgia) { setCirurgias([...cirurgias, novaCirurgia]); setNovaCirurgia(''); } };
  const addMedicacao = () => { if (medNome) { setMedicacoes([...medicacoes, { nome: medNome, dose: medDose, freq: medFreq, inicio: medInicio, fim: medFim }]); setMedNome(''); setMedDose(''); setMedFreq(''); setMedInicio(''); setMedFim(''); } };
  const addExame = () => { const nomeFinal = exameSelecionado === 'Outros' ? exameDigitado : exameSelecionado; if (nomeFinal && novoExameResultado) { setExames([...exames, { nome: nomeFinal, resultado: novoExameResultado, data: novoExameData }]); setExameSelecionado(''); setExameDigitado(''); setNovoExameResultado(''); setNovoExameData(''); } };
  const addVacina = () => { const nomeFinal = vacinaSelecionada === 'Outra' ? vacinaDigitada : vacinaSelecionada; if (nomeFinal) { setVacinasAplicadas([...vacinasAplicadas, { nome: nomeFinal, data: novaVacinaData }]); setVacinaSelecionada(''); setVacinaDigitada(''); setNovaVacinaData(''); } };

  // Handlers de Prescrição
  const addPrescricaoRapida = () => {
    if (novaPrescricaoFaco && novaPrescricaoTempo) {
      setListaPrescricao([...listaPrescricao, { 
        farmaco: novaPrescricaoFaco, tempo: novaPrescricaoTempo, inicio: novaPrescricaoInicio, fim: novaPrescricaoFim, obs: novaPrescricaoObs
      }]);
      setNovaPrescricaoFaco(''); setNovaPrescricaoTempo(''); setNovaPrescricaoFim(''); setNovaPrescricaoObs('');
      setAnaliseConcluida(false); setResultadoAnalise(null);
    } else {
      alert("Preencha o fármaco e a posologia antes de adicionar.");
    }
  };

  const removerPrescricaoRapida = (index) => {
    setListaPrescricao(listaPrescricao.filter((_, i) => i !== index));
    setAnaliseConcluida(false); setResultadoAnalise(null);
  };

  const handleCancelarPrescricao = () => {
    if (listaPrescricao.length > 0) {
      if (!window.confirm("Deseja cancelar esta prescrição? Todos os itens adicionados serão perdidos.")) return;
    }
    setListaPrescricao([]);
    setNovaPrescricaoFaco('');
    setNovaPrescricaoTempo('');
    setNovaPrescricaoInicio('');
    setNovaPrescricaoFim('');
    setNovaPrescricaoObs('');
    setAnaliseConcluida(false);
    setResultadoAnalise(null);
    setFase('resumo');
  };

  const formatarData = (dataString) => dataString ? dataString.split('-').reverse().join('/') : null;

  // ATUALIZADO: Agora enviamos o historicoReal e a anamnese digitada para a IA ler
  const handleAnalisarRisco = async () => {
    if (listaPrescricao.length === 0) return alert("Adicione pelo menos um fármaco à lista.");
    setAnalisando(true); setResultadoAnalise(null);
    const resposta = await analisarPrescricaoIA(pacienteAtual, historicoReal, anamnese, listaPrescricao);
    setResultadoAnalise(resposta); setAnaliseConcluida(true); setAnalisando(false);
  };

  const handleFinalizarEvolucao = async (irParaPrescricao = false) => {
    if (!anamnese) return alert("Por favor, preencha a anamnese.");
    setSalvando(true);
    const dados = {
      idEvolucao, dataAtendimento, anamnese, sinaisVitais: { peso, pa, fc, temp, fr },
      patologias, cirurgias, medicacoes, exames, vacinas: vacinasAplicadas, genetica,
      medico: "Dra. Gleyka Santos", timestamp: new Date().toISOString()
    };
    const ok = await salvarEvolucaoDb(pacienteAtual.id, dados);
    setSalvando(false);
    if (ok) {
      if (irParaPrescricao) {
        const novosDados = await listarEvolucoesDb(pacienteAtual.id);
        setHistoricoReal(novosDados);
        setFase('prescricao');
      } else {
        onFinalizar();
      }
    }
  };

  const handleFinalizarPrescricaoRapida = async () => {
    if (listaPrescricao.length === 0) return alert("A lista de prescrição está vazia.");
    if (!analiseConcluida) return alert("A checagem farmacológica é obrigatória.");
    setSalvando(true);
    
    const listaFormatada = listaPrescricao.map(p => `• ${p.farmaco} (${p.tempo}) [${formatarData(p.inicio) || '--'} até ${formatarData(p.fim) || 'Contínuo'}]${p.obs ? `\n    Obs: ${p.obs}` : ''}`).join('\n');
    const textoReferencias = resultadoAnalise?.referenciasBibliograficas ? resultadoAnalise.referenciasBibliograficas.map(r => `- ${r.titulo} (${r.autorOuOrg})`).join('\n') : "";
    const prefixo = anamnese ? "PRESCRIÇÃO VINCULADA À CONSULTA" : "ATUALIZAÇÃO DE RECEITUÁRIO (SEM NOVA CONSULTA)";
    const textoEvolucaoAutomatica = `EVOLUÇÃO CLÍNICA - ${prefixo}:\n\nFármacos prescritos:\n${listaFormatada}\n\n[SADC] CHECAGEM DE SEGURANÇA CONCLUÍDA:\nRisco Estratificado: ${resultadoAnalise?.nivelRisco || 'N/A'}\nParecer do Sistema: ${resultadoAnalise?.resumoClinico || 'N/A'}\n\nLiteratura de Apoio Sugerida:\n${textoReferencias}`;
    
    const dados = {
      idEvolucao: `PR-2026-${Math.floor(1000 + Math.random() * 9000)}`, dataAtendimento, anamnese: textoEvolucaoAutomatica, prescricoesMultiplas: listaPrescricao, medico: "Dra. Gleyka Santos", timestamp: new Date().toISOString()
    };
    
    const ok = await salvarEvolucaoDb(pacienteAtual.id, dados);
    setSalvando(false);
    if (ok) {
      alert("Receita emitida e registrada no histórico com sucesso.");
      onFinalizar();
    }
  };

  const handleVoltar = () => {
    if (fase === 'form' || fase === 'prescricao') setFase('resumo');
    else if (fase === 'resumo' && !pacienteSelecionado) setFase('selecao');
    else onVoltar();
  };

  const renderHistoricoCard = (evo, index) => (
    <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-3">
      <div className="flex justify-between items-center mb-2 border-b border-gray-100 pb-2">
        <span className="text-xs font-black text-blue-800">{new Date(evo.dataAtendimento).toLocaleDateString('pt-BR')}</span>
        <span className="text-[10px] font-bold text-gray-500 uppercase">{evo.medico}</span>
      </div>
      <p className="text-xs font-medium text-gray-700 whitespace-pre-line leading-relaxed mb-2">{evo.anamnese}</p>
      {evo.sinaisVitais && (evo.sinaisVitais.peso || evo.sinaisVitais.pa || evo.sinaisVitais.fc || evo.sinaisVitais.temp || evo.sinaisVitais.fr) && (
        <div className="flex flex-wrap gap-3 text-[10px] bg-gray-50 p-2 rounded-lg border border-gray-100 mb-2">
          {evo.sinaisVitais.peso && <span><strong className="text-gray-700">Peso:</strong> {evo.sinaisVitais.peso}kg</span>}
          {evo.sinaisVitais.pa && <span><strong className="text-gray-700">PA:</strong> {evo.sinaisVitais.pa}</span>}
          {evo.sinaisVitais.fc && <span><strong className="text-gray-700">FC:</strong> {evo.sinaisVitais.fc}bpm</span>}
          {evo.sinaisVitais.temp && <span><strong className="text-gray-700">Temp:</strong> {evo.sinaisVitais.temp}°C</span>}
          {evo.sinaisVitais.fr && <span><strong className="text-gray-700">FR:</strong> {evo.sinaisVitais.fr}irpm</span>}
        </div>
      )}
      {(evo.patologias?.length > 0 || evo.cirurgias?.length > 0 || evo.medicacoes?.length > 0 || evo.exames?.length > 0 || evo.vacinas?.length > 0) && (
        <div className="space-y-1 mt-2 pt-2 border-t border-gray-100">
          {evo.patologias?.length > 0 && <p className="text-[10px] text-gray-600"><strong className="text-gray-800">Patologias:</strong> {evo.patologias.join(', ')}</p>}
          {evo.cirurgias?.length > 0 && <p className="text-[10px] text-gray-600"><strong className="text-gray-800">Cirurgias:</strong> {evo.cirurgias.join(', ')}</p>}
          {evo.medicacoes?.length > 0 && <p className="text-[10px] text-gray-600"><strong className="text-gray-800">Uso Contínuo:</strong> {evo.medicacoes.map(m => `${m.nome} (${m.dose})`).join(' | ')}</p>}
          {evo.exames?.length > 0 && <p className="text-[10px] text-gray-600"><strong className="text-gray-800">Exames:</strong> {evo.exames.map(e => `${e.nome} (${e.resultado})`).join(' | ')}</p>}
          {evo.vacinas?.length > 0 && <p className="text-[10px] text-gray-600"><strong className="text-gray-800">Vacinas:</strong> {evo.vacinas.map(v => v.nome).join(' | ')}</p>}
        </div>
      )}
    </div>
  );

  const HistoricoDeEvolucoes = () => (
    <div className="mb-6 bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-3 text-slate-600">
        <Clock size={18} />
        <h3 className="text-xs font-bold uppercase tracking-widest">Histórico de Evoluções Anteriores</h3>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 max-h-[300px] overflow-y-auto shadow-inner">
        {carregandoHist ? <Loader2 className="animate-spin mx-auto text-blue-500" /> : historicoReal.length > 0 ? (
          historicoReal.map((evo, index) => renderHistoricoCard(evo, index))
        ) : (
          <p className="text-xs font-bold text-gray-400 text-center py-6">Nenhum histórico encontrado para este paciente.</p>
        )}
      </div>
    </div>
  );

  if (!pacienteAtual && fase !== 'selecao') return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <HeaderTop onVoltar={handleVoltar} onHome={onHome} idEvolucao={idEvolucao} />

      <main className="flex-1 p-4 pb-12 overflow-y-auto max-w-2xl mx-auto w-full space-y-6 mt-4 animate-fade-in">
        
        {/* =========================================================
            FASE 1: RESUMO DO PACIENTE (TELA INICIAL)
            ========================================================= */}
        {fase === 'resumo' && (
          <>
            <PacienteSummaryCard paciente={pacienteAtual} />
            <HistoricoDeEvolucoes />
            <div className="pt-6 flex flex-col gap-3">
              <button onClick={() => setFase('form')} className="w-full bg-[#16A34A] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:opacity-90 transition-all transform active:scale-95">
                <FileText size={24} /> Iniciar Evolução Completa
              </button>
              <button onClick={() => setFase('prescricao')} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:opacity-90 transition-all transform active:scale-95">
                <Pill size={24} /> Receituário Inteligente
              </button>
            </div>
          </>
        )}

        {/* =========================================================
            FASE 2: PRESCRIÇÃO E VALIDAÇÃO IA
            ========================================================= */}
        {fase === 'prescricao' && (
          <>
            <div className="text-center mb-6">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4 shadow-inner"><Pill size={32} /></div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Receituário Inteligente</h2>
              <p className="text-[11px] text-gray-500 mt-2 italic font-medium">Validação SADC baseada em evidências.</p>
            </div>

            <PacienteSummaryCard paciente={pacienteAtual} />
            <HistoricoDeEvolucoes />

            {/* Resumo do que a médica preencheu há poucos segundos */}
            {(anamnese || peso || pa || temp || fc || fr || patologias.length > 0 || exames.length > 0) && (
              <div className="mb-8 bg-green-50 p-5 rounded-3xl border border-green-200 shadow-sm">
                <h3 className="text-xs font-black text-green-800 uppercase tracking-widest mb-3 flex items-center gap-2"><Activity size={16}/> Resumo da Consulta Atual</h3>
                <div className="space-y-3 bg-white p-4 rounded-2xl border border-green-100">
                  <p className="text-xs font-medium text-gray-700 whitespace-pre-line leading-relaxed border-l-2 border-green-300 pl-3">{anamnese}</p>
                </div>
              </div>
            )}

            <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-5">
              <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-1">Fármaco e Dose *</label>
                    <input 
                      type="text" 
                      value={novaPrescricaoFaco} 
                      onChange={(e) => setNovaPrescricaoFaco(e.target.value)} 
                      placeholder="Ex: Losartana 50mg" 
                      className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-blue-600" 
                    />
                  </div>
                  <div className="flex-1"><label className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-1">Posologia *</label><input type="text" value={novaPrescricaoTempo} onChange={(e) => setNovaPrescricaoTempo(e.target.value)} placeholder="Ex: 1 cp 12/12h" className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-blue-600" /></div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="w-full sm:w-1/2"><label className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-1">Data de Início</label><input type="date" value={novaPrescricaoInicio} onChange={(e) => setNovaPrescricaoInicio(e.target.value)} className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-blue-600" /></div>
                  <div className="w-full sm:w-1/2"><label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Data de Fim (Opcional)</label><input type="date" value={novaPrescricaoFim} onChange={(e) => setNovaPrescricaoFim(e.target.value)} className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-400 outline-none focus:ring-2 focus:ring-blue-600" /></div>
                </div>
                <div><label className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-1">Observações (Opcional)</label><textarea value={novaPrescricaoObs} onChange={(e) => setNovaPrescricaoObs(e.target.value)} placeholder="Ex: Tomar em jejum..." className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-blue-600 resize-y min-h-[80px]" /></div>
                <button type="button" onClick={addPrescricaoRapida} className="w-full p-4 bg-blue-600 text-white font-black uppercase tracking-widest rounded-xl shadow-md hover:bg-blue-700 flex items-center justify-center gap-2"><Plus size={20} /> Adicionar à Receita</button>
              </div>

              {listaPrescricao.length > 0 && (
                <div className="space-y-3 mt-4">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 border-b border-gray-100 pb-2">Lista Temporária:</h4>
                  {listaPrescricao.map((item, index) => (
                    <div key={index} className="flex justify-between items-start p-4 bg-white border border-gray-200 rounded-2xl shadow-sm">
                      <div className="w-full">
                        <div className="flex justify-between items-start w-full mb-1">
                          <p className="text-sm font-black text-gray-900">{item.farmaco}</p>
                          <p className="text-[9px] font-black text-blue-700 uppercase bg-blue-100 px-2 py-0.5 rounded mr-2">{item.tempo}</p>
                        </div>
                        <p className="text-[10px] text-gray-500 font-medium"><span className="font-bold text-gray-700">Período:</span> {formatarData(item.inicio) || '--'} até {formatarData(item.fim) || 'Contínuo'}</p>
                        {item.obs && <div className="mt-2 p-2 bg-yellow-50 rounded-lg border border-yellow-100 text-[10px] text-yellow-800 font-medium italic"><span className="font-bold mr-1">Obs:</span>{item.obs}</div>}
                      </div>
                      <button onClick={() => removerPrescricaoRapida(index)} className="text-red-400 hover:text-red-600 p-2 transition-colors ml-2 bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-6 border-t border-gray-100">
                <button type="button" onClick={handleAnalisarRisco} disabled={analisando || analiseConcluida || listaPrescricao.length === 0} className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all ${analiseConcluida ? 'bg-green-100 text-green-700 border border-green-500' : (listaPrescricao.length === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : (analisando ? 'bg-indigo-600 text-white animate-pulse' : 'bg-indigo-600 text-white hover:bg-indigo-700'))}`}>
                  {analisando ? <Loader2 size={20} className="animate-spin" /> : (analiseConcluida ? <CheckCircle2 size={20} /> : <DatabaseZap size={20} />)}
                  {analisando ? "Processando Validação..." : (analiseConcluida ? "Validação Concluída" : "Processar Segurança SADC")}
                </button>
              </div>
            </section>

            {resultadoAnalise && (
              <section className={`p-6 rounded-3xl shadow-lg border-2 animate-fade-in transition-all mt-6 ${resultadoAnalise.nivelRisco === 'BAIXO' ? 'bg-green-50 border-green-400' : resultadoAnalise.nivelRisco === 'ALERTA' ? 'bg-yellow-50 border-yellow-400' : 'bg-red-50 border-red-500'}`}>
                <div className="flex items-center gap-3 mb-4">
                  {resultadoAnalise.nivelRisco === 'BAIXO' ? <ShieldCheck size={32} className="text-green-600" /> : resultadoAnalise.nivelRisco === 'ALERTA' ? <AlertTriangle size={32} className="text-yellow-600" /> : <ShieldX size={32} className="text-red-600" />}
                  <div><h3 className={`text-sm font-black uppercase tracking-widest ${resultadoAnalise.nivelRisco === 'BAIXO' ? 'text-green-800' : resultadoAnalise.nivelRisco === 'ALERTA' ? 'text-yellow-800' : 'text-red-800'}`}>Risco {resultadoAnalise.nivelRisco}</h3><p className="text-[10px] font-bold text-gray-500 uppercase">Laudo Farmacológico</p></div>
                </div>

                {/* NOVO: DESTAQUE VISUAL AMARELO PARA A NOTA DE CORREÇÃO LASA */}
                {resultadoAnalise.notaCorrecaoLASA && (
                  <div className="mb-4 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-r-xl shadow-sm flex gap-3 items-start animate-fade-in">
                    <Info className="text-yellow-600 shrink-0 mt-0.5" size={20} />
                    <p className="text-xs font-bold text-yellow-900 uppercase tracking-tight leading-relaxed">
                      {resultadoAnalise.notaCorrecaoLASA}
                    </p>
                  </div>
                )}

                <p className="text-sm font-medium text-gray-800 mb-6 leading-relaxed bg-white p-4 rounded-xl border shadow-inner">{resultadoAnalise.resumoClinico || resultadoAnalise.erro}</p>
                {resultadoAnalise.detalhes && resultadoAnalise.detalhes.length > 0 && (
                  <div className="space-y-3 mb-6">
                    {resultadoAnalise.detalhes.map((detalhe, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-xl border flex flex-col gap-2 shadow-sm">
                        <div className="flex justify-between items-start"><span className="text-xs font-black text-gray-900">{detalhe.farmaco}</span><span className="text-[9px] font-bold px-2 py-0.5 rounded-md border uppercase">Evidência: {detalhe.nivelEvidencia}</span></div>
                        <span className="text-[11px] text-gray-600 font-medium">{detalhe.aviso}</span>
                      </div>
                    ))}
                  </div>
                )}
                {resultadoAnalise.referenciasBibliograficas && resultadoAnalise.referenciasBibliograficas.length > 0 && (
                  <div className="pt-4 border-t border-gray-200/50">
                    <div className="flex items-center gap-2 mb-3 text-indigo-700"><Library size={18} /><h4 className="text-xs font-black uppercase tracking-widest">Literatura Recomendada</h4></div>
                    <div className="space-y-3">
                      {resultadoAnalise.referenciasBibliograficas.map((ref, idx) => (
                        <div key={idx} className="flex gap-3 bg-white p-3 rounded-lg border border-indigo-100 shadow-sm">
                          <BookOpen size={16} className="text-indigo-400 shrink-0 mt-0.5" />
                          <div><p className="text-xs font-black text-gray-800">{ref.titulo}</p><p className="text-[10px] font-bold text-indigo-600 mb-1 uppercase">{ref.autorOuOrg}</p><p className="text-[10px] text-gray-600 font-medium">{ref.motivo}</p></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button 
                onClick={handleCancelarPrescricao} 
                disabled={salvando}
                className="w-full sm:w-1/3 bg-gray-100 text-gray-600 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-600 transition-all transform active:scale-95 disabled:opacity-50"
              >
                <X size={24} /> Cancelar
              </button>
              
              <button 
                onClick={handleFinalizarPrescricaoRapida} 
                disabled={salvando || !analiseConcluida || resultadoAnalise?.erro} 
                className="w-full sm:w-2/3 bg-blue-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:bg-blue-700 transition-all transform active:scale-95 disabled:bg-gray-300"
              >
                {salvando ? <Loader2 className="animate-spin" size={24} /> : <Printer size={24} />} Finalizar e Emitir
              </button>
            </div>
          </>
        )}

        {/* =========================================================
            FASE 3: FORMULÁRIO DE EVOLUÇÃO CLÍNICA
            ========================================================= */}
        {fase === 'form' && (
          <>
            <PacienteSummaryCard paciente={pacienteAtual} />
            <HistoricoDeEvolucoes />

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4 text-blue-800"><Calendar size={20} /><h3 className="text-xs font-bold uppercase tracking-widest">Data do Atendimento</h3></div>
                <input type="date" value={dataAtendimento} onChange={(e) => setDataAtendimento(e.target.value)} className="w-full sm:w-1/2 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-600" />
              </section>

              <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-6 text-green-600"><Activity size={20} /><h3 className="text-xs font-bold uppercase tracking-widest">Sinais Vitais</h3></div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[{label: 'Peso (kg)', val: peso, set: setPeso}, {label: 'P.A.', val: pa, set: setPa}, {label: 'F.C. (bpm)', val: fc, set: setFc}, {label: 'Temp (°C)', val: temp, set: setTemp}, {label: 'F.R.', val: fr, set: setFr}].map((item) => (
                    <div key={item.label}><label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">{item.label}</label><input type="text" value={item.val} onChange={(e)=>item.set(e.target.value)} placeholder="--" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-green-500" /></div>
                  ))}
                </div>
              </section>

              <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4 text-green-600"><Brain size={22} /><h3 className="text-xs font-bold uppercase tracking-widest">Anamnese e Evolução *</h3></div>
                <textarea required value={anamnese} onChange={(e) => setAnamnese(e.target.value)} placeholder="Relate queixas e o exame físico..." className="w-full p-5 bg-gray-50 border border-gray-300 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-green-600 min-h-[400px] resize-y" />
              </section>

              <div className="pt-6 border-t border-gray-200 mt-8 flex flex-col sm:flex-row gap-3">
                <button disabled={salvando} type="button" onClick={() => handleFinalizarEvolucao(false)} className="flex-1 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl bg-[#16A34A] text-white hover:opacity-90 transform active:scale-95 disabled:bg-gray-400">
                  {salvando ? <Loader2 className="animate-spin" /> : <Save size={24} />} Salvar Evolução
                </button>
                <button disabled={salvando} type="button" onClick={() => handleFinalizarEvolucao(true)} className="flex-1 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl bg-blue-600 text-white hover:opacity-90 transform active:scale-95 disabled:bg-gray-400">
                  {salvando ? <Loader2 className="animate-spin" /> : <Pill size={24} />} Salvar e Prescrever
                </button>
              </div>
            </form>
          </>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-auto text-center">
        <p className="text-[10px] text-gray-400 font-medium">Desenvolvido por <span className="text-blue-800 font-extrabold">Fabrício Luna</span></p>
      </footer>
    </div>
  );
}