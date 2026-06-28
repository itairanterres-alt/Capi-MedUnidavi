
// MED-UNIDAVI 2027 — Shared Components
// Design System: IBM Plex Sans, azul #1D50A8, terracota #C4622D

const DS = {
  blue: '#023E88',       // Pantone 7687C — azul primário UNIDAVI oficial
  blueAcc: '#00ADEF',   // Pantone 2995C — azul secundário UNIDAVI oficial
  blueDark: '#012D65',
  blueLight: '#E6EDF8',
  blueMid: '#0353B0',
  terra: '#C4622D',
  terraLight: '#FDF0EA',
  green: '#2A8A5C',
  greenLight: '#E6F4ED',
  amber: '#B07A18',
  amberLight: '#FDF5E0',
  bg: '#F5F7FC',
  surface: '#FFFFFF',
  border: '#DDE3F0',
  borderLight: '#EEF1F8',
  text: '#1A2438',
  textSec: '#5A6480',
  textMuted: '#8E97B0',
  shadow: '0 1px 4px rgba(26,36,56,0.08)',
  shadowMd: '0 4px 16px rgba(26,36,56,0.10)',
  radius: '10px',
  radiusLg: '14px',
  radiusSm: '6px',
};

// ── Nav items ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'dashboard',     label: 'Início',               icon: '⌂' },
  { id: 'biblioteca',    label: 'Biblioteca',            icon: '📚' },
  { id: 'unicards',      label: 'Capi-Cards',            icon: '🃏' },
  { id: 'ppc',           label: 'Meu Percurso',          icon: '🗺' },
  { id: 'iesc',          label: 'IESC',                  icon: '🏘' },
  { id: 'morfofuncional',label: 'Morfofuncional',        icon: '🔬' },
  { id: 'questoes',      label: 'Meu Treino',            icon: '📝' },
  { id: 'imagens',       label: 'Banco de Imagens',      icon: '🖼' },
  { id: 'eventos',       label: 'Eventos',               icon: '📅' },
  { id: 'progresso',     label: 'Teste de Progresso',    icon: '📊' },
  { id: 'simdavi',       label: 'Simulação Clínica',     icon: '🩺' },
  { id: 'pratica',       label: 'Prática Clínica',       icon: '🩺' },
  { id: 'apcs',          label: 'Portfólio APCs',        icon: '📋' },
  { id: 'reflexivo',     label: 'Portfólio Reflexivo',   icon: '✍' },
  { id: 'ic',            label: 'Iniciação Científica',  icon: '🧫' },
];

// ── Persona image avatars ─────────────────────────────────────────────────────
// Helpers
function _PersonaImg({ src, alt, size, pos = 'top center' }) {
  const resolved = (typeof window !== 'undefined' && typeof window.__resolveAsset === 'function') ? window.__resolveAsset(src) : src;
  return (
    <img
      src={resolved} alt={alt}
      style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover',
               objectPosition: pos, flexShrink: 0, display: 'block' }}
    />
  );
}

// ── BLOCO 0 (rev. abr/2026) ──────────────────────────────────────────────────
// Sistema de personas reduzido a UMA identidade visual: a Capivara.
// Rostos humanos (Dr. Capi humano, Prof. Davi, Dra. Uni, Dra. Valle) foram
// removidos. Os antigos avatares humanos viraram aliases da Capivara — assim
// todas as call sites continuam funcionando sem reescrever cada tela. As
// modulações contextuais (clínica/treino/metodológica/território) ficam para
// rodada futura; por ora uma capivara só.
//
// Nome textual "Capi" é PRESERVADO (já em produção com 120 internos via
// Gemini). Os nomes "Davi", "Uni" e "Valle" foram removidos dos cabeçalhos
// visuais — as telas que ainda os mencionavam textualmente passam a usar
// nome funcional ou só o título da tela.

function CapivaraDecorativa({ size = 80 }) {
  return <_PersonaImg src="uploads/Dr capivara.png" alt="" size={size} pos="center" />;
}

// Aliases — todos apontam para a Capivara. Mantidos para compat com call sites.
function CapivaraIcon({ size = 36 }) { return <CapivaraDecorativa size={size} />; }
function CapiAvatar  ({ size = 36 }) { return <CapivaraDecorativa size={size} />; }
const DaviAvatar = CapiAvatar; // alias retrocompat — call sites antigos
function UniAvatar   ({ size = 36 }) { return <CapivaraDecorativa size={size} />; }
function ValleAvatar ({ size = 36 }) { return <CapivaraDecorativa size={size} />; }

