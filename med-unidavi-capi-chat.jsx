// =============================================================================
// MED-UNIDAVI · Capi Chat (IA pedagógica contextual)
// Ícone discreto que abre painel lateral. Contexto pré-carregado pela tela.
// SEPARADO do FAB de Comunicação (Bloco C, canal humano).
// Telas habilitadas: questoes, ic, reflexivo, simdavi, morfofuncional.
// Disclaimer permanente. Tom sóbrio. Não substitui orientador/preceptor.
// =============================================================================

const CAPI_CONTEXTO = {
  questoes:        { titulo: 'Meu Treino',           foco: 'Apoio na compreensão de questões. Não revela respostas antes da sua tentativa.' },
  ic:              { titulo: 'Iniciação Científica', foco: 'Apoio metodológico: PICO, desenho de estudo, busca de literatura. Não substitui seu orientador.' },
  reflexivo:       { titulo: 'Portfólio Reflexivo',  foco: 'Estímulo à reflexão estruturada. Não interpreta nem julga sua experiência.' },
  simdavi:         { titulo: 'Simulação Clínica',    foco: 'Facilitação do raciocínio clínico em simulação. Não decide conduta clínica.' },
  morfofuncional:  { titulo: 'Morfofuncional',       foco: 'Apoio ao estudo de estruturas e correlações funcionais. Conteúdo curricular UC.' },
  // ── Orientador (§4.5 Face A) — contexto do aluno, não da tela ───────────────
  dashboard: { titulo: 'seu percurso', modo: 'orientador', foco: 'Apoio ao percurso formativo. Não substitui orientador ou preceptor humano.' },
  ppc:       { titulo: 'Meu Percurso', modo: 'orientador', foco: 'Apoio à jornada formativa. Não substitui orientador ou preceptor humano.' },
  trilhas:   { titulo: 'Trilhas',      modo: 'orientador', foco: 'Apoio à jornada formativa. Não substitui orientador ou preceptor humano.' },
};

