// src/App.jsx
import React, { useState } from 'react';
import Splash from './pages/Splash';
import Dashboard from './pages/Dashboard';
import MeusPacientes from './pages/MeusPacientes';
import CadastroPaciente from './pages/CadastroPaciente';
import EvolucaoClinica from './pages/EvolucaoClinica';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('splash');
  
  // Memória central para saber qual paciente foi clicado na lista
  const [pacienteAtual, setPacienteAtual] = useState(null);

  return (
    <>
      {/* TELA 1: SPLASH */}
      {telaAtual === 'splash' && (
        <Splash onIniciar={() => setTelaAtual('dashboard')} onHome={() => setTelaAtual('splash')} />
      )}
      
      {/* TELA 2: DASHBOARD */}
      {telaAtual === 'dashboard' && (
        <Dashboard 
          onAbrirProntuario={() => setTelaAtual('listaPacientes')} 
          onVoltar={() => setTelaAtual('splash')} 
          onHome={() => setTelaAtual('splash')} 
        />
      )}

      {/* TELA 3: LISTA DE PACIENTES */}
      {telaAtual === 'listaPacientes' && (
        <MeusPacientes 
          onVoltar={() => setTelaAtual('dashboard')} 
          
          // AQUI ESTÁ A MUDANÇA DEFINITIVA: 
          // Clicou no paciente -> Guarda o paciente -> Abre a EVOLUÇÃO COMPLETA
          onAbrirProntuario={(paciente) => { 
            setPacienteAtual(paciente); 
            setTelaAtual('evolucao'); 
          }} 
          
          onNovoPaciente={() => { 
            setPacienteAtual(null); 
            setTelaAtual('cadastro'); 
          }}
          
          onHome={() => setTelaAtual('splash')} 
        />
      )}

      {/* TELA 4: CADASTRO/EDIÇÃO */}
      {telaAtual === 'cadastro' && (
        <CadastroPaciente 
          pacienteEdicao={pacienteAtual}
          onVoltar={() => setTelaAtual('listaPacientes')} 
          onFinalizar={() => setTelaAtual('listaPacientes')} 
          onHome={() => setTelaAtual('splash')} 
        />
      )}
      
      {/* TELA 5: EVOLUÇÃO CLÍNICA (A COMPLETA QUE VOCÊ QUER) */}
      {telaAtual === 'evolucao' && (
        <EvolucaoClinica 
          pacienteSelecionado={pacienteAtual} 
          onVoltar={() => setTelaAtual('listaPacientes')} 
          onFinalizar={() => setTelaAtual('listaPacientes')} 
          onHome={() => setTelaAtual('splash')} 
        />
      )}
    </>
  );
}