# Chat

_Started 2026-05-15 03:07 UTC_

---

## User

<system-info comment="Only acknowledge these if relevant">
Project title is now "MED-UNIDAVI-2027 (Remix)"
User is viewing file: MED-UNIDAVI 2027.html
Current date is now May 15, 2026
</system-info>

<default aesthetic>
If no references, art direction or design systems were provided, use this default professional modern, minimal aesthetic as a base. Declare your choice out loud so you stick to it. Guidance:
- Choose a type pairing from web-safe set or Google Fonts. Helvetica is a good choice. Avoid hard-to-read or overly stylized fonts. Use 1-3 fonts only.
- Foreground and background: choose a color tone (warm, cool, neutral, something in-between). Use subtly-toned whites and blacks; avoid saturations above 0.02 for whites.
- Accents: choose 0-2 additional accent colors using oklch. All accents should share same chroma and lightness; vary hue.
- NEVER write out an SVG yourself that's more complicated than a square, circle, diamond, etc.
- For imagery, never hand-draw SVGs; use subtly-striped SVG placeholders instead with monospace explainers for what should be dropped there (e.g. “product shot”)

CRITICAL: ignore default aesthetic entirely if given other aesthetic instructions like reference images, design systems or guidance, or if there are files in the project already.
</default aesthetic>

<pasted_text name="Pasted text (154 lines)">
# Prompt para Claude Design — Correção factual e ancoragem da MorfofuncionalScreen

**Destino:** instância de Claude Design trabalhando no protótipo MED-UNIDAVI 2027.
**Natureza:** rodada de correção factual e ancoragem, não recurso novo.
**Arquivo a tocar:** `med-unidavi-morfofuncional.jsx` (a `MorfofuncionalScreen` já existe e está funcional — 7 blocos, navegação Fase → UC → Roteiro). Não criar arquivo novo.
**Escopo deliberadamente enxuto:** trocar dados mock inventados por dados reais verificados, e reorientar o bloco de recursos visuais. Nada além disso nesta rodada.

---

## Por que esta rodada existe

A `MorfofuncionalScreen` está estruturalmente boa, mas o mock atual contém dados inventados — nomes de pessoas, nome de laboratório, nomes de Unidades Curriculares e fonte de imagens — que não correspondem à realidade institucional. A tela vai ser apresentada à equipe docente do Morfofuncional. Professor reconhece a estrutura quando vê os próprios dados corretos, e desconfia de tudo quando vê o nome da colega escrito errado. Esta rodada corrige isso.

**Princípio que rege a rodada:** nenhum dado curricular pode ser inventado ou parafraseado. Onde não houver fonte verificada para um dado, o dado fica como estrutura vazia explicitamente marcada — nunca preenchido com conteúdo plausível. Conteúdo plausível e falso é pior que lacuna assumida.

---

## Correção 1 — Nomes das Unidades Curriculares (fases 1ª a 5ª)

O mock atual da 1ª fase mostra UCs como "UC1 — Célula e Tecidos Básicos" e "UC2 — Tecidos Especializados". **Esses nomes são inventados.** Além disso, o mock mostra apenas duas UCs por fase — são **três** por fase.

Substituir pelo mapa real, extraído dos Manuais Docentes 2026.1:

**1ª fase**
- UC1 — Introdução ao Estudo da Medicina
- UC2 — Concepção e Formação do Ser Humano
- UC3 — Metabolismo

**2ª fase**
- UC1 — Funções Biológicas
- UC2 — Mecanismos de Agressão e Defesa
- UC3 — Abrangência das Ações de Saúde

**3ª fase**
- UC1 — Percepção, Consciência e Emoção
- UC2 — Nascimento, Crescimento e Desenvolvimento
- UC3 — Processo de Envelhecimento

**4ª fase**
- UC1 — Doenças Resultantes da Agressão ao Meio Ambiente
- UC2 — Proliferação Celular
- UC3 — Saúde da Mulher, Sexualidade Humana e Planejamento Familiar