function CapiChat({ telaAtual }) {
  const ctx = CAPI_CONTEXTO[telaAtual];
  const [aberto, setAberto] = React.useState(false);
  const [hist, setHist] = React.useState([]);
  const [input, setInput] = React.useState('');
  const isOrientador = ctx && ctx.modo === 'orientador';

  // sinais mockados para o modo orientador
  const _sinais = [
    { icon: '🃏', txt: '3 Capi-Cards de Saúde Mental parados há 8 dias', cta: 'Quer revisar?' },
    { icon: '📊', txt: 'Lacuna em Cardiologia · Simulado não aberto este mês', cta: 'Quer explorar?' },
  ];

  // Reset histórico ao trocar de tela
  React.useEffect(() => { setHist([]); setAberto(false); }, [telaAtual]);

  if (!ctx) return null;

  const enviar = () => {
    const v = input.trim();
    if (!v) return;
    setHist(h => [...h, { role: 'user', text: v }, { role: 'capi', text: 'Resposta de demonstração — apoio metodológico, sem oferecer conduta, redação ou análise final.' }]);
    setInput('');
  };

  return (
    <React.Fragment>
      <button
        onClick={() => setAberto(true)}
        className="lg-capi"
        aria-label="Capi · apoio pedagógico"
        title={`Capi — apoio pedagógico desta tela (${ctx.titulo})`}
        style={{
          position: 'fixed', right: 18, bottom: 80, zIndex: 89,
          width: 64, borderRadius: 14,
          background: DS.surface, border: `1.5px solid ${DS.border}`, cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(8,16,32,0.20)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: 0, overflow: 'hidden',
          transition: 'box-shadow 0.15s, transform 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(8,16,32,0.28)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(8,16,32,0.20)'; e.currentTarget.style.transform = 'none'; }}
      >
        {typeof CapiSprite === 'function'
          ? <CapiSprite pose="neutro" height={72} radius={0} animated />
          : <span style={{ fontSize: 32, lineHeight: 1, padding: 8 }}>🦫</span>
        }
        <div style={{
          width: '100%', padding: '4px 0',
          background: isOrientador ? DS.terraLight : DS.blueLight,
          borderTop: `1px solid ${DS.border}`,
          fontSize: 11, fontWeight: 800,
          color: isOrientador ? DS.terra : DS.blue,
          textAlign: 'center', letterSpacing: '0.5px',
        }}>{isOrientador ? 'PERCURSO' : 'CAPI'}</div>
      </button>

      {aberto && (
        <div
          onClick={() => setAberto(false)}
          className="lg-scrim"
          style={{ position: 'fixed', inset: 0, background: 'rgba(8,16,32,0.40)', zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="lg-panel"
            style={{
              width: '100%', maxWidth: 420, height: '100%', maxHeight: '88vh',
              background: DS.surface, borderTopLeftRadius: 14, borderBottomLeftRadius: 14,
              display: 'flex', flexDirection: 'column',
              boxShadow: '-6px 0 24px rgba(0,0,0,0.18)',
            }}
          >
            <div style={{ padding: '14px 16px', borderBottom: `1px solid ${DS.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
              {typeof CapiSprite === 'function'
                ? <CapiSprite pose={CAPI_POSE_BY_SCREEN[telaAtual] || 'neutro'} height={52} radius={8} />
                : <span style={{ fontSize: 28 }}>🦫</span>
              }
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: DS.text }}>Capi · {ctx.titulo}</div>
                <div style={{ fontSize: 11, color: DS.textMuted }}>
                  {isOrientador ? 'Orientador · jornada formativa' : 'IA pedagógica · contexto desta tela'}
                </div>
              </div>
              <button onClick={() => setAberto(false)} aria-label="Fechar" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 18, color: DS.textMuted, lineHeight: 1 }}>×</button>
            </div>

            <div style={{
              padding: '10px 16px',
              background: isOrientador ? DS.blueLight : DS.amberLight + '50',
              borderBottom: `1px solid ${DS.border}`,
              fontSize: 11, color: DS.textSec, lineHeight: 1.5
            }}>
              <strong>{isOrientador ? 'Apoio ao percurso.' : 'Apoio pedagógico.'}</strong> {ctx.foco} Sempre confirme com seu tutor, orientador ou preceptor.
            </div>

            <div style={{ flex: 1, overflow: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {hist.length === 0 && (
                <div style={{ color: DS.textMuted, fontSize: 12, textAlign: 'center', padding: '16px 8px', lineHeight: 1.6 }}>
                  {isOrientador ? (
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ marginBottom: 12, color: DS.textSec, lineHeight: 1.55 }}>
                        Estou acompanhando seu percurso formativo.
                      </div>
                      {_sinais.map((s, i) => (
                        <div key={i} onClick={() => {
                          setHist(h => [...h,
                            { role: 'user', text: s.cta },
                            { role: 'capi', text: 'Vou te ajudar a retomar. Que tal reservar 10 minutos agora? O FSRS já selecionou o mais urgente.' },
                          ]);
                        }} style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '9px 12px', borderRadius: 8, marginBottom: 8,
                          background: DS.bg, border: `1px solid ${DS.border}`,
                          cursor: 'pointer', transition: 'background 0.1s',
                        }}
                          onMouseEnter={e => e.currentTarget.style.background = DS.blueLight}
                          onMouseLeave={e => e.currentTarget.style.background = DS.bg}
                        >
                          <span style={{ fontSize: 16 }}>{s.icon}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, color: DS.text, fontWeight: 500 }}>{s.txt}</div>
                            <div style={{ fontSize: 11, color: DS.blue, fontWeight: 600, marginTop: 2 }}>{s.cta}</div>
                          </div>
                          <span style={{ color: DS.textMuted, fontSize: 14 }}>›</span>
                        </div>
                      ))}
                      <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 8 }}>Ou me fale como está se sentindo com os estudos.</div>
                    </div>
                  ) : (
                    <React.Fragment>
                      Inicie uma pergunta sobre o conteúdo desta tela.<br/>
                      <span style={{ fontSize: 11 }}>Não fornece diagnóstico, conduta clínica ou redação acadêmica final.</span>
                    </React.Fragment>
                  )}
                </div>
              )}
              {hist.map((m, i) => (
                <div key={i} style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '9px 13px', borderRadius: 12,
                  background: m.role === 'user' ? DS.blue : DS.bg,
                  color: m.role === 'user' ? '#fff' : DS.text,
                  fontSize: 13, lineHeight: 1.5,
                  border: m.role === 'capi' ? `1px solid ${DS.border}` : 'none',
                }}>{m.text}</div>
              ))}
            </div>

            <div style={{ padding: 12, borderTop: `1px solid ${DS.border}`, display: 'flex', gap: 8 }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') enviar(); }}
                placeholder={isOrientador ? 'Como posso apoiar sua jornada…' : 'Pergunte ao Capi sobre esta tela…'}
                style={{ flex: 1, padding: '9px 12px', borderRadius: 8, border: `1px solid ${DS.border}`, background: DS.bg, fontFamily: 'inherit', fontSize: 13, color: DS.text }}
              />
              <button onClick={enviar} style={{ padding: '0 16px', borderRadius: 8, background: DS.blue, color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 }}>›</button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

Object.assign(window, { CapiChat });
