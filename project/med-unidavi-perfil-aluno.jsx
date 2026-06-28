// =============================================================================
// MED-UNIDAVI · Perfil do Aluno (drilldown longitudinal)
// 9 blocos verticais. Mock: João Melo, T14, 5ª fase, status Atenção.
// Acessível via: Painel do Tutor (clique em tutorado) ou Coordenação (drilldown).
// Esta é a peça central da reunião com Caio — materializa visualmente o
// "destino final" de todo evento de avaliação capturado pelo sistema.
// =============================================================================

// ── Helpers visuais ─────────────────────────────────────────────────────────
const CONCEITO_COLOR = {
  suficiente: { bg: DS.greenLight, fg: DS.green, label: 'Suficiente' },
  precisa:    { bg: DS.amberLight, fg: DS.amber, label: 'Precisa melhorar' },
  insuficiente: { bg: '#F5DDD3', fg: DS.terra, label: 'Insuficiente' },
  pendente:   { bg: DS.borderLight, fg: DS.textMuted, label: 'Pendente' },
};

function ConceitoChip({ tipo, size = 'md' }) {
  const c = CONCEITO_COLOR[tipo] || CONCEITO_COLOR.pendente;
  const py = size === 'sm' ? 2 : 4;
  const px = size === 'sm' ? 8 : 10;
  const fs = size === 'sm' ? 10 : 11;
  return (
    <span style={{
      display: 'inline-block', padding: `${py}px ${px}px`,
      borderRadius: 100, background: c.bg, color: c.fg,
      fontSize: fs, fontWeight: 700, fontFamily: 'IBM Plex Sans, sans-serif',
      whiteSpace: 'nowrap',
    }}>{c.label}</span>
  );
}

function StatusGlobalBadge({ status }) {
  const map = {
    'Regular':   { bg: DS.greenLight, fg: DS.green, dot: DS.green },
    'Atenção':   { bg: DS.amberLight, fg: DS.amber, dot: DS.amber },
    'Em risco':  { bg: '#F5DDD3', fg: DS.terra, dot: DS.terra },
  };
  const c = map[status] || map['Regular'];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '5px 11px', borderRadius: 100, background: c.bg, color: c.fg,
      fontSize: 12, fontWeight: 700, fontFamily: 'IBM Plex Sans, sans-serif',
    }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: c.dot }}></span>
      {status}
    </span>
  );
}

