// ============================================
// SISTEMA DE ATIVIDADES (SEM LOGIN)
// ============================================

let ilhaAtual = null;
let questoes = [];
let questaoAtualIndex = 0;
let acertos = 0;
let erros = 0;
let streak = 0;
let tempoInicio = null;
let respostasUsuario = [];
let dadosAluno = null;

document.addEventListener('DOMContentLoaded', function() {
    inicializarPaginaAtividades();
});

/**
 * Inicializar página de atividades
 */
function inicializarPaginaAtividades() {
    // Verificar se tem nome salvo
    const nomeAluno = localStorage.getItem('nomeAluno');

    if (!nomeAluno) {
        window.location.href = 'index.html';
        return;
    }

    // Carregar dados do aluno
    const dadosSalvos = localStorage.getItem('dadosAluno');
    dadosAluno = dadosSalvos ? JSON.parse(dadosSalvos) : criarDadosIniciais();

    // Obter ilha atual
    ilhaAtual = localStorage.getItem('ilha-atual') || 'operacoes-basicas';

    // Atualizar nome da ilha
    atualizarNomeIlha();

    // Atualizar UI
    document.getElementById('pontos').textContent = dadosAluno.pontos || 0;
    document.getElementById('vidas').textContent = dadosAluno.vidas || 3;

    // Determinar nível adaptativo baseado no desempenho
    let nivelAdaptativo = dadosAluno.nivel;
    if (window.gamificacao && window.gamificacao.DificuldadeAdaptativa) {
        nivelAdaptativo = gamificacao.DificuldadeAdaptativa.determinarNivelAdaptativo(dadosAluno);

        // Mostrar feedback se o nível foi ajustado
        if (nivelAdaptativo > dadosAluno.nivel) {
            console.log('🚀 Nível aumentado! Você está indo muito bem!');
        } else if (nivelAdaptativo < dadosAluno.nivel) {
            console.log('💪 Vamos praticar um pouco mais neste nível!');
        }
    }

    // Gerar questões com nível adaptativo
    if (window.questoesDB) {
        questoes = questoesDB.gerarQuestoes(ilhaAtual, nivelAdaptativo, 10);
    }

    if (questoes.length === 0) {
        alert('Não há atividades disponíveis para esta ilha no momento.');
        window.location.href = 'home.html';
        return;
    }

    // Mostrar primeira questão
    mostrarQuestao();

    // Configurar event listeners
    configurarEventListeners();

    // Iniciar timer
    tempoInicio = Date.now();
}

/**
 * Criar dados iniciais
 */
function criarDadosIniciais() {
    return {
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
}

/**
 * Atualizar nome da ilha no header
 */
function atualizarNomeIlha() {
    const nomesIlhas = {
        'operacoes-basicas': '➕ Ilha das Operações',
        'senso-numerico': '🔢 Ilha dos Números',
        'problemas': '🧩 Ilha dos Desafios',
        'geometria': '📐 Ilha das Formas',
        'jogos-livres': '🎮 Parque de Diversões'
    };

    document.getElementById('islandName').textContent = nomesIlhas[ilhaAtual] || 'Atividades';
}

/**
 * Configurar event listeners
 */
function configurarEventListeners() {
    // Botão de confirmar resposta (para tipo input)
    const btnConfirmar = document.getElementById('btnConfirmar');
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', verificarRespostaInput);
    }

    // Enter no input
    const inputResposta = document.getElementById('inputResposta');
    if (inputResposta) {
        inputResposta.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                verificarRespostaInput();
            }
        });
    }

    // Botão próxima questão
    document.getElementById('btnProximo').addEventListener('click', proximaQuestao);

    // Botão de dica
    document.getElementById('btnDica').addEventListener('click', mostrarDica);

    // Fechar modal de dica
    const closeModal = document.querySelector('#dicaModal .close');
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            document.getElementById('dicaModal').classList.remove('active');
            document.getElementById('dicaModal').style.display = 'none';
        });
    }

    document.getElementById('btnFecharDica').addEventListener('click', () => {
        document.getElementById('dicaModal').classList.remove('active');
        document.getElementById('dicaModal').style.display = 'none';
    });

    // Botões da tela de resultado
    document.getElementById('btnRefazer').addEventListener('click', refazerAtividade);
    document.getElementById('btnVoltarIlhas').addEventListener('click', () => {
        window.location.href = 'home.html';
    });
}

/**
 * Mostrar questão atual
 */
