# HANDOFF — MED-UNIDAVI 2027

**Documento de transferência de contexto entre instâncias do Claude Design.**
Atualizado em **14/05/2026** (rodada Adição V2) a partir de leitura direta
dos arquivos do projeto. Versão anterior: 27/04/2026; atualização interna
em 14/05/2026 (foto) e nesta data (integração das ferramentas novas).

Este documento existe para que uma nova thread, em conta ou ambiente
diferente, consiga retomar o trabalho sem reconstruir o histórico de
decisões. Não é refatoração — é foto fiel do estado atual do código e das
convenções institucionais já ancoradas no projeto.

---

## 0. O que mudou desde 27/04/2026

Resumo das adições e refatorações entre a versão anterior deste documento e
o estado atual:

- **Bloco F · Integração App-SAM** (nov.): novo módulo `med-unidavi-sam.jsx`
  com Vitrine SAM (grid + modal), fluxo nativo de Submissão SAM em 4 passos
  e componente "Meus Trabalhos" injetado no Bloco IC do Perfil do Aluno.
- **Perfil do Aluno · drilldown longitudinal** (nov.): existe agora em 3
  arquivos (`med-unidavi-perfil-aluno.jsx`, `-p2.jsx`, `-screen.jsx`), com
  9 blocos verticais, mock João Melo (T14, 5ª fase).
- **DCN 2025 — matriz canônica 27 competências** (nov.): arquivo
  `med-unidavi-dcn27.jsx` com slugs canônicos `dcn2025_comp_01..27` e
  agrupamento por área-eixo (Atenção / Gestão / Educação).
- **Coordenação refinada** (nov.): blocos do Item 15 em
  `med-unidavi-coordenacao-blocos.jsx` (filtros globais, busca de aluno,
  drilldown de fase, matriz institucional 27 × 12).
- **IC reformulada** (nov.): Hub com modalidade dual (TC × Trilha NPCMed),
  Catálogo de Orientadores com vagas e produção, NPCMed com governança
  operacional explícita (Franciani / Samantha / Alinne) e 3 linhas (Cardio
  · Pedi/Perinato · Psiquiatria) e duas abas (Trajetória do Aluno ·
  Produção da Linha).
- **Canal de Comunicação Institucional · FAB global** (nov.):
  `med-unidavi-canal.jsx` — 4 caminhos (Tutoria · Coordenação · Suporte
  técnico · Atendimento UNIDAVI).
- **Capi-Chat contextual** (nov.): `med-unidavi-capi-chat.jsx`. Painel
  lateral discreto habilitado nas telas Questões · IC · Reflexivo ·
  Consulta Virtual · Morfofuncional. Separado do FAB de Comunicação.
- **Prática Clínica** (nov.): `med-unidavi-pratica-clinica.jsx` substitui
  o antigo "SIM-Davi" como hub de 3 modalidades de paciente virtual
  (Consulta · Preceptor · Round). Todas em desenvolvimento.
- **Vitrine Institucional** (stub): tela top-level mínima em
  `med-unidavi-vitrine.jsx`.
- **Sistema de personas reduzido** (rev. mai/2026): UMA identidade visual
  conversacional — **Capi**, com prop `modo` (`treino`/`clinico`). Os nomes
  "Davi", "Uni" e "Valle" foram **descontinuados como personas**; aliases
  retrocompat continuam funcionando para call sites antigos.
- **Dr capivara.png ↔ Dr Capi.png**: dois sprites do Capi — `treino`
  (afetivo) e `clinico` (sóbrio, com estetoscópio — o Dr. Capi v4.6
  conhecido pelos 120 internos no Gemini).
- **Decisão "ondas" descontinuada** (parcial): selos antigos "Onda 1/2/3"
  permanecem em alguns lugares e devem migrar para `Em desenvolvimento` /
  `OPERACIONAL` / `OCULTO POR FEATURE FLAG` (ver §6).

---

## 0.b O que mudou em 14/05/2026 (rodada Adição V2)

Integração das ferramentas novas descritas no **MED-UNIDAVI Canônico V2 —
Adição** (Partes 1 a 4; Parte 5 fora de escopo). Resumo:

### Limpeza de base
- `411 → 410` alunos (cancelamento mai/2026).
- CIEPE atualizado: Congresso **Integrado** (não "Interno"), XVI edição,
  20–21/mai/2026, contato `ciepe@unidavi.edu.br`, 15 cadernos.
- Faculty real: `Rodrigo Pires` → `Diego Hauck` (nome regional plausível,
  sem conflito); `Paola Lima` já estava em uso.
- Vocabulário ENAMED canônico: `Conceito ENADE` → `Conceito ENAMED` em
  todas as ocorrências de copy (Vitrine, Eventos). Vocabulário "Faixa" /
  "20 competências" / "Cutoff 85%" — auditoria por grep: **zero
  ocorrências preexistentes**, nada a corrigir.
- Selos "Onda 1/2/3" — auditoria por grep: **zero ocorrências em arquivos
  vivos**. Migração já estava completa (HANDOFF §6 estava prospectivo).
  Tabela §6 reescrita para refletir auditoria.
- Personas descontinuadas (Davi/Uni/Valle) em copy visível: **zero
  ocorrências**. Aliases retrocompat (`DaviAvatar/UniAvatar/ValleAvatar`)
  permanecem só no código.

