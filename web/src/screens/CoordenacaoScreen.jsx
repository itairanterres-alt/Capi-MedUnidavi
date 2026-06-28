// Coordenação — institutional dashboard. Ported from the prototype's
// CoordenacaoScreen (screens.jsx) + the Item-15 blocks (CoordFiltrosBusca from
// coordenacao-blocos.jsx, CoordMatriz27x12 + CoordDrilldown from
// coordenacao.jsx). Consumes /api/coordenacao/overview + /api/students.
import React from 'react';
import { DS } from '../lib/ds.js';
import { Card, SectionHeading, AIDisclaimer } from '../components/index.js';

const CONCEITO_COLOR = {
  suficiente:   { bg: DS.greenLight, fg: DS.green, label: 'Suficiente' },
  precisa:      { bg: DS.amberLight, fg: DS.amber, label: 'Precisa melhorar' },
  insuficiente: { bg: '#F5DDD3', fg: DS.terra, label: 'Insuficiente' },
  pendente:     { bg: DS.borderLight, fg: DS.textMuted, label: 'Pendente' },
};

const FASES = ['1ª','2ª','3ª','4ª','5ª','6ª','7ª','8ª','9ª','10ª','11ª','12ª'];

// ── Filtros globais + busca de aluno ────────────────────────────────────────
const TURMAS = ['T07','T08','T09','T10','T11','T12','T13','T14','T15','T16','T17','T18'];
function CoordFiltrosBusca({ isMobile, filtros, setFiltros, busca, setBusca, onAbrirAluno, alunos, competencias }) {
  const sugestoes = busca.length >= 2
    ? alunos.filter(a => a.nome.toLowerCase().includes(busca.toLowerCase()) || a.id.includes(busca.toLowerCase())).slice(0, 6)
    : [];
  const toggleArr = (k, v) => {
    const cur = filtros[k] || [];
    setFiltros({ ...filtros, [k]: cur.includes(v) ? cur.filter(x => x !== v) : [...cur, v] });
  };
  return (
    <section>
      <div style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, padding: isMobile ? 14 : 18, boxShadow: DS.shadow }}>
        <div style={{ position: 'relative', marginBottom: 14 }}>
          <input type="text" value={busca} onChange={e => setBusca(e.target.value)} placeholder="Localizar aluno específico (nome ou matrícula)..."
            style={{ width: '100%', padding: '12px 16px', borderRadius: DS.radius, border: `1px solid ${DS.border}`, fontSize: 13, color: DS.text, fontFamily: 'IBM Plex Sans, sans-serif', boxSizing: 'border-box', background: DS.bg }} />
          {sugestoes.length > 0 && (
            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10, background: DS.surface, border: `1px solid ${DS.border}`, borderRadius: DS.radius, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', marginTop: 4, maxHeight: 280, overflowY: 'auto' }}>
              {sugestoes.map(a => (
                <div key={a.id} onClick={() => { onAbrirAluno(a); setBusca(''); }}
                  style={{ padding: '10px 14px', cursor: 'pointer', borderBottom: `1px solid ${DS.borderLight}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}
                  onMouseEnter={e => e.currentTarget.style.background = DS.bg}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: DS.text }}>{a.nome}</div>
                    <div style={{ fontSize: 11, color: DS.textMuted }}>{a.turma} · {a.fase} fase · TP {a.tp}%</div>
                  </div>
                  <span style={{ fontSize: 11, color: DS.blue, fontWeight: 700 }}>Abrir →</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr 1fr', gap: 14 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6 }}>Turma</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {TURMAS.map(t => (<button key={t} onClick={() => toggleArr('turmas', t)} style={{ padding: '4px 8px', borderRadius: 100, border: 'none', cursor: 'pointer', fontSize: 10, fontWeight: 700, fontFamily: 'IBM Plex Mono, monospace', background: filtros.turmas?.includes(t) ? DS.blueDark : DS.bg, color: filtros.turmas?.includes(t) ? '#fff' : DS.textMuted }}>{t}</button>))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6 }}>Fase</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {FASES.map(f => (<button key={f} onClick={() => toggleArr('fases', f)} style={{ padding: '4px 8px', borderRadius: 100, border: 'none', cursor: 'pointer', fontSize: 10, fontWeight: 700, background: filtros.fases?.includes(f) ? DS.blueDark : DS.bg, color: filtros.fases?.includes(f) ? '#fff' : DS.textMuted }}>{f}</button>))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6 }}>Status</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {[{ k: 'ok', l: 'Regular', c: DS.green }, { k: 'atencao', l: 'Atenção', c: DS.amber }, { k: 'risco', l: 'Em risco', c: DS.terra }].map(s => (
                <button key={s.k} onClick={() => toggleArr('status', s.k)} style={{ padding: '4px 10px', borderRadius: 100, border: 'none', cursor: 'pointer', fontSize: 10, fontWeight: 700, background: filtros.status?.includes(s.k) ? s.c : DS.bg, color: filtros.status?.includes(s.k) ? '#fff' : DS.textMuted }}>{s.l}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6 }}>Competência</div>
            <select value={filtros.competencia || ''} onChange={e => setFiltros({ ...filtros, competencia: e.target.value || null })} style={{ width: '100%', padding: '6px 10px', borderRadius: 6, border: `1px solid ${DS.border}`, background: DS.bg, fontSize: 11, color: DS.text, fontFamily: 'IBM Plex Sans, sans-serif' }}>
              <option value="">— todas as 27 —</option>
              {competencias.map(c => (<option key={c.idx} value={c.idx}>{c.idx}. {c.titulo.slice(0, 60)}…</option>))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Matriz 27 (AS/GS/ES) × 12 fases ─────────────────────────────────────────
function CoordMatriz27x12({ isMobile, onCelula, compDcn, matrizCells }) {
  const [areaOpen, setAreaOpen] = React.useState({ 'Atenção à Saúde': true, 'Gestão em Saúde': true, 'Educação em Saúde': true });
  const corEstado = {
    'suficiente':       { bg: DS.greenLight, fg: DS.green, label: 'S' },
    'precisa-melhorar': { bg: DS.amberLight, fg: DS.amber, label: 'M' },
    'insuficiente':     { bg: DS.terraLight, fg: DS.terra, label: 'I' },
    'pendente':         { bg: DS.bg, fg: DS.textMuted, label: '·' },
  };
  const areas = ['Atenção à Saúde', 'Gestão em Saúde', 'Educação em Saúde'];
  const corArea = { 'Atenção à Saúde': DS.blue, 'Gestão em Saúde': DS.terra, 'Educação em Saúde': DS.green };
  const cellState = (compId, fase) => matrizCells[`${compId}|${fase}`] || 'pendente';
  const totaisFase = FASES.map(f => {
    const c = { suficiente: 0, 'precisa-melhorar': 0, insuficiente: 0, pendente: 0 };
    compDcn.forEach(comp => { c[cellState(comp.id, f)]++; });
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
      <div style={{ overflowX: 'auto', border: `1px solid ${DS.border}`, borderRadius: DS.radiusMd }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 900, fontFamily: 'IBM Plex Sans, sans-serif' }}>
          <thead>
            <tr style={{ background: DS.bg }}>
              <th style={{ position: 'sticky', left: 0, background: DS.bg, padding: '8px 10px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', borderRight: `1px solid ${DS.border}`, minWidth: 240, zIndex: 2 }}>Competência</th>
              {FASES.map(f => (<th key={f} style={{ padding: '8px 6px', fontSize: 11, fontWeight: 700, color: DS.textSec, textAlign: 'center', minWidth: 38 }}>{f}</th>))}
            </tr>
          </thead>
          <tbody>
            {areas.map(area => {
              const comps = compDcn.filter(c => c.area === area);
              const aberto = areaOpen[area];
              return (
                <React.Fragment key={area}>
                  <tr style={{ background: corArea[area] + '12', borderTop: `2px solid ${corArea[area]}` }}>
                    <td colSpan={13} style={{ padding: '8px 10px', position: 'sticky', left: 0 }}>
                      <button onClick={() => setAreaOpen(o => ({ ...o, [area]: !o[area] }))} style={{ display: 'flex', alignItems: 'center', gap: 8, border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
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
                        const e = cellState(comp.id, f);
                        const c = corEstado[e];
                        return (
                          <td key={f} style={{ padding: 2, textAlign: 'center' }}>
                            <button title={`${comp.id} · ${f} fase · ${e.replace('-', ' ')}`} onClick={() => onCelula({ tipo: 'celula', compId: comp.id, compShort: comp.short, area, fase: f, estado: e })}
                              style={{ width: '100%', height: 28, background: c.fg, border: 'none', borderRadius: 4, cursor: 'pointer', color: '#fff', fontSize: 10, fontWeight: 700, opacity: e === 'pendente' ? 0.35 : 1 }}>{c.label}</button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
            <tr style={{ borderTop: `2px solid ${DS.border}`, background: DS.bg }}>
              <td style={{ position: 'sticky', left: 0, background: DS.bg, padding: '8px 10px', fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', borderRight: `1px solid ${DS.border}`, zIndex: 1 }}>Cobertura agregada</td>
              {totaisFase.map((t, i) => {
                const pct = Math.round((t.suficiente / 27) * 100);
                return (<td key={i} style={{ padding: '6px 4px', textAlign: 'center', fontSize: 10, fontWeight: 700, color: pct >= 60 ? DS.green : pct >= 40 ? DS.amber : DS.terra }}>{pct}%</td>);
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

// ── Drilldown lateral ───────────────────────────────────────────────────────
function CoordDrilldown({ drilldown, onClose, onAbrirAluno, isMobile, evidencias, alunosRisco }) {
  const isCelula = drilldown.tipo === 'celula';
  const titulo = isCelula ? `${drilldown.compId} — ${drilldown.compShort}` : `Domínio ${drilldown.dominio || ''} — ${drilldown.titulo}`;
  const subtitulo = isCelula ? `${drilldown.area} · ${drilldown.fase} fase` : 'Heatmap legado (6 domínios) — substituído pela matriz DCN 2025';
  const corEstado = { suficiente: DS.green, 'precisa-melhorar': DS.amber, insuficiente: DS.terra, pendente: DS.textMuted };
  const statusCor = { risco: DS.terra, atencao: DS.amber };
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(13,28,52,0.55)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: isMobile ? '100%' : 560, height: '100%', background: DS.surface, boxShadow: '-4px 0 24px rgba(0,0,0,0.15)', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
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
        <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 20 }}>
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
                  <span style={{ width: 12, height: 12, borderRadius: 3, background: corEstado[e.status], flexShrink: 0 }} title={e.status} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px' }}>Alunos com flag nesta competência</div>
              <span style={{ fontSize: 10, color: DS.textMuted, fontWeight: 600 }}>{alunosRisco.length} casos</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {alunosRisco.map(a => (
                <button key={a.id} onClick={() => onAbrirAluno(a)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: DS.radiusSm, border: `1px solid ${DS.border}`, background: DS.surface, cursor: 'pointer', textAlign: 'left' }}>
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
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>Ações</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button style={{ flex: 1, minWidth: 140, padding: '10px 14px', borderRadius: DS.radiusMd, border: 'none', background: DS.blue, color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Convocar reunião pedagógica</button>
              <button style={{ flex: 1, minWidth: 140, padding: '10px 14px', borderRadius: DS.radiusMd, border: `1px solid ${DS.border}`, background: DS.surface, color: DS.textSec, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Exportar relatório CSV</button>
              <button style={{ flex: 1, minWidth: 140, padding: '10px 14px', borderRadius: DS.radiusMd, border: `1px solid ${DS.border}`, background: DS.surface, color: DS.textSec, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Sinalizar ao NDE</button>
            </div>
          </div>
          <AIDisclaimer texto="Agregações geradas a partir de registros estruturados. Toda decisão pedagógica passa por análise humana do colegiado." />
        </div>
      </div>
    </div>
  );
}

// ── Main screen ─────────────────────────────────────────────────────────────
export default function CoordenacaoScreen({ isMobile, data, students, onAbrirPerfil, onNavigate }) {
  const [exportando, setExportando] = React.useState(false);
  const [filtros, setFiltros] = React.useState({ turmas: [], fases: [], status: [], competencia: null });
  const [busca, setBusca] = React.useState('');
  const [drilldown, setDrilldown] = React.useState(null);

  const abrirAluno = (aluno) => { setDrilldown(null); if (onAbrirPerfil) onAbrirPerfil('coordenacao', aluno); else if (onNavigate) onNavigate('perfil-aluno'); };

  const heatColor = (v, min, max) => { const pct = (v - min) / (max - min); if (pct >= 0.75) return '#1E7A4A'; if (pct >= 0.5) return '#2A8A5C'; if (pct >= 0.35) return '#B07A18'; return '#C4622D'; };
  const maxTP = 65;
  const { macros, fases, turmas, semestres, alertas, producao, saudeBancoPorDocente, psicometria, statusBanco, treinoAgregados, areasEixo, estadoMeta, compDcn, matrizCells, drilldown: drillData } = data;

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg, fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <div style={{ padding: isMobile ? '16px' : '20px 32px', background: DS.surface, borderBottom: `1px solid ${DS.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: DS.blueAcc }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px' }}>Visão Coordenação</span>
          </div>
          <h1 style={{ margin: '2px 0 0', fontSize: isMobile ? 18 : 22, fontWeight: 700, color: DS.text }}>Dashboard de Coordenação</h1>
          <p style={{ margin: 0, fontSize: 12, color: DS.textSec }}>{data.coordenador} · Medicina UNIDAVI · Atualizado em {data.atualizado}</p>
        </div>
        <button onClick={() => { setExportando(true); setTimeout(() => setExportando(false), 2000); }}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: DS.radius, background: exportando ? DS.green : DS.blue, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 13, transition: 'background 0.3s' }}>
          <span>{exportando ? '✓' : '↓'}</span>{exportando ? 'Exportado!' : 'Exportar NDE/CPA/MEC'}
        </button>
      </div>

      <div style={{ padding: isMobile ? '16px' : '24px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <CoordFiltrosBusca isMobile={isMobile} filtros={filtros} setFiltros={setFiltros} busca={busca} setBusca={setBusca} onAbrirAluno={abrirAluno} alunos={students} competencias={data.competencias27 || []} />

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 12 }}>
          {macros.map((m, i) => (
            <div key={i} style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, padding: '16px', boxShadow: DS.shadow }}>
              <div style={{ fontSize: 10, color: DS.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>{m.label}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: DS.text, lineHeight: 1.1 }}>{m.valor}</div>
              <div style={{ fontSize: 11, color: m.color, fontWeight: 600, marginTop: 4 }}>{m.delta} vs. ano anterior</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 20, flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start' }}>
          <section style={{ flex: 2 }}>
            <div style={{ marginBottom: 10 }}>
              <h3 style={{ margin: 0, fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Mapa de desempenho por fase</h3>
              <p style={{ margin: '2px 0 0', fontSize: 11, color: DS.textMuted }}>Taxa de aprovação · Média TP · APCs concluídas (%)</p>
            </div>
            <div style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, padding: '16px', boxShadow: DS.shadow, overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr>
                    <th style={{ padding: '6px 10px', textAlign: 'left', color: DS.textMuted, fontWeight: 600, fontSize: 11, borderBottom: `1px solid ${DS.border}` }}>Fase</th>
                    {['Aprovação', 'Média TP', 'APCs %'].map(h => (<th key={h} style={{ padding: '6px 10px', textAlign: 'center', color: DS.textMuted, fontWeight: 600, fontSize: 11, borderBottom: `1px solid ${DS.border}` }}>{h}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {fases.map((f, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${DS.borderLight}` }}>
                      <td style={{ padding: '7px 10px', fontWeight: 700, color: DS.text }}>{f.f}</td>
                      <td style={{ padding: '7px 10px', textAlign: 'center' }}><span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 6, background: heatColor(f.ap, 70, 97) + '22', color: heatColor(f.ap, 70, 97), fontWeight: 700, fontSize: 12 }}>{f.ap}%</span></td>
                      <td style={{ padding: '7px 10px', textAlign: 'center' }}><span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 6, background: heatColor(f.tp, 40, 65) + '22', color: heatColor(f.tp, 40, 65), fontWeight: 700, fontSize: 12 }}>{f.tp}%</span></td>
                      <td style={{ padding: '7px 10px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ flex: 1, background: DS.borderLight, borderRadius: 100, height: 6, overflow: 'hidden' }}><div style={{ width: `${f.apcs}%`, height: '100%', background: heatColor(f.apcs, 15, 100), borderRadius: 100 }} /></div>
                          <span style={{ fontSize: 11, fontWeight: 600, color: heatColor(f.apcs, 15, 100), minWidth: 32 }}>{f.apcs}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section style={{ flex: isMobile ? 'auto' : '0 0 280px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Alertas institucionais</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {alertas.map((a, i) => (
                <div key={i} style={{ background: DS.surface, borderRadius: DS.radius, border: `1px solid ${DS.border}`, padding: '12px 14px', boxShadow: DS.shadow, borderLeft: `3px solid ${a.tipo === 'risco' ? DS.terra : DS.blue}` }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
                    <span style={{ fontSize: 14 }}>{a.icon}</span>
                    <span style={{ fontSize: 12, color: DS.textSec, lineHeight: 1.5, flex: 1 }}>{a.texto}</span>
                  </div>
                  <button style={{ padding: '4px 10px', borderRadius: DS.radiusSm, border: `1px solid ${DS.border}`, background: 'transparent', cursor: 'pointer', fontSize: 11, fontWeight: 600, color: DS.blue, fontFamily: 'IBM Plex Sans, sans-serif' }}>{a.acao} ›</button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section>
          <div style={{ marginBottom: 10 }}><h3 style={{ margin: 0, fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Teste de Progresso — evolução longitudinal por turma</h3></div>
          <div style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, padding: '20px', boxShadow: DS.shadow }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: isMobile ? 8 : 16, height: 160, paddingBottom: 8, marginBottom: 12 }}>
              {semestres.map((sem, si) => (
                <div key={si} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <div style={{ width: '100%', display: 'flex', gap: 3, justifyContent: 'center', alignItems: 'flex-end', height: 140 }}>
                    {turmas.map((t, ti) => {
                      const v = t.data[si];
                      if (!v) return <div key={ti} style={{ flex: 1, background: DS.borderLight, borderRadius: '3px 3px 0 0', height: '10%', opacity: 0.4 }} />;
                      return <div key={ti} title={`${t.label}: ${v}%`} style={{ flex: 1, background: t.color, borderRadius: '3px 3px 0 0', height: `${(v / maxTP) * 100}%`, transition: 'height 0.5s ease', opacity: 0.85 }} />;
                    })}
                  </div>
                  <div style={{ fontSize: 9, color: DS.textMuted, textAlign: 'center' }}>{sem}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {turmas.map((t, i) => (<div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 12, height: 12, borderRadius: 2, background: t.color }} /><span style={{ fontSize: 11, color: DS.textSec }}>{t.label}</span></div>))}
            </div>
          </div>
        </section>

        <section>
          <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Quadro de produção docente</h3>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: 12 }}>
            {producao.map((p, i) => (
              <div key={i} style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, padding: '16px', boxShadow: DS.shadow, display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: p.cor + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.cor, fontWeight: 800, fontSize: 16, flexShrink: 0 }}>{p.nome.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: DS.text, marginBottom: 6 }}>{p.nome}</div>
                  <div style={{ display: 'flex', gap: 14 }}>
                    <div style={{ textAlign: 'center' }}><div style={{ fontSize: 18, fontWeight: 800, color: DS.blue }}>{p.cards}</div><div style={{ fontSize: 9, color: DS.textMuted }}>Cards</div></div>
                    <div style={{ textAlign: 'center' }}><div style={{ fontSize: 18, fontWeight: 800, color: DS.green }}>{p.casos}</div><div style={{ fontSize: 9, color: DS.textMuted }}>Simulação Clínica</div></div>
                    <div style={{ textAlign: 'center' }}><div style={{ fontSize: 18, fontWeight: 800, color: DS.terra }}>{p.apcs}</div><div style={{ fontSize: 9, color: DS.textMuted }}>APCs</div></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Saúde do banco — questões e cards</h3>
          <div style={{ display: 'flex', gap: 18, flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start' }}>
            <div style={{ flex: 2 }}>
              <div style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, padding: '18px', boxShadow: DS.shadow }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 14 }}>Produção por docente</div>
                {saudeBancoPorDocente.map((d, i) => (
                  <div key={i} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: DS.text }}>{d.nome}</span>
                      <div style={{ display: 'flex', gap: 10, fontSize: 11 }}><span style={{ color: DS.blue }}>{d.questoes} questões</span><span style={{ color: DS.textMuted }}>{d.cards} cards</span></div>
                    </div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <div style={{ flex: d.questoes, background: d.cor, height: 8, borderRadius: 4, maxWidth: `${d.questoes * 2}px` }} />
                      <div style={{ flex: d.cards - d.questoes, background: d.cor + '50', height: 8, borderRadius: 4, maxWidth: `${(d.cards - d.questoes) * 1.2}px` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, padding: '16px', boxShadow: DS.shadow }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 }}>Índices psicométricos agregados</div>
                {psicometria.map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: i < 2 ? `1px solid ${DS.borderLight}` : 'none' }}>
                    <span style={{ fontSize: 12, color: DS.textSec }}>{m.label}</span>
                    <div style={{ textAlign: 'right' }}><div style={{ fontWeight: 700, fontSize: 13, color: m.ok ? DS.green : DS.amber }}>{m.valor}</div>{m.meta && <div style={{ fontSize: 10, color: DS.textMuted }}>meta: {m.meta}</div>}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, padding: '16px', boxShadow: DS.shadow }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>Status do banco</div>
                {statusBanco.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: 12, color: DS.text }}>{s.label}</span>
                    <span style={{ fontWeight: 700, fontSize: 13, color: s.color }}>{s.n}</span>
                    <div style={{ width: 60, background: DS.borderLight, borderRadius: 4, height: 5, overflow: 'hidden' }}><div style={{ width: `${(s.n / 78) * 100}%`, height: '100%', background: s.color, borderRadius: 4 }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Atividades de treino — por turma e fase</h3>
          <div style={{ display: 'flex', gap: 18, flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <div style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, padding: '18px', boxShadow: DS.shadow }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 14 }}>Turma 2024 — 3ª Fase (agregado, sem ranking individual)</div>
                {treinoAgregados.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0', borderBottom: i < 3 ? `1px solid ${DS.borderLight}` : 'none' }}>
                    <span style={{ fontSize: 18 }}>{item.icon}</span>
                    <span style={{ flex: 1, fontSize: 12, color: DS.textSec }}>{item.label}</span>
                    <span style={{ fontWeight: 800, fontSize: 16, color: DS.blue }}>{item.valor}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 2 }}>
              <div style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, padding: '18px', boxShadow: DS.shadow }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4 }}>Heatmap por área-eixo DCN 2025 — Turma 2024</div>
                <div style={{ fontSize: 11, color: DS.textMuted, marginBottom: 14 }}>Agregação institucional das 27 competências em 3 áreas (Art. 6º). Drilldown abre matriz competência × fase.</div>
                {areasEixo.map((a) => {
                  const E = a.E;
                  const segments = [
                    { k: 'suficiente', cor: estadoMeta.suficiente.cor },
                    { k: 'precisaMelhorar', cor: estadoMeta.precisaMelhorar.cor },
                    { k: 'insuficiente', cor: estadoMeta.insuficiente.cor },
                    { k: 'pendente', cor: estadoMeta.pendente.cor },
                  ];
                  return (
                    <button key={a.areaId} onClick={() => setDrilldown({ tipo: 'area', area: a.areaId, titulo: a.label, estado: a.estado })}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: DS.radiusSm, background: E.corBg, marginBottom: 6, border: `1px solid ${E.corBorda}`, cursor: 'pointer', textAlign: 'left' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: a.cor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 11, flexShrink: 0 }}>{a.total}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12.5, color: DS.text, fontWeight: 700 }}>{a.label}</div>
                        <div style={{ fontSize: 10.5, color: DS.textSec, marginTop: 1 }}>{a.total} competências · predominante {E.label.toLowerCase()}</div>
                      </div>
                      <div style={{ display: 'flex', width: 110, height: 10, borderRadius: 4, overflow: 'hidden', flexShrink: 0, border: `1px solid ${DS.borderLight}` }}>
                        {segments.map(s => { const n = a.dist[s.k] || 0; if (!n) return null; return <div key={s.k} title={`${estadoMeta[s.k].label}: ${n}/${a.total}`} style={{ flex: n, background: s.cor }} />; })}
                      </div>
                      <span style={{ fontSize: 14, color: DS.textMuted }}>›</span>
                    </button>
                  );
                })}
                <div style={{ marginTop: 10, padding: '8px 10px', background: DS.bg, borderRadius: DS.radiusSm, border: `1px solid ${DS.border}`, fontSize: 11, color: DS.textMuted }}>
                  ⚠ Nenhuma nota numérica — apenas conceitos UNIDAVI: <strong>suficiente · precisa melhorar · insuficiente · pendente</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CoordMatriz27x12 isMobile={isMobile} onCelula={(c) => setDrilldown(c)} compDcn={compDcn} matrizCells={matrizCells} />

        {drilldown && <CoordDrilldown drilldown={drilldown} onClose={() => setDrilldown(null)} onAbrirAluno={abrirAluno} isMobile={isMobile} evidencias={drillData.evidencias} alunosRisco={drillData.alunosRisco} />}

        {isMobile && <div style={{ height: 60 }} />}
      </div>
    </div>
  );
}
