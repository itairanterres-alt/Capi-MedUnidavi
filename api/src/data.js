// Seed data + deterministic generators ported verbatim from the prototype.
// This is the canonical mock the screens were designed against.

// ── 27 DCN 2025 competencies (canonical slugs) ──────────────────────────────
export const DCN27_AREAS = {
  atencao:  { label: 'Atenção à Saúde',  cor: '#1565C0', corBg: '#E3F2FD' },
  gestao:   { label: 'Gestão em Saúde',  cor: '#C0571E', corBg: '#FFE8DA' },
  educacao: { label: 'Educação em Saúde', cor: '#2E7D4F', corBg: '#E7F4EC' },
};

export const DCN27_ESTADO = {
  suficiente:      { label: 'Suficiente',       cor: '#2E7D4F', corBg: '#E7F4EC', corBorda: '#A8D5BA' },
  precisaMelhorar: { label: 'Precisa melhorar', cor: '#B97A0F', corBg: '#FFF4DF', corBorda: '#E8C97A' },
  insuficiente:    { label: 'Insuficiente',     cor: '#B23A2A', corBg: '#FFE5E0', corBorda: '#E8A89B' },
  pendente:        { label: 'Pendente',         cor: '#7A8895', corBg: '#EFF1F4', corBorda: '#D6DCE3' },
};

export const DCN27 = [
  { id: 'dcn2025_comp_01', area: 'atencao', n: 1, titulo: 'Cuidado centrado na pessoa', resumo: 'Estabelecer relação de cuidado centrada na pessoa, família e comunidade, respeitando singularidades.' },
  { id: 'dcn2025_comp_02', area: 'atencao', n: 2, titulo: 'Anamnese e exame físico', resumo: 'Realizar anamnese e exame físico orientados, com escuta ativa e raciocínio clínico.' },
  { id: 'dcn2025_comp_03', area: 'atencao', n: 3, titulo: 'Raciocínio clínico e diagnóstico', resumo: 'Construir hipóteses diagnósticas integrando dados clínicos, epidemiológicos e contextuais.' },
  { id: 'dcn2025_comp_04', area: 'atencao', n: 4, titulo: 'Uso racional de exames complementares', resumo: 'Indicar e interpretar exames com critério, segurança e economicidade.' },
  { id: 'dcn2025_comp_05', area: 'atencao', n: 5, titulo: 'Plano terapêutico singular', resumo: 'Elaborar plano terapêutico individualizado, considerando preferências e contexto.' },
  { id: 'dcn2025_comp_06', area: 'atencao', n: 6, titulo: 'Procedimentos clínicos e cirúrgicos básicos', resumo: 'Executar procedimentos básicos com técnica, segurança e biossegurança.' },
  { id: 'dcn2025_comp_07', area: 'atencao', n: 7, titulo: 'Urgência e emergência', resumo: 'Reconhecer e atender situações de urgência/emergência conforme protocolos.' },
  { id: 'dcn2025_comp_08', area: 'atencao', n: 8, titulo: 'Promoção e prevenção', resumo: 'Desenvolver ações de promoção da saúde e prevenção em todos os ciclos de vida.' },
  { id: 'dcn2025_comp_09', area: 'atencao', n: 9, titulo: 'Saúde mental', resumo: 'Abordar sofrimento psíquico, transtornos mentais e comportamentos de risco com integralidade.' },
  { id: 'dcn2025_comp_10', area: 'atencao', n: 10, titulo: 'Saúde da mulher', resumo: 'Atenção integral à saúde da mulher em todos os ciclos de vida e contextos.' },
  { id: 'dcn2025_comp_11', area: 'atencao', n: 11, titulo: 'Saúde da criança e adolescente', resumo: 'Atenção integral à criança e adolescente, com foco em desenvolvimento e vulnerabilidades.' },
  { id: 'dcn2025_comp_12', area: 'atencao', n: 12, titulo: 'Saúde do idoso', resumo: 'Atenção à pessoa idosa com avaliação funcional e abordagem multidimensional.' },
  { id: 'dcn2025_comp_13', area: 'atencao', n: 13, titulo: 'Saúde da família e comunidade', resumo: 'Atuar na atenção primária com clínica ampliada, território e família.' },
  { id: 'dcn2025_comp_14', area: 'atencao', n: 14, titulo: 'Cuidados paliativos e fim de vida', resumo: 'Abordar dor, sintomas, decisões compartilhadas e cuidado em fim de vida.' },
  { id: 'dcn2025_comp_15', area: 'atencao', n: 15, titulo: 'Saúde coletiva e vigilância', resumo: 'Reconhecer determinantes sociais, atuar em vigilância em saúde e enfrentar iniquidades.' },
  { id: 'dcn2025_comp_16', area: 'atencao', n: 16, titulo: 'Comunicação clínica', resumo: 'Comunicar-se de forma clara, empática e culturalmente sensível com pessoas e equipes.' },
  { id: 'dcn2025_comp_17', area: 'atencao', n: 17, titulo: 'Segurança do paciente', resumo: 'Aplicar princípios de segurança do paciente, gestão de risco e qualidade do cuidado.' },
  { id: 'dcn2025_comp_18', area: 'atencao', n: 18, titulo: 'Ética e profissionalismo', resumo: 'Atuar com ética, integridade e responsabilidade social no exercício profissional.' },
  { id: 'dcn2025_comp_19', area: 'gestao', n: 19, titulo: 'SUS, sistemas e redes', resumo: 'Compreender e atuar no SUS, redes de atenção e regulação assistencial.' },
  { id: 'dcn2025_comp_20', area: 'gestao', n: 20, titulo: 'Trabalho em equipe', resumo: 'Atuar em equipe interprofissional com colaboração, liderança situacional e resolução de conflito.' },
  { id: 'dcn2025_comp_21', area: 'gestao', n: 21, titulo: 'Gestão do cuidado', resumo: 'Coordenar o cuidado entre serviços, níveis de atenção e tempos clínicos.' },
  { id: 'dcn2025_comp_22', area: 'gestao', n: 22, titulo: 'Políticas públicas e legislação', resumo: 'Aplicar políticas, normas e legislação sanitária e profissional ao cotidiano.' },
  { id: 'dcn2025_comp_23', area: 'gestao', n: 23, titulo: 'Gestão de processos e qualidade', resumo: 'Empregar ferramentas de gestão da qualidade e melhoria contínua em serviços de saúde.' },
  { id: 'dcn2025_comp_24', area: 'gestao', n: 24, titulo: 'Informação em saúde', resumo: 'Usar sistemas de informação, dados clínicos e indicadores para decisão e planejamento.' },
  { id: 'dcn2025_comp_25', area: 'gestao', n: 25, titulo: 'Saúde digital', resumo: 'Aplicar tecnologias digitais, telessaúde e IA com letramento crítico e ético.' },
  { id: 'dcn2025_comp_26', area: 'educacao', n: 26, titulo: 'Educação permanente', resumo: 'Manter-se em formação contínua, com prática reflexiva e ciência aberta.' },
  { id: 'dcn2025_comp_27', area: 'educacao', n: 27, titulo: 'Pesquisa, MBE e ensino', resumo: 'Praticar medicina baseada em evidências, produzir e divulgar conhecimento em saúde.' },
];

