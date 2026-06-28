# HANDOFF — MED-UNIDAVI 2027

**Documento de transferência de contexto entre instâncias do Claude Design.**
Gerado em 27/04/2026 a partir de leitura direta dos arquivos do projeto.

Este documento existe para que uma nova thread, em conta ou ambiente diferente,
consiga retomar o trabalho sem precisar reconstruir o histórico de decisões.
Não é refatoração — é foto fiel do estado atual do código e das convenções
institucionais já ancoradas no projeto.

---

## 1. Estado atual — arquivos do projeto

### Código (13 arquivos)

| Arquivo | Linhas | Papel |
|---|---:|---|
| `MED-UNIDAVI 2027.html` | 330 | Shell principal. Carrega React 18 + Babel via CDN, importmap, define `TWEAK_DEFAULTS`, frames Desktop/Mobile, `AppInstance` com switch-case de 17 telas, `LoginAppInstance`, `App` com tweaks. Sidebar fixa na desktop, BottomNav no mobile. |
| `med-unidavi-components.jsx` | 357 | Design System (`DS`), `NAV_ITEMS` (14 itens), avatares de persona, `AIDisclaimer`, `Avatar` genérico, `CharacterChip`, `Badge`, `Card`, `Btn`, `ProgressBar`, `SectionHeading`, `Sidebar`, `BottomNav`, `TopBar`. |
| `med-unidavi-screens.jsx` | 1.580 | Telas principais: `LoginScreen`, `DashboardScreen`, `BibliotecaScreen`, `PPCScreen`, `TesteProgressoScreen`, `UniCardsScreen` (com cloze e painel UpToDate), `PlaceholderScreen`, `CoordenacaoScreen`, `DocenteScreen`. |
| `med-unidavi-iesc.jsx` | 213 | `IESCScreen` — Dra. Valle, família BSV-042 (Silva), território Bela Vista, link para Portfólio Reflexivo. |
| `med-unidavi-reflexivo.jsx` | 359 | `PortfolioReflexivoScreen` — 4 sub-telas (Dashboard, Nova reflexão com painel Gibbs lateral, Visualizar, Acompanhamento). Persona Dra. Uni. |
| `med-unidavi-ic.jsx` | 417 | `ICientificaScreen` — Hub com trajetória de 8 etapas (Despertar→Submissão), Literatura, Metodologia (5 templates: PRISMA, CONSORT, STROBE, GRADE, RoB-2), Repositório, NPCMed. Persona Dra. Uni. |
| `med-unidavi-morfofuncional.jsx` | 488 | `MorfofuncionalScreen` — Hub de fases (1ª–5ª), UC, Roteiro com 7 blocos (objetivos checkáveis, galeria, Uni-Cards, questões, bibliografia, reflexão para portfólio). |
| `med-unidavi-questoes.jsx` | 1.580 | `QuestoesScreen` ("Meu Treino") — 12 questões padrão ENAMED ABDC com justificativa por alternativa, 3 modos (livre, simulado cronometrado, revisão de erradas), painel UpToDate. |
| `med-unidavi-imagens.jsx` | 290 | `ImagensScreen` — Grid filtrável por 6 disciplinas, modal com metadados completos e vinculações, formulário de curadoria docente. |
| `med-unidavi-gerador.jsx` | 350 | `GeradorScreen` — Prof. Davi com modos Questões e Cards, fluxo Aprovar/Editar/Rejeitar/Revisão por par, indicador psicométrico. |
| `med-unidavi-eventos.jsx` | 290 | `EventosScreen` — calendário mensal + lista, 12 eventos em 6 categorias, detalhe com inscrição/material/feedback. |
| `tweaks-panel.jsx` | 419 | Painel inferior direito para alternar Light/Dark, Split/Desktop/Mobile, edição ao vivo do nome do usuário. |
| `pdf_viewer.html` | 25 | Visualizador auxiliar de PDF (utilitário, não roteado). |

### Assets (`/uploads/`)

Imagens das 5 personas: `Dr Capi.png`, `Dr capivara.png`, `Dra Uni.jpeg/png`, `Dra Valle.jpeg/png`, `Prof Davi.jpeg/png`. Manual de identidade UNIDAVI em PDF.

### Roteamento (em `MED-UNIDAVI 2027.html`)

