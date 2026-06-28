// ─────────────────────────────────────────────────────────────────────────────
// COORDENAÇÃO — Item 15 — Filtros, Matriz 27×12, Drilldown
// Não-negociáveis: 27 competências DCN 2025 · Suficiente/Precisa melhorar/
// Insuficiente/Pendente · sem nota numérica · curadoria docente obrigatória
// ─────────────────────────────────────────────────────────────────────────────

// ── 27 COMPETÊNCIAS DCN 2025 (Art. 8º) — agrupadas em 3 áreas ────────────────
const COMP_DCN_2025 = [
  // Atenção à Saúde (12)
  { id: 'AS-01', area: 'Atenção à Saúde',     short: 'Anamnese e relação clínica' },
  { id: 'AS-02', area: 'Atenção à Saúde',     short: 'Exame físico' },
  { id: 'AS-03', area: 'Atenção à Saúde',     short: 'Raciocínio clínico-diagnóstico' },
  { id: 'AS-04', area: 'Atenção à Saúde',     short: 'Plano terapêutico compartilhado' },
  { id: 'AS-05', area: 'Atenção à Saúde',     short: 'Procedimentos clínicos' },
  { id: 'AS-06', area: 'Atenção à Saúde',     short: 'Urgência e emergência' },
  { id: 'AS-07', area: 'Atenção à Saúde',     short: 'Saúde mental e cuidado integral' },
  { id: 'AS-08', area: 'Atenção à Saúde',     short: 'Cuidado em rede e continuidade' },
  { id: 'AS-09', area: 'Atenção à Saúde',     short: 'Prevenção quaternária' },
  { id: 'AS-10', area: 'Atenção à Saúde',     short: 'Cuidado paliativo' },
  { id: 'AS-11', area: 'Atenção à Saúde',     short: 'Saúde da família e comunidade' },
  { id: 'AS-12', area: 'Atenção à Saúde',     short: 'Bioética e tomada de decisão' },
  // Gestão em Saúde (8)
  { id: 'GS-01', area: 'Gestão em Saúde',     short: 'SUS — princípios e organização' },
  { id: 'GS-02', area: 'Gestão em Saúde',     short: 'Gestão da clínica e do cuidado' },
  { id: 'GS-03', area: 'Gestão em Saúde',     short: 'Trabalho em equipe interprofissional' },
  { id: 'GS-04', area: 'Gestão em Saúde',     short: 'Vigilância em saúde' },
  { id: 'GS-05', area: 'Gestão em Saúde',     short: 'Indicadores e qualidade' },
  { id: 'GS-06', area: 'Gestão em Saúde',     short: 'Segurança do paciente' },
  { id: 'GS-07', area: 'Gestão em Saúde',     short: 'Determinantes sociais e equidade' },
  { id: 'GS-08', area: 'Gestão em Saúde',     short: 'Liderança e gestão de processos' },
  // Educação em Saúde (7)
  { id: 'ES-01', area: 'Educação em Saúde',   short: 'Educação permanente' },
  { id: 'ES-02', area: 'Educação em Saúde',   short: 'Comunicação em saúde' },
  { id: 'ES-03', area: 'Educação em Saúde',   short: 'Ética profissional e identidade' },
  { id: 'ES-04', area: 'Educação em Saúde',   short: 'Pensamento crítico-reflexivo' },
  { id: 'ES-05', area: 'Educação em Saúde',   short: 'Pesquisa e MBE' },
  { id: 'ES-06', area: 'Educação em Saúde',   short: 'Prática colaborativa e ensino' },
  { id: 'ES-07', area: 'Educação em Saúde',   short: 'Tecnologia, dados e saúde digital' },
];

const FASES = ['1ª', '2ª', '3ª', '4ª', '5ª', '6ª', '7ª', '8ª', '9ª', '10ª', '11ª', '12ª'];

// Mock determinístico de estado por (competência, fase)
function estadoCelula(compId, fase) {
  const seed = (compId.charCodeAt(0) + compId.charCodeAt(3) * 13 + parseInt(compId.slice(-2), 10) + parseInt(fase, 10) * 7) % 11;
  if (seed === 0) return 'insuficiente';
  if (seed <= 3) return 'precisa-melhorar';
  if (seed <= 8) return 'suficiente';
  return 'pendente';
}