// ── 27 competencies in Roman form (used by Perfil + Coordenação matrices) ────
export const COMPETENCIAS_27 = [
  { idx: 'I',     titulo: 'Promoção, prevenção, diagnóstico, tratamento, reabilitação e cuidados paliativos integrais', eixo: 'Atenção à Saúde' },
  { idx: 'II',    titulo: 'Cuidado centrado na pessoa', eixo: 'Atenção à Saúde' },
  { idx: 'III',   titulo: 'Anamnese, exame físico e raciocínio diagnóstico', eixo: 'Atenção à Saúde' },
  { idx: 'IV',    titulo: 'Ética, empatia e respeito nas relações', eixo: 'Atenção à Saúde' },
  { idx: 'V',     titulo: 'Responsabilidade social e princípios deontológicos', eixo: 'Atenção à Saúde' },
  { idx: 'VI',    titulo: 'Atuação resolutiva nos níveis de atenção e APS coordenadora', eixo: 'Atenção à Saúde' },
  { idx: 'VII',   titulo: 'Inovações tecnológicas: IA, telemedicina, big data', eixo: 'Gestão em Saúde' },
  { idx: 'VIII',  titulo: 'Comunicação verbal/não verbal/escrita, idiomas e tecnologia', eixo: 'Atenção à Saúde' },
  { idx: 'IX',    titulo: 'Liderança colaborativa interprofissional', eixo: 'Gestão em Saúde' },
  { idx: 'X',     titulo: 'Medicina baseada em evidências e segurança do paciente', eixo: 'Atenção à Saúde' },
  { idx: 'XI',    titulo: 'Diversidade humana e populações vulnerabilizadas', eixo: 'Atenção à Saúde' },
  { idx: 'XII',   titulo: 'Empatia, escuta qualificada, comunicação e trabalho colaborativo', eixo: 'Atenção à Saúde' },
  { idx: 'XIII',  titulo: 'Educação permanente e continuada', eixo: 'Educação em Saúde' },
  { idx: 'XIV',   titulo: 'Emergências sanitárias, desastres e biossegurança', eixo: 'Atenção à Saúde' },
  { idx: 'XV',    titulo: 'Determinantes sociais, ambientais e mudanças climáticas', eixo: 'Atenção à Saúde' },
  { idx: 'XVI',   titulo: 'Mercado de trabalho e políticas públicas de saúde', eixo: 'Gestão em Saúde' },
  { idx: 'XVII',  titulo: 'Autocuidado e bem-estar do profissional', eixo: 'Atenção à Saúde' },
  { idx: 'XVIII', titulo: 'Gestão em saúde e uso racional de recursos', eixo: 'Gestão em Saúde' },
  { idx: 'XIX',   titulo: 'Processos educacionais interprofissionais', eixo: 'Educação em Saúde' },
  { idx: 'XX',    titulo: 'Práticas clínicas seguras e prevenção de riscos', eixo: 'Atenção à Saúde' },
  { idx: 'XXI',   titulo: 'Integração de saberes biomédicos, clínicos, epidemiológicos e sociais', eixo: 'Atenção à Saúde' },
  { idx: 'XXII',  titulo: 'Atuação em equipes interprofissionais', eixo: 'Atenção à Saúde' },
  { idx: 'XXIII', titulo: 'Autonomia, dignidade, privacidade e confidencialidade', eixo: 'Atenção à Saúde' },
  { idx: 'XXIV',  titulo: 'Compromisso com o sistema de saúde e notificação compulsória', eixo: 'Gestão em Saúde' },
  { idx: 'XXV',   titulo: 'Avaliação crítica de tecnologias e custo-efetividade', eixo: 'Gestão em Saúde' },
  { idx: 'XXVI',  titulo: 'Proteção de dados (LGPD)', eixo: 'Gestão em Saúde' },
  { idx: 'XXVII', titulo: 'Documentação clínica: prontuários, registros, laudos', eixo: 'Atenção à Saúde' },
];

