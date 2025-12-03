// ============================================
// SISTEMA DE GAMIFICAÇÃO
// ============================================

/**
 * Sistema de Conquistas (Expandido)
 */
const CONQUISTAS = {
    // Conquistas de Primeiras Vezes
    'primeira-atividade': {
        id: 'primeira-atividade',
        nome: 'Primeira Aventura',
        descricao: 'Complete sua primeira atividade',
        icone: '🌟',
        criterio: (stats) => stats.totalAtividades >= 1,
        raridade: 'comum',
        xpBonus: 50
    },
    'primeira-perfeita': {
        id: 'primeira-perfeita',
        nome: 'Estreia Perfeita',
        descricao: 'Complete sua primeira atividade com 100% de acertos',
        icone: '💫',
        criterio: (stats) => stats.atividadePerfeita === true && stats.totalAtividades === 1,
        raridade: 'rara',
        xpBonus: 200
    },

    // Conquistas de Dedicação (Dias Consecutivos)
    'sequencia-3-dias': {
        id: 'sequencia-3-dias',
        nome: 'Dedicação',
        descricao: 'Faça atividades por 3 dias seguidos',
        icone: '🔥',
        criterio: (stats) => stats.diasConsecutivos >= 3,
        raridade: 'rara',
        xpBonus: 150
    },
    'sequencia-7-dias': {
        id: 'sequencia-7-dias',
        nome: 'Semana Perfeita',
        descricao: 'Faça atividades por 7 dias seguidos',
        icone: '🔥🔥',
        criterio: (stats) => stats.diasConsecutivos >= 7,
        raridade: 'epica',
        xpBonus: 350
    },
    'sequencia-14-dias': {
        id: 'sequencia-14-dias',
        nome: 'Duas Semanas de Fogo',
        descricao: 'Faça atividades por 14 dias seguidos',
        icone: '🔥🔥🔥',
        criterio: (stats) => stats.diasConsecutivos >= 14,
        raridade: 'lendaria',
        xpBonus: 700
    },
    'sequencia-30-dias': {
        id: 'sequencia-30-dias',
        nome: 'Mestre da Consistência',
        descricao: 'Faça atividades por 30 dias seguidos',
        icone: '👑🔥',
        criterio: (stats) => stats.diasConsecutivos >= 30,
        raridade: 'lendaria',
        xpBonus: 1500
    },

    // Conquistas de Precisão (Acertos Seguidos)
    '5-acertos-seguidos': {
        id: '5-acertos-seguidos',
        nome: 'Boa Mira',
        descricao: 'Acerte 5 questões seguidas',
        icone: '🎯',
        criterio: (stats) => stats.acertosSeguidos >= 5,
        raridade: 'comum',
        xpBonus: 100
    },
    '10-acertos-seguidos': {
        id: '10-acertos-seguidos',
        nome: 'Precisão Perfeita',
        descricao: 'Acerte 10 questões seguidas',
        icone: '🎯🎯',
        criterio: (stats) => stats.acertosSeguidos >= 10,
        raridade: 'rara',
        xpBonus: 200
    },
    '15-acertos-seguidos': {
        id: '15-acertos-seguidos',
        nome: 'Atirador de Elite',
        descricao: 'Acerte 15 questões seguidas',
        icone: '🎯🎯🎯',
        criterio: (stats) => stats.acertosSeguidos >= 15,
        raridade: 'epica',
        xpBonus: 400
    },
    '20-acertos-seguidos': {
        id: '20-acertos-seguidos',
        nome: 'Infalível',
        descricao: 'Acerte 20 questões seguidas',
        icone: '👑🎯',
        criterio: (stats) => stats.acertosSeguidos >= 20,
        raridade: 'lendaria',
        xpBonus: 800
    },

    // Conquistas de Pontos
    '100-pontos': {
        id: '100-pontos',
        nome: 'Centena Conquistada',
        descricao: 'Acumule 100 pontos',
        icone: '💯',
        criterio: (stats) => stats.pontos >= 100,
        raridade: 'comum',
        xpBonus: 100
    },
    '500-pontos': {
        id: '500-pontos',
        nome: 'Colecionador',
        descricao: 'Acumule 500 pontos',
        icone: '💰',
        criterio: (stats) => stats.pontos >= 500,
        raridade: 'rara',
        xpBonus: 250
    },
    '1000-pontos': {
        id: '1000-pontos',
        nome: 'Milionário',
        descricao: 'Acumule 1000 pontos',
        icone: '💎',
        criterio: (stats) => stats.pontos >= 1000,
        raridade: 'epica',
        xpBonus: 500
    },
    '2500-pontos': {
        id: '2500-pontos',
        nome: 'Rico em XP',
        descricao: 'Acumule 2500 pontos',
        icone: '👑💎',
        criterio: (stats) => stats.pontos >= 2500,
        raridade: 'lendaria',
        xpBonus: 1000
    },

    // Conquistas de Nível
    'nivel-5': {
        id: 'nivel-5',
        nome: 'Explorador Experiente',
        descricao: 'Alcance o nível 5',
        icone: '⭐',
        criterio: (stats) => stats.nivel >= 5,
        raridade: 'comum',
        xpBonus: 250
    },
    'nivel-10': {
        id: 'nivel-10',
        nome: 'Mestre Matemático',
        descricao: 'Alcance o nível 10',
        icone: '🏆',
        criterio: (stats) => stats.nivel >= 10,
        raridade: 'epica',
        xpBonus: 500
    },
    'nivel-15': {
        id: 'nivel-15',
        nome: 'Grande Mestre',
        descricao: 'Alcance o nível 15',
        icone: '🏆🏆',
        criterio: (stats) => stats.nivel >= 15,
        raridade: 'epica',
        xpBonus: 750
    },
    'nivel-20': {
        id: 'nivel-20',
        nome: 'Lenda Viva',
        descricao: 'Alcance o nível 20',
        icone: '👑🏆',
        criterio: (stats) => stats.nivel >= 20,
        raridade: 'lendaria',
        xpBonus: 1500
    },

    // Conquistas de Atividades Completas
    '10-atividades': {
        id: '10-atividades',
        nome: 'Estudante Dedicado',
        descricao: 'Complete 10 atividades',
        icone: '📚',
        criterio: (stats) => stats.totalAtividades >= 10,
        raridade: 'comum',
        xpBonus: 150
    },
    '25-atividades': {
        id: '25-atividades',
        nome: 'Persistente',
        descricao: 'Complete 25 atividades',
        icone: '📖',
        criterio: (stats) => stats.totalAtividades >= 25,
        raridade: 'rara',
        xpBonus: 300
    },
    '50-atividades': {
        id: '50-atividades',
        nome: 'Maratonista',
        descricao: 'Complete 50 atividades',
        icone: '🏃',
        criterio: (stats) => stats.totalAtividades >= 50,
        raridade: 'epica',
        xpBonus: 600
    },
    '100-atividades': {
        id: '100-atividades',
        nome: 'Centurião do Conhecimento',
        descricao: 'Complete 100 atividades',
        icone: '🎖️',
        criterio: (stats) => stats.totalAtividades >= 100,
        raridade: 'lendaria',
        xpBonus: 1200
    },

    // Conquistas de Perfeição
    'perfeccionista': {
        id: 'perfeccionista',
        nome: 'Perfeccionista',
        descricao: 'Complete uma atividade com 100% de acertos',
        icone: '✨',
        criterio: (stats) => stats.atividadePerfeita === true,
        raridade: 'rara',
        xpBonus: 150
    },
    '5-perfeitas': {
        id: '5-perfeitas',
        nome: 'Série Perfeita',
        descricao: 'Complete 5 atividades com 100% de acertos',
        icone: '✨✨',
        criterio: (stats) => stats.atividadesPerfeitas >= 5,
        raridade: 'epica',
        xpBonus: 400
    },
    '10-perfeitas': {
        id: '10-perfeitas',
        nome: 'Mestre da Perfeição',
        descricao: 'Complete 10 atividades com 100% de acertos',
        icone: '👑✨',
        criterio: (stats) => stats.atividadesPerfeitas >= 10,
        raridade: 'lendaria',
        xpBonus: 1000
    },

    // Conquistas de Taxa de Acerto
    'taxa-70': {
        id: 'taxa-70',
        nome: 'Bom Estudante',
        descricao: 'Mantenha taxa de acerto acima de 70%',
        icone: '📊',
        criterio: (stats) => stats.taxaAcerto >= 70 && stats.totalAtividades >= 5,
        raridade: 'comum',
        xpBonus: 200
    },
    'taxa-80': {
        id: 'taxa-80',
        nome: 'Ótimo Aluno',
        descricao: 'Mantenha taxa de acerto acima de 80%',
        icone: '📈',
        criterio: (stats) => stats.taxaAcerto >= 80 && stats.totalAtividades >= 10,
        raridade: 'rara',
        xpBonus: 400
    },
    'taxa-90': {
        id: 'taxa-90',
        nome: 'Expert',
        descricao: 'Mantenha taxa de acerto acima de 90%',
        icone: '🎓',
        criterio: (stats) => stats.taxaAcerto >= 90 && stats.totalAtividades >= 15,
        raridade: 'epica',
        xpBonus: 800
    },
    'taxa-95': {
        id: 'taxa-95',
        nome: 'Gênio Matemático',
        descricao: 'Mantenha taxa de acerto acima de 95%',
        icone: '👑🎓',
        criterio: (stats) => stats.taxaAcerto >= 95 && stats.totalAtividades >= 20,
        raridade: 'lendaria',
        xpBonus: 1500
    },

    // Conquistas por Ilha
    'ilha-completa': {
        id: 'ilha-completa',
        nome: 'Conquistador de Ilha',
        descricao: 'Complete todas as atividades de uma ilha',
        icone: '🏝️',
        criterio: (stats) => stats.ilhaCompleta === true,
        raridade: 'epica',
        xpBonus: 300
    },
    'todas-ilhas': {
        id: 'todas-ilhas',
        nome: 'Explorador Completo',
        descricao: 'Complete atividades em todas as ilhas',
        icone: '🗺️',
        criterio: (stats) => stats.ilhasVisitadas >= 4,
        raridade: 'epica',
        xpBonus: 500
    },

    // Conquistas Especiais
    'velocista': {
        id: 'velocista',
        nome: 'Velocista',
        descricao: 'Complete uma atividade em menos de 2 minutos',
        icone: '⚡',
        criterio: (stats) => stats.tempoAtividade < 120,
        raridade: 'rara',
        xpBonus: 200
    },
    'madrugador': {
        id: 'madrugador',
        nome: 'Madrugador',
        descricao: 'Complete uma atividade antes das 8h',
        icone: '🌅',
        criterio: (stats) => stats.horarioAtividade === 'madrugada',
        raridade: 'rara',
        xpBonus: 150
    },
    'coruja': {
        id: 'coruja',
        nome: 'Coruja Noturna',
        descricao: 'Complete uma atividade após as 22h',
        icone: '🦉',
        criterio: (stats) => stats.horarioAtividade === 'noite',
        raridade: 'rara',
        xpBonus: 150
    },
    'fim-de-semana': {
        id: 'fim-de-semana',
        nome: 'Dedicado no Fim de Semana',
        descricao: 'Complete atividades em sábados e domingos',
        icone: '🎮',
        criterio: (stats) => stats.atividadesFimDeSemana >= 5,
        raridade: 'rara',
        xpBonus: 250
    },

    // Conquistas de Recuperação
    'persistente': {
        id: 'persistente',
        nome: 'Nunca Desista',
        descricao: 'Continue após 3 erros seguidos',
        icone: '💪',
        criterio: (stats) => stats.recuperouDeErros === true,
        raridade: 'rara',
        xpBonus: 200
    },
    'resiliente': {
        id: 'resiliente',
        nome: 'Resiliente',
        descricao: 'Melhore sua taxa de acerto em 20% ou mais',
        icone: '🌱',
        criterio: (stats) => stats.melhoriaDesempenho >= 20,
        raridade: 'epica',
        xpBonus: 400
    }
};

