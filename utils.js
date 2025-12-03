// ============================================
// FUNÇÕES UTILITÁRIAS
// ============================================

/**
 * Formatar data
 */
function formatarData(timestamp) {
    if (!timestamp) return '';

    const data = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    const hora = data.getHours().toString().padStart(2, '0');
    const minuto = data.getMinutes().toString().padStart(2, '0');

    return `${dia}/${mes}/${ano} às ${hora}:${minuto}`;
}

/**
 * Formatar tempo em segundos para formato legível
 */
function formatarTempo(segundos) {
    if (segundos < 60) {
        return `${segundos}s`;
    }

    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;

    if (minutos < 60) {
        return `${minutos}min ${segs}s`;
    }

    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return `${horas}h ${mins}min`;
}

/**
 * Calcular nível baseado em XP
 */
function calcularNivel(xp) {
    // Sistema de progressão: 100 XP para nível 2, aumenta 50 a cada nível
    // Nível 1: 0-99 XP
    // Nível 2: 100-249 XP
    // Nível 3: 250-449 XP
    // etc.

    if (xp < 100) return 1;

    let nivel = 1;
    let xpNecessario = 0;
    let incremento = 100;

    while (xp >= xpNecessario + incremento) {
        xpNecessario += incremento;
        incremento += 50;
        nivel++;
    }

    return nivel;
}

/**
 * Calcular XP necessário para próximo nível
 */
function calcularXpProximoNivel(nivelAtual) {
    if (nivelAtual === 1) return 100;

    let xpTotal = 0;
    let incremento = 100;

    for (let i = 1; i < nivelAtual; i++) {
        xpTotal += incremento;
        incremento += 50;
    }

    return xpTotal + incremento;
}

/**
 * Calcular XP atual no nível
 */
function calcularXpAtualNoNivel(xpTotal) {
    const nivel = calcularNivel(xpTotal);
    const xpNivelAnterior = nivel === 1 ? 0 : calcularXpProximoNivel(nivel - 1);
    return xpTotal - xpNivelAnterior;
}

/**
 * Calcular porcentagem de progresso no nível
 */
function calcularProgressoNivel(xpTotal) {
    const nivel = calcularNivel(xpTotal);
    const xpAtual = calcularXpAtualNoNivel(xpTotal);
    const xpProximo = calcularXpProximoNivel(nivel);
    const xpAnterior = nivel === 1 ? 0 : calcularXpProximoNivel(nivel - 1);
    const xpNecessario = xpProximo - xpAnterior;

    return Math.floor((xpAtual / xpNecessario) * 100);
}

/**
 * Calcular número de estrelas baseado na taxa de acerto
 */
function calcularEstrelas(taxaAcerto) {
    if (taxaAcerto >= 90) return 3;
    if (taxaAcerto >= 70) return 2;
    if (taxaAcerto >= 50) return 1;
    return 0;
}

/**
 * Obter emoji de estrelas
 */
function obterEmojEstrelas(quantidade) {
    const estrela = '⭐';
    const estrelaVazia = '☆';
    let resultado = '';

    for (let i = 0; i < 3; i++) {
        resultado += i < quantidade ? estrela : estrelaVazia;
    }

    return resultado;
}

/**
 * Randomizar array (Fisher-Yates shuffle)
 */
function embaralharArray(array) {
    const novoArray = [...array];
    for (let i = novoArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
    }
    return novoArray;
}

/**
 * Gerar número aleatório entre min e max (inclusivo)
 */
function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Animar contagem de números
 */
function animarContagem(elemento, valorFinal, duracao = 1000) {
    const valorInicial = parseInt(elemento.textContent) || 0;
    const diferenca = valorFinal - valorInicial;
    const incremento = diferenca / (duracao / 16); // 60 FPS
    let valorAtual = valorInicial;

    const intervalo = setInterval(() => {
        valorAtual += incremento;

        if ((incremento > 0 && valorAtual >= valorFinal) ||
            (incremento < 0 && valorAtual <= valorFinal)) {
            elemento.textContent = Math.round(valorFinal);
            clearInterval(intervalo);
        } else {
            elemento.textContent = Math.round(valorAtual);
        }
    }, 16);
}

/**
 * Criar confete (celebração)
 */
function criarConfete() {
    // Implementação simples de confete
    const cores = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#51CF66', '#FFA94D'];
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(container);

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confete = document.createElement('div');
            confete.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${cores[Math.floor(Math.random() * cores.length)]};
                top: -10px;
                left: ${Math.random() * 100}%;
                opacity: 1;
                transform: rotate(${Math.random() * 360}deg);
            `;

            container.appendChild(confete);

            // Animar queda
            const animacao = confete.animate([
                { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
                { transform: `translateY(${window.innerHeight + 10}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: 2000 + Math.random() * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });

            animacao.onfinish = () => confete.remove();
        }, i * 30);
    }

    // Remover container após animações
    setTimeout(() => container.remove(), 4000);
}

/**
 * Tocar som (feedback auditivo)
 */
function tocarSom(tipo) {
    // Tipos: 'acerto', 'erro', 'conquista', 'nivel-up'
    // Implementação básica usando AudioContext (pode ser melhorado com arquivos de áudio)

    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Configurar som baseado no tipo
        switch (tipo) {
            case 'acerto':
                oscillator.frequency.value = 800;
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                oscillator.stop(audioContext.currentTime + 0.2);
                break;

            case 'erro':
                oscillator.frequency.value = 200;
                oscillator.type = 'sawtooth';
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                oscillator.stop(audioContext.currentTime + 0.3);
                break;

            case 'conquista':
                oscillator.frequency.value = 523.25; // C5
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                oscillator.stop(audioContext.currentTime + 0.5);
                break;

            case 'nivel-up':
                oscillator.frequency.value = 659.25; // E5
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
                oscillator.stop(audioContext.currentTime + 0.8);
                break;
        }

        oscillator.start(audioContext.currentTime);
    } catch (error) {
        console.log('Áudio não suportado:', error);
    }
}

/**
 * Salvar no localStorage
 */
function salvarLocal(chave, valor) {
    try {
        localStorage.setItem(chave, JSON.stringify(valor));
    } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
    }
}

/**
 * Obter do localStorage
 */
function obterLocal(chave, padrao = null) {
    try {
        const item = localStorage.getItem(chave);
        return item ? JSON.parse(item) : padrao;
    } catch (error) {
        console.error('Erro ao obter do localStorage:', error);
        return padrao;
    }
}

/**
 * Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Exportar funções
window.utils = {
    formatarData,
    formatarTempo,
    calcularNivel,
    calcularXpProximoNivel,
    calcularXpAtualNoNivel,
    calcularProgressoNivel,
    calcularEstrelas,
    obterEmojEstrelas,
    embaralharArray,
    numeroAleatorio,
    animarContagem,
    criarConfete,
    tocarSom,
    salvarLocal,
    obterLocal,
    debounce
};
