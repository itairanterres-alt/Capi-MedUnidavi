
// MED-UNIDAVI 2027 — Screen Components

// ── LOGIN SCREEN ──────────────────────────────────────────────────────────────
// SSO — preparação arquitetural:
// O ponto de integração abaixo (handleLogin) deve ser substituído por uma chamada
// ao SSO institucional UNIDAVI em acesso.unidavi.edu.br. O protocolo (OAuth 2.0,
// SAML 2.0 ou OpenID Connect) será definido pelo Caio + TI/UNIDAVI no kickoff.
// Selo "Login com SSO institucional UNIDAVI" abaixo está oculto por feature flag —
// visível em demo (SSO_DEMO_BADGE = true), oculto em produção até integração ativa.
const SSO_DEMO_BADGE = true; // FEATURE FLAG — desativar em produção
function LoginScreen({ onLogin }) {
  const [loading, setLoading] = React.useState(false);
  const handleLogin = () => {
    // TODO[SSO]: substituir por redirect a acesso.unidavi.edu.br/<protocolo>
    // após handshake com Caio e TI/UNIDAVI.
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1200);
  };
  const isMob = window.innerWidth < 600;

  return (
    <div style={{
      minHeight: '100%', display: 'flex', flexDirection: isMob ? 'column' : 'row',
      background: `linear-gradient(150deg, ${DS.blueDark} 0%, ${DS.blue} 55%, #0353B0 100%)`,
      fontFamily: 'IBM Plex Sans, sans-serif',
      overflow: 'auto',
    }}>
      {/* Left panel — brand (hidden on mobile) */}
      {!isMob && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 56px', color: '#fff' }}>
          <div style={{ maxWidth: 420 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 44 }}>
              <div style={{ width: 46, height: 46, background: DS.terra, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 20, color: '#fff' }}>M</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 19, letterSpacing: '-0.3px' }}>MED-UNIDAVI</div>
                <div style={{ fontSize: 11, opacity: 0.55, fontWeight: 400 }}>Plataforma de Educação Médica</div>
              </div>
            </div>
            <h2 style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.2, margin: '0 0 14px', letterSpacing: '-0.5px' }}>
              Formar médicos para<br />o Alto Vale e para o Brasil.
            </h2>
            <p style={{ fontSize: 14, opacity: 0.7, lineHeight: 1.75, margin: '0 0 36px' }}>
              Metodologia ativa, integração SUS e tecnologia educacional construída especificamente para as DCNs 2025 e o contexto brasileiro.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[['410', 'Estudantes', 'verif. mai/2026'], ['12', 'Fases'], ['Conceito 5', 'MEC'], ['SAEME', 'CFM']].map(([v, l, nota]) => (
                <div key={l} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 16px' }}>
                  <div style={{ fontWeight: 800, fontSize: 17 }}>{v}</div>
                  <div style={{ fontSize: 10, opacity: 0.6 }}>{l}</div>
                  {nota && <div style={{ fontSize: 8.5, opacity: 0.45, marginTop: 1, fontVariantNumeric: 'tabular-nums' }}>{nota}</div>}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 9.5, opacity: 0.4, marginTop: 10, lineHeight: 1.5 }}>
              Nº de estudantes sujeito a confirmação institucional (Itairan) — exibido sempre com a data da última verificação, nunca como constante fixa.
            </div>
          </div>
        </div>
      )}

      {/* Right panel — login form */}
      <div style={{
        width: isMob ? '100%' : 420, flexShrink: 0,
        background: DS.surface,
        display: 'flex', flexDirection: 'column',
        padding: isMob ? '32px 24px 28px' : '48px 40px',
        boxShadow: isMob ? 'none' : '-20px 0 60px rgba(0,0,0,0.25)',
        minHeight: isMob ? '100vh' : 'auto',
      }}>
        {/* Mobile logo */}
        {isMob && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <div style={{ width: 38, height: 38, background: DS.terra, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, color: '#fff' }}>M</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: DS.text }}>MED-UNIDAVI</div>
              <div style={{ fontSize: 10, color: DS.textMuted }}>UNIDAVI · Rio do Sul, SC</div>
            </div>
          </div>
        )}

        <h2 style={{ margin: '0 0 6px', fontSize: isMob ? 22 : 24, fontWeight: 700, color: DS.text }}>Entrar na plataforma</h2>
        <p style={{ margin: '0 0 28px', fontSize: 13, color: DS.textSec, lineHeight: 1.5 }}>Use sua conta institucional UNIDAVI para acessar.</p>

        {/* SSO Button */}
        <button
          onClick={handleLogin}
          style={{
            width: '100%', padding: '13px 20px',
            background: loading ? DS.bg : DS.surface,
            border: `1.5px solid ${DS.border}`,
            borderRadius: DS.radius, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontWeight: 600, fontSize: 14, color: DS.text,
            transition: 'all 0.15s', marginBottom: 16,
            boxShadow: DS.shadow,
          }}
          onMouseEnter={e => !loading && (e.currentTarget.style.background = DS.bg)}
          onMouseLeave={e => e.currentTarget.style.background = loading ? DS.bg : DS.surface}
        >
          {loading ? (
            <span style={{ color: DS.textSec, fontWeight: 400, fontSize: 13 }}>Autenticando com Google Workspace…</span>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Entrar com Google Workspace UNIDAVI</span>
            </>
          )}
        </button>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <span style={{ fontSize: 11, color: DS.textMuted }}>Acesso restrito à comunidade acadêmica UNIDAVI</span>
          {SSO_DEMO_BADGE && (
            <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: DS.amberLight, borderRadius: 100, border: `1px solid ${DS.amber}30` }}>
              <span style={{ fontSize: 10, color: DS.amber, fontWeight: 700 }}>🔐 Em construção</span>
              <span style={{ fontSize: 10, color: DS.textSec }}>SSO institucional UNIDAVI · acesso.unidavi.edu.br</span>
            </div>
          )}
        </div>

        <div style={{ borderTop: `1px solid ${DS.border}`, paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ margin: '0 0 8px', fontSize: 11, color: DS.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Assistente IA na plataforma</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <CapivaraIcon size={38} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: DS.text }}>Capi</div>
              <div style={{ fontSize: 11, color: DS.textMuted }}>Preceptor virtual · presente em todas as áreas</div>
            </div>
          </div>
          <div style={{ display: 'none' }}>
            <CapiAvatar size={38} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: DS.text }}>Gerador de Conteúdo Pedagógico</div>
              <div style={{ fontSize: 11, color: DS.textMuted }}>Questões, resumos e materiais</div>
            </div>
          </div>
          <div style={{ display: 'none' }}>
            <CapivaraDecorativa size={38} />
            <div>
              <div style={{ fontSize: 11, color: DS.textMuted }}>Simulação clínica · Habilidades</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: DS.textMuted, lineHeight: 1.7 }}>
            UNIDAVI · Centro Universitário para o Desenvolvimento do Alto Vale do Itajaí<br />
            Rio do Sul, Santa Catarina · Conceito 5 MEC · Acreditação SAEME/CFM
          </div>
        </div>
      </div>
    </div>
  );
}

