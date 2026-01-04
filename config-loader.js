// ============================================
// SECURE FIREBASE CONFIGURATION LOADER
// ============================================

/**
 * Loads Firebase configuration from environment variables
 * This file is safe to commit to version control
 */

// For development: Load from .env file
// For production: Use environment variables from hosting platform

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID || import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID || import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Validate configuration
const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
const missingFields = requiredFields.filter(field => !firebaseConfig[field]);

if (missingFields.length > 0) {
    console.error('❌ Missing Firebase configuration fields:', missingFields);
    console.error('Please create a .env file based on .env.example');
    throw new Error('Incomplete Firebase configuration');
}

// Initialize Firebase
let app;
let auth;
let db;

try {
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();

    console.log('✅ Firebase inicializado com sucesso!');
} catch (error) {
    console.error('❌ Erro ao inicializar Firebase:', error);
    throw error;
}

// ============================================
// FIRESTORE STRUCTURE DOCUMENTATION
// ============================================

/*
COLLECTIONS:

users/
  - userId (document)
    - nome: string
    - email: string
    - tipo: "aluno" | "professor"
    - idade: number (apenas para alunos)
    - dataCriacao: timestamp
    - ultimoAcesso: timestamp

alunos/
  - userId (document)
    - pontos: number
    - nivel: number
    - xp: number
    - vidas: number
    - conquistas: array
    - professorId: string (referência ao professor responsável)
    - estatisticas: object
      - totalAtividades: number
      - totalAcertos: number
      - totalErros: number
      - taxaAcerto: number
      - tempoTotal: number

atividades/
  - userId (document)
    - historico: array [
        {
          ilha: string
          atividadeId: string
          questoes: array
          acertos: number
          erros: number
          estrelas: number
          xpGanho: number
          tempo: number
          data: timestamp
        }
      ]

ilhas/
  - ilha-name (document)
    - nome: string
    - descricao: string
    - icone: string
    - atividades: array [
        {
          id: string
          nome: string
          descricao: string
          nivel: number
          questoes: number
          xpRecompensa: number
          bloqueada: boolean
        }
      ]

conquistas/
  - conquista-id (document)
    - nome: string
    - descricao: string
    - icone: string
    - criterio: object
    - raridade: "comum" | "rara" | "epica" | "lendaria"
*/

// ============================================
// FIREBASE HELPER FUNCTIONS
// ============================================

/**
 * Verificar se o usuário está autenticado
 */
function verificarAutenticacao() {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
            if (user) {
                resolve(user);
            } else {
                reject('Usuário não autenticado');
            }
        });
    });
}

/**
 * Obter dados do usuário
 */
async function obterDadosUsuario(userId) {
    if (!userId || typeof userId !== 'string') {
        throw new Error('ID de usuário inválido');
    }

    try {
        const doc = await db.collection('users').doc(userId).get();
        if (doc.exists) {
            return doc.data();
        } else {
            throw new Error('Usuário não encontrado');
        }
    } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
        throw error;
    }
}

/**
 * Obter dados do aluno
 */
async function obterDadosAluno(userId) {
    if (!userId || typeof userId !== 'string') {
        throw new Error('ID de usuário inválido');
    }

    try {
        const doc = await db.collection('alunos').doc(userId).get();
        if (doc.exists) {
            return doc.data();
        } else {
            // Se não existir, criar perfil inicial
            const dadosIniciais = {
                pontos: 0,
                nivel: 1,
                xp: 0,
                vidas: 3,
                conquistas: [],
                estatisticas: {
                    totalAtividades: 0,
                    totalAcertos: 0,
                    totalErros: 0,
                    taxaAcerto: 0,
                    tempoTotal: 0
                }
            };

            await db.collection('alunos').doc(userId).set(dadosIniciais);
            return dadosIniciais;
        }
    } catch (error) {
        console.error('Erro ao obter dados do aluno:', error);
        throw error;
    }
}

/**
 * Atualizar dados do aluno (with validation)
 */
