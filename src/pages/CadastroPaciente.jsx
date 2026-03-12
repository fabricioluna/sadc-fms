// src/pages/CadastroPaciente.jsx
import React, { useState } from 'react';
import { 
  ArrowLeft, Save, User, AlertTriangle, Dna, Info, 
  MapPin, Phone, Droplet, Plus, Trash2 
} from 'lucide-react';
import logoFms from '../assets/logo-fms.png';
import logoLiga from '../assets/logo-liga.png';

export default function CadastroPaciente({ onVoltar, onSalvar, onHome }) {
  // Dados Pessoais
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [etnia, setEtnia] = useState('');
  const [tipoSanguineo, setTipoSanguineo] = useState('');
  
  // Contato
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');

  // Clínica
  const [alergias, setAlergias] = useState([]);
  const [novaAlergia, setNovaAlergia] = useState('');
  
  const [comorbidades, setComorbidades] = useState([]);
  const [novaComorbidade, setNovaComorbidade] = useState('');

  // Genética
  const [possuiGenetica, setPossuiGenetica] = useState(false);

  // Funções de Lista
  const addAlergia = () => { if (novaAlergia) { setAlergias([...alergias, novaAlergia]); setNovaAlergia(''); } };
  const addComorbidade = () => { if (novaComorbidade) { setComorbidades([...comorbidades, novaComorbidade]); setNovaComorbidade(''); } };

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
          <p className="text-[10px] text-gray-400 font-bold uppercase leading-none">MÓDULO</p>
          <p className="text-xs font-mono font-bold text-blue-700">CADASTRO / ADMISSÃO</p>
        </div>
      </header>

      <main className="flex-1 p-4 pb-12 overflow-y-auto max-w-2xl mx-auto w-full space-y-6 mt-4">
        
        <div className="mb-4">
          <h2 className="text-2xl font-black text-blue-800 mb-1">Novo Paciente</h2>
          <p className="text-sm text-gray-500 font-medium">Preencha os dados base para criar o prontuário no SADC.</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

          {/* 1. DADOS PESSOAIS (COM ETNIA E TIPO SANGUÍNEO) */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-blue-800">
              <User size={20} />
              <h3 className="text-xs font-bold uppercase tracking-widest">Dados Pessoais</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold text-gray-500 block ml-1 mb-1 uppercase">Nome Completo</label>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: João da Silva" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-600" />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 block ml-1 mb-1 uppercase">Data de Nascimento</label>
                <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-600" />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 block ml-1 mb-1 uppercase">Sexo Biológico</label>
                <select value={sexo} onChange={(e) => setSexo(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-600">
                  <option value="">Selecionar...</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
              </div>

              {/* NOVO: RAÇA / ETNIA */}
              <div>
                <label className="text-[10px] font-bold text-gray-500 block ml-1 mb-1 uppercase">Raça / Cor (IBGE)</label>
                <select value={etnia} onChange={(e) => setEtnia(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-blue-600">
                  <option value="">Selecionar...</option>
                  <option value="Branca">Branca</option>
                  <option value="Preta">Preta</option>
                  <option value="Parda">Parda</option>
                  <option value="Amarela">Amarela (Ascendência Asiática)</option>
                  <option value="Indígena">Indígena</option>
                  <option value="Não Informado">Prefere não informar</option>
                </select>
              </div>

              {/* NOVO: TIPO SANGUÍNEO */}
              <div>
                <label className="text-[10px] font-bold text-red-500 block ml-1 mb-1 uppercase flex items-center gap-1"><Droplet size={10} /> Tipo Sanguíneo</label>
                <select value={tipoSanguineo} onChange={(e) => setTipoSanguineo(e.target.value)} className="w-full p-3 bg-red-50 border border-red-100 rounded-xl text-sm font-bold text-red-900 outline-none focus:border-red-500">
                  <option value="">Desconhecido...</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
          </section>

          {/* 2. CONTATO E ENDEREÇO */}
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

          {/* 3. ALERGIAS GRAVES */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-red-200">
            <div className="flex items-center gap-2 mb-4 text-red-600">
              <AlertTriangle size={20} />
              <h3 className="text-xs font-black uppercase tracking-widest">Alergias / Intolerâncias</h3>
            </div>
            <div className="flex gap-2">
              <input value={novaAlergia} onChange={(e) => setNovaAlergia(e.target.value)} type="text" placeholder="Ex: Dipirona, Penicilina, Látex..." className="flex-1 p-3 bg-red-50 border border-red-100 rounded-xl text-sm font-bold text-red-900 outline-none focus:border-red-500" />
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
              {alergias.length === 0 && <span className="text-xs font-bold text-gray-400 italic">Nenhuma alergia relatada.</span>}
            </div>
          </section>

          {/* 4. COMORBIDADES BASE */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-orange-600">
              <Plus size={20} />
              <h3 className="text-xs font-bold uppercase tracking-widest">Comorbidades Base</h3>
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
          </section>

          {/* 5. FARMACOGENÔMICA */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-purple-600">
                <Dna size={22} />
                <h3 className="text-xs font-bold uppercase tracking-widest">Exame Genético (Farmacogenômica)</h3>
              </div>
              <input type="checkbox" className="w-5 h-5 accent-purple-600 rounded-lg cursor-pointer" checked={possuiGenetica} onChange={(e) => setPossuiGenetica(e.target.checked)} />
            </div>
            
            {possuiGenetica && (
              <div className="space-y-6 animate-fade-in pt-4 border-t border-purple-100">
                <div>
                  <h4 className="text-[10px] font-black text-purple-800 mb-2 uppercase border-b border-purple-100 flex items-center gap-1"><Info size={12}/> Citocromos (Metabolismo)</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {['CYP2D6', 'CYP2C9', 'CYP2C19', 'CYP3A4', 'CYP3A5', 'CYP2B6'].map(gene => (
                      <div key={gene}>
                        <label className="text-[9px] font-bold text-purple-400 ml-1">{gene}</label>
                        <select className="w-full p-2 bg-white border border-purple-100 rounded-lg text-[10px] font-bold text-purple-900 outline-none focus:border-purple-500">
                          <option value="">N/A</option>
                          <option value="NM">Normal (NM)</option>
                          <option value="IM">Intermediário (IM)</option>
                          <option value="PM">Lento (PM)</option>
                          <option value="RM">Rápido (RM)</option>
                          <option value="UM">Ultra (UM)</option>
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
                        <select className="w-full p-2 bg-white border border-purple-100 rounded-lg text-[10px] font-bold text-purple-900 outline-none focus:border-purple-500">
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

          {/* BOTÃO SALVAR */}
          <div className="pt-4">
            <button 
              type="button"
              onClick={onSalvar} 
              style={{ backgroundColor: '#16A34A', color: '#FFFFFF' }}
              className="w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:opacity-90 transition-all transform active:scale-95"
            >
              <Save size={24} color="#FFFFFF" /> Cadastrar Paciente
            </button>
          </div>

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