`AppInstance` define 17 rotas via switch-case sobre `screen` state:

`dashboard`, `biblioteca`, `unicards`, `ppc`, `iesc`, `morfofuncional`,
`questoes`, `imagens`, `gerador`, `eventos`, `progresso`, `simdavi`,
`apcs`, `reflexivo`, `ic`, `coordenacao`, `docente`.

Default: `dashboard` (estado pós-login). Botão Login da navbar superior força
para a tela de entrada quando demonstrada.

---

## 2. Personas oficiais

A regra arquitetural fundamental: **personas vivem na identidade visual e no
naming, não nos prompts de instrução**. Os agentes têm rosto, nome e tom de
voz, mas as instruções funcionais que eles seguem são intercambiáveis e
atualizáveis sem retrabalho de identidade.

### Cinco personas em uso

| Persona | Função | Onde aparece | Avatar |
|---|---|---|---|
| **Dr. Capi** | Preceptor virtual de raciocínio clínico. Cuida do paciente — apoio à decisão clínica em todos os ciclos, ênfase no internato. | Login, Dashboard (header), SIM-Davi | `Dr Capi.png` |
| **Prof. Davi** | Gerador pedagógico. Cuida do aprendiz — produz Uni-Cards, questões padrão ENAMED, casos progressivos, materiais para conferência/TBL/CBL/CCBL. | Dashboard (recomendação), Tela Geração Assistida, Teste de Progresso | `Prof Davi.jpeg` |
| **Dra. Uni** | Assistente metodológica. Cuida do método e do acervo — Iniciação Científica, Portfólio Reflexivo, Biblioteca, voz institucional em comunicações da coordenação. | IC, Portfólio Reflexivo, SIM-Davi (facilitação), Biblioteca | `Dra Uni.jpeg` |
| **Dra. Valle** | Médica de família e comunidade. IESC — território Bela Vista, famílias acompanhadas, projetos de educação em saúde. | IESC | `Dra Valle.jpeg/png` |
| **Capivara Dr. Capi** | Mascote afetivo (não persona conversacional). Empty states, gamificação Uni-Cards estilo Duolingo (planejada), splash de carregamento. Tom acolhedor, nunca bajulatório ("pronto para começar?" ✓ "ótimo trabalho!" ✗). | Empty states de Uni-Cards, Portfólio Reflexivo, IC; splash | `Dr capivara.png` |

### Origem dos nomes

`Uni` + `Davi` = UNIDAVI. `Capi` é símbolo regional (capivara, fauna do Vale do
Itajaí). `Valle` referencia geografia local (Vale do Itajaí + Medicina de Família e
Comunidade). `Davi` é o nome bíblico que dá pareamento com Uni.

### Restrições de uso

A capivara é **mascote afetivo separado das três personas humanas**. Permanece
como elemento cultural (Atlética/Batucapi/Capi-in-Roça) e como reforço afetivo
em ambientes de estudo casual — nunca em interação clínica formal. **Não é
persona conversacional.**

---

## 3. Decisões de design ancoradas

### Paleta UNIDAVI oficial (`med-unidavi-components.jsx`, objeto `DS`)

| Token | Valor | Uso |
|---|---|---|
| `DS.blue` | `#023E88` (Pantone 7687C) | Azul primário UNIDAVI |
| `DS.blueAcc` | `#00ADEF` (Pantone 2995C) | Azul secundário, acentos, estados ativos |
| `DS.blueDark` | `#012D65` | Sidebar background |
| `DS.blueLight` | `#E6EDF8` | Fundos suaves, hover de seleção |
| `DS.blueMid` | `#0353B0` | Estados intermediários |
| `DS.terra` | `#C4622D` | Acento terracota — alertas pedagógicos, badges importantes |
| `DS.terraLight` | `#FDF0EA` | Background suave do terracota |
| `DS.green` | `#2A8A5C` | Sucesso, conceito "suficiente", concluído |
| `DS.greenLight` | `#E6F4ED` | Fundo do verde |
| `DS.amber` | `#B07A18` | Atenção, conceito "precisa melhorar" |
| `DS.amberLight` | `#FDF5E0` | Fundo do âmbar |
| `DS.bg` | `#F5F7FC` | Background geral |
| `DS.surface` | `#FFFFFF` | Cards, surfaces |
| `DS.border` | `#DDE3F0` | Bordas padrão |
| `DS.borderLight` | `#EEF1F8` | Bordas suaves |
| `DS.text` | `#1A2438` | Texto principal |
| `DS.textSec` | `#5A6480` | Texto secundário |
| `DS.textMuted` | `#8E97B0` | Texto auxiliar/labels |