function mostrarQuestao() {
    const questao = questoes[questaoAtualIndex];

    // Ocultar tela de seleção e resultado
    document.getElementById('selecaoAtividades').classList.add('hidden');
    document.getElementById('resultadoScreen').classList.add('hidden');
    document.getElementById('atividadeScreen').classList.remove('hidden');
    document.getElementById('feedbackContainer').classList.add('hidden');

    // Atualizar progresso
    document.getElementById('questaoAtual').textContent = questaoAtualIndex + 1;
    document.getElementById('totalQuestoes').textContent = questoes.length;
    document.getElementById('streakCount').textContent = streak;

    // Mostrar enunciado
    document.getElementById('questaoTexto').textContent = questao.enunciado;

    // Mostrar visualização (se houver)
    const visualContainer = document.getElementById('questaoVisual');
    visualContainer.innerHTML = '';

    if (questao.visualizacao && questao.visualizacao.length > 0) {
        questao.visualizacao.forEach(item => {
            const span = document.createElement('span');
            span.className = 'objeto-visual';
            span.textContent = item;
            visualContainer.appendChild(span);
        });
    }

    if (questao.pergunta) {
        const pergunta = document.createElement('div');
        pergunta.style.fontSize = '2rem';
        pergunta.style.fontWeight = '700';
        pergunta.style.marginTop = '16px';
        pergunta.textContent = questao.pergunta;
        visualContainer.appendChild(pergunta);
    }

    // Mostrar opções ou input
    const opcoesContainer = document.getElementById('opcoesResposta');
    const inputContainer = document.getElementById('respostaInput');

    if (questao.tipo === 'multipla-escolha') {
        opcoesContainer.classList.remove('hidden');
        inputContainer.classList.add('hidden');

        // Criar botões de opções
        opcoesContainer.innerHTML = '';
        questao.opcoes.forEach(opcao => {
            const btn = document.createElement('button');
            btn.className = 'opcao-btn';
            btn.textContent = opcao;
            btn.addEventListener('click', () => verificarResposta(opcao));
            opcoesContainer.appendChild(btn);
        });
    } else {
        opcoesContainer.classList.add('hidden');
        inputContainer.classList.remove('hidden');
        document.getElementById('inputResposta').value = '';
        document.getElementById('inputResposta').focus();
    }
}

/**
 * Verificar resposta (múltipla escolha)
 */
function verificarResposta(respostaUsuario) {
    const questao = questoes[questaoAtualIndex];
    const correto = window.questoesDB ? questoesDB.validarResposta(questao, respostaUsuario) : (respostaUsuario === questao.resposta);

    // Salvar resposta
    respostasUsuario.push({
        questao: questao.id,
        resposta: respostaUsuario,
        correto: correto
    });

    // Atualizar estatísticas
    if (correto) {
        acertos++;
        streak++;
        if (window.utils) utils.tocarSom('acerto');
    } else {
        erros++;
        streak = 0;
        if (window.utils) utils.tocarSom('erro');
    }

    // Desabilitar botões
    document.querySelectorAll('.opcao-btn').forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === questao.resposta) {
            btn.classList.add('correta');
        } else if (btn.textContent === respostaUsuario && !correto) {
            btn.classList.add('incorreta');
        }
    });

    // Mostrar feedback após delay
    setTimeout(() => {
        mostrarFeedback(correto);
    }, 1000);
}

/**
 * Verificar resposta (input)
 */
function verificarRespostaInput() {
    const inputResposta = document.getElementById('inputResposta');
    const respostaUsuario = inputResposta.value.trim();

    if (!respostaUsuario) {
        alert('Por favor, digite uma resposta!');
        return;
    }

    const questao = questoes[questaoAtualIndex];
    const correto = window.questoesDB ? questoesDB.validarResposta(questao, respostaUsuario) : (parseInt(respostaUsuario) === parseInt(questao.resposta));

    // Salvar resposta
    respostasUsuario.push({
        questao: questao.id,
        resposta: respostaUsuario,
        correto: correto
    });

    // Atualizar estatísticas
    if (correto) {
        acertos++;
        streak++;
        if (window.utils) utils.tocarSom('acerto');
        inputResposta.style.borderColor = 'var(--success-color)';
    } else {
        erros++;
        streak = 0;
        if (window.utils) utils.tocarSom('erro');
        inputResposta.style.borderColor = 'var(--error-color)';
    }

    // Desabilitar input
    inputResposta.disabled = true;
    document.getElementById('btnConfirmar').disabled = true;

    // Mostrar feedback
    setTimeout(() => {
        mostrarFeedback(correto);
    }, 1000);
}

/**
 * Mostrar feedback da resposta
 */
