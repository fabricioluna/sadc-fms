// src/App.jsx
import React from 'react';
import { ShieldPlus } from 'lucide-react';

import logoFms from './assets/logo-fms.png';
import logoLiga from './assets/logo-liga.png';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      
      {/* Container Principal (Card Centralizado) */}
      <main className="bg-white max-w-md w-full rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col items-center text-center z-10">
        
        {/* Bloco das Logos Institucionais */}
        <div className="flex justify-center items-center gap-6 mb-8 w-full">
          <img src={logoFms} alt="Faculdade Medicina do Sertão" className="h-16 object-contain" />
          {/* Divisor Visual Discreto */}
          <div className="h-12 w-px bg-gray-200"></div> 
          <img src={logoLiga} alt="Liga Acadêmica de Farmacologia" className="h-16 object-contain" />
        </div>

        {/* Apresentação do Sistema */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-[var(--color-fms-azul)] tracking-tight mb-2">
            SADC FMS
          </h1>
          <h2 className="text-xs font-bold text-[var(--color-fms-verde)] uppercase tracking-widest mb-4">
            Inteligência Clínica Preditiva
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Sistema Inteligente de Suporte à Decisão Clínica integrado à Farmacogenômica e Farmacologia Translacional. Projetado para mitigar eventos iatrogênicos e otimizar a segurança do paciente.
          </p>
        </div>

        {/* Botão de Acesso Temporário (Futuro Login) */}
        <button className="w-full bg-[var(--color-fms-azul)] text-white font-bold text-lg py-4 rounded-xl shadow-md hover:bg-[var(--color-fms-verde)] transition-colors duration-300 active:scale-[0.98] flex justify-center items-center gap-3">
          <ShieldPlus size={24} />
          Iniciar Sistema
        </button>
        
        <p className="text-[10px] text-gray-400 mt-4 uppercase tracking-wider font-semibold">
          Módulo de Autenticação em Desenvolvimento
        </p>
      </main>

      {/* Rodapé - Créditos de Desenvolvimento */}
      <footer className="mt-8 text-center z-10">
        <p className="text-sm text-gray-500">
          Desenvolvido por <span className="text-[var(--color-fms-azul)] font-extrabold">Fabrício Luna</span>
        </p>
        <p className="text-xs text-gray-400 mt-1 font-medium">
          Projeto de Pesquisa e Inovação Tecnológica em Saúde
        </p>
      </footer>

      {/* Elemento Decorativo de Fundo (Opcional, dá um toque moderno) */}
      <div className="fixed top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--color-fms-azul)] to-[var(--color-fms-verde)]"></div>
    </div>
  );
}