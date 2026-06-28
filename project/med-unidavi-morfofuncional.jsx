// MED-UNIDAVI 2027 — Morfofuncional Screen (ITEM 4)
// Hierarquia: Fase > UC > Roteiro Morfofuncional (1ª–5ª fase)
//
// Esta versão substitui os dados mock inventados pelos dados reais verificados
// dos Manuais Docentes 2026.1.
//
// Princípio que rege o arquivo:
//   Nenhum dado curricular é inventado. Onde não há fonte verificada para um
//   dado (ex.: objetivos, recursos, cards, questões de um Roteiro), o dado
//   fica como estrutura vazia explicitamente marcada — nunca preenchido com
//   conteúdo plausível.
//
// Único Roteiro populado: UC1 — Roteiro 04 da 1ª fase (SP4 "A dúvida...").
// Todos os outros Roteiros aparecem como estrutura à espera do conteúdo da
// equipe docente.

// ── Dados reais — UCs e Situações-Problema (Manuais Docentes 2026.1) ────────
// Modelo: cada UC tem `sps` (Situações-Problema) e `roteiros` (Roteiros
// Morfofuncionais). A relação SP↔Roteiro NÃO é 1:1 — há SP sem Roteiro e há
// Roteiro vinculado a duas SPs (campos `combinado` quando aplicável).