### Tipografia

**IBM Plex Sans** carregada via Google Fonts. Pesos disponíveis: 300, 400, 500,
600, 700, 800. Itálico em 400. Stack fallback: `'IBM Plex Sans', sans-serif`.

### Raios e elevação

`DS.radius: '10px'` (padrão), `DS.radiusLg: '14px'`, `DS.radiusSm: '6px'`.
`DS.shadow: '0 1px 4px rgba(26,36,56,0.08)'`, `DS.shadowMd: '0 4px 16px rgba(26,36,56,0.10)'`.

### Padrão de Sidebar (desktop)

Componente `Sidebar` em `med-unidavi-components.jsx`. Background `blueDark`,
itens em coluna, ícone + label, item ativo destacado em `blueAcc`.
Logotipo MED-UNIDAVI no topo. Itens definidos em `NAV_ITEMS` (14 itens).

### Padrão de Cabeçalho de Tela (`TopBar`)

Componente `TopBar` em `med-unidavi-components.jsx`. Recebe `title`,
`subtitle`, `actions`, `isMobile`. Title em peso 700, tamanho ~22px;
subtitle em `textMuted` ~13px. Actions à direita (botões secundários).
Padding consistente (`24px 32px` desktop, `16px` mobile).

### Padrão de Avatar com Disclaimer

Cada persona digital aparece acompanhada do componente `AIDisclaimer` —
chip âmbar (`amberLight` background, `amber` texto) com texto curto
indicando que a persona é assistente digital, não substitui orientação
docente humana. Padrão estabelecido como contrato visual: onde houver
interação com IA, o disclaimer está presente e visível.

### BottomNav (mobile)

Substitui Sidebar em viewport ≤ 380px. 5 itens principais (Início,
Biblioteca, Uni-Cards, IESC, Eventos). Outras telas acessadas via
acesso rápido no Dashboard.

### Splash e empty states

`CapivaraDecorativa` (tamanho 80–160px) em empty states. Mensagens
acolhedoras, nunca bajulatórias. Ocupa no máximo 40% da altura da tela.

---

## 4. Componentes reutilizáveis

Todos em `med-unidavi-components.jsx`, exceto onde marcado.

### Avatares de persona

| Componente | Função |
|---|---|
| `CapivaraIcon` | Ícone pequeno (default 36px) — capivara estilizada com estetoscópio. Usado quando precisa do Capi compacto. |
| `CapivaraDecorativa` | Capivara grande (default 80px) — empty states, splash, gamificação. |
| `DaviAvatar` | Imagem do Prof. Davi (default 36px). |
| `UniAvatar` | Imagem da Dra. Uni (default 36px). |
| `ValleAvatar` | Imagem da Dra. Valle (default 36px). |
| `_PersonaImg` | Helper interno usado pelos avatares — circulariza, posiciona. |

### Componentes funcionais

| Componente | Função | Uso típico |
|---|---|---|
| `AIDisclaimer` | Chip âmbar padronizado de aviso de persona digital | Ao lado de qualquer interação com IA |
| `Avatar` | Avatar genérico com iniciais (alunos, docentes humanos) | Listas de tutorados, perfil do aluno |
| `CharacterChip` | Cartão pequeno com avatar + nome + subtítulo | Identificação de persona em headers |
| `Badge` | Pílula colorida com texto | Status, contagens, marcadores |
| `Card` | Container com sombra leve, padding, raio padrão | Blocos de conteúdo |
| `Btn` | Botão com variantes `primary`/`secondary`/`ghost` e tamanhos | Ações em todas as telas |
| `ProgressBar` | Barra de progresso fina (default 6px) | Progressão de fase, deck Uni-Cards, percentual de competência |
| `SectionHeading` | Cabeçalho de seção com título e ação opcional à direita | Estrutura de telas longas |
| `Sidebar` | Sidebar fixa lateral (desktop) | Layout principal |
| `BottomNav` | Navegação inferior (mobile) | Layout principal mobile |
| `TopBar` | Cabeçalho de tela com title/subtitle/actions | Início de cada tela |