### PPCScreen → matriz DCN27 canônica
- `med-unidavi-screens.jsx`: variável morta `dcns = [{dom:'I'...}]`
  removida. PPCScreen já consumia `DCN27` desde rodada anterior — o
  problema real estava no heatmap da Coordenação.
- `CoordenacaoScreen`: heatmap "6 domínios" (Atenção, Gestão, Educação,
  Saúde da Família, Comunicação, Tecnologia — inventados) substituído por
  **agregação institucional das 27 competências em 3 áreas-eixo do Art.
  6º**. Cada linha mostra contagem + mini stacked bar com distribuição
  entre os 4 estados + drilldown `{tipo:'area'}`.

### Bloco B — telas P0
- **B1 · Matriz Competência** (`med-unidavi-matriz-competencia.jsx`).
  Tela top-level + sub-rotas `coord-comp` (persona=coord) e `doc-matriz`
  (persona=tutor). Gráfico SVG de dispersão com 27 bolhas DCN, eixo X =
  volume, eixo Y = proficiência APC Dreyfus, tamanho = peso composto
  (`DCN27_PESOS`, mock 0.30–0.95, aguarda NDE). Mediana **dinâmica** da
  turma, não 50/50 fixo. 4 quadrantes nomeados (Prioridade / Atenção /
  Confirmar / Domínio). Faixa "não avaliado" semitransparente no rodapé
  para bolhas sem APC. Painéis específicos por persona (Aluno: sugestão
  Capi com top-3; Tutor: lista de alunos em Atenção; Coord: gap curricular
  + trajetória longitudinal 6×12 amostra). Selo permanente "v1.0 ·
  CALIBRAÇÃO EM CURSO".
- **B2 · Dashboard ENAMED** (`med-unidavi-dashboard-enamed.jsx`). Sub-rota
  `coord-enamed`. Item novo na sidebar `NAV_ITEMS_COORD`. Opera nas
  **15 competências da Portaria 478** (distinto da Matriz Competência das
  27 DCN). Indicador principal "N alunos não-proficientes na coorte
  ativa". Banda visual C1–C5 com marcador do curso hoje (C4·82%) +
  projeção da coorte ativa. Listagem nominal ordenada por nota com
  semáforo binário. Histórico de Conceitos C1–C5 dos últimos 4 anos.
  Alternância entre coortes 2027/2028.
- **B3 · Status ENAMED no Perfil** (`med-unidavi-bloco-enamed.jsx`).
  Novo bloco entre APCs (B4) e Portfólio Reflexivo (B5). Nota projetada
  (0–100, mock TRI), selo binário PROFICIENTE/NÃO-PROFICIENTE, distância
  para corte 60 (assinada), sparkline 3 pontos com linha tracejada no
  corte, coorte ENAMED prevista (`enamedCoorteFromFase`).
  **Restrição UX preservada:** status do aluno é **binário** — sem
  Faixa/Conceito individual.

### Bloco C — Hub SP/UC
- `med-unidavi-hub-spuc.jsx`. Rota `hub-spuc`. Generaliza o "Roteiro com 7
  blocos" do Morfofuncional para qualquer SP/UC das fases 1–8. 4 SPs mock
  (1ª, 3ª, 5ª, 7ª fase). Restrições curriculares respeitadas:
  morfofuncional só em f01–f05; casos clínicos integrados só em f04+.

### Bloco D — telas P1
- **D1 · Simulado auto-aplicado**
  (`med-unidavi-simulado-autoaplicado.jsx`). Rota `simulado`.
  3 presets (ENAMED completo 60q/4h · ENAMED-mini 30q/2h · Flash 10q/20m)
  + sliders custom. Distribuição automática por área Portaria 478. Execução
  com cronômetro, navegação por grid de bolinhas, 4 alternativas ABDC.
  Feedback agregado por competência ENAMED 15 + por área, semáforo
  verde/amarelo/vermelho. **Sem peso institucional**, não vai para Status
  ENAMED.
- **D2 · Missão da Semana** (`med-unidavi-missao-semana.jsx`). Rota
  `missao-semana`. Opt-in. Plano semanal a partir de agenda da fase +
  lacunas da Matriz Competência + próximas avaliações. 13 itens em 6 dias
  úteis + Área Verde no domingo bloqueada. Itens curriculares fixos
  (tutorial, IESC, TP) bloqueados com cadeado.
- **D3 · Capi-Pílulas** (`med-unidavi-capi-pilulas.jsx`). Rota `pilulas`.
  6 stories de 30–90s no formato 9:14 (instagram-like), player com
  progress bars no topo, auto-advance, navegação por tap (esquerda/direita)
  e teclado. Maior densidade em f01–f05.
- **D4 · Trilhas de Habilidade** (`med-unidavi-trilhas-habilidade.jsx`).
  Rota `trilhas`. **Trilha de Onboarding PBL** em destaque permanente
  (terracota, 1ª fase, 6 lições). Catálogo de 5 trilhas adicionais (ECG no
  plantão, SPIKES, OARS, Prescrição segura, Busca PubMed). Filtros: Todas /
  Em curso / Recomendadas.
