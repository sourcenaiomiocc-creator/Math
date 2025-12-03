// ============================================
// PÁGINA DE ESTATÍSTICAS DETALHADAS
// ============================================

let dadosAluno = null;
let estatisticasDetalhadas = null;

document.addEventListener('DOMContentLoaded', function() {
    inicializarPaginaEstatisticas();
});

/**
 * Inicializar página de estatísticas
 */
function inicializarPaginaEstatisticas() {
    // Verificar se tem nome salvo
    const nomeAluno = localStorage.getItem('nomeAluno');

    if (!nomeAluno) {
        window.location.href = 'index.html';
        return;
    }

    // Carregar dados do aluno
    const dadosSalvos = localStorage.getItem('dadosAluno');
    dadosAluno = dadosSalvos ? JSON.parse(dadosSalvos) : null;

    if (!dadosAluno) {
        alert('Não há dados para exibir ainda. Complete algumas atividades primeiro!');
        window.location.href = 'home.html';
        return;
    }

    // Calcular estatísticas detalhadas
    if (window.gamificacao && window.gamificacao.DificuldadeAdaptativa) {
        estatisticasDetalhadas = gamificacao.DificuldadeAdaptativa.calcularEstatisticasDetalhadas(dadosAluno);
    }

    // Atualizar interface
    atualizarEstatisticasGerais();
    atualizarRecomendacao();
    atualizarProgressoIlhas();
    atualizarGraficoDias();
    atualizarConquistas();
}

/**
 * Atualizar estatísticas gerais
 */
function atualizarEstatisticasGerais() {
    // Total de atividades
    document.getElementById('totalAtividades').textContent = estatisticasDetalhadas?.totalAtividades || dadosAluno.estatisticas.totalAtividades || 0;

    // Taxa de acerto
    const taxaAcerto = estatisticasDetalhadas?.taxaAcertoGeral || dadosAluno.estatisticas.taxaAcerto || 0;
    document.getElementById('taxaAcerto').textContent = `${taxaAcerto}%`;

    // Pontos totais
    document.getElementById('totalPontos').textContent = dadosAluno.pontos || 0;

    // Nível atual
    document.getElementById('nivelAtual').textContent = dadosAluno.nivel || 1;

    // Atividades perfeitas
    document.getElementById('atividadesPerfeitas').textContent = estatisticasDetalhadas?.atividadesPerfeitas || dadosAluno.estatisticas.atividadesPerfeitas || 0;

    // Dias consecutivos
    document.getElementById('diasConsecutivos').textContent = estatisticasDetalhadas?.diasConsecutivos || 0;

    // Tempo médio
    const tempoMedio = estatisticasDetalhadas?.tempoMedio || 0;
    const minutos = Math.floor(tempoMedio / 60);
    document.getElementById('tempoMedio').textContent = `${minutos}min`;

    // Total de conquistas
    document.getElementById('totalConquistas').textContent = dadosAluno.conquistas?.length || 0;

    // Mensagem de boas-vindas personalizada
    const primeiroNome = dadosAluno.nome.split(' ')[0];
    let mensagem = `Olá, ${primeiroNome}! `;

    if (taxaAcerto >= 90) {
        mensagem += 'Você está arrasando! 🌟';
    } else if (taxaAcerto >= 70) {
        mensagem += 'Continue assim, você está indo muito bem! 👏';
    } else if (taxaAcerto >= 50) {
        mensagem += 'Bom trabalho! Continue praticando! 💪';
    } else {
        mensagem += 'Cada passo conta! Continue tentando! 🚀';
    }

    document.getElementById('welcomeMessage').textContent = mensagem;

    // Animar contadores
    if (window.utils) {
        utils.animarContagem(document.getElementById('totalAtividades'), estatisticasDetalhadas?.totalAtividades || 0);
        utils.animarContagem(document.getElementById('totalPontos'), dadosAluno.pontos || 0);
        utils.animarContagem(document.getElementById('atividadesPerfeitas'), estatisticasDetalhadas?.atividadesPerfeitas || 0);
    }
}

/**
 * Atualizar recomendação personalizada
 */
function atualizarRecomendacao() {
    if (!window.gamificacao || !window.gamificacao.DificuldadeAdaptativa) return;

    const recomendacao = gamificacao.DificuldadeAdaptativa.obterRecomendacao(dadosAluno);

    const card = document.getElementById('recommendationCard');
    const mensagem = document.getElementById('recommendationMessage');

    mensagem.textContent = recomendacao.mensagem;

    // Alterar cor do card baseado no tipo
    if (recomendacao.tipo === 'desafio') {
        card.style.background = 'linear-gradient(135deg, #FFE66D, #FFD93D)';
    } else if (recomendacao.tipo === 'progresso') {
        card.style.background = 'linear-gradient(135deg, #A8E6CF, #56CCF2)';
    } else {
        card.style.background = 'linear-gradient(135deg, #FFE66D, #FFD93D)';
    }
}

/**
 * Atualizar progresso por ilha
 */