// ── DASHBOARD SCREEN ──────────────────────────────────────────────────────────
function DashboardScreen({ onNavigate, isMobile, userName = 'Maria', theme }) {
  const dark = theme === 'dark';
  const bg = dark ? '#0F1824' : DS.bg;
  const surface = dark ? '#162234' : DS.surface;
  const border = dark ? 'rgba(255,255,255,0.09)' : DS.border;
  const text = dark ? '#E8EDF8' : DS.text;
  const textSec = dark ? '#98A8C0' : DS.textSec;
  const textMuted = dark ? '#5A6A80' : DS.textMuted;
  const cardBg = surface;
  const borderLight = dark ? 'rgba(255,255,255,0.05)' : DS.borderLight;

  const todayItems = [
    { type: 'cards', label: 'Revisar 8 flashcards de Farmacologia', sub: 'Antes do TBL das 14h — gerado por FSRS', color: DS.terra, icon: '🃏', screen: 'capi-cards', cta: '8 cards pendentes' },
    { type: 'leitura', label: 'Leitura obrigatória: DPOC — Harrison\'s, cap. 308', sub: 'Tutorial PBL · Grupo C · prazo: 18h', color: DS.blue, icon: '📖', screen: null, cta: 'Leitura' },
    { type: 'entrega', label: 'IESC: Relatório de Visita Domiciliar', sub: 'Prazo: hoje às 23h59 · UBS Bela Vista', color: DS.green, icon: '🏘', screen: null, cta: 'Entrega' },
  ];

  const agenda = [
    { dia: 'Seg', data: 21, ativo: false, eventos: 2 },
    { dia: 'Ter', data: 22, ativo: false, eventos: 1 },
    { dia: 'Qua', data: 23, ativo: true, eventos: 3 },
    { dia: 'Qui', data: 24, ativo: false, eventos: 2 },
    { dia: 'Sex', data: 25, ativo: false, eventos: 1 },
  ];

  const ucs = [
    { nome: 'Morfofuncional III', fase: '3ª Fase', progresso: 68, color: DS.blue },
    { nome: 'IESC III', fase: '3ª Fase', progresso: 52, color: DS.green },
    { nome: 'Tutorial PBL', fase: 'Grupo C', progresso: 80, color: DS.terra },
    { nome: 'Habilidades Profissionais III', fase: '3ª Fase', progresso: 41, color: '#7A5CBF' },
  ];

  const avisos = [
    { texto: 'Lab. de Emergência: operacional em julho/2026. Inscrições abertas até 10/05.', tipo: 'info', icon: '🏥' },
    { texto: 'Teste de Progresso: próxima aplicação em 15/05 às 8h. Confirmação de presença obrigatória.', tipo: 'aviso', icon: '📊' },
  ];

  const cardStyle = (extra = {}) => ({
    background: cardBg,
    borderRadius: DS.radiusLg,
    border: `1px solid ${border}`,
    boxShadow: dark ? 'none' : DS.shadow,
    ...extra,
  });

  return (
    <div style={{ flex: 1, overflow: 'auto', background: bg, fontFamily: 'IBM Plex Sans, sans-serif' }}>

      {/* ── Top bar ── */}
      <div style={{ padding: isMobile ? '18px 16px 14px' : '22px 32px 18px', background: surface, borderBottom: `1px solid ${border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={{ margin: '0 0 3px', fontSize: 11, color: textMuted, fontWeight: 500, letterSpacing: '0.3px' }}>
              QUARTA-FEIRA · 23 DE ABRIL DE 2026 · 3ª FASE
            </p>
            <h1 style={{ margin: '0 0 2px', fontSize: isMobile ? 20 : 22, fontWeight: 700, color: text, letterSpacing: '-0.3px' }}>
              Olá, {userName}.
            </h1>
            <p style={{ margin: 0, fontSize: 13, color: textSec }}>
              Medicina UNIDAVI · Turma 2024 · Grupo C
            </p>
          </div>
          {!isMobile && (
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'flex-end', gap: 10 }}>
              {/* Balão de fala */}
              <CapiBubble tela="dashboard" side="right" />
              {/* Portrait card */}
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                background: dark ? 'rgba(255,255,255,0.06)' : DS.blueLight,
                border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : DS.border}`,
                borderRadius: DS.radiusLg,
                overflow: 'visible',
                minWidth: 80,
              }}>
                <div style={{ overflow: 'hidden', borderRadius: `${DS.radiusLg} ${DS.radiusLg} 0 0`, width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <CapiSprite pose="ola" height={100} radius={0} animated />
                </div>
                <div style={{ padding: '6px 12px 8px', textAlign: 'center' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: text, letterSpacing: '-0.2px' }}>Capi</div>
                  <div style={{ fontSize: 10, color: textMuted, marginTop: 1 }}>Preceptor virtual</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: DS.terra, marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>🔥 12 dias</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: isMobile ? '16px' : '24px 32px', display: 'flex', flexDirection: 'column', gap: 22 }}>

        {/* ── O QUE FAZER HOJE — hero section ── */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: isMobile ? 16 : 18, fontWeight: 800, color: text, letterSpacing: '-0.3px' }}>Missão do Dia 🎯</h2>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: textMuted }}>3 itens para {userName} · Ordenados por urgência</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {todayItems.map((item, i) => (
              <div
                key={i}
                onClick={item.screen ? () => onNavigate(item.screen) : undefined}
                style={{
                  ...cardStyle({ padding: isMobile ? '14px' : '14px 18px' }),
                  display: 'flex', alignItems: 'center', gap: 14,
                  cursor: item.screen ? 'pointer' : 'default',
                  transition: 'box-shadow 0.15s',
                  borderLeft: `3px solid ${item.color}`,
                }}
                onMouseEnter={e => { if (item.screen) e.currentTarget.style.boxShadow = DS.shadowMd; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = dark ? 'none' : DS.shadow; }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 9, background: item.color + (dark ? '30' : '18'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>{item.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: text, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: textMuted }}>{item.sub}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                  <span style={{ padding: '3px 9px', borderRadius: 100, background: item.color + (dark ? '30' : '18'), color: item.color, fontSize: 11, fontWeight: 600 }}>{item.cta}</span>
                  {item.screen && <span style={{ color: textMuted, fontSize: 18, lineHeight: 1 }}>›</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Semana Padrão com Área Verde ── */}
        {!isMobile && (
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <h3 style={{ margin: 0, fontSize: 11, fontWeight: 700, color: textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Semana padrão — 3ª Fase</h3>
              <span style={{ fontSize: 11, color: DS.blue, fontWeight: 600, cursor: 'pointer' }}>Ver agenda completa ›</span>
            </div>
            <div style={{ background: surface, borderRadius: DS.radiusLg, border: `1px solid ${border}`, boxShadow: dark ? 'none' : DS.shadow, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)' }}>
                {[
                  { dia: 'Seg', items: [{ hora: '8h', label: 'Morfofuncional III', color: DS.blue, screen: 'morfofuncional' }, { hora: '14h', label: 'Área Verde', color: DS.green, verde: true }] },
                  { dia: 'Ter', items: [{ hora: '8h', label: 'Tutorial PBL', color: DS.terra, screen: 'ppc' }, { hora: '14h', label: 'Habilidades III', color: '#7A5CBF', screen: null }] },
                  { dia: 'Qua', items: [{ hora: '8h', label: 'Morfofuncional III', color: DS.blue, screen: 'morfofuncional' }, { hora: '14h', label: 'TBL', color: DS.terra, screen: null }] },
                  { dia: 'Qui', items: [{ hora: '8h', label: 'IESC III', color: DS.green, screen: 'iesc' }, { hora: '14h', label: 'Área Verde', color: DS.green, verde: true }] },
                  { dia: 'Sex', items: [{ hora: '8h', label: 'Tutorial PBL', color: DS.terra, screen: 'ppc' }, { hora: '13h', label: 'Habilidades III', color: '#7A5CBF', screen: null }] },
                ].map((col, ci) => (
                  <div key={ci} style={{ borderRight: ci < 4 ? `1px solid ${border}` : 'none' }}>
                    <div style={{ padding: '6px 0', textAlign: 'center', fontSize: 10, fontWeight: 700, color: textMuted, textTransform: 'uppercase', background: dark ? 'rgba(255,255,255,0.04)' : DS.bg, letterSpacing: '0.5px', borderBottom: `1px solid ${border}` }}>{col.dia}</div>
                    {col.items.map((item, ii) => {
                      const [tooltip, setTooltip] = React.useState(false);
                      return (
                        <div key={ii}
                          onClick={() => item.screen ? onNavigate(item.screen) : item.verde ? null : alert(`${item.label} — em construção, aguarda integração de origem do dado`)}
                          onMouseEnter={() => item.verde && setTooltip(true)}
                          onMouseLeave={() => setTooltip(false)}
                          style={{ padding: '8px 10px', borderBottom: ii < col.items.length - 1 ? `1px solid ${border}` : 'none', cursor: item.screen || item.verde ? 'default' : 'pointer', background: item.verde ? DS.greenLight : 'transparent', position: 'relative', transition: 'background 0.1s' }}
                          onMouseOver={e => { if (!item.verde && !item.screen) e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.05)' : DS.bg; }}
                          onMouseOut={e => { e.currentTarget.style.background = item.verde ? DS.greenLight : 'transparent'; }}
                        >
                          <div style={{ fontSize: 9, color: item.verde ? DS.green : textMuted, fontWeight: 600 }}>{item.hora}</div>
                          <div style={{ fontSize: 11, fontWeight: 600, color: item.verde ? DS.green : text, lineHeight: 1.3, marginTop: 2 }}>
                            {item.verde ? '🌿 ' : ''}{item.label}
                          </div>
                          {tooltip && (
                            <div style={{ position: 'absolute', bottom: '100%', left: 0, right: 0, zIndex: 50, background: DS.text, color: '#fff', fontSize: 11, padding: '8px 10px', borderRadius: DS.radiusSm, lineHeight: 1.5, marginBottom: 4 }}>
                              <strong>Área Verde (DCN 2025)</strong> — Tempo protegido para estudo autônomo, atividades extracurriculares, bem-estar e integração com a comunidade. Não pode ser ocupado por atividades obrigatórias.
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Acesso Rápido — vocabulário UNIDAVI institucional ── */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <h3 style={{ margin: 0, fontSize: 11, fontWeight: 700, color: textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Acesso rápido</h3>
            <span style={{ fontSize: 10, color: textMuted, fontStyle: 'italic' }}>links institucionais UNIDAVI</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(5,1fr)', gap: 10 }}>
            {[
              { nome: 'Classroom', sub: 'da minha turma', icon: '🎓', cor: '#1A73E8', url: '#' },
              { nome: 'Mentor Web', sub: 'sistema acadêmico', icon: '📋', cor: DS.blue, url: '#' },
              { nome: 'Pergamum', sub: 'biblioteca', icon: '📚', cor: DS.terra, url: '#' },
              { nome: 'UpToDate', sub: 'evidência clínica', icon: '🔍', cor: DS.green, url: '#' },
              { nome: 'E-mail', sub: '@unidavi.edu.br', icon: '✉️', cor: '#7A5CBF', url: '#' },
            ].map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{
                ...cardStyle({ padding: '12px 14px' }),
                display: 'flex', alignItems: 'center', gap: 10,
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'box-shadow 0.15s, transform 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = DS.shadowMd; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = dark ? 'none' : DS.shadow; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ width: 32, height: 32, borderRadius: 8, background: link.cor + (dark ? '30' : '18'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>{link.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: text, lineHeight: 1.2 }}>{link.nome}</div>
                  <div style={{ fontSize: 10, color: textMuted, marginTop: 1 }}>{link.sub}</div>
                </div>
                <span style={{ fontSize: 11, color: textMuted, flexShrink: 0 }}>↗</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── Agenda + UCs ── */}
        <div style={{ display: 'flex', gap: 18, flexDirection: isMobile ? 'column' : 'row' }}>

          {/* Agenda da semana */}
          <section style={{ flex: isMobile ? 'auto' : '0 0 268px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <h3 style={{ margin: 0, fontSize: 11, fontWeight: 700, color: textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Agenda da semana</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {/* Google Calendar integration badge */}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="17" rx="2" stroke={textMuted} strokeWidth="2"/>
                  <path d="M16 2v4M8 2v4M3 10h18" stroke={textMuted} strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span style={{ fontSize: 10, color: textMuted }}>Google Calendar</span>
              </div>
            </div>
            <div style={cardStyle({ padding: '14px' })}>
              <div style={{ display: 'flex', gap: 5, marginBottom: 14 }}>
                {agenda.map(d => (
                  <div key={d.dia} style={{
                    flex: 1, textAlign: 'center', padding: '7px 3px',
                    borderRadius: 8,
                    background: d.ativo ? DS.blue : (dark ? 'rgba(255,255,255,0.05)' : 'transparent'),
                    border: d.ativo ? 'none' : `1px solid ${border}`,
                    cursor: 'pointer',
                  }}>
                    <div style={{ fontSize: 9, color: d.ativo ? 'rgba(255,255,255,0.65)' : textMuted, fontWeight: 600 }}>{d.dia}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: d.ativo ? '#fff' : text, lineHeight: 1.4 }}>{d.data}</div>
                    {d.eventos > 0 && <div style={{ width: 5, height: 5, borderRadius: '50%', background: d.ativo ? 'rgba(255,255,255,0.8)' : DS.terra, margin: '3px auto 0' }} />}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {[
                  { hora: '08h', titulo: 'Morfofuncional III', local: 'Anfiteatro A', dot: DS.blue },
                  { hora: '14h', titulo: 'TBL — Sist. Respiratório', local: 'Sala TBL 2', dot: DS.terra },
                  { hora: '16h30', titulo: 'Tutorial PBL — Grupo C', local: 'Sala 304', dot: DS.green },
                ].map((ev, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 10, color: DS.blue, fontWeight: 700, minWidth: 34, paddingTop: 1 }}>{ev.hora}</span>
                    <div style={{ width: 3, height: 3, borderRadius: '50%', background: ev.dot, marginTop: 6, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: text, lineHeight: 1.3 }}>{ev.titulo}</div>
                      <div style={{ fontSize: 10, color: textMuted }}>{ev.local}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Status por UC */}
          <section style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <h3 style={{ margin: 0, fontSize: 11, fontWeight: 700, color: textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>UCs em andamento</h3>
              <span
                onClick={() => onNavigate && onNavigate('ppc')}
                style={{ fontSize: 11, color: DS.blue, fontWeight: 600, cursor: 'pointer' }}
              >Ver percurso ›</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {ucs.map((uc, i) => (
                <div key={i} style={cardStyle({ padding: '11px 14px' })}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 12, color: text }}>{uc.nome}</div>
                      <div style={{ fontSize: 10, color: textMuted }}>{uc.fase}</div>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: uc.color }}>{uc.progresso}%</span>
                  </div>
                  <div style={{ background: dark ? 'rgba(255,255,255,0.08)' : DS.borderLight, borderRadius: 100, height: 5, overflow: 'hidden' }}>
                    <div style={{ width: `${uc.progresso}%`, height: '100%', background: uc.color, borderRadius: 100 }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

          {/* ── Nudge Capi · sinal de percurso ── */}
          {!isMobile && (
            <div style={{
              ...cardStyle({ padding: '12px 16px' }),
              display: 'flex', alignItems: 'center', gap: 14,
              borderLeft: `3px solid ${DS.terra}`,
            }}>
              {typeof CapiSprite === 'function' && <CapiSprite pose="pensativo" height={52} radius={8} />}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: DS.terra, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 3 }}>Capi percebe</div>
                <div style={{ fontSize: 13, color: text, fontWeight: 500, lineHeight: 1.4 }}>
                  3 Capi-Cards de Saúde Mental parados há 8 dias.
                </div>
                <div style={{ fontSize: 12, color: DS.textSec, marginTop: 2 }}>Quer começar por aqui?</div>
              </div>
              <button
                onClick={() => onNavigate && onNavigate('capi-cards')}
                style={{
                  padding: '7px 14px', borderRadius: DS.radius, cursor: 'pointer',
                  fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, fontWeight: 700,
                  background: DS.terra, color: '#fff', border: 'none', flexShrink: 0,
                }}>Revisar ›</button>
            </div>
          )}

          {/* ── Acesso rápido ── */}
        <section>
          <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Acesso rápido</h3>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)', gap: 9 }}>
            {[
              { label: 'Capi-Cards', icon: '🃏', screen: 'capi-cards', color: DS.terra },
              { label: 'Meu Treino', icon: '📝', screen: 'questoes', color: DS.blue },
              { label: 'Morfofuncional', icon: '🔬', screen: 'morfofuncional', color: DS.green },
              { label: 'Eventos', icon: '📅', screen: 'eventos', color: '#7A5CBF' },
              { label: 'Portfólio APCs', icon: '📋', screen: 'apcs', color: '#B07A18' },
              { label: 'Biblioteca', icon: '📚', screen: 'biblioteca', color: DS.textMuted },
            ].map((it, i) => (
              <div
                key={i}
                onClick={() => it.screen && onNavigate(it.screen)}
                style={{
                  ...cardStyle({ padding: isMobile ? '12px 6px' : '14px 8px' }),
                  textAlign: 'center', cursor: it.screen ? 'pointer' : 'default',
                  transition: 'box-shadow 0.15s, transform 0.15s',
                }}
                onMouseEnter={e => { if (it.screen) { e.currentTarget.style.boxShadow = DS.shadowMd; e.currentTarget.style.transform = 'translateY(-1px)'; }}}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = dark ? 'none' : DS.shadow; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ fontSize: 22, marginBottom: 5 }}>{it.icon}</div>
                <div style={{ fontSize: 10, fontWeight: 600, color: textSec, lineHeight: 1.3 }}>{it.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Avisos + APCs ── */}
        <div style={{ display: 'flex', gap: 18, flexDirection: isMobile ? 'column' : 'row' }}>
          <section style={{ flex: 2 }}>
            <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Avisos da coordenação</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {avisos.map((av, i) => (
                <div key={i} style={cardStyle({ padding: '12px 14px', display: 'flex', gap: 12, alignItems: 'flex-start' })}>
                  <span style={{ fontSize: 16 }}>{av.icon}</span>
                  <span style={{ fontSize: 12, color: textSec, lineHeight: 1.55 }}>{av.texto}</span>
                </div>
              ))}
            </div>
          </section>

          <section style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>APCs — EPAs em registro</h3>
            <div style={cardStyle({ padding: '16px' })}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: DS.blue, lineHeight: 1 }}>3</div>
                  <div style={{ fontSize: 9, color: textMuted, lineHeight: 1.3 }}>ativas</div>
                </div>
                <div style={{ background: dark ? 'rgba(255,255,255,0.08)' : DS.borderLight, width: 1, height: 36 }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: textMuted, lineHeight: 1 }}>12</div>
                  <div style={{ fontSize: 9, color: textMuted, lineHeight: 1.3 }}>total EPAs</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ background: dark ? 'rgba(255,255,255,0.08)' : DS.borderLight, borderRadius: 100, height: 6, overflow: 'hidden' }}>
                    <div style={{ width: '25%', height: '100%', background: DS.blue, borderRadius: 100 }} />
                  </div>
                  <div style={{ fontSize: 10, color: textMuted, marginTop: 4 }}>3ª Fase</div>
                </div>
              </div>
              <button
                onClick={() => onNavigate('apcs')}
                style={{ width: '100%', padding: '8px', background: 'transparent', border: `1px solid ${border}`, borderRadius: DS.radiusSm, cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11, fontWeight: 600, color: DS.blue }}
              >Ver portfólio completo ›</button>
            </div>
          </section>
        </div>

        {isMobile && <div style={{ height: 72 }} />}
      </div>
    </div>
  );
}

// ── BIBLIOTECA SCREEN — hub único agregando recursos por UC/SP/competência DCN ─
function BibliotecaScreen({ isMobile }) {
  const [busca, setBusca] = React.useState('');
  const [filtro, setFiltro] = React.useState('todos');
  // Bases assinadas pela UNIDAVI (Pergamum, UpToDate, Minha Biblioteca, ScienceDirect,
  // EBSCO, Bireme/Cochrane, COMUT) + bases abertas relevantes à formação médica.
  const recursos = [
    { nome: 'Pergamum', tipo: 'Catálogo institucional', icon: '🗂', desc: 'Catálogo da Biblioteca UNIDAVI — acervo físico e digital', badge: 'UNIDAVI', color: DS.terra, url: '#', formativa: false },
    { nome: 'UpToDate', tipo: 'Base de dados', icon: '🔍', desc: 'Decisões clínicas baseadas em evidências', badge: 'Captura formativa', color: DS.blue, url: '#', formativa: true },
    { nome: 'Minha Biblioteca', tipo: 'E-books', icon: '📚', desc: 'Acervo digital de livros-texto médicos', badge: 'Captura formativa', color: DS.blue, url: '#', formativa: true },
    { nome: 'ScienceDirect (Elsevier)', tipo: 'Base de dados', icon: '🔬', desc: 'Artigos e capítulos científicos', badge: 'Captura formativa', color: DS.blue, url: '#', formativa: true },
    { nome: 'EBSCO Health', tipo: 'Base de dados', icon: '🏥', desc: 'Medicina baseada em evidências', badge: 'Assinada', color: DS.green, url: '#', formativa: false },
    { nome: 'BIREME / Cochrane', tipo: 'Base de dados', icon: '🌎', desc: 'Revisões sistemáticas e literatura latino-americana (LILACS)', badge: 'Assinada', color: DS.green, url: '#', formativa: false },
    { nome: 'COMUT', tipo: 'Comutação bibliográfica', icon: '📨', desc: 'Solicitação de cópias de artigos não disponíveis no acervo', badge: 'Assinada', color: DS.green, url: '#', formativa: false },
    { nome: 'PubMed / PMC', tipo: 'Base de dados', icon: '🧬', desc: 'Literatura biomédica gratuita (NIH)', badge: 'Aberto', color: DS.amber, url: '#', formativa: false },
  ];
  // Bibliografia ATIVA do PPC para a UC que o aluno está cursando (3ª fase — exemplo).
  // Em produção: vem do PPC oficial cruzado com matrícula do estudante.
  const bibliografiaAtiva = [
    { titulo: 'Harrison\'s Principles of Internal Medicine', edicao: '21ª ed., 2022', tipo: 'Básica', uc: 'Morfofuncional III', base: 'Minha Biblioteca' },
    { titulo: 'Tratado de Fisiologia Médica — Guyton & Hall', edicao: '14ª ed., 2021', tipo: 'Básica', uc: 'Morfofuncional III', base: 'Minha Biblioteca' },
    { titulo: 'Robbins & Cotran Patologia', edicao: '10ª ed., 2021', tipo: 'Básica', uc: 'Morfofuncional III', base: 'ScienceDirect' },
    { titulo: 'Saúde Coletiva — Campos et al.', edicao: '2ª ed., 2014', tipo: 'Básica', uc: 'IESC III', base: 'Pergamum' },
    { titulo: 'Bates — Propedêutica Médica', edicao: '13ª ed., 2023', tipo: 'Complementar', uc: 'Habilidades III', base: 'Minha Biblioteca' },
  ];
  const leituraSemana = [
    { titulo: 'DPOC: diagnóstico e manejo ambulatorial', fonte: 'GOLD 2025 Guidelines', fase: '3ª Fase', uc: 'Morfofuncional III' },
    { titulo: 'Insuficiência cardíaca com fração de ejeção reduzida', fonte: 'Harrison\'s, cap. 252', fase: '3ª Fase', uc: 'Tutorial PBL' },
  ];
  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <TopBar title="Biblioteca" subtitle="Hub de bases assinadas + bibliografia do PPC para suas UCs ativas" isMobile={isMobile} />
      <div style={{ padding: isMobile ? '16px' : '24px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Busca */}
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: DS.textMuted }}>🔍</span>
          <input
            value={busca} onChange={e => setBusca(e.target.value)}
            placeholder="Buscar em todos os recursos: artigos, livros, guidelines…"
            style={{
              width: '100%', padding: '12px 16px 12px 40px',
              border: `1.5px solid ${DS.border}`, borderRadius: DS.radius,
              fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 14, color: DS.text,
              background: DS.surface, outline: 'none', boxSizing: 'border-box',
            }}
          />
          {busca && (
            <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: DS.amber, background: DS.amberLight, padding: '3px 8px', borderRadius: 4, fontWeight: 700, border: `1px solid ${DS.amber}30` }}>Em construção — aguarda integração com bases CAPES e UpToDate</span>
          )}
        </div>

        {/* Leitura da semana */}
        <section>
          <SectionHeading>Leitura da semana — curada pelos docentes</SectionHeading>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 12 }}>
            {leituraSemana.map((l, i) => (
              <Card key={i} hover style={{ flex: 1, padding: '16px', borderLeft: `4px solid ${DS.terra}` }}>
                <Badge color={DS.terra}>{l.uc}</Badge>
                <div style={{ fontWeight: 600, fontSize: 14, color: DS.text, margin: '8px 0 4px', lineHeight: 1.4 }}>{l.titulo}</div>
                <div style={{ fontSize: 12, color: DS.textMuted }}>{l.fonte}</div>
              </Card>
            ))}
          </div>
        </section>

        {/* Bibliografia ativa do PPC — para o componente que o aluno está cursando */}
        <section>
          <SectionHeading>Bibliografia do PPC — UCs em curso (3ª fase)</SectionHeading>
          <Card style={{ padding: 0, overflow: 'hidden' }}>
            {bibliografiaAtiva.map((b, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 16px',
                borderBottom: i < bibliografiaAtiva.length - 1 ? `1px solid ${DS.borderLight}` : 'none',
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: b.tipo === 'Básica' ? DS.blueLight : DS.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>📖</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: DS.text, lineHeight: 1.35 }}>{b.titulo}</div>
                  <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 2 }}>{b.edicao} · {b.uc} · disponível em <span style={{ color: DS.blue, fontWeight: 600 }}>{b.base}</span></div>
                </div>
                <Badge color={b.tipo === 'Básica' ? DS.blue : DS.textSec}>{b.tipo}</Badge>
                <Btn variant="secondary" size="sm">Abrir ›</Btn>
              </div>
            ))}
          </Card>
          <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 8, lineHeight: 1.5 }}>
            Bibliografia importada do PPC oficial — atualizada automaticamente quando o NDE revisa o componente.
          </div>
        </section>

        {/* Selo: captura como evidência formativa */}
        <Card style={{ padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start', background: DS.blueLight, borderLeft: `3px solid ${DS.blue}` }}>
          <div style={{ fontSize: 18, marginTop: 1 }}>🪶</div>
          <div style={{ flex: 1, fontSize: 12, color: DS.textSec, lineHeight: 1.55 }}>
            Suas consultas a <strong style={{ color: DS.text }}>UpToDate</strong>, <strong style={{ color: DS.text }}>Minha Biblioteca</strong> e <strong style={{ color: DS.text }}>ScienceDirect</strong> são capturadas como <strong style={{ color: DS.blue }}>evidência formativa</strong> e aparecem no seu portfólio Dreyfus — comprovam estudo independente sem você precisar registrar nada manualmente.
          </div>
        </Card>

        {/* Filtros */}
        <section>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {['todos', 'assinadas', 'abertas', 'e-books', 'catálogo'].map(f => (
              <button key={f} onClick={() => setFiltro(f)} style={{
                padding: '6px 14px', borderRadius: 100, border: `1.5px solid ${filtro === f ? DS.blue : DS.border}`,
                background: filtro === f ? DS.blue : DS.surface, color: filtro === f ? '#fff' : DS.textSec,
                fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 12, cursor: 'pointer',
              }}>{f.charAt(0).toUpperCase() + f.slice(1)}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 12 }}>
            {recursos.map((r, i) => (
              <Card key={i} hover style={{ padding: '16px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: r.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{r.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: DS.text }}>{r.nome}</span>
                    <Badge color={r.color}>{r.badge}</Badge>
                  </div>
                  <div style={{ fontSize: 12, color: DS.textMuted, marginBottom: 8 }}>{r.desc}</div>
                  <Btn variant="secondary" size="sm">Acessar ›</Btn>
                </div>
              </Card>
            ))}
          </div>
        </section>
        {isMobile && <div style={{ height: 60 }} />}
      </div>
    </div>
  );
}

// ── PPC / MAPA DE COMPETÊNCIAS ────────────────────────────────────────────────
function PPCScreen({ isMobile }) {
  const fases = Array.from({ length: 12 }, (_, i) => i + 1);
  const faseAtual = 3;
  const [faseVis, setFaseVis] = React.useState(faseAtual);
  const fasesInfo = {
    1: { titulo: 'Bases da Vida e da Saúde I', ucs: ['Morfofuncional I', 'IESC I', 'Habilidades Profissionais I', 'Tutorial PBL I'] },
    2: { titulo: 'Bases da Vida e da Saúde II', ucs: ['Morfofuncional II', 'IESC II', 'Habilidades Profissionais II', 'Tutorial PBL II'] },
    3: { titulo: 'Bases da Vida e da Saúde III', ucs: ['Morfofuncional III', 'IESC III', 'Habilidades Profissionais III', 'Tutorial PBL III'] },
    4: { titulo: 'Ciclo Básico-Clínico I', ucs: ['Morfofuncional IV', 'IESC IV', 'Semiologia I', 'Tutorial PBL IV'] },
  };

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <TopBar title="Meu percurso" subtitle="Jornada formativa — 12 fases · DCNs 2025" isMobile={isMobile} />
      <div style={{ padding: isMobile ? '16px' : '24px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* ── Split: Trajetória Pedagógica Formativa (OWN) vs Registro Oficial (Mentor) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: 16 }}>
          {/* OWN — Trajetória Formativa */}
          <Card style={{ padding: 0, overflow: 'hidden', borderTop: `3px solid ${DS.blue}` }}>
            <div style={{ padding: '14px 16px', borderBottom: `1px solid ${DS.borderLight}`, background: DS.blueLight }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 14 }}>🌱</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: DS.text }}>Trajetória Pedagógica Formativa</span>
                <Badge color={DS.blue}>MED-UNIDAVI</Badge>
              </div>
              <div style={{ fontSize: 11, color: DS.textSec, lineHeight: 1.5 }}>
                Construída na plataforma — captura formação, não burocracia.
              </div>
            </div>
            <div style={{ padding: 14, display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: 8 }}>
              {[
                { l: 'Matriz programática', s: '12 fases × 27 competências DCN', icon: '🗺' },
                { l: 'Conceitos formativos', s: 'por UC, com narrativa', icon: '💬' },
                { l: 'APCs Dreyfus', s: 'progressão de competência', icon: '🎯' },
                { l: 'Reflexões e TP', s: 'portfólio reflexivo', icon: '✍️' },
              ].map((b, i) => (
                <div key={i} style={{ padding: '10px 12px', background: DS.bg, borderRadius: DS.radiusSm, border: `1px solid ${DS.borderLight}` }}>
                  <div style={{ fontSize: 14, marginBottom: 4 }}>{b.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: DS.text, lineHeight: 1.3 }}>{b.l}</div>
                  <div style={{ fontSize: 10, color: DS.textMuted, marginTop: 2 }}>{b.s}</div>
                </div>
              ))}
            </div>
          </Card>
          {/* LINK — Registro Oficial Mentor */}
          <Card style={{ padding: 0, overflow: 'hidden', borderTop: `3px solid ${DS.terra}` }}>
            <div style={{ padding: '14px 16px', borderBottom: `1px solid ${DS.borderLight}`, background: DS.terraLight }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 14 }}>📋</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: DS.text }}>Registro Oficial</span>
                <Badge color={DS.terra}>Mentor Web</Badge>
              </div>
              <div style={{ fontSize: 11, color: DS.textSec, lineHeight: 1.5 }}>
                Sistema acadêmico institucional UNIDAVI.
              </div>
            </div>
            <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { l: 'Histórico Escolar Oficial', icon: '📜' },
                { l: 'Frequência por Disciplina', icon: '📅' },
                { l: 'Plano de Ensino Oficial', icon: '📄' },
                { l: 'Requerimentos', icon: '📝' },
              ].map((b, i) => (
                <a key={i} href="#" target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 12px', background: DS.surface, border: `1px solid ${DS.borderLight}`, borderRadius: DS.radiusSm,
                  textDecoration: 'none', cursor: 'pointer', transition: 'background 0.1s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = DS.bg}
                  onMouseLeave={e => e.currentTarget.style.background = DS.surface}
                >
                  <span style={{ fontSize: 13 }}>{b.icon}</span>
                  <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: DS.text }}>{b.l}</span>
                  <span style={{ fontSize: 11, color: DS.terra, fontWeight: 700 }}>↗</span>
                </a>
              ))}
            </div>
          </Card>
        </div>

        {/* Timeline de fases */}
        <section>
          <SectionHeading>Jornada de 12 fases</SectionHeading>
          <Card style={{ padding: '20px' }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
              {fases.map(f => {
                const passada = f < faseAtual;
                const atual = f === faseAtual;
                const futura = f > faseAtual;
                return (
                  <button key={f} onClick={() => setFaseVis(f)} style={{
                    width: isMobile ? 36 : 46, height: isMobile ? 36 : 46,
                    borderRadius: 10, border: `2px solid ${atual ? DS.blue : faseVis === f ? DS.terra : passada ? DS.green : DS.border}`,
                    background: atual ? DS.blue : faseVis === f ? DS.terraLight : passada ? DS.greenLight : DS.surface,
                    color: atual ? '#fff' : DS.text, fontWeight: 700, fontSize: 13,
                    cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif',
                    position: 'relative',
                  }}>
                    {passada && <span style={{ position: 'absolute', top: -5, right: -5, fontSize: 10 }}>✓</span>}
                    {f}
                  </button>
                );
              })}
            </div>
            {/* Fase selecionada */}
            {fasesInfo[faseVis] ? (
              <div style={{ background: DS.bg, borderRadius: DS.radius, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <Badge color={faseVis === faseAtual ? DS.blue : faseVis < faseAtual ? DS.green : DS.textMuted}>
                    {faseVis < faseAtual ? 'Concluída' : faseVis === faseAtual ? 'Em andamento' : 'Futura'}
                  </Badge>
                  <span style={{ fontWeight: 700, fontSize: 14, color: DS.text }}>{faseVis}ª Fase — {fasesInfo[faseVis].titulo}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {fasesInfo[faseVis].ucs.map(uc => (
                    <span key={uc} style={{ padding: '4px 10px', background: DS.surface, border: `1px solid ${DS.border}`, borderRadius: 100, fontSize: 12, color: DS.textSec }}>{uc}</span>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ background: DS.bg, borderRadius: DS.radius, padding: 16, color: DS.textMuted, fontSize: 13, textAlign: 'center' }}>
                Detalhamento da {faseVis}ª fase disponível em breve
              </div>
            )}
          </Card>
        </section>

        {/* Mapa 27 competências DCN 2025 */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
            <SectionHeading style={{ margin: 0 }}>27 Competências — DCN 2025</SectionHeading>
            <div style={{ fontSize: 10, color: DS.textMuted, fontStyle: 'italic' }}>
              Agrupamento por área-eixo sujeito a validação NDE · Art. 8º Res. CNE/CES 3/2025
            </div>
          </div>
          <div style={{ marginBottom: 12, display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 11 }}>
            {Object.entries(DCN27_ESTADO).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 12, height: 12, borderRadius: 3, background: v.cor, display: 'inline-block' }}></span>
                <span style={{ color: DS.textSec }}>{v.label}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 12 }}>
            {Object.entries(DCN27_AREAS).map(([areaId, area]) => {
              const comps = dcn27ByArea(areaId);
              return (
                <Card key={areaId} style={{ padding: 0, overflow: 'hidden', borderTop: `3px solid ${area.cor}` }}>
                  <div style={{ padding: '12px 14px', background: area.corBg, borderBottom: `1px solid ${DS.borderLight}` }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                      <div style={{ fontWeight: 800, fontSize: 13, color: area.cor }}>{area.label}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: area.cor }}>{comps.length} comp.</div>
                    </div>
                    <div style={{ fontSize: 10.5, color: DS.textSec, lineHeight: 1.4, marginTop: 2 }}>{area.desc}</div>
                  </div>
                  <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {comps.map(c => {
                      const estado = dcn27EstadoMock(c.id);
                      const E = DCN27_ESTADO[estado];
                      return (
                        <div key={c.id} title={c.resumo} style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          padding: '6px 8px', borderRadius: DS.radiusSm,
                          background: DS.surface, border: `1px solid ${DS.borderLight}`,
                          cursor: 'help',
                        }}>
                          <span style={{
                            minWidth: 28, height: 18, borderRadius: 4, fontSize: 10, fontWeight: 800,
                            background: area.cor, color: '#fff',
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px',
                          }}>C{String(c.n).padStart(2,'0')}</span>
                          <span style={{ flex: 1, fontSize: 11.5, fontWeight: 600, color: DS.text, lineHeight: 1.25 }}>{c.titulo}</span>
                          <span style={{
                            width: 10, height: 10, borderRadius: '50%', background: E.cor, flexShrink: 0,
                          }} title={E.label}></span>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* APCs placeholder */}
        <section>
          <SectionHeading action="Ver portfólio">APCs registradas — 3ª Fase</SectionHeading>
          <Card style={{ padding: '16px' }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {['Anamnese clínica estruturada', 'Exame físico geral', 'Comunicação terapêutica', 'Registro no prontuário'].map((apc, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: i < 2 ? DS.greenLight : DS.amberLight, borderRadius: DS.radius, border: `1px solid ${i < 2 ? DS.green : DS.amber}30` }}>
                  <span style={{ fontSize: 14 }}>{i < 2 ? '✅' : '🔄'}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: DS.text }}>{apc}</span>
                  <Badge color={i < 2 ? DS.green : DS.amber}>{i < 2 ? 'Validada' : 'Em progresso'}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </section>
        {isMobile && <div style={{ height: 60 }} />}
      </div>
    </div>
  );
}

// ── TESTE DE PROGRESSO ────────────────────────────────────────────────────────
function TesteProgressoScreen({ isMobile }) {
  const historico = [
    { sem: '2024.1', nota: 32.4, media: 29.1 },
    { sem: '2024.2', nota: 38.7, media: 31.5 },
    { sem: '2025.1', nota: 44.2, media: 34.8 },
    { sem: '2025.2', nota: 51.8, media: 38.2 },
  ];
  const maxNota = 65;
  const areas = [
    { nome: 'Clínica Médica', nota: 58, mediaT: 44, color: DS.blue },
    { nome: 'Morfofisiologia', nota: 62, mediaT: 51, color: DS.green },
    { nome: 'Farmacologia', nota: 38, mediaT: 42, color: DS.terra },
    { nome: 'Saúde Coletiva', nota: 71, mediaT: 48, color: '#7A5CBF' },
    { nome: 'Bioética', nota: 66, mediaT: 55, color: DS.amber },
    { nome: 'Epidemiologia', nota: 44, mediaT: 46, color: '#6B7FA8' },
  ];
  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <TopBar title="Teste de Progresso" subtitle="Evolução longitudinal · 4 aplicações registradas" isMobile={isMobile} />
      <div style={{ padding: isMobile ? '16px' : '24px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Resumo */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 12 }}>
          {[
            { label: 'Último resultado', valor: '51,8%', sub: '2025.2', color: DS.blue },
            { label: 'Evolução', valor: '+19,4 pp', sub: 'desde o 1º teste', color: DS.green },
            { label: 'Posição na turma', valor: 'Top 22%', sub: '3ª Fase', color: DS.terra },
            { label: 'Próxima aplicação', valor: '15/05', sub: '8h · Presencial', color: '#7A5CBF' },
          ].map((s, i) => (
            <Card key={i} style={{ padding: '16px' }}>
              <div style={{ fontSize: 11, color: DS.textMuted, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.color, lineHeight: 1.1 }}>{s.valor}</div>
              <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 2 }}>{s.sub}</div>
            </Card>
          ))}
        </div>

        {/* Gráfico de evolução */}
        <section>
          <SectionHeading>Evolução histórica vs. média da turma</SectionHeading>
          <Card style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, height: 160, paddingBottom: 8 }}>
              {historico.map((h, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 4, height: 130 }}>
                    {/* Média */}
                    <div style={{ flex: 1, background: DS.border, borderRadius: '4px 4px 0 0', height: `${(h.media / maxNota) * 100}%` }} title={`Média: ${h.media}%`} />
                    {/* Aluno */}
                    <div style={{ flex: 1, background: DS.blue, borderRadius: '4px 4px 0 0', height: `${(h.nota / maxNota) * 100}%` }} title={`Sua nota: ${h.nota}%`} />
                  </div>
                  <div style={{ fontSize: 10, color: DS.textMuted, textAlign: 'center' }}>{h.sem}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 12, height: 12, background: DS.blue, borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: DS.textSec }}>Seu desempenho</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 12, height: 12, background: DS.border, borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: DS.textSec }}>Média da turma</span>
              </div>
            </div>
          </Card>
        </section>

        {/* Por área */}
        <section>
          <SectionHeading>Desempenho por área — último teste</SectionHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {areas.map((a, i) => (
              <Card key={i} style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontWeight: 600, fontSize: 13, color: DS.text }}>{a.nome}</span>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: DS.textMuted }}>Turma: {a.mediaT}%</span>
                    <span style={{ fontWeight: 700, color: a.nota >= a.mediaT ? DS.green : DS.terra, fontSize: 14 }}>{a.nota}%</span>
                  </div>
                </div>
                <div style={{ position: 'relative', height: 6 }}>
                  <ProgressBar value={a.nota} color={a.nota >= a.mediaT ? DS.green : DS.terra} height={6} />
                  <div style={{ position: 'absolute', top: -2, left: `${a.mediaT}%`, width: 2, height: 10, background: DS.textMuted, borderRadius: 1 }} />
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Recomendação */}
        <Card style={{ padding: '16px', borderLeft: `4px solid ${DS.terra}`, background: DS.terraLight }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <CapiAvatar size={36} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: DS.text, marginBottom: 4 }}>Recomendação do Capi</div>
              <div style={{ fontSize: 13, color: DS.textSec, lineHeight: 1.6 }}>
                Seu desempenho em <strong>Farmacologia</strong> está abaixo da média da turma. Recomendo revisar os cards de receptores adrenérgicos e mecanismos de ação de beta-bloqueadores antes do próximo teste.
              </div>
              <div style={{ marginTop: 10 }}>
                <Btn variant="terra" size="sm" icon="🃏">Abrir Capi-Cards de Farmacologia</Btn>
              </div>
            </div>
          </div>
        </Card>
        {isMobile && <div style={{ height: 60 }} />}
      </div>
    </div>
  );
}