const MORFO_FASES = [
  // ── 1ª FASE ────────────────────────────────────────────────────────────────
  {
    num: 1, label: '1ª Fase',
    ucs: [
      {
        id: 'f1-uc1', num: 1, nome: 'Introdução ao Estudo da Medicina',
        sps: [
          { num: 1, titulo: 'Começou como hipótese…', roteiros: [1] },
          { num: 2, titulo: 'Era só uma alergia',      roteiros: [2] },
          { num: 3, titulo: 'A jornada!',              roteiros: [3] },
          { num: 4, titulo: 'A dúvida...',             roteiros: [4] },
        ],
        roteiros: [
          { num: 1, sps: [1] },
          { num: 2, sps: [2] },
          { num: 3, sps: [3] },
          { num: 4, sps: [4], ancora: true },
        ],
      },
      {
        id: 'f1-uc2', num: 2, nome: 'Concepção e Formação do Ser Humano',
        sps: [
          { num: 1, titulo: 'A UBS na Escola…',  roteiros: [1] },
          { num: 2, titulo: 'A Escola na UBS…',  roteiros: [2] },
          { num: 3, titulo: 'Até que enfim!',    roteiros: [3] },
          { num: 4, titulo: 'Sob cuidado...',    roteiros: [4] },
          { num: 5, titulo: 'A explicação',      roteiros: [5] },
        ],
        roteiros: [1,2,3,4,5].map(n => ({ num: n, sps: [n] })),
      },
      {
        id: 'f1-uc3', num: 3, nome: 'Metabolismo',
        sps: [
          { num: 1, titulo: 'Fast food',     roteiros: [1] },
          { num: 2, titulo: 'Tratoraço!',    roteiros: [2] },
          { num: 3, titulo: 'Fitness!',      roteiros: [3] },
          { num: 4, titulo: 'Vida nova',     roteiros: [4, 5] },
          { num: 5, titulo: 'Diabesidade',   roteiros: [] },
        ],
        roteiros: [
          { num: 1, sps: [1] },
          { num: 2, sps: [2] },
          { num: 3, sps: [3] },
          { num: 4, sps: [4], combinado: 5 },
          { num: 5, sps: [4], combinado: 4 },
        ],
      },
    ],
  },
  // ── 2ª FASE ────────────────────────────────────────────────────────────────
  {
    num: 2, label: '2ª Fase',
    ucs: [
      {
        id: 'f2-uc1', num: 1, nome: 'Funções Biológicas',
        sps: [
          { num: 1, titulo: 'Vida líquida!',                  roteiros: [1] },
          { num: 2, titulo: 'Parceira da UBS',                roteiros: [2] },
          { num: 3, titulo: 'A visita!',                      roteiros: [3] },
          { num: 4, titulo: 'Quantas pedras no caminho!',     roteiros: [4] },
          { num: 5, titulo: 'Silenciosa demais!',             roteiros: [5] },
        ],
        roteiros: [1,2,3,4,5].map(n => ({ num: n, sps: [n] })),
      },
      {
        id: 'f2-uc2', num: 2, nome: 'Mecanismos de Agressão e Defesa',
        sps: [
          { num: 1, titulo: 'Um bolo de morango',          roteiros: [1] },
          { num: 2, titulo: 'A dengue ficou por aqui!',    roteiros: [2] },
          { num: 3, titulo: 'A decisão...',                roteiros: [3] },
          { num: 4, titulo: 'Rotina conturbada!',          roteiros: [4] },
          { num: 5, titulo: 'Botoeira',                    roteiros: [] },
        ],
        roteiros: [1,2,3,4].map(n => ({ num: n, sps: [n] })),
      },
      {
        id: 'f2-uc3', num: 3, nome: 'Abrangência das Ações de Saúde',
        sps: [
          { num: 1, titulo: 'A Secretaria de Saúde', roteiros: [1] },
          { num: 2, titulo: 'Super Liga',            roteiros: [2] },
          { num: 3, titulo: 'Super Liga 2',          roteiros: [3] },
          { num: 4, titulo: 'Super Liga 3',          roteiros: [4] },
        ],
        roteiros: [1,2,3,4].map(n => ({ num: n, sps: [n] })),
      },
    ],
  },
  // ── 3ª FASE ────────────────────────────────────────────────────────────────
  {
    num: 3, label: '3ª Fase',
    ucs: [
      {
        id: 'f3-uc1', num: 1, nome: 'Percepção, Consciência e Emoção',
        sps: [
          { num: 1, titulo: 'Precisamos dormir...',     roteiros: [1] },
          { num: 2, titulo: 'O acidente!',              roteiros: [2] },
          { num: 3, titulo: 'Sensação de boca seca',    roteiros: [3] },
          { num: 4, titulo: 'O Equilíbrio',             roteiros: [4] },
          { num: 5, titulo: 'A Negligência',            roteiros: [5] },
        ],
        roteiros: [1,2,3,4,5].map(n => ({ num: n, sps: [n] })),
      },
      {
        id: 'f3-uc2', num: 2, nome: 'Nascimento, Crescimento e Desenvolvimento',
        sps: [
          { num: 1, titulo: 'Aflição natural',                  roteiros: [1] },
          { num: 2, titulo: 'A Preocupação',                    roteiros: [2] },
          { num: 3, titulo: 'A cirurgia cardíaca pediátrica',   roteiros: [3] },
          { num: 4, titulo: 'Os indicadores',                   roteiros: [4] },
          { num: 5, titulo: 'Cuidado com as vacinas',           roteiros: [] },
        ],
        roteiros: [1,2,3,4].map(n => ({ num: n, sps: [n] })),
      },
      {
        id: 'f3-uc3', num: 3, nome: 'Processo de Envelhecimento',
        sps: [
          { num: 1, titulo: 'Roda de samba',                       roteiros: [] },
          { num: 2, titulo: 'O renascido',                         roteiros: [2] },
          { num: 3, titulo: 'A queda',                             roteiros: [3] },
          { num: 4, titulo: 'Na alegria na tristeza juntos...',    roteiros: [4] },
        ],
        roteiros: [
          { num: 2, sps: [2] },
          { num: 3, sps: [3] },
          { num: 4, sps: [4] },
        ],
      },
    ],
  },
  // ── 4ª FASE ────────────────────────────────────────────────────────────────
  {
    num: 4, label: '4ª Fase',
    ucs: [
      {
        id: 'f4-uc1', num: 1, nome: 'Doenças Resultantes da Agressão ao Meio Ambiente',
        sps: [
          { num: 1, titulo: 'Cavalo de Tróia',              roteiros: [1] },
          { num: 2, titulo: 'De Júpiter ou de Saturno?',    roteiros: [2] },
          { num: 3, titulo: 'Ata de Reunião',               roteiros: [3] },
          { num: 4, titulo: 'Cuidado com o corticoide!',    roteiros: [4] },
        ],
        roteiros: [1,2,3,4].map(n => ({ num: n, sps: [n] })),
      },
      {
        id: 'f4-uc2', num: 2, nome: 'Proliferação Celular',
        sps: [
          { num: 1, titulo: 'Nada Será Como Antes',                          roteiros: [1] },
          { num: 2, titulo: 'Eu, fazer esse exame? Nem pensar!',             roteiros: [2] },
          { num: 3, titulo: 'Mas essas doenças acontecem em crianças?',      roteiros: [3] },
          { num: 4, titulo: 'Mas eu só estou um pouco cansada…',             roteiros: [4] },
          { num: 5, titulo: 'O que fazer com uma dor de cabeça?',            roteiros: [5] },
        ],
        roteiros: [1,2,3,4,5].map(n => ({ num: n, sps: [n] })),
      },
      {
        id: 'f4-uc3', num: 3, nome: 'Saúde da Mulher, Sexualidade Humana e Planejamento Familiar',
        sps: [
          { num: 1, titulo: 'Se falar qualquer coisa…',  roteiros: [1] },
          { num: 2, titulo: 'E a vida continua',         roteiros: [2] },
          { num: 3, titulo: 'Gravidez não é doença!',    roteiros: [3] },
          { num: 4, titulo: 'Chegou a hora!',            roteiros: [] },
          { num: 5, titulo: 'Risco e Gravidade',         roteiros: [5] },
        ],
        roteiros: [
          { num: 1, sps: [1] },
          { num: 2, sps: [2] },
          { num: 3, sps: [3] },
          { num: 5, sps: [5] },
        ],
      },
    ],
  },
  // ── 5ª FASE ────────────────────────────────────────────────────────────────
  {
    num: 5, label: '5ª Fase',
    ucs: [
      {
        id: 'f5-uc1', num: 1, nome: 'Dor',
        sps: [
          { num: 1, titulo: 'Passando mal',                            roteiros: [1] },
          { num: 2, titulo: 'Que dor é essa?',                         roteiros: [] },
          { num: 3, titulo: 'Dói tudo!',                               roteiros: [3] },
          { num: 4, titulo: "Problemas de 'Cálculo' na Construção",   roteiros: [4] },
        ],
        roteiros: [
          { num: 1, sps: [1] },
          { num: 3, sps: [3] },
          { num: 4, sps: [4] },
        ],
      },
      {
        id: 'f5-uc2', num: 2, nome: 'Dor Abdominal, Diarreia, Vômitos e Icterícia',
        sps: [
          { num: 1, titulo: 'Plantada no Vaso',           roteiros: [1] },
          { num: 2, titulo: 'O Inesperado!',              roteiros: [2] },
          { num: 3, titulo: 'Tristes Lembranças...',      roteiros: [3] },
          { num: 4, titulo: 'Qual a diferença?',          roteiros: [4] },
          { num: 5, titulo: 'Um dia eu mudo de vida!',    roteiros: [5] },
        ],
        roteiros: [1,2,3,4,5].map(n => ({ num: n, sps: [n] })),
      },
      {
        id: 'f5-uc3', num: 3, nome: 'Febre, Inflamação e Infecção',
        sps: [
          { num: 1, titulo: 'Tudo tem sua hora!',                  roteiros: [1] },
          { num: 2, titulo: 'Devia ter ficado em casa!',           roteiros: [] },
          { num: 3, titulo: 'Problemas em cima de Problemas',      roteiros: [3] },
          { num: 4, titulo: 'Hospital, Nunca mais!',               roteiros: [4, 5] },
          { num: 5, titulo: 'Sexo, Drogas e Música Eletrônica',    roteiros: [] },
        ],
        roteiros: [
          { num: 1, sps: [1] },
          { num: 3, sps: [3] },
          { num: 4, sps: [4], combinado: 5 },
          { num: 5, sps: [4], combinado: 4 },
        ],
      },
    ],
  },
];

// ── Mock-âncora: Roteiro 04 da UC1 da 1ª fase (SP4 "A dúvida...") ───────────
// Único Roteiro com objetivos transcritos literalmente do Manual Docente.

