// =============================================================================
// MED-UNIDAVI · Capi Orientador — Face A (§4.5)
// BlocoPreferencias (Perfil) + OnboardingFlow (Trilha PBL)
// Dependências: DS, CapiSprite, Card — expostos via window pelo components.jsx
// =============================================================================

const _PREF_STORAGE = 'capi_prefs_v1';
const _PREF_DEFAULTS = { ritmo: 'distribuido', formato: 'misto', exemplos: 'moderado' };

function _readPrefs() {
  try { return { ..._PREF_DEFAULTS, ...JSON.parse(localStorage.getItem(_PREF_STORAGE) || '{}') }; }
  catch { return { ..._PREF_DEFAULTS }; }
}
function _writePrefs(p) {
  try { localStorage.setItem(_PREF_STORAGE, JSON.stringify(p)); } catch {}
}

// ── BlocoPreferencias ──────────────────────────────────────────────────────────
function BlocoPreferencias({ isMobile }) {
  const [prefs, setPrefs] = React.useState(_readPrefs);

  const set = (k, v) => {
    const n = { ...prefs, [k]: v };
    setPrefs(n); _writePrefs(n);
  };

  const TogRow = ({ label, k, opts }) => (
    <div style={{
      display: 'flex', flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? 6 : 12,
    }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: DS.textSec, minWidth: 160 }}>{label}</span>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {opts.map(o => {
          const on = prefs[k] === o.v;
          return (
            <button key={o.v} onClick={() => set(k, o.v)} style={{
              padding: '5px 14px', borderRadius: 100, cursor: 'pointer',
              fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11, fontWeight: 600,
              background: on ? DS.blueDark : DS.bg,
              color: on ? '#fff' : DS.textSec,
              border: `1px solid ${on ? DS.blueDark : DS.border}`,
              transition: 'all 0.12s',
            }}>{o.l}</button>
          );
        })}
      </div>
    </div>
  );

  return (
    <Card style={{ padding: isMobile ? 16 : 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        {typeof CapiSprite === 'function' && <CapiSprite pose="dica" height={52} radius={8} />}
        <div>
          <div style={{ fontWeight: 800, fontSize: 15, color: DS.text }}>Preferências de estudo</div>
          <div style={{ fontSize: 12, color: DS.textMuted, marginTop: 2, lineHeight: 1.4 }}>
            Como o Capi se adapta ao seu ritmo. Você ajusta quando quiser.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 18 }}>
        <TogRow label="Ritmo" k="ritmo" opts={[
          { v: 'distribuido', l: 'Distribuído' },
          { v: 'intensivo',   l: 'Intensivo'   },
        ]} />
        <TogRow label="Formato preferido" k="formato" opts={[
          { v: 'video', l: 'Vídeo' },
          { v: 'texto', l: 'Texto' },
          { v: 'misto', l: 'Misto' },
        ]} />
        <TogRow label="Quantidade de exemplos" k="exemplos" opts={[
          { v: 'poucos',   l: 'Poucos'   },
          { v: 'moderado', l: 'Moderado' },
          { v: 'muitos',   l: 'Muitos'   },
        ]} />
      </div>

      <div style={{
        padding: '9px 13px', borderRadius: DS.radiusSm,
        background: DS.blueLight, border: `1px solid ${DS.border}`,
        fontSize: 11, color: DS.textSec, lineHeight: 1.55,
      }}>
        Preferências orientam sugestões do Capi. Não afetam currículo, avaliações ou visão docente.
      </div>
    </Card>
  );
}

// ── OnboardingFlow ─────────────────────────────────────────────────────────────
const _OB_STEPS = [
  {
    pose: 'ola',
    titulo: 'Bem-vindo ao MED-UNIDAVI.',
    capi: 'Sua jornada de 12 fases começa aqui. Estou com você para apoiar o percurso — não para substituir seu tutor ou preceptor.',
  },
  {
    pose: 'dica',
    titulo: 'Seu ecossistema de aprendizagem.',
    capi: 'Cada peça tem papel distinto. O currículo integra método, SUS e ferramentas digitais para construir o raciocínio clínico ao longo das 12 fases.',
    itens: [
      'Tutorial PBL · semanal com seu grupo e tutor',
      'IESC · contato real com a comunidade e APS',
      'Capi-Cards · revisão espaçada baseada em FSRS',
      'Portfólio reflexivo · sua voz sobre o aprendizado',
    ],
  },
  {
    pose: 'pensativo',
    titulo: 'Como prefere aprender?',
    capi: 'Ajuste quando quiser. Não é um teste — é só para eu me adaptar ao seu ritmo.',
    ehPreferencias: true,
  },
];

