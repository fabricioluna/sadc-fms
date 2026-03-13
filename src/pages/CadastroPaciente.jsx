// src/pages/CadastroPaciente.jsx
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Save, User, Dna, AlertCircle, AlertTriangle,
  Fingerprint, Ruler, Beaker, Syringe, CheckCircle2, XCircle, Info, ClipboardList, Users,
  MapPin, Phone, Droplet, Plus, Trash2 
} from 'lucide-react';
import logoFms from '../assets/logo-fms.png';
import logoLiga from '../assets/logo-liga.png';
import { salvarPacienteDb } from '../services/firebase'; // IMPORTAÇÃO DO FIREBASE

export default function CadastroPaciente({ onVoltar, onFinalizar, onHome }) {
  const [codigoSADC, setCodigoSADC] = useState('');
  
  // ESTADOS PRINCIPAIS DO PACIENTE (Para salvar no banco)
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [sexo, setSexo] = useState('');
  const [ancestralidade, setAncestralidade] = useState('');
  const [etnia, setEtnia] = useState('');
  const [tipoSanguineo, setTipoSanguineo] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [histFamiliar, setHistFamiliar] = useState('');
  
  // Estados de Listas para Alergias e Comorbidades
  const [alergias, setAlergias] = useState([]);
  const [novaAlergia, setNovaAlergia] = useState('');
  const [comorbidades, setComorbidades] = useState([]);
  const [novaComorbidade, setNovaComorbidade] = useState('');

  const [temAlergia, setTemAlergia] = useState(false);
  const [possuiGenetica, setPossuiGenetica] = useState(false);
  const [statusVacinal, setStatusVacinal] = useState('ignorado');

  useEffect(() => {
    const randomID = Math.random().toString(36).substring(2, 6).toUpperCase();
    setCodigoSADC(`SADC-2026-${randomID}`);
  }, []);

  // Funções de Lista
  const addAlergia = () => { if (novaAlergia) { setAlergias([...alergias, novaAlergia]); setNovaAlergia(''); } };
  const addComorbidade = () => { if (novaComorbidade) { setComorbidades([...comorbidades, novaComorbidade]); setNovaComorbidade(''); } };

  // FUNÇÃO QUE SALVA NO FIREBASE
  const handleFinalizarAdmissao = async (e) => {
    e.preventDefault();
    
    // Monta o objeto com todas as informações digitadas
    const dadosPaciente = {
      nome,
      cpf,
      dataNasc,
      idade: dataNasc ? new Date().getFullYear() - new Date(dataNasc).getFullYear() : 'N/I', // Calcula idade base
      sexo,
      ancestralidade,
      etnia,
      tipoSanguineo,
      telefone,
      endereco,
      peso,
      altura,
      comorbidades,
      histFamiliar,
      alergias: temAlergia ? alergias : [],
      statusVacinal,
      possuiGenetica,
      preditivo: possuiGenetica || temAlergia, // Marca como preditivo se tiver alertas
      dataCadastro: new Date().toISOString()
    };

    // Envia para a nuvem
    const sucesso = await salvarPacienteDb(codigoSADC, dadosPaciente);
    
    if (sucesso) {
      alert("Paciente cadastrado com sucesso na base de dados SADC!");
      onFinalizar(); // Volta para a tela principal
    } else {
      alert("Erro ao salvar o paciente. Verifique sua conexão com a internet e as chaves do Firebase.");
    }
  };

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

          <form className="space-y-6" onSubmit={handleFinalizarAdmissao}>
            
            {/* 1. IDENTIFICAÇÃO E DOCUMENTAÇÃO */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center gap-2 text-[var(--color-fms-verde)] mb-2">
                <Fingerprint size={20} />
                <h3 className="text-xs font-bold uppercase tracking-widest">Identificação Civil</h3>
              </div>
              <input value={nome} onChange={(e) => setNome(e.target.value)} required type="text" placeholder="Nome Completo" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-fms-verde)] font-bold" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input value={cpf} onChange={(e) => setCpf(e.target.value)} required type="text" placeholder="CPF (Obrigatório)" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-fms-verde)]" />
                <input value={dataNasc} onChange={(e) => setDataNasc(e.target.value)} required type="date" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-fms-verde)]" />
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <select value={sexo} onChange={(e) => setSexo(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-fms-verde)]">
                    <option value="">Sexo Biológico</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                  </select>
                </div>
                
                <div className="col-span-2 sm:col-span-1">
                  <select value={ancestralidade} onChange={(e) => setAncestralidade(e.target.value)} className="w-full p-3 bg-blue-50 border border-blue-100 rounded-xl text-sm outline-none font-bold text-[var(--color-fms-azul)]">
                    <option value="">Ancestral...</option>
                    <option value="E">Europeia</option>
                    <option value="A">Africana</option>
                    <option value="L">Latina (Admixed)</option>
                    <option value="AS">Asiática</option>
                    <option value="I">Indígena</option>
                    <option value="Não declarada">Não declarada</option>
                  </select>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <select value={etnia} onChange={(e) => setEtnia(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-fms-verde)]">
                    <option value="">Cor/Raça...</option>
                    <option value="Branca">Branca</option>
                    <option value="Preta">Preta</option>
                    <option value="Parda">Parda</option>
                    <option value="Amarela">Amarela</option>
                    <option value="Indígena">Indígena</option>
                    <option value="Não declarada">Não declarada</option>
                  </select>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <select value={tipoSanguineo} onChange={(e) => setTipoSanguineo(e.target.value)} className="w-full p-3 bg-red-50 border border-red-100 rounded-xl text-sm font-bold text-red-900 outline-none focus:border-red-500">
                    <option value="">Sangue...</option>
                    <option value="A+">A+</option><option value="A-">A-</option>
                    <option value="B+">B+</option><option value="B-">B-</option>
                    <option value="AB+">AB+</option><option value="AB-">AB-</option>
                    <option value="O+">O+</option><option value="O-">O-</option>
                  </select>
                </div>
              </div>
            </section>

            {/* 1.5 NOVO: CONTATO E ENDEREÇO */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4 text-slate-600">
                <MapPin size={20} />
                <h3 className="text-xs font-bold uppercase tracking-widest">Contato e Localização</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 block ml-1 mb-1 uppercase flex items-center gap-1"><Phone size={10}/> Telefone / WhatsApp</label>
                  <input type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="(00) 00000-0000" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-slate-500" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 block ml-1 mb-1 uppercase">Cidade / Endereço</label>
                  <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Ex: Pesqueira, PE" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-slate-500" />
                </div>
              </div>
            </section>

            {/* 2. BIOMETRIA */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6 text-[var(--color-fms-azul)]">
                <Ruler size={20} />
                <h3 className="text-xs font-bold uppercase tracking-widest">Biometria de Base</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-bold text-gray-400 ml-1 uppercase">Peso (kg)</label>
                  <input value={peso} onChange={(e) => setPeso(e.target.value)} type="number" step="0.1" placeholder="70.0" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-fms-azul)]" />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-gray-400 ml-1 uppercase">Altura (m)</label>
                  <input value={altura} onChange={(e) => setAltura(e.target.value)} type="number" step="0.01" placeholder="1.70" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-fms-azul)]" />
                </div>
              </div>
            </section>

            {/* 3. COMORBIDADES E HISTÓRICO FAMILIAR */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4 text-orange-600">
                  <ClipboardList size={20} />
                  <h3 className="text-xs font-bold uppercase tracking-widest">Comorbidades e Condições Clínicas</h3>
                </div>
                <div className="flex gap-2">
                  <input value={novaComorbidade} onChange={(e) => setNovaComorbidade(e.target.value)} type="text" placeholder="Ex: Hipertensão, Diabetes..." className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-orange-500" />
                  <button type="button" onClick={addComorbidade} style={{ backgroundColor: '#EA580C' }} className="p-3 px-5 rounded-xl flex items-center justify-center shadow-md hover:opacity-90">
                    <Plus size={24} color="#FFFFFF" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {comorbidades.map((c, i) => (
                    <span key={i} className="bg-orange-50 text-orange-900 text-xs font-bold px-3 py-2 rounded-lg border border-orange-200 flex items-center gap-2">
                      {c} <Trash2 size={16} className="cursor-pointer text-orange-500 hover:text-orange-700" onClick={() => setComorbidades(comorbidades.filter((_, idx) => idx !== i))} />
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4 text-teal-600">
                  <Users size={20} />
                  <h3 className="text-xs font-bold uppercase tracking-widest">Histórico Familiar</h3>
                </div>
                <textarea 
                  value={histFamiliar}
                  onChange={(e) => setHistFamiliar(e.target.value)}
                  placeholder="Descreva brevemente condições relevantes em familiares de 1º grau..." 
                  className="w-full h-20 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-none"
                />
              </div>
            </section>

            {/* 4. ALERGIAS E REAÇÕES ADVERSAS */}
            <section className={`p-6 rounded-2xl shadow-sm border transition-all ${temAlergia ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle size={20} />
                  <h3 className="text-xs font-bold uppercase tracking-widest">Alergias e Reações Adversas</h3>
                </div>
                <input type="checkbox" className="w-6 h-6 accent-red-600 rounded-lg" checked={temAlergia} onChange={(e) => setTemAlergia(e.target.checked)} />
              </div>
              {temAlergia && (
                <div className="mt-4 animate-fade-in">
                  <div className="flex gap-2">
                    <input value={novaAlergia} onChange={(e) => setNovaAlergia(e.target.value)} type="text" placeholder="Ex: Dipirona, Penicilina, Látex..." className="flex-1 p-3 bg-white border border-red-200 rounded-xl text-sm font-bold text-red-900 outline-none focus:border-red-500" />
                    <button type="button" onClick={addAlergia} style={{ backgroundColor: '#DC2626' }} className="p-3 px-5 rounded-xl flex items-center justify-center shadow-md hover:opacity-90">
                      <Plus size={24} color="#FFFFFF" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {alergias.map((a, i) => (
                      <span key={i} className="bg-red-600 text-white text-xs font-black px-3 py-2 rounded-lg shadow-sm flex items-center gap-2">
                        {a} <Trash2 size={16} className="cursor-pointer text-red-200 hover:text-white" onClick={() => setAlergias(alergias.filter((_, idx) => idx !== i))} />
                      </span>
                    ))}
                  </div>
                </div>
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

            {/* 6. FARMACOGENÔMICA */}
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