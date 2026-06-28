// =============================================================================
// MED-UNIDAVI · Bloco "Status ENAMED" no Perfil do Aluno (mu_status_enamed_perfil)
// Spec B3 do Bloco B. Status binário (proficiente / não-proficiente).
// NUNCA exibir "faixa" ou Conceito C1–C5 para o aluno individual —
// faixa/Conceito são do CURSO, status é do ALUNO.
// =============================================================================

// ── Vocabulário canônico (números mock) ─────────────────────────────────────
const ENAMED_CORTE = 60;                    // nota individual para PROFICIENTE
const ENAMED_FAIXAS = [                      // do CURSO, não do aluno — usado em Dashboard ENAMED
  { id: 'C1', min: 0,  max: 40,  label: 'C1' },
  { id: 'C2', min: 40, max: 60,  label: 'C2' },
  { id: 'C3', min: 60, max: 75,  label: 'C3' },
  { id: 'C4', min: 75, max: 90,  label: 'C4' },
  { id: 'C5', min: 90, max: 100, label: 'C5' },
];

// Calcula a coorte ENAMED do aluno a partir da fase atual e do ano corrente.
// Fase 12 = ano corrente; cada fase abaixo, soma 0.5 ano para a coorte.
function enamedCoorteFromFase(faseStr, hojeAno = 2026) {
  const fase = parseInt(String(faseStr).replace(/\D/g, ''), 10) || 1;
  // 12ª fase prestaria a prova neste ano; cada fase a menos, +1 ano (semestralmente seria +0,5 mas a prova é anual)
  return hojeAno + Math.ceil((12 - fase) / 2);
}

// Mock — histórico de notas projetadas (para sparkline)
const ENAMED_MOCK = {
  'joao-melo': { historico: [44, 49, 52], coortePadrao: null }, // 5ª fase · não-proficiente, em ascensão
};

