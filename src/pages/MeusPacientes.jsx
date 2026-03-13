// src/pages/MeusPacientes.jsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, UserPlus, History, ChevronRight, Loader2 } from 'lucide-react';
import logoFms from '../assets/logo-fms.png';
import logoLiga from '../assets/logo-liga.png';
import { listarPacientesDb } from '../services/firebase'; // Conexão com o Firebase

export default function MeusPacientes({ onVoltar, onAbrirProntuario, onNovoPaciente, onHome }) {
  const [termoBusca, setTermoBusca] = useState('');
  
  // ESTADOS PARA O BANCO DE DADOS
  const [pacientes, setPacientes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Busca os pacientes no Firebase assim que a tela abre
  useEffect(() => {
    const carregarDados = async () => {
      const dados = await listarPacientesDb();
      setPacientes(dados);
      setCarregando(false);
    };
    carregarDados();
  }, []);

  // Filtra a lista real que veio do banco de dados
  const pacientesFiltrados = pacientes.filter(p => 
    p.nome?.toLowerCase().includes(termoBusca.toLowerCase()) || 
    p.cpf?.includes(termoBusca) ||
    p.id?.toLowerCase().includes(termoBusca.toLowerCase())
  );

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
          <p className="text-sm font-bold text-gray-800">Dra. Gleyka Santos</p>
          <p className="text-[10px] text-[var(--color-fms-verde)] font-bold">Gestão de Pacientes</p>
        </div>
      </header>

      <main className="flex-1 p-4 pb-12 overflow-y-auto">
        
        {/* BOTÃO DE NOVO PACIENTE NO TOPO */}
        <div className="mt-4 mb-8">
          <button 
            onClick={onNovoPaciente}
            className="w-full bg-[var(--color-fms-verde)] text-white font-black py-4 rounded-xl shadow-md hover:bg-green-700 transition-colors flex justify-center items-center gap-2 border border-green-600 uppercase tracking-wide"
          >
            <UserPlus size={22} /> 
            Cadastrar Novo Paciente
          </button>
        </div>

        {/* Busca Ativa - Abaixo do botão */}
        <section className="mb-10">
          <label className="text-sm font-bold text-[var(--color-fms-azul)] mb-3 block px-1">
            Localizar Paciente
          </label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Nome, CPF ou ID SADC..." 
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="w-full p-4 pl-12 bg-white border-2 border-gray-200 rounded-xl shadow-sm text-sm focus:ring-2 focus:ring-[var(--color-fms-azul)] outline-none transition-all"
            />
            <Search className="absolute left-4 top-4 text-gray-400" size={20} />
          </div>
        </section>

        <div className="flex justify-between items-end mb-3 px-1">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
            <History size={14} /> Pacientes na Base de Dados
          </h2>
        </div>

        {/* LISTA DE PACIENTES DINÂMICA */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
          {carregando ? (
            <div className="p-8 flex justify-center items-center">
              <Loader2 className="animate-spin text-[var(--color-fms-azul)]" size={32} />
            </div>
          ) : pacientesFiltrados.length > 0 ? (
            pacientesFiltrados.map((paciente) => (
              <div 
                key={paciente.id} 
                onClick={() => onAbrirProntuario(paciente)} 
                className="p-4 flex items-center justify-between hover:bg-blue-50 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[var(--color-fms-azul)] shadow-sm group-hover:scale-105 transition-transform">
                    <span className="font-bold text-sm">{paciente.nome?.charAt(0) || '?'}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">{paciente.nome}</h4>
                    <p className="text-[10px] text-gray-500">{paciente.idade} anos | {paciente.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {paciente.preditivo && (
                    <span className="text-[9px] font-bold bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                      Preditivo Ativo
                    </span>
                  )}
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-[var(--color-fms-azul)] transition-colors" />
                </div>
              </div>
            ))
          ) : (
             <div className="p-8 text-center text-sm font-bold text-gray-400">
               Nenhum paciente encontrado na busca.
             </div>
          )}
        </div>

      </main>

      {/* Rodapé */}
      <footer className="bg-white border-t border-gray-200 py-4 mt-auto text-center">
        <p className="text-[10px] text-gray-400">Desenvolvido por <span className="text-[var(--color-fms-azul)] font-black">Fabrício Luna</span></p>
      </footer>
    </div>
  );
}