// ── 27 DCN competencies in AS/GS/ES form (Coordenação 27x12 matrix) ─────────
export const COMP_DCN_2025 = [
  { id: 'AS-01', area: 'Atenção à Saúde', short: 'Anamnese e relação clínica' },
  { id: 'AS-02', area: 'Atenção à Saúde', short: 'Exame físico' },
  { id: 'AS-03', area: 'Atenção à Saúde', short: 'Raciocínio clínico-diagnóstico' },
  { id: 'AS-04', area: 'Atenção à Saúde', short: 'Plano terapêutico compartilhado' },
  { id: 'AS-05', area: 'Atenção à Saúde', short: 'Procedimentos clínicos' },
  { id: 'AS-06', area: 'Atenção à Saúde', short: 'Urgência e emergência' },
  { id: 'AS-07', area: 'Atenção à Saúde', short: 'Saúde mental e cuidado integral' },
  { id: 'AS-08', area: 'Atenção à Saúde', short: 'Cuidado em rede e continuidade' },
  { id: 'AS-09', area: 'Atenção à Saúde', short: 'Prevenção quaternária' },
  { id: 'AS-10', area: 'Atenção à Saúde', short: 'Cuidado paliativo' },
  { id: 'AS-11', area: 'Atenção à Saúde', short: 'Saúde da família e comunidade' },
  { id: 'AS-12', area: 'Atenção à Saúde', short: 'Bioética e tomada de decisão' },
  { id: 'GS-01', area: 'Gestão em Saúde', short: 'SUS — princípios e organização' },
  { id: 'GS-02', area: 'Gestão em Saúde', short: 'Gestão da clínica e do cuidado' },
  { id: 'GS-03', area: 'Gestão em Saúde', short: 'Trabalho em equipe interprofissional' },
  { id: 'GS-04', area: 'Gestão em Saúde', short: 'Vigilância em saúde' },
  { id: 'GS-05', area: 'Gestão em Saúde', short: 'Indicadores e qualidade' },
  { id: 'GS-06', area: 'Gestão em Saúde', short: 'Segurança do paciente' },
  { id: 'GS-07', area: 'Gestão em Saúde', short: 'Determinantes sociais e equidade' },
  { id: 'GS-08', area: 'Gestão em Saúde', short: 'Liderança e gestão de processos' },
  { id: 'ES-01', area: 'Educação em Saúde', short: 'Educação permanente' },
  { id: 'ES-02', area: 'Educação em Saúde', short: 'Comunicação em saúde' },
  { id: 'ES-03', area: 'Educação em Saúde', short: 'Ética profissional e identidade' },
  { id: 'ES-04', area: 'Educação em Saúde', short: 'Pensamento crítico-reflexivo' },
  { id: 'ES-05', area: 'Educação em Saúde', short: 'Pesquisa e MBE' },
  { id: 'ES-06', area: 'Educação em Saúde', short: 'Prática colaborativa e ensino' },
  { id: 'ES-07', area: 'Educação em Saúde', short: 'Tecnologia, dados e saúde digital' },
];

export const FASES = ['1ª','2ª','3ª','4ª','5ª','6ª','7ª','8ª','9ª','10ª','11ª','12ª'];
export const FASE_TO_TURMA = {
  '1ª':'T18','2ª':'T17','3ª':'T16','4ª':'T15','5ª':'T14','6ª':'T13',
  '7ª':'T12','8ª':'T11','9ª':'T10','10ª':'T09','11ª':'T08','12ª':'T07',
};

// ── Coordenação cell-state generator (estadoCelula, verbatim) ───────────────
export function estadoCelula(compId, fase) {
  const seed = (compId.charCodeAt(0) + compId.charCodeAt(3) * 13 + parseInt(compId.slice(-2), 10) + parseInt(fase, 10) * 7) % 11;
  if (seed === 0) return 'insuficiente';
  if (seed <= 3) return 'precisa-melhorar';
  if (seed <= 8) return 'suficiente';
  return 'pendente';
}

// ── dcn27EstadoMock (verbatim) — for Coordenação area-eixo heatmap ──────────
export function dcn27EstadoMock(id) {
  let h = 0; for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  const n = parseInt(id.split('_').pop(), 10);
  const tocada = (n <= 8) || [13, 15, 16, 17, 18].includes(n);
  if (!tocada) return 'pendente';
  const r = Math.abs(h) % 100;
  if (r < 60) return 'suficiente';
  if (r < 85) return 'precisaMelhorar';
  return 'insuficiente';
}