### Helpers internos

`renderClozeFrente` em `med-unidavi-screens.jsx` (linha 781) — renderiza
texto Anki-style com `{{c1::...}}` na frente do Uni-Card.
`renderCloze` em `med-unidavi-gerador.jsx` (versão para o lado docente).

---

## 5. Decisões pedagógicas ancoradas

Estas decisões são **não-negociáveis** e devem ser respeitadas em qualquer
mudança futura no protótipo e na plataforma de produção.

### ENAMED ABDC

Padrão de questão objetiva: **4 alternativas (A, B, C, D), uma correta + três
distratores plausíveis**. Conforme Portaria MEC nº 413/2025. **NUNCA 5
alternativas. NUNCA "todas as anteriores", "nenhuma das anteriores", "a e c
estão corretas".**

Justificativa por alternativa é obrigatória — não apenas para a correta.
Pedagogicamente, o aluno precisa entender por que cada distrator está errado.

Implementado em `med-unidavi-questoes.jsx` (12 questões mock cobrem o padrão).

### Conceitos avaliativos UNIDAVI

**Suficiente / Precisa melhorar / Insuficiente** — três conceitos, sem nota
numérica em qualquer interface visível ao estudante. Heatmaps, matrizes
programáticas e barras de progresso usam estes três estados (com `pendente`
como quarto estado quando ainda não houve avaliação).

Implementado em `CoordenacaoScreen` (heatmap de competências).

**Discussão em curso na UNIDAVI:** retorno a notas numéricas. Não tratar como
decisão tomada — modelo de dados deve ser **agnóstico** ao tipo de escala
(`tipo_escala` como atributo da entidade Avaliação: `conceito_unidavi` |
`nota_numerica` | `nivel_dreyfus` | `nivel_ten_cate` | `percentual_tp`).

### Avaliação programática

Sistema longitudinal de coleta de evidências múltiplas por competência,
conforme Art. 36 da Resolução CNE/CES nº 3/2025. Cada competência recebe
evidências de várias fontes (questões respondidas, APCs, OSCEs,
reflexões, observações em tutoria, etc.) ao longo das 12 fases.

### 27 competências DCN 2025

A matriz programática institucional usa as **27 competências do Art. 8º da
Resolução CNE/CES nº 3/2025** (não 20). As competências ENAMED são distintas
(matriz de avaliação), e podem ser correlacionadas mas não substituídas.

⚠️ **Estado atual no código:** o protótipo ainda exibe 6 grandes domínios DCN
em `PPCScreen` (linhas 561–568) com agrupamento simplificado. Isto é
**simplificação visual** para o protótipo atual, **não a estrutura
institucional correta**. A matriz canônica de 27 competências precisa ser
incorporada quando a próxima rodada de mudanças tocar em PPC, Coordenação
ou Perfil do Aluno.

Agrupamento por área-eixo do Art. 6º:
- **Atenção à Saúde** (~18 competências)
- **Gestão em Saúde** (~7 competências)
- **Educação em Saúde** (~2 competências, mais articulações secundárias)

O agrupamento competência → área-eixo é interpretativo (Art. 8º não faz
mapeamento explícito) e requer validação NDE.

### Área Verde DCN 2025

Tempo protegido para estudo autônomo, atividades extracurriculares e
bem-estar. Aparece visualmente no Dashboard como bloco diferenciado, com
tooltip explicativo (texto literal em `med-unidavi-screens.jsx:302`). Sistema
não programa atividade nem envia notificação dentro desse intervalo.

### FSRS (não SM-2)

Algoritmo de espaçamento dos Uni-Cards: **FSRS** (Free Spaced Repetition
Scheduler), não SM-2. FSRS supera SM-2 em estudos comparativos recentes e é
o algoritmo de referência adotado pelo projeto Anki nativamente desde 2024.

Interface mantém os 4 botões: "Não lembrei" / "Difícil" / "Lembrei" / "Fácil"
(implementado em `UniCardsScreen`).

### Sem ensino remoto em Medicina