/**
 * Adicionar XP e verificar level up
 */
async function adicionarXP(userId, xpGanho) {
    try {
        const dadosAluno = await obterDadosAluno(userId);
        const xpAtual = dadosAluno.xp || 0;
        const nivelAtual = dadosAluno.nivel || 1;

        const novoXP = xpAtual + xpGanho;
        const novoNivel = utils.calcularNivel(novoXP);

        // Atualizar dados
        await atualizarDadosAluno(userId, {
            xp: novoXP,
            nivel: novoNivel,
            pontos: (dadosAluno.pontos || 0) + xpGanho
        });

        // Verificar se subiu de nível
        if (novoNivel > nivelAtual) {
            mostrarAnimacaoNivelUp(novoNivel);
            utils.tocarSom('nivel-up');
            utils.criarConfete();
        }

        return {
            xpAtual: novoXP,
            nivel: novoNivel,
            levelUp: novoNivel > nivelAtual
        };
    } catch (error) {
        console.error('Erro ao adicionar XP:', error);
        throw error;
    }
}

/**
 * Verificar e desbloquear conquistas
 */
async function verificarConquistas(userId, stats) {
    try {
        const dadosAluno = await obterDadosAluno(userId);
        const conquistasAtuais = dadosAluno.conquistas || [];
        const novasConquistas = [];

        // Verificar cada conquista
        for (const [id, conquista] of Object.entries(CONQUISTAS)) {
            // Se já possui, pular
            if (conquistasAtuais.includes(id)) continue;

            // Verificar critério
            if (conquista.criterio(stats)) {
                // Desbloquear
                await desbloquearConquista(userId, id);
                novasConquistas.push(conquista);

                // Adicionar XP bônus
                if (conquista.xpBonus) {
                    await adicionarXP(userId, conquista.xpBonus);
                }
            }
        }

        // Mostrar conquistas desbloqueadas
        if (novasConquistas.length > 0) {
            mostrarConquistasDesbloqueadas(novasConquistas);
            utils.tocarSom('conquista');
        }

        return novasConquistas;
    } catch (error) {
        console.error('Erro ao verificar conquistas:', error);
        return [];
    }
}

