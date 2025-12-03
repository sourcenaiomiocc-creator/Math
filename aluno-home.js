// ============================================
// PÁGINA HOME DO ALUNO (SEM LOGIN)
// ============================================

let dadosAluno = null;

document.addEventListener('DOMContentLoaded', function() {
    inicializarPaginaAluno();
});

/**
 * Inicializar página do aluno
 */
function inicializarPaginaAluno() {
    // Verificar se tem nome salvo
    const nomeAluno = localStorage.getItem('nomeAluno');

    if (!nomeAluno) {
        // Redirecionar para página inicial se não tem nome
        window.location.href = 'index.html';
        return;
    }

    // Carregar dados do localStorage
    carregarDadosAluno();

    // Verificar vidas diárias
    verificarVidasDiarias();

    // Atualizar UI
    atualizarInterface();

    // Configurar event listeners
    configurarEventListeners();

    // Mensagem do mascote
    mostrarMensagemMascote('Bem-vindo de volta! Que ilha você quer explorar hoje?');
}

/**
 * Carregar dados do aluno do localStorage
 */
function carregarDadosAluno() {
    const dadosSalvos = localStorage.getItem('dadosAluno');

    if (dadosSalvos) {
        dadosAluno = JSON.parse(dadosSalvos);
    } else {
        // Criar dados iniciais
        dadosAluno = {
            nome: localStorage.getItem('nomeAluno'),
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
        salvarDadosAluno();
    }
}

/**
 * Salvar dados do aluno no localStorage
 */
function salvarDadosAluno() {
    localStorage.setItem('dadosAluno', JSON.stringify(dadosAluno));
}

/**
 * Verificar e resetar vidas diariamente
 */
function verificarVidasDiarias() {
    const ultimaRecarga = localStorage.getItem('ultima-recarga');
    const hoje = new Date().toDateString();

    if (ultimaRecarga !== hoje) {
        dadosAluno.vidas = 3;
        localStorage.setItem('ultima-recarga', hoje);
        salvarDadosAluno();
    }
}

/**
 * Atualizar interface com dados do aluno
 */
function atualizarInterface() {
    // Nome do aluno
    const nomeCompleto = dadosAluno.nome || localStorage.getItem('nomeAluno');
    const primeiroNome = nomeCompleto.split(' ')[0];

    document.getElementById('nomeAluno').textContent = primeiroNome;
    document.getElementById('userName').textContent = primeiroNome;

    // Atualizar progresso (pontos, nível, XP)
    if (window.gamificacao) {
        gamificacao.atualizarUIProgresso(dadosAluno);
    } else {
        // Fallback se gamificacao.js não carregar
        document.getElementById('pontos').textContent = dadosAluno.pontos || 0;
        document.getElementById('nivel').textContent = dadosAluno.nivel || 1;
    }

    // Carregar progresso das ilhas
    carregarProgressoIlhas();

    // Carregar conquistas recentes
    carregarConquistasRecentes();
}

/**
 * Carregar progresso das ilhas
 */
function carregarProgressoIlhas() {
    const historico = JSON.parse(localStorage.getItem('historicoAtividades') || '[]');

    // Calcular progresso por ilha
    const progressoIlhas = {
        'operacoes-basicas': { completadas: 0, estrelas: 0 },
        'senso-numerico': { completadas: 0, estrelas: 0 },
        'problemas': { completadas: 0, estrelas: 0 },
        'geometria': { completadas: 0, estrelas: 0 }
    };

    historico.forEach(atividade => {
        if (progressoIlhas[atividade.ilha]) {
            progressoIlhas[atividade.ilha].completadas++;
            progressoIlhas[atividade.ilha].estrelas += atividade.estrelas || 0;
        }
    });

    // Atualizar UI das ilhas
    document.querySelectorAll('.island-card').forEach(card => {
        const ilhaId = card.dataset.island;
        const progresso = progressoIlhas[ilhaId];

        if (progresso) {
            const completadasEl = card.querySelector('.completadas');
            const estrelasEl = card.querySelector('.estrelas');

            if (completadasEl) completadasEl.textContent = progresso.completadas;
            if (estrelasEl) estrelasEl.textContent = progresso.estrelas;
        }
    });
}

/**
 * Carregar conquistas recentes
 */
function carregarConquistasRecentes() {
    const conquistasContainer = document.getElementById('conquistasRecentes');
    if (!conquistasContainer) return;

    const conquistasAluno = dadosAluno.conquistas || [];
    conquistasContainer.innerHTML = '';

    // Mostrar até 3 conquistas
    const conquistasParaMostrar = conquistasAluno.slice(-3);

    if (conquistasParaMostrar.length === 0 && window.gamificacao) {
        // Mostrar conquistas bloqueadas
        Object.values(gamificacao.CONQUISTAS).slice(0, 3).forEach(conquista => {
            const div = document.createElement('div');
            div.className = 'conquista-item locked';
            div.innerHTML = `
                <span class="conquista-icon">${conquista.icone}</span>
                <span class="conquista-nome">${conquista.nome}</span>
            `;
            conquistasContainer.appendChild(div);
        });
    } else if (window.gamificacao) {
        conquistasParaMostrar.forEach(conquistaId => {
            const conquista = gamificacao.CONQUISTAS[conquistaId];
            if (conquista) {
                const div = document.createElement('div');
                div.className = 'conquista-item unlocked';
                div.innerHTML = `
                    <span class="conquista-icon">${conquista.icone}</span>
                    <span class="conquista-nome">${conquista.nome}</span>
                `;
                conquistasContainer.appendChild(div);
            }
        });
    }
}

/**
 * Configurar event listeners
 */
function configurarEventListeners() {
    // Botão de sair (limpar dados)
    const btnSair = document.getElementById('btnSair');
    if (btnSair) {
        btnSair.addEventListener('click', () => {
            if (confirm('Deseja sair? Seu progresso será mantido.')) {
                window.location.href = 'index.html';
            }
        });
    }

    // Botão de perfil
    const btnPerfil = document.getElementById('btnPerfil');
    if (btnPerfil) {
        btnPerfil.addEventListener('click', () => {
            mostrarPerfil();
        });
    }

    // Botões das ilhas
    document.querySelectorAll('.btn-island').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const card = e.target.closest('.island-card');
            const ilhaId = card.dataset.island;
            navegarParaIlha(ilhaId);
        });
    });

    // Click nas ilhas (alternativa)
    document.querySelectorAll('.island-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('btn-island')) {
                const ilhaId = this.dataset.island;
                navegarParaIlha(ilhaId);
            }
        });
    });
}