**Ensino remoto é proibido em Medicina no Brasil.** Sem links Zoom para aula,
sem transmissão. Material assíncrono pós-aula é permitido como apoio
(slides, vídeos curtos de revisão), nunca como substituição.

### APC × Logbook — escalas distintas

- **APC** (Atividade Profissional Confiabilizadora) usa **Dreyfus 1–5**
  (novato, iniciante avançado, competente, proficiente, perito) — avalia
  desempenho de competência em observação estruturada.
- **Logbook** procedimental usa **Ten Cate 1–4** (níveis de supervisão) —
  registra autonomia atingida em ato profissional discreto, ao longo do
  tempo.

Não confundir.

### Padrão Uni-Card

Verso em **4 blocos verticais obrigatórios**:
1. Resposta-síntese em negrito, uma linha
2. Justificativa breve (2–4 linhas) ancorada em prática clínica atual
3. Referência abreviada (livro-texto + ano, ou diretriz brasileira)
4. Tags estruturais (Fase, UC, SP, sub-tema, disciplina)

Botão "Aprofundar" no verso abre painel lateral mockando UpToDate.
Suporte a cloze deletion (`{{c1::...}}`).

Implementado em `UniCardsScreen` (linhas ~790-1056).

### Curadoria docente obrigatória

Todo conteúdo gerado por IA passa por validação humana antes de publicação.
Status `pendente → curado` por ação humana. Nada chega ao "Meu Treino" do
aluno sem revisão. Implementado conceitualmente em `GeradorScreen` (fluxo
Aprovar/Editar/Rejeitar/Revisão por par).

### Captura de dados como fundamento

Toda interação registra evento estruturado em log institucional desde o dia
1 do go-live, sem ação manual do estudante. Indexado por estudante (ID
interno, jamais nome), tipo de interação, entidade alvo, resultado,
timestamp, contexto. Não é recurso opcional — é camada invisível obrigatória.

### Padrão visual ABDC

Heatmaps de competências: **suficiente (verde) / precisa melhorar (amarelo) /
insuficiente (vermelho) / pendente (cinza)**. Acessibilidade WCAG AA
obrigatória — contraste e texto alternativo em todas as células.

---

## 6. Selos de pendência presentes no protótipo

Estes selos foram colocados no código para indicar funcionalidades
codificadas porém não totalmente operacionais. **Importante:** a UNIDAVI
decidiu **implantação plena, não em ondas**. Os selos atuais no código
refletem versão anterior dessa decisão e devem ser substituídos no próximo
ciclo de mudanças.

### Inventário de selos atuais

| Arquivo | Linha | Selo atual |
|---|---:|---|
| `med-unidavi-screens.jsx` | 289 | "clicável em Onda 1" (alert quando bloco não navegável é clicado) |
| `med-unidavi-screens.jsx` | 506 | "Busca federada em Onda 1" (Biblioteca) |
| `med-unidavi-screens.jsx` | 1064 | Badge "Em desenvolvimento — Onda 1" (PlaceholderScreen) |
| `med-unidavi-iesc.jsx` | 203 | "Agente IA Valle (interação conversacional) em desenvolvimento — Onda 2" |
| `med-unidavi-reflexivo.jsx` | 354 | Pílula "Em desenvolvimento — Onda 2" (Acompanhamento) |
| `med-unidavi-ic.jsx` | 411 | Pílula "Em desenvolvimento — Onda 2" (NPCMed) |
| `med-unidavi-morfofuncional.jsx` | 197 | "Microscopia virtual e modelos 3D na Onda 2. Jogos sérios morfofuncionais previstos para Onda 3." |
| `med-unidavi-morfofuncional.jsx` | 454–456 | Selo no rodapé "Microscopia virtual e modelos 3D — previstos para Onda 2" |
| `med-unidavi-imagens.jsx` | 262 | "Upload de imagem — placeholder Onda 1" |
| `med-unidavi-gerador.jsx` | 298 | "Upload PDF (Onda 2)" |

### Modelo de visibilidade decidido

A próxima rodada de mudanças deve substituir o vocabulário "Onda X" por
**status operacional explícito**:

- **OPERACIONAL** — funcionalidade pronta, ativa para o usuário no go-live
- **OCULTO POR FEATURE FLAG** — codificado mas escondido até critério
  institucional ser cumprido. Cada flag tem critério escrito (ex.: "validação
  de 50 cards pela Profa. Paola"; "convênio formalizado com STT/UFSC";
  "decisão NDE sobre matriz programática")