/**
 * Mostrar animação de level up
 */
function mostrarAnimacaoNivelUp(novoNivel) {
    // Criar overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    const card = document.createElement('div');
    card.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 48px;
        text-align: center;
        animation: scaleIn 0.5s ease;
    `;

    card.innerHTML = `
        <div style="font-size: 6rem; margin-bottom: 24px; animation: bounce 0.6s ease infinite;">🎉</div>
        <h2 style="color: #FF6B6B; font-size: 2.5rem; margin-bottom: 16px;">Parabéns!</h2>
        <p style="font-size: 1.5rem; color: #7F8C8D; margin-bottom: 24px;">Você subiu para o</p>
        <div style="font-size: 4rem; font-weight: 700; color: #4ECDC4;">Nível ${novoNivel}</div>
        <p style="margin-top: 24px; font-size: 1.1rem; color: #7F8C8D;">Continue assim! Você está indo muito bem!</p>
    `;

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    // Remover após 3 segundos
    setTimeout(() => {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => overlay.remove(), 300);
    }, 3000);
}

/**
 * Mostrar conquistas desbloqueadas
 */
function mostrarConquistasDesbloqueadas(conquistas) {
    // Criar container
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: 100px;
        right: 32px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 16px;
        max-width: 350px;
    `;

    conquistas.forEach((conquista, index) => {
        setTimeout(() => {
            const card = document.createElement('div');
            card.style.cssText = `
                background: linear-gradient(135deg, #FFE66D, #FFD93D);
                border-radius: 12px;
                padding: 20px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                animation: slideInRight 0.5s ease;
                display: flex;
                align-items: center;
                gap: 16px;
            `;

            card.innerHTML = `
                <div style="font-size: 3rem;">${conquista.icone}</div>
                <div style="flex: 1;">
                    <div style="font-weight: 700; font-size: 1.1rem; color: #2C3E50; margin-bottom: 4px;">
                        🏆 Conquista Desbloqueada!
                    </div>
                    <div style="font-weight: 600; color: #2C3E50;">${conquista.nome}</div>
                    <div style="font-size: 0.85rem; color: #7F8C8D;">${conquista.descricao}</div>
                    ${conquista.xpBonus ? `<div style="margin-top: 8px; font-weight: 700; color: #51CF66;">+${conquista.xpBonus} XP</div>` : ''}
                </div>
            `;

            container.appendChild(card);

            // Remover após 5 segundos
            setTimeout(() => {
                card.style.animation = 'slideOutRight 0.5s ease';
                setTimeout(() => card.remove(), 500);
            }, 5000);
        }, index * 300);
    });

    document.body.appendChild(container);

    // Remover container após todas as animações
    setTimeout(() => {
        container.remove();
    }, conquistas.length * 300 + 6000);
}

