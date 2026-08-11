# Sistema de Consultas Mobile

Aplicativo mobile (React Native + Expo + TypeScript) para cadastro de pacientes
e agendamento de consultas. Projeto do **Checkpoint 1 — 2º semestre** (Turma
3ESA), com as três melhorias da aula de **05/05/2026**.

## Participantes (RMs)

- RM554638 — Fabricio Bettarello
- RM98677 — Enzo Miletta

## Melhorias implementadas

### 1. Cadastro de Paciente — `src/screens/CadastroPaciente.tsx`
- Máscara progressiva de **CPF** (`000.000.000-00`).
- Máscara progressiva de **telefone** (`(11) 99999-9999` celular / `(11) 3333-4444` fixo).
- Validação oficial de **CPF** (algoritmo módulo 11 da Receita Federal).
- Rejeição de CPFs com todos os dígitos iguais (ex.: `111.111.111-11`).
- Validação de **e-mail** por regex (`texto@dominio.extensao`).
- **Feedback inline** no `onBlur`: borda vermelha + mensagem abaixo dos campos.
- Limpeza da mensagem de erro ao digitar novamente.
- Bloqueio do cadastro com CPF/telefone inválidos (`Alert`).

### 2. Nova Consulta — `src/screens/NovaConsultaScreen.tsx`
- Tela funcional (não exibe mais "Em Desenvolvimento").
- Seleção de **especialidade** via modal.
- Seleção de **médico** filtrado pela especialidade escolhida.
- Ao trocar a especialidade, o médico selecionado é limpo.
- Campo de **data** com máscara `DD/MM/AAAA`.
- Seleção de **horário** em grid de 3 colunas.
- Campo de **observações** (opcional).
- Validação dos campos obrigatórios.
- Persistência via `criarConsulta`.
- Conversão da data de `DD/MM/AAAA` para `AAAA-MM-DD` antes de salvar.

### 3. Lista de Consultas — `src/screens/ConsultasListScreen.tsx`
- Uso de **`useFocusEffect`** (recarrega ao ganhar foco, não só na montagem).
- Ao agendar uma consulta e voltar, a lista atualiza automaticamente.
- `useCallback` com dependência correta de `usuario?.id`.

## Estrutura do projeto

```
AppMobile/
├── App.tsx                         # entrada: providers + navegação
├── src/
│   ├── context/AuthContext.tsx     # usuário logado (usuario?.id)
│   ├── navigation/
│   │   ├── AppNavigator.tsx        # abas + pilha
│   │   └── types.ts                # tipos das rotas
│   ├── screens/
│   │   ├── CadastroPaciente.tsx
│   │   ├── NovaConsultaScreen.tsx
│   │   └── ConsultasListScreen.tsx
│   ├── services/
│   │   ├── consultasService.ts     # criarConsulta / listarConsultas
│   │   └── dados.ts                # especialidades, médicos, horários
│   ├── utils/
│   │   ├── masks.ts                # máscaras de CPF, telefone, data
│   │   └── validation.ts           # validação de CPF, e-mail, telefone, data
│   └── theme.ts                    # paleta de cores
```

## Como executar

Pré-requisitos: **Node.js 18+** e o app **Expo Go** no celular
(ou um emulador Android/iOS).

```bash
npm install
npm start
```

Depois, escaneie o QR Code com o app Expo Go, ou pressione `a` (Android),
`i` (iOS) ou `w` (web) no terminal.

## Como testar

**CPF** — gere CPFs válidos em [4devs](https://www.4devs.com.br/gerador_de_cpf)

CPFs válidos de exemplo: `529.982.247-25`, `184.857.412-37`, `697.382.994-05`.

**Fluxo de atualização da lista:**
1. Abra "Minhas Consultas" e observe a quantidade atual.
2. Toque em "+ Nova" e agende uma consulta.
3. Confirme e volte — a nova consulta aparece na lista sem reiniciar o app.
