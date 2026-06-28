// MED-UNIDAVI 2027 — Matriz canônica das 27 competências (DCN 2025)
// Fonte: Art. 8º da Resolução CNE/CES nº 3/2025.
// Agrupamento por área-eixo (Art. 6º) é INTERPRETATIVO — sujeito a validação NDE.
// Slugs canônicos: dcn2025_comp_01 .. dcn2025_comp_27.

const DCN27_AREAS = {
  atencao:   { label: 'Atenção à Saúde',  cor: '#1565C0', corBg: '#E3F2FD', desc: 'Cuidado integral à pessoa, família e comunidade ao longo da vida.' },
  gestao:    { label: 'Gestão em Saúde',  cor: '#C0571E', corBg: '#FFE8DA', desc: 'Organização do trabalho em saúde, processos e redes.' },
  educacao:  { label: 'Educação em Saúde', cor: '#2E7D4F', corBg: '#E7F4EC', desc: 'Formação permanente, ensino-aprendizagem e produção de conhecimento.' },
};

// Texto abreviado de cada competência (resumo institucional para a UI).
// O texto completo da Resolução fica em popover/tooltip via campo `legal`.
const DCN27 = [
  // ── Atenção à Saúde (C01–C18) ─────────────────────────────────────────────
  { id: 'dcn2025_comp_01', area: 'atencao', n: 1, titulo: 'Cuidado centrado na pessoa',
    resumo: 'Estabelecer relação de cuidado centrada na pessoa, família e comunidade, respeitando singularidades.' },
  { id: 'dcn2025_comp_02', area: 'atencao', n: 2, titulo: 'Anamnese e exame físico',
    resumo: 'Realizar anamnese e exame físico orientados, com escuta ativa e raciocínio clínico.' },
  { id: 'dcn2025_comp_03', area: 'atencao', n: 3, titulo: 'Raciocínio clínico e diagnóstico',
    resumo: 'Construir hipóteses diagnósticas integrando dados clínicos, epidemiológicos e contextuais.' },
  { id: 'dcn2025_comp_04', area: 'atencao', n: 4, titulo: 'Uso racional de exames complementares',
    resumo: 'Indicar e interpretar exames com critério, segurança e economicidade.' },
  { id: 'dcn2025_comp_05', area: 'atencao', n: 5, titulo: 'Plano terapêutico singular',
    resumo: 'Elaborar plano terapêutico individualizado, considerando preferências e contexto.' },
  { id: 'dcn2025_comp_06', area: 'atencao', n: 6, titulo: 'Procedimentos clínicos e cirúrgicos básicos',
    resumo: 'Executar procedimentos básicos com técnica, segurança e biossegurança.' },
  { id: 'dcn2025_comp_07', area: 'atencao', n: 7, titulo: 'Urgência e emergência',
    resumo: 'Reconhecer e atender situações de urgência/emergência conforme protocolos.' },
  { id: 'dcn2025_comp_08', area: 'atencao', n: 8, titulo: 'Promoção e prevenção',
    resumo: 'Desenvolver ações de promoção da saúde e prevenção em todos os ciclos de vida.' },
  { id: 'dcn2025_comp_09', area: 'atencao', n: 9, titulo: 'Saúde mental',
    resumo: 'Abordar sofrimento psíquico, transtornos mentais e comportamentos de risco com integralidade.' },
  { id: 'dcn2025_comp_10', area: 'atencao', n: 10, titulo: 'Saúde da mulher',
    resumo: 'Atenção integral à saúde da mulher em todos os ciclos de vida e contextos.' },
  { id: 'dcn2025_comp_11', area: 'atencao', n: 11, titulo: 'Saúde da criança e adolescente',
    resumo: 'Atenção integral à criança e adolescente, com foco em desenvolvimento e vulnerabilidades.' },
  { id: 'dcn2025_comp_12', area: 'atencao', n: 12, titulo: 'Saúde do idoso',
    resumo: 'Atenção à pessoa idosa com avaliação funcional e abordagem multidimensional.' },
  { id: 'dcn2025_comp_13', area: 'atencao', n: 13, titulo: 'Saúde da família e comunidade',
    resumo: 'Atuar na atenção primária com clínica ampliada, território e família.' },
  { id: 'dcn2025_comp_14', area: 'atencao', n: 14, titulo: 'Cuidados paliativos e fim de vida',
    resumo: 'Abordar dor, sintomas, decisões compartilhadas e cuidado em fim de vida.' },
  { id: 'dcn2025_comp_15', area: 'atencao', n: 15, titulo: 'Saúde coletiva e vigilância',
    resumo: 'Reconhecer determinantes sociais, atuar em vigilância em saúde e enfrentar iniquidades.' },
  { id: 'dcn2025_comp_16', area: 'atencao', n: 16, titulo: 'Comunicação clínica',
    resumo: 'Comunicar-se de forma clara, empática e culturalmente sensível com pessoas e equipes.' },
  { id: 'dcn2025_comp_17', area: 'atencao', n: 17, titulo: 'Segurança do paciente',
    resumo: 'Aplicar princípios de segurança do paciente, gestão de risco e qualidade do cuidado.' },
  { id: 'dcn2025_comp_18', area: 'atencao', n: 18, titulo: 'Ética e profissionalismo',
    resumo: 'Atuar com ética, integridade e responsabilidade social no exercício profissional.' },

  // ── Gestão em Saúde (C19–C25) ─────────────────────────────────────────────
  { id: 'dcn2025_comp_19', area: 'gestao', n: 19, titulo: 'SUS, sistemas e redes',
    resumo: 'Compreender e atuar no SUS, redes de atenção e regulação assistencial.' },
  { id: 'dcn2025_comp_20', area: 'gestao', n: 20, titulo: 'Trabalho em equipe',
    resumo: 'Atuar em equipe interprofissional com colaboração, liderança situacional e resolução de conflito.' },
  { id: 'dcn2025_comp_21', area: 'gestao', n: 21, titulo: 'Gestão do cuidado',
    resumo: 'Coordenar o cuidado entre serviços, níveis de atenção e tempos clínicos.' },
  { id: 'dcn2025_comp_22', area: 'gestao', n: 22, titulo: 'Políticas públicas e legislação',
    resumo: 'Aplicar políticas, normas e legislação sanitária e profissional ao cotidiano.' },
  { id: 'dcn2025_comp_23', area: 'gestao', n: 23, titulo: 'Gestão de processos e qualidade',
    resumo: 'Empregar ferramentas de gestão da qualidade e melhoria contínua em serviços de saúde.' },
  { id: 'dcn2025_comp_24', area: 'gestao', n: 24, titulo: 'Informação em saúde',
    resumo: 'Usar sistemas de informação, dados clínicos e indicadores para decisão e planejamento.' },
  { id: 'dcn2025_comp_25', area: 'gestao', n: 25, titulo: 'Saúde digital',
    resumo: 'Aplicar tecnologias digitais, telessaúde e IA com letramento crítico e ético.' },

  // ── Educação em Saúde (C26–C27) ───────────────────────────────────────────
  { id: 'dcn2025_comp_26', area: 'educacao', n: 26, titulo: 'Educação permanente',
    resumo: 'Manter-se em formação contínua, com prática reflexiva e ciência aberta.' },
  { id: 'dcn2025_comp_27', area: 'educacao', n: 27, titulo: 'Pesquisa, MBE e ensino',
    resumo: 'Praticar medicina baseada em evidências, produzir e divulgar conhecimento em saúde.' },
];

