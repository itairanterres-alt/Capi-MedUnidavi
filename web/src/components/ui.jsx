// Functional UI primitives — ported verbatim from the prototype.
import React from 'react';
import { DS } from '../lib/ds.js';

export function AIDisclaimer({ text, texto, style: extra = {} }) {
  text = text ?? texto; // prototype uses both `text` and `texto`
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

function _initialsFromName(nome) {
  return String(nome).trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

export function Avatar({ initials, nome, color = DS.blue, size = 36 }) {
  // prototype's Perfil header passes `nome` instead of `initials`
  if (!initials && nome) initials = _initialsFromName(nome);
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'IBM Plex Sans, sans-serif',
      fontWeight: 700, fontSize: size * 0.38, flexShrink: 0,
      letterSpacing: '-0.5px',
    }}>{initials}</div>
  );
}

export function CharacterChip({ name, initials, color, subtitle }) {
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

export function Badge({ children, color = DS.blue, bg }) {
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px', borderRadius: 100,
      background: bg || color + '18', color, fontSize: 11,
      fontWeight: 600, letterSpacing: '0.2px',
    }}>{children}</span>
  );
}

export function Card({ children, style = {}, onClick, hover = false }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hover && setHov(true)}
      onMouseLeave={() => hover && setHov(false)}
      style={{
        background: DS.surface, borderRadius: DS.radiusLg,
        border: `1px solid ${DS.border}`,
        boxShadow: hov ? DS.shadowMd : DS.shadow,
        transition: 'box-shadow 0.15s, transform 0.15s',
        transform: hov ? 'translateY(-1px)' : 'none',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >{children}</div>
  );
}

export function Btn({ children, variant = 'primary', kind, size = 'md', onClick, style = {}, icon }) {
  if (kind) variant = kind; // prototype uses `kind` in a few call sites
  const [hov, setHov] = React.useState(false);
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    border: 'none', cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif',
    fontWeight: 600, borderRadius: DS.radius, transition: 'all 0.15s', ...style,
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
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...base, ...sizes[size], ...variants[variant] }}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

export function ProgressBar({ value, max = 100, color = DS.blue, height = 6 }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ background: DS.borderLight, borderRadius: 100, height, overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 100, transition: 'width 0.5s ease' }} />
    </div>
  );
}

export function SectionHeading({ children, action, onAction }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
      <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>{children}</h3>
      {action && <span onClick={onAction} style={{ fontSize: 12, color: DS.blue, fontWeight: 600, cursor: 'pointer' }}>{action}</span>}
    </div>
  );
}

// breadcrumb: array of { label, onClick? } — last entry is the current page.
export function TopBar({ title, subtitle, actions, isMobile, breadcrumb }) {
  return (
    <div style={{
      padding: isMobile ? '14px 16px 12px' : '18px 32px 14px',
      borderBottom: `1px solid ${DS.border}`, background: DS.surface,
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

// Institutional visibility model (replaces "Onda 1/2/3" vocabulary).
export function StatusFlag({ kind = 'op', criterio, size = 'sm', style = {} }) {
  const isOp = kind === 'op';
  const bg = isOp ? DS.greenLight : DS.amberLight;
  const fg = isOp ? DS.green : DS.amber;
  const dotBg = isOp ? DS.green : DS.amber;
  const label = isOp ? 'Operacional' : (criterio ? `Em construção — ${criterio}` : 'Em construção');
  const padY = size === 'sm' ? 4 : 6;
  const padX = size === 'sm' ? 10 : 14;
  const fs = size === 'sm' ? 11 : 12;
  return (
    <span role="status" aria-label={label} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: `${padY}px ${padX}px`, borderRadius: 100,
      background: bg, color: fg, fontSize: fs, fontWeight: 700,
      lineHeight: 1.3, border: `1px solid ${fg}30`,
      fontFamily: 'IBM Plex Sans, sans-serif', ...style,
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
