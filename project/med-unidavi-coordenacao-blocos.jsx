// =============================================================================
// MED-UNIDAVI · Coordenação · Blocos do ITEM 15
// - Filtros globais (Turma T07-T18 / Fase / Status / Competência)
// - Busca de aluno (autocomplete)
// - Drilldown do heatmap (modal de alunos da fase)
// - Matriz institucional 27 competências × 12 fases
// =============================================================================

const TURMAS = ['T07','T08','T09','T10','T11','T12','T13','T14','T15','T16','T17','T18'];
const FASE_TO_TURMA = {
  '1ª':'T18','2ª':'T17','3ª':'T16','4ª':'T15','5ª':'T14','6ª':'T13',
  '7ª':'T12','8ª':'T11','9ª':'T10','10ª':'T09','11ª':'T08','12ª':'T07',
};

const FASES_12 = ['1ª','2ª','3ª','4ª','5ª','6ª','7ª','8ª','9ª','10ª','11ª','12ª'];

// Mock: matriz institucional 27 × 12 com distribuição por estado.
// Cada célula = % de alunos da fase em cada conceito.
const MATRIZ_INSTITUCIONAL = (() => {
  // Heurística realista:
  // - eixo Atenção à Saúde: pendente nas fases iniciais, suficiente nas finais
  // - eixo Gestão: pendente até 6ª, vai migrando para precisa/suficiente
  // - eixo Educação: pendente até 4ª, depois ativa
  // alguma competência específica problemática (XXI integração) na 6ª fase
  const eixoStart = { 'Atenção à Saúde': 0, 'Gestão em Saúde': 5, 'Educação em Saúde': 3 };
  const matriz = COMPETENCIAS_27.map(c => {
    const start = eixoStart[c.eixo] || 0;
    const fases = FASES_12.map((f, i) => {
      if (i < start) return { suf: 0, pre: 0, ins: 0, pen: 100 };
      // progressão suave
      const progresso = (i - start) / Math.max(11 - start, 1); // 0 a 1
      let suf = Math.round(15 + progresso * 65);
      let pre = Math.round(20 + (1 - progresso) * 18);
      let ins = Math.max(2, Math.round(10 - progresso * 8));
      // caso especial XXI na 6ª fase — sinal de alerta para coordenação
      if (c.idx === 'XXI' && f === '6ª') { suf = 38; pre = 42; ins = 14; }
      // caso especial XVII (autocuidado) — ins um pouco mais alto em fases médias
      if (c.idx === 'XVII' && (f === '5ª' || f === '6ª' || f === '7ª')) { ins = 18; pre = 30; suf = 35; }
      let pen = Math.max(0, 100 - suf - pre - ins);
      return { suf, pre, ins, pen };
    });
    return { ...c, fases };
  });
  return matriz;
})();

// Dominante de cada célula para o heatmap institucional
function dominanteMatriz(cell) {
  const max = Math.max(cell.suf, cell.pre, cell.ins, cell.pen);
  if (max === cell.pen && cell.pen >= 50) return 'pendente';
  if (cell.ins >= 15) return 'insuficiente';      // alerta vermelho se ≥15%
  if (cell.pre >= 30) return 'precisa';            // amarelo se ≥30%
  if (cell.suf >= 50) return 'suficiente';
  return 'precisa';
}

// Mock: lista de alunos para busca/drilldown
const ALUNOS_MOCK = [
  { id: 'joao-melo', nome: 'João Melo', turma: 'T14', fase: '5ª', status: 'atencao', tp: 41, dreyfus: 2.5 },
  { id: 'ana-lima', nome: 'Ana Lima', turma: 'T16', fase: '3ª', status: 'ok', tp: 58, dreyfus: 3.0 },
  { id: 'carlos-sousa', nome: 'Carlos Sousa', turma: 'T16', fase: '3ª', status: 'risco', tp: 31, dreyfus: 1.6 },
  { id: 'fernanda-reis', nome: 'Fernanda Reis', turma: 'T14', fase: '5ª', status: 'ok', tp: 52, dreyfus: 3.4 },
  { id: 'livia-torres', nome: 'Livia Torres', turma: 'T16', fase: '3ª', status: 'ok', tp: 63, dreyfus: 3.2 },
  { id: 'pedro-vilas', nome: 'Pedro Vilas', turma: 'T13', fase: '6ª', status: 'risco', tp: 28, dreyfus: 1.8 },
  { id: 'mariana-c', nome: 'Mariana Costa', turma: 'T14', fase: '5ª', status: 'atencao', tp: 44, dreyfus: 2.3 },
  { id: 'diego-hauck', nome: 'Diego Hauck', turma: 'T13', fase: '6ª', status: 'atencao', tp: 47, dreyfus: 2.6 },
  { id: 'beatriz-l', nome: 'Beatriz Luz', turma: 'T14', fase: '5ª', status: 'ok', tp: 55, dreyfus: 3.1 },
];