function mostrarFeedback(correto) {
    const questao = questoes[questaoAtualIndex];
    const feedback = window.questoesDB ? questoesDB.obterFeedback(correto, streak) : {
        icone: correto ? '🎉' : '💪',
        titulo: correto ? 'Muito bem!' : 'Quase lá!',
        mensagem: correto ? 'Resposta correta!' : 'Tente novamente!'
    };

    // Atualizar conteúdo do feedback
    document.getElementById('feedbackIcon').textContent = feedback.icone;
    document.getElementById('feedbackTitulo').textContent = feedback.titulo;
    document.getElementById('feedbackMensagem').textContent = feedback.mensagem;

    // Mostrar explicação se errou
    if (!correto && questao.explicacao) {
        document.getElementById('feedbackMensagem').textContent += '\n\n' + questao.explicacao;
    }

    // XP ganho
    const xpGanho = correto ? 10 : 0;
    document.getElementById('feedbackPontos').textContent = correto ? `+${xpGanho} XP` : '0 XP';

    // Mostrar container de feedback
    document.getElementById('feedbackContainer').classList.remove('hidden');
}

/**
 * Próxima questão
 */
function proximaQuestao() {
    questaoAtualIndex++;

    if (questaoAtualIndex < questoes.length) {
        mostrarQuestao();
    } else {
        finalizarAtividade();
    }
}

/**
 * Finalizar atividade
 */
function finalizarAtividade() {
    const tempoTotal = Math.floor((Date.now() - tempoInicio) / 1000);
    const taxaAcerto = Math.floor((acertos / questoes.length) * 100);
    const estrelas = window.utils ? utils.calcularEstrelas(taxaAcerto) : (taxaAcerto >= 80 ? 3 : taxaAcerto >= 60 ? 2 : 1);
    const xpGanho = window.gamificacao ? gamificacao.calcularXPGanho(acertos, questoes.length, tempoTotal) : acertos * 10;
    const atividadePerfeita = taxaAcerto === 100;

    // Detectar horário da atividade
    const agora = new Date();
    const hora = agora.getHours();
    let horarioAtividade = 'dia';
    if (hora < 8) horarioAtividade = 'madrugada';
    else if (hora >= 22) horarioAtividade = 'noite';

    // Detectar fim de semana
    const diaSemana = agora.getDay();
    const ehFimDeSemana = (diaSemana === 0 || diaSemana === 6);

    // Atualizar dados do aluno
    dadosAluno.xp = (dadosAluno.xp || 0) + xpGanho;
    dadosAluno.pontos = (dadosAluno.pontos || 0) + xpGanho;
    dadosAluno.nivel = window.utils ? utils.calcularNivel(dadosAluno.xp) : Math.floor(dadosAluno.xp / 100) + 1;

    dadosAluno.estatisticas.totalAtividades = (dadosAluno.estatisticas.totalAtividades || 0) + 1;
    dadosAluno.estatisticas.totalAcertos = (dadosAluno.estatisticas.totalAcertos || 0) + acertos;
    dadosAluno.estatisticas.totalErros = (dadosAluno.estatisticas.totalErros || 0) + erros;
    dadosAluno.estatisticas.taxaAcerto = Math.floor((dadosAluno.estatisticas.totalAcertos / (dadosAluno.estatisticas.totalAcertos + dadosAluno.estatisticas.totalErros)) * 100);
    dadosAluno.estatisticas.tempoTotal = (dadosAluno.estatisticas.tempoTotal || 0) + tempoTotal;

    // Tracking de atividades perfeitas
    if (atividadePerfeita) {
        dadosAluno.estatisticas.atividadesPerfeitas = (dadosAluno.estatisticas.atividadesPerfeitas || 0) + 1;
    }

    // Tracking de fim de semana
    if (ehFimDeSemana) {
        dadosAluno.estatisticas.atividadesFimDeSemana = (dadosAluno.estatisticas.atividadesFimDeSemana || 0) + 1;
    }

    // Salvar dados
    localStorage.setItem('dadosAluno', JSON.stringify(dadosAluno));

    // Salvar no histórico
    const historico = JSON.parse(localStorage.getItem('historicoAtividades') || '[]');
    historico.push({
        ilha: ilhaAtual,
        questoes: respostasUsuario,
        acertos: acertos,
        erros: erros,
        estrelas: estrelas,
        xpGanho: xpGanho,
        tempo: tempoTotal,
        taxaAcerto: taxaAcerto,
        horarioAtividade: horarioAtividade,
        ehFimDeSemana: ehFimDeSemana,
        data: new Date().toISOString()
    });
    localStorage.setItem('historicoAtividades', JSON.stringify(historico));

    // Verificar conquistas
    let conquistasNovas = [];
    if (window.gamificacao) {
        const stats = {
            ...dadosAluno,
            ...dadosAluno.estatisticas,
            acertosSeguidos: streak,
            atividadePerfeita: atividadePerfeita,
            tempoAtividade: tempoTotal,
            horarioAtividade: horarioAtividade,
            atividadesFimDeSemana: dadosAluno.estatisticas.atividadesFimDeSemana || 0,
            ilhasVisitadas: new Set(historico.map(h => h.ilha)).size,
            diasConsecutivos: gamificacao.DificuldadeAdaptativa ? gamificacao.DificuldadeAdaptativa.calcularDiasConsecutivos(historico) : 0
        };
        // Note: gamificacao.verificarConquistas is async but we'll handle it synchronously here
    }

    // Mostrar tela de resultado
    mostrarResultado(acertos, erros, xpGanho, estrelas, conquistasNovas);
}

