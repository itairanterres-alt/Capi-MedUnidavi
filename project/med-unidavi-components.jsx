
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
  { id: 'dashboard',     label: 'Início',               icon: 'home' },
  { id: 'biblioteca',    label: 'Biblioteca',            icon: 'book-open' },
  { id: 'capi-cards',    label: 'Capi-Cards',            icon: 'layers' },
  { id: 'ppc',           label: 'Meu Percurso',          icon: 'map' },
  { id: 'iesc',          label: 'IESC',                  icon: 'building-2' },
  { id: 'morfofuncional',label: 'Morfofuncional',        icon: 'microscope', fasesPermitidas: [1,2,3,4,5] },
  { id: 'questoes',      label: 'Meu Treino',            icon: 'clipboard-list' },
  { id: 'imagens',       label: 'Banco de Imagens',      icon: 'image' },
  { id: 'eventos',       label: 'Eventos',               icon: 'calendar' },
  { id: 'progresso',     label: 'Teste de Progresso',    icon: 'bar-chart-2' },
  { id: 'simdavi',       label: 'Consulta Virtual',      icon: 'stethoscope' },
  { id: 'pratica',       label: 'Prática Clínica',       icon: 'stethoscope' },
  { id: 'apcs',          label: 'Portfólio APCs',        icon: 'folder-check' },
  { id: 'reflexivo',     label: 'Portfólio Reflexivo',   icon: 'pen-line' },
  { id: 'ic',            label: 'Iniciação Científica',  icon: 'flask-conical' },
  { id: 'vitrine',       label: 'Vitrine Institucional', icon: 'globe' },
];

// ── Persona image avatars ─────────────────────────────────────────────────────
// Helpers
function _PersonaImg({ src, alt, size, pos = 'top center' }) {
  const _src = (typeof window !== 'undefined' && typeof window.__resolveAsset === 'function') ? window.__resolveAsset(src) : src;
  return (
    <img src={_src} alt={alt}
      style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover',
               objectPosition: pos, flexShrink: 0, display: 'block' }}
    />
  );
}
function _PersonaImg_OLD({ src, alt, size, pos = 'top center' }) {
  return (
    <img
      src={src} alt={alt}
      style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover',
               objectPosition: pos, flexShrink: 0, display: 'block' }}
    />
  );
}

// ── BLOCO 0 (rev. mai/2026) ──────────────────────────────────────────────────
// Sistema de personas reduzido a UMA identidade visual: a Capivara,
// modulada por contexto via prop `modo`.
//
//   modo="treino"  → afetivo, gamificado (Capi-Cards, Missão do Dia,
//                    empty states de estudo casual). Usa Dr capivara.png.
//   modo="clinico" → sóbrio, com estetoscópio (Consulta Virtual, Round
//                    Virtual, preceptoria internato). Usa Dr Capi.png.
//                    É o Dr. Capi v4.6 que os 120 internos conhecem no
//                    Gemini.
//
// Default = treino. Para o modo clínico passar `modo="clinico"` explicito.
//
// Onde a Capivara NÃO aparece (princípio): telas de Coordenação, telas de
// Docente em modo curadoria, Portfólio Reflexivo, IESC, IC. Esses contextos
// usam ícones Lucide (BookOpen, Notebook, Sparkles, etc.) ou simplesmente
// o título da tela, sem rosto.
//
// Nome textual "Capi" é PRESERVADO (já em produção com 120 internos via
// Gemini). Os nomes "Davi", "Uni" e "Valle" foram descontinuados.

const _CAPI_SRC = {
  treino:  'uploads/Dr capivara.png',
  clinico: 'uploads/Dr Capi.png',
};

function CapivaraDecorativa({ size = 80, modo = 'treino' }) {
  const src = _CAPI_SRC[modo] || _CAPI_SRC.treino;
  return <_PersonaImg src={src} alt="" size={size} pos="top center" />;
}