Toda funcionalidade prevista entra no modelo de dados desde o início. Diferença
entre OPERACIONAL e OCULTO é apenas de visibilidade ao usuário, não de
existência arquitetural.

---

## 7. Estado de telas — síntese

| Tela | Status | Observação |
|---|---|---|
| Login | Operacional | Tela de entrada, usada quando navbar superior força |
| Dashboard | Operacional | Calendário Semana Padrão clicável + Área Verde + acesso rápido |
| Biblioteca | Operacional com placeholder | Busca federada com selo "Onda 1" — substituir |
| Uni-Cards | Operacional | Padrão final de verso 4 blocos + cloze + UpToDate + 5 cards mock |
| Meu Percurso (PPC) | Operacional com simplificação | Mostra 6 domínios DCN — substituir por matriz de 27 |
| IESC | Operacional | Família BSV-042, território Bela Vista, persona Valle |
| Morfofuncional | Operacional | Hub fases 1ª–5ª, 7 blocos por roteiro, mock UC1 1ª fase |
| Meu Treino (Questões) | Operacional | 12 questões padrão ABDC, 3 modos, painel UpToDate |
| Banco de Imagens | Operacional | Grid 6 disciplinas, modal metadados, curadoria |
| Gerador Davi | Operacional | Modos Questões e Cards, fluxo curadoria por par |
| Eventos | Operacional | Calendário mensal + lista, 12 eventos em 6 categorias |
| Teste de Progresso | Operacional | Recomendação Prof. Davi |
| SIM-Davi | Placeholder | Persona Dra. Uni anunciada, lógica conversacional pendente |
| Portfólio APCs | Placeholder | Texto descritivo, sem implementação |
| Portfólio Reflexivo | Operacional | 4 sub-telas com painel Gibbs, persona Uni |
| Iniciação Científica | Operacional | Hub 8 etapas, Literatura, Metodologia, Repositório, NPCMed placeholder |
| Coordenação | Operacional | Heatmap de competências, painel Saúde do Banco, painel Atividades de Treino |
| Docente | Operacional | Painel do Tutor com 6 tutorados, APCs pendentes, conteúdo Davi a validar |

---

## 8. Pendências conhecidas para o próximo ciclo

### Críticas (afetam reunião técnica com programador Caio)

- **Sidebar contextual por perfil:** hoje é única (estudante). Coordenação e
  Docente herdam-na, gerando confusão visual de perfil. Mudança: cor de
  cabeçalho diferente por perfil (Coordenação navy escuro, Docente teal
  escuro, Estudante teal claro), itens próprios da sidebar para cada perfil,
  selo "VISÃO COORDENAÇÃO" / "VISÃO DOCENTE" no topo.

- **Tela Perfil do Aluno (drilldown longitudinal):** não existe ainda.
  Acessada de Docente (clicar em tutorado) e Coordenação (drilldown). 9 blocos:
  cabeçalho com vinculações de subturma, matriz programática 27 competências
  × semestres, trajetória de UCs, APCs com Dreyfus, resumo Portfólio,
  atividade de treino mensal, IESC e extensão, IC, profissionalismo
  longitudinal (P-MEX, MSF, incidentes — bloco discutido como captura
  longitudinal, não decisão de progressão).

- **Refinos do Painel do Tutor:** cards clicáveis para Perfil do Aluno,
  sparkline TP histórico, Dreyfus médio, tendência da turma sob tutoria,
  reflexões aguardando devolutiva, alertas atitudinais com triangulação.

- **Refinos da Coordenação:** drilldown clicável no heatmap por fase, busca
  de aluno específico, matriz programática institucional 27 × 12 com
  agregação por estado.

### Estruturais (modelo de dados)

- **Subturmas:** Tutorial com 3 ou 4 subgrupos por fase, IESC com 5–6
  alunos por preceptor (rotativos), Habilidades em Turma A / Turma B,
  Ambulatórios e Internato em duplas/trios com rodízios complexos. Modelo
  precisa de entidade `AlocacaoSubturma` versionada e curada pelo
  coordenador de fase. Não automatizar.

