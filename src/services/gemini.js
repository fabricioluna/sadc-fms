// src/services/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Puxa a chave segura do ficheiro .env
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Inicializa o SDK do Gemini
const genAI = new GoogleGenerativeAI(API_KEY);

// Configura o modelo (Vamos usar o 1.5-flash porque é extremamente rápido e inteligente para texto)
export const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Função central que fará a análise de segurança na prescrição
export async function analisarPrescricao(promptTexto) {
  try {
    const result = await geminiModel.generateContent(promptTexto);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro ao comunicar com o Gemini:", error);
    return "Erro de conexão com o Assistente SADC. Por favor, verifique a sua ligação ou tente novamente mais tarde.";
  }
}