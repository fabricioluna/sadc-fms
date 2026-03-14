// src/services/ai.js

// Puxa a chave de forma segura do arquivo .env ou das variáveis da Vercel
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * Função principal que envia os dados do paciente, histórico e a prescrição 
 * para a IA realizar a validação cruzada baseada em evidências.
 */
export const analisarPrescricaoIA = async (paciente, historico, anamneseAtual, listaPrescricao) => {
  // Validação de segurança inicial
  if (!API_KEY) {
    return { 
      nivelRisco: "ERRO", 
      resumoClinico: "Chave da API do Gemini não configurada. Verifique o arquivo .env ou as configurações da Vercel.", 
      detalhes: [],
      referenciasBibliograficas: []
    };
  }

  // Prepara o histórico recente (limite de 3 para manter o foco da IA e economizar tokens)
  const historicoFormatado = historico?.slice(0, 3).map(h => `- ${h.dataAtendimento}: ${h.anamnese}`).join('\n') || 'Sem histórico prévio relevante.';

  // Prepara o perfil do paciente para o prompt
  const perfilPaciente = `
    Idade: ${paciente.idade} anos
    Sexo: ${paciente.sexo}
    Alergias: ${paciente.alergias?.length > 0 ? paciente.alergias.join(', ') : 'Nenhuma'}
    Comorbidades: ${paciente.comorbidades?.length > 0 ? paciente.comorbidades.join(', ') : 'Nenhuma'}
    Mapeamento Genético: ${paciente.genetica ? JSON.stringify(paciente.genetica) : 'Não Informado'}
  `;

  // Lista de fármacos extraída da prescrição atual
  const remedios = listaPrescricao.map(p => p.farmaco).join(', ');

  // Engenharia de Prompt focada em Segurança do Paciente e Farmacogenómica
  const prompt = `
    Você é o motor de validação de segurança clínica do sistema SADC (Suporte à Decisão Clínica).
    Seu papel é atuar como um farmacêutico clínico sênior, baseando-se EXCLUSIVAMENTE em literatura médica padrão-ouro (CPIC, PharmGKB, Beers, Goodman & Gilman).

    1. DADOS FIXOS DO PACIENTE:
    ${perfilPaciente}

    2. CONTEXTO CLÍNICO (Análise Essencial):
    - Histórico Recente:
    ${historicoFormatado}
    - Anamnese Atual (Queixas de hoje):
    ${anamneseAtual || 'Não preenchida.'}

    3. FÁRMACOS DIGITADOS PELO MÉDICO: 
    [${remedios}]

    FLUXO DE VALIDAÇÃO RIGOROSA:
    1. VALIDAÇÃO ONTOLÓGICA E PREVENÇÃO LASA: Analise a grafia de cada fármaco listado. 
       - Se houver pequenos erros de digitação (ex: "Amoxilina" em vez de "Amoxicilina", "Dipiron" em vez de "Dipirona"), identifique o fármaco correto e prossiga.
       - Se um fármaco for totalmente desconhecido, inventado ou não farmacológico, PARE a análise imediatamente e retorne o nivelRisco "ERRO" explicando que a substância não foi reconhecida.
    2. ANÁLISE CONTEXTUAL: Cruze os fármacos validados com a Genética, Alergias e Comorbidades, E TAMBÉM cruze com os sintomas relatados na Anamnese Atual e no Histórico para detectar possíveis cascatas prescritivas.

    ESTRUTURA DE RESPOSTA:
    Responda APENAS com um objeto JSON válido, seguindo rigorosamente esta estrutura:
    {
      "nivelRisco": "BAIXO" | "ALERTA" | "CRÍTICO" | "ERRO",
      "notaCorrecaoLASA": "Se você corrigiu a grafia de algum medicamento na Validação Ontológica, escreva o aviso aqui (Ex: 'Atenção: O termo X foi corrigido para Y para esta análise'). Se a grafia estava perfeita, retorne o valor null.",
      "resumoClinico": "Parecer clínico direto e técnico, levando em conta o contexto clínico. Máximo de 3 frases.",
      "detalhes": [
        {
          "farmaco": "Nome do Fármaco (Corrigido por você)",
          "aviso": "Explicação técnica sucinta do risco.",
          "nivelEvidencia": "ALTO" | "MODERADO" | "BAIXO"
        }
      ],
      "referenciasBibliograficas": [
        {
          "titulo": "Nome da Diretriz, Livro ou Artigo",
          "autorOuOrg": "Autor ou Organização (Ex: CPIC, AHA, Mayo Clinic)",
          "motivo": "Referência específica para este caso"
        }
      ]
    }
  `;

  try {
    // Requisição para o modelo Gemini 2.5 Flash
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { 
          response_mime_type: "application/json",
          temperature: 0.1 // Baixa temperatura para respostas mais determinísticas e técnicas
        }
      })
    });

    const data = await response.json();
    
    // Tratamento de erros da API
    if (data.error) {
      console.error("Erro da API Gemini:", data.error);
      return { 
        nivelRisco: "ERRO", 
        resumoClinico: `Erro de comunicação: ${data.error.message}`, 
        detalhes: [],
        referenciasBibliograficas: []
      };
    }

    // Extração e parsing do JSON retornado pela IA
    const textoResposta = data.candidates[0].content.parts[0].text;
    return JSON.parse(textoResposta);

  } catch (error) {
    console.error("Erro no processamento do SADC:", error);
    return { 
      nivelRisco: "ERRO", 
      resumoClinico: "Falha técnica ao processar a validação cruzada. Tente novamente.", 
      detalhes: [],
      referenciasBibliograficas: []
    };
  }
};