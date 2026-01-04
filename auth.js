// ============================================
// SISTEMA DE AUTENTICAÇÃO
// ============================================

let tipoUsuarioSelecionado = 'aluno';

document.addEventListener('DOMContentLoaded', function() {
    inicializarPaginaLogin();
});

/**
 * Inicializar página de login
 */
function inicializarPaginaLogin() {
    // Seletor de tipo de usuário
    const userTypeBtns = document.querySelectorAll('.user-type-btn');
    userTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            userTypeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            tipoUsuarioSelecionado = this.dataset.type;

            // Mostrar/ocultar campo de idade
            const idadeGroup = document.getElementById('idadeGroup');
            if (idadeGroup) {
                if (tipoUsuarioSelecionado === 'aluno') {
                    idadeGroup.style.display = 'block';
                } else {
                    idadeGroup.style.display = 'none';
                }
            }
        });
    });

    // Formulário de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Link de cadastro
    const cadastroLink = document.getElementById('cadastroLink');
    if (cadastroLink) {
        cadastroLink.addEventListener('click', function(e) {
            e.preventDefault();
            abrirModalCadastro();
        });
    }

    // Formulário de cadastro
    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', handleCadastro);
    }

    // Fechar modal
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', fecharModalCadastro);
    }

    // Verificar se já está logado
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // Redirecionar para página apropriada
            redirecionarUsuarioLogado(user.uid);
        }
    });
}

/**
 * Handle Login
 */
async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    mostrarLoading(true);

    try {
        // Fazer login
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, senha);
        const user = userCredential.user;

        // Verificar tipo de usuário
        const userData = await obterDadosUsuario(user.uid);

        // Atualizar último acesso
        await db.collection('users').doc(user.uid).update({
            ultimoAcesso: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Redirecionar
        if (userData.tipo === 'aluno') {
            window.location.href = 'aluno/home.html';
        } else {
            window.location.href = 'dashboard.html';
        }
    } catch (error) {
        console.error('Erro no login:', error);
        mostrarErro(tratarErroFirebase(error));
    } finally {
        mostrarLoading(false);
    }
}

/**
 * Handle Cadastro
 */
async function handleCadastro(e) {
    e.preventDefault();

    const nome = document.getElementById('cadastro-nome').value;
    const email = document.getElementById('cadastro-email').value;
    const senha = document.getElementById('cadastro-senha').value;
    const idade = document.getElementById('cadastro-idade')?.value;

    // Validações
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarErro('Por favor, informe um email válido');
        return;
    }

    // Password strength validation (NIST guidelines: minimum 12 characters)
    if (senha.length < 12) {
        mostrarErro('A senha deve ter no mínimo 12 caracteres para sua segurança');
        return;
    }

    // Check for common weak passwords
    const weakPasswords = ['123456789012', 'password1234', 'qwerty123456'];
    if (weakPasswords.includes(senha.toLowerCase())) {
        mostrarErro('Esta senha é muito comum. Por favor, escolha uma senha mais segura');
        return;
    }

    // Name validation
    if (!nome || nome.trim().length < 2 || nome.length > 100) {
        mostrarErro('Por favor, informe um nome válido (2-100 caracteres)');
        return;
    }

    // Age validation (client-side, also enforced server-side in Firestore Rules)
    if (tipoUsuarioSelecionado === 'aluno') {
        const idadeNum = parseInt(idade);
        if (!idade || isNaN(idadeNum) || idadeNum < 5 || idadeNum > 18) {
            mostrarErro('Por favor, informe uma idade válida (5-18 anos)');
            return;
        }
    }

    mostrarLoading(true);

    try {
        // Criar usuário no Firebase Auth
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, senha);
        const user = userCredential.user;

        // Criar perfil no Firestore
        const dadosUsuario = {
            nome: nome,
            email: email,
            tipo: tipoUsuarioSelecionado,
            dataCriacao: firebase.firestore.FieldValue.serverTimestamp(),
            ultimoAcesso: firebase.firestore.FieldValue.serverTimestamp()
        };

        if (tipoUsuarioSelecionado === 'aluno') {
            dadosUsuario.idade = parseInt(idade);
        }

        await db.collection('users').doc(user.uid).set(dadosUsuario);

        // Se for aluno, criar perfil de progresso
        if (tipoUsuarioSelecionado === 'aluno') {
            await db.collection('alunos').doc(user.uid).set({
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
            });
        }

        // Atualizar nome de exibição
        await user.updateProfile({
            displayName: nome
        });

        // Fechar modal e fazer login
        fecharModalCadastro();
        mostrarSucesso('Conta criada com sucesso! Redirecionando...');

        // Redirecionar
        setTimeout(() => {
            if (tipoUsuarioSelecionado === 'aluno') {
                window.location.href = 'aluno/home.html';
            } else {
                window.location.href = 'dashboard.html';
            }
        }, 1500);

    } catch (error) {
        console.error('Erro no cadastro:', error);
        mostrarErro(tratarErroFirebase(error));
    } finally {
        mostrarLoading(false);
    }
}