const ROTEIRO_ANCORA = {
  faseNum: 1,
  ucId: 'f1-uc1',
  num: 4,
  ucNome: 'UC1 — Introdução ao Estudo da Medicina',
  faseLabel: '1ª Fase',
  sps: [{ num: 4, titulo: 'A dúvida...' }],
  professores: ['Paola de Lima', 'Laura Moretti Heidtmann', 'Christiano Berleze'],
  // Objetivos — transcrição literal do Manual Docente 2026.1, não parafrasear.
  objetivos: [
    'Conhecer na tomografia computadorizada da janela óssea e identificar cortical óssea e medula óssea nos exames radiológicos.',
    'Caracterizar tecido muscular.',
    'Diferenciar os tipos de tecidos musculares.',
    'Identificar os tecidos musculares nas lâminas histológicas do acervo físico e digital.',
  ],
  // Recursos visuais — hierarquia de fontes do Morfofuncional:
  //   1. UniLaminas (acervo institucional UNIDAVI / LACMA) — fonte primária
  //   2. Fontes acadêmicas externas estáveis (Histology Guide, MOL/USP, Radiopaedia) — link
  //   3. Acervo físico 3B Scientific (vínculo via QR — rodada futura)
  //   4. Bancos de licença aberta (Wikimedia, etc) — complemento
  recursos: [
    {
      id: 'unilaminas-musc-esq',
      hierarquia: 1, tipoFonte: 'UniLaminas',
      tipo: 'Histologia', disciplina: 'Histologia',
      titulo: 'Tecido muscular esquelético — corte longitudinal',
      legenda: 'Lâmina histológica do acervo institucional, com fotomicrografias em 10× e 40×. Estriações transversais visíveis; núcleos periféricos.',
      fonte: 'UniLaminas — acervo UNIDAVI / LACMA',
      atribuicao: 'LACMA — Liga Acadêmica de Ciências Morfofuncionais Aplicadas',
      licenca: 'Uso educacional institucional',
      link: 'unilaminas.unidavi.edu.br › Tecidos Básicos › Muscular',
    },
    {
      id: 'unilaminas-musc-liso',
      hierarquia: 1, tipoFonte: 'UniLaminas',
      tipo: 'Histologia', disciplina: 'Histologia',
      titulo: 'Tecido muscular liso — parede intestinal',
      legenda: 'Acervo digital UniLaminas. Células fusiformes, núcleo central único; ausência de estriações.',
      fonte: 'UniLaminas — acervo UNIDAVI / LACMA',
      atribuicao: 'LACMA — Liga Acadêmica de Ciências Morfofuncionais Aplicadas',
      licenca: 'Uso educacional institucional',
      link: 'unilaminas.unidavi.edu.br › Tecidos Básicos › Muscular',
    },
    {
      id: 'unilaminas-musc-card',
      hierarquia: 1, tipoFonte: 'UniLaminas',
      tipo: 'Histologia', disciplina: 'Histologia',
      titulo: 'Tecido muscular cardíaco — discos intercalares',
      legenda: 'Acervo digital UniLaminas. Cardiomiócitos com estriações, núcleo central, discos intercalares evidenciáveis.',
      fonte: 'UniLaminas — acervo UNIDAVI / LACMA',
      atribuicao: 'LACMA — Liga Acadêmica de Ciências Morfofuncionais Aplicadas',
      licenca: 'Uso educacional institucional',
      link: 'unilaminas.unidavi.edu.br › Sistemas › Circulatório',
    },
    {
      id: 'radiopaedia-tc-osso',
      hierarquia: 2, tipoFonte: 'Radiopaedia',
      tipo: 'Radiologia', disciplina: 'Radiologia',
      titulo: 'TC — janela óssea: cortical e medula',
      legenda: 'Caso de referência em radiologia musculoesquelética. Aprofundamento via link — não embarcado.',
      fonte: 'Radiopaedia.org',
      atribuicao: 'Curadoria docente — link de aprofundamento',
      licenca: 'CC-BY-NC-SA (Radiopaedia)',
      link: 'radiopaedia.org',
    },
    {
      id: 'wikimedia-musc-esq-eletron',
      hierarquia: 4, tipoFonte: 'Wikimedia',
      tipo: 'Histologia', disciplina: 'Histologia',
      titulo: 'Tecido muscular esquelético — microscopia eletrônica',
      legenda: 'Complemento. Sarcômero em alta resolução; bandas A, I, linha Z.',
      fonte: 'Wikimedia Commons',
      atribuicao: 'Autor original conforme página de origem',
      licenca: 'CC-BY-SA 4.0',
      link: 'commons.wikimedia.org',
    },
  ],
  // Capi-Cards e Questões — preservados da rodada anterior para o âncora R04.
  cards: [
    { id: 1, frente: 'Tecido muscular esquelético — características-chave' },
    { id: 2, frente: 'Tecido muscular liso — onde encontrar e como reconhecer' },
    { id: 3, frente: 'Tecido muscular cardíaco — discos intercalares' },
    { id: 4, frente: 'Cortical e medula óssea em TC — janela óssea' },
    { id: 5, frente: 'Diferenças histológicas entre os três tipos musculares' },
    { id: 6, frente: 'Lâmina de tecido muscular esquelético — pontos de identificação' },
  ],
  questoes: [
    { id: 'q1', enunciado: 'Em uma lâmina histológica corada em HE, a presença de estriações transversais e núcleos múltiplos em posição periférica caracteriza qual tipo de tecido muscular?', respondida: false },
    { id: 'q2', enunciado: 'Os discos intercalares são estruturas características de qual tipo de tecido muscular, e qual é a sua função?', respondida: false },
    { id: 'q3', enunciado: 'Em uma tomografia computadorizada com janela óssea, como se distingue a cortical óssea da medula óssea, e qual é a relevância clínica desta distinção?', respondida: false },
    { id: 'q4', enunciado: 'Cite duas localizações no corpo humano em que se encontra tecido muscular liso e descreva as características histológicas que permitem identificá-lo.', respondida: false },
  ],
  bibliografia: [
    { titulo: 'Junqueira LC & Carneiro J. Histologia Básica. 13ª ed. Guanabara Koogan, 2022 — capítulo "Tecido Muscular"', tipo: 'livro' },
    { titulo: 'Moore KL, Dalley AF, Agur AMR. Anatomia Orientada para a Clínica. 8ª ed. — capítulo introdutório (tecidos)', tipo: 'livro' },
    { titulo: 'UniLaminas — Acervo institucional UNIDAVI / LACMA — árvore "Tecidos Básicos › Muscular"', tipo: 'acervo' },
  ],
};

