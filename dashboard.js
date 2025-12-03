// ============================================
// DASHBOARD - PROFESSORES/PAIS
// ============================================

let usuarioAtual = null;
let alunosSelecionados = [];

document.addEventListener('DOMContentLoaded', function() {
    inicializarDashboard();
});

/**
 * Inicializar dashboard
 */
async function inicializarDashboard() {
    try {
        // Verificar autenticação
        const user = await verificarAutenticacao();
        usuarioAtual = user;

        // Verificar se é professor
        const userData = await obterDadosUsuario(user.uid);
        if (userData.tipo !== 'professor') {
            window.location.href = 'aluno/home.html';
            return;
        }

        // Atualizar nome do professor
        document.getElementById('professorNome').textContent = userData.nome.split(' ')[0];

        // Carregar visão geral
        await carregarVisaoGeral();

        // Configurar event listeners
        configurarEventListeners();

    } catch (error) {
        console.error('Erro ao inicializar dashboard:', error);
        window.location.href = 'index.html';
    }
}

/**
 * Configurar event listeners
 */
function configurarEventListeners() {
    // Menu lateral
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            // Remover active de todos
            document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // Trocar view
            const view = this.dataset.view;
            trocarView(view);
        });
    });

    // Botão de sair
    document.getElementById('btnSair').addEventListener('click', logout);

    // Busca de aluno
    const searchInput = document.getElementById('searchAluno');
    if (searchInput) {
        searchInput.addEventListener('input', utils.debounce((e) => {
            buscarAluno(e.target.value);
        }, 300));
    }
}

/**
 * Trocar view
 */
async function trocarView(view) {
    // Ocultar todas as views
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.remove('active');
    });

    // Mostrar view selecionada
    document.getElementById(view).classList.add('active');

    // Carregar dados da view
    switch (view) {
        case 'visao-geral':
            await carregarVisaoGeral();
            break;
        case 'alunos':
            await carregarAlunos();
            break;
        case 'relatorios':
            await carregarRelatorios();
            break;
        case 'conquistas':
            await carregarConquistas();
            break;
        case 'configuracoes':
            await carregarConfiguracoes();
            break;
    }
}

/**
 * Carregar visão geral
 */