// ── João Melo programmatic matrix (27 x 5 semesters), verbatim generator ────
export const JOAO_SEMESTRES = ['2023/2', '2024/1', '2024/2', '2025/1', '2025/2'];
export function buildJoaoMatriz() {
  const sems = JOAO_SEMESTRES;
  const fortes = ['III', 'X', 'XXI', 'I', 'II', 'XX', 'XXVII', 'XXVI'];
  const atencao = ['VIII', 'XII', 'XXII'];
  const insuf = ['XVII'];
  const pendentes = ['VII', 'IX', 'XVI', 'XVIII', 'XXIV', 'XXV', 'XIII', 'XIX'];
  return COMPETENCIAS_27.map(c => {
    const row = sems.map((sem, i) => {
      if (pendentes.includes(c.idx)) {
        if (i >= 3 && (c.idx === 'XIII' || c.idx === 'XIX')) return 'precisa';
        return 'pendente';
      }
      if (insuf.includes(c.idx)) {
        if (i < 2) return 'pendente';
        if (i === 2) return 'precisa';
        return 'insuficiente';
      }
      if (atencao.includes(c.idx)) {
        if (i === 0) return 'pendente';
        return 'precisa';
      }
      if (fortes.includes(c.idx)) {
        if (i === 0) return 'pendente';
        if (i === 1) return 'precisa';
        return 'suficiente';
      }
      const padrao = ['pendente', 'pendente', 'precisa', 'suficiente', 'suficiente'];
      return padrao[i];
    });
    return { idx: c.idx, sems: row };
  });
}

export const EVIDENCIAS = {
  'III|2025/1': ['3 APCs nível 4 Dreyfus (preceptor: João Silva)', '12 reflexões publicadas no Portfólio', 'TP 58% (acima da média da fase)', 'OSCE 62/100 (estação 4 — comunicação difícil)'],
  'VIII|2025/2': ['2 P-MEX em Tutorial: comunicação assertiva mediana', 'OSCE estação 4 (comunicação difícil): 48/100', 'Reflexão de 14/09 reconhece dificuldade em entrevistas'],
  'XII|2025/2': ['MSF aplicado fim de 4º sem.: feedback colaborativo "precisa melhorar"', 'Tutorial: 2 registros de baixa participação coletiva', 'IESC: visita domiciliar com pares — relato discreto'],
  'XVII|2025/2': ['Auto-relato no Portfólio de 2 sintomas de exaustão', 'Atividade Capi-Cards caiu 65% no último mês', 'Sinal ainda formativo — tutoria já notificada'],
  'XXII|2025/2': ['IESC Grupo 2: 2 registros de delegação inadequada na visita', 'Tutorial: dificuldade em sintetizar consenso do grupo'],
};