// ── Helpers ──────────────────────────────────────────────────────────────────
const FONTE_COR = {
  UniLaminas:       DS.green,
  'Histology Guide': DS.blue,
  'MOL-USP':        DS.blue,
  Radiopaedia:      DS.blue,
  '3B Scientific':  DS.terra || DS.amber,
  Wikimedia:        DS.textMuted,
};

function ImgPlaceholder({ disciplina, width = '100%', height = 140, label = 'imagem placeholder' }) {
  const cores = { Histologia: '#3A6BC8', Anatomia: '#2A8A5C', Embriologia: '#7A5CBF', Patologia: '#C4622D', Radiologia: '#1A6E8A', Fisiologia: '#B07A18' };
  const cor = cores[disciplina] || '#888';
  return (
    <div style={{
      width, height, borderRadius: DS.radius,
      background: `repeating-linear-gradient(45deg, ${cor}18, ${cor}18 6px, ${cor}08 6px, ${cor}08 14px)`,
      border: `1.5px dashed ${cor}60`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 6, color: cor,
    }}>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.5px' }}>{disciplina}</span>
      <span style={{ fontSize: 9, fontFamily: 'monospace', opacity: 0.7 }}>{label}</span>
    </div>
  );
}

// Selo "estrutura vazia" usado em Roteiros não-âncora.
function EstruturaVazia({ rotulo = 'estrutura a popular pela equipe docente', icon = '◌' }) {
  return (
    <div style={{
      padding: '18px 16px', borderRadius: DS.radius,
      border: `1.5px dashed ${DS.border}`, background: DS.bg,
      display: 'flex', gap: 12, alignItems: 'center',
    }}>
      <span style={{ fontSize: 22, color: DS.textMuted, fontFamily: 'monospace', flexShrink: 0 }}>{icon}</span>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: DS.text, letterSpacing: 0.3, textTransform: 'uppercase' }}>{rotulo}</span>
        <span style={{ fontSize: 11, color: DS.textMuted, lineHeight: 1.5 }}>
          Este Roteiro aparece na navegação como estrutura. Os objetivos, recursos, cards e questões serão preenchidos pela equipe docente do Morfofuncional.
        </span>
      </div>
    </div>
  );
}

// Resolve o título "Roteiro NN — SP" para exibição na lista.
function rotuloRoteiro(r, uc) {
  const sps = (r.sps || []).map(spn => uc.sps.find(sp => sp.num === spn)).filter(Boolean);
  const ref = sps.map(sp => `SP${sp.num} "${sp.titulo}"`).join(' + ');
  const num = String(r.num).padStart(2, '0');
  const combinadoSuffix = r.combinado ? ` (combinado com R${String(r.combinado).padStart(2,'0')})` : '';
  return { numFmt: num, ref, combinadoSuffix };
}