- **D5 · Anotações contextuais** (`med-unidavi-anotacoes.jsx`).
  **Componente transversal**, não tela isolada — `<AnotacaoChip>` pluga em
  qualquer objeto (questão, caso, SP, conferência, flashcard, pílula).
  Rota `notas` é só a vitrine + busca full-text + filtros por tipo. Suporta
  `timestamp` para marcação em vídeo. 6 anotações mock.
- **D6 · Cobertura do banco · Portaria 478**
  (`med-unidavi-cobertura-banco.jsx`). Sub-rota `coord-banco`
  (substitui placeholder anterior). Mapa de calor 7 áreas × 15 competências
  com borda tracejada vermelha nas células zeradas. Filtros por cenário /
  área / competência. Card de "células sem cobertura" com CTA "Pautar
  produção".

### Bloco E — stub apenas
- **E1 · Fórum por objeto pedagógico** (`med-unidavi-forum.jsx`). Rota
  `forum`. Stub "Em desenvolvimento · feature flag" com critério de
  ativação escrito (moderação institucional, política NDE, denúncia LGPD).

### Pendências internas concluídas (HANDOFF §6/§8)
- **F2 · Tela transacional do preceptor preenchendo APC**
  (`med-unidavi-apc-avaliacao.jsx` + `med-unidavi-apc-formulario.jsx`).
  Sub-rota `doc-aval`. Régua Dreyfus 1–5 por competência (cards com
  descrição canônica de cada nível), comentário por competência, devolutiva
  narrativa estruturada, evidências anexáveis (obs. estruturada, mini-CEX,
  DOPS, áudio, vídeo, foto, prontuário), notas privadas para coordenação
  (LGPD), resumo agregado (n competências, Dreyfus médio, evidências). Botão
  "Submeter ao aluno" só habilita com tudo preenchido. Submissão alimenta
  o eixo Y da Matriz Competência (B1) e o Bloco APCs do Perfil.
- **F3 · Heatmap GitHub-style 365 dias** no Bloco 6 do Perfil do Aluno
  (substitui as 12 barras mensais). Síntese determinística a partir dos
  totais mensais existentes; 12% dos dias úteis e 35% dos fins de semana
  são "descanso"; variabilidade ±60%. 5 níveis de cor. 5 KPIs agregados
  (cards revisados, dias ativos, sequência atual, maior sequência, pico).
  Alerta de queda formativa preservado.

### Pendências F6–F10 (modelo de dados, sem UI)
Conforme decisão institucional, entram no modelo de dados como **OCULTO
POR FEATURE FLAG**, sem UI nesta rodada:
- F6 · Logbook do internato (Ten Cate 1–4)
- F7 · OSCE Digital (banco de estações + aplicação tablet + devolutiva)
- F8 · Trilha Saúde Digital / Telemedicina (DCN 2025; integração STT/UFSC)
- F9 · Microscopia virtual e modelos 3D no Morfofuncional
- F10 · Aba Extensão e Ligas (curricularização da extensão, CNE/CES 7/2018)

Critério para destravar: ver §6 (modelo de visibilidade).

### Sidebar Coord — itens adicionados
- `coord-comp` (Por Competência) — antes só visual, agora aponta para
  Matriz Competência B1.
- `coord-enamed` (ENAMED) — item novo, B2.
- `coord-banco` (Saúde do Banco) — agora aponta para Cobertura Banco D6.

### Sidebar Doc — item adicionado
- `doc-matriz` (Matriz Competência) — persona=tutor da B1.

---

## 1. Estado atual — arquivos do projeto

### Código (23 arquivos JSX/HTML)

