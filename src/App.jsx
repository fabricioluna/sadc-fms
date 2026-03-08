// src/App.jsx
import React, { useState } from 'react';
import Splash from './pages/Splash';
import Dashboard from './pages/Dashboard';
import MeusPacientes from './pages/MeusPacientes';
import CadastroPaciente from './pages/CadastroPaciente';
import Prontuario from './pages/Prontuario';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('splash');

  return (
    <>
      {telaAtual === 'splash' && (
        <Splash onIniciar={() => setTelaAtual('dashboard')} onHome={() => setTelaAtual('splash')} />
      )}
      
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
          onEvolucaoRapida={() => setTelaAtual('prontuario')} // Direciona para o prontuário na aba de evolução
          onHome={() => setTelaAtual('splash')} 
        />
      )}

      {telaAtual === 'cadastro' && (
        <CadastroPaciente 
          onVoltar={() => setTelaAtual('listaPacientes')} 
          onFinalizar={() => setTelaAtual('listaPacientes')} 
          onHome={() => setTelaAtual('splash')} 
        />
      )}

      {telaAtual === 'prontuario' && (
        <Prontuario onVoltar={() => setTelaAtual('listaPacientes')} onHome={() => setTelaAtual('splash')} />
      )}
    </>
  );
}