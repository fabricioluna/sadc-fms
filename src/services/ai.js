// src/services/ai.js

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const analisarPrescricaoIA = async (paciente, listaPrescricao) => {
  if (!API_KEY) {
    return { 
      nivelRisco: "ERRO", 
      resumoClinico: "Chave da API do Gemini não configurada no arquivo .env.", 
      detalhes: [],
      referenciasBibliograficas: []
    };
  }

  const perfilPaciente = `
    Idade: ${paciente.idade} anos
    Sexo: ${paciente.sexo}
    Alergias: ${paciente.alergias?.length > 0 ? paciente.alergias.join(', ') : 'Nenhuma'}
    Comorbidades: ${paciente.comorbidades?.length > 0 ? paciente.comorbidades.join(', ') : 'Nenhuma'}
    Mapeamento Genético: ${paciente.genetica ? JSON.stringify(paciente.genetica) : 'N/I'}
  `;

  const remedios = listaPrescricao.map(p => p.farmaco).join(', ');

  const prompt = `
    Você é o motor de validação de segurança clínica do sistema SADC.
    Atue baseando-se EXCLUSIVAMENTE em literatura médica padrão-ouro (ANVISA, CPIC, Beers, RxNorm).

    Paciente:
    ${perfilPaciente}

    Fármacos digitados pelo médico: [${remedios}]

    FLUXO DE VALIDAÇÃO RIGOROSA:
    1. VALIDAÇÃO ONTOLÓGICA E PREVENÇÃO LASA: Analise a grafia de cada fármaco listado. 
       - Se houver pequenos erros de digitação (ex: "Amoxilina" em vez de "Amoxicilina", "Dipiron" em vez de "Dipirona"), identifique o fármaco correto e prossiga.
       - Se um fármaco for totalmente desconhecido, inventado ou não farmacológico, PARE a análise imediatamente e retorne o nivelRisco "ERRO" explicando que a substância não foi reconhecida.
    2. CRUZAMENTO DE DADOS: Para os fármacos validados, busque interações genéticas, alergias cruzadas e riscos com as comorbidades.

    Responda APENAS com um objeto JSON válido, seguindo esta estrutura:
    {
      "nivelRisco": "BAIXO" | "ALERTA" | "CRÍTICO" | "ERRO",
      "resumoClinico": "Parecer clínico direto. SE você corrigiu a grafia de algum medicamento, inicie o texto obrigatoriamente dizendo: 'Nota SADC: O fármaco X foi interpretado como Y.' Depois forneça o parecer em até 3 frases.",
      "detalhes": [
        {
          "farmaco": "Nome do Fármaco (Corrigido por você)",
          "aviso": "Explicação técnica do risco.",
          "nivelEvidencia": "ALTO" | "MODERADO" | "BAIXO"
        }
      ],
      "referenciasBibliograficas": [
        {
          "titulo": "Nome do Livro Clássico, Diretriz ou Artigo",
          "autorOuOrg": "Autor principal ou Organização",
          "motivo": "Por que o médico deve ler esta referência para este caso específico"
        }
      ]
    }
  `;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { 
            response_mime_type: "application/json",
            temperature: 0.1 // Mantém a IA determinística e científica
        }
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error("Erro da API Gemini:", data.error);
      return { 
        nivelRisco: "ERRO", 
        resumoClinico: "Erro de comunicação com a API.", 
        detalhes: [],
        referenciasBibliograficas: []
      };
    }

    const textoResposta = data.candidates[0].content.parts[0].text;
    return JSON.parse(textoResposta);
  } catch (error) {
    console.error("Erro no processamento do SADC:", error);
    return { 
      nivelRisco: "ERRO", 
      resumoClinico: "Falha técnica ao processar a validação cruzada.", 
      detalhes: [],
      referenciasBibliograficas: []
    };
  }
};