- **Turmas T07–T18:** numeração regressiva por fase. T18 = 1ª fase, T07 =
  12ª fase. Ingresso semestral. Filtros da Coordenação devem usar `Tnn` ou
  ano de ingresso.

- **Versionamento curricular:** PPC 2023 (DCN 2014) vigente por tempo
  indeterminado. DCN 2025 em discussão sem cronograma. Plataforma deve
  suportar dois currículos simultaneamente quando a transição começar.

### Iniciação Científica

- **NPCMed multi-área:** Cardiologia (Profa. Caroline Bacca como autora-
  âncora), Pediatria/Perinatologia (Marlou Dalri, Samantha Lopes),
  Psiquiatria (José Eduardo Dagostini, Mariana Celli). Operação por três
  doutoras não-médicas (Profas. Franciani, Samantha, Alinne) — interlocução
  primária com Franciani. Caroline a ser formalmente convidada à linha de
  pesquisa.

- **Catálogo de Orientadores** com vagas por semestre, áreas, produção
  recente.

- **Pareamento clínico-metodologista** como funcionalidade explícita
  (sugestão automática de co-orientação metodológica).

- **Trilha dual:** TC obrigatório para todos vs. trilha de excelência NPCMed
  com seleção. Decisão Caminho B em discussão, não consolidada.

- **Vitrine institucional de produção científica** — argumento institucional
  para reitoria/MEC/parceiros. Editorial Circulation citando trabalho do
  Bagattoli, prêmio Walter Schmidt 2025, Heart/BMJ, etc.

### Atitudinal longitudinal

- **Captura sistemática nas fases anteriores ao checkpoint do 4º ano** — sem
  trilha documental contínua, decisão atitudinal vira armadilha.
- Instrumentos: P-MEX em Tutorial PBL e IESC, MSF por ciclo, registros de
  incidente crítico, auto-avaliação no Portfólio Reflexivo.
- Triangulação obrigatória: status atitudinal só com convergência multi-fonte.
- Decisão consolidada: **atitudinal NÃO entra como decisão de progressão no
  checkpoint** — performado em estação OSCE no checkpoint, e como peça
  longitudinal formativa no Perfil do Aluno alimentando a competência
  Profissionalismo.

### Espaços arquiteturais reservados (modelo de dados, sem UI)

- Logbook do internato (Ten Cate 1–4 por procedimento)
- OSCE Digital (banco de estações + aplicação tablet + devolutiva)
- Trilha Saúde Digital / Telemedicina (DCN 2025; integração STT/UFSC quando
  formalizado)
- Microscopia virtual e modelos 3D no Morfofuncional
- Jogos sérios morfofuncionais
- Aba Extensão e Ligas (curricularização da extensão, Resolução CNE/CES
  7/2018)
- Pipeline NPCMed de candidatos com sinais de engajamento metodológico
- Chat contextual com Dra. Uni sobre projeto de TC em curso
- Adequação curricular DCN 2025 (sem cronograma)

---

## 9. Decisões institucionais transversais

- **Programador único:** Caio (terceirizado pela UNIDAVI). Comunicação direta
  com Itairan, sem intermediação da TI institucional. Entregas modulares
  por feature flag.
- **Coordenação adjunta:** Prof. Me. Itairan da Silva Terres (médico
  endocrinologista, bioeticista). Coordenador titular: Prof. Luís Eduardo
  Mendes Zanis.
- **NDE** valida decisões pedagógicas. Sem cronograma para adequação DCN 2025.
- **Curso:** 411 alunos em 12 fases, currículo PBL/CBL/TBL/CCBL, meta
  Conceito 5 ENAMED.
- **Infraestrutura institucional:** Google Workspace for Education
  consolidado. SSO Google institucional `@unidavi.edu.br` previsto para
  autenticação da plataforma.
- **Bibliotecas assinadas:** UpToDate, ScienceDirect, Minha Biblioteca,
  EBSCO. Acesso CAPES limitado ao público.
- **LGPD em primeiro lugar:** captura indexada por ID interno, jamais nome
  completo nos logs operacionais. Alt text obrigatório em imagens. Política
  de retenção a definir com TI.

---

*Fim do HANDOFF.*

*Documento elaborado a partir de leitura direta dos arquivos do projeto e da
memória consolidada das discussões institucionais. Versão de 27/04/2026.*