async function carregarVisaoGeral() {
    try {
        // Por enquanto, vamos mostrar dados simulados
        // Em produção, você buscaria do Firestore

        // Estatísticas gerais
        document.getElementById('totalAlunos').textContent = '0';
        document.getElementById('atividadesCompletas').textContent = '0';
        document.getElementById('mediaEstrelas').textContent = '0';
        document.getElementById('taxaAcerto').textContent = '0%';

        // Atividade recente
        const atividadeRecenteContainer = document.getElementById('atividadeRecente');
        atividadeRecenteContainer.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
                <p>📊 Ainda não há atividades registradas</p>
                <p style="font-size: 0.9rem; margin-top: 8px;">Os dados aparecerão aqui quando os alunos começarem a fazer atividades.</p>
            </div>
        `;

        // Gráficos (placeholder)
        document.getElementById('chartIlhas').innerHTML = `
            <div style="text-align: center; color: var(--text-secondary);">
                <p>📈 Gráfico de atividades por ilha</p>
                <p style="font-size: 0.85rem; margin-top: 8px;">Os dados serão exibidos quando houver atividades completas</p>
            </div>
        `;

        document.getElementById('chartSemanal').innerHTML = `
            <div style="text-align: center; color: var(--text-secondary);">
                <p>📊 Progresso semanal</p>
                <p style="font-size: 0.85rem; margin-top: 8px;">Os dados serão exibidos quando houver atividades completas</p>
            </div>
        `;

    } catch (error) {
        console.error('Erro ao carregar visão geral:', error);
    }
}

/**
 * Carregar lista de alunos
 */
async function carregarAlunos() {
    try {
        const alunosGrid = document.getElementById('alunosGrid');

        // Buscar todos os usuários do tipo aluno
        const snapshot = await db.collection('users')
            .where('tipo', '==', 'aluno')
            .get();

        if (snapshot.empty) {
            alunosGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px; color: var(--text-secondary);">
                    <div style="font-size: 4rem; margin-bottom: 16px;">👥</div>
                    <h3>Ainda não há alunos cadastrados</h3>
                    <p style="margin-top: 12px;">Os alunos que criarem contas no sistema aparecerão aqui.</p>
                </div>
            `;
            return;
        }

        alunosGrid.innerHTML = '';

        // Criar cards dos alunos
        for (const doc of snapshot.docs) {
            const userData = doc.data();
            const userId = doc.id;

            // Buscar dados do aluno
            const dadosAluno = await obterDadosAluno(userId);

            const card = document.createElement('div');
            card.className = 'aluno-card';
            card.innerHTML = `
                <div class="aluno-header">
                    <div class="aluno-avatar">
                        ${userData.nome.charAt(0).toUpperCase()}
                    </div>
                    <div class="aluno-info">
                        <h4>${userData.nome}</h4>
                        <div class="aluno-nivel">Nível ${dadosAluno.nivel || 1}</div>
                    </div>
                </div>
                <div class="aluno-stats">
                    <div class="aluno-stat">
                        <div class="aluno-stat-value">${dadosAluno.pontos || 0}</div>
                        <div class="aluno-stat-label">Pontos</div>
                    </div>
                    <div class="aluno-stat">
                        <div class="aluno-stat-value">${dadosAluno.estatisticas?.totalAtividades || 0}</div>
                        <div class="aluno-stat-label">Atividades</div>
                    </div>
                    <div class="aluno-stat">
                        <div class="aluno-stat-value">${dadosAluno.estatisticas?.taxaAcerto || 0}%</div>
                        <div class="aluno-stat-label">Acerto</div>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => mostrarDetalhesAluno(userId, userData, dadosAluno));
            alunosGrid.appendChild(card);
        }

        // Atualizar contador
        document.getElementById('totalAlunos').textContent = snapshot.size;

    } catch (error) {
        console.error('Erro ao carregar alunos:', error);
    }
}

/**
 * Mostrar detalhes do aluno
 */
async function mostrarDetalhesAluno(userId, userData, dadosAluno) {
    try {
        // Buscar histórico
        const historico = await obterHistoricoAtividades(userId, 20);

        const modal = document.getElementById('alunoModal');
        const detalhesContainer = document.getElementById('alunoDetalhes');

        detalhesContainer.innerHTML = `
            <div style="text-align: center; margin-bottom: 32px;">
                <div class="aluno-avatar" style="width: 100px; height: 100px; font-size: 3rem; margin: 0 auto 16px;">
                    ${userData.nome.charAt(0).toUpperCase()}
                </div>
                <h2>${userData.nome}</h2>
                <p style="color: var(--text-secondary);">Idade: ${userData.idade || 'N/A'} anos</p>
                <p style="color: var(--text-secondary);">Email: ${userData.email}</p>
            </div>

            <div class="stats-grid" style="margin-bottom: 32px;">
                <div class="stat-card">
                    <div class="stat-icon">⭐</div>
                    <div class="stat-info">
                        <div class="stat-value">${dadosAluno.pontos || 0}</div>
                        <div class="stat-label">Pontos</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🏆</div>
                    <div class="stat-info">
                        <div class="stat-value">${dadosAluno.nivel || 1}</div>
                        <div class="stat-label">Nível</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📚</div>
                    <div class="stat-info">
                        <div class="stat-value">${dadosAluno.estatisticas?.totalAtividades || 0}</div>
                        <div class="stat-label">Atividades</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">✅</div>
                    <div class="stat-info">
                        <div class="stat-value">${dadosAluno.estatisticas?.taxaAcerto || 0}%</div>
                        <div class="stat-label">Taxa de Acerto</div>
                    </div>
                </div>
            </div>

            <h3 style="margin-bottom: 16px;">📜 Histórico Recente</h3>
            <div style="max-height: 300px; overflow-y: auto;">
                ${historico.length > 0 ? historico.map(atividade => `
                    <div class="activity-item">
                        <div class="activity-icon">${obterIconeIlha(atividade.ilha)}</div>
                        <div class="activity-info">
                            <div class="activity-title">${obterNomeIlha(atividade.ilha)}</div>
                            <div class="activity-meta">
                                ${atividade.acertos}/${atividade.acertos + atividade.erros} acertos •
                                ${utils.obterEmojEstrelas(atividade.estrelas)} •
                                +${atividade.xpGanho} XP
                            </div>
                        </div>
                    </div>
                `).join('') : '<p style="text-align: center; color: var(--text-secondary); padding: 20px;">Ainda não há atividades completas</p>'}
            </div>

            <h3 style="margin: 24px 0 16px;">🏆 Conquistas (${dadosAluno.conquistas?.length || 0})</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 12px;">
                ${dadosAluno.conquistas?.map(conquistaId => {
                    const conquista = gamificacao.CONQUISTAS[conquistaId];
                    return conquista ? `
                        <div style="background: var(--bg-primary); padding: 12px 16px; border-radius: 12px; display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 1.5rem;">${conquista.icone}</span>
                            <span style="font-weight: 600;">${conquista.nome}</span>
                        </div>
                    ` : '';
                }).join('') || '<p style="color: var(--text-secondary);">Nenhuma conquista desbloqueada ainda</p>'}
            </div>
        `;

        modal.classList.add('active');
        modal.style.display = 'flex';

        // Fechar modal
        modal.querySelector('.close').onclick = () => {
            modal.classList.remove('active');
            modal.style.display = 'none';
        };

        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                modal.style.display = 'none';
            }
        };

    } catch (error) {
        console.error('Erro ao mostrar detalhes do aluno:', error);
    }
}

/**
 * Obter ícone da ilha
 */
function obterIconeIlha(ilha) {
    const icones = {
        'operacoes-basicas': '➕',
        'senso-numerico': '🔢',
        'problemas': '🧩',
        'geometria': '📐',
        'jogos-livres': '🎮'
    };
    return icones[ilha] || '📚';
}

/**
 * Obter nome da ilha
 */
function obterNomeIlha(ilha) {
    const nomes = {
        'operacoes-basicas': 'Ilha das Operações',
        'senso-numerico': 'Ilha dos Números',
        'problemas': 'Ilha dos Desafios',
        'geometria': 'Ilha das Formas',
        'jogos-livres': 'Parque de Diversões'
    };
    return nomes[ilha] || 'Atividade';
}

/**
 * Carregar relatórios
 */
async function carregarRelatorios() {
    const relatorioContainer = document.getElementById('relatorioContainer');
    relatorioContainer.innerHTML = `
        <div style="text-align: center; padding: 60px; color: var(--text-secondary);">
            <div style="font-size: 4rem; margin-bottom: 16px;">📄</div>
            <h3>Relatórios Personalizados</h3>
            <p style="margin-top: 12px; max-width: 500px; margin-left: auto; margin-right: auto;">
                Selecione um aluno e período acima para gerar relatórios detalhados de desempenho.
            </p>
        </div>
    `;
}

/**
 * Carregar conquistas
 */
async function carregarConquistas() {
    const conquistasGrid = document.getElementById('conquistasGrid');
    conquistasGrid.innerHTML = '';

    Object.values(gamificacao.CONQUISTAS).forEach(conquista => {
        const card = document.createElement('div');
        card.className = 'conquista-card';
        card.innerHTML = `
            <div class="conquista-card-icon">${conquista.icone}</div>
            <h4>${conquista.nome}</h4>
            <p>${conquista.descricao}</p>
            <div class="conquista-unlocked">
                Raridade: ${conquista.raridade} • +${conquista.xpBonus} XP
            </div>
        `;
        conquistasGrid.appendChild(card);
    });
}

/**
 * Carregar configurações
 */
async function carregarConfiguracoes() {
    try {
        const userData = await obterDadosUsuario(usuarioAtual.uid);

        document.getElementById('configNome').value = userData.nome || '';
        document.getElementById('configEmail').value = userData.email || '';

    } catch (error) {
        console.error('Erro ao carregar configurações:', error);
    }
}

/**
 * Buscar aluno
 */
function buscarAluno(termo) {
    const cards = document.querySelectorAll('.aluno-card');

    cards.forEach(card => {
        const nome = card.querySelector('h4').textContent.toLowerCase();
        if (nome.includes(termo.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