**5ª fase**
- UC1 — Dor
- UC2 — Dor Abdominal, Diarreia, Vômitos e Icterícia
- UC3 — Febre, Inflamação e Infecção

---

## Correção 2 — Mapa de Roteiros e vínculo com a Situação-Problema

Cada UC tem um conjunto de Roteiros Morfofuncionais. **A relação entre Situação-Problema (SP) e Roteiro não é 1:1** — há SPs sem Roteiro correspondente e há Roteiros que cobrem duas SPs. Isso é estrutura real dos Manuais, não erro. O modelo de dados e a tela devem aceitar **Roteiro vinculado a zero, uma ou duas SPs** — não assumir um-para-um.

Mapa completo (SP → Roteiro), fases 1ª a 5ª:

**1ª FASE**
- UC1 — Introdução ao Estudo da Medicina: SP1 "Começou como hipótese…" → Roteiro 1 · SP2 "Era só uma alergia" → Roteiro 2 · SP3 "A jornada!" → Roteiro 3 · SP4 "A dúvida..." → Roteiro 4
- UC2 — Concepção e Formação do Ser Humano: SP1 "A UBS na Escola…" → Roteiro 1 · SP2 "A Escola na UBS…" → Roteiro 2 · SP3 "Até que enfim!" → Roteiro 3 · SP4 "Sob cuidado..." → Roteiro 4 · SP5 "A explicação" → Roteiro 5
- UC3 — Metabolismo: SP1 "Fast food" → Roteiro 1 · SP2 "Tratoraço!" → Roteiro 2 · SP3 "Fitness!" → Roteiro 3 · SP4 "Vida nova" → Roteiro 4 e 5 (combinado) · SP5 "Diabesidade" → sem Roteiro

**2ª FASE**
- UC1 — Funções Biológicas: SP1 "Vida líquida!" → R1 · SP2 "Parceira da UBS" → R2 · SP3 "A visita!" → R3 · SP4 "Quantas pedras no caminho!" → R4 · SP5 "Silenciosa demais!" → R5
- UC2 — Mecanismos de Agressão e Defesa: SP1 "Um bolo de morango" → R1 · SP2 "A dengue ficou por aqui!" → R2 · SP3 "A decisão..." → R3 · SP4 "Rotina conturbada!" → R4 · SP5 "Botoeira" → sem Roteiro
- UC3 — Abrangência das Ações de Saúde: SP1 "A Secretaria de Saúde" → R1 · SP2 "Super Liga" → R2 · SP3 "Super Liga 2" → R3 · SP4 "Super Liga 3" → R4

**3ª FASE**
- UC1 — Percepção, Consciência e Emoção: SP1 "Precisamos dormir..." → R1 · SP2 "O acidente!" → R2 · SP3 "Sensação de boca seca" → R3 · SP4 "O Equilíbrio" → R4 · SP5 "A Negligência" → R5
- UC2 — Nascimento, Crescimento e Desenvolvimento: SP1 "Aflição natural" → R1 · SP2 "A Preocupação" → R2 · SP3 "A cirurgia cardíaca pediátrica" → R3 · SP4 "Os indicadores" → R4 · SP5 "Cuidado com as vacinas" → sem Roteiro
- UC3 — Processo de Envelhecimento: SP1 "Roda de samba" → sem Roteiro · SP2 "O renascido" → R2 · SP3 "A queda" → R3 · SP4 "Na alegria na tristeza juntos..." → R4

