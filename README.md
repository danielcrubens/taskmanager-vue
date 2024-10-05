# 📝 Documentação

## Visão Geral
Esta aplicação é um sistema de gerenciamento de tarefas. Para a autenticação de usuários e a persistência de dados, foi integrado o Firebase, garantindo um controle eficiente e seguro das informações.

 [Link projeto](https://task-managervue.web.app/) ou https://task-managervue.web.app/

## :rocket:  Tecnologias utilizadas
Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Vue](https://vuejs.org/) (Interface)
- [Pinia](https://pinia.vuejs.org/) (Gerenciamento de Estado)
- [TypeScript](https://www.typescriptlang.org/) (Tipagem estática)
- [Radix Vue](https://www.radix-vue.com/) (Componentes)
- [Zod](https://zod.dev/) (Validação)
- [Vue Toastification](https://vue-toastification.maronato.dev/) (Notificação)
- [Firebase](https://firebase.google.com/) (Plataforma backend)

## :page_facing_up: Componentes Principais


### 1 - Composables useAuth

#### O que ele faz?
Este composable gerencia todas as operações de autenticação do usuário usando Firebase. Ele fornece funções para:
- Registrar novos usuários
- Fazer login
- Fazer logout
- Redefinir senha
- Monitorar o estado de autenticação

#### Estados importantes

- loading: indica se uma operação está em andamento
- error: armazena mensagens de erro
- resetEmailSent: indica se um e-mail de redefinição foi enviado

#### Principais funções

- registerUser: cria uma nova conta
- loginUser: faz login com e-mail e senha
- logoutUser: realiza o logout
- resetUserPassword: envia e-mail para redefinir senha
- updateUserProfile: atualiza o nome do usuário
- initAuthListener: monitora mudanças no estado de autenticação

#### Como ele lida com erros?
Usa uma função handleAuthError para tratar todos os erros de forma consistente, atualizando o estado de erro.


### 2 - Composable: useTask
 #### O que ele faz?
Este composable gerencia todas as operações relacionadas a tarefas no Firestore. Ele oferece funções para:

- Buscar tarefas do usuário
- Criar novas tarefas
- Atualizar tarefas existentes
- Deletar tarefas

#### Estados importantes

- isLoading: indica se uma operação está em andamento
- error: armazena mensagens de erro

#### Principais funções

- fetchUserTasks: busca todas as tarefas de um usuário específico
- createTask: adiciona uma nova tarefa ao banco de dados
- updateTaskInDb: atualiza uma tarefa existente
- deleteTaskFromDb: remove uma tarefa do banco de dados

#### Como os dados são estruturados?
#### Cada tarefa contém:
- ID único
- Dados da tarefa
- Status (começa como 'pending')
- Data de criação
- ID do usuário que criou

#### Como ele lida com erros?
#### Usa uma função handleError que:

- Atualiza o estado de erro
- Registra o erro no console
- Lança o erro para tratamento adicional se necessário

### 3 -  Router
#### O que ele faz?
Configura a navegação da aplicação, definindo rotas e gerenciando proteção de acesso baseado no estado de autenticação.
Rotas principais

- / (Home): página inicial, apenas para visitantes
- /tasks (Dashboard): área de tarefas, requer autenticação
- /forgot-password (Forgot): recuperação de senha, apenas para visitantes

#### Proteção de rotas
#### Usa metadados nas rotas:

- requiresAuth: usuário precisa estar logado
- requiresGuest: usuário precisa estar deslogado

#### Como funciona a navegação?

Usa createWebHistory para URLs limpos
Carrega componentes de forma lazy (sob demanda)
Verifica autenticação antes de cada navegação:
- Redireciona para home se tentar acessar área protegida sem login
(verificar ) Redireciona para home  se tentar acessar área de visitante estando logado

### 4 - Stores
 #### Auth 
O que ele faz?
Gerencia o estado global de autenticação usando Pinia, servindo como ponte entre a UI e o composable useAuth.
#### Estado principal
- user: armazena dados do usuário atual
#### Funcionalidades principais
- init: configura listener para mudanças no estado de autenticação
- register: registra novo usuário e atualiza perfil
- login: autentica usuário
- logout: desconecta usuário
- resetPassword: inicia processo de redefinição de senha


#### Task
O que ele faz?
Gerencia o estado global das tarefas usando Pinia, coordenando com o composable useTask.
#### Estados principais

- tasks: lista completa de tarefas
- pendingTasks: computed para tarefas pendentes
- completedTasks: computed para tarefas completadas

#### Funcionalidades principais

- fetchTasks: busca tarefas do usuário atual
- addTask: cria nova tarefa
- updateTask: modifica tarefa existente
- deleteTask: remove tarefa
- toggleTaskStatus: alterna status entre pendente/completo

Como os stores trabalham juntos?

*Task*  depende do *Auth*  para:
- Obter ID do usuário atual
- Verificar se usuário está autenticado antes de operações



 ### 5 - Firebase (utils)

O que faz?

Configura e exporta instâncias do Firebase necessárias para a aplicação.
Configuração

Usa variáveis de ambiente do Vite para configuração segura
Inicializa Firebase com:

- Authentication
- Firestore Database



Exports

auth: instância de autenticação
db: instância do Firestore
resetPassword: função auxiliar para redefinir senha

Segurança

Todas as chaves sensíveis são armazenadas em variáveis de ambiente
Verificar se usuário está autenticado antes de operações








## 💾 Instalação

Instale todas as dependências do projeto

```
npm install
```

Rode a aplicação

```
npm run dev
```

Deploy firebase

```
firebase login
```

```
firebase init
```


```
firebase deploy
```

Deploy variaveis de ambiente

```
firebase functions:config:set myfirebase.api_key=
firebase functions:config:set myfirebase.auth_domain=
firebase functions:config:set myfirebase.project_id=
firebase functions:config:set myfirebase.storage_bucket=
firebase functions:config:set myfirebase.messaging_sender_id=
firebase functions:config:set myfirebase.app_id="
firebase functions:config:set myfirebase.measurement_id="

```
Verificar se está tudo ok com as configurações

```
firebase functions:config:get
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`VITE_FIREBASE_API_KEY`

`VITE_FIREBASE_AUTH_DOMAIN`

`VITE_FIREBASE_PROJECT_ID`

`VITE_FIREBASE_STORAGE_BUCKET`

`VITE_FIREBASE_MESSAGING_SENDER_ID`

`VITE_FIREBASE_APP_ID`

`VITE_FIREBASE_MEASUREMENT_ID`