// ── ITEM 15.1 — Filtros globais + Busca de aluno ─────────────────────────────
function CoordFiltrosBusca({ isMobile, filtros, setFiltros, busca, setBusca, onAbrirAluno }) {
  const [openSugestoes, setOpenSugestoes] = React.useState(false);
  const TURMAS = ['T13', 'T14', 'T15', 'T16', 'T17', 'T18'];
  const STATUS = [
    { v: 'risco',     label: 'Em risco',  cor: DS.terra },
    { v: 'atencao',   label: 'Atenção',   cor: DS.amber },
    { v: 'regular',   label: 'Regular',   cor: DS.green },
  ];
  const ALUNOS_MOCK = [
    { id: 'A2024-014', nome: 'Ana Lima',     turma: 'T16', fase: '3ª' },
    { id: 'A2024-027', nome: 'Carlos Sousa', turma: 'T16', fase: '3ª' },
    { id: 'A2022-101', nome: 'Fernanda Reis',turma: 'T14', fase: '5ª' },
    { id: 'A2022-118', nome: 'João Melo',    turma: 'T14', fase: '5ª' },
    { id: 'A2024-019', nome: 'Lívia Torres', turma: 'T16', fase: '3ª' },
    { id: 'A2021-074', nome: 'Pedro Vilas',  turma: 'T13', fase: '6ª' },
  ];
  const sugest = busca.trim().length >= 2
    ? ALUNOS_MOCK.filter(a => a.nome.toLowerCase().includes(busca.toLowerCase()) || a.id.toLowerCase().includes(busca.toLowerCase())).slice(0, 6)
    : [];

  const toggleArr = (key, v) => {
    setFiltros(f => ({ ...f, [key]: f[key].includes(v) ? f[key].filter(x => x !== v) : [...f[key], v] }));
  };

  const Chip = ({ ativo, onClick, cor, children }) => (
    <button onClick={onClick} style={{
      padding: '6px 12px', borderRadius: 100, border: `1px solid ${ativo ? (cor || DS.blue) : DS.border}`,
      background: ativo ? (cor || DS.blue) + '15' : DS.surface, color: ativo ? (cor || DS.blue) : DS.textSec,
      fontSize: 12, fontWeight: 600, cursor: 'pointer'
    }}>{children}</button>
  );

  const totalFiltros = filtros.turmas.length + filtros.fases.length + filtros.status.length;

  return (
    <section style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, padding: 18, boxShadow: DS.shadow }}>
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 12, alignItems: isMobile ? 'stretch' : 'center', marginBottom: totalFiltros > 0 ? 14 : 0 }}>
        {/* Busca aluno */}
        <div style={{ position: 'relative', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: DS.bg, borderRadius: DS.radiusMd, border: `1px solid ${DS.border}` }}>
            <span style={{ color: DS.textMuted, fontSize: 14 }}>🔍</span>
            <input
              type="text"
              value={busca}
              onChange={(e) => { setBusca(e.target.value); setOpenSugestoes(true); }}
              onFocus={() => setOpenSugestoes(true)}
              onBlur={() => setTimeout(() => setOpenSugestoes(false), 200)}
              placeholder="Buscar aluno por nome ou ID interno (ex.: A2024-014)"
              style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 13, color: DS.text, outline: 'none', fontFamily: 'IBM Plex Sans, sans-serif' }}
            />
            <span style={{ fontSize: 10, color: DS.textMuted, fontWeight: 600, padding: '2px 6px', background: DS.surface, borderRadius: 4, border: `1px solid ${DS.border}` }}>LGPD · ID</span>
          </div>
          {openSugestoes && sugest.length > 0 && (
            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, background: DS.surface, border: `1px solid ${DS.border}`, borderRadius: DS.radiusMd, boxShadow: DS.shadowLg, zIndex: 10, overflow: 'hidden' }}>
              {sugest.map(a => (
                <button key={a.id} onClick={() => { onAbrirAluno(a); setBusca(''); setOpenSugestoes(false); }}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', border: 'none', background: 'transparent', cursor: 'pointer', borderBottom: `1px solid ${DS.border}`, textAlign: 'left' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: DS.blue + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', color: DS.blue, fontSize: 11, fontWeight: 700 }}>
                    {a.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: DS.text }}>{a.nome}</div>
                    <div style={{ fontSize: 11, color: DS.textMuted }}>{a.id} · {a.turma} · {a.fase} fase</div>
                  </div>
                  <span style={{ fontSize: 14, color: DS.textMuted }}>›</span>
                </button>
              ))}
            </div>
          )}
        </div>
        {totalFiltros > 0 && (
          <button onClick={() => setFiltros({ turmas: [], fases: [], status: [], competencia: null })}
            style={{ padding: '8px 14px', borderRadius: DS.radiusMd, border: `1px solid ${DS.border}`, background: DS.surface, color: DS.textSec, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            Limpar filtros ({totalFiltros})
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', minWidth: 60 }}>Turma</span>
          {TURMAS.map(t => <Chip key={t} ativo={filtros.turmas.includes(t)} onClick={() => toggleArr('turmas', t)}>{t}</Chip>)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', minWidth: 60 }}>Fase</span>
          {FASES.map(f => <Chip key={f} ativo={filtros.fases.includes(f)} onClick={() => toggleArr('fases', f)}>{f}</Chip>)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', minWidth: 60 }}>Status</span>
          {STATUS.map(s => <Chip key={s.v} ativo={filtros.status.includes(s.v)} cor={s.cor} onClick={() => toggleArr('status', s.v)}>{s.label}</Chip>)}
        </div>
      </div>
    </section>
  );
}

// ── ITEM 15.2 — Matriz 27 competências × 12 fases ────────────────────────────
function CoordMatriz27x12({ isMobile, onCelula }) {
  const [areaOpen, setAreaOpen] = React.useState({ 'Atenção à Saúde': true, 'Gestão em Saúde': true, 'Educação em Saúde': true });
  const corEstado = {
    'suficiente':       { bg: DS.greenLight, fg: DS.green,   label: 'S' },
    'precisa-melhorar': { bg: DS.amberLight, fg: DS.amber,   label: 'M' },
    'insuficiente':     { bg: DS.terraLight, fg: DS.terra,   label: 'I' },
    'pendente':         { bg: DS.bg,         fg: DS.textMuted, label: '·' },
  };

  const areas = ['Atenção à Saúde', 'Gestão em Saúde', 'Educação em Saúde'];
  const corArea = { 'Atenção à Saúde': DS.blue, 'Gestão em Saúde': DS.terra, 'Educação em Saúde': DS.green };

  // contagens por fase (para footer)
  const totaisFase = FASES.map(f => {
    const c = { suficiente: 0, 'precisa-melhorar': 0, insuficiente: 0, pendente: 0 };
    COMP_DCN_2025.forEach(comp => { c[estadoCelula(comp.id, f)]++; });
    return c;
  });

  return (
    <section style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, padding: 18, boxShadow: DS.shadow }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4 }}>Matriz longitudinal · DCN 2025 — Art. 8º</div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: DS.text }}>27 competências × 12 fases</h2>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: DS.textSec }}>Distribuição agregada de atividades programáticas. Clique em qualquer célula para abrir o drilldown.</p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          {Object.entries(corEstado).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 14, height: 14, borderRadius: 3, background: v.fg }} />
              <span style={{ fontSize: 11, color: DS.textSec, textTransform: 'capitalize' }}>{k.replace('-', ' ')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabela */}
      <div style={{ overflowX: 'auto', border: `1px solid ${DS.border}`, borderRadius: DS.radiusMd }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 900, fontFamily: 'IBM Plex Sans, sans-serif' }}>
          <thead>
            <tr style={{ background: DS.bg }}>
              <th style={{ position: 'sticky', left: 0, background: DS.bg, padding: '8px 10px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', borderRight: `1px solid ${DS.border}`, minWidth: 240, zIndex: 2 }}>Competência</th>
              {FASES.map(f => (
                <th key={f} style={{ padding: '8px 6px', fontSize: 11, fontWeight: 700, color: DS.textSec, textAlign: 'center', minWidth: 38 }}>{f}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {areas.map(area => {
              const comps = COMP_DCN_2025.filter(c => c.area === area);
              const aberto = areaOpen[area];
              return (
                <React.Fragment key={area}>
                  <tr style={{ background: corArea[area] + '12', borderTop: `2px solid ${corArea[area]}` }}>
                    <td colSpan={13} style={{ padding: '8px 10px', position: 'sticky', left: 0 }}>
                      <button onClick={() => setAreaOpen(o => ({ ...o, [area]: !o[area] }))}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
                        <span style={{ fontSize: 11, color: corArea[area], transform: aberto ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform .15s' }}>▶</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: corArea[area], textTransform: 'uppercase', letterSpacing: '0.6px' }}>{area}</span>
                        <span style={{ fontSize: 10, color: DS.textMuted, fontWeight: 500 }}>· {comps.length} competências</span>
                      </button>
                    </td>
                  </tr>
                  {aberto && comps.map(comp => (
                    <tr key={comp.id} style={{ borderTop: `1px solid ${DS.border}` }}>
                      <td style={{ position: 'sticky', left: 0, background: DS.surface, padding: '6px 10px', borderRight: `1px solid ${DS.border}`, fontSize: 11, color: DS.text, zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 9, fontWeight: 700, color: corArea[area], background: corArea[area] + '18', padding: '2px 5px', borderRadius: 3, fontFamily: 'IBM Plex Mono, monospace', flexShrink: 0 }}>{comp.id}</span>
                          <span>{comp.short}</span>
                        </div>
                      </td>
                      {FASES.map(f => {
                        const e = estadoCelula(comp.id, f);
                        const c = corEstado[e];
                        return (
                          <td key={f} style={{ padding: 2, textAlign: 'center' }}>
                            <button
                              title={`${comp.id} · ${f} fase · ${e.replace('-', ' ')}`}
                              onClick={() => onCelula({ tipo: 'celula', compId: comp.id, compShort: comp.short, area, fase: f, estado: e })}
                              style={{ width: '100%', height: 28, background: c.fg, border: 'none', borderRadius: 4, cursor: 'pointer', color: '#fff', fontSize: 10, fontWeight: 700, opacity: e === 'pendente' ? 0.35 : 1 }}
                            >{c.label}</button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
            {/* Footer agregado por fase */}
            <tr style={{ borderTop: `2px solid ${DS.border}`, background: DS.bg }}>
              <td style={{ position: 'sticky', left: 0, background: DS.bg, padding: '8px 10px', fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', borderRight: `1px solid ${DS.border}`, zIndex: 1 }}>Cobertura agregada</td>
              {totaisFase.map((t, i) => {
                const total = 27;
                const ok = t.suficiente;
                const pct = Math.round((ok / total) * 100);
                return (
                  <td key={i} style={{ padding: '6px 4px', textAlign: 'center', fontSize: 10, fontWeight: 700, color: pct >= 60 ? DS.green : pct >= 40 ? DS.amber : DS.terra }}>{pct}%</td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 12, padding: '10px 12px', background: DS.bg, borderRadius: DS.radiusSm, border: `1px solid ${DS.border}`, fontSize: 11, color: DS.textMuted, lineHeight: 1.5 }}>
        ⚠ <strong>Avaliação programática longitudinal</strong> — sem nota numérica. Conceitos UNIDAVI: <span style={{ color: DS.green, fontWeight: 700 }}>Suficiente</span> · <span style={{ color: DS.amber, fontWeight: 700 }}>Precisa melhorar</span> · <span style={{ color: DS.terra, fontWeight: 700 }}>Insuficiente</span> · <span style={{ color: DS.textMuted, fontWeight: 700 }}>Pendente</span>. Triangulação por múltiplas evidências (APC, NPCMed, OSCE, IESC, Portfólio).
      </div>
    </section>
  );
}

// ── ITEM 15.3 — Drilldown ────────────────────────────────────────────────────
function CoordDrilldown({ drilldown, onClose, onAbrirAluno, isMobile }) {
  const isCelula = drilldown.tipo === 'celula';
  const titulo = isCelula
    ? `${drilldown.compId} — ${drilldown.compShort}`
    : `Domínio ${drilldown.dominio} — ${drilldown.titulo}`;
  const subtitulo = isCelula ? `${drilldown.area} · ${drilldown.fase} fase` : 'Heatmap legado (6 domínios) — substituído pela matriz DCN 2025';

  // Mock de evidências e atividades para a célula
  const evidencias = [
    { tipo: 'APC',     descricao: 'Anamnese estruturada — IESC III',           data: '12/09', status: 'suficiente', n: 14 },
    { tipo: 'NPCMed',  descricao: 'Bloco quinzenal · ABDC',                    data: '08/09', status: 'precisa-melhorar', n: 12 },
    { tipo: 'OSCE',    descricao: 'Estação 4 — Comunicação de notícia difícil', data: '02/08', status: 'suficiente', n: 9 },
    { tipo: 'Portfólio', descricao: 'Reflexões IESC + tutorial',                data: '01/09', status: 'pendente', n: 18 },
    { tipo: 'IESC',    descricao: 'Visita domiciliar BSV-042',                  data: '14/09', status: 'suficiente', n: 11 },
  ];

  const alunosRisco = [
    { id: 'A2024-027', nome: 'Carlos Sousa',  turma: 'T16', motivo: '3 semanas sem APC suficiente', status: 'risco' },
    { id: 'A2024-018', nome: 'Marina Vieira', turma: 'T16', motivo: 'Reflexão pendente há 30 dias', status: 'atencao' },
    { id: 'A2021-074', nome: 'Pedro Vilas',   turma: 'T13', motivo: 'NPCMed insuficiente · 2 ciclos', status: 'risco' },
  ];

  const corEstado = { suficiente: DS.green, 'precisa-melhorar': DS.amber, insuficiente: DS.terra, pendente: DS.textMuted };
  const statusCor = { risco: DS.terra, atencao: DS.amber };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(13,28,52,0.55)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: isMobile ? '100%' : 560, height: '100%', background: DS.surface, boxShadow: '-4px 0 24px rgba(0,0,0,0.15)', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '20px 22px', borderBottom: `1px solid ${DS.border}`, position: 'sticky', top: 0, background: DS.surface, zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4 }}>Drilldown · {isCelula ? 'Célula da matriz' : 'Domínio agregado'}</div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: DS.text }}>{titulo}</h3>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: DS.textSec }}>{subtitulo}</p>
            </div>
            <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: '50%', border: `1px solid ${DS.border}`, background: DS.surface, color: DS.textSec, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>×</button>
          </div>
          {isCelula && (
            <div style={{ marginTop: 10, display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', background: corEstado[drilldown.estado], padding: '4px 10px', borderRadius: 100, textTransform: 'capitalize' }}>{drilldown.estado.replace('-', ' ')}</span>
              <span style={{ fontSize: 11, color: DS.textMuted }}>· baseado em {evidencias.reduce((s, e) => s + e.n, 0)} evidências triangulárias</span>
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Evidências triangulares */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>Evidências triangulares</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {evidencias.map((e, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: DS.bg, borderRadius: DS.radiusSm, border: `1px solid ${DS.border}` }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: DS.blue, background: DS.blue + '18', padding: '3px 8px', borderRadius: 4, minWidth: 60, textAlign: 'center' }}>{e.tipo}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: DS.text, fontWeight: 500 }}>{e.descricao}</div>
                    <div style={{ fontSize: 10, color: DS.textMuted, marginTop: 2 }}>Última atividade: {e.data} · {e.n} registros</div>
                  </div>
                  <span style={{ width: 12, height: 12, borderRadius: 3, background: corEstado[e.status], flexShrink: 0 }} title={e.status}/>
                </div>
              ))}
            </div>
          </div>

          {/* Alunos com flag */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px' }}>Alunos com flag nesta competência</div>
              <span style={{ fontSize: 10, color: DS.textMuted, fontWeight: 600 }}>{alunosRisco.length} casos</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {alunosRisco.map(a => (
                <button key={a.id} onClick={() => onAbrirAluno(a)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: DS.radiusSm, border: `1px solid ${DS.border}`, background: DS.surface, cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ width: 6, height: 36, borderRadius: 3, background: statusCor[a.status], flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: DS.text }}>{a.nome}</div>
                    <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 2 }}>{a.id} · {a.turma} · {a.motivo}</div>
                  </div>
                  <span style={{ fontSize: 14, color: DS.textMuted }}>›</span>
                </button>
              ))}
            </div>
          </div>

          {/* Ações de coordenação */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>Ações</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button style={{ flex: 1, minWidth: 140, padding: '10px 14px', borderRadius: DS.radiusMd, border: 'none', background: DS.blue, color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Convocar reunião pedagógica</button>
              <button style={{ flex: 1, minWidth: 140, padding: '10px 14px', borderRadius: DS.radiusMd, border: `1px solid ${DS.border}`, background: DS.surface, color: DS.textSec, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Exportar relatório CSV</button>
              <button style={{ flex: 1, minWidth: 140, padding: '10px 14px', borderRadius: DS.radiusMd, border: `1px solid ${DS.border}`, background: DS.surface, color: DS.textSec, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Sinalizar ao NDE</button>
            </div>
          </div>

          {/* AI disclaimer */}
          {window.AIDisclaimer && <window.AIDisclaimer texto="Agregações geradas a partir de registros estruturados. Toda decisão pedagógica passa por análise humana do colegiado." />}
        </div>
      </div>
    </div>
  );
}

// expor globalmente
Object.assign(window, { CoordFiltrosBusca, CoordMatriz27x12, CoordDrilldown, COMP_DCN_2025, FASES });
