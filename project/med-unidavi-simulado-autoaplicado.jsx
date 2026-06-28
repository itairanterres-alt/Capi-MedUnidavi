// =============================================================================
// MED-UNIDAVI · Simulado auto-aplicado (mu_simulado_autoaplicado) — Bloco D1
//
// Evolução do "simulado cronometrado" em QuestoesScreen. Acrescenta:
//   · Configuração ENAMED-like (60 questões / 4h) ou parâmetros custom
//   · Distribuição por área da Portaria 478 (7 áreas)
//   · Feedback pós-prova por competência (15 ENAMED)
//
// Sem peso institucional. Sem registro de nota oficial. Para preparação.
// =============================================================================

const SIMULADO_PRESETS = [
  { id: 'enamed-full', label: 'ENAMED completo',  q: 60, min: 240, descricao: '60 questões · 4 horas · distribuição proporcional Portaria 478' },
  { id: 'enamed-mini', label: 'ENAMED-mini',      q: 30, min: 120, descricao: '30 questões · 2 horas · revisão rápida' },
  { id: 'flash',       label: 'Flash · 10 questões', q: 10, min: 20, descricao: '10 questões · 20 min · checkpoint diário' },
];

// Distribuição mock proporcional Portaria 478 (% por área)
const SIMULADO_DIST_478 = {
  cm:  0.28, // Clínica Médica
  cg:  0.10, // Cirurgia Geral
  go:  0.13, // GO
  ped: 0.14, // Pediatria
  mfc: 0.16, // MFC
  sm:  0.07, // Saúde Mental
  sc:  0.12, // Saúde Coletiva
};

function SimuladoAutoaplicadoScreen({ isMobile, onNavigate }) {
  const [fase, setFase] = React.useState('setup');     // setup · execucao · feedback
  const [config, setConfig] = React.useState({ presetId: 'enamed-mini', q: 30, min: 120, custom: false });
  const [resultado, setResultado] = React.useState(null);

  if (fase === 'execucao') {
    return <SimuladoExecucao
      config={config}
      isMobile={isMobile}
      onFinalizar={(r) => { setResultado(r); setFase('feedback'); }}
      onCancelar={() => setFase('setup')}
    />;
  }
  if (fase === 'feedback' && resultado) {
    return <SimuladoFeedback
      resultado={resultado}
      isMobile={isMobile}
      onVoltar={() => { setFase('setup'); setResultado(null); }}
      onNavigate={onNavigate}
    />;
  }
  return <SimuladoSetup
    config={config} setConfig={setConfig}
    isMobile={isMobile}
    onIniciar={() => setFase('execucao')}
    onVoltar={() => onNavigate && onNavigate('dashboard')}
  />;
}

