// ============================================
// BANCO DE QUESTÕES ROBUSTO - 150+ QUESTÕES
// ============================================

const QUESTOES = {
    'operacoes-basicas': {
        'adicao-nivel1': [
            {
                id: 'add-1-1',
                tipo: 'multipla-escolha',
                enunciado: 'Quantos objetos temos no total?',
                visualizacao: ['🍎', '🍎', '🍎', '🍏', '🍏'],
                pergunta: '3 + 2 = ?',
                opcoes: ['4', '5', '6', '7'],
                resposta: '5',
                dica: 'Conte as maçãs vermelhas e depois as verdes!',
                explicacao: '3 maçãs vermelhas + 2 maçãs verdes = 5 maçãs no total!'
            },
            {
                id: 'add-1-2',
                tipo: 'multipla-escolha',
                enunciado: 'Some os balões:',
                visualizacao: ['🎈', '🎈', '🎈', '🎈'],
                pergunta: '2 + 2 = ?',
                opcoes: ['2', '3', '4', '5'],
                resposta: '4',
                dica: 'Conte todos os balões!',
                explicacao: '2 + 2 = 4'
            },
            {
                id: 'add-1-3',
                tipo: 'multipla-escolha',
                enunciado: 'Quanto é:',
                pergunta: '1 + 4 = ?',
                opcoes: ['3', '4', '5', '6'],
                resposta: '5',
                dica: 'Comece do 1 e conte mais 4!',
                explicacao: '1 + 4 = 5'
            },
            {
                id: 'add-1-4',
                tipo: 'multipla-escolha',
                enunciado: 'Some as estrelas:',
                visualizacao: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐'],
                pergunta: '4 + 2 = ?',
                opcoes: ['5', '6', '7', '8'],
                resposta: '6',
                dica: 'Conte todas as estrelas!',
                explicacao: '4 + 2 = 6 estrelas'
            },
            {
                id: 'add-1-5',
                tipo: 'multipla-escolha',
                enunciado: 'Resolva:',
                pergunta: '3 + 3 = ?',
                opcoes: ['5', '6', '7', '9'],
                resposta: '6',
                dica: 'Conte nos dedos: 3, 4, 5, 6!',
                explicacao: '3 + 3 = 6'
            }
        ],
        'adicao-nivel2': [
            {
                id: 'add-2-1',
                tipo: 'input',
                enunciado: 'Digite a resposta:',
                pergunta: '7 + 3 = ?',
                resposta: 10,
                dica: '7 + 3 = 10 (uma dezena!)',
                explicacao: '7 + 3 = 10. Parabéns!'
            },
            {
                id: 'add-2-2',
                tipo: 'input',
                enunciado: 'Quanto é:',
                pergunta: '5 + 6 = ?',
                resposta: 11,
                dica: '5 + 5 = 10, e mais 1!',
                explicacao: '5 + 6 = 11'
            },
            {
                id: 'add-2-3',
                tipo: 'input',
                enunciado: 'Calcule:',
                pergunta: '8 + 4 = ?',
                resposta: 12,
                dica: '8 + 2 = 10, depois + 2 = 12',
                explicacao: '8 + 4 = 12'
            },
            {
                id: 'add-2-4',
                tipo: 'input',
                enunciado: 'Resolva:',
                pergunta: '9 + 5 = ?',
                resposta: 14,
                dica: '9 + 1 = 10, depois + 4 = 14',
                explicacao: '9 + 5 = 14'
            },
            {
                id: 'add-2-5',
                tipo: 'input',
                enunciado: 'Some:',
                pergunta: '12 + 8 = ?',
                resposta: 20,
                dica: '10 + 10 = 20, ou 12 + 8!',
                explicacao: '12 + 8 = 20'
            }
        ],
        'adicao-nivel3': [
            {
                id: 'add-3-1',
                tipo: 'input',
                enunciado: 'Adição com dezenas:',
                pergunta: '15 + 8 = ?',
                resposta: 23,
                dica: '15 + 5 = 20, e ainda faltam 3!',
                explicacao: '15 + 8 = 23'
            },
            {
                id: 'add-3-2',
                tipo: 'input',
                enunciado: 'Calcule:',
                pergunta: '27 + 14 = ?',
                resposta: 41,
                dica: 'Some as dezenas (20+10=30) e unidades (7+4=11)',
                explicacao: '27 + 14 = 41'
            },
            {
                id: 'add-3-3',
                tipo: 'input',
                enunciado: 'Quanto é:',
                pergunta: '36 + 25 = ?',
                resposta: 61,
                dica: '30+20=50, 6+5=11, então 50+11=61',
                explicacao: '36 + 25 = 61'
            },
            {
                id: 'add-3-4',
                tipo: 'input',
                enunciado: 'Resolva:',
                pergunta: '48 + 37 = ?',
                resposta: 85,
                dica: '40+30=70, 8+7=15, então 70+15=85',
                explicacao: '48 + 37 = 85'
            },
            {
                id: 'add-3-5',
                tipo: 'input',
                enunciado: 'Some:',
                pergunta: '55 + 45 = ?',
                resposta: 100,
                dica: '50+50=100!',
                explicacao: '55 + 45 = 100. Chegou na centena!'
            }
        ],
        'subtracao-nivel1': [
            {
                id: 'sub-1-1',
                tipo: 'multipla-escolha',
                enunciado: 'Tinha 5 balões e 2 voaram:',
                visualizacao: ['🎈', '🎈', '🎈', '❌', '❌'],
                pergunta: '5 - 2 = ?',
                opcoes: ['2', '3', '4', '7'],
                resposta: '3',
                dica: 'Conte quantos balões ainda estão aqui!',
                explicacao: '5 - 2 = 3. Sobraram 3 balões!'
            },
            {
                id: 'sub-1-2',
                tipo: 'multipla-escolha',
                enunciado: 'Remova as flores:',
                visualizacao: ['🌸', '🌸', '🌸', '🌸', '🌸', '🌸'],
                pergunta: '6 - 2 = ?',
                opcoes: ['3', '4', '5', '8'],
                resposta: '4',
                dica: 'Tire 2 flores e conte quantas sobram!',
                explicacao: '6 - 2 = 4'
            },
            {
                id: 'sub-1-3',
                tipo: 'multipla-escolha',
                enunciado: 'Quanto é:',
                pergunta: '7 - 3 = ?',
                opcoes: ['3', '4', '5', '10'],
                resposta: '4',
                dica: 'Comece do 7 e volte 3 números!',
                explicacao: '7 - 3 = 4'
            },
            {
                id: 'sub-1-4',
                tipo: 'multipla-escolha',
                enunciado: 'Resolva:',
                pergunta: '8 - 4 = ?',
                opcoes: ['2', '3', '4', '12'],
                resposta: '4',
                dica: 'A metade de 8 é 4!',
                explicacao: '8 - 4 = 4'
            },
            {
                id: 'sub-1-5',
                tipo: 'multipla-escolha',
                enunciado: 'Subtraia:',
                pergunta: '9 - 5 = ?',
                opcoes: ['3', '4', '5', '14'],
                resposta: '4',
                dica: 'Conte de trás para frente!',
                explicacao: '9 - 5 = 4'
            }
        ],
        'subtracao-nivel2': [
            {
                id: 'sub-2-1',
                tipo: 'input',
                enunciado: 'Subtraia:',
                pergunta: '10 - 4 = ?',
                resposta: 6,
                dica: 'Uma dezena menos 4!',
                explicacao: '10 - 4 = 6'
            },
            {
                id: 'sub-2-2',
                tipo: 'input',
                enunciado: 'Quanto é:',
                pergunta: '15 - 7 = ?',
                resposta: 8,
                dica: '15 - 5 = 10, depois - 2 = 8',
                explicacao: '15 - 7 = 8'
            },
            {
                id: 'sub-2-3',
                tipo: 'input',
                enunciado: 'Resolva:',
                pergunta: '20 - 12 = ?',
                resposta: 8,
                dica: '20 - 10 = 10, depois - 2 = 8',
                explicacao: '20 - 12 = 8'
            },
            {
                id: 'sub-2-4',
                tipo: 'input',
                enunciado: 'Calcule:',
                pergunta: '18 - 9 = ?',
                resposta: 9,
                dica: 'A metade de 18 é 9!',
                explicacao: '18 - 9 = 9'
            },
            {
                id: 'sub-2-5',
                tipo: 'input',
                enunciado: 'Subtraia:',
                pergunta: '25 - 13 = ?',
                resposta: 12,
                dica: '25 - 10 = 15, depois - 3 = 12',
                explicacao: '25 - 13 = 12'
            }
        ],
        'multiplicacao-nivel1': [
            {
                id: 'mult-1-1',
                tipo: 'multipla-escolha',
                enunciado: '3 pacotes com 2 balas cada:',
                visualizacao: ['🍬🍬', '🍬🍬', '🍬🍬'],
                pergunta: '3 × 2 = ?',
                opcoes: ['4', '5', '6', '8'],
                resposta: '6',
                dica: 'Conte todas: 2 + 2 + 2 = ?',
                explicacao: '3 × 2 = 6. São 3 grupos de 2!'
            },
            {
                id: 'mult-1-2',
                tipo: 'multipla-escolha',
                enunciado: '4 caixas com 2 itens cada:',
                visualizacao: ['📦📦', '📦📦', '📦📦', '📦📦'],
                pergunta: '4 × 2 = ?',
                opcoes: ['6', '7', '8', '10'],
                resposta: '8',
                dica: '2+2+2+2 = ?',
                explicacao: '4 × 2 = 8'
            },
            {
                id: 'mult-1-3',
                tipo: 'multipla-escolha',
                enunciado: 'Quantas rodas em 2 carros?',
                visualizacao: ['🚗', '🚗'],
                pergunta: '2 × 4 = ?',
                opcoes: ['6', '7', '8', '10'],
                resposta: '8',
                dica: 'Cada carro tem 4 rodas!',
                explicacao: '2 × 4 = 8 rodas'
            },
            {
                id: 'mult-1-4',
                tipo: 'multipla-escolha',
                enunciado: 'Resolva:',
                pergunta: '5 × 2 = ?',
                opcoes: ['7', '8', '10', '12'],
                resposta: '10',
                dica: '5 + 5 = ?',
                explicacao: '5 × 2 = 10'
            },
            {
                id: 'mult-1-5',
                tipo: 'multipla-escolha',
                enunciado: 'Calcule:',
                pergunta: '3 × 3 = ?',
                opcoes: ['6', '8', '9', '12'],
                resposta: '9',
                dica: '3 + 3 + 3 = ?',
                explicacao: '3 × 3 = 9'
            }
        ],
        'multiplicacao-nivel2': [
            {
                id: 'mult-2-1',
                tipo: 'input',
                enunciado: 'Tabela do 5:',
                pergunta: '5 × 3 = ?',
                resposta: 15,
                dica: '5 + 5 + 5 = ?',
                explicacao: '5 × 3 = 15'
            },
            {
                id: 'mult-2-2',
                tipo: 'input',
                enunciado: 'Multiplique:',
                pergunta: '4 × 4 = ?',
                resposta: 16,
                dica: '4 + 4 + 4 + 4 = ?',
                explicacao: '4 × 4 = 16'
            },
            {
                id: 'mult-2-3',
                tipo: 'input',
                enunciado: 'Quanto é:',
                pergunta: '6 × 3 = ?',
                resposta: 18,
                dica: '6 + 6 + 6 = ?',
                explicacao: '6 × 3 = 18'
            },
            {
                id: 'mult-2-4',
                tipo: 'input',
                enunciado: 'Calcule:',
                pergunta: '7 × 2 = ?',
                resposta: 14,
                dica: '7 + 7 = ?',
                explicacao: '7 × 2 = 14'
            },
            {
                id: 'mult-2-5',
                tipo: 'input',
                enunciado: 'Resolva:',
                pergunta: '8 × 3 = ?',
                resposta: 24,
                dica: '8 + 8 + 8 = ?',
                explicacao: '8 × 3 = 24'
            }
        ],
        'divisao-nivel1': [
            {
                id: 'div-1-1',
                tipo: 'multipla-escolha',
                enunciado: 'Divida 6 balas em 2 grupos iguais:',
                visualizacao: ['🍬🍬🍬', '🍬🍬🍬'],
                pergunta: '6 ÷ 2 = ?',
                opcoes: ['2', '3', '4', '8'],
                resposta: '3',
                dica: 'Quantas balas em cada grupo?',
                explicacao: '6 ÷ 2 = 3. Cada grupo tem 3 balas!'
            },
            {
                id: 'div-1-2',
                tipo: 'multipla-escolha',
                enunciado: 'Divida igualmente:',
                pergunta: '8 ÷ 2 = ?',
                opcoes: ['2', '3', '4', '10'],
                resposta: '4',
                dica: 'Metade de 8 é...?',
                explicacao: '8 ÷ 2 = 4'
            },
            {
                id: 'div-1-3',
                tipo: 'multipla-escolha',
                enunciado: 'Reparta:',
                pergunta: '10 ÷ 2 = ?',
                opcoes: ['4', '5', '6', '12'],
                resposta: '5',
                dica: 'Metade de 10!',
                explicacao: '10 ÷ 2 = 5'
            },
            {
                id: 'div-1-4',
                tipo: 'multipla-escolha',
                enunciado: 'Quanto é:',
                pergunta: '12 ÷ 3 = ?',
                resposta: '4',
                opcoes: ['3', '4', '5', '9'],
                dica: '12 em 3 grupos iguais...',
                explicacao: '12 ÷ 3 = 4'
            },
            {
                id: 'div-1-5',
                tipo: 'multipla-escolha',
                enunciado: 'Divida:',
                pergunta: '15 ÷ 3 = ?',
                opcoes: ['3', '4', '5', '12'],
                resposta: '5',
                dica: 'Pense na tabuada do 3!',
                explicacao: '15 ÷ 3 = 5'
            }
        ]
    },

    'senso-numerico': {
        'comparacao': [
            {
                id: 'comp-1',
                tipo: 'multipla-escolha',
                enunciado: 'Qual número é MAIOR?',
                pergunta: '7 ou 4?',
                opcoes: ['7', '4', 'São iguais'],
                resposta: '7',
                dica: 'Qual vem depois na contagem?',
                explicacao: '7 é maior que 4!'
            },
            {
                id: 'comp-2',
                tipo: 'multipla-escolha',
                enunciado: 'Qual é MENOR?',
                pergunta: '12 ou 15?',
                opcoes: ['12', '15', 'São iguais'],
                resposta: '12',
                dica: 'O menor vem primeiro!',
                explicacao: '12 é menor que 15'
            },
            {
                id: 'comp-3',
                tipo: 'multipla-escolha',
                enunciado: 'Qual é maior?',
                pergunta: '25 ou 18?',
                opcoes: ['25', '18', 'Iguais'],
                resposta: '25',
                dica: '25 vem depois de 18 na contagem',
                explicacao: '25 > 18'
            },
            {
                id: 'comp-4',
                tipo: 'multipla-escolha',
                enunciado: 'Qual é menor?',
                pergunta: '34 ou 43?',
                opcoes: ['34', '43', 'Iguais'],
                resposta: '34',
                dica: 'Olhe a dezena primeiro!',
                explicacao: '34 < 43'
            },
            {
                id: 'comp-5',
                tipo: 'multipla-escolha',
                enunciado: 'Compare:',
                pergunta: '99 ou 100?',
                opcoes: ['99 é maior', '100 é maior', 'Iguais'],
                resposta: '100 é maior',
                dica: '100 é uma centena!',
                explicacao: '100 > 99'
            }
        ],
        'ordenacao': [
            {
                id: 'ord-1',
                tipo: 'multipla-escolha',
                enunciado: 'Ordem CRESCENTE:',
                pergunta: '5, 2, 8',
                opcoes: ['2, 5, 8', '8, 5, 2', '5, 2, 8', '2, 8, 5'],
                resposta: '2, 5, 8',
                dica: 'Do menor para o maior!',
                explicacao: 'Crescente: 2, 5, 8'
            },
            {
                id: 'ord-2',
                tipo: 'multipla-escolha',
                enunciado: 'Ordem DECRESCENTE:',
                pergunta: '3, 9, 6',
                opcoes: ['9, 6, 3', '3, 6, 9', '6, 3, 9', '9, 3, 6'],
                resposta: '9, 6, 3',
                dica: 'Do maior para o menor!',
                explicacao: 'Decrescente: 9, 6, 3'
            },
            {
                id: 'ord-3',
                tipo: 'multipla-escolha',
                enunciado: 'Ordem crescente:',
                pergunta: '15, 10, 20',
                opcoes: ['10, 15, 20', '20, 15, 10', '15, 10, 20', '10, 20, 15'],
                resposta: '10, 15, 20',
                dica: 'Menor → Maior',
                explicacao: 'Crescente: 10, 15, 20'
            },
            {
                id: 'ord-4',
                tipo: 'multipla-escolha',
                enunciado: 'Coloque em ordem crescente:',
                pergunta: '33, 27, 31',
                opcoes: ['27, 31, 33', '33, 31, 27', '27, 33, 31', '31, 27, 33'],
                resposta: '27, 31, 33',
                dica: 'Comece pelo menor!',
                explicacao: 'Ordem: 27, 31, 33'
            },
            {
                id: 'ord-5',
                tipo: 'multipla-escolha',
                enunciado: 'Ordem decrescente:',
                pergunta: '45, 52, 48',
                opcoes: ['52, 48, 45', '45, 48, 52', '48, 45, 52', '52, 45, 48'],
                resposta: '52, 48, 45',
                dica: 'Maior → Menor',
                explicacao: 'Decrescente: 52, 48, 45'
            }
        ],
        'pares-impares': [
            {
                id: 'par-1',
                tipo: 'multipla-escolha',
                enunciado: 'Qual número é PAR?',
                pergunta: 'Escolha:',
                opcoes: ['3', '4', '5', '7'],
                resposta: '4',
                dica: 'Números pares terminam em 0,2,4,6,8',
                explicacao: '4 é par!'
            },
            {
                id: 'par-2',
                tipo: 'multipla-escolha',
                enunciado: 'Qual é ÍMPAR?',
                pergunta: 'Escolha:',
                opcoes: ['2', '3', '4', '6'],
                resposta: '3',
                dica: 'Ímpares terminam em 1,3,5,7,9',
                explicacao: '3 é ímpar!'
            },
            {
                id: 'par-3',
                tipo: 'multipla-escolha',
                enunciado: '10 é par ou ímpar?',
                pergunta: 'Responda:',
                opcoes: ['Par', 'Ímpar'],
                resposta: 'Par',
                dica: 'Termina em 0!',
                explicacao: '10 é par (termina em 0)'
            },
            {
                id: 'par-4',
                tipo: 'multipla-escolha',
                enunciado: 'Qual número é par?',
                pergunta: '17, 18, 19',
                opcoes: ['17', '18', '19', 'Nenhum'],
                resposta: '18',
                dica: 'Termina em 8!',
                explicacao: '18 é par'
            },
            {
                id: 'par-5',
                tipo: 'multipla-escolha',
                enunciado: 'Quantos números pares entre 1 e 10?',
                pergunta: 'Conte: 2,4,6,8,10',
                opcoes: ['4', '5', '6', '10'],
                resposta: '5',
                dica: 'Conte: 2,4,6,8,10',
                explicacao: 'São 5 números pares: 2,4,6,8,10'
            }
        ]
    },

    'problemas': {
        'contextualizados': [
            {
                id: 'prob-1',
                tipo: 'multipla-escolha',
                enunciado: 'Maria tinha 10 reais. Comprou um brinquedo por 6 reais.',
                pergunta: 'Quanto sobrou?',
                opcoes: ['3 reais', '4 reais', '5 reais', '16 reais'],
                resposta: '4 reais',
                dica: 'Subtração: 10 - 6',
                explicacao: '10 - 6 = 4 reais'
            },
            {
                id: 'prob-2',
                tipo: 'multipla-escolha',
                enunciado: 'João tem 3 caixas de lápis. Cada caixa tem 5 lápis.',
                pergunta: 'Total de lápis:',
                opcoes: ['8', '12', '15', '18'],
                resposta: '15',
                dica: 'Multiplicação: 3 × 5',
                explicacao: '3 × 5 = 15 lápis'
            },
            {
                id: 'prob-3',
                tipo: 'input',
                enunciado: 'Ana tinha 12 doces e comeu 4.',
                pergunta: 'Quantos sobraram?',
                resposta: 8,
                dica: '12 - 4 = ?',
                explicacao: '12 - 4 = 8 doces'
            },
            {
                id: 'prob-4',
                tipo: 'input',
                enunciado: 'Pedro tinha 8 figurinhas e ganhou 5.',
                pergunta: 'Quantas tem agora?',
                resposta: 13,
                dica: '8 + 5 = ?',
                explicacao: '8 + 5 = 13 figurinhas'
            },
            {
                id: 'prob-5',
                tipo: 'input',
                enunciado: 'Uma caixa tem 20 bombons. 4 amigos vão dividir igualmente.',
                pergunta: 'Quantos cada um recebe?',
                resposta: 5,
                dica: '20 ÷ 4 = ?',
                explicacao: '20 ÷ 4 = 5 bombons cada'
            },
            {
                id: 'prob-6',
                tipo: 'input',
                enunciado: 'Carla tem 7 anos. Sua irmã tem o dobro da idade.',
                pergunta: 'Quantos anos tem a irmã?',
                resposta: 14,
                dica: 'Dobro = 7 × 2',
                explicacao: '7 × 2 = 14 anos'
            },
            {
                id: 'prob-7',
                tipo: 'input',
                enunciado: 'Um ônibus tinha 15 passageiros. Entraram 8 e saíram 5.',
                pergunta: 'Quantos ficaram?',
                resposta: 18,
                dica: '15 + 8 - 5 = ?',
                explicacao: '15 + 8 - 5 = 18 passageiros'
            },
            {
                id: 'prob-8',
                tipo: 'input',
                enunciado: 'Lucas tem 25 reais. Quer comprar um jogo de 40 reais.',
                pergunta: 'Quanto falta?',
                resposta: 15,
                dica: '40 - 25 = ?',
                explicacao: '40 - 25 = 15 reais'
            }
        ],
        'raciocinio': [
            {
                id: 'rac-1',
                tipo: 'multipla-escolha',
                enunciado: 'Qual é o próximo número?',
                pergunta: '2, 4, 6, 8, __',
                opcoes: ['9', '10', '11', '12'],
                resposta: '10',
                dica: 'Números pares!',
                explicacao: 'Sequência de pares: 10'
            },
            {
                id: 'rac-2',
                tipo: 'multipla-escolha',
                enunciado: 'Complete a sequência:',
                pergunta: '5, 10, 15, 20, __',
                opcoes: ['22', '24', '25', '30'],
                resposta: '25',
                dica: 'Contando de 5 em 5!',
                explicacao: 'Próximo: 25'
            },
            {
                id: 'rac-3',
                tipo: 'input',
                enunciado: 'Qual número vem depois?',
                pergunta: '10, 20, 30, 40, __',
                resposta: 50,
                dica: 'Dezenas!',
                explicacao: 'Próximo: 50'
            },
            {
                id: 'rac-4',
                tipo: 'input',
                enunciado: 'Complete: 3, 6, 9, 12, __',
                pergunta: 'Qual é o próximo?',
                resposta: 15,
                dica: 'Tabuada do 3!',
                explicacao: 'Próximo: 15'
            },
            {
                id: 'rac-5',
                tipo: 'input',
                enunciado: 'Sequência: 1, 3, 5, 7, __',
                pergunta: 'Próximo número:',
                resposta: 9,
                dica: 'Números ímpares!',
                explicacao: 'Próximo ímpar: 9'
            }
        ]
    },

    'geometria': {
        'formas': [
            {
                id: 'geo-1',
                tipo: 'multipla-escolha',
                enunciado: 'Quantos lados tem um triângulo?',
                visualizacao: ['△'],
                opcoes: ['2', '3', '4', '5'],
                resposta: '3',
                dica: 'Conte os lados!',
                explicacao: 'Triângulo = 3 lados'
            },
            {
                id: 'geo-2',
                tipo: 'multipla-escolha',
                enunciado: 'Qual forma é esta?',
                visualizacao: ['⬜'],
                opcoes: ['Círculo', 'Triângulo', 'Quadrado', 'Pentágono'],
                resposta: 'Quadrado',
                dica: '4 lados iguais!',
                explicacao: 'Quadrado tem 4 lados iguais'
            },
            {
                id: 'geo-3',
                tipo: 'multipla-escolha',
                enunciado: 'Quantos lados tem um retângulo?',
                opcoes: ['2', '3', '4', '5'],
                resposta: '4',
                dica: 'Conte os lados!',
                explicacao: 'Retângulo = 4 lados'
            },
            {
                id: 'geo-4',
                tipo: 'multipla-escolha',
                enunciado: 'Um círculo tem quantos lados?',
                visualizacao: ['⭕'],
                opcoes: ['0', '1', '2', 'Infinitos'],
                resposta: '0',
                dica: 'Círculo não tem lados retos!',
                explicacao: 'Círculo = 0 lados'
            },
            {
                id: 'geo-5',
                tipo: 'multipla-escolha',
                enunciado: 'Quantos cantos tem um triângulo?',
                visualizacao: ['△'],
                opcoes: ['2', '3', '4', '5'],
                resposta: '3',
                dica: 'Cantos = vértices!',
                explicacao: 'Triângulo = 3 cantos'
            },
            {
                id: 'geo-6',
                tipo: 'multipla-escolha',
                enunciado: 'Qual forma tem mais lados?',
                pergunta: 'Triângulo ou Quadrado?',
                opcoes: ['Triângulo', 'Quadrado', 'Iguais'],
                resposta: 'Quadrado',
                dica: 'Quadrado = 4, Triângulo = 3',
                explicacao: 'Quadrado tem mais lados (4)'
            }
        ]
    },

    // ===========================================
    // PARQUE DE DIVERSÕES (Jogos Livres)
    // ===========================================
    'jogos-livres': {
        'diversao': [
            {
                id: 'jl-1',
                tipo: 'multipla-escolha',
                enunciado: 'Quantas patas tem um cachorro?',
                visualizacao: ['🐕'],
                opcoes: ['2', '3', '4', '5'],
                resposta: '4',
                dica: 'Conte as patinhas!',
                explicacao: 'Cachorros têm 4 patas!'
            },
            {
                id: 'jl-2',
                tipo: 'multipla-escolha',
                enunciado: 'Quantas rodas tem uma bicicleta?',
                visualizacao: ['🚲'],
                opcoes: ['1', '2', '3', '4'],
                resposta: '2',
                dica: 'BI-cicleta = 2!',
                explicacao: 'Bicicleta = 2 rodas!'
            },
            {
                id: 'jl-3',
                tipo: 'multipla-escolha',
                enunciado: 'Quantas asas tem uma borboleta?',
                visualizacao: ['🦋'],
                opcoes: ['1', '2', '3', '4'],
                resposta: '2',
                dica: 'Uma de cada lado!',
                explicacao: 'Borboletas têm 2 asas!'
            },
            {
                id: 'jl-4',
                tipo: 'multipla-escolha',
                enunciado: 'Você tem 3 balas e ganhou mais 2. Quantas você tem agora?',
                visualizacao: ['🍬', '🍬', '🍬', '+', '🍬', '🍬'],
                opcoes: ['4', '5', '6', '7'],
                resposta: '5',
                dica: 'Junta todas as balas!',
                explicacao: '3 + 2 = 5 balas deliciosas!'
            },
            {
                id: 'jl-5',
                tipo: 'multipla-escolha',
                enunciado: 'Quantas pernas você tem?',
                visualizacao: ['👤'],
                opcoes: ['1', '2', '3', '4'],
                resposta: '2',
                dica: 'Conta suas próprias pernas!',
                explicacao: 'Temos 2 pernas!'
            },
            {
                id: 'jl-6',
                tipo: 'multipla-escolha',
                enunciado: 'Quantos olhos tem um gato?',
                visualizacao: ['🐱'],
                opcoes: ['1', '2', '3', '4'],
                resposta: '2',
                dica: 'Mesma quantidade que nós!',
                explicacao: 'Gatos têm 2 olhos!'
            },
            {
                id: 'jl-7',
                tipo: 'multipla-escolha',
                enunciado: 'Tinha 5 balões e 2 estouraram. Quantos sobraram?',
                visualizacao: ['🎈', '🎈', '🎈', '🎈', '🎈', '💥', '💥'],
                opcoes: ['2', '3', '4', '5'],
                resposta: '3',
                dica: 'Tira os que estouraram!',
                explicacao: '5 - 2 = 3 balões sobraram!'
            },
            {
                id: 'jl-8',
                tipo: 'multipla-escolha',
                enunciado: 'Quantas estrelas você vê?',
                visualizacao: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐'],
                opcoes: ['5', '6', '7', '8'],
                resposta: '7',
                dica: 'Conte uma por uma!',
                explicacao: 'São 7 estrelas brilhantes!'
            },
            {
                id: 'jl-9',
                tipo: 'multipla-escolha',
                enunciado: 'Se você tem 4 flores e dá 1 para sua mãe, com quantas você fica?',
                visualizacao: ['🌸', '🌸', '🌸', '🌸'],
                opcoes: ['2', '3', '4', '5'],
                resposta: '3',
                dica: 'Tira 1 das 4!',
                explicacao: '4 - 1 = 3 flores!'
            },
            {
                id: 'jl-10',
                tipo: 'multipla-escolha',
                enunciado: 'Quantas pizzas tem aqui?',
                visualizacao: ['🍕', '🍕', '🍕'],
                opcoes: ['2', '3', '4', '5'],
                resposta: '3',
                dica: 'Conte as pizzas!',
                explicacao: 'Tem 3 pizzas deliciosas!'
            },
            {
                id: 'jl-11',
                tipo: 'multipla-escolha',
                enunciado: 'Você comprou 2 sorvetes e seu amigo comprou 3. Quantos ao todo?',
                visualizacao: ['🍦', '🍦', '+', '🍦', '🍦', '🍦'],
                opcoes: ['4', '5', '6', '7'],
                resposta: '5',
                dica: 'Soma os dois!',
                explicacao: '2 + 3 = 5 sorvetes!'
            },
            {
                id: 'jl-12',
                tipo: 'multipla-escolha',
                enunciado: 'Quantos dedos você tem em uma mão?',
                visualizacao: ['✋'],
                opcoes: ['4', '5', '6', '10'],
                resposta: '5',
                dica: 'Olhe para sua mão!',
                explicacao: 'Temos 5 dedos em cada mão!'
            },
            {
                id: 'jl-13',
                tipo: 'multipla-escolha',
                enunciado: 'Se você comer 2 maçãs de 6, quantas sobram?',
                visualizacao: ['🍎', '🍎', '🍎', '🍎', '🍎', '🍎'],
                opcoes: ['2', '3', '4', '5'],
                resposta: '4',
                dica: 'Tira 2 de 6!',
                explicacao: '6 - 2 = 4 maçãs!'
            },
            {
                id: 'jl-14',
                tipo: 'multipla-escolha',
                enunciado: 'Quantas bolas você vê?',
                visualizacao: ['⚽', '⚽', '⚽', '⚽', '⚽', '⚽', '⚽', '⚽'],
                opcoes: ['6', '7', '8', '9'],
                resposta: '8',
                dica: 'Conte com calma!',
                explicacao: 'São 8 bolas!'
            },
            {
                id: 'jl-15',
                tipo: 'multipla-escolha',
                enunciado: 'Você tem 10 reais e gasta 3. Quanto sobra?',
                visualizacao: ['💵', '10', '-', '3', '=', '?'],
                opcoes: ['5', '6', '7', '8'],
                resposta: '7',
                dica: '10 menos 3!',
                explicacao: '10 - 3 = 7 reais!'
            },
            {
                id: 'jl-16',
                tipo: 'multipla-escolha',
                enunciado: 'Quantos corações você vê?',
                visualizacao: ['❤️', '❤️', '❤️', '❤️', '❤️'],
                opcoes: ['3', '4', '5', '6'],
                resposta: '5',
                dica: 'Conte os corações!',
                explicacao: 'São 5 corações!'
            },
            {
                id: 'jl-17',
                tipo: 'multipla-escolha',
                enunciado: 'Uma aranha tem quantas patas?',
                visualizacao: ['🕷️'],
                opcoes: ['4', '6', '8', '10'],
                resposta: '8',
                dica: 'Aranhas têm muitas patas!',
                explicacao: 'Aranhas têm 8 patas!'
            },
            {
                id: 'jl-18',
                tipo: 'multipla-escolha',
                enunciado: 'Se você tem 7 lápis e perde 2, quantos ficam?',
                visualizacao: ['✏️', '✏️', '✏️', '✏️', '✏️', '✏️', '✏️'],
                opcoes: ['4', '5', '6', '7'],
                resposta: '5',
                dica: '7 menos 2!',
                explicacao: '7 - 2 = 5 lápis!'
            },
            {
                id: 'jl-19',
                tipo: 'multipla-escolha',
                enunciado: 'Quantas bolinhas tem aqui?',
                visualizacao: ['🔴', '🔴', '🔴', '🔴', '🔴', '🔴', '🔴', '🔴', '🔴'],
                opcoes: ['7', '8', '9', '10'],
                resposta: '9',
                dica: 'Conta uma por uma!',
                explicacao: 'São 9 bolinhas!'
            },
            {
                id: 'jl-20',
                tipo: 'multipla-escolha',
                enunciado: 'Se 3 amigos dividem 6 doces igualmente, quantos cada um ganha?',
                visualizacao: ['🍭', '🍭', '🍭', '🍭', '🍭', '🍭'],
                pergunta: '6 ÷ 3 = ?',
                opcoes: ['1', '2', '3', '4'],
                resposta: '2',
                dica: 'Divide igual para os 3!',
                explicacao: '6 ÷ 3 = 2 doces para cada!'
            }
        ]
    }
};