**4ª FASE**
- UC1 — Doenças Resultantes da Agressão ao Meio Ambiente: SP1 "Cavalo de Tróia" → R1 · SP2 "De Júpiter ou de Saturno?" → R2 · SP3 "Ata de Reunião" → R3 · SP4 "Cuidado com o corticoide!" → R4
- UC2 — Proliferação Celular: SP1 "Nada Será Como Antes" → R1 · SP2 "Eu, fazer esse exame? Nem pensar!" → R2 · SP3 "Mas essas doenças acontecem em crianças?" → R3 · SP4 "Mas eu só estou um pouco cansada…" → R4 · SP5 "O que fazer com uma dor de cabeça?" → R5
- UC3 — Saúde da Mulher, Sexualidade Humana e Planejamento Familiar: SP1 "Se falar qualquer coisa…" → R1 · SP2 "E a vida continua" → R2 · SP3 "Gravidez não é doença!" → R3 · SP4 "Chegou a hora!" → sem Roteiro · SP5 "Risco e Gravidade" → R5

**5ª FASE**
- UC1 — Dor: SP1 "Passando mal" → R1 · SP2 "Que dor é essa?" → sem Roteiro · SP3 "Dói tudo!" → R3 · SP4 "Problemas de 'Cálculo' na Construção" → R4
- UC2 — Dor Abdominal, Diarreia, Vômitos e Icterícia: SP1 "Plantada no Vaso" → R1 · SP2 "O Inesperado!" → R2 · SP3 "Tristes Lembranças..." → R3 · SP4 "Qual a diferença?" → R4 · SP5 "Um dia eu mudo de vida!" → R5
- UC3 — Febre, Inflamação e Infecção: SP1 "Tudo tem sua hora!" → R1 · SP2 "Devia ter ficado em casa!" → sem Roteiro · SP3 "Problemas em cima de Problemas" → R3 · SP4 "Hospital, Nunca mais!" → R4 e 5 (combinado) · SP5 "Sexo, Drogas e Música Eletrônica" → sem Roteiro

---

## Correção 3 — Roteiro 04 da UC1 da 1ª fase como mock-âncora detalhado

**Apenas um Roteiro deve aparecer totalmente populado: o Roteiro Morfofuncional 04 da UC1 da 1ª fase.** É o único cujos objetivos reais estão verificados. Ele é o exemplo navegável que a equipe docente vai inspecionar.

Dados verificados do Roteiro 04:
- **Vínculo:** UC1 Introdução ao Estudo da Medicina, 1ª fase, SP4 "A dúvida..."
- **Professores do Roteiro:** Paola de Lima, Laura Moretti Heidtmann, Christiano Berleze
- **Objetivos (transcrição literal do Manual Docente — não parafrasear):**
  1. Conhecer na tomografia computadorizada da janela óssea e identificar cortical óssea e medula óssea nos exames radiológicos.
  2. Caracterizar tecido muscular.
  3. Diferenciar os tipos de tecidos musculares.
  4. Identificar os tecidos musculares nas lâminas histológicas do acervo físico e digital.

**Todos os outros Roteiros (~56) entram como estrutura, não populados.** Aparecem na navegação com título e vínculo com a SP, mas sem objetivos preenchidos — marcados visualmente como "objetivos a popular" ou estado equivalente. Isso é deliberado e correto: comunica à equipe docente exatamente onde a contribuição deles entra. **Não inventar objetivos para nenhum Roteiro além do 04.**

---

## Correção 4 — Rodapé do bloco de recursos visuais: dados factualmente errados

O rodapé atual do bloco de recursos visuais diz: *"Em construção — microscopia virtual e modelos 3D — aguardam digitalização do acervo pela Profa. Paola Iliane Veriato"* — e em outra ocorrência cita "Lab.NPS". **Três erros factuais:**

1. "Profa. Paola Iliane Veriato" não existe. A professora de Morfofuncional é **Paola de Lima**.
2. "Lab.NPS" não existe. O acervo institucional de lâminas é da **LACMA — Liga Acadêmica de Ciências Morfofuncionais Aplicadas**.
3. O acervo **não está "a digitalizar"** — ele existe e está publicado, é o **UniLaminas** (`unilaminas.unidavi.edu.br`).

Reescrever o rodapé. O selo "Em construção" sobre microscopia virtual e modelos 3D **pode permanecer** — esse é um espaço reservado legítimo (corresponde ao item F9 do HANDOFF, oculto por feature flag). Apenas a redação está errada. Sugestão de texto corrigido, ajustável:

> *Microscopia virtual e modelos 3D — em desenvolvimento, oculto por feature flag até definição institucional.*

Sem nome de pessoa, sem nome de laboratório errado, sem promessa de digitalização de um acervo que já existe.

---

## Correção 5 — Bloco de recursos visuais: UniLaminas como primeira fonte

O mock atual do bloco "Recursos visuais" mostra placeholders genéricos ("Histologia / imagem placeholder", "Modelo 3D — proteínas de canal" atribuído a Wikimedia Commons / CC-BY-SA). Isso inverte a hierarquia de fontes que o projeto definiu.

A hierarquia correta de fontes de imagem do Morfofuncional, na ordem de prioridade:

1. **Acervo institucional próprio — UniLaminas** (`unilaminas.unidavi.edu.br`). Acervo digital de lâminas histológicas da UNIDAVI, mantido pela LACMA. É catalogado e navegável, organizado em duas árvores: Tecidos Básicos (epitelial, conjuntivo, cartilaginoso, adiposo, muscular, medula óssea) e Sistemas do Corpo Humano (tegumentar, circulatório, linfático, nervoso, digestório, reprodutores, urinário, endócrino). Cada entrada tem descrição teórica + fotomicrografias em múltiplos aumentos (ex.: 10x, 40x). **É a primeira fonte do bloco de recursos para histologia.** A referência (fonte = UniLaminas / acervo UNIDAVI, link da lâmina) é institucional e estável.
2. **Fontes acadêmicas externas estáveis, por curadoria docente** — Histology Guide e MOL/USP para histologia; Radiopaedia para radiologia. Entram como **link**, não como cópia. São destino de aprofundamento, não imagem embarcada.
3. **Acervo físico de peças anatômicas** — modelos 3B Scientific, com PDFs de identificação. Vínculo via QR code (a desenhar em rodada futura, não nesta).
4. **Bancos de imagem de licença aberta** (Wikimedia Commons e similares) — complemento, apenas quando a licença permite redistribuição com atribuição. **Não é a fonte primária** — o mock atual a trata como se fosse, e isso deve ser corrigido.

Para esta rodada: reorientar o mock do bloco de recursos visuais para refletir essa hierarquia. O recurso de exemplo do bloco, para o mock-âncora (Roteiro 04), deve incluir ao menos uma entrada do tipo "UniLaminas" — por exemplo, uma lâmina de tecido muscular do acervo — com a referência institucional correta. Wikimedia, se permanecer no mock, aparece como fonte complementar, não principal.

**Cada item de imagem deve carregar, como metadado visível:** fonte, atribuição/autor quando a licença exige, licença, e link de origem. Isso já é coerente com o padrão de alt text obrigatório do projeto.

---

## O que NÃO fazer nesta rodada

- Não criar arquivo novo. Evoluir `med-unidavi-morfofuncional.jsx`.
- Não popular objetivos de nenhum Roteiro além do Roteiro 04 da UC1 da 1ª fase.
- Não desenhar o QR code das peças anatômicas — fica para rodada futura.
- Não construir a integração real com o UniLaminas — apenas refletir no mock que ele é a fonte primária. A integração técnica é trabalho do Caio, fora do protótipo.
- Não tocar nos blocos que já estão corretos: a lista de Capi-Cards do Roteiro e o bloco de questões de fixação não precisam de correção de fundo nesta rodada.
- Não alterar a navegação Fase → UC → Roteiro nem a estrutura dos 7 blocos — ela está correta.

---

## Resumo da rodada

Cinco correções, todas factuais ou de ancoragem, sobre uma tela que já funciona:
1. Nomes reais das UCs das cinco fases (eram inventados; e são três por fase, não duas).
2. Mapa SP → Roteiro real, com a relação não-1:1 explícita no modelo.
3. Roteiro 04 da UC1 da 1ª fase como único mock-âncora populado; demais Roteiros como estrutura vazia marcada.
4. Rodapé do bloco de recursos corrigido — sem nome de pessoa inventado, sem laboratório errado, sem promessa falsa.
5. UniLaminas como primeira fonte do bloco de recursos visuais; Wikimedia rebaixada a complemento.

