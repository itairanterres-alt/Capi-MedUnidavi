// =============================================================================
// MED-UNIDAVI · Dashboard ENAMED (mu_dashboard_enamed) — Bloco B2
// Tela top-level, sub-rota da Coordenação (coord-enamed).
// Opera nas 15 competências da Portaria 478 (avaliação externa) — DISTINTA
// da Matriz Competência, que opera nas 27 DCN (formação).
// Vocabulário canônico:
//   PCP = Percentual de Concluintes Proficientes (do CURSO)
//   Conceito ENAMED C1–C5 (do CURSO)
//   proficiente / não-proficiente (status binário do ALUNO)
//   Coorte ENAMED [ano] = ano da prova, calculado pela fase atual
// =============================================================================

// ── Mock institucional ──────────────────────────────────────────────────────
const ENAMED_CURSO_HOJE = {
  conceito: 'C4',                    // UNIDAVI hoje
  pcp: 82,                            // PCP da coorte ativa (mock)
  coorteAtiva: 2027,                  // alunos hoje 11ª–12ª
};

// Histórico de Conceitos do curso (referência, sem ação)
const ENAMED_HISTORICO = [
  { ano: 2023, conceito: 'C3', pcp: 71 },
  { ano: 2024, conceito: 'C3', pcp: 73 },
  { ano: 2025, conceito: 'C4', pcp: 79 },
  { ano: 2026, conceito: 'C4', pcp: 82 },
];

// Mock de alunos por coorte (notas projetadas)
const ENAMED_COORTES = {
  2027: { // alunos hoje em 11ª–12ª · T07 / T08
    label: 'Coorte 2027 · ativa',
    descr: 'Alunos hoje na 11ª e 12ª fases (T07 / T08). Prestam ENAMED em 2027.',
    alunos: [
      { id: 'a-2027-01', nome: 'Helena Rocha',     turma: 'T07', fase: '12ª', nota: 78.4 },
      { id: 'a-2027-02', nome: 'Marina Silva',     turma: 'T07', fase: '12ª', nota: 71.2 },
      { id: 'a-2027-03', nome: 'Lucas Hoffmann',   turma: 'T07', fase: '12ª', nota: 68.5 },
      { id: 'a-2027-04', nome: 'Pedro Vargas',     turma: 'T08', fase: '11ª', nota: 65.1 },
      { id: 'a-2027-05', nome: 'Camila Bortolini', turma: 'T07', fase: '12ª', nota: 64.8 },
      { id: 'a-2027-06', nome: 'Rafael Niehues',   turma: 'T08', fase: '11ª', nota: 63.0 },
      { id: 'a-2027-07', nome: 'Júlia Weingärtner',turma: 'T08', fase: '11ª', nota: 61.4 },
      { id: 'a-2027-08', nome: 'Bruno Steffen',    turma: 'T07', fase: '12ª', nota: 60.2 },
      { id: 'a-2027-09', nome: 'Sofia Klitzke',    turma: 'T08', fase: '11ª', nota: 57.8 }, // 〈 corte
      { id: 'a-2027-10', nome: 'Vitor Petry',      turma: 'T08', fase: '11ª', nota: 54.2 }, // 〈 corte
      { id: 'a-2027-11', nome: 'Letícia Bramorski',turma: 'T07', fase: '12ª', nota: 49.7 }, // 〈 corte
    ],
  },
  2028: { // alunos hoje em 9ª–10ª · T09 / T10
    label: 'Coorte 2028',
    descr: 'Alunos hoje na 9ª e 10ª fases (T09 / T10). Prestam ENAMED em 2028.',
    alunos: [
      { id: 'a-2028-01', nome: 'Tomás Adriano',    turma: 'T09', fase: '10ª', nota: 67.0 },
      { id: 'a-2028-02', nome: 'Larissa Heinzen',  turma: 'T09', fase: '10ª', nota: 62.5 },
      { id: 'a-2028-03', nome: 'Caio Bertoldi',    turma: 'T10', fase: '9ª',  nota: 60.8 },
      { id: 'a-2028-04', nome: 'Isabel Damo',      turma: 'T10', fase: '9ª',  nota: 58.3 }, // 〈 corte
      { id: 'a-2028-05', nome: 'Henrique Bonatti', turma: 'T09', fase: '10ª', nota: 55.9 }, // 〈 corte
      { id: 'a-2028-06', nome: 'Antonia Lemke',    turma: 'T10', fase: '9ª',  nota: 53.7 }, // 〈 corte
      { id: 'a-2028-07', nome: 'Mateus Brunetti',  turma: 'T09', fase: '10ª', nota: 50.9 }, // 〈 corte
    ],
  },
};

