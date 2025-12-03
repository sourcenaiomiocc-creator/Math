// ============================================
// CONFIGURAÇÃO DO FIREBASE
// ============================================

// INSTRUÇÕES PARA CONFIGURAR O FIREBASE:
// 1. Acesse https://console.firebase.google.com/
// 2. Crie um novo projeto ou selecione um existente
// 3. Vá em "Configurações do Projeto" > "Seus apps"
// 4. Clique em "</>" para adicionar um app da Web
// 5. Copie as configurações e substitua abaixo

const firebaseConfig = {
    apiKey: "AIzaSyAa7EhLrV2etGgmOJ0layJxBYRXfOBAb0U",
    authDomain: "matematica-4f0a8.firebaseapp.com",
    projectId: "matematica-4f0a8",
    storageBucket: "matematica-4f0a8.firebasestorage.app",
    messagingSenderId: "1024125435202",
    appId: "1:1024125435202:web:3ea3d86143244912271cdb",
    measurementId: "G-YNJ8R59S2G"
};

// Inicializar Firebase
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
}

// ============================================
// ESTRUTURA DO FIRESTORE
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
// FUNÇÕES AUXILIARES DO FIREBASE
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
 * Atualizar dados do aluno
 */
async function atualizarDadosAluno(userId, dados) {
    try {
        await db.collection('alunos').doc(userId).update(dados);
        console.log('✅ Dados do aluno atualizados');
        return true;
    } catch (error) {
        console.error('Erro ao atualizar dados do aluno:', error);
        throw error;
    }
}

/**
 * Salvar resultado de atividade
 */
async function salvarResultadoAtividade(userId, resultado) {
    try {
        const atividadeRef = db.collection('atividades').doc(userId);
        const doc = await atividadeRef.get();

        if (doc.exists) {
            // Adicionar ao histórico existente
            await atividadeRef.update({
                historico: firebase.firestore.FieldValue.arrayUnion(resultado)
            });
        } else {
            // Criar novo documento
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
    try {
        const doc = await db.collection('atividades').doc(userId).get();

        if (doc.exists) {
            const historico = doc.data().historico || [];
            // Retornar os últimos N itens
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
    try {
        const alunoRef = db.collection('alunos').doc(userId);
        const doc = await alunoRef.get();

        if (doc.exists) {
            const conquistas = doc.data().conquistas || [];

            // Verificar se já possui a conquista
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

// Exportar para uso global
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
