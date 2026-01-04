# 📚 Matemática Kids - Plataforma de Aprendizado Interativa

Uma plataforma web gamificada para o ensino de matemática para crianças, com sistema de pontuação, conquistas e acompanhamento de progresso.

## ✨ Funcionalidades

- **Sistema de Autenticação** - Login seguro com Firebase Authentication
- **Perfis de Usuário** - Alunos e professores com dashboards personalizados
- **Gamificação** - Sistema de pontos, XP, níveis e vidas
- **Atividades Interativas** - Exercícios de matemática por ilha temática
- **Estatísticas e Dashboards** - Acompanhamento de desempenho e progresso
- **Sistema de Conquistas** - Desbloqueie medalhas conforme avança
- **Histórico de Atividades** - Visualize o progresso ao longo do tempo

## 🚀 Como Usar

### Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexão com a internet (para Firebase)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/sourcenaiomiocc-creator/Math.git
cd Math
```

2. Configure o Firebase:
   - Copie `.env.example` para `.env`
   - Preencha com suas credenciais Firebase
   - Ou use `config-loader.js` para desenvolvimento local

3. Abra `index.html` em seu navegador ou use um servidor local:
```bash
# Exemplo com Python
python -m http.server 8000

# Exemplo com Node.js
npx serve
```

4. Acesse `http://localhost:8000` no navegador

## 🔧 Configuração do Firebase

### Criando um Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto
3. Ative **Authentication** (método Email/Senha)
4. Ative **Firestore Database**
5. Copie as credenciais de configuração

### Configurando Variáveis de Ambiente

Crie um arquivo `.env` baseado em `.env.example`:

```env
FIREBASE_API_KEY=sua-api-key
FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
FIREBASE_PROJECT_ID=seu-projeto-id
FIREBASE_STORAGE_BUCKET=seu-projeto.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=seu-sender-id
FIREBASE_APP_ID=seu-app-id
FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Regras de Segurança do Firestore

Implante as regras de segurança em `firestore.rules`:

```bash
firebase deploy --only firestore:rules
```

## 📁 Estrutura do Projeto

```
Math/
├── index.html              # Página de login
├── home.html               # Página inicial
├── aluno-home.js          # Dashboard do aluno
├── aluno.css              # Estilos do aluno
├── atividades.html        # Página de atividades
├── atividades.js          # Lógica das atividades
├── atividades.css         # Estilos das atividades
├── questoes.js            # Sistema de questões
├── dashboard.html         # Dashboard principal
├── dashboard.js           # Lógica do dashboard
├── dashboard.css          # Estilos do dashboard
├── estatisticas.html      # Estatísticas detalhadas
├── estatisticas.js        # Lógica de estatísticas
├── gamificacao.js         # Sistema de gamificação
├── auth.js                # Autenticação
├── config-loader.js       # Carregador de configuração seguro
├── utils.js               # Funções utilitárias
├── firestore.rules        # Regras de segurança Firestore
├── .env.example           # Exemplo de variáveis de ambiente
└── README.md              # Este arquivo
```

## 🔐 Segurança

### Melhorias Implementadas

- ✅ Credenciais Firebase movidas para variáveis de ambiente
- ✅ Firebase Security Rules implementadas
- ✅ Validação de entrada no servidor
- ✅ Proteção contra XSS
- ✅ Validação de idade server-side (COPPA/GDPR)
- ✅ Rate limiting em operações críticas

### Avisos Importantes

⚠️ **NUNCA** faça commit do arquivo `.env` ou `firebase-config.js` com credenciais reais!
⚠️ Sempre use HTTPS em produção
⚠️ Revise e teste as Security Rules antes de implantar

## 🎮 Como Jogar

### Para Alunos

1. Faça login com suas credenciais
2. Escolha uma ilha temática
3. Complete atividades para ganhar XP e pontos
4. Desbloqueie conquistas
5. Acompanhe seu progresso no dashboard

### Para Professores

1. Faça login com conta de professor
2. Visualize estatísticas da turma
3. Acompanhe o desempenho individual dos alunos
4. Gerencie atividades e conteúdo

## 🏗️ Estrutura do Firestore

```
users/
  - {userId}
    - nome, email, tipo, idade, dataCriacao, ultimoAcesso

alunos/
  - {userId}
    - pontos, nivel, xp, vidas, conquistas
    - estatisticas: { totalAtividades, totalAcertos, totalErros, taxaAcerto, tempoTotal }

atividades/
  - {userId}
    - historico: [{ ilha, atividadeId, acertos, erros, estrelas, xpGanho, tempo, data }]

ilhas/
  - {ilhaId}
    - nome, descricao, icone
    - atividades: [...]

conquistas/
  - {conquistaId}
    - nome, descricao, icone, criterio, raridade
```

## 🛠️ Tecnologias Utilizadas

- **HTML5/CSS3** - Interface do usuário
- **JavaScript** (ES6+) - Lógica da aplicação
- **Firebase Authentication** - Sistema de login
- **Firebase Firestore** - Banco de dados NoSQL
- **Firebase Hosting** (opcional) - Deploy da aplicação

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia `CONTRIBUTING.md` para detalhes sobre nosso código de conduta e processo de submissão de pull requests.

## 📧 Contato

Para questões e suporte, abra uma issue no GitHub.

---

Desenvolvido com ❤️ para tornar o aprendizado de matemática divertido!