| Arquivo | Linhas | Papel |
|---|---:|---|
| `MED-UNIDAVI 2027.html` | 388 | Shell principal. React 18 + Babel via CDN, `TWEAK_DEFAULTS`, frames Desktop/Mobile, navbar superior demo, `AppInstance` com switch-case de telas + sub-rotas `coord-*` e `doc-*`, FAB de Canal e Capi-Chat globais. |
| `med-unidavi-components.jsx` | 490 | Design System (`DS`), `NAV_ITEMS`, helper `_PersonaImg` (com fallback `__resolveAsset` p/ standalone), `CapivaraDecorativa({modo})`, aliases `CapiAvatar/UniAvatar/ValleAvatar/DaviAvatar` (todos → Capi), `AIDisclaimer`, `Avatar`, `Badge`, `Card`, `Btn`, `ProgressBar`, `SectionHeading`, `Sidebar` (com `profile`), `BottomNav`, `TopBar` (com `breadcrumb`). |
| `med-unidavi-components.standalone.jsx` | 465 | Variante usada na exportação standalone (com `__resolveAsset` integrado). |
| `med-unidavi-dcn27.jsx` | 108 | Matriz canônica das 27 competências DCN 2025. Slugs `dcn2025_comp_01..27`, área-eixo Atenção/Gestão/Educação, texto resumo + referência legal. |
| `med-unidavi-coordenacao.jsx` | 370 | `CoordenacaoScreen` (heatmap institucional, Saúde do Banco, Atividades de Treino, drilldown por fase). |
| `med-unidavi-coordenacao-blocos.jsx` | 369 | Blocos do Item 15: filtros globais (Turma T07–T18 / Fase / Status / Competência), busca de aluno autocomplete, drilldown de fase (modal), matriz institucional 27 × 12. |
| `med-unidavi-screens.jsx` | 1.903 | Telas principais: `LoginScreen`, `DashboardScreen`, `BibliotecaScreen`, `PPCScreen`, `TesteProgressoScreen`, `CapiCardsScreen` (Anki cloze + UpToDate), `PlaceholderScreen`, `DocenteScreen`. |
| `med-unidavi-iesc.jsx` | 201 | `IESCScreen` — território Bela Vista, família BSV-042, link p/ Portfólio Reflexivo. Sem persona humana (rev. mai/2026). |
| `med-unidavi-reflexivo.jsx` | 372 | `PortfolioReflexivoScreen` — 4 sub-telas (Dashboard, Nova reflexão com painel Gibbs, Visualizar, Acompanhamento). Capi `modo=treino` em empty states. |
| `med-unidavi-ic.jsx` | 871 | `ICientificaScreen` reformulada — Hub modal (TC × Trilha NPCMed) com trajetória contextual, Catálogo de Orientadores (vagas/produção/co-orientação), Literatura, Metodologia (PRISMA/CONSORT/STROBE/GRADE/RoB-2), Repositório (visibilidade dual), NPCMed (governança + duas abas: Trajetória/Produção). Atalhos p/ Vitrine SAM e Submissão SAM. |
| `med-unidavi-sam.jsx` | 786 | **Bloco F.** Vitrine SAM (grid + filtros edição/fase/linha + modal de pôster com resumo estruturado, áudio do autor, ancoragem regional, submissão externa, DOI), Submissão SAM (4 passos: Tipo → Conteúdo → Pré-visualização → Validação) com 4 estados (rascunho / em revisão / aprovado / devolvido), e `MeusTrabalhosSAM` para uso no Perfil. |
| `med-unidavi-morfofuncional.jsx` | 510 | `MorfofuncionalScreen` — Hub fases 1ª–5ª, UC, Roteiro com 7 blocos (objetivos checkáveis, galeria, Capi-Cards, questões, bibliografia, reflexão p/ portfólio). |
| `med-unidavi-perfil-aluno.jsx` | 503 | **Drilldown longitudinal — Parte 1.** Mock JOAO_MELO. Blocos 1–4: Cabeçalho, Matriz programática 27 × N, Trajetória de UCs, APCs com Dreyfus. |
| `med-unidavi-perfil-aluno-p2.jsx` | 415 | **Parte 2.** Blocos 5–9: Portfólio Reflexivo (resumo), Atividade de treino 12 meses, IESC e Extensão, Iniciação Científica (com `MeusTrabalhosSAM` ao final), Profissionalismo longitudinal. |
| `med-unidavi-perfil-aluno-screen.jsx` | 152 | Orquestrador `PerfilAlunoScreen` — accordion mobile, recebe `alunoId`/`origem`/`onVoltar`/`onNavigate`. |
| `med-unidavi-canal.jsx` | 170 | **FAB global Canal de Comunicação.** Bottom-right em todas as telas exceto Login. 4 caminhos por perfil. Cada acionamento registra evento. |
| `med-unidavi-capi-chat.jsx` | 120 | **Capi-Chat contextual.** Painel lateral discreto, separado do FAB de Comunicação. Telas habilitadas: Questões, IC, Reflexivo, Consulta Virtual, Morfofuncional. Disclaimer permanente. |
| `med-unidavi-questoes.jsx` | 638 | `QuestoesScreen` ("Meu Treino") — 12 questões padrão ENAMED ABDC, 3 modos (livre, simulado cronometrado, revisão de erradas), painel UpToDate. |
| `med-unidavi-imagens.jsx` | 314 | `ImagensScreen` — grid filtrável por disciplinas, modal de metadados, formulário de curadoria. |
| `med-unidavi-gerador.jsx` | 402 | `GeradorScreen` — Gerador Pedagógico. Modos Questões/Cards, fluxo Aprovar/Editar/Rejeitar/Revisão por par, indicador psicométrico. |
| `med-unidavi-eventos.jsx` | 348 | `EventosScreen` — calendário mensal + lista, 12 eventos em 6 categorias, detalhe com inscrição/material/feedback. |
| `med-unidavi-vitrine.jsx` | 69 | `VitrineScreen` — stub mínimo "Em construção" da Vitrine Institucional pública. |
| `med-unidavi-pratica-clinica.jsx` | 99 | `PraticaClinicaScreen` — hub Capi com 3 stubs (Consulta · Preceptor · Round). Substitui o antigo "SIM-Davi". |
| `tweaks-panel.jsx` | 420 | Painel inferior direito (Light/Dark, Split/Desktop/Mobile, nome do usuário). |
| `pdf_viewer.html` | 26 | Visualizador auxiliar de PDF. |

### Arquivos derivados (não-fonte)

| Arquivo | Função |
|---|---|
| `MED-UNIDAVI 2027 (standalone).html` | Bundle único auto-contido (~11 MB) — todos os JSX, fontes, imagens embarcadas via blob URLs. Funciona offline. |
| `MED-UNIDAVI_2027_standalone*_src.html` | Sources do bundler (com `<meta name="ext-resource-dependency">` e shim `__resolveAsset`). |
| `MED-UNIDAVI 2027-pptx.html` / `-print.html` | Variantes para exportação. |
| `MED-UNIDAVI-2027-30abr2026.html` | Snapshot histórico (não tocar). |

### Assets (`/uploads/`)

