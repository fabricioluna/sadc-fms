// src/pages/Prontuario.jsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Activity, Stethoscope, Pill, FileText, Clock, AlertTriangle, Loader2, UserEdit } from 'lucide-react';
import logoFms from '../assets/logo-fms.png';
import logoLiga from '../assets/logo-liga.png';
import { listarEvolucoesDb } from '../services/firebase'; // Conexão com a nuvem

export default function Prontuario({ paciente, onVoltar, onHome, onNovaEvolucao }) {
  const [evolucoes, setEvolucoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Busca o histórico real de evoluções deste paciente no Firebase
  useEffect(() => {
    if (paciente) {
      const carregarHistorico = async () => {
        const dados = await listarEvolucoesDb(paciente.id);
        setEvolucoes(dados);
        setCarregando(false);
      };
      carregarHistorico();
    }
  }, [paciente]);

  if (!paciente) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-bold">Carregando dados do paciente...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* Cabeçalho Global Padronizado */}
      <header className="bg-white p-3 shadow-sm border-b border-gray-200 sticky top-0 z-30 flex justify-between items-center">
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
      </header>

      {/* Banner Clínico do Paciente (Dados Dinâmicos) */}
      <div className="bg-[var(--color-fms-azul)] text-white p-4 shadow-md z-20 relative">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold tracking-wide">{paciente.nome}</h1>
              <p className="text-[11px] text-blue-200 mt-0.5">
                {paciente.idade} anos | {paciente.sexo === 'M' ? 'Masculino' : 'Feminino'} | Sangue <span className="text-red-300 font-black">{paciente.tipoSanguineo || 'N/I'}</span>
              </p>
            </div>
            <div className="flex flex-col items-end">
               <span className="text-[10px] font-bold bg-white text-[var(--color-fms-azul)] px-2 py-1 rounded shadow-sm mb-1 uppercase tracking-tighter">
                 ID: {paciente.id}
               </span>
               <span className="text-[10px] font-bold bg-blue-900 text-blue-100 px-2 py-1 rounded shadow-sm border border-blue-700">
                 Peso: {paciente.peso ? `${paciente.peso}kg` : '--'}
               </span>
            </div>
          </div>

          {/* Alertas de Alergia em Destaque no Topo */}
          {paciente.alergias && paciente.alergias.length > 0 && (
            <div className="mt-2 bg-red-500/20 border border-red-400/40 p-2 rounded-lg flex items-center gap-2">
              <AlertTriangle size={14} className="text-red-200" />
              <span className="text-[10px] font-bold text-red-100 uppercase tracking-wider">
                Alergias: {paciente.alergias.join(', ')}
              </span>
            </div>
          )}
        </div>
      </div>

      <main className="flex-1 p-4 pb-28 overflow-y-auto max-w-2xl mx-auto w-full">
        
        {/* Título da Linha do Tempo */}
        <div className="flex items-center gap-2 mb-6 text-gray-400">
          <Clock size={16} />
          <h2 className="text-xs font-black uppercase tracking-widest">Histórico de Atendimentos</h2>
        </div>

        {/* Lista de Evoluções que vêm do Firebase */}
        {carregando ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Loader2 className="animate-spin text-blue-500" size={32} />
            <p className="text-xs font-bold text-gray-400 uppercase">Buscando Prontuário na Nuvem...</p>
          </div>
        ) : evolucoes.length > 0 ? (
          <div className="space-y-4">
            {evolucoes.map((evo) => (
              <div key={evo.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                <div className="absolute left-0 top-0 h-full w-1.5 bg-green-500"></div>
                <div className="flex justify-between items-center mb-3 border-b border-gray-50 pb-2">
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-blue-900">
                      {new Date(evo.dataAtendimento).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                      ID Atendimento: {evo.idEvolucao || 'N/A'}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {evo.medico || 'Dra. Gleyka Santos'}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700 leading-relaxed whitespace-pre-line">
                    {evo.anamnese}
                  </p>
                  
                  {/* Sinais vitais registrados naquela data */}
                  {evo.sinaisVitais && (
                    <div className="flex gap-4 pt-2">
                      {evo.sinaisVitais.pa && <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">PA: {evo.sinaisVitais.pa}</span>}
                      {evo.sinaisVitais.fc && <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">FC: {evo.sinaisVitais.fc} bpm</span>}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl border-2 border-dashed border-gray-200 text-center">
            <div className="bg-gray-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="text-gray-300" size={32} />
            </div>
            <h3 className="text-gray-800 font-bold mb-1">Prontuário em Branco</h3>
            <p className="text-xs text-gray-400 font-medium px-4">Este paciente ainda não possui evoluções registradas no sistema SADC.</p>
          </div>
        )}
      </main>

      {/* BOTÃO DE AÇÃO - A PONTE PARA A PÁGINA DE EVOLUÇÃO ESTRUTURADA */}
      <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md p-4 border-t border-gray-200 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div className="max-w-2xl mx-auto flex gap-3">
          <button 
            onClick={onNovaEvolucao}
            className="flex-1 bg-[var(--color-fms-verde)] text-white font-black py-4 rounded-2xl shadow-xl flex justify-center items-center gap-3 hover:bg-green-700 transition-all transform active:scale-95 border-b-4 border-green-800"
          >
            <Stethoscope size={24} />
            NOVA EVOLUÇÃO COMPLETA
          </button>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
        <div className="flex flex-col items-center gap-3">
          <p className="text-[10px] text-gray-400">Desenvolvido por <span className="text-[var(--color-fms-azul)] font-extrabold">Fabrício Luna</span></p>
        </div>
      </footer>
    </div>
  );
}