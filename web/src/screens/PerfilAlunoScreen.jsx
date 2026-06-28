// Perfil do Aluno — drilldown longitudinal (9 blocks). Ported from the
// prototype's med-unidavi-perfil-aluno{,-p2,-screen}.jsx + bloco-enamed.jsx.
// Consumes the /api/students/:id/profile payload.
import React from 'react';
import { DS } from '../lib/ds.js';
import { Card, Avatar, Btn, SectionHeading, StatusFlag, TopBar } from '../components/index.js';

const CONCEITO_COLOR = {
  suficiente:   { bg: DS.greenLight, fg: DS.green, label: 'Suficiente' },
  precisa:      { bg: DS.amberLight, fg: DS.amber, label: 'Precisa melhorar' },
  insuficiente: { bg: '#F5DDD3', fg: DS.terra, label: 'Insuficiente' },
  pendente:     { bg: DS.borderLight, fg: DS.textMuted, label: 'Pendente' },
};

function ConceitoChip({ tipo, size = 'md' }) {
  const c = CONCEITO_COLOR[tipo] || CONCEITO_COLOR.pendente;
  const py = size === 'sm' ? 2 : 4, px = size === 'sm' ? 8 : 10, fs = size === 'sm' ? 10 : 11;
  return (
    <span style={{ display: 'inline-block', padding: `${py}px ${px}px`, borderRadius: 100, background: c.bg, color: c.fg, fontSize: fs, fontWeight: 700, fontFamily: 'IBM Plex Sans, sans-serif', whiteSpace: 'nowrap' }}>{c.label}</span>
  );
}

function StatusGlobalBadge({ status }) {
  const map = {
    'Regular':  { bg: DS.greenLight, fg: DS.green, dot: DS.green },
    'Atenção':  { bg: DS.amberLight, fg: DS.amber, dot: DS.amber },
    'Em risco': { bg: '#F5DDD3', fg: DS.terra, dot: DS.terra },
  };
  const c = map[status] || map['Regular'];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 100, background: c.bg, color: c.fg, fontSize: 12, fontWeight: 700, fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: c.dot }}></span>
      {status}
    </span>
  );
}