/**
 * Mostrar tela de resultado
 */
function mostrarResultado(acertos, erros, xpGanho, estrelas, conquistas) {
    // Ocultar tela de atividade
    document.getElementById('atividadeScreen').classList.add('hidden');

    // Mostrar tela de resultado
    const resultadoScreen = document.getElementById('resultadoScreen');
    resultadoScreen.classList.remove('hidden');

    // Ícone baseado no desempenho
    const taxaAcerto = (acertos / questoes.length) * 100;
    let icone = '🎉';
    let titulo = 'Parabéns!';

    if (taxaAcerto === 100) {
        icone = '🏆';
        titulo = 'Perfeito!';
        if (window.utils) utils.criarConfete();
    } else if (taxaAcerto >= 80) {
        icone = '⭐';
        titulo = 'Excelente!';
    } else if (taxaAcerto >= 60) {
        icone = '👍';
        titulo = 'Muito bem!';
    } else {
        icone = '💪';
        titulo = 'Continue tentando!';
    }

    document.getElementById('resultadoIcon').textContent = icone;
    document.getElementById('resultadoTitulo').textContent = titulo;

    // Estatísticas
    document.getElementById('acertosTotal').textContent = acertos;
    document.getElementById('errosTotal').textContent = erros;
    document.getElementById('xpGanho').textContent = `+${xpGanho}`;
    document.getElementById('estrelasGanhas').textContent = window.utils ? utils.obterEmojEstrelas(estrelas) : '⭐'.repeat(estrelas);

    // Animar contagem
    if (window.utils) {
        utils.animarContagem(document.getElementById('acertosTotal'), acertos);
        utils.animarContagem(document.getElementById('errosTotal'), erros);
        utils.animarContagem(document.getElementById('xpGanho'), xpGanho);
    }

    // Mostrar conquistas desbloqueadas
    const conquistasContainer = document.getElementById('conquistasDesbloqueadas');
    if (conquistas && conquistas.length > 0) {
        conquistasContainer.innerHTML = '<h4>🏆 Conquistas Desbloqueadas!</h4>';
        conquistas.forEach(conquista => {
            const div = document.createElement('div');
            div.style.cssText = 'display: inline-block; margin: 8px; padding: 12px 20px; background: white; border-radius: 12px; font-weight: 600;';
            div.textContent = `${conquista.icone} ${conquista.nome}`;
            conquistasContainer.appendChild(div);
        });
    } else {
        conquistasContainer.innerHTML = '';
    }
}

/**
 * Mostrar dica
 */
function mostrarDica() {
    const questao = questoes[questaoAtualIndex];

    if (questao.dica) {
        document.getElementById('dicaContent').textContent = questao.dica;
        document.getElementById('dicaModal').classList.add('active');
        document.getElementById('dicaModal').style.display = 'flex';
    } else {
        alert('Não há dica disponível para esta questão.');
    }
}

/**
 * Refazer atividade
 */
function refazerAtividade() {
    // Resetar variáveis
    questaoAtualIndex = 0;
    acertos = 0;
    erros = 0;
    streak = 0;
    respostasUsuario = [];

    // Determinar nível adaptativo
    let nivelAdaptativo = dadosAluno.nivel;
    if (window.gamificacao && window.gamificacao.DificuldadeAdaptativa) {
        nivelAdaptativo = gamificacao.DificuldadeAdaptativa.determinarNivelAdaptativo(dadosAluno);
    }

    // Gerar novas questões (embaralhadas) com nível adaptativo
    if (window.questoesDB) {
        questoes = questoesDB.gerarQuestoes(ilhaAtual, nivelAdaptativo, 10);
    }

    // Reiniciar
    tempoInicio = Date.now();
    mostrarQuestao();
}