async function atualizarDadosAluno(userId, dados) {
    if (!userId || typeof userId !== 'string') {
        throw new Error('ID de usuário inválido');
    }

    if (!dados || typeof dados !== 'object') {
        throw new Error('Dados inválidos');
    }

    try {
        // Validate data types
        if (dados.pontos !== undefined && (typeof dados.pontos !== 'number' || dados.pontos < 0)) {
            throw new Error('Pontos inválidos');
        }

        await db.collection('alunos').doc(userId).update(dados);
        console.log('✅ Dados do aluno atualizados');
        return true;
    } catch (error) {
        console.error('Erro ao atualizar dados do aluno:', error);
        throw error;
    }
}

/**
 * Salvar resultado de atividade (with validation)
 */
async function salvarResultadoAtividade(userId, resultado) {
    if (!userId || typeof userId !== 'string') {
        throw new Error('ID de usuário inválido');
    }

    if (!resultado || typeof resultado !== 'object') {
        throw new Error('Resultado inválido');
    }

    // Validate required fields
    const requiredFields = ['ilha', 'atividadeId', 'acertos', 'erros', 'estrelas', 'xpGanho'];
    for (const field of requiredFields) {
        if (!(field in resultado)) {
            throw new Error(`Campo obrigatório ausente: ${field}`);
        }
    }

    try {
        const atividadeRef = db.collection('atividades').doc(userId);
        const doc = await atividadeRef.get();

        // Add timestamp
        resultado.data = firebase.firestore.FieldValue.serverTimestamp();

        if (doc.exists) {
            await atividadeRef.update({
                historico: firebase.firestore.FieldValue.arrayUnion(resultado)
            });
        } else {
            await atividadeRef.set({
                historico: [resultado]
            });
        }

        console.log('✅ Resultado da atividade salvo');
        return true;
    } catch (error) {
        console.error('Erro ao salvar resultado da atividade:', error);
        throw error;
    }
}

/**
 * Obter histórico de atividades
 */
async function obterHistoricoAtividades(userId, limite = 10) {
    if (!userId || typeof userId !== 'string') {
        throw new Error('ID de usuário inválido');
    }

    if (typeof limite !== 'number' || limite < 1 || limite > 100) {
        limite = 10;
    }

    try {
        const doc = await db.collection('atividades').doc(userId).get();

        if (doc.exists) {
            const historico = doc.data().historico || [];
            return historico.slice(-limite).reverse();
        }

        return [];
    } catch (error) {
        console.error('Erro ao obter histórico:', error);
        throw error;
    }
}

/**
 * Desbloquear conquista
 */
async function desbloquearConquista(userId, conquistaId) {
    if (!userId || typeof userId !== 'string') {
        throw new Error('ID de usuário inválido');
    }

    if (!conquistaId || typeof conquistaId !== 'string') {
        throw new Error('ID de conquista inválido');
    }

    try {
        const alunoRef = db.collection('alunos').doc(userId);
        const doc = await alunoRef.get();

        if (doc.exists) {
            const conquistas = doc.data().conquistas || [];

            if (!conquistas.includes(conquistaId)) {
                await alunoRef.update({
                    conquistas: firebase.firestore.FieldValue.arrayUnion(conquistaId)
                });

                console.log(`🏆 Conquista desbloqueada: ${conquistaId}`);
                return true;
            }
        }

        return false;
    } catch (error) {
        console.error('Erro ao desbloquear conquista:', error);
        throw error;
    }
}

// Export for global use
window.firebaseApp = app;
window.firebaseAuth = auth;
window.firebaseDb = db;
window.verificarAutenticacao = verificarAutenticacao;
window.obterDadosUsuario = obterDadosUsuario;
window.obterDadosAluno = obterDadosAluno;
window.atualizarDadosAluno = atualizarDadosAluno;
window.salvarResultadoAtividade = salvarResultadoAtividade;
window.obterHistoricoAtividades = obterHistoricoAtividades;
window.desbloquearConquista = desbloquearConquista;