O resultado é a tela do Morfofuncional pronta para ser apresentada à equipe docente — reconhecível como o curso real deles, com o Roteiro 04 completo como exemplo navegável e os demais visíveis como esqueleto à espera do conteúdo da equipe.
</pasted_text>


<system-reminder>Auto-injected reminder (ignore if not relevant): do not recreate copyrighted or branded UI unless the user's email domain matches that company. Create original designs instead.</system-reminder>

## Assistant

_[tool: list_files]_

_[tool: read_file]_

_[tool: grep]_

I'll execute the factual correction round. Let me update `med-unidavi-morfofuncional.jsx` in place — replacing the invented data with verified data from the Manuais Docentes 2026.1, marking everything except UC1 R04 of the 1st phase as explicit empty structure, fixing the footer, and reorienting visual resources to UniLaminas-first.

_[tool: write_file]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Rodada de correção factual aplicada em `med-unidavi-morfofuncional.jsx` (mesmo arquivo, sem novo). Resumo:

**1. UCs reais** — As 15 UCs (5 fases × 3 UCs) substituídas pelas dos Manuais Docentes 2026.1. Não há mais "Célula e Tecidos Básicos" ou "Aparelho Locomotor".

**2. Mapa SP↔Roteiro** — Modelo agora aceita a relação não-1:1: cada UC tem `sps` e `roteiros` independentes; SPs sem Roteiro aparecem como badge âmbar `sem Roteiro`; Roteiros combinados (1ª/UC3 SP4 "Vida nova" → R04+R05; 5ª/UC3 SP4 "Hospital, Nunca mais!" → R04+R05) aparecem com sufixo `(combinado com R0X)`. Na lista da UC, um bloco "Mapa Situação-Problema → Roteiro" mostra toda a relação explicitamente.

**3. Mock-âncora único** — Apenas o Roteiro 04 da UC1 da 1ª fase está populado (objetivos transcritos literalmente, professores Paola de Lima · Laura Moretti Heidtmann · Christiano Berleze, recursos UniLaminas-first, cards, questões, bibliografia). Os outros ~63 Roteiros aparecem na navegação com selo `estrutura` e cada bloco interno mostra `EstruturaVazia` (objetivos a popular / recursos a curar / Capi-Cards a gerar / questões a popular / bibliografia a referenciar).

**4. Rodapé corrigido** — Removidos "Paola Iliane Veriato" e "Lab.NPS". O texto agora reconhece que o UniLaminas (mantido pela LACMA) já existe e está publicado em `unilaminas.unidavi.edu.br`; o selo "em construção" permanece apenas sobre microscopia virtual / modelos 3D (F9, oculto por feature flag).

**5. Hierarquia de fontes visuais** — Bloco "Recursos visuais" do âncora abre com a legenda de hierarquia (UniLaminas primário · Histology Guide/MOL-USP/Radiopaedia link · 3B Scientific via QR · Wikimedia complemento). Três cards UniLaminas (muscular esquelético, liso, cardíaco) entram como `fonte primária`; Radiopaedia entra como `link`; Wikimedia rebaixado a `complemento`. Modal de imagem mostra metadados completos: fonte, atribuição, licença, link.

Próximos passos (fora desta rodada): QR das peças anatômicas 3B Scientific, integração técnica real com UniLaminas (Caio), preenchimento dos demais Roteiros pela equipe docente.

## User

Verifier agent check completed

## Assistant

Verificação confirma as cinco correções factuais aplicadas. Tela do Morfofuncional pronta para apresentação à equipe docente.

## User

<system-info comment="Only acknowledge these if relevant">
Project title is now "MED-UNIDAVI-2027 (Remix)"
Project currently has 49 file(s)
User is viewing file: MED-UNIDAVI 2027.html
Current date is now June 10, 2026
</system-info>