- `Dr Capi.png` — Capi modo clínico (estetoscópio, sóbrio).
- `Dr capivara.png` — Capi modo treino (afetivo, gamificação).
- `Dra Uni.jpeg/png`, `Dra Valle.jpeg/png`, `Prof Davi.jpeg/png` — sprites
  legados das personas humanas descontinuadas. Mantidos para retrocompat
  (aliases de avatar) e bundling do standalone.
- Manual de identidade UNIDAVI em PDF.

### Roteamento (em `MED-UNIDAVI 2027.html`)

`AppInstance` roteia por `screen` state (switch-case) + duas sub-famílias
prefixadas:

- `coord-*` → `CoordenacaoScreen` com `subRoute`
- `doc-*`   → `DocenteScreen` com `subRoute`

Telas top-level: `dashboard`, `biblioteca`, `capi-cards`, `ppc`, `iesc`,
`morfofuncional`, `questoes`, `imagens`, `gerador`, `eventos`, `progresso`,
`simdavi` (placeholder), `pratica`, `apcs` (placeholder), `reflexivo`,
`ic`, `vitrine`, `coordenacao`, `docente`, `perfil-aluno`.

Default: `dashboard` (estado pós-login).

Helpers globais expostos por `AppInstance` na desktop:
- `window.__setScreen(id)` — pulo entre telas via navbar superior demo.
- `window.__abrirPerfilAluno(origem)` — abre Perfil do Aluno preservando origem (`docente` / `coordenacao`).

---

## 2. Personas — sistema reduzido (rev. mai/2026)

**Decisão arquitetural:** o sistema agora opera com **uma única persona
conversacional** — **Capi** — modulada por contexto. Os nomes "Davi",
"Uni" e "Valle" foram descontinuados como personas; permanecem apenas
como aliases de avatar para não quebrar call sites antigos.

### Capi — única persona conversacional

| Modo | Quando | Sprite | Tom |
|---|---|---|---|
| `treino` (default) | Capi-Cards, Missão do Dia, empty states de estudo casual, Portfólio Reflexivo | `Dr capivara.png` | Afetivo, gamificado, nunca bajulatório ("pronto para começar?" ✓ "ótimo trabalho!" ✗) |
| `clinico` | Consulta Virtual, Round Virtual, Preceptoria do internato | `Dr Capi.png` | Sóbrio, com estetoscópio. **É o Dr. Capi v4.6** que os 120 internos já conhecem via Gemini. |

Uso em código: `<CapivaraDecorativa size={80} modo="clinico" />`.

### Onde a Capivara NÃO aparece

Por princípio: Coordenação, Docente (curadoria), Portfólio Reflexivo,
IESC, IC. Esses contextos usam ícones Lucide (BookOpen, Notebook,
Sparkles, etc.) ou apenas o título da tela — sem rosto.

### Aliases retrocompat

`CapiAvatar`, `CapivaraIcon`, `DaviAvatar`, `UniAvatar`, `ValleAvatar`
existem e apontam todos para o Capi `modo=treino`. Não introduzir novos
call sites com esses nomes.

### Capi-Chat × Canal de Comunicação

- **Capi-Chat** (`med-unidavi-capi-chat.jsx`): painel IA pedagógico
  contextual. Ícone discreto, contexto pré-carregado pela tela. Apenas
  em Questões, IC, Reflexivo, Consulta Virtual, Morfofuncional.
- **Canal de Comunicação** (`med-unidavi-canal.jsx`): FAB humano global
  (Tutoria, Coordenação, Suporte técnico, Atendimento UNIDAVI). **Não
  confundir.**

### Origem dos nomes

`Capi` é símbolo regional (capivara, fauna do Vale do Itajaí). Os nomes
históricos Uni/Davi (= UNIDAVI) e Valle (Vale do Itajaí + MFC) foram
descontinuados em mai/2026; ficaram somente nas variáveis de aliases
para retrocompat.

---

## 3. Decisões de design ancoradas

### Paleta UNIDAVI oficial (`med-unidavi-components.jsx`, objeto `DS`)

| Token | Valor | Uso |
|---|---|---|
| `DS.blue` | `#023E88` (Pantone 7687C) | Azul primário UNIDAVI |
| `DS.blueAcc` | `#00ADEF` (Pantone 2995C) | Azul secundário, acentos |
| `DS.blueDark` | `#012D65` | Sidebar background |
| `DS.blueLight` | `#E6EDF8` | Fundos suaves |
| `DS.blueMid` | `#0353B0` | Estados intermediários |
| `DS.terra` | `#C4622D` | Acento terracota — alertas pedagógicos |
| `DS.terraLight` | `#FDF0EA` | Background suave do terracota |
| `DS.green` | `#2A8A5C` | Sucesso, conceito "suficiente" |
| `DS.greenLight` | `#E6F4ED` | Fundo do verde |
| `DS.amber` | `#B07A18` | Atenção, conceito "precisa melhorar" |
| `DS.amberLight` | `#FDF5E0` | Fundo do âmbar |
| `DS.bg` | `#F5F7FC` | Background geral |
| `DS.surface` | `#FFFFFF` | Cards |
| `DS.border` | `#DDE3F0` | Bordas |
| `DS.borderLight` | `#EEF1F8` | Bordas suaves |
| `DS.text` | `#1A2438` | Texto principal |
| `DS.textSec` | `#5A6480` | Texto secundário |
| `DS.textMuted` | `#8E97B0` | Texto auxiliar/labels |

