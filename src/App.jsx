// src/App.jsx
import React, { useState } from 'react';
import Splash from './pages/Splash';
import Dashboard from './pages/Dashboard';
import MeusPacientes from './pages/MeusPacientes';
import Prontuario from './pages/Prontuario';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('splash');

  if (telaAtual === 'splash') {
    return <Splash onIniciar={() => setTelaAtual('dashboard')} onHome={() => setTelaAtual('splash')} />;
  }

  if (telaAtual === 'dashboard') {
    return (
      <Dashboard 
        onAbrirProntuario={() => setTelaAtual('listaPacientes')} 
        onVoltar={() => setTelaAtual('splash')} // Seta de voltar para o Splash
        onHome={() => setTelaAtual('splash')} 
      />
    );
  }

  if (telaAtual === 'listaPacientes') {
    return (
      <MeusPacientes 
        onVoltar={() => setTelaAtual('dashboard')} 
        onAbrirProntuario={() => setTelaAtual('prontuario')} 
        onHome={() => setTelaAtual('splash')} 
      />
    );
  }

  if (telaAtual === 'prontuario') {
    return (
      <Prontuario 
        onVoltar={() => setTelaAtual('listaPacientes')} 
        onHome={() => setTelaAtual('splash')} 
      />
    );
  }

  return null;
}