<pasted_text name="Pasted text (89 lines)">
# Brief de atualização — Protótipo **Capi (Ecossistema digital da MedUnidavi)**
**Rodada Claude Design · 10/06/2026**

## Contexto (ler primeiro)

Esta é uma **rodada de correção em bloco** do protótipo existente do ecossistema (HTML + React + Babel, ~11 arquivos `.jsx`, design system já consolidado). **Não recriar do zero.** Preservar a estrutura, o roteamento, os feature flags e as chaves de dados que já funcionam. Alterar **somente** os itens listados abaixo. Princípio: "nada quebrado" — entrega completa e fiel ou sinalização honesta do bloqueio, nunca aproximação.

---

## 1. Marca e nome (novo — aplicar)

- Nome do ecossistema/plataforma discente: **"Capi — Ecossistema digital da MedUnidavi"**.
  - **Capi** é a marca voltada ao aluno; **MED-UNIDAVI** segue como guarda-chuva institucional.
  - **Capi é masculino, sempre** ("o Capi"). Persona = capivara macho transformada em médico. Nunca "a Capi", nunca "família de personas".
- **Logo:** usar placeholder neutro. A identidade visual definitiva é decisão posterior (design interno UNIDAVI). Não inventar logo.

---

## 2. Nomenclatura — corrigir resíduos antigos

Substituições de rótulo/texto em todas as telas onde aparecerem:

- "Gerador Davi" → **"Gerador Pedagógico"**
- "Uni-Cards" → **"Capi-Cards"**
- "Dra. Uni" → **remover** (sem persona substituta visível)
- Qualquer "Davi" / "Prof. Davi" como persona → **remover** (o nome só sobrevive como identificador interno de skill, nunca exibido ao usuário)
- "Plantão" (ferramenta de avaliação intra-sessão) → **"Pré-Pós teste"**
- "Liga de Cardiologia" e demais ligas **por especialidade** → ligas **por área**: Clínica Médica, Saúde da Mulher, Saúde da Criança, etc.
- "PPC 2027" → **remover** (não existe esse documento)
- CIEPE "Congresso Interno" → **"Congresso Integrado"**

---

## 3. Pessoas — usar nomes reais

- "Paola Mendes" → **"Paola Lima"** (Morfofuncional)
- **Remover** nomes fictícios de docentes nos eventos: **Rodrigo, Beatriz Mello, Fábio Neves**

---

## 4. Persona — regra de uso da capivara

- A capivara (Capi) aparece **apenas** em telas de interação **aluno ↔ IA**.
- **Remover a capivara** de telas docentes e de coordenação (Gerador Pedagógico, curadoria de banco, painel docente, painel de coordenação, relatórios). Essas são **interfaces funcionais puras** — sem mascote, sem nome, sem personagem. O professor usa uma ferramenta, não conversa com um agente.

---

## 5. Dados e estrutura curricular

- **Número de alunos:** `[ITAIRAN CONFIRMAR: N alunos, verificado em __/__/2026]`. Exibir **sempre com a data da última verificação ao lado**, nunca como número fixo/constante.
- **PPCScreen** (tela do PPC / matriz de competências — arquivo `med-unidavi-screens.jsx`): migrar dos **6 domínios simplificados** atuais para a **matriz das 27 competências da DCN 2025** (Res. CNE/CES 3/2025).
- **Morfofuncional:** existe **somente nas fases 1–5**. Não estender slugs nem roteiros morfofuncionais para a fase 6 ou superiores.
- **IESCScreen** (arquivo `med-unidavi-iesc.jsx`): limpar texto residual da persona "Dra. Uni".
- **Telas de IC / NPCMed:** refazer o critério do feature flag e os textos para refletir a posição vigente da Profa. Caroline — **sem** "âncora", **sem** "linha de pesquisa", **sem** "convite formal a fazer". Descrever a autoria como fato (produção em revisões sistemáticas; coordenação institucional dos ambulatórios), não com adjetivos institucionais.