// ── Capi Portrait — busto sem corte circular ──────────────────────────────────
// Use quando há espaço para mostrar o personagem de verdade:
// dashboard, empty states, painel de chat, intro de telas.
// O retrato original é 1122×1402, razão ~0.8:1 (portrait).
// `height` controla a altura em px; width é calculado automaticamente.
// `radius` aceita qualquer valor CSS (número ou string).
// ── CapiSprite — poses contextuais do sprite sheet ───────────────────────────
const _CAPI_POSES = {
  atencao:    { src: 'uploads/capi-atencao.png',     r: 819/1024, clipTop: 0  },
  ola:         { src: 'uploads/capi-ola.png',         r: 819/1024, clipTop: 0  },
  duvida:      { src: 'uploads/capi-duvida.png',      r: 819/1024, clipTop: 0  },
  pensativo:   { src: 'uploads/capi-pensativo.png',   r: 819/1024, clipTop: 0  },
  farmaco:     { src: 'uploads/capi-farmaco.png',     r: 195/252, clipTop: 0  },
  dica:        { src: 'uploads/capi-dica.png',        r: 258/245, clipTop: 0  },
  neutro:      { src: 'uploads/capi-neutro.png',      r: 258/245, clipTop: 0  },
  clinico:     { src: 'uploads/capi-clinico.png',     r: 258/245, clipTop: 0  },
  aprovacao:   { src: 'uploads/capi-aprovacao.png',   r: 195/192, clipTop: 0  },
  anotando:    { src: 'uploads/capi-anotando.png',    r: 195/192, clipTop: 0  },
  escrita:     { src: 'uploads/capi-escrita.png',     r: 195/192, clipTop: 0  },
  esperando:   { src: 'uploads/capi-esperando.png',   r: 195/192, clipTop: 0  },
  serio:       { src: 'uploads/capi-serio.png',       r: 195/242, clipTop: 0  },
  concentrado: { src: 'uploads/capi-concentrado.png', r: 195/242, clipTop: 0  },
  consultando: { src: 'uploads/capi-consultando.png', r: 195/242, clipTop: 0  },
  documento:   { src: 'uploads/capi-documento.png',   r: 195/242, clipTop: 0  },
};
// Mapeamento tela → pose
const CAPI_POSE_BY_SCREEN = {
  dashboard: 'ola', 'capi-cards': 'anotando', pilulas: 'dica',
  questoes: 'pensativo', morfofuncional: 'concentrado',
  ic: 'escrita', reflexivo: 'pensativo', iesc: 'dica',
  pratica: 'clinico', simdavi: 'atencao', apcs: 'documento',
  progresso: 'aprovacao', missao: 'ola', notas: 'escrita',
  simulado: 'atencao', forum: 'duvida',
};
function CapiSprite({ pose = 'neutro', height = 120, radius = 10, animated = false }) {
  const p = _CAPI_POSES[pose] || _CAPI_POSES.neutro;
  const _src = (typeof window !== 'undefined' && typeof window.__resolveAsset === 'function')
    ? window.__resolveAsset(p.src) : p.src;
  const clipTop = p.clipTop || 0;
  const w = Math.round(height * p.r);
  // imgH: imagem ligeiramente maior que container; marginTop negativo esconde o bleed do topo
  const imgH = height + clipTop;
  return (
    <div style={{
      width: w, height, borderRadius: radius, overflow: 'hidden',
      flexShrink: 0, background: '#EDE4D8',
      animation: animated ? 'capiBob 4s ease-in-out infinite' : 'none',
    }}>
      <img src={_src} alt="Capi" style={{
        width: '100%', height: imgH,
        objectFit: 'cover', objectPosition: 'top center',
        display: 'block', marginTop: -clipTop,
      }} />
    </div>
  );
}


// animated: float suave
function CapiPortrait({ height = 100, modo = 'treino', radius = 10, animated = false, mood = 'neutro' }) {
  const src = _CAPI_SRC[modo] || _CAPI_SRC.treino;
  const _src = (typeof window !== 'undefined' && typeof window.__resolveAsset === 'function')
    ? window.__resolveAsset(src) : src;
  const w = Math.round(height * 0.8);

  const moodOverlay = {
    animado:     { emoji: '⚡', bg: '#FFF3CC' },
    celebracao:  { emoji: '🎉', bg: '#E8F5E9' },
    pensativo:   { emoji: '💭', bg: '#EEF1F8' },
    neutro:      null,
  }[mood];

  const animation = animated
    ? (mood === 'celebracao' ? 'capiBreath 2s ease-in-out infinite'
     : mood === 'pensativo'  ? 'capiBreath 5s ease-in-out infinite'
     : 'capiBob 4s ease-in-out infinite')
    : 'none';

  return (
    <div style={{ position: 'relative', flexShrink: 0, display: 'inline-block' }}>
      <div style={{
        width: w, height,
        borderRadius: radius,
        overflow: 'hidden',
        background: '#EDE4D8',
        animation,
      }}>
        <img
          src={_src}
          alt="Capi"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            display: 'block',
          }}
        />
      </div>
      {moodOverlay && (
        <div style={{
          position: 'absolute', top: -8, right: -8,
          width: Math.max(20, height * 0.22), height: Math.max(20, height * 0.22),
          borderRadius: '50%',
          background: moodOverlay.bg,
          border: '2px solid #fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: Math.max(10, height * 0.13),
          boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
          animation: 'capiBubbleIn 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}>{moodOverlay.emoji}</div>
      )}
    </div>
  );
}