// ── Hub Morfofuncional ────────────────────────────────────────────────────────
function MorfoHub({ onSelectFase }) {
  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <TopBar
        title="Morfofuncional"
        subtitle="Roteiros integrados de morfologia e fisiologia · 1ª a 5ª Fase · Manuais Docentes 2026.1"
      />
      <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <SectionHeading>Selecione a fase</SectionHeading>
            <div style={{ fontSize: 12, color: DS.textMuted, marginTop: 4, lineHeight: 1.5 }}>
              Cada fase tem três Unidades Curriculares. Cada UC organiza Situações-Problema (SP) e Roteiros Morfofuncionais. A relação SP↔Roteiro não é 1:1 — há SP sem Roteiro vinculado e Roteiros que cobrem mais de uma SP.
            </div>
          </div>
          <div style={{ padding: '10px 14px', background: DS.surface, border: `1px solid ${DS.border}`, borderRadius: DS.radius, fontSize: 11, color: DS.textSec, maxWidth: 320 }}>
            <strong style={{ color: DS.text }}>Mock-âncora único: </strong>
            UC1 · Roteiro 04 da 1ª fase (SP4 "A dúvida..."). Demais Roteiros aparecem como estrutura à espera do conteúdo da equipe docente.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
          {MORFO_FASES.map(fase => {
            const totalRoteiros = fase.ucs.reduce((acc, uc) => acc + uc.roteiros.length, 0);
            const totalSps      = fase.ucs.reduce((acc, uc) => acc + uc.sps.length, 0);
            const temAncora     = fase.num === 1;
            return (
              <div
                key={fase.num}
                onClick={() => onSelectFase(fase)}
                style={{
                  background: DS.surface, borderRadius: DS.radiusLg,
                  border: `1px solid ${DS.border}`,
                  boxShadow: DS.shadow, padding: '20px',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.15s, transform 0.15s',
                  position: 'relative', overflow: 'hidden',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = DS.shadowMd; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = DS.shadow; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 4, background: temAncora ? DS.green : DS.blueLight, borderRadius: '0 14px 0 4px' }} />
                <div style={{ fontSize: 22, fontWeight: 900, color: DS.blue, marginBottom: 4 }}>{fase.num}ª</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: DS.text, marginBottom: 10 }}>{fase.label}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 10 }}>
                  {fase.ucs.map(uc => (
                    <div key={uc.id} style={{ fontSize: 11, color: DS.textSec, lineHeight: 1.4 }}>
                      <strong style={{ color: DS.text }}>UC{uc.num}</strong> — {uc.nome}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                  <Badge color={DS.textMuted}>{totalSps} SPs</Badge>
                  <Badge color={DS.textMuted}>{totalRoteiros} Roteiros</Badge>
                  {temAncora && <Badge color={DS.green}>1 âncora</Badge>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Rodapé corrigido — sem nome inventado, sem laboratório errado, sem promessa falsa */}
        <div style={{ marginTop: 8, padding: '14px 16px', background: DS.amberLight, borderRadius: DS.radius, border: `1px solid ${DS.amber}40`, display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 18 }}>🔬</span>
          <div style={{ flex: 1, minWidth: 240, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 12, color: DS.text, fontWeight: 700 }}>Microscopia virtual e modelos 3D</span>
            <span style={{ fontSize: 11, color: DS.textSec, lineHeight: 1.5 }}>
              Em desenvolvimento — oculto por feature flag até definição institucional (HANDOFF · F9).
              O acervo digital de lâminas histológicas <strong style={{ color: DS.text }}>já existe</strong> e está publicado: <strong style={{ color: DS.text }}>UniLaminas</strong> (<code style={{ fontSize: 10, background: DS.surface, padding: '1px 4px', borderRadius: 3 }}>unilaminas.unidavi.edu.br</code>), mantido pela LACMA.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── UC List (dentro de uma fase) ─────────────────────────────────────────────
function MorfoUCList({ fase, onBack, onSelectUC }) {
  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <div style={{ padding: '18px 32px 14px', background: DS.surface, borderBottom: `1px solid ${DS.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: DS.blue, fontWeight: 700, fontSize: 13, fontFamily: 'IBM Plex Sans, sans-serif', padding: 0 }}>← Fases</button>
        <span style={{ color: DS.textMuted }}>/</span>
        <span style={{ fontWeight: 700, fontSize: 14, color: DS.text }}>{fase.label}</span>
      </div>
      <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: DS.textSec, marginBottom: 4 }}>
          Três Unidades Curriculares — Manuais Docentes 2026.1
        </div>
        {fase.ucs.map(uc => {
          const semRoteiro = uc.sps.filter(sp => sp.roteiros.length === 0).length;
          return (
            <Card key={uc.id} hover onClick={() => onSelectUC(uc)} style={{ padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: DS.blue, letterSpacing: 0.5, marginBottom: 2 }}>UC{uc.num}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: DS.text, lineHeight: 1.35 }}>{uc.nome}</div>
                </div>
                <span style={{ color: DS.textMuted, fontSize: 18, flexShrink: 0 }}>›</span>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                <Badge color={DS.textMuted}>{uc.sps.length} SPs</Badge>
                <Badge color={DS.textMuted}>{uc.roteiros.length} Roteiros</Badge>
                {semRoteiro > 0 && <Badge color={DS.amber}>{semRoteiro} SP sem Roteiro</Badge>}
                {fase.num === 1 && uc.num === 1 && <Badge color={DS.green}>contém âncora R04</Badge>}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ── Lista de SPs/Roteiros dentro de uma UC ────────────────────────────────────
// A UC mostra explicitamente o mapa SP↔Roteiro: SPs com Roteiro vinculado,
// SPs sem Roteiro, e Roteiros que cobrem duas SPs (marcados como "combinado").

function MorfoRoteiroList({ fase, uc, onBack, onSelectRoteiro }) {
  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <div style={{ padding: '18px 32px 14px', background: DS.surface, borderBottom: `1px solid ${DS.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: DS.blue, fontWeight: 700, fontSize: 13, fontFamily: 'IBM Plex Sans, sans-serif', padding: 0 }}>← {fase.label}</button>
        </div>
        <div style={{ fontSize: 11, color: DS.blue, fontWeight: 700, letterSpacing: 0.5, marginBottom: 2 }}>UC{uc.num} · {fase.label}</div>
        <div style={{ fontWeight: 700, fontSize: 16, color: DS.text }}>{uc.nome}</div>
      </div>

      <div style={{ padding: '20px 32px', display: 'flex', flexDirection: 'column', gap: 18 }}>

        {/* Mapa SP → Roteiro (visualização honesta da relação não-1:1) */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: DS.textSec, marginBottom: 10, letterSpacing: 0.3, textTransform: 'uppercase' }}>
            Mapa Situação-Problema → Roteiro
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {uc.sps.map(sp => (
              <div key={sp.num} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 12px', background: DS.surface, border: `1px solid ${DS.border}`, borderRadius: DS.radiusSm, fontSize: 12 }}>
                <span style={{ fontWeight: 700, color: DS.text, minWidth: 36 }}>SP{sp.num}</span>
                <span style={{ flex: 1, color: DS.text }}>"{sp.titulo}"</span>
                <span style={{ color: DS.textMuted, fontSize: 14 }}>→</span>
                {sp.roteiros.length === 0 ? (
                  <Badge color={DS.amber}>sem Roteiro</Badge>
                ) : (
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {sp.roteiros.map(rn => (
                      <Badge key={rn} color={DS.blue}>R{String(rn).padStart(2,'0')}</Badge>
                    ))}
                    {sp.roteiros.length > 1 && <Badge color={DS.textMuted}>combinado</Badge>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Lista de Roteiros */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: DS.textSec, marginBottom: 10, letterSpacing: 0.3, textTransform: 'uppercase' }}>
            Roteiros Morfofuncionais
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {uc.roteiros.map(r => {
              const { numFmt, ref, combinadoSuffix } = rotuloRoteiro(r, uc);
              const ancora = r.ancora && uc.id === 'f1-uc1';
              return (
                <div
                  key={`${uc.id}-r${r.num}`}
                  onClick={() => onSelectRoteiro({ ...r, uc, fase })}
                  style={{
                    background: DS.surface, borderRadius: DS.radius,
                    border: `1px solid ${ancora ? DS.green : DS.border}`,
                    padding: '14px 18px', boxShadow: DS.shadow, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 14,
                    transition: 'box-shadow 0.15s',
                    borderLeft: ancora ? `4px solid ${DS.green}` : `1px solid ${DS.border}`,
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = DS.shadowMd}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = DS.shadow}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 8,
                    background: ancora ? DS.greenLight : DS.blueLight,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: 14, color: ancora ? DS.green : DS.blue,
                    flexShrink: 0,
                  }}>R{numFmt}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: DS.text, marginBottom: 3 }}>
                      Roteiro {numFmt}{combinadoSuffix}
                    </div>
                    <div style={{ fontSize: 11, color: DS.textMuted, lineHeight: 1.4 }}>{ref || '—'}</div>
                  </div>
                  {ancora ? (
                    <Badge color={DS.green}>mock-âncora · populado</Badge>
                  ) : (
                    <Badge color={DS.textMuted}>estrutura</Badge>
                  )}
                  <span style={{ color: DS.textMuted, fontSize: 18, flexShrink: 0 }}>›</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Roteiro Detail ────────────────────────────────────────────────────────────
// Mostra um Roteiro. Se for âncora, popula com os dados verificados do R04
// da UC1 da 1ª fase. Caso contrário, mantém a estrutura (7 blocos) com selos
// de "estrutura a popular pela equipe docente".

function MorfoRoteiroDetail({ roteiro, onBack, isMobile }) {
  const ancora = roteiro.ancora && roteiro.uc?.id === 'f1-uc1';
  const dados = ancora ? ROTEIRO_ANCORA : null;

  const [objetivosChecked, setObjetivosChecked] = React.useState({});
  const [acordeaoAberto, setAcordeaoAberto] = React.useState({ 1: true, 2: true, 3: ancora, 4: ancora, 5: ancora, 6: false, 7: false });
  const [imgAmpliada, setImgAmpliada] = React.useState(null);
  const [reflexao, setReflexao] = React.useState('');
  const [reflexaoEnviada, setReflexaoEnviada] = React.useState(false);

  const toggleAcordeao = (n) => setAcordeaoAberto(p => ({ ...p, [n]: !p[n] }));
  const toggleObjetivo = (i) => setObjetivosChecked(p => ({ ...p, [i]: !p[i] }));

  const numFmt = String(roteiro.num).padStart(2, '0');
  const spsRef = (roteiro.sps || []).map(spn => roteiro.uc.sps.find(sp => sp.num === spn)).filter(Boolean);

  // Os 7 blocos: cabeçalho (Vínculo SP + professores) + 6 secoes navegáveis.
  const secoes = [
    { num: 1, titulo: 'Objetivos do encontro' },
    { num: 2, titulo: 'Recursos visuais' },
    { num: 3, titulo: 'Capi-Cards do Roteiro' },
    { num: 4, titulo: 'Questões de fixação' },
    { num: 5, titulo: 'Bibliografia' },
    { num: 6, titulo: 'Reflexão para o portfólio' },
  ];

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg, position: 'relative' }}>

      {/* Cabeçalho */}
      <div style={{ padding: isMobile ? '14px 16px' : '18px 32px', background: DS.surface, borderBottom: `1px solid ${DS.border}` }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', fontSize: 11, color: DS.textMuted }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: DS.blue, fontWeight: 700, fontSize: 11, fontFamily: 'IBM Plex Sans, sans-serif', padding: 0 }}>← {roteiro.fase.label}</button>
          <span>/</span>
          <span>UC{roteiro.uc.num} — {roteiro.uc.nome}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: ancora ? DS.green : DS.blue, letterSpacing: 0.6, marginBottom: 4, textTransform: 'uppercase' }}>
              Roteiro Morfofuncional {numFmt}{roteiro.combinado ? ` (combinado com R${String(roteiro.combinado).padStart(2,'0')})` : ''}
            </div>
            <h1 style={{ margin: 0, fontSize: isMobile ? 16 : 20, fontWeight: 800, color: DS.text, lineHeight: 1.3 }}>
              {ancora
                ? `Tecido muscular e janela óssea em TC — SP4 "${spsRef[0]?.titulo}"`
                : (spsRef.length === 0
                    ? 'Roteiro sem vínculo direto com SP'
                    : spsRef.map(sp => `SP${sp.num} "${sp.titulo}"`).join(' + '))}
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
            {ancora
              ? <Badge color={DS.green}>mock-âncora · populado</Badge>
              : <Badge color={DS.textMuted}>estrutura</Badge>}
          </div>
        </div>

        {/* Bloco-cabeçalho com vínculo e professores (quando âncora) */}
        <div style={{ marginTop: 12, padding: '10px 12px', background: DS.bg, border: `1px solid ${DS.border}`, borderRadius: DS.radiusSm, display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 11 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ color: DS.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 700, fontSize: 10 }}>Vínculo</span>
            <span style={{ color: DS.text, fontWeight: 600 }}>
              {spsRef.length === 0
                ? 'sem SP vinculada'
                : spsRef.map(sp => `SP${sp.num} "${sp.titulo}"`).join(' · ')}
            </span>
          </div>
          {ancora && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ color: DS.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 700, fontSize: 10 }}>Professores do Roteiro</span>
              <span style={{ color: DS.text, fontWeight: 600 }}>{dados.professores.join(' · ')}</span>
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: isMobile ? '14px 16px' : '20px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {secoes.map(s => (
          <div key={s.num} style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, boxShadow: DS.shadow, overflow: 'hidden' }}>
            <button
              onClick={() => toggleAcordeao(s.num)}
              style={{ width: '100%', padding: '14px 18px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'IBM Plex Sans, sans-serif', textAlign: 'left' }}
            >
              <div style={{ width: 24, height: 24, borderRadius: 6, background: DS.blueLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: DS.blue, flexShrink: 0 }}>{s.num}</div>
              <span style={{ flex: 1, fontWeight: 700, fontSize: 13, color: DS.text }}>{s.titulo}</span>
              {!ancora && <Badge color={DS.textMuted}>estrutura</Badge>}
              <span style={{ color: DS.textMuted, transition: 'transform 0.2s', transform: acordeaoAberto[s.num] ? 'rotate(180deg)' : 'none', fontSize: 12 }}>▼</span>
            </button>

            {acordeaoAberto[s.num] && (
              <div style={{ padding: '0 18px 18px', borderTop: `1px solid ${DS.borderLight}` }}>

                {/* BLOCO 1 — Objetivos */}
                {s.num === 1 && (
                  ancora ? (
                    <div style={{ paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ fontSize: 11, color: DS.textMuted, marginBottom: 4, fontStyle: 'italic' }}>
                        Transcrição literal do Manual Docente 2026.1.
                      </div>
                      {dados.objetivos.map((obj, i) => (
                        <label key={i} style={{ display: 'flex', gap: 12, cursor: 'pointer', alignItems: 'flex-start' }}>
                          <input
                            type="checkbox" checked={!!objetivosChecked[i]}
                            onChange={() => toggleObjetivo(i)}
                            style={{ marginTop: 2, accentColor: DS.blue, width: 16, height: 16, flexShrink: 0 }}
                          />
                          <span style={{ fontSize: 13, color: objetivosChecked[i] ? DS.textMuted : DS.text, textDecoration: objetivosChecked[i] ? 'line-through' : 'none', lineHeight: 1.5 }}>
                            <strong>{i + 1}.</strong> {obj}
                          </span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div style={{ paddingTop: 14 }}>
                      <EstruturaVazia rotulo="objetivos a popular" />
                    </div>
                  )
                )}

                {/* BLOCO 2 — Recursos visuais (UniLaminas-first) */}
                {s.num === 2 && (
                  ancora ? (
                    <div style={{ paddingTop: 14 }}>
                      <div style={{ fontSize: 11, color: DS.textSec, marginBottom: 10, lineHeight: 1.5, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, color: DS.text }}>Hierarquia de fontes:</span>
                        <span><Badge color={DS.green}>1. UniLaminas</Badge> acervo institucional</span>
                        <span><Badge color={DS.blue}>2. Histology Guide / MOL-USP / Radiopaedia</Badge> link</span>
                        <span><Badge color={DS.terra || DS.amber}>3. 3B Scientific</Badge> via QR (futuro)</span>
                        <span><Badge color={DS.textMuted}>4. Wikimedia</Badge> complemento</span>
                      </div>
                      <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 8 }}>
                        {dados.recursos.map(r => (
                          <div
                            key={r.id}
                            onClick={() => setImgAmpliada(r)}
                            style={{
                              flexShrink: 0, width: 220, cursor: 'pointer',
                              background: DS.bg, borderRadius: DS.radius,
                              border: `1px solid ${DS.border}`, overflow: 'hidden',
                              transition: 'box-shadow 0.15s',
                              borderTop: `3px solid ${FONTE_COR[r.tipoFonte] || DS.textMuted}`,
                            }}
                            onMouseEnter={e => e.currentTarget.style.boxShadow = DS.shadowMd}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                          >
                            <ImgPlaceholder disciplina={r.disciplina} width="100%" height={120} label={r.tipoFonte === 'UniLaminas' ? 'lâmina UniLaminas' : r.tipoFonte === 'Radiopaedia' ? 'link Radiopaedia' : 'placeholder'} />
                            <div style={{ padding: '10px 12px' }}>
                              <div style={{ display: 'flex', gap: 4, marginBottom: 6, flexWrap: 'wrap' }}>
                                <Badge color={FONTE_COR[r.tipoFonte] || DS.textMuted}>
                                  {r.hierarquia === 1 ? 'fonte primária' : r.hierarquia === 4 ? 'complemento' : 'link'} · {r.tipoFonte}
                                </Badge>
                              </div>
                              <div style={{ fontSize: 11, fontWeight: 700, color: DS.text, marginBottom: 4, lineHeight: 1.3 }}>{r.titulo}</div>
                              <div style={{ fontSize: 10, color: DS.textMuted, lineHeight: 1.4, marginBottom: 6 }}>{r.legenda}</div>
                              <div style={{ fontSize: 9, color: DS.textMuted, fontFamily: 'monospace', wordBreak: 'break-all' }}>{r.link}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 6 }}>
                        Clique em qualquer item para ver os metadados completos: fonte, atribuição, licença, link.
                      </div>
                    </div>
                  ) : (
                    <div style={{ paddingTop: 14 }}>
                      <EstruturaVazia rotulo="recursos a curar" icon="▢" />
                    </div>
                  )
                )}

                {/* BLOCO 3 — Capi-Cards */}
                {s.num === 3 && (
                  ancora ? (
                    <div style={{ paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {dados.cards.map(c => (
                        <div key={c.id} style={{ background: DS.bg, borderRadius: DS.radius, border: `1px solid ${DS.border}`, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                          <span style={{ fontSize: 13, color: DS.text, fontWeight: 500, flex: 1 }}>{c.frente}</span>
                          <Btn variant="secondary" size="sm">Iniciar revisão FSRS</Btn>
                        </div>
                      ))}
                      <div style={{ fontSize: 11, color: DS.textMuted }}>{dados.cards.length} cards neste Roteiro</div>
                    </div>
                  ) : (
                    <div style={{ paddingTop: 14 }}>
                      <EstruturaVazia rotulo="Capi-Cards a gerar" icon="▢" />
                    </div>
                  )
                )}

                {/* BLOCO 4 — Questões */}
                {s.num === 4 && (
                  ancora ? (
                    <div style={{ paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {dados.questoes.map((q, i) => (
                        <div key={q.id} style={{ background: DS.bg, borderRadius: DS.radius, border: `1px solid ${DS.border}`, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span style={{ fontSize: 22, fontWeight: 800, color: DS.textMuted, minWidth: 28 }}>{i + 1}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, color: DS.text, lineHeight: 1.5 }}>{q.enunciado}</div>
                          </div>
                          <Btn variant="secondary" size="sm">Ver</Btn>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ paddingTop: 14 }}>
                      <EstruturaVazia rotulo="questões a popular" icon="◌" />
                    </div>
                  )
                )}

                {/* BLOCO 5 — Bibliografia */}
                {s.num === 5 && (
                  ancora ? (
                    <div style={{ paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {dados.bibliografia.map((b, i) => (
                        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 14px', background: DS.bg, borderRadius: DS.radiusSm, border: `1px solid ${DS.border}` }}>
                          <span style={{ fontSize: 16 }}>{b.tipo === 'livro' ? '📖' : b.tipo === 'acervo' ? '🗂' : '📄'}</span>
                          <span style={{ flex: 1, fontSize: 13, color: DS.text, lineHeight: 1.45 }}>{b.titulo}</span>
                          <Btn variant="secondary" size="sm">{b.tipo === 'acervo' ? 'Abrir UniLaminas ↗' : 'Minha Biblioteca'}</Btn>
                        </div>
                      ))}
                      <Btn variant="primary" size="sm" style={{ alignSelf: 'flex-start' }}>Aprofundar no UpToDate ↗</Btn>
                    </div>
                  ) : (
                    <div style={{ paddingTop: 14 }}>
                      <EstruturaVazia rotulo="bibliografia a referenciar" icon="▢" />
                    </div>
                  )
                )}

                {/* BLOCO 6 — Reflexão */}
                {s.num === 6 && (
                  <div style={{ paddingTop: 14 }}>
                    <p style={{ fontSize: 13, color: DS.textSec, lineHeight: 1.6, margin: '0 0 12px' }}>
                      Campo opcional. Sua reflexão será enviada ao Portfólio Reflexivo com o contexto deste Roteiro pré-preenchido.
                    </p>
                    {reflexaoEnviada ? (
                      <div style={{ padding: '14px 16px', background: DS.greenLight, borderRadius: DS.radius, border: `1px solid ${DS.green}40`, fontSize: 13, color: DS.green, fontWeight: 600 }}>
                        ✓ Reflexão enviada ao Portfólio Reflexivo com sucesso.
                      </div>
                    ) : (
                      <>
                        <textarea
                          value={reflexao}
                          onChange={e => setReflexao(e.target.value)}
                          placeholder="O que este Roteiro mobilizou em você? Que conexões clínicas percebeu? Que dúvidas permanecem?"
                          rows={5}
                          style={{ width: '100%', padding: '12px 14px', borderRadius: DS.radius, border: `1.5px solid ${DS.border}`, fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13, color: DS.text, resize: 'vertical', outline: 'none', boxSizing: 'border-box', lineHeight: 1.6 }}
                        />
                        <div style={{ marginTop: 10 }}>
                          <Btn variant="primary" size="sm" onClick={() => reflexao.trim() && setReflexaoEnviada(true)}>Enviar ao Portfólio Reflexivo ›</Btn>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Rodapé corrigido — sem nome de pessoa inventado, sem laboratório errado, sem promessa falsa */}
        <div style={{ textAlign: 'center', padding: '12px', borderTop: `1px solid ${DS.border}`, display: 'flex', justifyContent: 'center' }}>
          <StatusFlag kind="flag" criterio="microscopia virtual e modelos 3D — em desenvolvimento, oculto por feature flag até definição institucional" />
        </div>

        {isMobile && <div style={{ height: 60 }} />}
      </div>

      {/* Modal de imagem ampliada com metadados completos */}
      {imgAmpliada && (
        <div
          onClick={() => setImgAmpliada(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
        >
          <div onClick={e => e.stopPropagation()} style={{ background: DS.surface, borderRadius: DS.radiusLg, padding: 24, maxWidth: 580, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
            <ImgPlaceholder disciplina={imgAmpliada.disciplina} width="100%" height={220} label={imgAmpliada.tipoFonte === 'UniLaminas' ? 'lâmina UniLaminas' : 'placeholder'} />
            <div style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
                <Badge color={FONTE_COR[imgAmpliada.tipoFonte] || DS.textMuted}>
                  {imgAmpliada.hierarquia === 1 ? 'fonte primária' : imgAmpliada.hierarquia === 4 ? 'complemento' : 'link'} · {imgAmpliada.tipoFonte}
                </Badge>
              </div>
              <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: DS.text }}>{imgAmpliada.titulo}</h3>
              <p style={{ margin: '0 0 14px', fontSize: 13, color: DS.textSec, lineHeight: 1.6 }}>{imgAmpliada.legenda}</p>

              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '6px 12px', fontSize: 12, marginBottom: 14 }}>
                <span style={{ color: DS.textMuted, fontWeight: 700 }}>Fonte</span>
                <span style={{ color: DS.text }}>{imgAmpliada.fonte}</span>
                <span style={{ color: DS.textMuted, fontWeight: 700 }}>Atribuição</span>
                <span style={{ color: DS.text }}>{imgAmpliada.atribuicao}</span>
                <span style={{ color: DS.textMuted, fontWeight: 700 }}>Licença</span>
                <span style={{ color: DS.text }}>{imgAmpliada.licenca}</span>
                <span style={{ color: DS.textMuted, fontWeight: 700 }}>Link</span>
                <span style={{ color: DS.blue, fontFamily: 'monospace', fontSize: 11, wordBreak: 'break-all' }}>{imgAmpliada.link}</span>
              </div>

              <Btn variant="ghost" size="sm" onClick={() => setImgAmpliada(null)}>Fechar</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Screen principal (orquestrador de navegação) ──────────────────────────────
function MorfofuncionalScreen({ isMobile }) {
  const [view, setView] = React.useState('hub'); // 'hub' | 'ucs' | 'roteiros' | 'roteiro'
  const [faseSel, setFaseSel] = React.useState(null);
  const [ucSel, setUcSel] = React.useState(null);
  const [roteiroSel, setRoteiroSel] = React.useState(null);

  if (view === 'roteiro' && roteiroSel) {
    return <MorfoRoteiroDetail roteiro={roteiroSel} isMobile={isMobile} onBack={() => setView('roteiros')} />;
  }
  if (view === 'roteiros' && ucSel) {
    return <MorfoRoteiroList fase={faseSel} uc={ucSel} onBack={() => setView('ucs')} onSelectRoteiro={r => { setRoteiroSel(r); setView('roteiro'); }} />;
  }
  if (view === 'ucs' && faseSel) {
    return <MorfoUCList fase={faseSel} onBack={() => setView('hub')} onSelectUC={uc => { setUcSel(uc); setView('roteiros'); }} />;
  }
  return <MorfoHub onSelectFase={f => { setFaseSel(f); setView('ucs'); }} />;
}

Object.assign(window, { MorfofuncionalScreen });