// ── Disclaimer de persona IA ──────────────────────────────────────────────────
function AIDisclaimer({ text, style: extra = {} }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 10,
      padding: '10px 14px', borderRadius: DS.radiusSm,
      background: '#FFF8EC', border: '1px solid #E8C96A',
      fontSize: 11, color: '#7A5C10', lineHeight: 1.6,
      ...extra,
    }}>
      <span style={{ fontSize: 13, flexShrink: 0, marginTop: 1 }}>⚠</span>
      <span>{text}</span>
    </div>
  );
}

// ── Avatar placeholder ────────────────────────────────────────────────────────
function Avatar({ initials, color = DS.blue, size = 36 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'IBM Plex Sans, sans-serif',
      fontWeight: 700, fontSize: size * 0.38,
      flexShrink: 0,
      letterSpacing: '-0.5px',
    }}>{initials}</div>
  );
}

// ── Character chip (Dr. Capi) ────────────────────────────────────
function CharacterChip({ name, initials, color, subtitle }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '8px 12px', background: DS.surface,
      borderRadius: DS.radius, border: `1px solid ${DS.border}`,
      boxShadow: DS.shadow,
    }}>
      <Avatar initials={initials} color={color} size={32} />
      <div>
        <div style={{ fontWeight: 600, fontSize: 13, color: DS.text }}>{name}</div>
        {subtitle && <div style={{ fontSize: 11, color: DS.textMuted }}>{subtitle}</div>}
      </div>
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────────
function Badge({ children, color = DS.blue, bg }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: 100,
      background: bg || color + '18',
      color: color,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.2px',
    }}>{children}</span>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────
function Card({ children, style = {}, onClick, hover = false }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hover && setHov(true)}
      onMouseLeave={() => hover && setHov(false)}
      style={{
        background: DS.surface,
        borderRadius: DS.radiusLg,
        border: `1px solid ${DS.border}`,
        boxShadow: hov ? DS.shadowMd : DS.shadow,
        transition: 'box-shadow 0.15s, transform 0.15s',
        transform: hov ? 'translateY(-1px)' : 'none',
        cursor: onClick ? 'pointer' : 'default',
        ...style
      }}
    >{children}</div>
  );
}

// ── Button ────────────────────────────────────────────────────────────────────
function Btn({ children, variant = 'primary', size = 'md', onClick, style = {}, icon }) {
  const [hov, setHov] = React.useState(false);
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    border: 'none', cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif',
    fontWeight: 600, borderRadius: DS.radius, transition: 'all 0.15s',
    ...style,
  };
  const sizes = { sm: { padding: '6px 14px', fontSize: 12 }, md: { padding: '9px 18px', fontSize: 13 }, lg: { padding: '12px 24px', fontSize: 15 } };
  const variants = {
    primary: { background: hov ? DS.blueDark : DS.blue, color: '#fff' },
    secondary: { background: hov ? DS.blueLight : '#F0F4FF', color: DS.blue, border: `1px solid ${DS.border}` },
    terra: { background: hov ? '#A8501F' : DS.terra, color: '#fff' },
    ghost: { background: hov ? DS.bg : 'transparent', color: DS.textSec, border: `1px solid ${DS.border}` },
    success: { background: hov ? '#1E6E47' : DS.green, color: '#fff' },
  };
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ ...base, ...sizes[size], ...variants[variant] }}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

// ── Progress bar ──────────────────────────────────────────────────────────────
function ProgressBar({ value, max = 100, color = DS.blue, height = 6 }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ background: DS.borderLight, borderRadius: 100, height, overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 100, transition: 'width 0.5s ease' }} />
    </div>
  );
}

// ── Section heading ───────────────────────────────────────────────────────────
function SectionHeading({ children, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
      <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>{children}</h3>
      {action && <span style={{ fontSize: 12, color: DS.blue, fontWeight: 600, cursor: 'pointer' }}>{action}</span>}
    </div>
  );
}