// ── CapiBubble — balão de fala contextual ─────────────────────────────────────
const _CAPI_FRASES = {
  dashboard:    ['Sua missão do dia está esperando!', 'Você está em sequência há 12 dias. Continue assim!', '8 flashcards de Farmacologia antes do TBL — consigo.'],
  'capi-cards': ['Revisão espaçada é mais eficiente que maratona.', 'FSRS escolheu o que você mais precisa ver hoje.', 'Cada card revisado é um ponto de ancoragem clínica.'],
  pilulas:      ['Ideal pra intervalo entre tarefas.', 'Um macete por vez. Vai fundo.'],
  questoes:     ['Raciocine antes de marcar — o processo é o aprendizado.', 'Cada erro virou critério de revisão no FSRS.'],
  morfofuncional: ['Estrutura + função: o par inseparável da clínica.'],
  ic:           ['Metodologia sólida antes de conclusões, sempre.'],
  reflexivo:    ['Reflexão estruturada é evidência de aprendizagem.'],
  default:      ['Como posso ajudar?', 'Estou aqui quando precisar.'],
};
function CapiBubble({ tela = 'default', side = 'left', style: extra = {} }) {
  const frases = _CAPI_FRASES[tela] || _CAPI_FRASES.default;
  const idx = Math.floor(Date.now() / (1000 * 60 * 60)) % frases.length;
  const frase = frases[idx];
  const tailLeft  = side === 'left'  ? { borderRadius: '10px 10px 10px 2px' } : {};
  const tailRight = side === 'right' ? { borderRadius: '10px 10px 2px 10px' } : {};
  return (
    <div style={{
      background: DS.surface,
      border: `1px solid ${DS.border}`,
      borderRadius: '10px 10px 10px 2px',
      padding: '9px 13px',
      fontSize: 12, color: DS.textSec, lineHeight: 1.55,
      maxWidth: 190,
      boxShadow: DS.shadow,
      animation: 'capiBubbleIn 0.45s cubic-bezier(0.16,1,0.3,1)',
      ...tailLeft, ...tailRight, ...extra,
    }}>
      {frase}
    </div>
  );
}

// Aliases — todos apontam para a Capivara. Aceitam `modo`.
function CapivaraIcon({ size = 36, modo }) { return <CapivaraDecorativa size={size} modo={modo} />; }
function CapiAvatar  ({ size = 36, modo }) { return <CapivaraDecorativa size={size} modo={modo} />; }

