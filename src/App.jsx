// src/App.jsx
import React, { useState } from 'react';
import Splash from './pages/Splash';
import Dashboard from './pages/Dashboard';
import MeusPacientes from './pages/MeusPacientes';
import CadastroPaciente from './pages/CadastroPaciente';
import EvolucaoClinica from './pages/EvolucaoClinica'; // Novo arquivo
import Prontuario from './pages/Prontuario';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('splash');

  return (
    <>
      {telaAtual === 'splash' && <Splash onIniciar={() => setTelaAtual('dashboard')} onHome={() => setTelaAtual('splash')} />}
      
      {telaAtual === 'dashboard' && (
        <Dashboard 
          onAbrirProntuario={() => setTelaAtual('listaPacientes')} 
          onVoltar={() => setTelaAtual('splash')} 
          onHome={() => setTelaAtual('splash')} 
        />
      )}

      {telaAtual === 'listaPacientes' && (
        <MeusPacientes 
          onVoltar={() => setTelaAtual('dashboard')} 
          onAbrirProntuario={() => setTelaAtual('prontuario')} 
          onNovoPaciente={() => setTelaAtual('cadastro')}
          onEvolucaoRapida={() => setTelaAtual('evolucao')} // Direciona para evolução
          onHome={() => setTelaAtual('splash')} 
        />
      )}

      {/* Restante das rotas... */}
      {telaAtual === 'cadastro' && <CadastroPaciente onVoltar={() => setTelaAtual('listaPacientes')} onFinalizar={() => setTelaAtual('listaPacientes')} onHome={() => setTelaAtual('splash')} />}
      {telaAtual === 'evolucao' && <EvolucaoClinica onVoltar={() => setTelaAtual('listaPacientes')} onFinalizar={() => setTelaAtual('listaPacientes')} onHome={() => setTelaAtual('splash')} />}
      {telaAtual === 'prontuario' && <Prontuario onVoltar={() => setTelaAtual('listaPacientes')} onHome={() => setTelaAtual('splash')} />}
    </>
  );
}