// ── Sidebar perfis contextuais ────────────────────────────────────────────────
const NAV_ITEMS_COORD = [
  { id: 'coordenacao',     label: 'Visão Geral',                 icon: '⌂' },
  { id: 'coord-fase',      label: 'Por Fase',                     icon: '📚' },
  { id: 'coord-aluno',     label: 'Por Aluno',                    icon: '👤' },
  { id: 'coord-comp',      label: 'Por Competência',              icon: '🎯' },
  { id: 'coord-banco',     label: 'Saúde do Banco',               icon: '🗂' },
  { id: 'coord-treino',    label: 'Atividades de Treino',         icon: '📝' },
  { id: 'coord-npcmed',    label: 'NPCMed',                       icon: '🧫' },
  { id: 'coord-relat',     label: 'Relatórios NDE/CPA/MEC',       icon: '📊' },
];
const NAV_ITEMS_DOC = [
  { id: 'docente',         label: 'Meus Tutorados',               icon: '👥' },
  { id: 'doc-aval',        label: 'Avaliações Pendentes',         icon: '✅' },
  { id: 'doc-davi',        label: 'Conteúdo Pedagógico a Validar', icon: '🤖' },
  { id: 'doc-sim',         label: 'Casos de Simulação a Revisar', icon: '🩺' },
  { id: 'imagens',         label: 'Banco de Imagens',             icon: '🖼' },
  { id: 'gerador',         label: 'Gerador Pedagógico',           icon: '✍' },
];
const PROFILE_THEME = {
  estudante:   { bg: DS.blueDark, accent: DS.blueAcc, label: null,                    labelBg: null,        labelFg: null },
  coordenacao: { bg: '#091830',   accent: DS.blueAcc, label: 'VISÃO COORDENAÇÃO',     labelBg: DS.blueAcc,  labelFg: '#062046' },
  docente:     { bg: '#0E4A4A',   accent: '#5DD3D3',  label: 'VISÃO DOCENTE',         labelBg: '#5DD3D3',   labelFg: '#062828' },
};
function profileFromScreen(screen) {
  if (screen === 'coordenacao' || (screen && screen.startsWith && screen.startsWith('coord-'))) return 'coordenacao';
  if (screen === 'docente' || (screen && screen.startsWith && screen.startsWith('doc-'))) return 'docente';
  return 'estudante';
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({ currentScreen, onNavigate, collapsed = false, profile }) {
  const prof = profile || profileFromScreen(currentScreen);
  const themeP = PROFILE_THEME[prof] || PROFILE_THEME.estudante;
  const items = prof === 'coordenacao' ? NAV_ITEMS_COORD
              : prof === 'docente'     ? NAV_ITEMS_DOC
              :                          NAV_ITEMS;
  const userBlock = prof === 'coordenacao'
    ? { name: 'Prof. Itairan', sub: 'Coordenação Adjunta', initials: 'IT', color: DS.blueAcc }
    : prof === 'docente'
    ? { name: 'Prof. Ângelo', sub: 'Tutor — Subgrupo C', initials: 'AN', color: '#5DD3D3' }
    : { name: 'Maria Andrade', sub: '3ª Fase · T16', initials: 'MA', color: DS.terra };
  return (
    <aside style={{
      width: collapsed ? 64 : 220,
      minHeight: '100vh',
      background: themeP.bg,
      display: 'flex', flexDirection: 'column',
      flexShrink: 0,
      transition: 'width 0.2s, background 0.25s',
      position: 'relative',
      zIndex: 10,
    }}>
      {/* Logo area */}
      <div style={{ padding: collapsed ? '20px 0' : '18px 16px 14px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        {collapsed ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 32, height: 32, background: DS.terra, borderRadius: 8, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#fff', fontSize: 14 }}>M</div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 32, height: 32, background: DS.terra, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#fff', fontSize: 14, flexShrink: 0 }}>M</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14, color: '#fff', lineHeight: 1.1 }}>MED-UNIDAVI</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>2027</div>
              </div>
            </div>
            {themeP.label && (
              <div style={{
                marginTop: 12, padding: '5px 10px', borderRadius: 100,
                background: themeP.labelBg, color: themeP.labelFg,
                fontSize: 9.5, fontWeight: 800, letterSpacing: '0.6px',
                display: 'inline-flex', alignItems: 'center', gap: 5,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: themeP.labelFg }}></span>
                {themeP.label}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
        {items.map(item => {
          const active = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: collapsed ? '10px 0' : '9px 12px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: DS.radiusSm,
                background: active ? `${themeP.accent}30` : 'transparent',
                borderLeft: active ? `3px solid ${themeP.accent}` : '3px solid transparent',
                cursor: 'pointer', width: '100%',
                color: active ? '#fff' : 'rgba(255,255,255,0.6)',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontWeight: active ? 600 : 400,
                fontSize: 13, transition: 'all 0.1s',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = active ? `${themeP.accent}30` : 'transparent'; e.currentTarget.style.color = active ? '#fff' : 'rgba(255,255,255,0.6)'; }}
            >
              <span style={{ fontSize: 16, lineHeight: 1 }}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom: user info */}
      <div style={{ padding: collapsed ? '12px 0' : '12px 16px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 10, justifyContent: collapsed ? 'center' : 'flex-start' }}>
        <Avatar initials={userBlock.initials} color={userBlock.color} size={30} />
        {!collapsed && (
          <div>
            <div style={{ fontWeight: 600, fontSize: 12, color: '#fff' }}>{userBlock.name}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{userBlock.sub}</div>
          </div>
        )}
      </div>
    </aside>
  );
}

// ── Mobile bottom nav ─────────────────────────────────────────────────────────
function BottomNav({ currentScreen, onNavigate }) {
  const items = NAV_ITEMS.slice(0, 5);
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: DS.surface, borderTop: `1px solid ${DS.border}`,
      display: 'flex', zIndex: 100,
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {items.map(item => {
        const active = currentScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              flex: 1, padding: '8px 4px', border: 'none',
              background: 'transparent', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              color: active ? DS.blue : DS.textMuted,
              fontFamily: 'IBM Plex Sans, sans-serif',
            }}
          >
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span style={{ fontSize: 9, fontWeight: active ? 700 : 400 }}>{item.label.split(' ')[0]}</span>
          </button>
        );
      })}
    </nav>
  );
}

// ── Top bar ───────────────────────────────────────────────────────────────────
// breadcrumb: array de { label, onClick? } — última entrada é a atual (sem onClick).
function TopBar({ title, subtitle, actions, isMobile, breadcrumb }) {
  return (
    <div style={{
      padding: isMobile ? '14px 16px 12px' : '18px 32px 14px',
      borderBottom: `1px solid ${DS.border}`,
      background: DS.surface,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexShrink: 0, gap: 12,
    }}>
      <div style={{ minWidth: 0, flex: 1 }}>
        {Array.isArray(breadcrumb) && breadcrumb.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 4, fontSize: 11, color: DS.textMuted, fontWeight: 600 }}>
            {breadcrumb.map((b, i) => {
              const last = i === breadcrumb.length - 1;
              return (
                <React.Fragment key={i}>
                  {b.onClick && !last ? (
                    <button onClick={b.onClick} style={{ background: 'transparent', border: 'none', padding: 0, color: DS.blue, fontWeight: 600, fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>{b.label}</button>
                  ) : (
                    <span style={{ color: last ? DS.text : DS.textMuted }}>{b.label}</span>
                  )}
                  {!last && <span style={{ color: DS.border }}>›</span>}
                </React.Fragment>
              );
            })}
          </div>
        )}
        <h1 style={{ margin: 0, fontSize: isMobile ? 18 : 22, fontWeight: 700, color: DS.text, lineHeight: 1.2 }}>{title}</h1>
        {subtitle && <p style={{ margin: '2px 0 0', fontSize: 13, color: DS.textSec }}>{subtitle}</p>}
      </div>
      {actions && <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>{actions}</div>}
    </div>
  );
}