/**
 * Calcular XP ganho baseado no desempenho
 */
function calcularXPGanho(acertos, total, tempo) {
    const taxaAcerto = (acertos / total) * 100;
    let xp = 0;

    // XP base por questão
    xp += acertos * 10;

    // Bônus por taxa de acerto
    if (taxaAcerto === 100) {
        xp += 50; // Perfeito!
    } else if (taxaAcerto >= 90) {
        xp += 30;
    } else if (taxaAcerto >= 70) {
        xp += 15;
    }

    // Bônus por velocidade (se completou em menos de 2 minutos)
    if (tempo < 120) {
        xp += 20;
    }

    return Math.floor(xp);
}

/**
 * Atualizar UI de progresso
 */
function atualizarUIProgresso(dadosAluno) {
    // Atualizar pontos
    const pontosEl = document.getElementById('pontos');
    if (pontosEl) {
        pontosEl.textContent = dadosAluno.pontos || 0;
    }

    // Atualizar nível
    const nivelEl = document.getElementById('nivel');
    if (nivelEl) {
        nivelEl.textContent = dadosAluno.nivel || 1;
    }

    const nivelAtualEl = document.getElementById('nivelAtual');
    if (nivelAtualEl) {
        nivelAtualEl.textContent = dadosAluno.nivel || 1;
    }

    // Atualizar XP
    const xpAtual = dadosAluno.xp || 0;
    const nivel = dadosAluno.nivel || 1;
    const xpAtualNoNivel = utils.calcularXpAtualNoNivel(xpAtual);
    const xpProximo = utils.calcularXpProximoNivel(nivel);
    const xpAnterior = nivel === 1 ? 0 : utils.calcularXpProximoNivel(nivel - 1);
    const xpNecessario = xpProximo - xpAnterior;
    const progresso = utils.calcularProgressoNivel(xpAtual);

    const xpAtualEl = document.getElementById('xpAtual');
    if (xpAtualEl) {
        xpAtualEl.textContent = xpAtualNoNivel;
    }

    const xpProximoEl = document.getElementById('xpProximo');
    if (xpProximoEl) {
        xpProximoEl.textContent = xpNecessario;
    }

    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = `${progresso}%`;
    }

    // Atualizar vidas
    const vidasEl = document.getElementById('vidas');
    if (vidasEl) {
        vidasEl.textContent = dadosAluno.vidas || 3;
    }
}