const PCP_CORTES = { C1: 0, C2: 40, C3: 60, C4: 75, C5: 90 };

function _proficiente(nota) { return nota >= ENAMED_CORTE; }
function _conceitoForPcp(pcp) {
  if (pcp >= 90) return 'C5';
  if (pcp >= 75) return 'C4';
  if (pcp >= 60) return 'C3';
  if (pcp >= 40) return 'C2';
  return 'C1';
}

// ── Componente principal ───────────────────────────────────────────────────
function DashboardENAMEDScreen({ isMobile, onNavigate }) {
  const [coorteAtiva, setCoorteAtiva] = React.useState(ENAMED_CURSO_HOJE.coorteAtiva);
  const coorteAtual = ENAMED_COORTES[coorteAtiva];
  const naoProficientes = coorteAtual.alunos.filter(a => !_proficiente(a.nota));
  const proficientes    = coorteAtual.alunos.filter(a =>  _proficiente(a.nota));
  const totalCoorte = coorteAtual.alunos.length;
  const pcpCoorte = Math.round((proficientes.length / totalCoorte) * 100);
  const conceitoProjetado = _conceitoForPcp(pcpCoorte);

  const breadcrumb = [
    { label: 'Coordenação', onClick: () => onNavigate && onNavigate('coordenacao') },
    { label: 'ENAMED' },
  ];

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <TopBar
        title="Dashboard ENAMED"
        subtitle="15 competências · Portaria MEC 478 · status binário do aluno · Conceito C1–C5 do curso"
        isMobile={isMobile}
        breadcrumb={breadcrumb}
      />

      <div style={{ padding: isMobile ? 14 : '24px 32px', display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 1400, margin: '0 auto' }}>

        {/* ── Indicador principal ─────────────────────────────────────── */}
        <Card style={{ padding: isMobile ? 16 : 22, borderLeft: `4px solid ${DS.terra}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr 1fr', gap: 20, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
                Alunos não-proficientes · {coorteAtual.label}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{ fontSize: isMobile ? 52 : 64, fontWeight: 800, color: DS.terra, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                  {naoProficientes.length}
                </span>
                <span style={{ fontSize: 16, color: DS.textSec, fontWeight: 600 }}>
                  de {totalCoorte} · {Math.round((naoProficientes.length / totalCoorte) * 100)}%
                </span>
              </div>
              <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 6, lineHeight: 1.55 }}>
                Cada aluno aqui aumenta o denominador do PCP. Foco de Coordenação
                e do tutor — plano de recuperação individual.
              </div>
            </div>

            <div style={{ borderLeft: isMobile ? 'none' : `1px solid ${DS.borderLight}`, borderTop: isMobile ? `1px solid ${DS.borderLight}` : 'none', paddingLeft: isMobile ? 0 : 20, paddingTop: isMobile ? 14 : 0 }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
                PCP projetado · coorte
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 40, fontWeight: 800, color: DS.text, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                  {pcpCoorte}
                </span>
                <span style={{ fontSize: 16, color: DS.textSec, fontWeight: 600 }}>%</span>
              </div>
              <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 6, lineHeight: 1.55 }}>
                Conceito projetado: <strong style={{ color: DS.text }}>{conceitoProjetado}</strong>
                {' '}· UNIDAVI hoje (coorte 2026): <strong style={{ color: DS.text }}>{ENAMED_CURSO_HOJE.conceito} · {ENAMED_CURSO_HOJE.pcp}%</strong>
              </div>
            </div>

            <div style={{ borderLeft: isMobile ? 'none' : `1px solid ${DS.borderLight}`, borderTop: isMobile ? `1px solid ${DS.borderLight}` : 'none', paddingLeft: isMobile ? 0 : 20, paddingTop: isMobile ? 14 : 0 }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
                Coorte ativa
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {Object.keys(ENAMED_COORTES).map(ano => {
                  const ativo = String(coorteAtiva) === ano;
                  return (
                    <button key={ano} onClick={() => setCoorteAtiva(parseInt(ano, 10))} style={{
                      padding: '8px 14px', borderRadius: DS.radiusSm,
                      background: ativo ? DS.blueDark : DS.surface,
                      color: ativo ? '#fff' : DS.textDark,
                      border: `1px solid ${ativo ? DS.blueDark : DS.border}`,
                      fontFamily: 'IBM Plex Sans, sans-serif',
                      fontWeight: 700, fontSize: 12, cursor: 'pointer',
                    }}>{ano}</button>
                  );
                })}
              </div>
              <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 8, lineHeight: 1.5 }}>
                {coorteAtual.descr}
              </div>
            </div>
          </div>
        </Card>

        {/* ── Banda C1–C5 ─────────────────────────────────────────────── */}
        <Card style={{ padding: isMobile ? 16 : 20 }}>
          <SectionHeading>Banda Conceito C1–C5 · PCP do curso</SectionHeading>
          <BandaConceito pcp={ENAMED_CURSO_HOJE.pcp} pcpCoorte={pcpCoorte} />
        </Card>

        {/* ── Coortes ativa + futuras (listagem) ──────────────────────── */}
        <CoorteListaCard
          coorte={coorteAtual}
          isMobile={isMobile}
          onAbrirAluno={(a) => alert(`Abrir Perfil · ${a.nome} (mock).`)}
        />

        {/* ── Outras coortes ──────────────────────────────────────────── */}
        <Card style={{ padding: isMobile ? 16 : 20 }}>
          <SectionHeading>Outras coortes</SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(260px,1fr))', gap: 12 }}>
            {Object.entries(ENAMED_COORTES).filter(([ano]) => parseInt(ano, 10) !== coorteAtiva).map(([ano, c]) => {
              const np = c.alunos.filter(a => !_proficiente(a.nota)).length;
              const pcp = Math.round(((c.alunos.length - np) / c.alunos.length) * 100);
              return (
                <button key={ano} onClick={() => setCoorteAtiva(parseInt(ano, 10))} style={{
                  textAlign: 'left', padding: '14px 16px', borderRadius: DS.radius,
                  background: DS.bg, border: `1px solid ${DS.border}`, cursor: 'pointer',
                  fontFamily: 'IBM Plex Sans, sans-serif',
                }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: DS.text }}>{c.label}</div>
                  <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 4, lineHeight: 1.5 }}>{c.descr}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 10 }}>
                    <span style={{ fontSize: 11, color: DS.textSec }}>{np} não-proficientes / {c.alunos.length}</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: DS.text, fontVariantNumeric: 'tabular-nums' }}>{pcp}%</span>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* ── Histórico (referência, sem ação) ──────────────────────── */}
        <Card style={{ padding: isMobile ? 16 : 20 }}>
          <SectionHeading>Histórico de Conceitos ENAMED</SectionHeading>
          <div style={{ fontSize: 11, color: DS.textMuted, marginBottom: 10 }}>
            Referência institucional — sem ação direta. Mostra a tendência longitudinal do curso.
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 420, fontFamily: 'IBM Plex Sans, sans-serif' }}>
              <thead>
                <tr style={{ background: DS.bg }}>
                  {['Ano', 'Conceito', 'PCP', 'Δ vs. anterior'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 10.5, fontWeight: 800, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', borderBottom: `1px solid ${DS.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ENAMED_HISTORICO.map((h, i) => {
                  const delta = i > 0 ? h.pcp - ENAMED_HISTORICO[i - 1].pcp : null;
                  return (
                    <tr key={h.ano}>
                      <td style={{ padding: '10px 12px', fontSize: 13, color: DS.text, fontWeight: 700, borderBottom: `1px solid ${DS.borderLight}` }}>{h.ano}</td>
                      <td style={{ padding: '10px 12px', borderBottom: `1px solid ${DS.borderLight}` }}>
                        <span style={{
                          padding: '3px 10px', borderRadius: 100, fontSize: 11, fontWeight: 800, color: '#fff',
                          background: h.conceito === 'C5' ? DS.green : h.conceito === 'C4' ? DS.blue : h.conceito === 'C3' ? DS.amber : DS.terra,
                        }}>{h.conceito}</span>
                      </td>
                      <td style={{ padding: '10px 12px', fontSize: 13, color: DS.text, fontVariantNumeric: 'tabular-nums', borderBottom: `1px solid ${DS.borderLight}` }}>{h.pcp}%</td>
                      <td style={{ padding: '10px 12px', fontSize: 12, fontVariantNumeric: 'tabular-nums', borderBottom: `1px solid ${DS.borderLight}` }}>
                        {delta === null
                          ? <span style={{ color: DS.textMuted }}>—</span>
                          : <span style={{ color: delta >= 0 ? DS.green : DS.terra, fontWeight: 700 }}>{delta >= 0 ? '+' : ''}{delta} pp</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Rodapé técnico */}
        <div style={{
          padding: '12px 16px', background: `${DS.blueAcc}08`, borderRadius: 8, fontSize: 11,
          color: DS.textMuted, lineHeight: 1.6, textAlign: 'center',
        }}>
          Dashboard ENAMED · 15 competências da Portaria MEC 478 · status binário do aluno (proficiente / não-proficiente) ·
          Conceito C1–C5 do curso · projeção via TP (escala transformada TRI) · curadoria docente obrigatória sobre identificação de não-proficientes.
        </div>

        {isMobile && <div style={{ height: 60 }} />}
      </div>
    </div>
  );
}

// ── Banda Conceito C1–C5 com plot do PCP ───────────────────────────────────
function BandaConceito({ pcp, pcpCoorte }) {
  // Eixo X: 0–100%. Cinco faixas C1..C5
  const faixas = [
    { id: 'C1', min: 0,  max: 40, cor: '#B23A2A' },
    { id: 'C2', min: 40, max: 60, cor: '#D97757' },
    { id: 'C3', min: 60, max: 75, cor: '#B97A0F' },
    { id: 'C4', min: 75, max: 90, cor: '#1565C0' },
    { id: 'C5', min: 90, max: 100, cor: '#2E7D4F' },
  ];
  return (
    <div style={{ position: 'relative', height: 72 }}>
      {/* faixas */}
      <div style={{ position: 'absolute', top: 18, left: 0, right: 0, height: 28, borderRadius: 6, overflow: 'hidden', display: 'flex', border: `1px solid ${DS.border}` }}>
        {faixas.map(f => (
          <div key={f.id} style={{
            flex: f.max - f.min, background: f.cor, position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: 12, fontFamily: 'IBM Plex Sans, sans-serif',
            letterSpacing: '0.4px',
          }}>
            {f.id}
            <span style={{ position: 'absolute', bottom: -16, left: 0, fontSize: 9.5, color: DS.textMuted, fontWeight: 600 }}>{f.min}%</span>
          </div>
        ))}
        <span style={{ position: 'absolute', bottom: -16, right: 0, fontSize: 9.5, color: DS.textMuted, fontWeight: 600 }}>100%</span>
      </div>

      {/* marker — curso hoje */}
      <Marker pct={pcp} cor={DS.blueDark} label={`Curso · ${pcp}%`} pos="top" />
      {/* marker — coorte projetada */}
      <Marker pct={pcpCoorte} cor={DS.terra} label={`Coorte projetada · ${pcpCoorte}%`} pos="bottom" />
    </div>
  );
}

function Marker({ pct, cor, label, pos = 'top' }) {
  const top = pos === 'top' ? 0 : 50;
  const labelTop = pos === 'top' ? -2 : 50;
  return (
    <div style={{
      position: 'absolute', top, left: `${pct}%`, transform: 'translateX(-50%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2,
    }}>
      <div style={{
        padding: '2px 7px', background: cor, color: '#fff',
        borderRadius: 4, fontSize: 10.5, fontWeight: 800, fontFamily: 'IBM Plex Sans, sans-serif',
        whiteSpace: 'nowrap', marginBottom: 2,
      }}>{label}</div>
      <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `7px solid ${cor}` }} />
    </div>
  );
}

// ── Listagem nominal da coorte ─────────────────────────────────────────────
function CoorteListaCard({ coorte, isMobile, onAbrirAluno }) {
  const ordenados = [...coorte.alunos].sort((a, b) => a.nota - b.nota);
  const np = ordenados.filter(a => !_proficiente(a.nota));
  const pro = ordenados.filter(a => _proficiente(a.nota));
  return (
    <Card style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px', borderBottom: `1px solid ${DS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: DS.text }}>Alunos da {coorte.label}</div>
          <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 2 }}>
            {np.length} não-proficientes (foco) · {pro.length} proficientes (manutenção)
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button style={{ padding: '7px 12px', borderRadius: DS.radiusSm, background: 'transparent', border: `1px solid ${DS.border}`, color: DS.textSec, fontWeight: 700, fontSize: 11, cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif' }}>
            Exportar CSV
          </button>
          <button style={{ padding: '7px 12px', borderRadius: DS.radiusSm, background: DS.terra, color: '#fff', border: 'none', fontWeight: 700, fontSize: 11, cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif' }}>
            Plano de recuperação · {np.length}
          </button>
        </div>
      </div>

      {/* Tabela única — não-proficientes primeiro */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560, fontFamily: 'IBM Plex Sans, sans-serif' }}>
          <thead>
            <tr style={{ background: DS.bg }}>
              {['', 'Aluno', 'Turma · Fase', 'Nota projetada', 'Δ corte 60', 'Status'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: 10.5, fontWeight: 800, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', borderBottom: `1px solid ${DS.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ordenados.map((a, i) => {
              const prof = _proficiente(a.nota);
              const cor = prof ? DS.green : DS.terra;
              const delta = +(a.nota - ENAMED_CORTE).toFixed(1);
              return (
                <tr key={a.id}
                  onClick={() => onAbrirAluno && onAbrirAluno(a)}
                  style={{ cursor: 'pointer', background: i % 2 ? DS.surface : DS.bg, transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = DS.blueLight}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 ? DS.surface : DS.bg}
                >
                  <td style={{ padding: '8px 12px', borderBottom: `1px solid ${DS.borderLight}`, width: 24 }}>
                    <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: cor }} />
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: 13, color: DS.text, fontWeight: 600, borderBottom: `1px solid ${DS.borderLight}` }}>
                    {a.nome}
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: 12, color: DS.textSec, borderBottom: `1px solid ${DS.borderLight}` }}>
                    {a.turma} · {a.fase}
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: 14, color: cor, fontWeight: 800, fontVariantNumeric: 'tabular-nums', borderBottom: `1px solid ${DS.borderLight}` }}>
                    {a.nota.toFixed(1).replace('.', ',')}
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: 12, color: cor, fontWeight: 700, fontVariantNumeric: 'tabular-nums', borderBottom: `1px solid ${DS.borderLight}` }}>
                    {delta > 0 ? '+' : ''}{delta.toFixed(1).replace('.', ',')}
                  </td>
                  <td style={{ padding: '10px 12px', borderBottom: `1px solid ${DS.borderLight}` }}>
                    <span style={{
                      padding: '3px 9px', borderRadius: 100, fontSize: 10, fontWeight: 800, color: '#fff',
                      background: cor, textTransform: 'uppercase', letterSpacing: '0.3px',
                    }}>{prof ? 'Proficiente' : 'Não-prof.'}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

Object.assign(window, {
  DashboardENAMEDScreen,
  ENAMED_CURSO_HOJE, ENAMED_HISTORICO, ENAMED_COORTES,
});