// ── 27 competências DCN 2025 (Art. 8º) ────────────────────────────────────────
const COMPETENCIAS_27 = [
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

// ── Mock: João Melo · T14 · 5ª fase ───────────────────────────────────────────
// Matriz 27 × 5 semestres (2023/2 a 2025/1). Estados: suf | precisa | insuf | pend.
const JOAO_MATRIZ = (() => {
  // semestres cursados pelo aluno (5)
  const sems = ['2023/2', '2024/1', '2024/2', '2025/1', '2025/2'];
  // Distribuição plausível para 5ª fase com status Atenção
  // Forças: III, X, XXI (raciocínio diagnóstico)
  // Atenção: VIII, XII (comunicação), XXII (equipe)
  // Pendentes: maioria do eixo Gestão (ainda não passou pelas UCs)
  const fortes = ['III', 'X', 'XXI', 'I', 'II', 'XX', 'XXVII', 'XXVI'];
  const atencao = ['VIII', 'XII', 'XXII'];
  const insuf = ['XVII']; // autocuidado — sinaliza Atenção
  const pendentes = ['VII', 'IX', 'XVI', 'XVIII', 'XXIV', 'XXV', 'XIII', 'XIX'];
  const linhas = COMPETENCIAS_27.map(c => {
    const row = sems.map((sem, i) => {
      if (pendentes.includes(c.idx)) {
        // alguns saem do pendente nos últimos semestres
        if (i >= 3 && (c.idx === 'XIII' || c.idx === 'XIX')) return 'precisa';
        return 'pendente';
      }
      if (insuf.includes(c.idx)) {
        if (i < 2) return 'pendente';
        if (i === 2) return 'precisa';
        return 'insuficiente'; // últimos 2
      }
      if (atencao.includes(c.idx)) {
        if (i === 0) return 'pendente';
        if (i === 1) return 'precisa';
        if (i === 2) return 'precisa';
        if (i === 3) return 'precisa';
        return 'precisa';
      }
      if (fortes.includes(c.idx)) {
        if (i === 0) return 'pendente';
        if (i === 1) return 'precisa';
        return 'suficiente';
      }
      // outros: trajetória mista
      const padrao = ['pendente', 'pendente', 'precisa', 'suficiente', 'suficiente'];
      return padrao[i];
    });
    return { ...c, sems: row };
  });
  return { semestres: sems, linhas };
})();

// Evidências mock por (competência, semestre)
const EVIDENCIAS = {
  'III|2025/1': [
    '3 APCs nível 4 Dreyfus (preceptor: João Silva)',
    '12 reflexões publicadas no Portfólio',
    'TP 58% (acima da média da fase)',
    'OSCE 62/100 (estação 4 — comunicação difícil)',
  ],
  'VIII|2025/2': [
    '2 P-MEX em Tutorial: comunicação assertiva mediana',
    'OSCE estação 4 (comunicação difícil): 48/100',
    'Reflexão de 14/09 reconhece dificuldade em entrevistas',
  ],
  'XII|2025/2': [
    'MSF aplicado fim de 4º sem.: feedback colaborativo "precisa melhorar"',
    'Tutorial: 2 registros de baixa participação coletiva',
    'IESC: visita domiciliar com pares — relato discreto',
  ],
  'XVII|2025/2': [
    'Auto-relato no Portfólio de 2 sintomas de exaustão',
    'Atividade Capi-Cards caiu 65% no último mês',
    'Sinal ainda formativo — tutoria já notificada',
  ],
  'XXII|2025/2': [
    'IESC Grupo 2: 2 registros de delegação inadequada na visita',
    'Tutorial: dificuldade em sintetizar consenso do grupo',
  ],
};

// ── BLOCO 1 — Cabeçalho do aluno ──────────────────────────────────────────────
function BlocoCabecalho({ aluno, isMobile, onVoltar, origemLabel }) {
  return (
    <Card style={{ padding: isMobile ? 16 : 24 }}>
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 20, alignItems: isMobile ? 'flex-start' : 'center' }}>
        <Avatar nome={aluno.nome} size={isMobile ? 56 : 72} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
            <h1 style={{ margin: 0, fontSize: isMobile ? 22 : 26, fontWeight: 700, color: DS.textDark, fontFamily: 'IBM Plex Sans, sans-serif' }}>
              {aluno.nome}
            </h1>
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

      {/* Vinculações de subturma */}
      <div style={{
        marginTop: 18, paddingTop: 16, borderTop: `1px solid ${DS.borderLight}`,
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: 12,
      }}>
        {[
          { rotulo: 'Tutorial', val: aluno.subturmas.tutorial },
          { rotulo: 'Hab. Profissionais Clínicas', val: aluno.subturmas.habClinicas },
          { rotulo: 'Hab. Saúde Digital', val: aluno.subturmas.habDigital },
          { rotulo: 'IESC', val: aluno.subturmas.iesc },
        ].map((s, i) => (
          <div key={i} style={{
            background: DS.bg, border: `1px solid ${DS.borderLight}`, borderRadius: 8,
            padding: '10px 12px',
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: 4 }}>
              {s.rotulo}
            </div>
            <div style={{ fontSize: 12, color: DS.textDark, lineHeight: 1.4 }}>{s.val}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── BLOCO 2 — Avaliação Programática (matriz 27 × N) ─────────────────────────
function BlocoMatrizProgramatica({ matriz, isMobile, onCompetenciaClick }) {
  const [hoverCell, setHoverCell] = React.useState(null); // {row, col}
  const [eixoAberto, setEixoAberto] = React.useState({
    'Atenção à Saúde': true,
    'Gestão em Saúde': !isMobile,
    'Educação em Saúde': !isMobile,
  });

  const eixos = ['Atenção à Saúde', 'Gestão em Saúde', 'Educação em Saúde'];
  const eixoColor = {
    'Atenção à Saúde': DS.blueAcc,
    'Gestão em Saúde': DS.terra,
    'Educação em Saúde': DS.green,
  };

  // Tooltip de evidências
  const tooltipKey = hoverCell ? `${matriz.linhas[hoverCell.row].idx}|${matriz.semestres[hoverCell.col]}` : null;
  const tooltipEvidencias = tooltipKey && EVIDENCIAS[tooltipKey];
  const tooltipConceito = hoverCell ? matriz.linhas[hoverCell.row].sems[hoverCell.col] : null;

  return (
    <section>
      <SectionHeading>Avaliação Programática · 27 competências DCN 2025 × semestres</SectionHeading>
      <Card style={{ padding: isMobile ? 12 : 18, position: 'relative' }}>
        {/* Legenda */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16, fontSize: 11 }}>
          {Object.keys(CONCEITO_COLOR).map(k => (
            <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 14, height: 14, borderRadius: 3, background: CONCEITO_COLOR[k].bg, border: `1px solid ${CONCEITO_COLOR[k].fg}40` }}></span>
              <span style={{ color: DS.textMuted }}>{CONCEITO_COLOR[k].label}</span>
            </span>
          ))}
          <span style={{ color: DS.textMuted, marginLeft: 'auto', fontSize: 10, fontStyle: 'italic' }}>
            Hover/toque em uma célula para ver evidências
          </span>
        </div>

        {/* Header de semestres */}
        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: isMobile ? 520 : 'auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? `60px repeat(${matriz.semestres.length}, 1fr)` : `40px 1fr repeat(${matriz.semestres.length}, 70px)`,
              gap: 4, marginBottom: 4, alignItems: 'center',
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Comp.</div>
              {!isMobile && <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Título</div>}
              {matriz.semestres.map((s, i) => {
                const fase = `${i + 1}ª fase`;
                return (
                  <div key={i}
                    title={`Semestre ${i + 1} · ${s} · ${fase}`}
                    style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textAlign: 'center', cursor: 'help' }}>
                    Sem {i + 1}
                  </div>
                );
              })}
            </div>

            {eixos.map(eixo => {
              const linhasEixo = matriz.linhas.map((l, i) => ({ ...l, _idx: i })).filter(l => l.eixo === eixo);
              const aberto = eixoAberto[eixo];
              return (
                <div key={eixo} style={{ marginBottom: 8 }}>
                  <button
                    onClick={() => setEixoAberto({ ...eixoAberto, [eixo]: !aberto })}
                    style={{
                      width: '100%', textAlign: 'left', background: `${eixoColor[eixo]}10`,
                      border: 'none', padding: '8px 12px', borderRadius: 6, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 8,
                      fontSize: 11, fontWeight: 700, color: eixoColor[eixo],
                      letterSpacing: '0.4px', textTransform: 'uppercase',
                      fontFamily: 'IBM Plex Sans, sans-serif',
                    }}>
                    <span>{aberto ? '▾' : '▸'}</span>
                    <span>{eixo} · {linhasEixo.length} competências</span>
                  </button>
                  {aberto && linhasEixo.map(l => (
                    <div key={l.idx} style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? `60px repeat(${matriz.semestres.length}, 1fr)` : `40px 1fr repeat(${matriz.semestres.length}, 70px)`,
                      gap: 4, marginTop: 3, alignItems: 'center',
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: DS.textDark, fontFamily: 'IBM Plex Mono, monospace', cursor: 'pointer' }}
                        title={l.titulo} onClick={() => onCompetenciaClick && onCompetenciaClick(l)}>
                        {l.idx}
                      </div>
                      {!isMobile && (
                        <div style={{ fontSize: 11, color: DS.textDark, lineHeight: 1.3, paddingRight: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={l.titulo}>
                          {l.titulo}
                        </div>
                      )}
                      {l.sems.map((c, ci) => {
                        const col = CONCEITO_COLOR[c];
                        const isHover = hoverCell && hoverCell.row === l._idx && hoverCell.col === ci;
                        return (
                          <div key={ci}
                            onMouseEnter={() => setHoverCell({ row: l._idx, col: ci })}
                            onMouseLeave={() => setHoverCell(null)}
                            onClick={() => setHoverCell(isHover ? null : { row: l._idx, col: ci })}
                            style={{
                              height: 24, borderRadius: 4, background: col.bg,
                              border: isHover ? `2px solid ${col.fg}` : `1px solid ${col.fg}30`,
                              cursor: 'pointer', transition: 'transform .1s',
                              transform: isHover ? 'scale(1.06)' : 'scale(1)',
                            }} aria-label={`${l.idx} ${matriz.semestres[ci]} ${col.label}`}>
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

        {/* Tooltip de evidências */}
        {hoverCell && (
          <div style={{
            position: 'absolute', top: 60, right: 18, maxWidth: 320,
            background: DS.surface, border: `2px solid ${CONCEITO_COLOR[tooltipConceito].fg}`,
            borderRadius: 8, padding: 14, boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            zIndex: 10, pointerEvents: 'none',
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6 }}>
              {matriz.linhas[hoverCell.row].idx} · Sem {hoverCell.col + 1} · {matriz.semestres[hoverCell.col]} · {hoverCell.col + 1}ª fase
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: DS.textDark, marginBottom: 4 }}>
              {matriz.linhas[hoverCell.row].titulo}
            </div>
            <div style={{ marginBottom: 8 }}>
              <ConceitoChip tipo={tooltipConceito} size="sm" />
            </div>
            {tooltipEvidencias ? (
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 4 }}>
                  Baseado em
                </div>
                <ul style={{ margin: 0, paddingLeft: 16, fontSize: 11, color: DS.textDark, lineHeight: 1.5 }}>
                  {tooltipEvidencias.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              </div>
            ) : (
              <div style={{ fontSize: 11, color: DS.textMuted, fontStyle: 'italic' }}>
                Sem evidências detalhadas neste mock
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: 14, fontSize: 10, color: DS.textMuted, fontStyle: 'italic', lineHeight: 1.5 }}>
          Agrupamento por área-eixo conforme Art. 6º das DCN 2025 — algumas competências articulam mais de um eixo
          (ex.: IX explicitamente quatro). Classificação detalhada em validação pelo NDE.
        </div>
      </Card>
    </section>
  );
}

// ── BLOCO 3 — Trajetória de avaliações por UC ───────────────────────────────
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
            <button key={f} onClick={() => setFiltroFase(f)}
              style={{
                padding: '5px 11px', borderRadius: 100, border: 'none', cursor: 'pointer',
                fontSize: 11, fontWeight: 700, fontFamily: 'IBM Plex Sans, sans-serif',
                background: filtroFase === f ? DS.blueDark : DS.borderLight,
                color: filtroFase === f ? '#fff' : DS.textDark,
              }}>{f === 'todas' ? 'Todas as fases' : f}</button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {visiveis.map((u, i) => (
            <div key={i}>
              <div onClick={() => setExpandida(expandida === i ? null : i)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 12px', background: DS.bg, border: `1px solid ${DS.borderLight}`,
                  borderRadius: 8, cursor: 'pointer', gap: 10, flexWrap: 'wrap',
                }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontSize: 11, color: DS.textMuted, marginBottom: 2 }}>{u.fase} · {u.semestre}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: DS.textDark }}>{u.titulo}</div>
                </div>
                <ConceitoChip tipo={u.conceito} size="sm" />
                <span style={{ color: DS.textMuted, fontSize: 14 }}>{expandida === i ? '▾' : '▸'}</span>
              </div>
              {expandida === i && (
                <div style={{ padding: '12px 14px', background: DS.surface, border: `1px solid ${DS.borderLight}`, borderTop: 'none', borderRadius: '0 0 8px 8px', marginTop: -1 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6 }}>
                    Componentes avaliativos
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: DS.textDark, lineHeight: 1.6 }}>
                    {u.componentes.map((c, ci) => (
                      <li key={ci}>
                        <strong>{c.tipo}:</strong> {c.detalhe} <ConceitoChip tipo={c.conceito} size="sm" />
                      </li>
                    ))}
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

// ── BLOCO 4 — APCs com evolução Dreyfus ───────────────────────────────────────
function BlocoAPCs({ apcs, isMobile }) {
  // Gráfico simples: nível Dreyfus médio por semestre
  const porSem = {};
  apcs.forEach(a => {
    if (!porSem[a.semestre]) porSem[a.semestre] = [];
    porSem[a.semestre].push(a.dreyfus);
  });
  const semestres = Object.keys(porSem);
  const medias = semestres.map(s => {
    const arr = porSem[s];
    return arr.reduce((acc, v) => acc + v, 0) / arr.length;
  });
  const maxLevel = 5;

  return (
    <section>
      <SectionHeading>APCs · evolução por nível Dreyfus (1–5)</SectionHeading>
      <Card style={{ padding: isMobile ? 12 : 18 }}>
        {/* gráfico de evolução */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 100, paddingBottom: 6, borderBottom: `1px solid ${DS.borderLight}` }}>
            {semestres.map((s, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: DS.blueDark }}>{medias[i].toFixed(1)}</span>
                <div style={{
                  width: '70%', height: `${(medias[i] / maxLevel) * 80}px`,
                  background: medias[i] >= 3 ? DS.green : medias[i] >= 2 ? DS.amber : DS.terra,
                  borderRadius: '4px 4px 0 0',
                }}></div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
            {semestres.map((s, i) => (
              <div key={i}
                title={`Semestre ${i + 1} · ${s}`}
                style={{ flex: 1, textAlign: 'center', fontSize: 10, color: DS.textMuted, cursor: 'help' }}>
                Sem {i + 1}
              </div>
            ))}
          </div>
        </div>
        {/* lista de APCs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {apcs.slice(0, 6).map((a, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 12px', background: DS.bg, borderRadius: 8, gap: 10, flexWrap: 'wrap',
            }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: 11, color: DS.textMuted }}>{a.data} · {a.epa}</div>
                <div style={{ fontSize: 13, color: DS.textDark, fontWeight: 600, marginTop: 2 }}>{a.parecer}</div>
                <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 2 }}>Avaliador: {a.avaliador}</div>
              </div>
              <span style={{
                padding: '5px 11px', borderRadius: 6, background: DS.blueDark, color: '#fff',
                fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap', fontFamily: 'IBM Plex Mono, monospace',
              }}>Dreyfus {a.dreyfus}/5</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, fontSize: 11, color: DS.textMuted, fontStyle: 'italic' }}>
          {apcs.length} APCs registradas no total — APC usa Dreyfus 1–5; Logbook usa Ten Cate 1–4 (escalas distintas).
        </div>
      </Card>
    </section>
  );
}

// ── Export ──────────────────────────────────────────────────────────────────
Object.assign(window, {
  ConceitoChip, StatusGlobalBadge, COMPETENCIAS_27, JOAO_MATRIZ, EVIDENCIAS,
  BlocoCabecalho, BlocoMatrizProgramatica, BlocoTrajetoriaUC, BlocoAPCs,
  // BlocoPreferencias vem de med-unidavi-capi-orientador.jsx (carregado depois)
});