function OnboardingFlow({ onClose }) {
  const [step, setStep] = React.useState(0);
  const [prefs, setPrefs] = React.useState(_readPrefs);
  const s = _OB_STEPS[step];
  const isLast = step === _OB_STEPS.length - 1;

  const setPref = (k, v) => {
    const n = { ...prefs, [k]: v };
    setPrefs(n); _writePrefs(n);
  };

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(8,16,32,0.55)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 16, fontFamily: 'IBM Plex Sans, sans-serif',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: DS.surface, borderRadius: 18,
        width: '100%', maxWidth: 480, padding: 28,
        boxShadow: '0 24px 60px rgba(8,16,32,0.28)',
        display: 'flex', flexDirection: 'column', gap: 18,
        animation: 'capiBubbleIn 0.4s cubic-bezier(0.16,1,0.3,1)',
        maxHeight: '90vh', overflow: 'auto',
      }}>

        {/* Dots de progresso */}
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
          {_OB_STEPS.map((_, i) => (
            <div key={i} style={{
              height: 8, borderRadius: 4,
              width: i === step ? 22 : 8,
              background: i === step ? DS.blue : DS.borderLight,
              transition: 'all 0.25s',
            }} />
          ))}
        </div>

        {/* Capi + fala */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          {typeof CapiSprite === 'function' && (
            <CapiSprite pose={s.pose} height={76} radius={10} animated />
          )}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: DS.text, marginBottom: 8, letterSpacing: '-0.2px' }}>
              {s.titulo}
            </div>
            <div style={{
              background: DS.bg, borderRadius: '2px 12px 12px 12px',
              padding: '10px 14px', fontSize: 13, color: DS.textSec, lineHeight: 1.65,
              border: `1px solid ${DS.border}`,
            }}>
              {s.capi}
            </div>
          </div>
        </div>

        {/* Ecossistema */}
        {s.itens && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {s.itens.map((it, i) => (
              <div key={i} style={{
                display: 'flex', gap: 10, alignItems: 'flex-start',
                padding: '9px 13px', borderRadius: 8, background: DS.blueLight,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: DS.blue, flexShrink: 0, marginTop: 5 }} />
                <span style={{ fontSize: 13, color: DS.text, fontWeight: 500, lineHeight: 1.4 }}>{it}</span>
              </div>
            ))}
          </div>
        )}

        {/* Preferências inline */}
        {s.ehPreferencias && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { k: 'ritmo',    l: 'Ritmo',    opts: [{ v: 'distribuido', l: 'Distribuído' }, { v: 'intensivo', l: 'Intensivo' }] },
              { k: 'formato',  l: 'Formato',  opts: [{ v: 'video', l: 'Vídeo' }, { v: 'texto', l: 'Texto' }, { v: 'misto', l: 'Misto' }] },
              { k: 'exemplos', l: 'Exemplos', opts: [{ v: 'poucos', l: 'Poucos' }, { v: 'moderado', l: 'Moderado' }, { v: 'muitos', l: 'Muitos' }] },
            ].map(row => (
              <div key={row.k} style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: DS.textSec, minWidth: 80 }}>{row.l}</span>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {row.opts.map(opt => {
                    const on = prefs[row.k] === opt.v;
                    return (
                      <button key={opt.v} onClick={() => setPref(row.k, opt.v)} style={{
                        padding: '5px 14px', borderRadius: 100, cursor: 'pointer',
                        fontFamily: 'inherit', fontSize: 12, fontWeight: 600,
                        background: on ? DS.blueDark : DS.bg,
                        color: on ? '#fff' : DS.textSec,
                        border: `1px solid ${on ? DS.blueDark : DS.border}`,
                        transition: 'all 0.1s',
                      }}>{opt.l}</button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Ações */}
        <div style={{
          display: 'flex', gap: 10, justifyContent: 'flex-end',
          borderTop: `1px solid ${DS.border}`, paddingTop: 16,
        }}>
          <button onClick={onClose} style={{
            padding: '9px 16px', borderRadius: DS.radius, cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
            background: 'transparent', color: DS.textMuted, border: `1px solid ${DS.border}`,
          }}>Agora não</button>
          <button onClick={() => isLast ? onClose() : setStep(s => s + 1)} style={{
            padding: '9px 22px', borderRadius: DS.radius, cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 13, fontWeight: 700,
            background: DS.blue, color: '#fff', border: 'none',
          }}>{isLast ? 'Começar trilha ›' : 'Continuar →'}</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { BlocoPreferencias, OnboardingFlow, _readPrefs });
