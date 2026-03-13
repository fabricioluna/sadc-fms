// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs, addDoc, query, orderBy } from 'firebase/firestore';

// Puxa as chaves de segurança do seu arquivo .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializa a conexão com o Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ==========================================
// FUNÇÕES DO BANCO DE DADOS (FIRESTORE)
// ==========================================

// 1. Salvar ou Editar um Paciente (Admissão)
export const salvarPacienteDb = async (pacienteId, dados) => {
  try {
    const docRef = doc(db, "pacientes", pacienteId);
    await setDoc(docRef, dados, { merge: true }); // merge: true atualiza sem apagar o que já existia
    return true;
  } catch (error) {
    console.error("Erro ao salvar paciente:", error);
    return false;
  }
};

// 2. Buscar a Lista de Pacientes (Tela Inicial)
export const listarPacientesDb = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "pacientes"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Erro ao listar pacientes:", error);
    return [];
  }
};

// 3. Salvar Nova Evolução Clínica
export const salvarEvolucaoDb = async (pacienteId, dadosEvolucao) => {
  try {
    // Cria uma subcoleção "evolucoes" dentro do documento do paciente
    const evolucoesRef = collection(db, `pacientes/${pacienteId}/evolucoes`);
    await addDoc(evolucoesRef, { 
      ...dadosEvolucao, 
      dataRegistro: new Date().toISOString() 
    });
    return true;
  } catch (error) {
    console.error("Erro ao salvar evolução:", error);
    return false;
  }
};

// 4. Listar Histórico de Evoluções de um Paciente
export const listarEvolucoesDb = async (pacienteId) => {
  try {
    // Busca as evoluções ordenadas da mais recente para a mais antiga
    const q = query(collection(db, `pacientes/${pacienteId}/evolucoes`), orderBy("dataRegistro", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Erro ao listar evoluções:", error);
    return [];
  }
};