// ── Status Flag ───────────────────────────────────────────────────────────────
// Modelo de visibilidade institucional (substitui vocabulário "Onda 1/2/3").
// kind="op" → pílula verde "Operacional".
// kind="flag" → pílula âmbar "Em construção — <criterio>" (oculto por feature flag).
function StatusFlag({ kind = 'op', criterio, size = 'sm', style = {} }) {
  const isOp = kind === 'op';
  const bg = isOp ? DS.greenLight : DS.amberLight;
  const fg = isOp ? DS.green : DS.amber;
  const dotBg = isOp ? DS.green : DS.amber;
  const label = isOp ? 'Operacional' : (criterio ? `Em construção — ${criterio}` : 'Em construção');
  const padY = size === 'sm' ? 4 : 6;
  const padX = size === 'sm' ? 10 : 14;
  const fs = size === 'sm' ? 11 : 12;
  return (
    <span
      role="status"
      aria-label={label}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: `${padY}px ${padX}px`, borderRadius: 100,
        background: bg, color: fg, fontSize: fs, fontWeight: 700,
        lineHeight: 1.3, border: `1px solid ${fg}30`,
        fontFamily: 'IBM Plex Sans, sans-serif',
        ...style,
      }}>
      <span aria-hidden="true" style={{
        width: 7, height: 7, borderRadius: '50%', background: dotBg,
        boxShadow: isOp ? `0 0 0 2px ${DS.green}25` : `0 0 0 2px ${DS.amber}25`,
        flexShrink: 0,
      }}></span>
      <span>{label}</span>
    </span>
  );
}

// Export all to window
Object.assign(window, {
  DS, NAV_ITEMS, NAV_ITEMS_COORD, NAV_ITEMS_DOC, PROFILE_THEME, profileFromScreen,
  Avatar, Badge, Card, Btn, ProgressBar, SectionHeading,
  Sidebar, BottomNav, TopBar, CharacterChip, CapivaraIcon,
  CapivaraDecorativa, CapiAvatar, DaviAvatar, UniAvatar, ValleAvatar, AIDisclaimer,
  StatusFlag,
});