// ── Bloco: Filtros globais + Busca ───────────────────────────────────────────
function CoordFiltrosBusca({ isMobile, filtros, setFiltros, busca, setBusca, onAbrirAluno }) {
  const sugestoes = busca.length >= 2
    ? ALUNOS_MOCK.filter(a => a.nome.toLowerCase().includes(busca.toLowerCase()) || a.id.includes(busca.toLowerCase())).slice(0, 6)
    : [];
  const toggleArr = (k, v) => {
    const cur = filtros[k] || [];
    setFiltros({ ...filtros, [k]: cur.includes(v) ? cur.filter(x => x !== v) : [...cur, v] });
  };

  return (
    <section>
      <div style={{
        background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`,
        padding: isMobile ? 14 : 18, boxShadow: DS.shadow,
      }}>
        {/* Busca */}
        <div style={{ position: 'relative', marginBottom: 14 }}>
          <input
            type="text"
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Localizar aluno específico (nome ou matrícula)..."
            style={{
              width: '100%', padding: '12px 16px', borderRadius: DS.radius,
              border: `1px solid ${DS.border}`, fontSize: 13, color: DS.text,
              fontFamily: 'IBM Plex Sans, sans-serif', boxSizing: 'border-box',
              background: DS.bg,
            }}
          />
          {sugestoes.length > 0 && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10,
              background: DS.surface, border: `1px solid ${DS.border}`, borderRadius: DS.radius,
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)', marginTop: 4,
              maxHeight: 280, overflowY: 'auto',
            }}>
              {sugestoes.map(a => (
                <div key={a.id} onClick={() => { onAbrirAluno(a); setBusca(''); }}
                  style={{
                    padding: '10px 14px', cursor: 'pointer', borderBottom: `1px solid ${DS.borderLight}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                  }}
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

        {/* Filtros */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr 1fr', gap: 14 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6 }}>Turma</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {TURMAS.map(t => (
                <button key={t} onClick={() => toggleArr('turmas', t)}
                  style={{
                    padding: '4px 8px', borderRadius: 100, border: 'none', cursor: 'pointer',
                    fontSize: 10, fontWeight: 700, fontFamily: 'IBM Plex Mono, monospace',
                    background: filtros.turmas?.includes(t) ? DS.blueDark : DS.bg,
                    color: filtros.turmas?.includes(t) ? '#fff' : DS.textMuted,
                  }}>{t}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6 }}>Fase</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {FASES_12.map(f => (
                <button key={f} onClick={() => toggleArr('fases', f)}
                  style={{
                    padding: '4px 8px', borderRadius: 100, border: 'none', cursor: 'pointer',
                    fontSize: 10, fontWeight: 700,
                    background: filtros.fases?.includes(f) ? DS.blueDark : DS.bg,
                    color: filtros.fases?.includes(f) ? '#fff' : DS.textMuted,
                  }}>{f}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6 }}>Status</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {[
                { k: 'ok', l: 'Regular', c: DS.green },
                { k: 'atencao', l: 'Atenção', c: DS.amber },
                { k: 'risco', l: 'Em risco', c: DS.terra },
              ].map(s => (
                <button key={s.k} onClick={() => toggleArr('status', s.k)}
                  style={{
                    padding: '4px 10px', borderRadius: 100, border: 'none', cursor: 'pointer',
                    fontSize: 10, fontWeight: 700,
                    background: filtros.status?.includes(s.k) ? s.c : DS.bg,
                    color: filtros.status?.includes(s.k) ? '#fff' : DS.textMuted,
                  }}>{s.l}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6 }}>Competência</div>
            <select
              value={filtros.competencia || ''}
              onChange={e => setFiltros({ ...filtros, competencia: e.target.value || null })}
              style={{
                width: '100%', padding: '6px 10px', borderRadius: 6, border: `1px solid ${DS.border}`,
                background: DS.bg, fontSize: 11, color: DS.text, fontFamily: 'IBM Plex Sans, sans-serif',
              }}>
              <option value="">— todas as 27 —</option>
              {COMPETENCIAS_27.map(c => (
                <option key={c.idx} value={c.idx}>{c.idx}. {c.titulo.slice(0, 60)}…</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Bloco: Modal de drilldown de fase (lista de alunos com problema) ────────
function DrilldownFaseModal({ fase, indicador, onClose, onAbrirAluno }) {
  if (!fase) return null;
  const alunosFase = ALUNOS_MOCK.filter(a => a.fase === fase).sort((a, b) => a.tp - b.tp);
  return (
    <div onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: DS.surface, borderRadius: DS.radiusLg, padding: 24,
        maxWidth: 600, width: '100%', maxHeight: '80vh', overflow: 'auto',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Drilldown · {fase} fase</div>
            <h2 style={{ margin: '4px 0 0', fontSize: 18, color: DS.text }}>{indicador}</h2>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: 24, cursor: 'pointer', color: DS.textMuted }}>×</button>
        </div>
        <div style={{ fontSize: 11, color: DS.textMuted, marginBottom: 12 }}>
          Alunos da {fase} fase ordenados por pior indicador. Clique no aluno para abrir o Perfil.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {alunosFase.length === 0 ? (
            <div style={{ padding: 14, color: DS.textMuted, fontStyle: 'italic', fontSize: 12 }}>Sem alunos nesta fase no mock.</div>
          ) : alunosFase.map(a => (
            <div key={a.id} onClick={() => onAbrirAluno(a)}
              style={{
                padding: '12px 14px', background: DS.bg, borderRadius: DS.radius, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                border: `1px solid ${DS.borderLight}`,
              }}
              onMouseEnter={e => e.currentTarget.style.background = DS.borderLight}
              onMouseLeave={e => e.currentTarget.style.background = DS.bg}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: DS.text, fontSize: 13 }}>{a.nome}</div>
                <div style={{ fontSize: 11, color: DS.textMuted }}>{a.turma} · TP {a.tp}% · Dreyfus médio {a.dreyfus}</div>
              </div>
              <StatusGlobalBadge status={a.status === 'ok' ? 'Regular' : a.status === 'atencao' ? 'Atenção' : 'Em risco'} />
              <span style={{ fontSize: 12, color: DS.blue, fontWeight: 700 }}>Abrir →</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Bloco: Matriz institucional 27 × 12 ──────────────────────────────────────
function MatrizInstitucional27x12({ isMobile, filtroComp, onCelulaClick }) {
  const linhas = filtroComp ? MATRIZ_INSTITUCIONAL.filter(c => c.idx === filtroComp) : MATRIZ_INSTITUCIONAL;
  const [hover, setHover] = React.useState(null); // {row, col}
  const eixos = ['Atenção à Saúde', 'Gestão em Saúde', 'Educação em Saúde'];

  return (
    <section>
      <SectionHeading>Avaliação Programática · visão institucional · 27 competências DCN 2025 × 12 fases</SectionHeading>
      <Card style={{ padding: isMobile ? 12 : 18, position: 'relative' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 14, fontSize: 11 }}>
          <span style={{ color: DS.textMuted }}>Cor da célula = conceito dominante na fase:</span>
          {Object.keys(CONCEITO_COLOR).map(k => (
            <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 14, height: 14, borderRadius: 3, background: CONCEITO_COLOR[k].bg, border: `1px solid ${CONCEITO_COLOR[k].fg}40` }}></span>
              <span style={{ color: DS.textMuted }}>{CONCEITO_COLOR[k].label}</span>
            </span>
          ))}
        </div>

        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: 720 }}>
            {/* Header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '50px 1fr repeat(12, 38px)',
              gap: 3, marginBottom: 4, alignItems: 'center',
            }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase' }}>Comp.</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase' }}>Título · eixo</div>
              {FASES_12.map((f, i) => (
                <div key={i} style={{ fontSize: 9, fontWeight: 700, color: DS.textMuted, textAlign: 'center' }}>
                  {f}<br /><span style={{ fontSize: 7, fontFamily: 'IBM Plex Mono, monospace', color: DS.textMuted, fontWeight: 500 }}>{FASE_TO_TURMA[f]}</span>
                </div>
              ))}
            </div>

            {eixos.map(eixo => {
              const linhasEixo = linhas.filter(c => c.eixo === eixo);
              if (linhasEixo.length === 0) return null;
              return (
                <div key={eixo} style={{ marginBottom: 6 }}>
                  <div style={{
                    padding: '4px 8px', fontSize: 9, fontWeight: 700, color: DS.blueAcc,
                    textTransform: 'uppercase', letterSpacing: '0.4px', background: `${DS.blueAcc}10`,
                    borderRadius: 4, marginBottom: 3,
                  }}>{eixo} · {linhasEixo.length} competências</div>
                  {linhasEixo.map(l => (
                    <div key={l.idx} style={{
                      display: 'grid', gridTemplateColumns: '50px 1fr repeat(12, 38px)',
                      gap: 3, alignItems: 'center', marginBottom: 2,
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: DS.text, fontFamily: 'IBM Plex Mono, monospace' }}>{l.idx}</div>
                      <div style={{ fontSize: 11, color: DS.text, lineHeight: 1.3, paddingRight: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={l.titulo}>{l.titulo}</div>
                      {l.fases.map((cell, ci) => {
                        const dom = dominanteMatriz(cell);
                        const col = CONCEITO_COLOR[dom];
                        const isHover = hover && hover.idx === l.idx && hover.col === ci;
                        return (
                          <div key={ci}
                            onMouseEnter={() => setHover({ idx: l.idx, col: ci, cell, comp: l })}
                            onMouseLeave={() => setHover(null)}
                            onClick={() => onCelulaClick && onCelulaClick({ comp: l, fase: FASES_12[ci], cell })}
                            style={{
                              height: 22, borderRadius: 3, background: col.bg,
                              border: isHover ? `2px solid ${col.fg}` : `1px solid ${col.fg}30`,
                              cursor: 'pointer', transition: 'transform .1s',
                              transform: isHover ? 'scale(1.1)' : 'scale(1)',
                            }} aria-label={`${l.idx} fase ${FASES_12[ci]} ${col.label}`}>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {hover && (
          <div style={{
            position: 'absolute', top: 60, right: 18, maxWidth: 320, zIndex: 10,
            background: DS.surface, border: `2px solid ${DS.blueAcc}`, borderRadius: 8,
            padding: 14, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', pointerEvents: 'none',
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 4 }}>
              {hover.comp.idx} · {FASES_12[hover.col]} fase · {FASE_TO_TURMA[FASES_12[hover.col]]}
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: DS.text, marginBottom: 8, lineHeight: 1.3 }}>{hover.comp.titulo}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[
                { k: 'suf', l: 'Suficiente', c: DS.green, v: hover.cell.suf },
                { k: 'pre', l: 'Precisa melhorar', c: DS.amber, v: hover.cell.pre },
                { k: 'ins', l: 'Insuficiente', c: DS.terra, v: hover.cell.ins },
                { k: 'pen', l: 'Pendente', c: DS.textMuted, v: hover.cell.pen },
              ].map(s => (
                <div key={s.k} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: s.c }}></span>
                  <span style={{ flex: 1, color: DS.text }}>{s.l}</span>
                  <span style={{ fontWeight: 700, color: s.c, fontFamily: 'IBM Plex Mono, monospace' }}>{s.v}%</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 8, fontSize: 10, color: DS.textMuted, fontStyle: 'italic', lineHeight: 1.4 }}>
              Click para ver alunos desta fase com este conceito.
            </div>
          </div>
        )}

        <div style={{ marginTop: 14, fontSize: 11, color: DS.textMuted, lineHeight: 1.5 }}>
          <strong>Como ler:</strong> matriz institucional permite identificar lacunas curriculares — ex.: 28% dos alunos da
          6ª fase em <code style={{ padding: '1px 4px', background: DS.bg, borderRadius: 3, fontFamily: 'IBM Plex Mono, monospace' }}>XXI</code>
          {' '}precisam melhorar (sinal para revisão da 6ª fase). Cor da célula reflete o conceito dominante; hover detalha a distribuição completa.
        </div>
      </Card>
    </section>
  );
}

Object.assign(window, {
  TURMAS, FASE_TO_TURMA, FASES_12, MATRIZ_INSTITUCIONAL, ALUNOS_MOCK,
  CoordFiltrosBusca, DrilldownFaseModal, MatrizInstitucional27x12,
});