// ── Setup ────────────────────────────────────────────────────────────────────
function SimuladoSetup({ config, setConfig, isMobile, onIniciar, onVoltar }) {
  const aplicarPreset = (p) => setConfig({ presetId: p.id, q: p.q, min: p.min, custom: false });
  const toggleCustom = () => setConfig(c => ({ ...c, custom: !c.custom, presetId: !c.custom ? 'custom' : 'enamed-mini' }));

  // Distribuição de questões por área (cálculo mock)
  const distAreas = ENAMED_AREAS.map(a => ({
    ...a,
    nQuestoes: Math.round(config.q * (SIMULADO_DIST_478[a.id] || 0.1)),
  }));
  const totalDist = distAreas.reduce((s, a) => s + a.nQuestoes, 0);

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <TopBar
        title="Simulado auto-aplicado"
        subtitle="ENAMED-like · sem peso institucional · feedback por competência (Portaria 478)"
        isMobile={isMobile}
        breadcrumb={[
          { label: 'Início', onClick: onVoltar },
          { label: 'Meu Treino', onClick: () => onVoltar && onVoltar('questoes') },
          { label: 'Simulado auto-aplicado' },
        ]}
      />

      <div style={{ padding: isMobile ? 14 : '24px 32px', display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 1000, margin: '0 auto' }}>

        {/* Disclaimer */}
        <div style={{ padding: '10px 14px', background: DS.amberLight, border: `1px solid ${DS.amber}40`, borderRadius: DS.radiusSm, fontSize: 12, color: DS.textDark, lineHeight: 1.55 }}>
          <strong>Auto-aplicado.</strong> Esta avaliação <strong>não tem peso institucional</strong>. Serve para você medir
          a si próprio, ver lacunas por competência e calibrar a estratégia de estudo. Nada do que acontecer aqui
          vai para nota oficial nem para o seu Status ENAMED do Perfil — só você verá o resultado.
        </div>

        {/* Presets */}
        <Card style={{ padding: isMobile ? 14 : 18 }}>
          <SectionHeading>Formato</SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 10 }}>
            {SIMULADO_PRESETS.map(p => {
              const ativo = config.presetId === p.id;
              return (
                <button key={p.id} onClick={() => aplicarPreset(p)} style={{
                  textAlign: 'left', padding: 14, borderRadius: DS.radius,
                  background: ativo ? DS.blueLight : DS.surface,
                  border: `2px solid ${ativo ? DS.blue : DS.border}`,
                  cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif',
                  display: 'flex', flexDirection: 'column', gap: 6,
                }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: DS.text }}>{p.label}</div>
                  <div style={{ display: 'flex', gap: 12, fontSize: 11, color: DS.textSec, fontWeight: 700 }}>
                    <span>{p.q} questões</span><span>·</span><span>{Math.floor(p.min/60) ? `${Math.floor(p.min/60)}h ${p.min%60 || ''}` : `${p.min} min`}</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: DS.textMuted, lineHeight: 1.5 }}>{p.descricao}</div>
                </button>
              );
            })}
          </div>

          {/* Custom */}
          <div style={{ marginTop: 14, padding: 12, borderRadius: DS.radiusSm, border: `1px dashed ${DS.border}`, background: DS.bg }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={config.custom} onChange={toggleCustom} />
              <span style={{ fontSize: 12.5, color: DS.text, fontWeight: 700 }}>Configurar parâmetros próprios</span>
            </label>
            {config.custom && (
              <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 10.5, fontWeight: 800, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 4 }}>Nº de questões</div>
                  <input type="range" min={5} max={120} step={5} value={config.q}
                    onChange={(e) => setConfig(c => ({ ...c, q: parseInt(e.target.value, 10) }))}
                    style={{ width: '100%' }} />
                  <div style={{ fontSize: 14, fontWeight: 800, color: DS.text, marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>{config.q} questões</div>
                </div>
                <div>
                  <div style={{ fontSize: 10.5, fontWeight: 800, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 4 }}>Tempo (minutos)</div>
                  <input type="range" min={10} max={300} step={10} value={config.min}
                    onChange={(e) => setConfig(c => ({ ...c, min: parseInt(e.target.value, 10) }))}
                    style={{ width: '100%' }} />
                  <div style={{ fontSize: 14, fontWeight: 800, color: DS.text, marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>
                    {config.min} min ({(config.min / config.q).toFixed(1)} min/questão)
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Distribuição por área */}
        <Card style={{ padding: isMobile ? 14 : 18 }}>
          <SectionHeading>Distribuição por área · Portaria 478</SectionHeading>
          <div style={{ fontSize: 11.5, color: DS.textMuted, marginBottom: 12, lineHeight: 1.55 }}>
            Distribuição proporcional automática conforme prova oficial. Total: {totalDist} de {config.q} questões.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {distAreas.map(a => {
              const pct = (a.nQuestoes / config.q) * 100;
              return (
                <div key={a.id} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 10px', borderRadius: DS.radiusSm, background: DS.bg, border: `1px solid ${DS.borderLight}`,
                }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: a.cor, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 12, fontWeight: 700, color: DS.text }}>{a.label}</span>
                  <div style={{ width: 100, height: 6, background: DS.borderLight, borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: a.cor }} />
                  </div>
                  <span style={{ width: 56, textAlign: 'right', fontSize: 12, fontWeight: 800, color: DS.text, fontVariantNumeric: 'tabular-nums' }}>
                    {a.nQuestoes} ({pct.toFixed(0)}%)
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* CTA */}
        <Card style={{ padding: isMobile ? 14 : 18, background: DS.bg, borderLeft: `3px solid ${DS.blue}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Pronto para começar</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: DS.text, marginTop: 3 }}>
                {config.q} questões · {config.min} min · auto-aplicado · sem peso institucional
              </div>
            </div>
            <button onClick={onIniciar} style={{
              padding: '12px 22px', borderRadius: DS.radiusSm,
              background: DS.blue, color: '#fff', border: 'none', cursor: 'pointer',
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 800, fontSize: 13,
            }}>Iniciar simulado ›</button>
          </div>
        </Card>

        {isMobile && <div style={{ height: 60 }} />}
      </div>
    </div>
  );
}

// ── Execução (visualização simplificada — usa estrutura mock) ───────────────
function SimuladoExecucao({ config, isMobile, onFinalizar, onCancelar }) {
  const [restante, setRestante] = React.useState(config.min * 60); // s
  const [respostas, setRespostas] = React.useState({});

  React.useEffect(() => {
    if (restante <= 0) { encerrar(); return; }
    const t = setInterval(() => setRestante(r => r - 1), 1000);
    return () => clearInterval(t);
  }, [restante]);

  // Gera 'questões' mock para simulação
  const questoes = React.useMemo(() => {
    return Array.from({ length: config.q }, (_, i) => {
      const a = ENAMED_AREAS[i % ENAMED_AREAS.length];
      const c = ENAMED15[(i * 3) % ENAMED15.length];
      return {
        n: i + 1,
        area: a,
        comp: c,
        enunciado: `Questão ${i + 1} · ${a.label}. Item curador C${String(c.n).padStart(2,'0')} (mock para simulado).`,
        gabarito: ['A','B','C','D'][(i * 7) % 4],
      };
    });
  }, [config.q]);

  const [idx, setIdx] = React.useState(0);
  const q = questoes[idx];
  const respondidas = Object.keys(respostas).length;

  const responder = (alt) => setRespostas(r => ({ ...r, [q.n]: alt }));
  const proxima = () => setIdx(i => Math.min(questoes.length - 1, i + 1));
  const anterior = () => setIdx(i => Math.max(0, i - 1));
  const encerrar = () => {
    // Computa resultado
    const itens = questoes.map(qq => ({
      ...qq,
      resp: respostas[qq.n] || null,
      acerto: respostas[qq.n] === qq.gabarito,
    }));
    const acertos = itens.filter(i => i.acerto).length;
    onFinalizar({ itens, acertos, total: questoes.length, tempoUsadoS: config.min * 60 - restante, config });
  };

  const mm = String(Math.floor(restante / 60)).padStart(2, '0');
  const ss = String(restante % 60).padStart(2, '0');
  const tempoAlerta = restante < 5 * 60;

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      {/* Header sticky */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 5,
        background: DS.surface, borderBottom: `1px solid ${DS.border}`,
        padding: isMobile ? '10px 14px' : '12px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap',
      }}>
        <div>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Simulado em execução</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: DS.text, marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>
            {respondidas} / {questoes.length} respondidas · questão {idx + 1}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{
            padding: '6px 12px', borderRadius: DS.radiusSm,
            background: tempoAlerta ? DS.terraLight : DS.blueLight,
            color: tempoAlerta ? DS.terra : DS.blue,
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 800, fontSize: 16, fontVariantNumeric: 'tabular-nums',
          }}>{mm}:{ss}</div>
          <button onClick={encerrar} style={{
            padding: '8px 14px', borderRadius: DS.radiusSm,
            background: DS.green, color: '#fff', border: 'none', cursor: 'pointer',
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 800, fontSize: 11,
          }}>Entregar ›</button>
          <button onClick={onCancelar} style={{
            padding: '8px 12px', borderRadius: DS.radiusSm,
            background: 'transparent', color: DS.textSec, border: `1px solid ${DS.border}`, cursor: 'pointer',
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 11,
          }}>Cancelar</button>
        </div>
      </div>

      <div style={{ padding: isMobile ? 14 : '24px 32px', maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Navegação rápida (grid de bolinhas) */}
        <Card style={{ padding: '12px 14px' }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 8 }}>
            Navegação · clique para ir
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(28px, 1fr))', gap: 4 }}>
            {questoes.map(qq => {
              const respondida = !!respostas[qq.n];
              const atual = qq.n === idx + 1;
              return (
                <button key={qq.n} onClick={() => setIdx(qq.n - 1)} style={{
                  aspectRatio: '1/1', borderRadius: 4,
                  background: atual ? DS.blue : respondida ? DS.green : DS.bg,
                  color: atual || respondida ? '#fff' : DS.textMuted,
                  border: `1px solid ${atual ? DS.blue : respondida ? DS.green : DS.border}`,
                  cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif',
                  fontWeight: 800, fontSize: 10, fontVariantNumeric: 'tabular-nums',
                }}>{qq.n}</button>
              );
            })}
          </div>
        </Card>

        {/* Questão */}
        <Card style={{ padding: isMobile ? 16 : 20 }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
            <span style={{ padding: '3px 9px', borderRadius: 4, fontSize: 10, fontWeight: 800, color: '#fff', background: q.area.cor }}>{q.area.label}</span>
            <span style={{ padding: '3px 9px', borderRadius: 4, fontSize: 10, fontWeight: 800, color: DS.textSec, background: DS.bg, border: `1px solid ${DS.border}` }}>
              C{String(q.comp.n).padStart(2,'0')} · {q.comp.curto}
            </span>
          </div>
          <div style={{ fontSize: 14, color: DS.text, lineHeight: 1.6, marginBottom: 14 }}>{q.enunciado}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {['A','B','C','D'].map(alt => {
              const selected = respostas[q.n] === alt;
              return (
                <button key={alt} onClick={() => responder(alt)} style={{
                  display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left',
                  padding: '10px 14px', borderRadius: DS.radiusSm,
                  background: selected ? DS.blueLight : DS.surface,
                  border: `1.5px solid ${selected ? DS.blue : DS.border}`,
                  cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif',
                  color: DS.text, fontSize: 13, fontWeight: 600,
                }}>
                  <span style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: selected ? DS.blue : 'transparent',
                    color: selected ? '#fff' : DS.text,
                    border: `1.5px solid ${selected ? DS.blue : DS.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: 11,
                  }}>{alt}</span>
                  <span>Alternativa {alt} — texto mock (4 alternativas A–D, padrão ENAMED ABDC).</span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <button onClick={anterior} disabled={idx === 0} style={{
            padding: '10px 16px', borderRadius: DS.radiusSm,
            background: 'transparent', color: idx === 0 ? DS.textMuted : DS.textSec,
            border: `1px solid ${DS.border}`, cursor: idx === 0 ? 'not-allowed' : 'pointer',
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 12,
          }}>‹ Anterior</button>
          <button onClick={proxima} disabled={idx === questoes.length - 1} style={{
            padding: '10px 16px', borderRadius: DS.radiusSm,
            background: DS.blueDark, color: '#fff', border: 'none',
            cursor: idx === questoes.length - 1 ? 'not-allowed' : 'pointer',
            opacity: idx === questoes.length - 1 ? 0.5 : 1,
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 800, fontSize: 12,
          }}>Próxima ›</button>
        </div>
      </div>
    </div>
  );
}

// ── Feedback pós-prova por competência ─────────────────────────────────────
function SimuladoFeedback({ resultado, isMobile, onVoltar, onNavigate }) {
  const { itens, acertos, total, tempoUsadoS, config } = resultado;
  const pct = Math.round((acertos / total) * 100);

  // Agregação por competência (ENAMED15)
  const porComp = ENAMED15.map(c => {
    const subset = itens.filter(i => i.comp.n === c.n);
    const ac = subset.filter(i => i.acerto).length;
    return { comp: c, total: subset.length, acertos: ac, pct: subset.length ? Math.round((ac / subset.length) * 100) : null };
  }).filter(x => x.total > 0);

  // Agregação por área
  const porArea = ENAMED_AREAS.map(a => {
    const subset = itens.filter(i => i.area.id === a.id);
    const ac = subset.filter(i => i.acerto).length;
    return { area: a, total: subset.length, acertos: ac, pct: subset.length ? Math.round((ac / subset.length) * 100) : null };
  }).filter(x => x.total > 0);

  const mm = String(Math.floor(tempoUsadoS / 60)).padStart(2, '0');
  const ss = String(tempoUsadoS % 60).padStart(2, '0');
  const corCompetencia = (pct) => pct === null ? DS.textMuted : pct >= 70 ? DS.green : pct >= 50 ? DS.amber : DS.terra;

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <TopBar
        title="Feedback do simulado"
        subtitle="Auto-aplicado · sem peso institucional · feedback por competência (Portaria 478)"
        isMobile={isMobile}
        breadcrumb={[
          { label: 'Simulado auto-aplicado', onClick: onVoltar },
          { label: 'Feedback' },
        ]}
      />

      <div style={{ padding: isMobile ? 14 : '24px 32px', display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 1100, margin: '0 auto' }}>

        {/* Indicadores */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 10 }}>
          <Card style={{ padding: 14, borderLeft: `3px solid ${pct >= 60 ? DS.green : DS.terra}` }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Desempenho</div>
            <div style={{ fontSize: 30, fontWeight: 800, color: pct >= 60 ? DS.green : DS.terra, lineHeight: 1.1, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>{pct}%</div>
            <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 2 }}>{acertos} / {total} acertos</div>
          </Card>
          <Card style={{ padding: 14, borderLeft: `3px solid ${DS.blue}` }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Tempo usado</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: DS.text, lineHeight: 1.1, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>{mm}:{ss}</div>
            <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 2 }}>{(tempoUsadoS / total).toFixed(0)}s / questão</div>
          </Card>
          <Card style={{ padding: 14, borderLeft: `3px solid ${DS.terra}` }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Áreas avaliadas</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: DS.text, lineHeight: 1.1, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>{porArea.length} / 7</div>
            <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 2 }}>Portaria 478</div>
          </Card>
          <Card style={{ padding: 14, borderLeft: `3px solid #7A5CBF` }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Competências tocadas</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: DS.text, lineHeight: 1.1, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>{porComp.length} / 15</div>
            <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 2 }}>ENAMED</div>
          </Card>
        </div>

        {/* Lembrete: não impacta Status ENAMED */}
        <div style={{ padding: '10px 14px', background: DS.amberLight, border: `1px solid ${DS.amber}40`, borderRadius: DS.radiusSm, fontSize: 12, color: DS.textDark, lineHeight: 1.55 }}>
          <strong>Lembrete:</strong> este resultado é só para você. Não vai para o seu Status ENAMED no Perfil, não conta como TP, não aparece para tutor ou coordenação.
        </div>

        {/* Por competência */}
        <Card style={{ padding: isMobile ? 14 : 18 }}>
          <SectionHeading>Desempenho por competência (ENAMED 15)</SectionHeading>
          <div style={{ fontSize: 11, color: DS.textMuted, marginBottom: 10 }}>
            ≥70% verde · 50–69% amarelo · &lt;50% vermelho. Aproveite o vermelho para pautar próximos Capi-Cards.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {porComp.map(p => {
              const cor = corCompetencia(p.pct);
              return (
                <div key={p.comp.n} style={{
                  padding: '8px 12px', borderRadius: DS.radiusSm,
                  background: cor === DS.green ? DS.greenLight : cor === DS.amber ? DS.amberLight : DS.terraLight,
                  border: `1px solid ${cor}30`,
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{
                    minWidth: 36, height: 22, borderRadius: 4, background: cor, color: '#fff',
                    fontSize: 10.5, fontWeight: 800,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}>C{String(p.comp.n).padStart(2,'0')}</span>
                  <span style={{ flex: 1, fontSize: 12, fontWeight: 700, color: DS.text }}>{p.comp.titulo}</span>
                  <span style={{ fontSize: 11, color: DS.textSec, fontVariantNumeric: 'tabular-nums' }}>{p.acertos}/{p.total}</span>
                  <span style={{ width: 50, textAlign: 'right', fontSize: 13, fontWeight: 800, color: cor, fontVariantNumeric: 'tabular-nums' }}>{p.pct}%</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Por área */}
        <Card style={{ padding: isMobile ? 14 : 18 }}>
          <SectionHeading>Desempenho por área</SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: 8 }}>
            {porArea.map(p => {
              const cor = corCompetencia(p.pct);
              return (
                <div key={p.area.id} style={{
                  padding: '10px 12px', borderRadius: DS.radiusSm,
                  background: DS.bg, border: `1px solid ${DS.border}`,
                  borderLeft: `3px solid ${p.area.cor}`,
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{ flex: 1, fontSize: 12.5, fontWeight: 700, color: DS.text }}>{p.area.label}</span>
                  <span style={{ fontSize: 11, color: DS.textSec, fontVariantNumeric: 'tabular-nums' }}>{p.acertos}/{p.total}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: cor, fontVariantNumeric: 'tabular-nums', width: 50, textAlign: 'right' }}>{p.pct}%</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Ações */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <button onClick={onVoltar} style={{
            padding: '11px 16px', borderRadius: DS.radiusSm,
            background: 'transparent', color: DS.textSec, border: `1px solid ${DS.border}`, cursor: 'pointer',
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 12,
          }}>Novo simulado</button>
          <button onClick={() => onNavigate && onNavigate('questoes')} style={{
            padding: '11px 16px', borderRadius: DS.radiusSm,
            background: DS.blue, color: '#fff', border: 'none', cursor: 'pointer',
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 800, fontSize: 12,
          }}>Revisar questões erradas ›</button>
        </div>

        {isMobile && <div style={{ height: 60 }} />}
      </div>
    </div>
  );
}

Object.assign(window, { SimuladoAutoaplicadoScreen, SIMULADO_PRESETS, SIMULADO_DIST_478 });
