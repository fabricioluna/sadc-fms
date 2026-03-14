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
    Atue baseando-se EXCLUSIVAMENTE em literatura médica padrão-ouro.

    Paciente:
    ${perfilPaciente}

    Fármacos a serem prescritos: [${remedios}]

    Realize o cruzamento de dados buscando interações genéticas, alergias cruzadas e riscos com comorbidades.

    Responda APENAS com um objeto JSON válido, sem texto fora dele, seguindo esta estrutura:
    {
      "nivelRisco": "BAIXO" | "ALERTA" | "CRÍTICO",
      "resumoClinico": "Parecer clínico direto, máximo de 3 frases.",
      "detalhes": [
        {
          "farmaco": "Nome do Fármaco",
          "aviso": "Explicação técnica do risco.",
          "nivelEvidencia": "ALTO" | "MODERADO" | "BAIXO"
        }
      ],
      "referenciasBibliograficas": [
        {
          "titulo": "Nome do Livro Clássico (Ex: Goodman & Gilman), Diretriz (Ex: Diretriz CPIC) ou Artigo",
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
        generationConfig: { response_mime_type: "application/json" }
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