/**
 * Verificar e resetar vidas diariamente
 */
async function verificarVidasDiarias(userId) {
    try {
        const ultimaRecarga = utils.obterLocal(`ultima-recarga-${userId}`);
        const hoje = new Date().toDateString();

        if (ultimaRecarga !== hoje) {
            // Resetar vidas para 3
            await atualizarDadosAluno(userId, { vidas: 3 });
            utils.salvarLocal(`ultima-recarga-${userId}`, hoje);
            return 3;
        }

        const dadosAluno = await obterDadosAluno(userId);
        return dadosAluno.vidas || 3;
    } catch (error) {
        console.error('Erro ao verificar vidas:', error);
        return 3;
    }
}

/**
 * Usar uma vida
 */
async function usarVida(userId) {
    try {
        const dadosAluno = await obterDadosAluno(userId);
        const vidasAtuais = dadosAluno.vidas || 3;

        if (vidasAtuais > 0) {
            await atualizarDadosAluno(userId, {
                vidas: vidasAtuais - 1
            });
            return vidasAtuais - 1;
        }

        return 0;
    } catch (error) {
        console.error('Erro ao usar vida:', error);
        return 0;
    }
}

/**
 * Sistema de Dificuldade Adaptativa
 * Ajusta a dificuldade das questões baseado no desempenho do aluno
 */