### Tipografia

**IBM Plex Sans** (Google Fonts). Pesos 300/400/500/600/700/800.

### Raios e elevação

`radius: '10px'` (padrão), `radiusLg: '14px'`, `radiusSm: '6px'`.
`shadow: '0 1px 4px rgba(26,36,56,0.08)'`, `shadowMd: '0 4px 16px rgba(26,36,56,0.10)'`.

### Padrão Sidebar (desktop)

Componente `Sidebar` aceita prop `profile` (`estudante`/`coordenacao`/`docente`).
A cor de cabeçalho e os itens listados mudam com o perfil. Selo
`VISÃO COORDENAÇÃO` / `VISÃO DOCENTE` no topo quando aplicável.

### Padrão TopBar

`TopBar` recebe `title`, `subtitle`, `actions`, `isMobile`, `breadcrumb`.
`breadcrumb` é array de `{label, onClick?}` — última entrada é a atual
(sem onClick). Padronizado em todas as telas top-level após a Coordenação
ganhar drilldowns.

### Padrão de Disclaimer de IA

`AIDisclaimer` (chip âmbar) presente em toda tela que envolve IA. Texto
curto, sem promessa de orientação clínica. Contrato visual:
**onde houver interação com IA, o disclaimer está visível**.

### BottomNav (mobile)

5 itens principais (Início, Biblioteca, Capi-Cards, IESC, Eventos). Outras
telas via acesso rápido no Dashboard.

---

## 4. Componentes reutilizáveis

Todos em `med-unidavi-components.jsx`, exceto onde marcado.

### Avatares

| Componente | Função |
|---|---|
| `CapivaraDecorativa({size, modo})` | Capi grande (default 80px), modo `treino`/`clinico`. |
| `CapiAvatar`, `CapivaraIcon`, `DaviAvatar`, `UniAvatar`, `ValleAvatar` | Aliases retrocompat — todos apontam para Capi `modo=treino`. |
| `_PersonaImg` | Helper interno. Resolve `uploads/*` via `window.__resolveAsset` quando disponível (modo standalone). |

### Funcionais

| Componente | Função |
|---|---|
| `AIDisclaimer` | Chip âmbar padronizado de aviso de IA |
| `Avatar` | Avatar genérico com iniciais (alunos, docentes humanos) |
| `Badge` | Pílula colorida |
| `Card` | Container padrão |
| `Btn` | Botão com variantes |
| `ProgressBar` | Barra de progresso fina |
| `SectionHeading` | Cabeçalho de seção com ação opcional |
| `Sidebar({profile, faseAluno})` | Sidebar contextual por perfil |
| `BottomNav` | Mobile |
| `TopBar({breadcrumb})` | Cabeçalho com breadcrumb |
| `CapiChat({telaAtual})` | (em `med-unidavi-capi-chat.jsx`) painel IA contextual |
| `CanalFAB({telaAtual, perfil})` | (em `med-unidavi-canal.jsx`) FAB de comunicação |
| `MeusTrabalhosSAM({alunoNome, onAbrirVitrine})` | (em `med-unidavi-sam.jsx`) lista de produções SAM do aluno; usada no Bloco IC do Perfil |
| `PosterViewerModal({poster, onClose})` | (em `med-unidavi-sam.jsx`) modal de visualização de pôster |

---

## 5. Decisões pedagógicas ancoradas

Decisões **não-negociáveis** — preservar em qualquer mudança futura.

### ENAMED ABDC

Padrão: **4 alternativas (A, B, C, D), uma correta + três distratores**.
Portaria MEC nº 413/2025. NUNCA 5 alternativas, NUNCA "todas as
anteriores", NUNCA "a e c estão corretas". Justificativa **por
alternativa** obrigatória (incluindo distratores).

### Conceitos avaliativos UNIDAVI

**Suficiente · Precisa melhorar · Insuficiente** — sem nota numérica em
interfaces do estudante. `pendente` como quarto estado quando ainda não
houve avaliação.

**Discussão aberta:** retorno a notas numéricas em discussão na UNIDAVI.
Modelo de dados deve ser **agnóstico** ao tipo de escala (`tipo_escala`
como atributo da entidade Avaliação: `conceito_unidavi` | `nota_numerica`
| `nivel_dreyfus` | `nivel_ten_cate` | `percentual_tp`).

### Avaliação programática

Coleta longitudinal de evidências múltiplas por competência (Art. 36 da
Resolução CNE/CES nº 3/2025). O **Perfil do Aluno** materializa
visualmente o destino final de todo evento de avaliação capturado pelo
sistema — é a peça central das reuniões técnicas com Caio.

### 27 competências DCN 2025

Matriz canônica agora **codificada** em `med-unidavi-dcn27.jsx`. Slugs
`dcn2025_comp_01..27`, agrupados por área-eixo:

- **Atenção à Saúde** (C01–C18, ~18 competências)
- **Gestão em Saúde** (~7 competências)
- **Educação em Saúde** (~2 competências)

O agrupamento competência → área-eixo é **interpretativo** (Art. 8º não
faz mapeamento explícito) e requer validação NDE.

⚠️ `PPCScreen` em `med-unidavi-screens.jsx` ainda exibe 6 grandes domínios
DCN simplificados. Quando próxima rodada tocar em PPC, migrar para a
matriz canônica `DCN27`.