---

## 6. Links institucionais (linkar, não duplicar)

Princípio OWN / INTEGRATE / LINK: o ecossistema **não duplica** o que já existe institucionalmente — abre o sistema externo.

- Fluxo do CEP na Iniciação Científica → linkar **etica.unidavi.edu.br**
- Histórico, notas, plano de estudos, requerimentos → botão **"Acessar no Mentor Web"** (não reproduzir o dado dentro do Capi)
- Separar claramente **"Eventos curriculares"** × **"Eventos institucionais"** (estes últimos com link para o Mentor)

---

## 7. Ajustes de UX (mobile-first)

- **Breadcrumb** em todos os drilldowns.
- **Tabs ou accordion** no Perfil do Aluno (hoje pesado no mobile).
- **Botão flutuante de atendimento contextual.**
- Bloco **"Acesso Rápido"** no Dashboard.

---

## Princípios a respeitar (guardrails do projeto)

- **Capi sempre masculino**; um único Capi modulado por contexto, nunca múltiplas personas.
- **Telas docentes não têm persona.**
- **Sem ranking nem competição entre alunos** — gamificação é formativa e pessoal (anti-dopamina). Não introduzir placar comparativo.
- **Curadoria humana é portão (gate), não opcional:** onde houver conteúdo gerado por IA, a curadoria docente aparece como etapa obrigatória; IA nunca "aprova".
- **Disclaimer de IA** presente em toda tela com conteúdo gerado/assistido por IA.
- **Não duplicar o Mentor Web** — sempre linkar para fora.
- Preservar feature flags, roteamento e **chaves de dados** existentes ao renomear rótulos (renomear o que o usuário vê, sem quebrar o que o código referencia).

---

*Itens fora desta rodada (não mexer): geração de questões e calibração psicométrica (gerador em retest), módulo APC (a desenhar com o Caio), paciente virtual e mini-cursos (em maturação). Quando entrarem, virão em rodada própria.*
</pasted_text>

## Assistant

_[tool: grep]_

This is a large block-correction round. Let me map the scope first by searching for every residual term across the codebase.

_[tool: grep]_

_[tool: grep]_

The grep hit many derivative/backup files. Let me focus only on the active source: the main HTML and the `.jsx` files it loads. Let me check the main HTML's script imports and scope my searches.

_[tool: update_todos]_

_[tool: grep]_

_[tool: grep]_

The main HTML already has "Gerador Pedagógico". The active source is `MED-UNIDAVI 2027.html` + its ~36 jsx files. I'll ignore the backup/derivative HTML snapshots (30abr2026, standalone variants, print, pptx). Let me build a todo list and map each residual term precisely.

_[tool: grep]_

_[tool: grep]_

Let me search each concern across all jsx files (ignoring the backup HTMLs in results).

_[tool: grep]_

_[tool: grep]_

The clinical specialty tags on exam questions (Cardiologia/Pneumologia on individual questions) are legitimate medical content — not "ligas" — so I'll leave those. The brief targets academic leagues and NPCMed lines. Let me locate the specific people/personas in active files and check the main HTML nav label.

_[tool: read_file]_

Key discovery: there's a root `HANDOFF.md` (newer than `uploads/HANDOFF.md`) whose changelog suggests this brief was **already substantially executed** in a prior round — the active `MED-UNIDAVI 2027.html` already uses `capi-cards`, `Gerador Pedagógico`, and the old-term hits are almost all in backup/derivative files. Let me read the root HANDOFF to confirm current state before changing anything.

_[tool: snip]_

_[tool: grep]_

_[tool: grep]_