// ── CAPI-CARDS (FSRS) — ITEM 8 ────────────────────────────────────────────────
function renderClozeFrente(texto) {
  // Renders {{c1::conteudo}} as highlighted blank
  return texto.split(/(\{\{c\d+::[^}]+\}\})/g).map((part, i) => {
    const m = part.match(/\{\{c\d+::([^}]+)\}\}/);
    if (m) return <span key={i} style={{ background: DS.blue, color: '#fff', borderRadius: 4, padding: '1px 6px', fontWeight: 700 }}>[{m[1]}]</span>;
    return <span key={i}>{part}</span>;
  });
}

function CapiCardsScreen({ onNavigate, isMobile }) {
  const [fase, setFase] = React.useState('empty');
  const [cardIdx, setCardIdx] = React.useState(0);
  const [mostrarResposta, setMostrarResposta] = React.useState(false);
  const [respostas, setRespostas] = React.useState([]);
  const [upToDateAberto, setUpToDateAberto] = React.useState(false);

  const decks = [
    { nome: 'Farmacologia', sub: 'Sistema nervoso autônomo', pendentes: 8, novas: 3, color: DS.terra },
    { nome: 'Morfofuncional III', sub: 'Sistema respiratório', pendentes: 5, novas: 0, color: DS.blue },
    { nome: 'IESC', sub: 'Atenção primária à saúde', pendentes: 2, novas: 2, color: DS.green },
  ];

  // 5 cards padrão final: 2 com cloze, 1 com imagem na frente
  const cards = [
    {
      frente: 'Qual o mecanismo de ação dos β-bloqueadores no tratamento da insuficiência cardíaca?',
      temImagem: false, temCloze: false,
      verso: {
        resposta: 'Bloqueio competitivo dos receptores β1-adrenérgicos → ↓FC, ↓contratilidade, ↓consumo O₂ miocárdico. Em ICC, revertem remodelamento cardíaco patológico (redução da pós-carga e remodelamento reverso).',
        justificativa: 'Na ICC sistólica, a ativação crônica do SNS é deletéria — os β-bloqueadores interrompem esse ciclo. Carvedilol (β1+β2+α1), bisoprolol e metoprolol succinato têm evidência de redução de mortalidade (MERIT-HF, CIBIS-II, COPERNICUS). Início em doses baixas + titulação gradual.',
        referencia: 'Diretriz SBC de ICC Crônica e Aguda, 2023. Arq Bras Cardiol.',
        tags: { fase: '3ª', uc: 'Morfofuncional III', sp: 'Dispneia crônica', disciplina: 'Farmacologia' },
      },
    },
    {
      frente: '{{c1::VEF1/CVF < 0,70}} pós-broncodilatador é o critério espirométrico fixo do {{c2::GOLD}} para diagnóstico de DPOC.',
      temImagem: false, temCloze: true,
      verso: {
        resposta: 'VEF1/CVF < 0,70 pós-broncodilatador (critério GOLD fixo). O grau de obstrução é classificado pelo VEF1% do previsto: GOLD 1 ≥80%, GOLD 2 50–79%, GOLD 3 30–49%, GOLD 4 <30%.',
        justificativa: 'A relação VEF1/CVF pós-BD < 0,70 define obstrução irreversível (ou parcialmente reversível) do fluxo aéreo. Diferença com asma: reversibilidade completa com BD (VEF1 ↑>12% e >200 mL). O diagnóstico de DPOC é espirométrico + contexto clínico.',
        referencia: 'GOLD 2025 — Global Strategy for Prevention, Diagnosis and Management of COPD.',
        tags: { fase: '3ª', uc: 'Morfofuncional III', sp: 'Tosse crônica', disciplina: 'Pneumologia' },
      },
    },
    {
      frente: 'O que é uma EPA (Entrustable Professional Activity) e como se relaciona com as DCNs 2025?',
      temImagem: false, temCloze: false,
      verso: {
        resposta: 'EPA é uma tarefa profissional fundamental que um aprendiz pode executar de forma independente quando demonstrou competência suficiente para receber confiança (entrustment) do supervisor.',
        justificativa: 'As DCNs 2025 organizam as competências médicas em EPAs que integram conhecimento, habilidade e atitude em atividades clínicas observáveis e avaliáveis. Diferente de competências isoladas, EPAs são holísticas e contextualizadas. Exemplos: realizar anamnese e exame físico, prescrever medicamentos seguros.',
        referencia: 'DCNs Medicina 2025 — Resolução CNE/CES; Ten Cate O. Med Teach. 2013.',
        tags: { fase: '3ª', uc: 'IESC III', sp: 'Transversal', disciplina: 'Educação Médica' },
      },
    },
    {
      frente: '{{c1::Glicosídeos cardíacos}} inibem a {{c2::Na⁺/K⁺-ATPase}} → ↑Na⁺ intracelular → ↑Ca²⁺ via NCX → ↑contratilidade.',
      temImagem: false, temCloze: true,
      verso: {
        resposta: 'Glicosídeos cardíacos (ex.: digoxina) inibem a Na⁺/K⁺-ATPase → ↑Na⁺ intracelular → trocador Na⁺/Ca²⁺ (NCX) inverte → ↑Ca²⁺ → inotrópico positivo.',
        justificativa: 'Indicações atuais na ICC: FA com resposta ventricular rápida (controle FC) e ICC sistólica refratária. Janela terapêutica estreita: nível sérico alvo 0,5–0,9 ng/mL (doses mais altas aumentam mortalidade). Toxicidade: náusea, visão amarelada (xantopsia), arritmias (BAV, ESV).',
        referencia: 'Goodman & Gilman — Farmacologia Terapêutica, 13ª ed.; Diretriz SBC ICC 2023.',
        tags: { fase: '3ª', uc: 'Morfofuncional III', sp: 'Dispneia crônica', disciplina: 'Farmacologia' },
      },
    },
    {
      frente: '[Histologia] Cardiomiócito em H&E ×400 — identifique as estruturas marcadas na imagem.',
      temImagem: true, disciplinaImagem: 'Histologia', temCloze: false,
      verso: {
        resposta: 'Estruturas visíveis: (1) Estrias transversais — bandas A e I (actina+miosina); (2) Discos intercalares — junções comunicantes (gap junctions) + desmossomas; (3) Núcleo central oval; (4) Mitocôndrias abundantes (25–35% do volume celular).',
        justificativa: 'Os discos intercalares são exclusivos do músculo cardíaco e garantem acoplamento elétrico e mecânico entre cardiomiócitos. As junções comunicantes (conexinas 43 e 40) permitem propagação rápida do potencial de ação. Ausentes no músculo esquelético.',
        referencia: 'Junqueira & Carneiro — Histologia Básica, 13ª ed., cap. Tecido Muscular.',
        tags: { fase: '1ª', uc: 'UC2', sp: 'Transversal', disciplina: 'Histologia' },
      },
    },
  ];

  const handleResposta = (nivel) => {
    const novas = [...respostas, nivel];
    setRespostas(novas);
    if (cardIdx + 1 < cards.length) {
      setCardIdx(i => i + 1);
      setMostrarResposta(false);
      setUpToDateAberto(false);
    } else {
      setFase('done');
    }
  };

  if (fase === 'empty') {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: DS.bg }}>
        <TopBar title="Capi-Cards" subtitle="Revisão espaçada FSRS" isMobile={isMobile} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, gap: 16, maxHeight: '80vh' }}>
          <CapiSprite pose="anotando" height={isMobile ? 160 : 200} radius={16} animated />
          <CapiBubble tela="capi-cards" style={{ textAlign: 'center', borderRadius: '10px 10px 10px 2px' }} />
          <div style={{ textAlign: 'center', maxWidth: 320 }}>
            <h2 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 700, color: DS.text }}>Pronto para começar?</h2>
            <p style={{ margin: '0 0 20px', fontSize: 14, color: DS.textSec, lineHeight: 1.65 }}>
              Seus primeiros decks aparecerão aqui. O FSRS calcula automaticamente o melhor momento de revisão para cada card.
            </p>
            <button
              onClick={() => setFase('select')}
              style={{ padding: '10px 24px', borderRadius: DS.radius, background: DS.blue, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 14 }}
            >
              Ver meus decks
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (fase === 'select') {
    return (
      <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
        <TopBar title="Capi-Cards" subtitle="Revisão espaçada FSRS — estude o que você precisa hoje" isMobile={isMobile} />
        <div style={{ padding: isMobile ? '16px' : '24px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <SectionHeading>Seus decks</SectionHeading>
          {decks.map((d, i) => (
            <Card key={i} hover onClick={() => { setFase('session'); setCardIdx(0); setMostrarResposta(false); setRespostas([]); }}
              style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: d.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>🃏</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: DS.text }}>{d.nome}</div>
                <div style={{ fontSize: 12, color: DS.textMuted }}>{d.sub}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                  {d.pendentes > 0 && <Badge color={DS.terra}>{d.pendentes} para revisar</Badge>}
                  {d.novas > 0 && <Badge color={DS.blue}>{d.novas} novas</Badge>}
                </div>
              </div>
              <span style={{ fontSize: 20, color: DS.textMuted }}>›</span>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (fase === 'done') {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: DS.bg, padding: 32 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
        <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: DS.text }}>Sessão concluída!</h2>
        <p style={{ margin: '0 0 24px', color: DS.textSec, textAlign: 'center' }}>Você revisou {cards.length} cards de Farmacologia. FSRS já calculou o próximo intervalo de revisão.</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <Btn variant="primary" onClick={() => onNavigate('dashboard')}>Voltar ao início</Btn>
          <Btn variant="secondary" onClick={() => { setFase('session'); setCardIdx(0); setMostrarResposta(false); setRespostas([]); }}>Estudar mais</Btn>
        </div>
      </div>
    );
  }

  // Session
  const card = cards[cardIdx];
  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <div style={{ padding: isMobile ? '16px 16px 12px' : '20px 32px 16px', background: DS.surface, borderBottom: `1px solid ${DS.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16, color: DS.text }}>Capi-Cards — Farmacologia</div>
          <div style={{ fontSize: 12, color: DS.textMuted }}>Card {cardIdx + 1} de {cards.length} · Revisão FSRS</div>
        </div>
        <Btn variant="ghost" size="sm" onClick={() => onNavigate('dashboard')}>Pausar</Btn>
      </div>

      <div style={{ padding: isMobile ? '20px 16px' : '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        {/* Progress */}
        <div style={{ width: '100%', maxWidth: 600 }}>
          <ProgressBar value={cardIdx} max={cards.length} color={DS.terra} height={4} />
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 8, alignSelf: 'flex-start', width: '100%', maxWidth: 600, flexWrap: 'wrap' }}>
          {card.temCloze && <Badge color={DS.blue}>Cloze</Badge>}
          {card.verso && <Badge color={DS.textMuted}>{card.verso.tags.disciplina}</Badge>}
          {card.verso && <Badge color={DS.textMuted}>{card.verso.tags.fase} Fase</Badge>}
        </div>

        {/* Card frente */}
        <Card style={{ width: '100%', maxWidth: 600, padding: '28px 24px', textAlign: 'center', minHeight: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          {card.temImagem && (
            <div style={{ width: '100%', height: 120, borderRadius: DS.radius, background: `repeating-linear-gradient(135deg, ${DS.blueLight} 0px, ${DS.blueLight} 8px, ${DS.bg} 8px, ${DS.bg} 18px)`, border: `1.5px dashed ${DS.blue}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 11, color: DS.blue, fontFamily: 'monospace', fontWeight: 700 }}>{card.disciplinaImagem} — imagem placeholder</span>
            </div>
          )}
          <p style={{ margin: 0, fontSize: isMobile ? 15 : 17, fontWeight: 600, color: DS.text, lineHeight: 1.65 }}>
            {card.temCloze ? renderClozeFrente(card.frente) : card.frente}
          </p>
        </Card>

        {!mostrarResposta ? (
          <Btn variant="primary" size="lg" onClick={() => setMostrarResposta(true)}>Ver resposta</Btn>
        ) : (
          <>
            {/* Card verso — 4 blocos */}
            <Card style={{ width: '100%', maxWidth: 600, padding: '0', overflow: 'hidden', borderTop: `3px solid ${DS.green}` }}>
              {[
                { num: '①', label: 'Resposta', content: card.verso.resposta, bold: true, bg: DS.greenLight, labelColor: DS.green },
                { num: '②', label: 'Justificativa', content: card.verso.justificativa, bold: false, bg: DS.surface, labelColor: DS.textMuted },
                { num: '③', label: 'Referência', content: card.verso.referencia, bold: false, bg: DS.bg, labelColor: DS.textMuted },
              ].map((bloco, i) => (
                <div key={i} style={{ padding: '14px 20px', borderBottom: `1px solid ${DS.borderLight}`, background: bloco.bg }}>
                  <div style={{ fontSize: 10, color: bloco.labelColor, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 5 }}>{bloco.num} {bloco.label}</div>
                  <p style={{ margin: 0, fontSize: 13, color: DS.text, lineHeight: 1.7, fontWeight: bloco.bold ? 700 : 400 }}>{bloco.content}</p>
                </div>
              ))}
              {/* ④ Tags */}
              <div style={{ padding: '12px 20px', background: DS.surface }}>
                <div style={{ fontSize: 10, color: DS.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>④ Tags estruturais</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <Badge color={DS.blue}>{card.verso.tags.fase} Fase</Badge>
                  <Badge color={DS.textMuted}>{card.verso.tags.uc}</Badge>
                  <Badge color={DS.terra}>{card.verso.tags.disciplina}</Badge>
                  {card.verso.tags.sp && <Badge color={DS.green}>SP: {card.verso.tags.sp}</Badge>}
                </div>
              </div>
              {/* Aprofundar */}
              <div style={{ padding: '10px 20px 14px', background: DS.surface, borderTop: `1px solid ${DS.borderLight}` }}>
                <button onClick={() => setUpToDateAberto(true)} style={{ padding: '6px 14px', borderRadius: DS.radiusSm, background: DS.blueLight, border: `1px solid ${DS.blue}30`, color: DS.blue, fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Aprofundar no UpToDate ↗
                </button>
              </div>
            </Card>

            {/* Rating FSRS */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: '100%', maxWidth: 600 }}>
              <div style={{ fontSize: 13, color: DS.textMuted, fontWeight: 500 }}>Como foi sua memória?</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, width: '100%' }}>
                {[
                  { label: 'Novamente', intervalo: '1 dia',  color: '#D94F4F', val: 1 },
                  { label: 'Difícil',   intervalo: '4 dias', color: '#E08A2E', val: 2 },
                  { label: 'Bom',       intervalo: '12 dias', color: DS.blue,  val: 3 },
                  { label: 'Fácil',     intervalo: '30 dias', color: DS.green, val: 4 },
                ].map(r => (
                  <button key={r.val} onClick={() => handleResposta(r.val)} style={{
                    padding: '12px 8px', border: `2px solid ${r.color}40`,
                    borderRadius: DS.radius, background: r.color + '10',
                    cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                    transition: 'all 0.1s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = r.color + '25'}
                  onMouseLeave={e => e.currentTarget.style.background = r.color + '10'}
                  >
                    <span style={{ fontSize: 13, fontWeight: 700, color: r.color }}>{r.label}</span>
                    <span style={{ fontSize: 11, color: r.color, opacity: 0.85, fontWeight: 500 }}>{r.intervalo}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
        {isMobile && <div style={{ height: 60 }} />}
      </div>

      {/* UpToDate side panel */}
      {upToDateAberto && (
        <div style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: isMobile ? '100%' : 360, background: DS.surface, borderLeft: `1px solid ${DS.border}`, boxShadow: '-8px 0 32px rgba(0,0,0,0.12)', zIndex: 100, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${DS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: DS.text }}>UpToDate</div>
              <div style={{ fontSize: 11, color: DS.textMuted }}>{card.verso.tags.disciplina} — Leitura de aprofundamento</div>
            </div>
            <button onClick={() => setUpToDateAberto(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: DS.textMuted }}>✕</button>
          </div>
          <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
            <div style={{ height: 100, background: `repeating-linear-gradient(45deg, ${DS.blueLight}, ${DS.blueLight} 6px, ${DS.bg} 6px, ${DS.bg} 14px)`, borderRadius: DS.radius, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1.5px dashed ${DS.blue}40` }}>
              <span style={{ fontSize: 11, color: DS.blue, fontFamily: 'monospace', fontWeight: 700 }}>deep link UpToDate — {card.verso.tags.disciplina}</span>
            </div>
            <p style={{ fontSize: 13, color: DS.textSec, lineHeight: 1.7, marginBottom: 12 }}>Conteúdo de referência clínica contextualizado ao card atual será carregado aqui via deep link integrado ao UpToDate institucional UNIDAVI.</p>
            <div style={{ padding: '10px 12px', background: DS.bg, borderRadius: DS.radiusSm, fontSize: 12, color: DS.textMuted }}><strong>Referência do card:</strong> {card.verso.referencia}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── PLACEHOLDER SCREENS ───────────────────────────────────────────────────────
function PlaceholderScreen({ title, icon, desc, isMobile, persona }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: DS.bg, padding: 40, gap: 16 }}>
      {persona ? persona : <div style={{ fontSize: 56 }}>{icon}</div>}
      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: DS.text }}>{title}</h2>
      <p style={{ margin: 0, fontSize: 14, color: DS.textSec, textAlign: 'center', maxWidth: 400, lineHeight: 1.6 }}>{desc}</p>
      <StatusFlag kind="flag" criterio="aguarda decisão institucional sobre escopo desta tela" />
    </div>
  );
}

// ── DASHBOARD COORDENAÇÃO ─────────────────────────────────────────────────────
function CoordenacaoScreen({ isMobile, onNavigate, subRoute }) {
  const [exportando, setExportando] = React.useState(false);
  const [filtros, setFiltros] = React.useState({ turmas: [], fases: [], status: [], competencia: null });
  const [busca, setBusca] = React.useState('');
  const [drilldown, setDrilldown] = React.useState(null); // { fase, indicador }

  const abrirAluno = (aluno) => {
    setDrilldown(null);
    if (window.__abrirPerfilAluno) window.__abrirPerfilAluno('coordenacao');
    else if (onNavigate) onNavigate('perfil-aluno');
  };

  const fases = [
    { f: '1ª', ap: 94, tp: 61.2, apcs: 100 },
    { f: '2ª', ap: 91, tp: 58.4, apcs: 98  },
    { f: '3ª', ap: 88, tp: 54.1, apcs: 72  },
    { f: '4ª', ap: 85, tp: 51.8, apcs: 61  },
    { f: '5ª', ap: 82, tp: 49.3, apcs: 55  },
    { f: '6ª', ap: 79, tp: 46.7, apcs: 48  },
    { f: '7ª', ap: 83, tp: 48.2, apcs: 44  },
    { f: '8ª', ap: 80, tp: 47.1, apcs: 39  },
    { f: '9ª', ap: 86, tp: 50.3, apcs: 35  },
    { f:'10ª', ap: 88, tp: 52.6, apcs: 31  },
    { f:'11ª', ap: 91, tp: 55.0, apcs: 24  },
    { f:'12ª', ap: 93, tp: 58.8, apcs: 18  },
  ];

  const heatColor = (v, min, max) => {
    const pct = (v - min) / (max - min);
    if (pct >= 0.75) return '#1E7A4A';
    if (pct >= 0.5)  return '#2A8A5C';
    if (pct >= 0.35) return '#B07A18';
    return '#C4622D';
  };

  const turmas = [
    { label: 'Turma 2023', color: '#7A5CBF', data: [28.1,33.4,37.8,42.1,46.5,50.2] },
    { label: 'Turma 2024', color: DS.blueAcc, data: [30.2,35.7,40.1,45.3,49.8,null] },
    { label: 'Turma 2025', color: DS.terra,   data: [31.8,37.2,42.4,null,null,null]  },
  ];
  const semestres = ['2024.1','2024.2','2025.1','2025.2','2026.1','2026.2'];

  const alertas = [
    { tipo: 'risco',  icon: '⚠️', texto: '3 alunos da 6ª Fase com 2+ reprovações consecutivas — risco de evasão', acao: 'Ver alunos' },
    { tipo: 'uc',     icon: '📉', texto: 'UC "Semiologia II" (5ª Fase): média Teste de Progresso 31% abaixo da média institucional', acao: 'Detalhar UC' },
    { tipo: 'risco',  icon: '⚠️', texto: '1 aluno da 8ª Fase sem registro de APC nos últimos 45 dias', acao: 'Ver aluno' },
    { tipo: 'info',   icon: '📋', texto: 'Relatório NDE/CPA: prazo de entrega em 12/05/2026', acao: 'Gerar relatório' },
  ];

  const producao = [
    { nome: 'Prof. Zanis',    cards: 47, casos: 12, apcs: 38, foto: null, cor: DS.blue },
    { nome: 'Profa. Beatriz', cards: 31, casos: 8,  apcs: 22, foto: null, cor: DS.green },
    { nome: 'Prof. Marcos',   cards: 28, casos: 5,  apcs: 19, foto: null, cor: DS.terra },
    { nome: 'Profa. Carla',   cards: 22, casos: 3,  apcs: 14, foto: null, cor: '#7A5CBF' },
  ];

  const macros = [
    { label: 'Taxa de aprovação geral', valor: '86,3%', delta: '+2,1%', color: DS.green },
    { label: 'Média Teste de Progresso', valor: '51,8%', delta: '+8,4 pp', color: DS.blue },
    { label: 'APCs concluídas', valor: '2.847', delta: '73% meta', color: DS.terra },
    { label: 'Índice de evasão', valor: '3,2%', delta: '−0,8%', color: DS.green },
  ];

  const maxTP = 65;

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg, fontFamily: 'IBM Plex Sans, sans-serif' }}>
      {/* Top bar */}
      <div style={{ padding: isMobile ? '16px' : '20px 32px', background: DS.surface, borderBottom: `1px solid ${DS.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: DS.blueAcc }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px' }}>Visão Coordenação</span>
          </div>
          <h1 style={{ margin: '2px 0 0', fontSize: isMobile ? 18 : 22, fontWeight: 700, color: DS.text }}>Dashboard de Coordenação</h1>
          <p style={{ margin: 0, fontSize: 12, color: DS.textSec }}>Prof. Zanis · Medicina UNIDAVI · Atualizado em 24/04/2026 às 08:12</p>
        </div>
        <button
          onClick={() => { setExportando(true); setTimeout(() => setExportando(false), 2000); }}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 18px', borderRadius: DS.radius,
            background: exportando ? DS.green : DS.blue, color: '#fff',
            border: 'none', cursor: 'pointer',
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 13,
            transition: 'background 0.3s',
          }}
        >
          <span>{exportando ? '✓' : '↓'}</span>
          {exportando ? 'Exportado!' : 'Exportar NDE/CPA/MEC'}
        </button>
      </div>

      <div style={{ padding: isMobile ? '16px' : '24px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* ITEM 15 — Filtros globais e busca */}
        <CoordFiltrosBusca isMobile={isMobile} filtros={filtros} setFiltros={setFiltros}
          busca={busca} setBusca={setBusca} onAbrirAluno={abrirAluno} />

        {/* Indicadores macro */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 12 }}>
          {macros.map((m, i) => (
            <div key={i} style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, padding: '16px', boxShadow: DS.shadow }}>
              <div style={{ fontSize: 10, color: DS.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>{m.label}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: DS.text, lineHeight: 1.1 }}>{m.valor}</div>
              <div style={{ fontSize: 11, color: m.color, fontWeight: 600, marginTop: 4 }}>{m.delta} vs. ano anterior</div>
            </div>
          ))}
        </div>

        {/* Mapa de calor + Alertas side by side */}
        <div style={{ display: 'flex', gap: 20, flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start' }}>

          {/* Mapa de calor */}
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
                    {['Aprovação', 'Média TP', 'APCs %'].map(h => (
                      <th key={h} style={{ padding: '6px 10px', textAlign: 'center', color: DS.textMuted, fontWeight: 600, fontSize: 11, borderBottom: `1px solid ${DS.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fases.map((f, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${DS.borderLight}` }}>
                      <td style={{ padding: '7px 10px', fontWeight: 700, color: DS.text }}>{f.f}</td>
                      <td style={{ padding: '7px 10px', textAlign: 'center' }}>
                        <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 6, background: heatColor(f.ap, 70, 97) + '22', color: heatColor(f.ap, 70, 97), fontWeight: 700, fontSize: 12 }}>{f.ap}%</span>
                      </td>
                      <td style={{ padding: '7px 10px', textAlign: 'center' }}>
                        <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 6, background: heatColor(f.tp, 40, 65) + '22', color: heatColor(f.tp, 40, 65), fontWeight: 700, fontSize: 12 }}>{f.tp}%</span>
                      </td>
                      <td style={{ padding: '7px 10px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ flex: 1, background: DS.borderLight, borderRadius: 100, height: 6, overflow: 'hidden' }}>
                            <div style={{ width: `${f.apcs}%`, height: '100%', background: heatColor(f.apcs, 15, 100), borderRadius: 100 }} />
                          </div>
                          <span style={{ fontSize: 11, fontWeight: 600, color: heatColor(f.apcs, 15, 100), minWidth: 32 }}>{f.apcs}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Alertas institucionais */}
          <section style={{ flex: isMobile ? 'auto' : '0 0 280px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Alertas institucionais</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {alertas.map((a, i) => (
                <div key={i} style={{
                  background: DS.surface, borderRadius: DS.radius, border: `1px solid ${DS.border}`,
                  padding: '12px 14px', boxShadow: DS.shadow,
                  borderLeft: `3px solid ${a.tipo === 'risco' ? DS.terra : DS.blue}`,
                }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
                    <span style={{ fontSize: 14 }}>{a.icon}</span>
                    <span style={{ fontSize: 12, color: DS.textSec, lineHeight: 1.5, flex: 1 }}>{a.texto}</span>
                  </div>
                  <button style={{
                    padding: '4px 10px', borderRadius: DS.radiusSm, border: `1px solid ${DS.border}`,
                    background: 'transparent', cursor: 'pointer', fontSize: 11, fontWeight: 600,
                    color: DS.blue, fontFamily: 'IBM Plex Sans, sans-serif',
                  }}>{a.acao} ›</button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Teste de Progresso — comparativo por turma */}
        <section>
          <div style={{ marginBottom: 10 }}>
            <h3 style={{ margin: 0, fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Teste de Progresso — evolução longitudinal por turma</h3>
          </div>
          <div style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, padding: '20px', boxShadow: DS.shadow }}>
            {/* Chart */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: isMobile ? 8 : 16, height: 160, paddingBottom: 8, marginBottom: 12 }}>
              {semestres.map((sem, si) => (
                <div key={si} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <div style={{ width: '100%', display: 'flex', gap: 3, justifyContent: 'center', alignItems: 'flex-end', height: 140 }}>
                    {turmas.map((t, ti) => {
                      const v = t.data[si];
                      if (!v) return <div key={ti} style={{ flex: 1, background: DS.borderLight, borderRadius: '3px 3px 0 0', height: '10%', opacity: 0.4 }} />;
                      return (
                        <div key={ti} title={`${t.label}: ${v}%`} style={{
                          flex: 1, background: t.color, borderRadius: '3px 3px 0 0',
                          height: `${(v / maxTP) * 100}%`, transition: 'height 0.5s ease',
                          opacity: 0.85,
                        }} />
                      );
                    })}
                  </div>
                  <div style={{ fontSize: 9, color: DS.textMuted, textAlign: 'center' }}>{sem}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {turmas.map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 2, background: t.color }} />
                  <span style={{ fontSize: 11, color: DS.textSec }}>{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Produção docente */}
        <section>
          <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Quadro de produção docente</h3>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: 12 }}>
            {producao.map((p, i) => (
              <div key={i} style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, padding: '16px', boxShadow: DS.shadow, display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: p.cor + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.cor, fontWeight: 800, fontSize: 16, flexShrink: 0 }}>
                  {p.nome.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: DS.text, marginBottom: 6 }}>{p.nome}</div>
                  <div style={{ display: 'flex', gap: 14 }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: DS.blue }}>{p.cards}</div>
                      <div style={{ fontSize: 9, color: DS.textMuted }}>Cards</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: DS.green }}>{p.casos}</div>
                      <div style={{ fontSize: 9, color: DS.textMuted }}>Simulação Clínica</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: DS.terra }}>{p.apcs}</div>
                      <div style={{ fontSize: 9, color: DS.textMuted }}>APCs</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ITEM 11: Saúde do Banco ── */}
        <section>
          <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Saúde do banco — questões e cards</h3>
          <div style={{ display: 'flex', gap: 18, flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start' }}>
            {/* Produção por docente */}
            <div style={{ flex: 2 }}>
              <div style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, padding: '18px', boxShadow: DS.shadow }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 14 }}>Produção por docente</div>
                {[
                  { nome: 'Profa. Paola Lima', questoes: 28, cards: 64, cor: DS.blue },
                  { nome: 'Prof. Tiago Cardoso', questoes: 22, cards: 45, cor: DS.green },
                  { nome: 'Prof. Leandro Pires', questoes: 15, cards: 38, cor: DS.terra },
                  { nome: 'Profa. Camila Souza', questoes: 9, cards: 22, cor: '#7A5CBF' },
                ].map((d, i) => (
                  <div key={i} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: DS.text }}>{d.nome}</span>
                      <div style={{ display: 'flex', gap: 10, fontSize: 11 }}>
                        <span style={{ color: DS.blue }}>{d.questoes} questões</span>
                        <span style={{ color: DS.textMuted }}>{d.cards} cards</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <div style={{ flex: d.questoes, background: d.cor, height: 8, borderRadius: 4, maxWidth: `${d.questoes * 2}px` }} />
                      <div style={{ flex: d.cards - d.questoes, background: d.cor + '50', height: 8, borderRadius: 4, maxWidth: `${(d.cards - d.questoes) * 1.2}px` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Índices psicométricos + status */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, padding: '16px', boxShadow: DS.shadow }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 }}>Índices psicométricos agregados</div>
                {[
                  { label: 'Dificuldade média', valor: '0,58', meta: '0,40–0,70', ok: true },
                  { label: 'Discriminação média', valor: '0,31', meta: '≥ 0,20', ok: true },
                  { label: 'Em revisão (disc. < 0,20)', valor: '4 questões', meta: '', ok: false },
                ].map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: i < 2 ? `1px solid ${DS.borderLight}` : 'none' }}>
                    <span style={{ fontSize: 12, color: DS.textSec }}>{m.label}</span>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: m.ok ? DS.green : DS.amber }}>{m.valor}</div>
                      {m.meta && <div style={{ fontSize: 10, color: DS.textMuted }}>meta: {m.meta}</div>}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, padding: '16px', boxShadow: DS.shadow }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>Status do banco</div>
                {[
                  { label: 'Rascunho', n: 12, color: DS.textMuted },
                  { label: 'Em validação', n: 8, color: DS.amber },
                  { label: 'Validada', n: 54, color: DS.green },
                  { label: 'Para revisão', n: 4, color: DS.terra },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: 12, color: DS.text }}>{s.label}</span>
                    <span style={{ fontWeight: 700, fontSize: 13, color: s.color }}>{s.n}</span>
                    <div style={{ width: 60, background: DS.borderLight, borderRadius: 4, height: 5, overflow: 'hidden' }}>
                      <div style={{ width: `${(s.n / 78) * 100}%`, height: '100%', background: s.color, borderRadius: 4 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── ITEM 11: Atividades de Treino ── */}
        <section>
          <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Atividades de treino — por turma e fase</h3>
          <div style={{ display: 'flex', gap: 18, flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start' }}>
            {/* Agregados */}
            <div style={{ flex: 1 }}>
              <div style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, padding: '18px', boxShadow: DS.shadow }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 14 }}>Turma 2024 — 3ª Fase (agregado, sem ranking individual)</div>
                {[
                  { label: 'Cards revisados este mês', valor: '1.840', icon: '🃏' },
                  { label: 'Questões respondidas', valor: '620', icon: '📝' },
                  { label: 'Tempo médio na plataforma / dia', valor: '38 min', icon: '⏱' },
                  { label: 'Reflexões publicadas', valor: '47', icon: '✍' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0', borderBottom: i < 3 ? `1px solid ${DS.borderLight}` : 'none' }}>
                    <span style={{ fontSize: 18 }}>{item.icon}</span>
                    <span style={{ flex: 1, fontSize: 12, color: DS.textSec }}>{item.label}</span>
                    <span style={{ fontWeight: 800, fontSize: 16, color: DS.blue }}>{item.valor}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Heatmap por área-eixo DCN 2025 (3 áreas · agregação das 27 competências) */}
            <div style={{ flex: 2 }}>
              <div style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, padding: '18px', boxShadow: DS.shadow }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4 }}>Heatmap por área-eixo DCN 2025 — Turma 2024</div>
                <div style={{ fontSize: 11, color: DS.textMuted, marginBottom: 14 }}>Agregação institucional das 27 competências em 3 áreas (Art. 6º). Drilldown abre matriz competência × fase.</div>
                {Object.entries(DCN27_AREAS).map(([areaId, area]) => {
                  // Distribuição mock das competências da área entre os 4 estados (resumo agregado)
                  const comps = dcn27ByArea(areaId);
                  const dist = comps.reduce((acc, c) => {
                    const e = dcn27EstadoMock(c.id);
                    acc[e] = (acc[e] || 0) + 1;
                    return acc;
                  }, {});
                  const total = comps.length;
                  // Estado predominante para colorir o card
                  const ordem = ['insuficiente', 'precisaMelhorar', 'pendente', 'suficiente'];
                  const ordemPct = ordem.map(e => ({ e, pct: (dist[e] || 0) / total }));
                  let estado = ordemPct.reduce((a, b) => (a.pct >= b.pct ? a : b)).e;
                  // Heurística simples: se >50% suficientes, dá suficiente
                  if ((dist.suficiente || 0) / total > 0.5) estado = 'suficiente';
                  const E = DCN27_ESTADO[estado];
                  const segments = [
                    { k: 'suficiente',      cor: DCN27_ESTADO.suficiente.cor      },
                    { k: 'precisaMelhorar', cor: DCN27_ESTADO.precisaMelhorar.cor },
                    { k: 'insuficiente',    cor: DCN27_ESTADO.insuficiente.cor    },
                    { k: 'pendente',        cor: DCN27_ESTADO.pendente.cor        },
                  ];
                  return (
                    <button key={areaId} onClick={() => setDrilldown({ tipo: 'area', area: areaId, titulo: area.label, estado })}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: DS.radiusSm, background: E.corBg, marginBottom: 6, border: `1px solid ${E.corBorda}`, cursor: 'pointer', textAlign: 'left' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: area.cor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 11, flexShrink: 0 }}>{total}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12.5, color: DS.text, fontWeight: 700 }}>{area.label}</div>
                        <div style={{ fontSize: 10.5, color: DS.textSec, marginTop: 1 }}>{total} competências · predominante {E.label.toLowerCase()}</div>
                      </div>
                      {/* Mini stacked bar dos 4 estados */}
                      <div style={{ display: 'flex', width: 110, height: 10, borderRadius: 4, overflow: 'hidden', flexShrink: 0, border: `1px solid ${DS.borderLight}` }}>
                        {segments.map(s => {
                          const n = dist[s.k] || 0;
                          if (!n) return null;
                          return <div key={s.k} title={`${DCN27_ESTADO[s.k].label}: ${n}/${total}`} style={{ flex: n, background: s.cor }} />;
                        })}
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

        {/* ITEM 15 — Matriz Competências × Fase (27 × 12) */}
        <CoordMatriz27x12 isMobile={isMobile} onCelula={(c) => setDrilldown(c)} />

        {/* Drilldown panel */}
        {drilldown && <CoordDrilldown drilldown={drilldown} onClose={() => setDrilldown(null)} onAbrirAluno={abrirAluno} isMobile={isMobile} />}

        {isMobile && <div style={{ height: 60 }} />}
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
function DocenteScreen({ isMobile, onNavigate, subRoute }) {
  const alunos = [
    { nome: 'Ana Lima',     fase: '3ª', turma: 'T16', status: 'ok',     tp: 58, tpHist: [42, 48, 52, 55, 58], dreyfusMed: 3.0, dreyfusTrend: 'up',   apcs: 3, ultRefl: { data: '12/09', titulo: 'SP4 — pneumonia comunitária' }, proxApc: { data: '02/10', epa: 'EPA-3 Exame físico' } },
    { nome: 'Carlos Sousa', fase: '3ª', turma: 'T16', status: 'risco',  tp: 31, tpHist: [40, 38, 35, 33, 31], dreyfusMed: 1.6, dreyfusTrend: 'down', apcs: 1, ultRefl: { data: '02/08', titulo: 'Tutorial — frustração com SP3' }, proxApc: { data: '28/09', epa: 'EPA-2 Anamnese' } },
    { nome: 'Fernanda Reis',fase: '5ª', turma: 'T14', status: 'ok',     tp: 52, tpHist: [44, 47, 49, 51, 52], dreyfusMed: 3.4, dreyfusTrend: 'up',   apcs: 5, ultRefl: { data: '14/09', titulo: 'IESC — visita à família BSV-009' }, proxApc: { data: '05/10', epa: 'EPA-4 Plano diagnóstico' } },
    { nome: 'João Melo',    fase: '5ª', turma: 'T14', status: 'atencao',tp: 41, tpHist: [50, 54, 58, 49, 41], dreyfusMed: 2.5, dreyfusTrend: 'down', apcs: 2, ultRefl: { data: '14/09', titulo: 'Limites da minha escuta em entrevistas difíceis' }, proxApc: { data: '03/10', epa: 'EPA-2 Anamnese' } },
    { nome: 'Livia Torres', fase: '3ª', turma: 'T16', status: 'ok',     tp: 63, tpHist: [55, 58, 61, 62, 63], dreyfusMed: 3.2, dreyfusTrend: 'up',   apcs: 4, ultRefl: { data: '11/09', titulo: 'Bioética — confidencialidade' }, proxApc: { data: '01/10', epa: 'EPA-3 Exame físico' } },
    { nome: 'Pedro Vilas',  fase: '6ª', turma: 'T13', status: 'risco',  tp: 28, tpHist: [38, 35, 32, 30, 28], dreyfusMed: 1.8, dreyfusTrend: 'down', apcs: 0, ultRefl: { data: '20/07', titulo: 'Sobrecarga e dúvidas no curso' }, proxApc: { data: '06/10', epa: 'EPA-2 Anamnese' } },
  ];

  const apcsAvaliar = [
    { aluno: 'Ana Lima',     epa: 'Anamnese clínica estruturada',    data: '22/04', fase: '3ª' },
    { aluno: 'Livia Torres', epa: 'Registro em prontuário SOAP',     data: '23/04', fase: '3ª' },
    { aluno: 'Fernanda Reis',epa: 'Exame físico do aparelho resp.',  data: '21/04', fase: '5ª' },
  ];

  const conteudoIA = [
    { titulo: 'Resumo: Hipertensão arterial — 3ª Fase', tipo: 'Resumo', uc: 'Morfofuncional III', data: '23/04' },
    { titulo: '5 questões DPOC — Nível R1', tipo: 'Questões', uc: 'Tutorial PBL', data: '22/04' },
    { titulo: 'Mapa conceitual: Coagulação', tipo: 'Mapa', uc: 'Morfofuncional III', data: '20/04' },
  ];

  const casosSim = [
    { titulo: 'Dor torácica aguda — caso clínico III', aluno: 'Carlos Sousa', etapa: '2º feedback', data: '23/04' },
    { titulo: 'Dispneia progressiva em idoso', aluno: 'João Melo', etapa: '1º feedback', data: '22/04' },
  ];

  const reflexoesPendentes = [
    { aluno: 'João Melo',     data: '14/09', titulo: 'Limites da minha escuta em entrevistas difíceis', categoria: 'Tutorial' },
    { aluno: 'Carlos Sousa',  data: '02/08', titulo: 'Tutorial — frustração com SP3', categoria: 'Tutorial' },
    { aluno: 'Fernanda Reis', data: '14/09', titulo: 'IESC — visita à família BSV-009', categoria: 'IESC' },
  ];

  // alertas atitudinais aparecem só com triangulação suficiente
  const alertasAtitudinais = []; // mock: nenhum tutorado dispara nesta demo

  const statusColor = { ok: DS.green, risco: DS.terra, atencao: DS.amber };
  const statusLabel = { ok: 'Regular', risco: 'Em risco', atencao: 'Atenção' };

  // Sparkline tiny para TP histórico
  const Sparkline = ({ data, color }) => {
    const max = Math.max(...data, 1), min = Math.min(...data);
    const range = max - min || 1;
    const w = 60, h = 18;
    const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');
    return (
      <svg width={w} height={h} style={{ display: 'block' }}>
        <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" />
      </svg>
    );
  };

  const TrendArrow = ({ dir }) => (
    <span style={{ color: dir === 'up' ? DS.green : DS.terra, fontSize: 11, fontWeight: 700 }}>
      {dir === 'up' ? '↗' : '↘'}
    </span>
  );

  const abrirPerfil = (aluno) => {
    if (window.__abrirPerfilAluno) window.__abrirPerfilAluno('docente');
    else if (onNavigate) onNavigate('perfil-aluno');
  };

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg, fontFamily: 'IBM Plex Sans, sans-serif' }}>
      {/* Top bar */}
      <div style={{ padding: isMobile ? '16px' : '20px 32px', background: DS.surface, borderBottom: `1px solid ${DS.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: DS.green }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px' }}>Visão Docente / Tutor</span>
        </div>
        <h1 style={{ margin: 0, fontSize: isMobile ? 18 : 22, fontWeight: 700, color: DS.text }}>Painel do Tutor</h1>
        <p style={{ margin: 0, fontSize: 12, color: DS.textSec }}>6 alunos sob tutoria · 3 APCs pendentes · 2 casos de simulação aguardando</p>
      </div>

      <div style={{ padding: isMobile ? '16px' : '24px 32px', display: 'flex', flexDirection: 'column', gap: 22 }}>

        {/* Tendência da turma sob tutoria — Dreyfus médio */}
        <section>
          <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Tendência da turma · Dreyfus médio (últimos 5 meses)</h3>
          <div style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, padding: 16, boxShadow: DS.shadow }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 80, paddingBottom: 6, borderBottom: `1px solid ${DS.border}` }}>
              {alunos.map((a, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }} title={`${a.nome}: Dreyfus médio ${a.dreyfusMed}`}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: DS.text }}>{a.dreyfusMed.toFixed(1)}</span>
                  <div style={{ width: '70%', height: `${(a.dreyfusMed / 5) * 60}px`, background: a.dreyfusMed >= 3 ? DS.green : a.dreyfusMed >= 2 ? DS.amber : DS.terra, borderRadius: '3px 3px 0 0' }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
              {alunos.map((a, i) => (
                <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 9, color: DS.textMuted }}>
                  {a.nome.split(' ')[0]}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: DS.textMuted, fontStyle: 'italic' }}>
              João Melo e Pedro Vilas estão descolando do grupo — sinais de Atenção/Risco.
            </div>
          </div>
        </section>

        {/* Alunos sob tutoria — agora cards expandidos clicáveis */}
        <section>
          <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Alunos sob tutoria · clique no card para abrir o Perfil do Aluno</h3>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: 10 }}>
            {alunos.map((a, i) => (
              <div key={i} onClick={() => abrirPerfil(a)} style={{
                background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`,
                padding: '14px', boxShadow: DS.shadow, cursor: 'pointer',
                borderLeft: `3px solid ${statusColor[a.status]}`,
              }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: statusColor[a.status] + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: statusColor[a.status], fontSize: 14, flexShrink: 0 }}>
                    {a.nome.split(' ').map(w => w[0]).join('')}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                      <span style={{ fontWeight: 700, fontSize: 13, color: DS.text }}>{a.nome}</span>
                      <span style={{ padding: '2px 8px', borderRadius: 100, background: statusColor[a.status] + '18', color: statusColor[a.status], fontSize: 10, fontWeight: 700 }}>{statusLabel[a.status]}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 10, fontSize: 11, color: DS.textMuted }}>
                      <span>{a.turma} · {a.fase} Fase</span>
                      <span>APCs: <strong style={{ color: DS.blue }}>{a.apcs}</strong></span>
                    </div>
                  </div>
                </div>
                {/* Bloco expandido — TP sparkline, Dreyfus, Última reflexão, Próxima APC */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, paddingTop: 10, borderTop: `1px solid ${DS.border}` }}>
                  <div>
                    <div style={{ fontSize: 9, color: DS.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>TP atual + histórico</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                      <strong style={{ color: a.tp >= 45 ? DS.green : DS.terra, fontSize: 14 }}>{a.tp}%</strong>
                      <Sparkline data={a.tpHist} color={a.tp >= 45 ? DS.green : DS.terra} />
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: DS.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Dreyfus médio APCs</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: DS.text, marginTop: 2 }}>
                      {a.dreyfusMed.toFixed(1)}/5 <TrendArrow dir={a.dreyfusTrend} />
                    </div>
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <div style={{ fontSize: 9, color: DS.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Última reflexão</div>
                    <div style={{ fontSize: 11, color: DS.text, marginTop: 2 }}>{a.ultRefl.data} — {a.ultRefl.titulo}</div>
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <div style={{ fontSize: 9, color: DS.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Próxima APC</div>
                    <div style={{ fontSize: 11, color: DS.text, marginTop: 2 }}>{a.proxApc.data} · {a.proxApc.epa}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reflexões aguardando devolutiva formativa */}
        <section>
          <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Reflexões aguardando devolutiva formativa</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {reflexoesPendentes.map((r, i) => (
              <div key={i} style={{ background: DS.surface, borderRadius: DS.radius, border: `1px solid ${DS.border}`, padding: '12px 14px', boxShadow: DS.shadow, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontSize: 11, color: DS.textMuted }}>{r.aluno} · {r.categoria} · {r.data}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: DS.text, marginTop: 2 }}>{r.titulo}</div>
                </div>
                <button style={{ padding: '5px 12px', borderRadius: DS.radiusSm, background: DS.blue, color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 11, fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Dar devolutiva ›
                </button>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8, fontSize: 10, color: DS.textMuted, fontStyle: 'italic' }}>
            Devolutiva estruturada em 4 campos: o que foi bom · o que pode melhorar · o que incorporar · sugestões.
          </div>
        </section>

        {/* Alertas atitudinais — só renderiza com triangulação suficiente */}
        {alertasAtitudinais.length > 0 && (
          <section>
            <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: DS.amber, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Alertas atitudinais</h3>
            {/* alertas */}
          </section>
        )}

        <div style={{ display: 'flex', gap: 20, flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start' }}>

          {/* APCs pendentes */}
          <section style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <h3 style={{ margin: 0, fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>APCs pendentes de avaliação</h3>
              <span style={{ background: DS.terra + '18', color: DS.terra, fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 100 }}>{apcsAvaliar.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {apcsAvaliar.map((a, i) => (
                <div key={i} style={{ background: DS.surface, borderRadius: DS.radius, border: `1px solid ${DS.border}`, padding: '12px 14px', boxShadow: DS.shadow }}>
                  <div style={{ fontWeight: 600, fontSize: 12, color: DS.text, marginBottom: 3 }}>{a.epa}</div>
                  <div style={{ fontSize: 11, color: DS.textMuted, marginBottom: 8 }}>{a.aluno} · {a.fase} Fase · Enviado em {a.data}</div>
                  <button style={{ padding: '5px 12px', borderRadius: DS.radiusSm, background: DS.blue, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 11 }}>
                    Avaliar ›
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Conteúdo Gerador Pedagógico + Casos de Simulação */}
          <section style={{ flex: 1 }}>
            {/* Conteúdo IA */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <CapiAvatar size={24} />
                <h3 style={{ margin: 0, fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Conteúdo gerado por IA aguardando validação</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {conteudoIA.map((c, i) => (
                  <div key={i} style={{ background: DS.surface, borderRadius: DS.radius, border: `1px solid ${DS.border}`, padding: '11px 14px', boxShadow: DS.shadow, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 12, color: DS.text }}>{c.titulo}</div>
                      <div style={{ fontSize: 10, color: DS.textMuted }}>{c.uc} · {c.data}</div>
                    </div>
                    <span style={{ padding: '2px 8px', borderRadius: 100, background: DS.blue + '18', color: DS.blue, fontSize: 10, fontWeight: 700 }}>{c.tipo}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Casos de Simulação */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <CapivaraIcon size={24} />
                <h3 style={{ margin: 0, fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Casos de Simulação aguardando revisão</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {casosSim.map((c, i) => (
                  <div key={i} style={{ background: DS.surface, borderRadius: DS.radius, border: `1px solid ${DS.border}`, padding: '11px 14px', boxShadow: DS.shadow }}>
                    <div style={{ fontWeight: 600, fontSize: 12, color: DS.text, marginBottom: 3 }}>{c.titulo}</div>
                    <div style={{ fontSize: 11, color: DS.textMuted, marginBottom: 8 }}>{c.aluno} · {c.etapa} · {c.data}</div>
                    <button style={{ padding: '5px 12px', borderRadius: DS.radiusSm, background: DS.green, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 11 }}>
                      Revisar caso ›
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        {isMobile && <div style={{ height: 60 }} />}
      </div>
    </div>
  );
}

Object.assign(window, {
  LoginScreen, DashboardScreen, BibliotecaScreen, PPCScreen,
  TesteProgressoScreen, CapiCardsScreen, PlaceholderScreen,
  CoordenacaoScreen, DocenteScreen,
});