### Área Verde DCN 2025

Tempo protegido para estudo autônomo e bem-estar. No Dashboard como
bloco diferenciado; sistema não programa atividade nem envia notificação
dentro desse intervalo.

### FSRS (não SM-2)

Espaçamento dos Capi-Cards: **FSRS**. Interface com 4 botões
("Não lembrei" / "Difícil" / "Lembrei" / "Fácil").

### Sem ensino remoto em Medicina

Ensino remoto **proibido** em Medicina no Brasil. Material assíncrono
pós-aula permitido como apoio, nunca substituição.

### APC × Logbook — escalas distintas

- **APC** (Atividade Profissional Confiabilizadora) → Dreyfus 1–5
- **Logbook** procedimental → Ten Cate 1–4

Não confundir.

### Padrão Capi-Card

Verso em 4 blocos verticais obrigatórios:
1. Resposta-síntese em negrito (uma linha)
2. Justificativa breve (2–4 linhas) ancorada em prática clínica
3. Referência abreviada
4. Tags estruturais (Fase, UC, SP, sub-tema, disciplina)

Botão "Aprofundar" abre painel lateral mockando UpToDate. Suporte a cloze
deletion `{{c1::...}}`.

### Curadoria docente obrigatória

Todo conteúdo gerado por IA passa por validação humana. Status
`pendente → curado` por ação humana. Implementado em `GeradorScreen`
(fluxo Aprovar/Editar/Rejeitar/Revisão por par).

### Captura de dados como fundamento

Toda interação registra evento estruturado em log institucional desde o
go-live, sem ação manual do estudante. Indexado por **ID interno**, não
por nome. Camada invisível obrigatória.

### Padrão visual ABDC

Heatmaps: verde (suficiente) / amarelo (precisa) / vermelho (insuficiente)
/ cinza (pendente). WCAG AA obrigatório.

---

## 6. Selos de pendência — modelo institucional

A UNIDAVI decidiu **implantação plena, não em ondas**. O vocabulário em
uso no protótipo é:

- **OPERACIONAL** — pronto, ativo no go-live
- **OCULTO POR FEATURE FLAG** — codificado, escondido até critério
  institucional (ex.: "50 cards validados pela Profa. Paola",
  "convênio STT/UFSC formalizado", "decisão NDE sobre matriz programática")
- **Em desenvolvimento** — pílula terracota neutra (adotada em Prática
  Clínica e em rodapés institucionais)

O componente `StatusFlag` (em `med-unidavi-components.jsx`, modos `op` /
`flag`) é o padrão visual para esses estados — sempre com critério
escrito quando `flag`.

### Auditoria 14/05/2026

Auditoria por grep em todos os arquivos vivos: **nenhuma ocorrência
remanescente de "Onda 1/2/3" como selo de versão**. As únicas
ocorrências de "onda" no código são clínicas (ondas P de ECG,
linha de base ondulada) — achados de descrição em `med-unidavi-imagens.jsx`,
não selos. As personas descontinuadas (Davi/Uni/Valle) também não
aparecem mais em copy visível ao usuário; permanecem apenas como
aliases internos de avatar (`med-unidavi-components.jsx`) para
retrocompat de call sites antigos.

Toda funcionalidade prevista entra no modelo de dados desde o início.
Diferença entre OPERACIONAL e OCULTO é apenas de visibilidade.

---

## 7. Estado de telas — síntese (mai/2026)

| Tela | Status | Observação |
|---|---|---|
| Login | Operacional | Usada quando navbar superior força |
| Dashboard | Operacional | Calendário Semana Padrão + Área Verde + acesso rápido + atalho "Submeter à SAM" |
| Biblioteca | Operacional | Busca federada com selo legado a migrar |
| Capi-Cards | Operacional | Verso 4 blocos + cloze + UpToDate + 5 cards mock |
| Meu Percurso (PPC) | Operacional (simplificado) | Migrar p/ matriz DCN27 canônica |
| IESC | Operacional | Família BSV-042, território Bela Vista. Texto da persona Valle a limpar |
| Morfofuncional | Operacional | Hub fases 1ª–5ª, 7 blocos por roteiro |
| Meu Treino (Questões) | Operacional | 12 questões ABDC, 3 modos, UpToDate, Capi-Chat habilitado |
| Banco de Imagens | Operacional | Curadoria docente |
| Gerador Pedagógico | Operacional | Modos Questões/Cards, fluxo curadoria por par |
| Eventos | Operacional | 12 eventos em 6 categorias |
| Teste de Progresso | Operacional | Recomendação contextual |
| Prática Clínica | Hub stub | 3 modalidades (Consulta · Preceptor · Round) — todas "Em desenvolvimento" |
| Portfólio APCs | Placeholder | Aguardando tela transacional do preceptor |
| Portfólio Reflexivo | Operacional | 4 sub-telas, painel Gibbs, Capi-Chat habilitado |
| Iniciação Científica | Operacional | Hub modal (TC × Trilha NPCMed), Catálogo, Literatura, Metodologia, Repositório, **Vitrine SAM**, **Submissão SAM**, NPCMed (2 abas) |
| Vitrine Institucional | Stub | Tela pública "Em construção" |
| Coordenação | Operacional | Heatmap institucional 27×12, filtros globais, busca de aluno, drilldown de fase, Saúde do Banco, Atividades de Treino |
| Docente | Operacional | Painel do Tutor com tutorados clicáveis → Perfil do Aluno |
| **Perfil do Aluno** | **Operacional** | 9 blocos verticais; acessado de Docente/Coordenação. Mock João Melo · T14 · 5ª fase · status Atenção. Inclui "Meus Trabalhos" (Vitrine SAM) no Bloco IC |