// ── Icon — SVG paths inline (Lucide-compatible, zero CDN) ─────────────────────
// name: kebab-case. Adicione entradas em _IP para novos ícones.
const _IP = {
  'home':            ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z','M9 22V12h6v10'],
  'book-open':       ['M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z','M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'],
  'layers':          ['M12 2 2 7l10 5 10-5-10-5z','M2 17l10 5 10-5','M2 12l10 5 10-5'],
  'map':             ['M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z','M8 2v16','M16 6v16'],
  'building-2':      ['M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18z','M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2','M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2','M10 6h4','M10 10h4','M10 14h4','M10 18h4'],
  'microscope':      ['M6 18h8','M3 22h18','M14 22a7 7 0 1 0 0-14h-1','M9 14h2','M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2z','M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3'],
  'clipboard-list':  ['M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2','M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2','M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2','M9 12h6','M9 16h6'],
  'image':           ['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z','M10 8.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z','M21 15l-5-5L5 21'],
  'calendar':        ['M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z','M8 2v4','M16 2v4','M3 10h18'],
  'bar-chart-2':     ['M18 20V10','M12 20V4','M6 20v-6'],
  'stethoscope':     ['M4 5v6a6 6 0 0 0 12 0V5','M8 5V3','M16 5V3','M20 19a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z','M15 17h-4a1 1 0 0 1-1-1v-1'],
  'folder-check':    ['M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z','M9 14l2 2 4-4'],
  'pen-line':        ['M12 20h9','M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 13.5-13.5z'],
  'flask-conical':   ['M9 2h6','M9 2L7 8H5l-1 5h16l-1-5h-2L15 2','M8 12h8'],
  'globe':           ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z','M2 12h20','M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 0-4-10 15.3 15.3 0 0 0 4-10z'],
  'layout-dashboard':['M4 3h6a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z','M14 3h6a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z','M14 12h6a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z','M4 16h6a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1z'],
  'list':            ['M8 6h13','M8 12h13','M8 18h13','M3 6h.01','M3 12h.01','M3 18h.01'],
  'user':            ['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2','M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'],
  'target':          ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z','M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z','M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'],
  'graduation-cap':  ['M22 10v6','M2 10l10-5 10 5-10 5z','M6 12v5c3 3 9 3 12 0v-5'],
  'archive':         ['M21 8v13H3V8','M1 3h22v5H1z','M10 12h4'],
  'users':           ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2','M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z','M23 21v-2a4 4 0 0 0-3-3.87','M16 3.13a4 4 0 0 1 0 7.75'],
  'check-circle':    ['M22 11.08V12a10 10 0 1 1-5.93-9.14','M22 4 12 14.01l-3-3'],
  'compass':         ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z','M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z'],
  'bot':             ['M6 9h12v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9z','M8 9V7a4 4 0 0 1 8 0v2','M3 13h3','M18 13h3','M9 13h.01','M15 13h.01'],
};
function Icon({ name, size = 18, color = 'currentColor', strokeWidth = 1.75 }) {
  const paths = _IP[name];
  if (!paths) return null;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
      viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

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
  { id: 'coordenacao',     label: 'Visão Geral',                 icon: 'layout-dashboard' },
  { id: 'coord-fase',      label: 'Por Fase',                     icon: 'list' },
  { id: 'coord-aluno',     label: 'Por Aluno',                    icon: 'user' },
  { id: 'coord-comp',      label: 'Por Competência',              icon: 'target' },
  { id: 'coord-enamed',    label: 'ENAMED',                       icon: 'graduation-cap' },
  { id: 'coord-banco',     label: 'Saúde do Banco',               icon: 'archive' },
  { id: 'coord-treino',    label: 'Atividades de Treino',         icon: 'clipboard-list' },
  { id: 'coord-npcmed',    label: 'NPCMed',                       icon: 'flask-conical' },
  { id: 'coord-relat',     label: 'Relatórios NDE/CPA/MEC',       icon: 'bar-chart-2' },
];
const NAV_ITEMS_DOC = [
  { id: 'docente',         label: 'Meus Tutorados',               icon: 'users' },
  { id: 'doc-aval',        label: 'Avaliações Pendentes',         icon: 'check-circle' },
  { id: 'doc-matriz',      label: 'Matriz Competência',           icon: 'compass' },
  { id: 'doc-davi',        label: 'Conteúdo Pedagógico a Validar', icon: 'bot' },
  { id: 'doc-sim',         label: 'Casos de Simulação a Revisar', icon: 'stethoscope' },
  { id: 'imagens',         label: 'Banco de Imagens',             icon: 'image' },
  { id: 'gerador',         label: 'Gerador Pedagógico',           icon: 'pen-line' },
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
function Sidebar({ currentScreen, onNavigate, collapsed = false, profile, faseAluno = 3 }) {
  const prof = profile || profileFromScreen(currentScreen);
  const themeP = PROFILE_THEME[prof] || PROFILE_THEME.estudante;
  const rawItems = prof === 'coordenacao' ? NAV_ITEMS_COORD
              : prof === 'docente'     ? NAV_ITEMS_DOC
              :                          NAV_ITEMS;
  // Bloco D: itens com fasesPermitidas só aparecem para alunos das fases listadas.
  // Para coordenação/docente nada é filtrado.
  const items = prof === 'estudante'
    ? rawItems.filter(it => !it.fasesPermitidas || it.fasesPermitidas.includes(faseAluno))
    : rawItems;
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
              <Icon name={item.icon} size={16} color="currentColor" />
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
            <Icon name={item.icon} size={22} color="currentColor" />
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
  Icon,
  CapivaraDecorativa, CapiPortrait, CapiSprite, CapiBubble, CapiAvatar, AIDisclaimer,
  CAPI_POSE_BY_SCREEN,
  StatusFlag,
});