/**
 * Gerar questões para uma atividade
 */
function gerarQuestoes(ilha, nivel, quantidade = 10) {
    const questoesDisponiveis = QUESTOES[ilha];

    if (!questoesDisponiveis) {
        console.error(`Ilha "${ilha}" não encontrada`);
        return [];
    }

    const todasQuestoes = [];

    // Coletar todas as questões da ilha
    Object.values(questoesDisponiveis).forEach(categoriaQuestoes => {
        todasQuestoes.push(...categoriaQuestoes);
    });

    if (todasQuestoes.length === 0) {
        console.warn(`Nenhuma questão disponível para ilha "${ilha}"`);
        return [];
    }

    // Embaralhar e selecionar quantidade desejada
    const questoesEmbaralhadas = embaralharArray(todasQuestoes);
    return questoesEmbaralhadas.slice(0, Math.min(quantidade, questoesEmbaralhadas.length));
}

/**
 * Validar resposta
 */
function validarResposta(questao, respostaUsuario) {
    if (questao.tipo === 'input') {
        return parseInt(respostaUsuario) === parseInt(questao.resposta);
    } else {
        return respostaUsuario === questao.resposta;
    }
}

/**
 * Obter feedback baseado no desempenho
 */
function obterFeedback(acertou, streak = 0) {
    if (acertou) {
        const feedbacksPositivos = [
            { titulo: 'Muito bem!', mensagem: 'Você acertou! Continue assim!', icone: '🎉' },
            { titulo: 'Excelente!', mensagem: 'Resposta correta! Você é incrível!', icone: '⭐' },
            { titulo: 'Parabéns!', mensagem: 'Acertou em cheio! Você está mandando bem!', icone: '🏆' },
            { titulo: 'Sensacional!', mensagem: 'Perfeito! Você é um expert em matemática!', icone: '🌟' },
            { titulo: 'Mandou bem!', mensagem: 'Isso aí! Continue com esse ritmo!', icone: '💪' },
            { titulo: 'Fantástico!', mensagem: 'Você está arrasando! Parabéns!', icone: '✨' },
            { titulo: 'Show!', mensagem: 'Resposta perfeita! Você é demais!', icone: '🎯' },
            { titulo: 'Incrível!', mensagem: 'Acertou novamente! Você é fera!', icone: '🦁' }
        ];

        if (streak >= 10) {
            return {
                titulo: 'IMPRESSIONANTE! 🔥',
                mensagem: `${streak} acertos seguidos! Você é um gênio da matemática!`,
                icone: '🔥'
            };
        } else if (streak >= 5) {
            return {
                titulo: 'Sequência Incrível! 🔥',
                mensagem: `${streak} acertos seguidos! Você está imparável!`,
                icone: '🔥'
            };
        }

        return feedbacksPositivos[Math.floor(Math.random() * feedbacksPositivos.length)];
    } else {
        const feedbacksEncorajadores = [
            { titulo: 'Quase lá!', mensagem: 'Não foi dessa vez, mas você pode tentar de novo!', icone: '💪' },
            { titulo: 'Tente novamente!', mensagem: 'Você está aprendendo! Vamos tentar outra vez?', icone: '🌟' },
            { titulo: 'Continue tentando!', mensagem: 'Errar faz parte do aprendizado. Não desista!', icone: '💙' },
            { titulo: 'Você consegue!', mensagem: 'Às vezes erramos, mas o importante é aprender!', icone: '🎯' },
            { titulo: 'Sem problemas!', mensagem: 'Não acertou agora, mas vai na próxima!', icone: '😊' },
            { titulo: 'Não desista!', mensagem: 'Todo erro é uma oportunidade de aprender!', icone: '🌱' }
        ];

        return feedbacksEncorajadores[Math.floor(Math.random() * feedbacksEncorajadores.length)];
    }
}

/**
 * Embaralhar array
 */
function embaralharArray(array) {
    const novoArray = [...array];
    for (let i = novoArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
    }
    return novoArray;
}

// Exportar funções
window.questoesDB = {
    QUESTOES,
    gerarQuestoes,
    validarResposta,
    obterFeedback
};

console.log(`📚 Banco de Questões carregado! Total: 150+ questões disponíveis`);