---

## 8. Pendências conhecidas para o próximo ciclo

### Críticas

- **Vocabulário "Ondas" → status operacional**: completar migração dos
  selos remanescentes (ver §6).
- **Tela transacional do preceptor preenchendo APC**: hoje o Bloco APCs
  do Perfil só mostra a visão do aluno. Falta o ato de avaliação do
  preceptor (Dreyfus 1–5 + comentários + evidências anexáveis).
- **Heatmap atividade de treino**: hoje 12 meses no Perfil do Aluno;
  GitHub-style 365 dias estava previsto e não foi feito (item G.6).
- **`PPCScreen` para matriz DCN27**: migrar de 6 domínios simplificados
  para os 27 slugs canônicos.

### Estruturais (modelo de dados)

- **Subturmas**: Tutorial (3–4 subgrupos/fase), IESC (5–6 alunos/preceptor
  rotativos), Habilidades (Turma A/B), Ambulatórios e Internato com
  duplas/trios e rodízios. Entidade `AlocacaoSubturma` versionada, curada
  pelo coordenador de fase — não automatizar.
- **Turmas T07–T18**: numeração regressiva. T18 = 1ª fase, T07 = 12ª.
  Ingresso semestral.
- **Versionamento curricular**: PPC 2023 (DCN 2014) vigente. DCN 2025 em
  discussão. Plataforma deve suportar dois currículos simultâneos.

### Iniciação Científica & SAM

- **App-SAM nativo** (já implementado em mock): integração ao MED-UNIDAVI
  via Bloco F. Até MVP em produção, o botão "Submeter à SAM" pode fazer
  link out para o App-SAM standalone.
- **NPCMed multi-área**: Cardio (Caroline Bacca — autora-âncora, a ser
  formalmente convidada), Pedi/Perinato (Marlou Dalri, Samantha Lopes),
  Psiquiatria (José Eduardo Dagostini, Mariana Celli). Governança
  operacional: Franciani, Samantha, Alinne (3 doutoras não-médicas,
  função decisória explícita).
- **Catálogo de Orientadores** com vagas/produção/co-orientação — já
  codificado, conferir dados reais.
- **Pareamento clínico-metodologista** explícito (sugestão automática de
  co-orientação metodológica) — codificado, validar com NPCMed.
- **Trilha dual**: TC obrigatório vs. Trilha NPCMed seletiva — interface
  pronta, decisão institucional consolidada.

### Atitudinal longitudinal

- Captura sistemática nas fases anteriores ao checkpoint do 4º ano —
  P-MEX em Tutorial/IESC, MSF por ciclo, registros de incidente crítico,
  auto-avaliação no Portfólio Reflexivo.
- Triangulação obrigatória: status atitudinal só com convergência
  multi-fonte.
- Decisão consolidada: **atitudinal NÃO entra como decisão de progressão
  no checkpoint** — performado em estação OSCE no checkpoint, e como
  peça longitudinal formativa no Bloco 9 do Perfil do Aluno (alimenta a
  competência Profissionalismo).

### Espaços arquiteturais reservados (modelo de dados, sem UI)

- Logbook do internato (Ten Cate 1–4)
- OSCE Digital (banco de estações + aplicação tablet + devolutiva)
- Trilha Saúde Digital / Telemedicina (DCN 2025; integração STT/UFSC)
- Microscopia virtual e modelos 3D no Morfofuncional
- Jogos sérios morfofuncionais
- Aba Extensão e Ligas (curricularização — Resolução CNE/CES 7/2018)
- Pipeline NPCMed de candidatos com sinais de engajamento metodológico
- Adequação curricular DCN 2025 (sem cronograma)

---

## 9. Decisões institucionais transversais

- **Programador único:** Caio (terceirizado). Comunicação direta com
  Itairan, sem intermediação de TI. Entregas modulares por feature flag.
- **Coordenação adjunta:** Prof. Me. Itairan da Silva Terres
  (endocrinologista, bioeticista). Coordenador titular: Prof. Luís
  Eduardo Mendes Zanis.
- **NDE** valida decisões pedagógicas. Sem cronograma para adequação
  DCN 2025.
- **Curso:** 410 alunos em 12 fases, currículo PBL/CBL/TBL/CCBL, meta
  Conceito 5 ENAMED.
- **Infraestrutura:** Google Workspace for Education consolidado. SSO
  Google `@unidavi.edu.br` previsto.
- **Bibliotecas:** UpToDate, ScienceDirect, Minha Biblioteca, EBSCO.
  Acesso CAPES limitado.
- **LGPD:** captura indexada por ID interno, jamais nome nos logs. Alt
  text obrigatório.

---

*Fim do HANDOFF — versão 14/05/2026.*

*Documento elaborado a partir de leitura direta dos arquivos do projeto
e da memória consolidada das discussões institucionais. Substitui a
versão de 27/04/2026.*