/**
 * Mostrar perfil do aluno
 */
function mostrarPerfil() {
    alert(`👤 Perfil de ${dadosAluno.nome}\n\n` +
          `⭐ Pontos: ${dadosAluno.pontos}\n` +
          `🏆 Nível: ${dadosAluno.nivel}\n` +
          `📚 Atividades: ${dadosAluno.estatisticas.totalAtividades}\n` +
          `✅ Taxa de Acerto: ${dadosAluno.estatisticas.taxaAcerto}%\n` +
          `🏅 Conquistas: ${dadosAluno.conquistas.length}`);
}

/**
 * Navegar para ilha
 */
function navegarParaIlha(ilhaId) {
    // Salvar ilha selecionada
    localStorage.setItem('ilha-atual', ilhaId);

    // Mensagens personalizadas por ilha
    const mensagens = {
        'operacoes-basicas': 'Vamos praticar operações matemáticas! 🚀',
        'senso-numerico': 'Hora de explorar o mundo dos números! 🔢',
        'problemas': 'Prepare-se para desafios incríveis! 🧩',
        'geometria': 'Vamos descobrir as formas! 📐',
        'jogos-livres': 'Hora de se divertir! 🎮'
    };

    mostrarMensagemMascote(mensagens[ilhaId] || 'Boa sorte!');

    // Redirecionar
    setTimeout(() => {
        window.location.href = 'atividades.html';
    }, 1000);
}

/**
 * Mostrar mensagem do mascote
 */
function mostrarMensagemMascote(mensagem) {
    const mascotMessage = document.getElementById('mascotMessage');
    if (mascotMessage) {
        mascotMessage.textContent = mensagem;

        // Animar
        mascotMessage.style.animation = 'none';
        setTimeout(() => {
            mascotMessage.style.animation = 'fadeIn 0.3s ease';
        }, 10);
    }
}

// Atualizar a cada 30 segundos
setInterval(() => {
    carregarDadosAluno();
    if (window.gamificacao) {
        gamificacao.atualizarUIProgresso(dadosAluno);
    }
}, 30000);