// ── Full João Melo profile (sub-collections) ────────────────────────────────
export const JOAO_MELO = {
  id: 'joao-melo', nome: 'João Melo', matricula: '2024010542', turma: 'T14', fase: '5ª fase',
  status: 'atencao', statusLabel: 'Atenção', tutor: 'Prof. Ângelo', ingresso: '2023/2',
  tp: 41, dreyfus_med: 2.5,
  subturmas: {
    tutorial: 'Subgrupo C · Prof. Ângelo · sala 315B',
    habClinicas: 'T B · Profa. Talita',
    habDigital: 'T A · Prof. Lucas',
    iesc: 'Grupo 2 · Profa. Andreia · USF Bela Vista',
  },
  ucs: [
    { fase: '1ª fase', semestre: '2023/2', titulo: 'Bases Biológicas I', conceito: 'suficiente', componentes: [
      { tipo: 'TP', detalhe: '54%', conceito: 'suficiente' },
      { tipo: 'Tutorial', detalhe: 'participação regular', conceito: 'suficiente' },
      { tipo: 'Morfofuncional', detalhe: 'todas as estações concluídas', conceito: 'suficiente' }] },
    { fase: '2ª fase', semestre: '2024/1', titulo: 'Bases Biológicas II', conceito: 'suficiente', componentes: [
      { tipo: 'TP', detalhe: '57%', conceito: 'suficiente' }] },
    { fase: '3ª fase', semestre: '2024/2', titulo: 'Saúde do Adulto I', conceito: 'precisa', componentes: [
      { tipo: 'TP', detalhe: '52%', conceito: 'precisa' },
      { tipo: 'Tutorial', detalhe: 'sínteses curtas, baixa articulação', conceito: 'precisa' },
      { tipo: 'OSCE', detalhe: 'estação comunicação 50/100', conceito: 'precisa' }] },
    { fase: '4ª fase', semestre: '2025/1', titulo: 'Saúde do Adulto II', conceito: 'suficiente', componentes: [
      { tipo: 'TP', detalhe: '58%', conceito: 'suficiente' },
      { tipo: 'APC', detalhe: '3 APCs Dreyfus 3', conceito: 'suficiente' }] },
    { fase: '5ª fase', semestre: '2025/2', titulo: 'Saúde da Mulher e da Criança', conceito: 'precisa', componentes: [
      { tipo: 'TP parcial', detalhe: '49%', conceito: 'precisa' },
      { tipo: 'APC', detalhe: '1 APC Dreyfus 2 (regressão)', conceito: 'precisa' },
      { tipo: 'IESC', detalhe: 'visita domiciliar — registro discreto', conceito: 'precisa' }] },
  ],
  apcs: [
    { data: '12/03/24', semestre: '2024/1', epa: 'EPA-2 Anamnese', dreyfus: 2, avaliador: 'Prof. Ângelo', parecer: 'Coleta com lacunas; reforçar HMA estruturada.' },
    { data: '08/05/24', semestre: '2024/1', epa: 'EPA-2 Anamnese', dreyfus: 2, avaliador: 'Profa. Talita', parecer: 'Boa empatia; faltou aprofundar revisão de sistemas.' },
    { data: '20/09/24', semestre: '2024/2', epa: 'EPA-3 Exame físico', dreyfus: 3, avaliador: 'Prof. Ângelo', parecer: 'Sequência adequada; ainda hesitante em manobras.' },
    { data: '15/03/25', semestre: '2025/1', epa: 'EPA-4 Plano diagnóstico', dreyfus: 3, avaliador: 'Prof. João Silva', parecer: 'Hipóteses bem ranqueadas; justifica com evidência.' },
    { data: '10/05/25', semestre: '2025/1', epa: 'EPA-4 Plano diagnóstico', dreyfus: 4, avaliador: 'Prof. João Silva', parecer: 'Excelente raciocínio — diagnóstico diferencial robusto.' },
    { data: '08/09/25', semestre: '2025/2', epa: 'EPA-2 Anamnese', dreyfus: 2, avaliador: 'Profa. Talita', parecer: 'Regressão — comunicação difícil mal manejada; sinal de Atenção.' },
  ],
  portfolio: {
    reflexoes: [
      { data: '14/09/25', categoria: 'Tutorial', titulo: 'Limites da minha escuta em entrevistas difíceis' },
      { data: '02/09/25', categoria: 'IESC', titulo: 'Visita domiciliar à família BSV-042 — o que aprendi' },
      { data: '20/08/25', categoria: 'Habilidades', titulo: 'Aprendendo manobras semiológicas' },
      { data: '05/08/25', categoria: 'Conhecimentos Gerais', titulo: 'Cuidados paliativos e a morte digna' },
      { data: '15/07/25', categoria: 'Tutorial', titulo: 'Síntese da SP4 — pneumonia comunitária' },
      { data: '02/07/25', categoria: 'Morfofuncional', titulo: 'Histologia do trato gastrointestinal' },
      { data: '20/06/25', categoria: 'IESC', titulo: 'Determinantes sociais no bairro Bela Vista' },
      { data: '05/06/25', categoria: 'Habilidades', titulo: 'Primeira sutura — desafios' },
      { data: '20/05/25', categoria: 'Tutorial', titulo: 'Discussão de SP3 — diabetes tipo 2' },
      { data: '02/05/25', categoria: 'Conhecimentos Gerais', titulo: 'MBE — leitura crítica de RCT' },
      { data: '15/04/25', categoria: 'IESC', titulo: 'Genograma da família BSV-042' },
      { data: '02/04/25', categoria: 'Tutorial', titulo: 'Mapa conceitual SP2' },
      { data: '20/03/25', categoria: 'Habilidades', titulo: 'Aferição de PA — armadilhas' },
      { data: '05/03/25', categoria: 'Morfofuncional', titulo: 'Anatomia do mediastino' },
      { data: '20/02/25', categoria: 'Tutorial', titulo: 'SP1 — síndrome metabólica' },
      { data: '05/02/25', categoria: 'Conhecimentos Gerais', titulo: 'Bioética e confidencialidade' },
      { data: '20/12/24', categoria: 'IESC', titulo: 'Mapa do território Bela Vista' },
      { data: '05/12/24', categoria: 'Tutorial', titulo: 'Reflexão final 4ª fase' },
    ],
  },
  treino: [
    { mes: 'out/24', cards: 220, questoes: 60, retencao: 78 },
    { mes: 'nov/24', cards: 240, questoes: 72, retencao: 80 },
    { mes: 'dez/24', cards: 180, questoes: 50, retencao: 76 },
    { mes: 'jan/25', cards: 90, questoes: 24, retencao: 70 },
    { mes: 'fev/25', cards: 200, questoes: 55, retencao: 78 },
    { mes: 'mar/25', cards: 260, questoes: 80, retencao: 82 },
    { mes: 'abr/25', cards: 240, questoes: 75, retencao: 81 },
    { mes: 'mai/25', cards: 220, questoes: 70, retencao: 80 },
    { mes: 'jun/25', cards: 180, questoes: 55, retencao: 76 },
    { mes: 'jul/25', cards: 200, questoes: 62, retencao: 78 },
    { mes: 'ago/25', cards: 240, questoes: 78, retencao: 80 },
    { mes: 'set/25', cards: 84, questoes: 22, retencao: 68 },
  ],
  iesc: { familias: 1, visitas: 8, projetos: 1, horas: 32 },
  ic: {
    modalidade: 'candidato', orientador: null, etapa: null,
    descricao: 'João está na 5ª fase — antes do TC I obrigatório (7ª/8ª fase). Está sendo avaliado pelo pipeline NPCMed para trilha de excelência: cards de método consolidados, reflexões com viés científico e leituras frequentes em cardiologia.',
    producoes: [],
  },
  statusEnamed: { historico: [44, 49, 52], corte: 60, coorte: 2030 },
  atitudinal: {
    triangulacaoSuficiente: true, statusGlobal: 'suficiente',
    pmex: [
      { fase: '3ª fase', cenario: 'Tutorial — debate em SP3', data: '12/11/24', conceito: 'suficiente' },
      { fase: '4ª fase', cenario: 'IESC — visita domiciliar', data: '08/04/25', conceito: 'suficiente' },
    ],
    msf: [{ fase: '4ª fase', data: '02/06/25', conceito: 'suficiente' }],
    autoavaliacoes: 4, incidentes: [],
  },
};