/**
 * Logout
 */
async function logout() {
    try {
        await firebase.auth().signOut();
        window.location.href = '../index.html';
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        mostrarErro('Erro ao sair. Tente novamente.');
    }
}

/**
 * Redirecionar usuário logado
 */
async function redirecionarUsuarioLogado(userId) {
    try {
        const userData = await obterDadosUsuario(userId);
        const currentPath = window.location.pathname;

        if (userData.tipo === 'aluno' && !currentPath.includes('aluno/')) {
            window.location.href = 'aluno/home.html';
        } else if (userData.tipo === 'professor' && !currentPath.includes('dashboard.html')) {
            window.location.href = 'dashboard.html';
        }
    } catch (error) {
        console.error('Erro ao redirecionar:', error);
    }
}

/**
 * Abrir modal de cadastro
 */
function abrirModalCadastro() {
    const modal = document.getElementById('cadastroModal');
    if (modal) {
        modal.classList.add('active');
        modal.style.display = 'flex';
    }
}

/**
 * Fechar modal de cadastro
 */
function fecharModalCadastro() {
    const modal = document.getElementById('cadastroModal');
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
    }
}

/**
 * Tratar erros do Firebase
 * Uses generic messages to prevent user enumeration attacks
 */
function tratarErroFirebase(error) {
    // Log error details for debugging (server-side only in production)
    console.error('Firebase Auth Error:', error.code, error.message);

    const erros = {
        'auth/email-already-in-use': 'Este email já está cadastrado',
        'auth/invalid-email': 'Email inválido',
        'auth/weak-password': 'Senha muito fraca. Use pelo menos 12 caracteres',

        // Generic messages to prevent account enumeration
        'auth/user-not-found': 'Email ou senha incorretos',
        'auth/wrong-password': 'Email ou senha incorretos',

        'auth/too-many-requests': 'Muitas tentativas. Aguarde alguns minutos e tente novamente',
        'auth/network-request-failed': 'Erro de conexão. Verifique sua internet',
        'auth/operation-not-allowed': 'Operação não permitida. Contate o suporte',
        'auth/user-disabled': 'Esta conta foi desativada. Contate o suporte'
    };

    return erros[error.code] || 'Erro na autenticação. Verifique seus dados e tente novamente';
}

/**
 * Mostrar/ocultar loading
 */
function mostrarLoading(mostrar) {
    const loading = document.getElementById('loading');
    if (loading) {
        if (mostrar) {
            loading.classList.remove('hidden');
        } else {
            loading.classList.add('hidden');
        }
    }
}

/**
 * Mostrar mensagem de erro
 */
function mostrarErro(mensagem) {
    alert('❌ ' + mensagem);
}

/**
 * Mostrar mensagem de sucesso
 */
function mostrarSucesso(mensagem) {
    alert('✅ ' + mensagem);
}

// Exportar função de logout
window.logout = logout;
