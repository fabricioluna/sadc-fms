// src/pages/MeusPacientes.jsx
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Search, UserPlus, History, ChevronRight, Loader2, 
  Edit, Trash2, AlertOctagon // Ícones novos para o CRUD
} from 'lucide-react';
import logoFms from '../assets/logo-fms.png';
import logoLiga from '../assets/logo-liga.png';
import { listarPacientesDb, deletarPacienteDb } from '../services/firebase'; // Conexão com o Firebase atualizada

export default function MeusPacientes({ onVoltar, onAbrirProntuario, onNovoPaciente, onEditarPaciente, onHome }) {
  const [termoBusca, setTermoBusca] = useState('');
  
  // ESTADOS PARA O BANCO DE DADOS
  const [pacientes, setPacientes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Estados para o Modal de Exclusão Segura
  const [pacienteParaDeletar, setPacienteParaDeletar] = useState(null);
  const [deletando, setDeletando] = useState(false);

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

  // Função que executa a exclusão de verdade
  const confirmarDelecao = async () => {
    if (!pacienteParaDeletar) return;
    setDeletando(true);
    
    const sucesso = await deletarPacienteDb(pacienteParaDeletar.id);
    
    if (sucesso) {
      // Remove o paciente da lista localmente, sem precisar refazer o download do banco
      setPacientes(pacientes.filter(p => p.id !== pacienteParaDeletar.id));
      setPacienteParaDeletar(null); // Fecha o modal
    } else {
      alert("Erro ao excluir paciente. Verifique sua conexão com a internet.");
    }
    setDeletando(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
      
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

        {/* LISTA DE PACIENTES DINÂMICA (COM CRUD INCLUSO) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
          {carregando ? (
            <div className="p-8 flex justify-center items-center">
              <Loader2 className="animate-spin text-[var(--color-fms-azul)]" size={32} />
            </div>
          ) : pacientesFiltrados.length > 0 ? (
            pacientesFiltrados.map((paciente) => (
              <div 
                key={paciente.id} 
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-blue-50 transition-colors group gap-4 sm:gap-0"
              >
                
                {/* ÁREA CLICÁVEL: Abre a Evolução do Paciente */}
                <div 
                  onClick={() => onAbrirProntuario(paciente)} 
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <div className="h-10 w-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[var(--color-fms-azul)] shadow-sm group-hover:scale-105 transition-transform">
                    <span className="font-bold text-sm">{paciente.nome?.charAt(0) || '?'}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">{paciente.nome}</h4>
                    <p className="text-[10px] text-gray-500">{paciente.idade} anos | {paciente.id}</p>
                  </div>
                </div>

                {/* PAINEL DE AÇÕES (Preditivo + Editar + Excluir) */}
                <div className="flex items-center justify-end gap-3 sm:border-l border-gray-200 sm:pl-4">
                  
                  {paciente.preditivo && (
                    <span className="text-[9px] font-bold bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                      Preditivo Ativo
                    </span>
                  )}
                  
                  <button 
                    onClick={() => onEditarPaciente(paciente)}
                    className="p-2 text-blue-500 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-lg transition-colors"
                    title="Editar Cadastro do Paciente"
                  >
                    <Edit size={16} />
                  </button>

                  <button 
                    onClick={() => setPacienteParaDeletar(paciente)}
                    className="p-2 text-red-500 bg-red-50 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
                    title="Excluir Paciente"
                  >
                    <Trash2 size={16} />
                  </button>
                  
                  <ChevronRight size={18} className="text-gray-300 hidden sm:block" />
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

      {/* =========================================================
          MODAL DE CONFIRMAÇÃO DE EXCLUSÃO (Z-INDEX ALTO)
          ========================================================= */}
      {pacienteParaDeletar && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-[32px] p-8 text-center shadow-2xl transform scale-100 animate-scale-up">
            <div className="h-20 w-20 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto mb-6">
              <AlertOctagon size={40} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Excluir Paciente?</h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Você está prestes a excluir o cadastro e todo o histórico de evoluções de <strong className="text-red-600">{pacienteParaDeletar.nome}</strong>.<br/><br/>Esta ação é <strong>irreversível</strong>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setPacienteParaDeletar(null)}
                disabled={deletando}
                className="flex-1 py-4 bg-gray-100 text-gray-700 font-black text-xs uppercase rounded-2xl hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button 
                onClick={confirmarDelecao}
                disabled={deletando}
                className="flex-1 py-4 bg-red-600 text-white font-black text-xs uppercase rounded-2xl hover:bg-red-700 transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {deletando ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />} 
                {deletando ? 'Excluindo...' : 'Sim, Excluir Agora'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rodapé */}
      <footer className="bg-white border-t border-gray-200 py-4 mt-auto text-center">
        <p className="text-[10px] text-gray-400">Desenvolvido por <span className="text-[var(--color-fms-azul)] font-black">Fabrício Luna</span></p>
      </footer>
    </div>
  );
}