// ── Cohort of students (Coordenação search / drilldown) ─────────────────────
export const ALUNOS_MOCK = [
  { id: 'joao-melo', nome: 'João Melo', matricula: '2024010542', turma: 'T14', fase: '5ª', status: 'atencao', tp: 41, dreyfus: 2.5 },
  { id: 'ana-lima', nome: 'Ana Lima', matricula: '2024010014', turma: 'T16', fase: '3ª', status: 'ok', tp: 58, dreyfus: 3.0 },
  { id: 'carlos-sousa', nome: 'Carlos Sousa', matricula: '2024010027', turma: 'T16', fase: '3ª', status: 'risco', tp: 31, dreyfus: 1.6 },
  { id: 'fernanda-reis', nome: 'Fernanda Reis', matricula: '2022010101', turma: 'T14', fase: '5ª', status: 'ok', tp: 52, dreyfus: 3.4 },
  { id: 'livia-torres', nome: 'Livia Torres', matricula: '2024010019', turma: 'T16', fase: '3ª', status: 'ok', tp: 63, dreyfus: 3.2 },
  { id: 'pedro-vilas', nome: 'Pedro Vilas', matricula: '2021010074', turma: 'T13', fase: '6ª', status: 'risco', tp: 28, dreyfus: 1.8 },
  { id: 'mariana-c', nome: 'Mariana Costa', matricula: '2022010120', turma: 'T14', fase: '5ª', status: 'atencao', tp: 44, dreyfus: 2.3 },
  { id: 'diego-hauck', nome: 'Diego Hauck', matricula: '2021010088', turma: 'T13', fase: '6ª', status: 'atencao', tp: 47, dreyfus: 2.6 },
  { id: 'beatriz-l', nome: 'Beatriz Luz', matricula: '2022010133', turma: 'T14', fase: '5ª', status: 'ok', tp: 55, dreyfus: 3.1 },
];

// ── Dashboard payload (dynamic arrays the screen fetches) ───────────────────
export const DASHBOARD = {
  todayItems: [
    { type: 'cards', label: 'Revisar 8 flashcards de Farmacologia', sub: 'Antes do TBL das 14h — gerado por FSRS', color: '#C4622D', icon: '🃏', screen: 'capi-cards', cta: '8 cards pendentes' },
    { type: 'leitura', label: "Leitura obrigatória: DPOC — Harrison's, cap. 308", sub: 'Tutorial PBL · Grupo C · prazo: 18h', color: '#023E88', icon: '📖', screen: null, cta: 'Leitura' },
    { type: 'entrega', label: 'IESC: Relatório de Visita Domiciliar', sub: 'Prazo: hoje às 23h59 · UBS Bela Vista', color: '#2A8A5C', icon: '🏘', screen: null, cta: 'Entrega' },
  ],
  agenda: [
    { dia: 'Seg', data: 21, ativo: false, eventos: 2 },
    { dia: 'Ter', data: 22, ativo: false, eventos: 1 },
    { dia: 'Qua', data: 23, ativo: true, eventos: 3 },
    { dia: 'Qui', data: 24, ativo: false, eventos: 2 },
    { dia: 'Sex', data: 25, ativo: false, eventos: 1 },
  ],
  ucs: [
    { nome: 'Morfofuncional III', fase: '3ª Fase', progresso: 68, color: '#023E88' },
    { nome: 'IESC III', fase: '3ª Fase', progresso: 52, color: '#2A8A5C' },
    { nome: 'Tutorial PBL', fase: 'Grupo C', progresso: 80, color: '#C4622D' },
    { nome: 'Habilidades Profissionais III', fase: '3ª Fase', progresso: 41, color: '#7A5CBF' },
  ],
  avisos: [
    { texto: 'Lab. de Emergência: operacional em julho/2026. Inscrições abertas até 10/05.', tipo: 'info', icon: '🏥' },
    { texto: 'Teste de Progresso: próxima aplicação em 15/05 às 8h. Confirmação de presença obrigatória.', tipo: 'aviso', icon: '📊' },
  ],
};