function BlocoStatusENAMED({ aluno, isMobile }) {
  const enamedAluno = (aluno.statusEnamed && aluno.statusEnamed.historico)
    ? aluno.statusEnamed
    : (ENAMED_MOCK[aluno.id] || { historico: [44, 49, 52] });
  const historico = enamedAluno.historico;
  const notaAtual = historico[historico.length - 1];
  const proficiente = notaAtual >= ENAMED_CORTE;
  const distancia = +(notaAtual - ENAMED_CORTE).toFixed(1);
  const coorte = aluno.statusEnamed?.coorte
    ?? enamedCoorteFromFase(aluno.fase, 2026);

  // Cores
  const cor = proficiente ? DS.green : DS.terra;
  const corBg = proficiente ? DS.greenLight : DS.terraLight;
  const corBorda = proficiente ? '#A8D5BA' : '#E8A89B';

  // Sparkline: 3 pontos, normalizado em viewbox 100 × 30
  const W = 100, H = 30, pad = 4;
  const min = Math.min(...historico, ENAMED_CORTE - 5);
  const max = Math.max(...historico, ENAMED_CORTE + 5);
  const span = Math.max(max - min, 1);
  const pts = historico.map((v, i) => {
    const x = pad + (i * (W - 2 * pad)) / (historico.length - 1);
    const y = H - pad - ((v - min) / span) * (H - 2 * pad);
    return { x, y, v };
  });
  const corteY = H - pad - ((ENAMED_CORTE - min) / span) * (H - 2 * pad);
  const polyline = pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const tendencia = historico[historico.length - 1] - historico[0];

  return (
    <section>
      <SectionHeading>Status ENAMED</SectionHeading>
      <Card style={{ padding: 0, overflow: 'hidden', borderLeft: `4px solid ${cor}` }}>
        <div style={{ padding: isMobile ? 14 : 18, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr 1fr', gap: isMobile ? 14 : 18, alignItems: 'stretch' }}>

          {/* COL 1 — Nota projetada + selo binário */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Nota ENAMED projetada
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 44, fontWeight: 800, color: cor, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                {notaAtual.toFixed(1).replace('.', ',')}
              </span>
              <span style={{ fontSize: 13, color: DS.textMuted }}>/ 100</span>
            </div>
            <div style={{
              alignSelf: 'flex-start', padding: '6px 14px', borderRadius: 100,
              background: cor, color: '#fff',
              fontSize: 12, fontWeight: 800, letterSpacing: '0.4px', textTransform: 'uppercase',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
              {proficiente ? 'Proficiente' : 'Não-proficiente'}
            </div>
            <div style={{ fontSize: 11, color: DS.textMuted, lineHeight: 1.5, marginTop: 4 }}>
              Corte de proficiência: <strong style={{ color: DS.textDark }}>60</strong>.
              Status binário — não há faixa ou Conceito para aluno individual.
            </div>
          </div>

          {/* COL 2 — Distância para o corte + tendência */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Distância para o corte
            </div>
            <div style={{
              padding: '12px 14px', borderRadius: DS.radius,
              background: corBg, border: `1px solid ${corBorda}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 28, fontWeight: 800, color: cor, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
                  {distancia > 0 ? '+' : ''}{distancia.toFixed(1).replace('.', ',')}
                </span>
                <span style={{ fontSize: 11, color: DS.textSec }}>pontos</span>
              </div>
              <div style={{ fontSize: 11, color: DS.textSec, marginTop: 4, lineHeight: 1.45 }}>
                {proficiente
                  ? `Acima do corte. Mantenha a trajetória para a coorte ${coorte}.`
                  : `Faltam ${Math.abs(distancia).toFixed(1).replace('.', ',')} pontos para o corte. Coorte ENAMED prevista: ${coorte}.`}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 2 }}>
              <span style={{
                fontSize: 11, fontWeight: 700, color: tendencia >= 0 ? DS.green : DS.terra,
              }}>
                {tendencia >= 0 ? '↑' : '↓'} {Math.abs(tendencia).toFixed(1).replace('.', ',')} pp
              </span>
              <span style={{ fontSize: 10.5, color: DS.textMuted }}>
                vs. {historico.length} aplicações atrás
              </span>
            </div>
          </div>

          {/* COL 3 — Sparkline + coorte */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Últimas {historico.length} projetadas
              </div>
              <div style={{ fontSize: 10, color: DS.textMuted, fontVariantNumeric: 'tabular-nums' }}>
                {historico.map(v => v.toFixed(0)).join(' · ')}
              </div>
            </div>
            <div style={{
              padding: '10px 12px', background: DS.bg,
              border: `1px solid ${DS.borderLight}`, borderRadius: DS.radiusSm,
              position: 'relative',
            }}>
              <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 56, display: 'block' }}>
                {/* linha do corte 60 */}
                <line x1={pad} x2={W - pad} y1={corteY} y2={corteY}
                      stroke={DS.border} strokeWidth="1" strokeDasharray="2 3" />
                <text x={W - pad} y={corteY - 2} fontSize="6" fill={DS.textMuted}
                      textAnchor="end">corte 60</text>
                {/* polyline */}
                <polyline points={polyline} fill="none" stroke={cor} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
                {/* pontos */}
                {pts.map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r="2" fill={cor} stroke="#fff" strokeWidth="0.8" />
                  </g>
                ))}
              </svg>
            </div>
            <div style={{
              marginTop: 4, padding: '8px 12px',
              background: DS.surface, border: `1px solid ${DS.borderLight}`, borderRadius: DS.radiusSm,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Coorte ENAMED
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: DS.text, fontVariantNumeric: 'tabular-nums' }}>
                  {coorte}
                </div>
              </div>
              <div style={{ fontSize: 10.5, color: DS.textMuted, textAlign: 'right', lineHeight: 1.4, maxWidth: 130 }}>
                Calculada a partir da fase atual<br/>({aluno.fase}).
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé — calibração */}
        <div style={{
          padding: '8px 16px', background: DS.bg, borderTop: `1px solid ${DS.borderLight}`,
          fontSize: 10.5, color: DS.textMuted, lineHeight: 1.5, display: 'flex',
          alignItems: 'center', gap: 8, flexWrap: 'wrap',
        }}>
          <span style={{
            padding: '2px 8px', borderRadius: 100, background: DS.amberLight, color: DS.amber,
            fontWeight: 700, fontSize: 9.5, letterSpacing: '0.3px',
          }}>v1.0 · calibração TRI em curso</span>
          <span>Projeção via escala transformada TRI a partir do TP. Nota oficial só após prova ENAMED (Portaria MEC 478).</span>
        </div>
      </Card>
    </section>
  );
}

Object.assign(window, {
  BlocoStatusENAMED,
  ENAMED_CORTE, ENAMED_FAIXAS,
  enamedCoorteFromFase, ENAMED_MOCK,
});
