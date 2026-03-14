// src/components/BotaoMagico.jsx
import React, { useState } from 'react';
import { DatabaseZap, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { listarPacientesDb, deletarPacienteDb, salvarPacienteDb, salvarEvolucaoDb } from '../services/firebase';

export default function BotaoMagico() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const setupDatabase = async () => {
    if (!window.confirm("Isso apagará TODOS os pacientes atuais e criará os perfis de teste A1. Deseja continuar?")) return;
    
    setLoading(true);
    setStatus('Limpando banco de dados...');

    try {
      // 1. Limpeza
      const pacientesAntigos = await listarPacientesDb();
      for (const p of pacientesAntigos) {
        await deletarPacienteDb(p.id);
      }

      const pacientesTeste = [
        {
          id: "JOAQUIM-123",
          nome: "Joaquim Silva",
          idade: 68,
          sexo: "M",
          tipoSanguineo: "O+",
          alergias: ["Nenhuma"],
          comorbidades: ["Fibrilação Atrial", "Hipertensão"],
          genetica: { "CYP2C19": "PM (Lento)" },
          evolucoes: [
            {
              dataAtendimento: "2026-01-10",
              anamnese: "Paciente estável, em acompanhamento pós-AVC isquêmico. Nega queixas álgicas.",
              medico: "Dr. Roberto Araújo",
              sinaisVitais: { pa: "130/80", peso: "75" }
            }
          ]
        },
        {
          id: "MARIA-84",
          nome: "Maria Oliveira",
          idade: 84,
          sexo: "F",
          tipoSanguineo: "A-",
          alergias: ["Dipirona"],
          comorbidades: ["Insônia Crônica", "Osteoporose"],
          genetica: {},
          evolucoes: [
            {
              dataAtendimento: "2026-02-05",
              anamnese: "Relata dificuldade para conciliar o sono e episódios de tontura matinal.",
              medico: "Dra. Gleyka Santos",
              sinaisVitais: { pa: "110/70" }
            }
          ]
        },
        {
          id: "CARLOS-45",
          nome: "Carlos Eduardo Santos",
          idade: 45,
          sexo: "M",
          tipoSanguineo: "B+",
          alergias: ["Nenhuma"],
          comorbidades: ["Cardiopatia Isquêmica", "Depressão"],
          genetica: { "CYP2D6": "IM (Intermediário)" },
          evolucoes: [
            {
              dataAtendimento: "2026-02-20",
              anamnese: "Paciente em acompanhamento cardiológico. Eletrocardiograma recente mostra intervalo QTc no limite superior da normalidade (440ms).",
              medico: "Dr. Marcos Pontes",
              sinaisVitais: { fc: "58", pa: "120/80" }
            }
          ]
        },
        {
          id: "ANA-59",
          nome: "Ana Costa",
          idade: 59,
          sexo: "F",
          tipoSanguineo: "AB+",
          alergias: ["Contraste Iodado"],
          comorbidades: ["Diabetes Tipo 2", "Insuficiência Renal Crônica"],
          genetica: {},
          evolucoes: [
            {
              dataAtendimento: "2026-01-15",
              anamnese: "Rotina de nefrologia. Exames laboratoriais indicam Creatinina de 2.1 mg/dL. Em uso de Enalapril 10mg.",
              medico: "Dra. Gleyka Santos",
              sinaisVitais: { peso: "68", pa: "145/90" }
            },
            {
              dataAtendimento: "2026-02-10",
              anamnese: "Queixa-se de tosse seca persistente iniciada há 3 semanas. Sem febre ou coriza.", // Caso de Cascata Prescritiva
              medico: "Dr. Lucas Lima"
            }
          ]
        },
        {
          id: "ROBERTO-72",
          nome: "Roberto Lima",
          idade: 72,
          sexo: "M",
          tipoSanguineo: "O-",
          alergias: ["Penicilina"],
          comorbidades: ["Insuficiência Cardíaca CF II", "Hipertensão", "AVC Prévio"],
          genetica: { "CYP2C9": "PM (Lento)" },
          evolucoes: [
            {
              dataAtendimento: "2026-03-01",
              anamnese: "Paciente com quadro de insuficiência cardíaca compensada. Relata dispneia aos grandes esforços.",
              medico: "Dra. Gleyka Santos",
              sinaisVitais: { pa: "135/85", fc: "72" }
            }
          ]
        }
      ];

      for (const p of pacientesTeste) {
        setStatus(`Cadastrando ${p.nome}...`);
        const { evolucoes, ...dadosPaciente } = p;
        await salvarPacienteDb(p.id, dadosPaciente);
        
        for (const evo of evolucoes) {
          await salvarEvolucaoDb(p.id, evo);
        }
      }

      setStatus('Banco de dados pronto!');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error(error);
      setStatus('Erro no processo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <button
        onClick={setupDatabase}
        disabled={loading}
        className={`flex items-center gap-2 px-6 py-3 rounded-full font-black uppercase text-xs tracking-widest shadow-lg transition-all transform active:scale-95 ${
          loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
        }`}
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : <DatabaseZap size={18} />}
        {loading ? 'Processando...' : 'Botão Mágico: Setup A1'}
      </button>
      {status && (
        <p className="text-[10px] font-bold text-indigo-600 animate-pulse uppercase tracking-tighter">
          {status}
        </p>
      )}
    </div>
  );
}