// ── Tutor (Docente) panel payload ───────────────────────────────────────────
export const TUTOR_PANEL = {
  alunos: [
    { id: 'ana-lima', nome: 'Ana Lima', fase: '3ª', turma: 'T16', status: 'ok', tp: 58, tpHist: [42, 48, 52, 55, 58], dreyfusMed: 3.0, dreyfusTrend: 'up', apcs: 3, ultRefl: { data: '12/09', titulo: 'SP4 — pneumonia comunitária' }, proxApc: { data: '02/10', epa: 'EPA-3 Exame físico' } },
    { id: 'carlos-sousa', nome: 'Carlos Sousa', fase: '3ª', turma: 'T16', status: 'risco', tp: 31, tpHist: [40, 38, 35, 33, 31], dreyfusMed: 1.6, dreyfusTrend: 'down', apcs: 1, ultRefl: { data: '02/08', titulo: 'Tutorial — frustração com SP3' }, proxApc: { data: '28/09', epa: 'EPA-2 Anamnese' } },
    { id: 'fernanda-reis', nome: 'Fernanda Reis', fase: '5ª', turma: 'T14', status: 'ok', tp: 52, tpHist: [44, 47, 49, 51, 52], dreyfusMed: 3.4, dreyfusTrend: 'up', apcs: 5, ultRefl: { data: '14/09', titulo: 'IESC — visita à família BSV-009' }, proxApc: { data: '05/10', epa: 'EPA-4 Plano diagnóstico' } },
    { id: 'joao-melo', nome: 'João Melo', fase: '5ª', turma: 'T14', status: 'atencao', tp: 41, tpHist: [50, 54, 58, 49, 41], dreyfusMed: 2.5, dreyfusTrend: 'down', apcs: 2, ultRefl: { data: '14/09', titulo: 'Limites da minha escuta em entrevistas difíceis' }, proxApc: { data: '03/10', epa: 'EPA-2 Anamnese' } },
    { id: 'livia-torres', nome: 'Livia Torres', fase: '3ª', turma: 'T16', status: 'ok', tp: 63, tpHist: [55, 58, 61, 62, 63], dreyfusMed: 3.2, dreyfusTrend: 'up', apcs: 4, ultRefl: { data: '11/09', titulo: 'Bioética — confidencialidade' }, proxApc: { data: '01/10', epa: 'EPA-3 Exame físico' } },
    { id: 'pedro-vilas', nome: 'Pedro Vilas', fase: '6ª', turma: 'T13', status: 'risco', tp: 28, tpHist: [38, 35, 32, 30, 28], dreyfusMed: 1.8, dreyfusTrend: 'down', apcs: 0, ultRefl: { data: '20/07', titulo: 'Sobrecarga e dúvidas no curso' }, proxApc: { data: '06/10', epa: 'EPA-2 Anamnese' } },
  ],
  apcsAvaliar: [
    { aluno: 'Ana Lima', epa: 'Anamnese clínica estruturada', data: '22/04', fase: '3ª' },
    { aluno: 'Livia Torres', epa: 'Registro em prontuário SOAP', data: '23/04', fase: '3ª' },
    { aluno: 'Fernanda Reis', epa: 'Exame físico do aparelho resp.', data: '21/04', fase: '5ª' },
  ],
  conteudoIA: [
    { titulo: 'Resumo: Hipertensão arterial — 3ª Fase', tipo: 'Resumo', uc: 'Morfofuncional III', data: '23/04' },
    { titulo: '5 questões DPOC — Nível R1', tipo: 'Questões', uc: 'Tutorial PBL', data: '22/04' },
    { titulo: 'Mapa conceitual: Coagulação', tipo: 'Mapa', uc: 'Morfofuncional III', data: '20/04' },
  ],
  casosSim: [
    { titulo: 'Dor torácica aguda — caso clínico III', aluno: 'Carlos Sousa', etapa: '2º feedback', data: '23/04' },
    { titulo: 'Dispneia progressiva em idoso', aluno: 'João Melo', etapa: '1º feedback', data: '22/04' },
  ],
  reflexoesPendentes: [
    { aluno: 'João Melo', data: '14/09', titulo: 'Limites da minha escuta em entrevistas difíceis', categoria: 'Tutorial' },
    { aluno: 'Carlos Sousa', data: '02/08', titulo: 'Tutorial — frustração com SP3', categoria: 'Tutorial' },
    { aluno: 'Fernanda Reis', data: '14/09', titulo: 'IESC — visita à família BSV-009', categoria: 'IESC' },
  ],
  alertasAtitudinais: [],
};

