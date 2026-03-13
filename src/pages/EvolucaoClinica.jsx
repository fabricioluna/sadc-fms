// src/pages/EvolucaoClinica.jsx
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Save, Activity, Beaker, Brain, Pill, AlertTriangle, FileText, 
  ClipboardCheck, Syringe, Scissors, Plus, Trash2, Calendar, Dna, Clock, Loader2 
} from 'lucide-react';
import logoFms from '../assets/logo-fms.png';
import logoLiga from '../assets/logo-liga.png';
import { salvarEvolucaoDb, listarEvolucoesDb } from '../services/firebase';

export default function EvolucaoClinica({ pacienteSelecionado, onVoltar, onFinalizar, onHome }) {
  const [fase, setFase] = useState('resumo'); // 'resumo' (Tela da Imagem) ou 'form' (Evolução)
  const [pacienteAtual] = useState(pacienteSelecionado);
  
  const [idEvolucao, setIdEvolucao] = useState('');
  const [dataAtendimento, setDataAtendimento] = useState('');
  const [historicoReal, setHistoricoReal] = useState([]);
  const [carregandoHist, setCarregandoHist] = useState(true);
  const [salvando, setSalvando] = useState(false);

  // --- ESTADOS DO FORMULÁRIO (TODOS OS 11 PONTOS) ---
  const [peso, setPeso] = useState('');
  const [pa, setPa] = useState('');
  const [fc, setFc] = useState('');
  const [temp, setTemp] = useState('');
  const [fr, setFr] = useState('');
  const [anamnese, setAnamnese] = useState('');
  const [patologias, setPatologias] = useState([]);
  const [novaPatologia, setNovaPatologia] = useState('');
  const [cirurgias, setCirurgias] = useState('');
  const [medicacoes, setMedicacoes] = useState([]);
  const [medNome, setMedNome] = useState('');
  const [exames, setExames] = useState([]);
  const [exameItem, setExameItem] = useState('');
  const [vacinas, setVacinas] = useState([]);
  const [novaVacina, setNovaVacina] = useState('');
  const [genetica, setGenetica] = useState({ cyp2d6: 'N/A', cyp2c9: 'N/A', cyp2c19: 'N/A', cyp3a4: 'N/A' });

  const [mostrarExames, setMostrarExames] = useState(false);
  const [mostrarVacinas, setMostrarVacinas] = useState(false);
  const [mostrarGenetica, setMostrarGenetica] = useState(false);

  // REGRA: VOLTAR AO TOPO AO MUDAR DE TELA
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [fase]);

  useEffect(() => {
    setIdEvolucao(`EV-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    setDataAtendimento(new Date().toISOString().split('T')[0]);
    
    if (pacienteAtual?.id) {
      const carregarHist = async () => {
        const dados = await listarEvolucoesDb(pacienteAtual.id);
        setHistoricoReal(dados);
        setCarregandoHist(false);
      };
      carregarHist();
    }
  }, [pacienteAtual]);

  const addMed = () => { if(medNome){ setMedicacoes([...medicacoes, medNome]); setMedNome(''); } };
  const addPat = () => { if(novaPatologia){ setPatologias([...patologias, novaPatologia]); setNovaPatologia(''); } };
  const addExa = () => { if(exameItem){ setExames([...exames, exameItem]); setExameItem(''); } };
  const addVac = () => { if(novaVacina){ setVacinas([...vacinas, novaVacina]); setNovaVacina(''); } };

  const handleSalvar = async () => {
    if (!anamnese) return alert("Por favor, preencha a Anamnese.");
    setSalvando(true);
    const dados = { 
      idEvolucao, dataAtendimento, anamnese, sinaisVitais: { peso, pa, fc, temp, fr },
      patologias, cirurgias, medicacoes, exames, vacinas, genetica,
      medico: "Dra. Gleyka Santos"
    };
    const ok = await salvarEvolucaoDb(pacienteAtual.id, dados);
    setSalvando(false);
    if (ok) onFinalizar();
  };

  if (!pacienteAtual) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      
      {/* HEADER PADRONIZADO */}
      <header className="bg-white p-3 shadow-sm border-b-4 border-green-600 sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button onClick={() => fase === 'form' ? setFase('resumo') : onVoltar()} className="text-gray-400 hover:text-blue-600 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div onClick={onHome} className="flex items-center gap-2 cursor-pointer">
            <img src={logoFms} alt="FMS" className="h-8" />
            <div className="h-6 w-px bg-gray-300"></div>
            <img src={logoLiga} alt="Liga" className="h-8" />
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-400 font-bold uppercase">ID SISTEMA</p>
          <p className="text-xs font-mono font-bold text-blue-700">{idEvolucao}</p>
        </div>
      </header>

      <main className="flex-1 p-4 pb-12 max-w-2xl mx-auto w-full space-y-6">

        {/* =========================================================
            FASE 1: TELA DE VERIFICAÇÃO (IDÊNTICA À IMAGEM)
            ========================================================= */}
        {fase === 'resumo' && (
          <div className="space-y-6 animate-fade-in pt-4">
            
            {/* CARD SUPERIOR: DADOS DO CADASTRO */}
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 text-center relative">
              <div className="h-20 w-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white font-black text-4xl mx-auto mb-4 shadow-lg">
                {pacienteAtual.nome?.charAt(0)}
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-1">{pacienteAtual.nome}</h2>
              <p className="text-blue-600 font-black text-xs uppercase tracking-widest mb-4">{pacienteAtual.id}</p>
              
              <div className="flex justify-center items-center gap-6 text-sm font-bold text-gray-600">
                <span>{pacienteAtual.idade} anos</span>
                <span className="text-gray-300">•</span>
                <span>{pacienteAtual.sexo === 'M' ? 'Masculino' : 'Feminino'}</span>
                <span className="text-gray-300">•</span>
                <span className="text-red-500 font-black">Sangue {pacienteAtual.tipoSanguineo || 'N/I'}</span>
              </div>
            </div>

            {/* CARD ALERGIAS */}
            <div className="bg-red-50/50 p-6 rounded-3xl border border-red-100">
              <h3 className="text-red-700 text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                <AlertTriangle size={18} /> ALERGIAS CADASTRADAS
              </h3>
              <div className="flex flex-wrap gap-3">
                {pacienteAtual.alergias?.length > 0 ? pacienteAtual.alergias.map((a, i) => (
                  <span key={i} className="bg-red-600 text-white text-xs font-black px-4 py-2 rounded-xl shadow-sm">{a}</span>
                )) : <span className="text-gray-400 italic font-bold">Nenhuma alergia relatada</span>}
              </div>
            </div>

            {/* GRID: COMORBIDADES E GENÔMICA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Comorbidades */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-4">COMORBIDADES BASE</h3>
                <ul className="space-y-3">
                  {pacienteAtual.comorbidades?.map((c, i) => (
                    <li key={i} className="text-sm font-bold text-gray-800 flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div> {c}
                    </li>
                  )) || <li className="text-gray-300 italic">Nenhuma registrada</li>}
                </ul>
              </div>

              {/* Genômica */}
              <div className="bg-purple-50/30 p-6 rounded-3xl border border-purple-100 shadow-sm">
                <h3 className="text-purple-600 text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-1">
                   <Dna size={14} /> GENÔMICA (ALERTAS)
                </h3>
                <div className="space-y-2">
                  {pacienteAtual.genetica ? Object.entries(pacienteAtual.genetica).map(([gene, status], i) => (
                    <div key={i} className="bg-white p-2 rounded-xl border border-purple-50 flex justify-between items-center">
                      <span className="text-[10px] font-black text-purple-900">{gene}</span>
                      <span className="text-[10px] font-black text-purple-600">{status}</span>
                    </div>
                  )) : <p className="text-gray-300 italic text-[10px]">Nenhum exame mapeado</p>}
                </div>
              </div>
            </div>

            {/* 2. HISTÓRICO DE EVOLUÇÕES ANTERIORES (CONFORME PEDIDO) */}
            <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                <Clock size={16} /> HISTÓRICO CLÍNICO RECENTE
              </h3>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {carregandoHist ? <Loader2 className="animate-spin mx-auto text-blue-500" /> : 
                  historicoReal.length > 0 ? historicoReal.map((evo, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-black text-blue-800">{new Date(evo.dataAtendimento).toLocaleDateString()}</span>
                      <span className="text-[9px] text-gray-400 font-bold uppercase">{evo.medico}</span>
                    </div>
                    <p className="text-xs font-medium text-gray-600 leading-relaxed italic">"{evo.anamnese}"</p>
                  </div>
                )) : <p className="text-center text-gray-400 py-4 font-bold italic">Sem evoluções prévias.</p>}
              </div>
            </section>

            {/* BOTÃO INICIAR (VERDE) */}
            <button 
              onClick={() => setFase('form')} 
              className="w-full bg-[#16A34A] text-white py-5 rounded-2xl font-black text-sm uppercase flex items-center justify-center gap-3 shadow-xl hover:opacity-90 transition-all active:scale-95"
            >
              <FileText size={22} /> INICIAR NOVA EVOLUÇÃO
            </button>
          </div>
        )}

        {/* =========================================================
            FASE 2: FORMULÁRIO DE EVOLUÇÃO (TODOS OS 11 PONTOS)
            ========================================================= */}
        {fase === 'form' && (
          <form className="space-y-6 animate-fade-in" onSubmit={e => e.preventDefault()}>
            
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black">{pacienteAtual.nome?.charAt(0)}</div>
              <div>
                <h2 className="text-lg font-black">{pacienteAtual.nome}</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Evolução em progresso</p>
              </div>
            </div>

            {/* 3. DATA ATENDIMENTO */}
            <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <label className="text-[10px] font-black text-blue-800 uppercase mb-2 block">Data do Atendimento</label>
              <input type="date" value={dataAtendimento} onChange={e=>setDataAtendimento(e.target.value)} className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold" />
            </section>

            {/* 4. SINAIS VITAIS */}
            <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xs font-black text-green-600 uppercase mb-4 flex items-center gap-2"><Activity size={18}/> Sinais Vitais</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {['Peso', 'P.A.', 'FC', 'Temp', 'FR'].map(l => (
                  <div key={l}><label className="text-[9px] font-black text-gray-400 uppercase">{l}</label><input type="text" onChange={e => {if(l==='Peso') setPeso(e.target.value); if(l==='P.A.') setPa(e.target.value);}} className="w-full p-3 bg-gray-50 border rounded-xl font-bold" /></div>
                ))}
              </div>
            </section>

            {/* 5. MEDICAMENTOS EM USO */}
            <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xs font-black text-blue-600 uppercase mb-4 flex items-center gap-2"><Pill size={18}/> Medicamentos em Uso</h3>
              <div className="flex gap-2 mb-4">
                <input value={medNome} onChange={e=>setMedNome(e.target.value)} placeholder="Fármaco e dose..." className="flex-1 p-3 bg-gray-50 border rounded-xl text-sm" />
                <button type="button" onClick={addMed} className="bg-blue-600 p-3 rounded-xl text-white"><Plus/></button>
              </div>
              <div className="flex flex-wrap gap-2">{medicacoes.map((m, i) => <span key={i} className="bg-blue-50 text-blue-800 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-blue-100">{m}</span>)}</div>
            </section>

            {/* 6 & 7. PATOLOGIAS E CIRURGIAS */}
            <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xs font-black text-orange-600 uppercase mb-4 flex items-center gap-2"><ClipboardCheck size={18}/> Patologias e Cirurgias</h3>
              <input value={novaPatologia} onChange={e=>setNovaPatologia(e.target.value)} placeholder="Nova patologia..." className="w-full p-3 bg-gray-50 border rounded-xl mb-3" />
              <textarea value={cirurgias} onChange={e=>setCirurgias(e.target.value)} placeholder="Cirurgias recentes..." className="w-full p-3 bg-gray-50 border rounded-xl h-20 text-sm" />
            </section>

            {/* 8 & 9. EXAMES E VACINAS */}
            <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between mb-4">
                <h3 className="text-xs font-black text-purple-600 uppercase flex items-center gap-2"><Beaker size={18}/> Exames e Vacinas</h3>
                <div className="flex gap-2">
                  <button type="button" onClick={()=>setMostrarExames(!mostrarExames)} className="p-2 border rounded text-[9px] font-black">EXAMES</button>
                  <button type="button" onClick={()=>setMostrarVacinas(!mostrarVacinas)} className="p-2 border rounded text-[9px] font-black">VACINAS</button>
                </div>
              </div>
              {mostrarExames && <div className="flex gap-2 animate-fade-in"><input value={exameItem} onChange={e=>setExameItem(e.target.value)} placeholder="Exame e resultado" className="flex-1 p-3 bg-gray-50 border rounded-xl" /><button onClick={addExa} className="bg-purple-600 p-3 rounded-xl text-white"><Plus/></button></div>}
            </section>

            {/* 10. EXAME GENÉTICO */}
            <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black text-purple-800 uppercase flex items-center gap-2"><Dna size={18}/> Exame Genético</h3>
                <input type="checkbox" checked={mostrarGenetica} onChange={e=>setMostrarGenetica(e.target.checked)} className="w-5 h-5 accent-purple-600" />
              </div>
              {mostrarGenetica && (
                <div className="grid grid-cols-2 gap-3 pt-2 animate-fade-in">
                  {['CYP2D6', 'CYP2C9', 'CYP2C19', 'CYP3A4'].map(gene => (
                    <div key={gene}><label className="text-[9px] font-black text-gray-400 block ml-1 uppercase">{gene}</label><select className="w-full p-2 bg-gray-50 border rounded-lg text-xs font-bold"><option>N/A</option><option>Normal (NM)</option><option>Lento (PM)</option><option>Rápido (RM)</option></select></div>
                  ))}
                </div>
              )}
            </section>

            {/* 11. ANAMNESE E EVOLUÇÃO (400PX) */}
            <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xs font-black text-gray-900 uppercase mb-4 flex items-center gap-2"><Brain size={20} /> Anamnese e Conduta Atual</h3>
              <textarea 
                required value={anamnese} onChange={e=>setAnamnese(e.target.value)} 
                placeholder="Relate os sintomas do paciente, o exame físico realizado e as condutas clínicas tomadas..." 
                style={{ minHeight: '400px' }} 
                className="w-full p-6 bg-gray-50 border-2 border-gray-200 rounded-[32px] text-sm font-medium outline-none focus:border-green-600 transition-all resize-none shadow-inner leading-relaxed overflow-y-auto" 
              />
            </section>

            <button 
              onClick={handleSalvar} 
              disabled={salvando}
              className="w-full py-6 rounded-3xl font-black text-lg uppercase shadow-2xl bg-green-600 text-white hover:opacity-90 transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:bg-gray-300"
            >
              {salvando ? <Loader2 className="animate-spin" /> : <Save size={24} />} FINALIZAR E REGISTRAR EVOLUÇÃO
            </button>
          </form>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-auto text-center">
        <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase italic">SADC FMS • Desenvolvido por <span className="text-blue-800 font-black">Fabrício Luna</span></p>
      </footer>
    </div>
  );
}