const DificuldadeAdaptativa = {
    /**
     * Determinar nível adaptativo baseado no desempenho recente
     */
    determinarNivelAdaptativo(dadosAluno) {
        const historico = JSON.parse(localStorage.getItem('historicoAtividades') || '[]');

        // Pegar últimas 5 atividades
        const ultimasAtividades = historico.slice(-5);

        if (ultimasAtividades.length === 0) {
            return dadosAluno.nivel || 1;
        }

        // Calcular média de acertos das últimas atividades
        let totalAcertos = 0;
        let totalQuestoes = 0;

        ultimasAtividades.forEach(atividade => {
            totalAcertos += atividade.acertos || 0;
            totalQuestoes += (atividade.acertos + atividade.erros) || 10;
        });

        const taxaAcertoRecente = (totalAcertos / totalQuestoes) * 100;
        const nivelAtual = dadosAluno.nivel || 1;

        // Lógica adaptativa
        if (taxaAcertoRecente >= 90) {
            // Desempenho excelente - aumentar dificuldade
            return Math.min(nivelAtual + 1, 10);
        } else if (taxaAcertoRecente >= 70) {
            // Bom desempenho - manter nível
            return nivelAtual;
        } else if (taxaAcertoRecente >= 50) {
            // Desempenho médio - leve redução
            return Math.max(nivelAtual - 1, 1);
        } else {
            // Dificuldade alta - reduzir significativamente
            return Math.max(Math.floor(nivelAtual * 0.7), 1);
        }
    },

    /**
     * Obter recomendação personalizada de estudo
     */
    obterRecomendacao(dadosAluno) {
        const historico = JSON.parse(localStorage.getItem('historicoAtividades') || '[]');

        // Analisar desempenho por ilha
        const desempenhoPorIlha = {
            'operacoes-basicas': { acertos: 0, total: 0 },
            'senso-numerico': { acertos: 0, total: 0 },
            'problemas': { acertos: 0, total: 0 },
            'geometria': { acertos: 0, total: 0 }
        };

        historico.forEach(atividade => {
            if (desempenhoPorIlha[atividade.ilha]) {
                desempenhoPorIlha[atividade.ilha].acertos += atividade.acertos || 0;
                desempenhoPorIlha[atividade.ilha].total += (atividade.acertos + atividade.erros) || 10;
            }
        });

        // Encontrar ilha com menor desempenho
        let ilhaMaisDesafiadora = null;
        let menorTaxa = 100;

        Object.keys(desempenhoPorIlha).forEach(ilha => {
            const dados = desempenhoPorIlha[ilha];
            if (dados.total > 0) {
                const taxa = (dados.acertos / dados.total) * 100;
                if (taxa < menorTaxa) {
                    menorTaxa = taxa;
                    ilhaMaisDesafiadora = ilha;
                }
            }
        });

        const nomesIlhas = {
            'operacoes-basicas': 'Ilha das Operações',
            'senso-numerico': 'Ilha dos Números',
            'problemas': 'Ilha dos Desafios',
            'geometria': 'Ilha das Formas'
        };

        if (ilhaMaisDesafiadora && menorTaxa < 70) {
            return {
                ilha: ilhaMaisDesafiadora,
                mensagem: `Que tal praticar mais na ${nomesIlhas[ilhaMaisDesafiadora]}? Você pode melhorar ainda mais! 💪`,
                tipo: 'desafio'
            };
        } else if (dadosAluno.taxaAcerto >= 90) {
            return {
                ilha: ilhaMaisDesafiadora || 'problemas',
                mensagem: 'Você está indo muito bem! Que tal tentar desafios mais difíceis? 🏆',
                tipo: 'progresso'
            };
        } else {
            return {
                ilha: 'operacoes-basicas',
                mensagem: 'Continue praticando! Você está no caminho certo! 🌟',
                tipo: 'incentivo'
            };
        }
    },

    /**
     * Calcular estatísticas detalhadas de progresso
     */
    calcularEstatisticasDetalhadas(dadosAluno) {
        const historico = JSON.parse(localStorage.getItem('historicoAtividades') || '[]');

        const stats = {
            totalAtividades: historico.length,
            totalAcertos: 0,
            totalErros: 0,
            taxaAcertoGeral: 0,
            tempoMedio: 0,
            atividadesPerfeitas: 0,
            melhorSequencia: 0,
            sequenciaAtual: 0,
            diasConsecutivos: this.calcularDiasConsecutivos(historico),
            ilhasVisitadas: new Set(historico.map(a => a.ilha)).size,
            desempenhoPorDia: this.calcularDesempenhoPorDia(historico),
            progressoSemanal: this.calcularProgressoSemanal(historico),
            conquistas: dadosAluno.conquistas?.length || 0
        };

        let sequenciaTemp = 0;

        historico.forEach(atividade => {
            stats.totalAcertos += atividade.acertos || 0;
            stats.totalErros += atividade.erros || 0;
            stats.tempoMedio += atividade.tempo || 0;

            if (atividade.estrelas === 3) {
                stats.atividadesPerfeitas++;
                sequenciaTemp++;
                stats.melhorSequencia = Math.max(stats.melhorSequencia, sequenciaTemp);
            } else {
                sequenciaTemp = 0;
            }
        });

        stats.sequenciaAtual = sequenciaTemp;
        stats.tempoMedio = historico.length > 0 ? Math.floor(stats.tempoMedio / historico.length) : 0;
        stats.taxaAcertoGeral = (stats.totalAcertos + stats.totalErros) > 0
            ? Math.floor((stats.totalAcertos / (stats.totalAcertos + stats.totalErros)) * 100)
            : 0;

        return stats;
    },

    /**
     * Calcular dias consecutivos de atividades
     */
    calcularDiasConsecutivos(historico) {
        if (historico.length === 0) return 0;

        const datasUnicas = [...new Set(historico.map(a => {
            const data = new Date(a.data);
            return data.toDateString();
        }))].sort();

        let consecutivos = 1;
        let maxConsecutivos = 1;

        for (let i = 1; i < datasUnicas.length; i++) {
            const dataAtual = new Date(datasUnicas[i]);
            const dataAnterior = new Date(datasUnicas[i - 1]);
            const diferenca = (dataAtual - dataAnterior) / (1000 * 60 * 60 * 24);

            if (diferenca === 1) {
                consecutivos++;
                maxConsecutivos = Math.max(maxConsecutivos, consecutivos);
            } else {
                consecutivos = 1;
            }
        }

        return maxConsecutivos;
    },

    /**
     * Calcular desempenho por dia da semana
     */
    calcularDesempenhoPorDia(historico) {
        const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        const desempenho = {};

        diasSemana.forEach(dia => {
            desempenho[dia] = { atividades: 0, acertos: 0, total: 0 };
        });

        historico.forEach(atividade => {
            const data = new Date(atividade.data);
            const dia = diasSemana[data.getDay()];

            desempenho[dia].atividades++;
            desempenho[dia].acertos += atividade.acertos || 0;
            desempenho[dia].total += (atividade.acertos + atividade.erros) || 10;
        });

        return desempenho;
    },

    /**
     * Calcular progresso semanal
     */
    calcularProgressoSemanal(historico) {
        const hoje = new Date();
        const umaSemanaAtras = new Date(hoje.getTime() - 7 * 24 * 60 * 60 * 1000);
        const duasSemanasAtras = new Date(hoje.getTime() - 14 * 24 * 60 * 60 * 1000);

        const semanaAtual = historico.filter(a => new Date(a.data) >= umaSemanaAtras);
        const semanaPassada = historico.filter(a => {
            const data = new Date(a.data);
            return data >= duasSemanasAtras && data < umaSemanaAtras;
        });

        const calcularTaxa = (atividades) => {
            if (atividades.length === 0) return 0;
            const totalAcertos = atividades.reduce((sum, a) => sum + (a.acertos || 0), 0);
            const totalQuestoes = atividades.reduce((sum, a) => sum + (a.acertos + a.erros || 10), 0);
            return totalQuestoes > 0 ? (totalAcertos / totalQuestoes) * 100 : 0;
        };

        return {
            atividadesSemanaAtual: semanaAtual.length,
            atividadesSemanaPassada: semanaPassada.length,
            taxaSemanaAtual: calcularTaxa(semanaAtual),
            taxaSemanaPassada: calcularTaxa(semanaPassada),
            melhoria: calcularTaxa(semanaAtual) - calcularTaxa(semanaPassada)
        };
    }
};

// Exportar funções
window.gamificacao = {
    CONQUISTAS,
    adicionarXP,
    verificarConquistas,
    calcularXPGanho,
    atualizarUIProgresso,
    verificarVidasDiarias,
    usarVida,
    DificuldadeAdaptativa
};