// ── Coordenação payload (presentational aggregates) ─────────────────────────
export const COORD = {
  coordenador: 'Prof. Zanis', atualizado: '24/04/2026 às 08:12',
  macros: [
    { label: 'Taxa de aprovação geral', valor: '86,3%', delta: '+2,1%', color: '#2A8A5C' },
    { label: 'Média Teste de Progresso', valor: '51,8%', delta: '+8,4 pp', color: '#023E88' },
    { label: 'APCs concluídas', valor: '2.847', delta: '73% meta', color: '#C4622D' },
    { label: 'Índice de evasão', valor: '3,2%', delta: '−0,8%', color: '#2A8A5C' },
  ],
  fases: [
    { f: '1ª', ap: 94, tp: 61.2, apcs: 100 }, { f: '2ª', ap: 91, tp: 58.4, apcs: 98 },
    { f: '3ª', ap: 88, tp: 54.1, apcs: 72 }, { f: '4ª', ap: 85, tp: 51.8, apcs: 61 },
    { f: '5ª', ap: 82, tp: 49.3, apcs: 55 }, { f: '6ª', ap: 79, tp: 46.7, apcs: 48 },
    { f: '7ª', ap: 83, tp: 48.2, apcs: 44 }, { f: '8ª', ap: 80, tp: 47.1, apcs: 39 },
    { f: '9ª', ap: 86, tp: 50.3, apcs: 35 }, { f: '10ª', ap: 88, tp: 52.6, apcs: 31 },
    { f: '11ª', ap: 91, tp: 55.0, apcs: 24 }, { f: '12ª', ap: 93, tp: 58.8, apcs: 18 },
  ],
  turmas: [
    { label: 'Turma 2023', color: '#7A5CBF', data: [28.1,33.4,37.8,42.1,46.5,50.2] },
    { label: 'Turma 2024', color: '#00ADEF', data: [30.2,35.7,40.1,45.3,49.8,null] },
    { label: 'Turma 2025', color: '#C4622D', data: [31.8,37.2,42.4,null,null,null] },
  ],
  semestres: ['2024.1','2024.2','2025.1','2025.2','2026.1','2026.2'],
  alertas: [
    { tipo: 'risco', icon: '⚠️', texto: '3 alunos da 6ª Fase com 2+ reprovações consecutivas — risco de evasão', acao: 'Ver alunos' },
    { tipo: 'uc', icon: '📉', texto: 'UC "Semiologia II" (5ª Fase): média Teste de Progresso 31% abaixo da média institucional', acao: 'Detalhar UC' },
    { tipo: 'risco', icon: '⚠️', texto: '1 aluno da 8ª Fase sem registro de APC nos últimos 45 dias', acao: 'Ver aluno' },
    { tipo: 'info', icon: '📋', texto: 'Relatório NDE/CPA: prazo de entrega em 12/05/2026', acao: 'Gerar relatório' },
  ],
  producao: [
    { nome: 'Prof. Zanis', cards: 47, casos: 12, apcs: 38, cor: '#023E88' },
    { nome: 'Profa. Beatriz', cards: 31, casos: 8, apcs: 22, cor: '#2A8A5C' },
    { nome: 'Prof. Marcos', cards: 28, casos: 5, apcs: 19, cor: '#C4622D' },
    { nome: 'Profa. Carla', cards: 22, casos: 3, apcs: 14, cor: '#7A5CBF' },
  ],
  saudeBancoPorDocente: [
    { nome: 'Profa. Paola Lima', questoes: 28, cards: 64, cor: '#023E88' },
    { nome: 'Prof. Tiago Cardoso', questoes: 22, cards: 45, cor: '#2A8A5C' },
    { nome: 'Prof. Leandro Pires', questoes: 15, cards: 38, cor: '#C4622D' },
    { nome: 'Profa. Camila Souza', questoes: 9, cards: 22, cor: '#7A5CBF' },
  ],
  psicometria: [
    { label: 'Dificuldade média', valor: '0,58', meta: '0,40–0,70', ok: true },
    { label: 'Discriminação média', valor: '0,31', meta: '≥ 0,20', ok: true },
    { label: 'Em revisão (disc. < 0,20)', valor: '4 questões', meta: '', ok: false },
  ],
  statusBanco: [
    { label: 'Rascunho', n: 12, color: '#8E97B0' },
    { label: 'Em validação', n: 8, color: '#B07A18' },
    { label: 'Validada', n: 54, color: '#2A8A5C' },
    { label: 'Para revisão', n: 4, color: '#C4622D' },
  ],
  treinoAgregados: [
    { label: 'Cards revisados este mês', valor: '1.840', icon: '🃏' },
    { label: 'Questões respondidas', valor: '620', icon: '📝' },
    { label: 'Tempo médio na plataforma / dia', valor: '38 min', icon: '⏱' },
    { label: 'Reflexões publicadas', valor: '47', icon: '✍' },
  ],
  drilldown: {
    evidencias: [
      { tipo: 'APC', descricao: 'Anamnese estruturada — IESC III', data: '12/09', status: 'suficiente', n: 14 },
      { tipo: 'NPCMed', descricao: 'Bloco quinzenal · ABDC', data: '08/09', status: 'precisa-melhorar', n: 12 },
      { tipo: 'OSCE', descricao: 'Estação 4 — Comunicação de notícia difícil', data: '02/08', status: 'suficiente', n: 9 },
      { tipo: 'Portfólio', descricao: 'Reflexões IESC + tutorial', data: '01/09', status: 'pendente', n: 18 },
      { tipo: 'IESC', descricao: 'Visita domiciliar BSV-042', data: '14/09', status: 'suficiente', n: 11 },
    ],
    alunosRisco: [
      { id: 'carlos-sousa', nome: 'Carlos Sousa', turma: 'T16', motivo: '3 semanas sem APC suficiente', status: 'risco' },
      { id: 'marina-v', nome: 'Marina Vieira', turma: 'T16', motivo: 'Reflexão pendente há 30 dias', status: 'atencao' },
      { id: 'pedro-vilas', nome: 'Pedro Vilas', turma: 'T13', motivo: 'NPCMed insuficiente · 2 ciclos', status: 'risco' },
    ],
  },
};