function atualizarProgressoIlhas() {
    const historico = JSON.parse(localStorage.getItem('historicoAtividades') || '[]');
    const container = document.getElementById('ilhasProgress');
    container.innerHTML = '';

    const ilhas = {
        'operacoes-basicas': {
            nome: '➕ Ilha das Operações',
            cor: '#FF6B6B'
        },
        'senso-numerico': {
            nome: '🔢 Ilha dos Números',
            cor: '#4ECDC4'
        },
        'problemas': {
            nome: '🧩 Ilha dos Desafios',
            cor: '#FFE66D'
        },
        'geometria': {
            nome: '📐 Ilha das Formas',
            cor: '#95E1D3'
        }
    };

    // Calcular progresso por ilha
    const progressoPorIlha = {};

    Object.keys(ilhas).forEach(ilhaId => {
        const atividadesDaIlha = historico.filter(h => h.ilha === ilhaId);

        let totalAcertos = 0;
        let totalQuestoes = 0;

        atividadesDaIlha.forEach(atividade => {
            totalAcertos += atividade.acertos || 0;
            totalQuestoes += (atividade.acertos + atividade.erros) || 10;
        });

        const taxa = totalQuestoes > 0 ? Math.floor((totalAcertos / totalQuestoes) * 100) : 0;

        progressoPorIlha[ilhaId] = {
            atividades: atividadesDaIlha.length,
            taxa: taxa
        };
    });

    // Criar elementos de progresso
    Object.keys(ilhas).forEach(ilhaId => {
        const ilha = ilhas[ilhaId];
        const progresso = progressoPorIlha[ilhaId];

        const div = document.createElement('div');
        div.className = 'ilha-progress';
        div.innerHTML = `
            <div class="ilha-progress-header">
                <div class="ilha-progress-name">${ilha.nome}</div>
                <div class="ilha-progress-stats">${progresso.atividades} atividades • ${progresso.taxa}% de acerto</div>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar-fill" style="width: ${progresso.taxa}%; background: linear-gradient(90deg, ${ilha.cor}, ${ilha.cor}cc);">
                    ${progresso.taxa}%
                </div>
            </div>
        `;

        container.appendChild(div);
    });
}

/**
 * Atualizar gráfico de desempenho por dia
 */
function atualizarGraficoDias() {
    if (!estatisticasDetalhadas || !estatisticasDetalhadas.desempenhoPorDia) return;

    const container = document.getElementById('chartDias');
    container.innerHTML = '';

    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const desempenho = estatisticasDetalhadas.desempenhoPorDia;

    // Encontrar valor máximo para normalizar alturas
    let maxAtividades = 1;
    diasSemana.forEach(dia => {
        if (desempenho[dia].atividades > maxAtividades) {
            maxAtividades = desempenho[dia].atividades;
        }
    });

    // Criar barras
    diasSemana.forEach(dia => {
        const dados = desempenho[dia];
        const altura = maxAtividades > 0 ? (dados.atividades / maxAtividades) * 100 : 0;

        const barDiv = document.createElement('div');
        barDiv.className = 'chart-bar';
        barDiv.innerHTML = `
            <div class="chart-bar-fill" style="height: ${altura}%;">
                ${dados.atividades}
            </div>
            <div class="chart-bar-label">${dia}</div>
        `;

        container.appendChild(barDiv);

        // Animar entrada
        setTimeout(() => {
            barDiv.querySelector('.chart-bar-fill').style.height = `${altura}%`;
        }, 100);
    });
}

/**
 * Atualizar conquistas
 */
function atualizarConquistas() {
    if (!window.gamificacao || !window.gamificacao.CONQUISTAS) return;

    const container = document.getElementById('conquistasGrid');
    container.innerHTML = '';

    const conquistasDoAluno = dadosAluno.conquistas || [];
    const todasConquistas = gamificacao.CONQUISTAS;

    // Ordenar conquistas: desbloqueadas primeiro, depois por raridade
    const conquistasArray = Object.values(todasConquistas);
    const conquistasOrdenadas = conquistasArray.sort((a, b) => {
        const aDesbloqueada = conquistasDoAluno.includes(a.id);
        const bDesbloqueada = conquistasDoAluno.includes(b.id);

        if (aDesbloqueada && !bDesbloqueada) return -1;
        if (!aDesbloqueada && bDesbloqueada) return 1;

        // Ordenar por raridade
        const raridades = { 'lendaria': 4, 'epica': 3, 'rara': 2, 'comum': 1 };
        return (raridades[b.raridade] || 0) - (raridades[a.raridade] || 0);
    });

    // Criar cards de conquistas
    conquistasOrdenadas.forEach(conquista => {
        const desbloqueada = conquistasDoAluno.includes(conquista.id);

        const card = document.createElement('div');
        card.className = `conquista-card ${desbloqueada ? 'unlocked' : 'locked'}`;
        card.innerHTML = `
            <div class="conquista-card-icon">${conquista.icone}</div>
            <div class="conquista-card-name">${conquista.nome}</div>
            <div class="conquista-card-desc">${conquista.descricao}</div>
            ${desbloqueada ? `<div style="margin-top: 8px; font-weight: 700; color: #51CF66;">+${conquista.xpBonus} XP</div>` : ''}
        `;

        container.appendChild(card);
    });
}