// Helpers
function dcn27ByArea(area) { return DCN27.filter(c => c.area === area); }
function dcn27CountByArea() {
  return Object.keys(DCN27_AREAS).reduce((acc, k) => { acc[k] = dcn27ByArea(k).length; return acc; }, {});
}

// Estados de competência (UNIDAVI)
const DCN27_ESTADO = {
  suficiente:      { label: 'Suficiente',       cor: '#2E7D4F', corBg: '#E7F4EC', corBorda: '#A8D5BA' },
  precisaMelhorar: { label: 'Precisa melhorar', cor: '#B97A0F', corBg: '#FFF4DF', corBorda: '#E8C97A' },
  insuficiente:    { label: 'Insuficiente',     cor: '#B23A2A', corBg: '#FFE5E0', corBorda: '#E8A89B' },
  pendente:        { label: 'Pendente',         cor: '#7A8895', corBg: '#EFF1F4', corBorda: '#D6DCE3' },
};

// Mock — distribuição para o aluno Maria Andrade (3ª fase, T16)
// Reflete um aluno típico em 3ª fase: muitas competências ainda pendentes
// (fases posteriores), algumas suficientes (básico-celular já feito), poucas
// em alerta. Determinístico por id para evitar flicker.
function dcn27EstadoMock(id, faseAluno = 3) {
  // hash determinístico simples
  let h = 0; for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  const n = parseInt(id.split('_').pop(), 10);
  // Competências de áreas básicas (1-8, 13, 15-18) tendem a estar tocadas em fase 3
  const tocada = (n <= 8) || [13, 15, 16, 17, 18].includes(n);
  if (!tocada) return 'pendente';
  const r = Math.abs(h) % 100;
  if (r < 60) return 'suficiente';
  if (r < 85) return 'precisaMelhorar';
  return 'insuficiente';
}

Object.assign(window, { DCN27, DCN27_AREAS, DCN27_ESTADO, dcn27ByArea, dcn27CountByArea, dcn27EstadoMock });
