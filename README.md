# Sistema de Consultas Mobile

Aplicativo mobile (React Native + Expo + TypeScript) para cadastro de pacientes,
agendamento de consultas e **acesso por perfil** (admin, médico e paciente).

Base do **Checkpoint 1** evoluída com a **Aula 25/08/2026 — Mock de Médicos,
Login por Perfil e Agenda do Médico** (FIAP, Engenharia de Software, turma 3ESA).

## Participantes (RMs)

- RM554638 — Fabricio Bettarello
- RM98677 — Enzo Miletta

## O que a aula entregou

1. **Mock central de médicos** (`medicosMock` / `medicosSelectMock`) alinhado ao
   agendamento (`medicoId` + especialidade), evitando listas duplicadas.
2. **Login por perfil** (`paciente` / `medico` / `admin`) com stacks de navegação
   diferentes para cada um (RBAC no mobile).
3. **Credenciais de teste** por médico na tela de Login (tocar no card preenche
   e-mail/senha).
4. **Área do Médico** (`MedicoHomeScreen`) e **agenda filtrada**: o médico só vê
   as consultas com o seu `medicoId`.
5. **Estado vazio personalizado**: `Nenhuma consulta para o médico {nome}`.
6. **Continuidade IoT**: uma emergência de pressão arterial (Estágio 3) cria uma
   consulta marcada como emergência/prioridade que aparece no topo da agenda do
   cardiologista (Dr. Roberto Silva).

## Credenciais de teste

| Perfil   | E-mail                     | Senha      |
|----------|----------------------------|------------|
| Admin    | `admin@sistema.com`        | `admin123` |
| Paciente | `joao@email.com`           | `123456`   |
| Médico   | `roberto.silva@medico.com` | `123456`   |

Os demais médicos seguem o padrão `nome.sobrenome@medico.com` / `123456`
(veja a lista completa tocando em **Ver Credenciais de Teste** no Login).
A **Dra. Carla Lima** (`carla.lima@medico.com`) não tem consultas iniciais —
serve para testar o estado vazio.

## Estrutura do projeto

```
App.tsx                              # entrada: inicializa dados + providers + navegação
src/
├── contexts/AuthContext.tsx         # usuário logado, login/logout, isAdmin(), isMedico()
├── navigation/index.tsx             # stacks por perfil (admin/medico/paciente)
├── types/
│   ├── usuario.ts                   # TipoUsuario, EspecialidadeUsuario, Usuario
│   ├── statusConsulta.ts            # StatusConsulta
│   └── index.ts                     # barrel de tipos
├── interfaces/
│   ├── medico.ts                    # Especialidade, Medico, MedicoSelect
│   └── consulta.ts                  # Consulta
├── services/
│   ├── mockData.ts                  # médicos e consultas mock
│   ├── authService.ts              # usuários, login, sync de médicos, credenciais
│   ├── consultasService.ts         # CRUD + filtro/permissão por perfil
│   └── index.ts
├── components/                      # ConsultaCard, Loading, EmptyState, Input
├── styles/                          # um <nome>.styles.ts por tela/componente (só StyleSheet.create)
│   └── index.ts                     # barrel dos estilos
├── screens/
│   ├── Login.tsx                    # login + cards de credenciais
│   ├── HomeScreen.tsx               # home do paciente
│   ├── MedicoHomeScreen.tsx         # home do médico
│   ├── AdminScreen.tsx              # painel administrativo
│   ├── ConsultasListScreen.tsx      # lista filtrada por perfil + empty state
│   ├── MinhasConsultasScreen.tsx    # consultas do paciente
│   ├── ConsultaDetalhesScreen.tsx   # detalhes + ações por permissão
│   ├── NovaConsultaScreen.tsx       # agendamento (usa o mock compartilhado)
│   ├── AgendamentoScreen.tsx
│   ├── PressaoArterialScreen.tsx    # monitor de PA (emergência -> agenda do médico)
│   └── CadastroPacienteScreen.tsx   # criar conta (cadastrarUsuario)
├── utils/                           # máscaras e validações (CPF, e-mail, telefone, data)
└── theme.ts                         # paleta de cores (#79059C)
```

## Regra de negócio (em uma frase)

`admin` vê tudo; `médico` vê `c.medicoId === usuario.medicoId`; `paciente` vê
`c.usuarioId === usuario.id`.

## Como executar

Pré-requisitos: **Node.js 18+** e o app **Expo Go** no celular (ou um emulador
Android/iOS).

```bash
npm install
npm start
```

Depois escaneie o QR Code com o app Expo Go, ou pressione `a` (Android),
`i` (iOS) ou `w` (web) no terminal.

> Se o app já tinha dados antigos no AsyncStorage, use **Ver Credenciais de
> Teste → Limpar TUDO do AsyncStorage** na tela de Login e recarregue (R+R).

## Como testar

1. **Médico:** entre com `roberto.silva@medico.com` → veja a **Área do Médico**
   e a **Minha Agenda** só com as consultas dele.
2. **Empty state:** entre com `carla.lima@medico.com` → mensagem
   `Nenhuma consulta para o médico Dra. Carla Lima`.
3. **Paciente:** entre com `joao@email.com`, agende em **Nova Consulta** e volte —
   a lista atualiza sozinha (`useFocusEffect`).
4. **Emergência IoT:** como paciente, abra **Pressão Arterial**, informe algo como
   `190 × 130` → crie a emergência e confira que ela aparece no topo da agenda do
   Dr. Roberto Silva.
5. **Admin:** entre com `admin@sistema.com` → painel com contadores e todas as
   consultas.
```