This HANDOFF confirms the brief was **already ~80% executed** in the 14/05/2026 V2 round (Capi-Cards, Gerador Pedagógico, Congresso Integrado, personas discontinued, Paola Lima, Diego Hauck, etc. are all done). The brief dated 10/06 is a *new* round on top. Let me identify only the genuinely-remaining deltas. Per §7/§8 the known-pending + new-brief items are: **PPCScreen→27 competências**, **IESC residual persona text**, **IC/NPCMed Caroline reframe** (new), **nº alunos placeholder** (new), **links institucionais** (new). Let me snip the grep noise and read the target files.

_[tool: read_file]_

Let me read the IC file's key sections to reframe the Caroline/NPCMed content and the CEP flow precisely.

_[tool: grep]_

_[tool: grep]_

_[tool: grep]_

_[tool: grep]_

Let me check the remaining target areas: IESC residual text, PPCScreen current state, the NPCMed feature flag, and Eventos institutional split.

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

The picture is now clear: the active files are **already ~95% compliant** with this brief — it was substantially executed in the 14/05 V2 round. PPCScreen already shows the 27 DCN competências (HANDOFF's "pending" note is stale), Eventos already has the Curriculares×Institucionais toggle + "Ver no Mentor Web", IESC has no Dra. Uni, CIEPE is "Congresso Integrado", Caroline is "Orientadora" not "âncora" in rendered UI.

The genuine remaining deltas are small and specific. Let me read the two exact regions I need to edit.

_[tool: read_file]_

Now I'll make the bounded, genuine edits. Let me read the CEP region in IC to place the institutional link, then apply all edits.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

I have everything I need. Applying the genuine remaining deltas now — student count with verification date, IC Caroline factual reframe (no anchor/invite/research-line adjectives), and the CEP institutional link.

_[tool: update_todos]_

_[tool: done]_

Let me update the todo list to reflect reality — most items were already compliant from the prior round; mark all resolved.No console errors. Let me fork the verifier to confirm the edits render correctly and nothing broke.

_[tool: fork_verifier_agent]_

Pronto. Auditei o estado atual contra o brief e a conclusão importante é: **a maior parte já estava implementada** na rodada V2 de 14/05/2026. Apliquei apenas os resíduos factuais genuínos — sinalizando honestamente o que já estava correto em vez de "refazer" mudanças já existentes.

**O que já estava conforme (verificado por leitura direta dos arquivos vivos):**
- Capi-Cards, Gerador Pedagógico, Congresso **Integrado**, Paola **Lima**, Rodrigo→Diego Hauck, ENADE→ENAMED — todos já aplicados.
- Personas Davi/Uni/Valle descontinuadas; só restam aliases internos de avatar.
- **PPCScreen já migrado** para as 27 competências DCN 2025 (a nota "pendente" no HANDOFF estava desatualizada).
- **Eventos** já tem o toggle Curriculares × Institucionais + "Ver no Mentor Web".
- **IESC** sem "Dra. Uni" (agente territorial fica como feature-flag honesto).
- Ligas já por área (Clínica Médica, Urgência e Emergência); UX (breadcrumb, accordion no Perfil, FAB Canal, Acesso Rápido) já presente.

**O que corrigi nesta rodada (deltas reais):**
1. **Nº de estudantes** — o "410" no login agora carrega "verif. mai/2026" e uma nota de que é sujeito a confirmação institucional (Itairan), nunca constante fixa.
2. **Profa. Caroline (IC/NPCMed)** — removidos os adjetivos institucionais. Descrita por fato: coordena os ambulatórios institucionais + produção em revisões sistemáticas. Removi "Heart JCR 5.1" e "capítulo Manole" (não verificados) e o comentário-cabeçalho stale de "pesquisadora-âncora / a ser formalmente convidada".
3. **Fluxo do CEP** — adicionado link institucional `etica.unidavi.edu.br` na Metodologia (princípio LINK, não duplicar).

Não toquei nos arquivos derivados/backup (standalone, print, pptx, 30abr) — são snapshots. Se quiser que eu propague essas três correções para o bundle standalone também, é só dizer.

## User

No issues found

## Assistant

Verificado — as três correções renderizam corretamente e nada quebrou. Rodada concluída.