// ── BLOCO 1 — Cabeçalho ─────────────────────────────────────────────────────
function BlocoCabecalho({ aluno, isMobile, onVoltar, origemLabel }) {
  return (
    <Card style={{ padding: isMobile ? 16 : 24 }}>
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 20, alignItems: isMobile ? 'flex-start' : 'center' }}>
        <Avatar nome={aluno.nome} size={isMobile ? 56 : 72} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
            <h1 style={{ margin: 0, fontSize: isMobile ? 22 : 26, fontWeight: 700, color: DS.textDark, fontFamily: 'IBM Plex Sans, sans-serif' }}>{aluno.nome}</h1>
            <StatusGlobalBadge status={aluno.status} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, fontSize: 12, color: DS.textMuted }}>
            <span><strong style={{ color: DS.textDark }}>Matrícula:</strong> {aluno.matricula}</span>
            <span><strong style={{ color: DS.textDark }}>Turma:</strong> {aluno.turma}</span>
            <span><strong style={{ color: DS.textDark }}>Fase:</strong> {aluno.fase}</span>
            <span><strong style={{ color: DS.textDark }}>Tutor:</strong> {aluno.tutor}</span>
            <span><strong style={{ color: DS.textDark }}>Ingresso:</strong> {aluno.ingresso}</span>
          </div>
        </div>
        <Btn kind="ghost" onClick={onVoltar}>← {origemLabel || 'Voltar'}</Btn>
      </div>
      <div style={{ marginTop: 18, paddingTop: 16, borderTop: `1px solid ${DS.borderLight}`, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: 12 }}>
        {[
          { rotulo: 'Tutorial', val: aluno.subturmas.tutorial },
          { rotulo: 'Hab. Profissionais Clínicas', val: aluno.subturmas.habClinicas },
          { rotulo: 'Hab. Saúde Digital', val: aluno.subturmas.habDigital },
          { rotulo: 'IESC', val: aluno.subturmas.iesc },
        ].map((s, i) => (
          <div key={i} style={{ background: DS.bg, border: `1px solid ${DS.borderLight}`, borderRadius: 8, padding: '10px 12px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: 4 }}>{s.rotulo}</div>
            <div style={{ fontSize: 12, color: DS.textDark, lineHeight: 1.4 }}>{s.val}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── BLOCO 2 — Matriz programática (27 x N) ──────────────────────────────────
function BlocoMatrizProgramatica({ matriz, evidencias, isMobile, onCompetenciaClick }) {
  const [hoverCell, setHoverCell] = React.useState(null);
  const [eixoAberto, setEixoAberto] = React.useState({ 'Atenção à Saúde': true, 'Gestão em Saúde': !isMobile, 'Educação em Saúde': !isMobile });
  const eixos = ['Atenção à Saúde', 'Gestão em Saúde', 'Educação em Saúde'];
  const eixoColor = { 'Atenção à Saúde': DS.blueAcc, 'Gestão em Saúde': DS.terra, 'Educação em Saúde': DS.green };

  const tooltipKey = hoverCell ? `${matriz.linhas[hoverCell.row].idx}|${matriz.semestres[hoverCell.col]}` : null;
  const tooltipEvidencias = tooltipKey && evidencias[tooltipKey];
  const tooltipConceito = hoverCell ? matriz.linhas[hoverCell.row].sems[hoverCell.col] : null;

  return (
    <section>
      <SectionHeading>Avaliação Programática · 27 competências DCN 2025 × semestres</SectionHeading>
      <Card style={{ padding: isMobile ? 12 : 18, position: 'relative' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16, fontSize: 11 }}>
          {Object.keys(CONCEITO_COLOR).map(k => (
            <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 14, height: 14, borderRadius: 3, background: CONCEITO_COLOR[k].bg, border: `1px solid ${CONCEITO_COLOR[k].fg}40` }}></span>
              <span style={{ color: DS.textMuted }}>{CONCEITO_COLOR[k].label}</span>
            </span>
          ))}
          <span style={{ color: DS.textMuted, marginLeft: 'auto', fontSize: 10, fontStyle: 'italic' }}>Hover/toque em uma célula para ver evidências</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: isMobile ? 520 : 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? `60px repeat(${matriz.semestres.length}, 1fr)` : `40px 1fr repeat(${matriz.semestres.length}, 70px)`, gap: 4, marginBottom: 4, alignItems: 'center' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Comp.</div>
              {!isMobile && <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Título</div>}
              {matriz.semestres.map((s, i) => (
                <div key={i} title={`Semestre ${i + 1} · ${s} · ${i + 1}ª fase`} style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textAlign: 'center', cursor: 'help' }}>Sem {i + 1}</div>
              ))}
            </div>
            {eixos.map(eixo => {
              const linhasEixo = matriz.linhas.map((l, i) => ({ ...l, _idx: i })).filter(l => l.eixo === eixo);
              const aberto = eixoAberto[eixo];
              return (
                <div key={eixo} style={{ marginBottom: 8 }}>
                  <button onClick={() => setEixoAberto({ ...eixoAberto, [eixo]: !aberto })} style={{ width: '100%', textAlign: 'left', background: `${eixoColor[eixo]}10`, border: 'none', padding: '8px 12px', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, color: eixoColor[eixo], letterSpacing: '0.4px', textTransform: 'uppercase', fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    <span>{aberto ? '▾' : '▸'}</span>
                    <span>{eixo} · {linhasEixo.length} competências</span>
                  </button>
                  {aberto && linhasEixo.map(l => (
                    <div key={l.idx} style={{ display: 'grid', gridTemplateColumns: isMobile ? `60px repeat(${matriz.semestres.length}, 1fr)` : `40px 1fr repeat(${matriz.semestres.length}, 70px)`, gap: 4, marginTop: 3, alignItems: 'center' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: DS.textDark, fontFamily: 'IBM Plex Mono, monospace', cursor: 'pointer' }} title={l.titulo} onClick={() => onCompetenciaClick && onCompetenciaClick(l)}>{l.idx}</div>
                      {!isMobile && <div style={{ fontSize: 11, color: DS.textDark, lineHeight: 1.3, paddingRight: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={l.titulo}>{l.titulo}</div>}
                      {l.sems.map((c, ci) => {
                        const col = CONCEITO_COLOR[c];
                        const isHover = hoverCell && hoverCell.row === l._idx && hoverCell.col === ci;
                        return (
                          <div key={ci}
                            onMouseEnter={() => setHoverCell({ row: l._idx, col: ci })}
                            onMouseLeave={() => setHoverCell(null)}
                            onClick={() => setHoverCell(isHover ? null : { row: l._idx, col: ci })}
                            style={{ height: 24, borderRadius: 4, background: col.bg, border: isHover ? `2px solid ${col.fg}` : `1px solid ${col.fg}30`, cursor: 'pointer', transition: 'transform .1s', transform: isHover ? 'scale(1.06)' : 'scale(1)' }}
                            aria-label={`${l.idx} ${matriz.semestres[ci]} ${col.label}`}></div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
        {hoverCell && (
          <div style={{ position: 'absolute', top: 60, right: 18, maxWidth: 320, background: DS.surface, border: `2px solid ${CONCEITO_COLOR[tooltipConceito].fg}`, borderRadius: 8, padding: 14, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 10, pointerEvents: 'none' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6 }}>
              {matriz.linhas[hoverCell.row].idx} · Sem {hoverCell.col + 1} · {matriz.semestres[hoverCell.col]} · {hoverCell.col + 1}ª fase
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: DS.textDark, marginBottom: 4 }}>{matriz.linhas[hoverCell.row].titulo}</div>
            <div style={{ marginBottom: 8 }}><ConceitoChip tipo={tooltipConceito} size="sm" /></div>
            {tooltipEvidencias ? (
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 4 }}>Baseado em</div>
                <ul style={{ margin: 0, paddingLeft: 16, fontSize: 11, color: DS.textDark, lineHeight: 1.5 }}>{tooltipEvidencias.map((e, i) => <li key={i}>{e}</li>)}</ul>
              </div>
            ) : <div style={{ fontSize: 11, color: DS.textMuted, fontStyle: 'italic' }}>Sem evidências detalhadas neste mock</div>}
          </div>
        )}
        <div style={{ marginTop: 14, fontSize: 10, color: DS.textMuted, fontStyle: 'italic', lineHeight: 1.5 }}>
          Agrupamento por área-eixo conforme Art. 6º das DCN 2025 — algumas competências articulam mais de um eixo (ex.: IX explicitamente quatro). Classificação detalhada em validação pelo NDE.
        </div>
      </Card>
    </section>
  );
}

// ── BLOCO 3 — Trajetória por UC ─────────────────────────────────────────────
function BlocoTrajetoriaUC({ ucs, isMobile }) {
  const [filtroFase, setFiltroFase] = React.useState('todas');
  const [expandida, setExpandida] = React.useState(null);
  const fases = ['todas', ...new Set(ucs.map(u => u.fase))];
  const visiveis = filtroFase === 'todas' ? ucs : ucs.filter(u => u.fase === filtroFase);
  return (
    <section>
      <SectionHeading>Trajetória de avaliações por UC</SectionHeading>
      <Card style={{ padding: isMobile ? 12 : 18 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
          {fases.map(f => (
            <button key={f} onClick={() => setFiltroFase(f)} style={{ padding: '5px 11px', borderRadius: 100, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700, fontFamily: 'IBM Plex Sans, sans-serif', background: filtroFase === f ? DS.blueDark : DS.borderLight, color: filtroFase === f ? '#fff' : DS.textDark }}>{f === 'todas' ? 'Todas as fases' : f}</button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {visiveis.map((u, i) => (
            <div key={i}>
              <div onClick={() => setExpandida(expandida === i ? null : i)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: DS.bg, border: `1px solid ${DS.borderLight}`, borderRadius: 8, cursor: 'pointer', gap: 10, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontSize: 11, color: DS.textMuted, marginBottom: 2 }}>{u.fase} · {u.semestre}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: DS.textDark }}>{u.titulo}</div>
                </div>
                <ConceitoChip tipo={u.conceito} size="sm" />
                <span style={{ color: DS.textMuted, fontSize: 14 }}>{expandida === i ? '▾' : '▸'}</span>
              </div>
              {expandida === i && (
                <div style={{ padding: '12px 14px', background: DS.surface, border: `1px solid ${DS.borderLight}`, borderTop: 'none', borderRadius: '0 0 8px 8px', marginTop: -1 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6 }}>Componentes avaliativos</div>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: DS.textDark, lineHeight: 1.6 }}>
                    {u.componentes.map((c, ci) => (<li key={ci}><strong>{c.tipo}:</strong> {c.detalhe} <ConceitoChip tipo={c.conceito} size="sm" /></li>))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

// ── BLOCO 4 — APCs (Dreyfus) ────────────────────────────────────────────────
function BlocoAPCs({ apcs, isMobile }) {
  const porSem = {};
  apcs.forEach(a => { (porSem[a.semestre] ||= []).push(a.dreyfus); });
  const semestres = Object.keys(porSem);
  const medias = semestres.map(s => porSem[s].reduce((acc, v) => acc + v, 0) / porSem[s].length);
  const maxLevel = 5;
  return (
    <section>
      <SectionHeading>APCs · evolução por nível Dreyfus (1–5)</SectionHeading>
      <Card style={{ padding: isMobile ? 12 : 18 }}>
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 100, paddingBottom: 6, borderBottom: `1px solid ${DS.borderLight}` }}>
            {semestres.map((s, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: DS.blueDark }}>{medias[i].toFixed(1)}</span>
                <div style={{ width: '70%', height: `${(medias[i] / maxLevel) * 80}px`, background: medias[i] >= 3 ? DS.green : medias[i] >= 2 ? DS.amber : DS.terra, borderRadius: '4px 4px 0 0' }}></div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
            {semestres.map((s, i) => (<div key={i} title={`Semestre ${i + 1} · ${s}`} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: DS.textMuted, cursor: 'help' }}>Sem {i + 1}</div>))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {apcs.slice(0, 6).map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: DS.bg, borderRadius: 8, gap: 10, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: 11, color: DS.textMuted }}>{a.data} · {a.epa}</div>
                <div style={{ fontSize: 13, color: DS.textDark, fontWeight: 600, marginTop: 2 }}>{a.parecer}</div>
                <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 2 }}>Avaliador: {a.avaliador}</div>
              </div>
              <span style={{ padding: '5px 11px', borderRadius: 6, background: DS.blueDark, color: '#fff', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap', fontFamily: 'IBM Plex Mono, monospace' }}>Dreyfus {a.dreyfus}/5</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, fontSize: 11, color: DS.textMuted, fontStyle: 'italic' }}>{apcs.length} APCs registradas no total — APC usa Dreyfus 1–5; Logbook usa Ten Cate 1–4 (escalas distintas).</div>
      </Card>
    </section>
  );
}

// ── BLOCO Status ENAMED ─────────────────────────────────────────────────────
function BlocoStatusENAMED({ statusEnamed, fase, isMobile }) {
  const historico = statusEnamed.historico;
  const CORTE = statusEnamed.corte ?? 60;
  const notaAtual = historico[historico.length - 1];
  const proficiente = notaAtual >= CORTE;
  const distancia = +(notaAtual - CORTE).toFixed(1);
  const coorte = statusEnamed.coorte;
  const cor = proficiente ? DS.green : DS.terra;
  const corBg = proficiente ? DS.greenLight : DS.terraLight;
  const corBorda = proficiente ? '#A8D5BA' : '#E8A89B';
  const W = 100, H = 30, pad = 4;
  const min = Math.min(...historico, CORTE - 5), max = Math.max(...historico, CORTE + 5);
  const span = Math.max(max - min, 1);
  const pts = historico.map((v, i) => ({ x: pad + (i * (W - 2 * pad)) / (historico.length - 1), y: H - pad - ((v - min) / span) * (H - 2 * pad), v }));
  const corteY = H - pad - ((CORTE - min) / span) * (H - 2 * pad);
  const polyline = pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const tendencia = historico[historico.length - 1] - historico[0];
  return (
    <section>
      <SectionHeading>Status ENAMED</SectionHeading>
      <Card style={{ padding: 0, overflow: 'hidden', borderLeft: `4px solid ${cor}` }}>
        <div style={{ padding: isMobile ? 14 : 18, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr 1fr', gap: isMobile ? 14 : 18, alignItems: 'stretch' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Nota ENAMED projetada</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 44, fontWeight: 800, color: cor, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{notaAtual.toFixed(1).replace('.', ',')}</span>
              <span style={{ fontSize: 13, color: DS.textMuted }}>/ 100</span>
            </div>
            <div style={{ alignSelf: 'flex-start', padding: '6px 14px', borderRadius: 100, background: cor, color: '#fff', fontSize: 12, fontWeight: 800, letterSpacing: '0.4px', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />{proficiente ? 'Proficiente' : 'Não-proficiente'}
            </div>
            <div style={{ fontSize: 11, color: DS.textMuted, lineHeight: 1.5, marginTop: 4 }}>Corte de proficiência: <strong style={{ color: DS.textDark }}>60</strong>. Status binário — não há faixa ou Conceito para aluno individual.</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Distância para o corte</div>
            <div style={{ padding: '12px 14px', borderRadius: DS.radius, background: corBg, border: `1px solid ${corBorda}` }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 28, fontWeight: 800, color: cor, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{distancia > 0 ? '+' : ''}{distancia.toFixed(1).replace('.', ',')}</span>
                <span style={{ fontSize: 11, color: DS.textSec }}>pontos</span>
              </div>
              <div style={{ fontSize: 11, color: DS.textSec, marginTop: 4, lineHeight: 1.45 }}>{proficiente ? `Acima do corte. Mantenha a trajetória para a coorte ${coorte}.` : `Faltam ${Math.abs(distancia).toFixed(1).replace('.', ',')} pontos para o corte. Coorte ENAMED prevista: ${coorte}.`}</div>
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 2 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: tendencia >= 0 ? DS.green : DS.terra }}>{tendencia >= 0 ? '↑' : '↓'} {Math.abs(tendencia).toFixed(1).replace('.', ',')} pp</span>
              <span style={{ fontSize: 10.5, color: DS.textMuted }}>vs. {historico.length} aplicações atrás</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Últimas {historico.length} projetadas</div>
              <div style={{ fontSize: 10, color: DS.textMuted, fontVariantNumeric: 'tabular-nums' }}>{historico.map(v => v.toFixed(0)).join(' · ')}</div>
            </div>
            <div style={{ padding: '10px 12px', background: DS.bg, border: `1px solid ${DS.borderLight}`, borderRadius: DS.radiusSm, position: 'relative' }}>
              <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 56, display: 'block' }}>
                <line x1={pad} x2={W - pad} y1={corteY} y2={corteY} stroke={DS.border} strokeWidth="1" strokeDasharray="2 3" />
                <text x={W - pad} y={corteY - 2} fontSize="6" fill={DS.textMuted} textAnchor="end">corte 60</text>
                <polyline points={polyline} fill="none" stroke={cor} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
                {pts.map((p, i) => (<circle key={i} cx={p.x} cy={p.y} r="2" fill={cor} stroke="#fff" strokeWidth="0.8" />))}
              </svg>
            </div>
            <div style={{ marginTop: 4, padding: '8px 12px', background: DS.surface, border: `1px solid ${DS.borderLight}`, borderRadius: DS.radiusSm, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Coorte ENAMED</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: DS.text, fontVariantNumeric: 'tabular-nums' }}>{coorte}</div>
              </div>
              <div style={{ fontSize: 10.5, color: DS.textMuted, textAlign: 'right', lineHeight: 1.4, maxWidth: 130 }}>Calculada a partir da fase atual<br/>({fase}).</div>
            </div>
          </div>
        </div>
        <div style={{ padding: '8px 16px', background: DS.bg, borderTop: `1px solid ${DS.borderLight}`, fontSize: 10.5, color: DS.textMuted, lineHeight: 1.5, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ padding: '2px 8px', borderRadius: 100, background: DS.amberLight, color: DS.amber, fontWeight: 700, fontSize: 9.5, letterSpacing: '0.3px' }}>v1.0 · calibração TRI em curso</span>
          <span>Projeção via escala transformada TRI a partir do TP. Nota oficial só após prova ENAMED (Portaria MEC 478).</span>
        </div>
      </Card>
    </section>
  );
}

// ── BLOCO 5 — Portfólio ─────────────────────────────────────────────────────
function BlocoPortfolio({ portfolio, isMobile, onAbrirCompleto }) {
  const total = portfolio.reflexoes.length;
  const cats = ['Tutorial', 'IESC', 'Habilidades', 'Morfofuncional', 'Conhecimentos Gerais'];
  const dist = cats.map(c => ({ cat: c, count: portfolio.reflexoes.filter(r => r.categoria === c).length }));
  const ultima = portfolio.reflexoes[0];
  const max = Math.max(...dist.map(d => d.count), 1);
  return (
    <section>
      <SectionHeading action="Ler portfólio completo →" onAction={onAbrirCompleto}>Portfólio Reflexivo · resumo</SectionHeading>
      <Card style={{ padding: isMobile ? 12 : 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '180px 1fr', gap: 18 }}>
          <div>
            <div style={{ fontSize: 36, fontWeight: 700, color: DS.blueDark, lineHeight: 1, fontFamily: 'IBM Plex Sans, sans-serif' }}>{total}</div>
            <div style={{ fontSize: 12, color: DS.textMuted, marginTop: 4 }}>reflexões publicadas</div>
            {ultima && (
              <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${DS.borderLight}` }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 4 }}>Última reflexão</div>
                <div style={{ fontSize: 11, color: DS.textMuted }}>{ultima.data} · {ultima.categoria}</div>
                <div style={{ fontSize: 12, color: DS.textDark, fontWeight: 600, marginTop: 2 }}>{ultima.titulo}</div>
              </div>
            )}
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 8 }}>Distribuição por categoria</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {dist.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 130, fontSize: 12, color: DS.textDark, flexShrink: 0 }}>{d.cat}</div>
                  <div style={{ flex: 1, height: 16, background: DS.bg, borderRadius: 4, overflow: 'hidden' }}><div style={{ width: `${(d.count / max) * 100}%`, height: '100%', background: DS.blueAcc, borderRadius: 4 }}></div></div>
                  <div style={{ width: 24, fontSize: 12, fontWeight: 700, color: DS.textDark, textAlign: 'right' }}>{d.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

// ── BLOCO 6 — Atividade de treino (heatmap 365 dias) ────────────────────────
function BlocoTreino({ treino, isMobile }) {
  const ultimo = treino[treino.length - 1], penultimo = treino[treino.length - 2];
  const queda = penultimo && ultimo && ultimo.cards < penultimo.cards * 0.5;
  const MES_PT = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  const totalCardsByMonth = {};
  treino.forEach(t => { const [m, yy] = t.mes.split('/'); const mm = String(MES_PT.indexOf(m.toLowerCase()) + 1).padStart(2, '0'); totalCardsByMonth[`20${yy}-${mm}`] = t.cards; });
  const baseMensal = Math.max(60, Math.round(treino.reduce((s, t) => s + t.cards, 0) / treino.length * 0.55));
  const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
  const inicio = new Date(hoje); inicio.setDate(inicio.getDate() - 364);
  const hashDay = (d) => { const s = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`; let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); };
  const cardsDia = (d) => {
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const totalMes = totalCardsByMonth[key] ?? baseMensal;
    const dim = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    const media = totalMes / dim, h = hashDay(d), dow = d.getDay(), isWeekend = dow === 0 || dow === 6;
    const restDay = isWeekend ? (h % 100) < 35 : (h % 100) < 12;
    if (restDay) return 0;
    const variacao = ((h % 121) - 60) / 100; let n = media * (1 + variacao); if (isWeekend) n *= 0.55;
    return Math.max(0, Math.round(n));
  };
  const cells = []; const dia = new Date(inicio); while (dia.getDay() !== 0) dia.setDate(dia.getDate() - 1);
  let totalCards = 0, totalDias = 0, maxDay = 0, streakAtual = 0, streakMax = 0, streakTemp = 0;
  while (dia <= hoje) {
    const inRange = dia >= inicio && dia <= hoje;
    const c = inRange ? cardsDia(dia) : null;
    cells.push({ date: new Date(dia), count: c, inRange });
    if (inRange) { totalCards += c; if (c > 0) { totalDias++; streakTemp++; if (streakTemp > streakMax) streakMax = streakTemp; } else streakTemp = 0; if (c > maxDay) maxDay = c; }
    dia.setDate(dia.getDate() + 1);
  }
  for (let i = cells.length - 1; i >= 0; i--) { if (!cells[i].inRange) continue; if (cells[i].count > 0) streakAtual++; else break; }
  const semanas = []; for (let i = 0; i < cells.length; i += 7) semanas.push(cells.slice(i, i + 7));
  const corNivel = (c) => { if (c === null) return 'transparent'; if (c === 0) return DS.borderLight; if (c <= 3) return '#9BE5C2'; if (c <= 8) return '#52CC93'; if (c <= 15) return '#2EA572'; return '#1F7E52'; };
  const MESES_LBL = MES_PT; const mesPos = []; let ultimoMes = null;
  semanas.forEach((sem, idxSem) => { const p = sem.find(c => c.inRange); if (!p) return; const m = p.date.getMonth(); if (m !== ultimoMes) { mesPos.push({ idx: idxSem, label: MESES_LBL[m] }); ultimoMes = m; } });
  const fmt = (d) => `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
  const CELL = isMobile ? 8 : 10, GAP = 2, DOW_W = 18;
  const GRID_W = DOW_W + semanas.length * (CELL + GAP), GRID_H = 7 * (CELL + GAP);
  return (
    <section>
      <SectionHeading>Atividade de treino · últimos 365 dias</SectionHeading>
      <Card style={{ padding: isMobile ? 12 : 18 }}>
        {queda && (
          <div style={{ marginBottom: 14, padding: '10px 14px', background: DS.amberLight, border: `1px solid ${DS.amber}40`, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: DS.amber }}></span>
            <span style={{ fontSize: 12, color: DS.amber, fontWeight: 600 }}>Atividade caiu mais de 50% no último mês — sinal formativo para tutoria.</span>
          </div>
        )}
        <div style={{ overflowX: 'auto', paddingBottom: 4 }}>
          <div style={{ minWidth: GRID_W, position: 'relative' }}>
            <div style={{ height: 14, position: 'relative', marginLeft: DOW_W }}>
              {mesPos.map((m, i) => (<span key={i} style={{ position: 'absolute', left: m.idx * (CELL + GAP), fontSize: 10, color: DS.textMuted, fontWeight: 700, textTransform: 'capitalize' }}>{m.label}</span>))}
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ width: DOW_W, height: GRID_H, position: 'relative' }}>
                {['', 'seg', '', 'qua', '', 'sex', ''].map((d, i) => (<div key={i} style={{ position: 'absolute', top: i * (CELL + GAP), fontSize: 9, color: DS.textMuted, height: CELL, lineHeight: `${CELL}px` }}>{d}</div>))}
              </div>
              <div style={{ display: 'flex', gap: GAP }}>
                {semanas.map((sem, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: GAP }}>
                    {Array.from({ length: 7 }, (_, d) => {
                      const cell = sem[d];
                      if (!cell) return <div key={d} style={{ width: CELL, height: CELL }} />;
                      const cor = corNivel(cell.count);
                      const title = cell.inRange ? (cell.count === 0 ? `${fmt(cell.date)} · descanso` : `${fmt(cell.date)} · ${cell.count} card${cell.count === 1 ? '' : 's'}`) : '';
                      return <div key={d} title={title} style={{ width: CELL, height: CELL, borderRadius: 2, background: cor, border: cell.inRange ? `1px solid rgba(0,0,0,0.04)` : 'none', cursor: cell.inRange ? 'help' : 'default' }} />;
                    })}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
              <span style={{ fontSize: 10, color: DS.textMuted }}>menos</span>
              {[0, 1, 5, 10, 20].map((n, i) => (<div key={i} title={n === 0 ? '0 cards' : n === 20 ? '16+ cards' : `${n} cards`} style={{ width: CELL, height: CELL, borderRadius: 2, background: corNivel(n), border: `1px solid rgba(0,0,0,0.04)` }} />))}
              <span style={{ fontSize: 10, color: DS.textMuted }}>mais</span>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(5,1fr)', gap: 10 }}>
          {[
            { label: 'Cards revisados (365d)', val: totalCards.toLocaleString('pt-BR') },
            { label: 'Dias ativos', val: `${totalDias} / 365` },
            { label: 'Sequência atual', val: `${streakAtual} ${streakAtual === 1 ? 'dia' : 'dias'}` },
            { label: 'Maior sequência', val: `${streakMax} dias` },
            { label: 'Pico em um dia', val: `${maxDay} cards` },
          ].map((s, i) => (
            <div key={i} style={{ background: DS.bg, padding: 10, borderRadius: 6 }}>
              <div style={{ fontSize: 10, color: DS.textMuted, fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: DS.textDark, marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>{s.val}</div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

// ── BLOCO 7 — IESC ──────────────────────────────────────────────────────────
function BlocoIESC({ iesc, isMobile }) {
  return (
    <section>
      <SectionHeading>IESC e Extensão</SectionHeading>
      <Card style={{ padding: isMobile ? 12 : 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 12 }}>
          {[
            { label: 'Famílias acompanhadas', val: iesc.familias },
            { label: 'Visitas registradas', val: iesc.visitas },
            { label: 'Projetos de educação em saúde', val: iesc.projetos },
            { label: 'Horas de extensão', val: iesc.horas + 'h' },
          ].map((s, i) => (
            <div key={i} style={{ background: DS.bg, padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: DS.blueDark, fontFamily: 'IBM Plex Sans, sans-serif' }}>{s.val}</div>
              <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, fontSize: 11, color: DS.textMuted, fontStyle: 'italic' }}>Curricularização da extensão: Resolução CNE/CES nº 7/2018 · mínimo 10% do curso.</div>
      </Card>
    </section>
  );
}

// ── BLOCO 8 — Iniciação Científica ──────────────────────────────────────────
function BlocoIC({ ic, isMobile }) {
  const etapas = ['Despertar', 'Pergunta', 'Método', 'Coleta', 'Análise', 'Redação', 'Submissão'];
  const idxAtual = etapas.indexOf(ic.etapa);
  return (
    <section>
      <SectionHeading>Iniciação Científica</SectionHeading>
      <Card style={{ padding: isMobile ? 12 : 18 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14, alignItems: 'center' }}>
          <span style={{ padding: '4px 10px', borderRadius: 100, background: ic.modalidade === 'NPCMed' ? `${DS.terra}15` : DS.borderLight, color: ic.modalidade === 'NPCMed' ? DS.terra : DS.textDark, fontSize: 11, fontWeight: 700 }}>{ic.modalidade === 'NPCMed' ? 'Trilha de excelência NPCMed' : ic.modalidade === 'TC' ? 'TC obrigatório' : 'Candidato em avaliação · pipeline NPCMed'}</span>
          {ic.orientador && <span style={{ fontSize: 12, color: DS.textMuted }}>Orientador: <strong style={{ color: DS.textDark }}>{ic.orientador}</strong></span>}
        </div>
        {ic.etapa && idxAtual >= 0 && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 8 }}>Trajetória de 8 etapas</div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {etapas.map((e, i) => (<div key={i} style={{ flex: '1 1 80px', padding: '6px 8px', borderRadius: 6, background: i <= idxAtual ? DS.blueDark : DS.borderLight, color: i <= idxAtual ? '#fff' : DS.textMuted, fontSize: 10, fontWeight: 700, textAlign: 'center', border: i === idxAtual ? `2px solid ${DS.blueAcc}` : 'none' }}>{e}</div>))}
            </div>
          </div>
        )}
        <div style={{ fontSize: 12, color: DS.textDark, lineHeight: 1.6 }}>{ic.descricao}</div>
        {ic.producoes && ic.producoes.length > 0 && (
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${DS.borderLight}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6 }}>Produções</div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: DS.textDark, lineHeight: 1.6 }}>{ic.producoes.map((p, i) => <li key={i}>{p}</li>)}</ul>
          </div>
        )}
      </Card>
    </section>
  );
}

// ── BLOCO 9 — Profissionalismo / atitudinal ─────────────────────────────────
function BlocoAtitudinal({ atitudinal, isMobile }) {
  const compsLigadas = ['IV', 'V', 'XI', 'XII', 'XVII', 'XXII', 'XXIII'];
  return (
    <section>
      <SectionHeading>Profissionalismo · dimensão atitudinal (longitudinal)</SectionHeading>
      <Card style={{ padding: isMobile ? 12 : 18 }}>
        <div style={{ marginBottom: 14, padding: '10px 12px', background: `${DS.blueAcc}10`, borderRadius: 6, fontSize: 11, color: DS.textDark, lineHeight: 1.5 }}>
          <strong>Captura formativa, NÃO decisão de progressão.</strong> Síntese global só com triangulação suficiente (≥ 3 fontes convergentes em 2 fases consecutivas).
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14, background: DS.bg, borderRadius: 8, marginBottom: 14, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Status atitudinal global</div>
            <div style={{ fontSize: 13, color: DS.textDark, marginTop: 4, lineHeight: 1.5 }}>{atitudinal.triangulacaoSuficiente ? 'Triangulação suficiente — síntese disponível.' : 'Evidência insuficiente para síntese — captura longitudinal em construção.'}</div>
          </div>
          {atitudinal.triangulacaoSuficiente ? <ConceitoChip tipo={atitudinal.statusGlobal} /> : <span style={{ fontSize: 11, color: DS.textMuted, fontStyle: 'italic' }}>aguardando triangulação</span>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: 10, marginBottom: 14 }}>
          {[
            { label: 'P-MEX', val: atitudinal.pmex.length, sub: 'observações Tutorial · IESC · Hab.' },
            { label: 'MSF (360°)', val: atitudinal.msf.length, sub: 'aplicações por ciclo' },
            { label: 'Auto-avaliações', val: atitudinal.autoavaliacoes, sub: 'do Portfólio Reflexivo' },
            { label: 'Incidentes críticos', val: atitudinal.incidentes.length, sub: 'registros estruturados' },
          ].map((s, i) => (
            <div key={i} style={{ background: DS.surface, border: `1px solid ${DS.borderLight}`, padding: 10, borderRadius: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: DS.textDark, marginTop: 2 }}>{s.val}</div>
              <div style={{ fontSize: 10, color: DS.textMuted, marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>
        {atitudinal.pmex.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 8 }}>P-MEX por fase × cenário</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {atitudinal.pmex.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: DS.bg, borderRadius: 6 }}>
                  <span style={{ fontSize: 11, color: DS.textMuted, minWidth: 60 }}>{p.fase}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: DS.textDark, flex: 1 }}>{p.cenario}</span>
                  <span style={{ fontSize: 11, color: DS.textMuted }}>{p.data}</span>
                  <ConceitoChip tipo={p.conceito} size="sm" />
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{ padding: '10px 12px', background: `${DS.blueAcc}08`, borderRadius: 6, fontSize: 11, color: DS.textDark, lineHeight: 1.5 }}>
          <strong>Vinculação na matriz programática:</strong> este bloco alimenta as competências{' '}
          {compsLigadas.map((c, i) => (<span key={i}><code style={{ padding: '1px 6px', borderRadius: 3, background: DS.blueAcc, color: '#fff', fontSize: 10, fontWeight: 700, fontFamily: 'IBM Plex Mono, monospace' }}>{c}</code>{i < compsLigadas.length - 1 ? ' ' : ''}</span>))}{' '}da matriz acima.
        </div>
        <div style={{ marginTop: 12 }}><StatusFlag kind="flag" criterio="aguarda implantação institucional do P-MEX em Tutorial, IESC e Habilidades Profissionais" /></div>
      </Card>
    </section>
  );
}

// ── BLOCO Conquistas ────────────────────────────────────────────────────────
function BlocoConquistas({ isMobile }) {
  const [notif, setNotif] = React.useState(false);
  const conquistas = [
    { emoji: '🃏', label: '100 cards revisados', sub: 'Capi-Cards' },
    { emoji: '📋', label: '1ª SP concluída', sub: 'Tutorial PBL' },
    { emoji: '🎯', label: '10 questões ENAMED', sub: 'Meu Treino' },
  ];
  return (
    <Card style={{ padding: isMobile ? 16 : 20 }}>
      <SectionHeading>Conquistas</SectionHeading>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
        {conquistas.map((c, i) => (
          <div key={i} style={{ padding: '12px 14px', borderRadius: DS.radius, background: DS.blueLight, border: `1px solid ${DS.blueAcc}30`, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: DS.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{c.emoji}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: DS.text, lineHeight: 1.3 }}>{c.label}</div>
              <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 2 }}>{c.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: DS.radiusSm, background: DS.bg, border: `1px solid ${DS.borderLight}` }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: DS.text }}>Notificação diária de estudo</div>
          <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 2 }}>Lembrete às 19h para manter sua sequência. Desligado por padrão.</div>
        </div>
        <button onClick={() => setNotif(!notif)} aria-pressed={notif} style={{ width: 42, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer', background: notif ? DS.green : DS.border, position: 'relative', transition: 'background 0.15s', flexShrink: 0 }}>
          <span style={{ position: 'absolute', top: 2, left: notif ? 20 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.15s' }} />
        </button>
      </div>
    </Card>
  );
}

// ── Orchestrator ────────────────────────────────────────────────────────────
export default function PerfilAlunoScreen({ isMobile, data, origem, onVoltar, onNavigate }) {
  const aluno = data.aluno;
  const origemLabel = origem === 'docente' ? 'Painel do Tutor' : origem === 'coordenacao' ? 'Coordenação' : 'Voltar';
  const accordion = isMobile;
  const [open, setOpen] = React.useState({});
  const toggle = (k) => setOpen(o => ({ ...o, [k]: !o[k] }));
  const Acc = ({ id, titulo, sub, children }) => {
    if (!accordion) return children;
    const isOpen = open[id];
    return (
      <div style={{ background: DS.surface, borderRadius: 10, border: `1px solid ${DS.border}`, overflow: 'hidden' }}>
        <button onClick={() => toggle(id)} style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', padding: '14px 16px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'inherit' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: DS.text }}>{titulo}</div>
            {sub && <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 2 }}>{sub}</div>}
          </div>
          <span style={{ fontSize: 12, color: DS.textMuted, transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}>›</span>
        </button>
        {isOpen && <div style={{ padding: '0 16px 16px' }}>{children}</div>}
      </div>
    );
  };

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <TopBar
        title={`Perfil · ${aluno.nome}`}
        subtitle={`${aluno.turma} · ${aluno.fase} · drilldown longitudinal · ${data.competencias27.length} competências DCN 2025`}
        isMobile={isMobile}
        breadcrumb={[{ label: origemLabel, onClick: onVoltar }, { label: aluno.nome }]}
      />
      <div style={{ padding: isMobile ? 12 : '24px 32px', display: 'flex', flexDirection: 'column', gap: isMobile ? 10 : 24, maxWidth: 1400, margin: '0 auto' }}>
        <BlocoCabecalho aluno={aluno} isMobile={isMobile} onVoltar={onVoltar} origemLabel={origemLabel} />
        <Acc id="b2" titulo="Matriz programática" sub={`27 competências × ${data.matrizProgramatica.semestres.length} semestres`}>
          <BlocoMatrizProgramatica matriz={data.matrizProgramatica} evidencias={data.evidencias} isMobile={isMobile} />
        </Acc>
        <Acc id="b3" titulo="Trajetória por UC" sub={`${data.ucs.length} UCs · 1ª–5ª fase`}>
          <BlocoTrajetoriaUC ucs={data.ucs} isMobile={isMobile} />
        </Acc>
        <Acc id="b4" titulo="APCs" sub={`${data.apcs.length} EPAs longitudinais`}>
          <BlocoAPCs apcs={data.apcs} isMobile={isMobile} />
        </Acc>
        <Acc id="bEnamed" titulo="Status ENAMED" sub="Nota projetada · coorte prevista">
          <BlocoStatusENAMED statusEnamed={data.statusEnamed} fase={aluno.fase} isMobile={isMobile} />
        </Acc>
        <Acc id="b5" titulo="Portfólio reflexivo" sub={`${data.portfolio.reflexoes.length} entradas`}>
          <BlocoPortfolio portfolio={data.portfolio} isMobile={isMobile} onAbrirCompleto={() => onNavigate && onNavigate('reflexivo')} />
        </Acc>
        <Acc id="b6" titulo="Treino" sub="Banco ENAMED">
          <BlocoTreino treino={data.treino} isMobile={isMobile} />
        </Acc>
        <Acc id="b7" titulo="IESC" sub="Território Bela Vista">
          <BlocoIESC iesc={data.iesc} isMobile={isMobile} />
        </Acc>
        <Acc id="b8" titulo="IC" sub={data.ic.modalidade}>
          <BlocoIC ic={data.ic} isMobile={isMobile} />
        </Acc>
        <Acc id="b9" titulo="Atitudinal" sub="Frequência · feedbacks · alertas">
          <BlocoAtitudinal atitudinal={data.atitudinal} isMobile={isMobile} />
        </Acc>
        <BlocoConquistas isMobile={isMobile} />
        <div style={{ padding: 16, background: `${DS.blueAcc}08`, borderRadius: 8, fontSize: 11, color: DS.textMuted, lineHeight: 1.6, textAlign: 'center' }}>
          Perfil do Aluno · materializa o destino final dos eventos de avaliação capturados pelo sistema desde o go-live, indexado por ID interno (LGPD). Modelo agnóstico ao tipo de escala (conceitos + escalas distintas APC/Logbook). Curadoria docente obrigatória sobre toda síntese gerada por IA.
        </div>
      </div>
    </div>
  );
}
