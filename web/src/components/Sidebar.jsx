// Contextual sidebar (Estudante / Coordenação / Docente) — ported from prototype.
import React from 'react';
import { DS, NAV_ITEMS, NAV_ITEMS_COORD, NAV_ITEMS_DOC, PROFILE_THEME, profileFromScreen } from '../lib/ds.js';
import { Icon } from './Icon.jsx';
import { Avatar } from './ui.jsx';

export function Sidebar({ currentScreen, onNavigate, collapsed = false, profile, faseAluno = 3 }) {
  const prof = profile || profileFromScreen(currentScreen);
  const themeP = PROFILE_THEME[prof] || PROFILE_THEME.estudante;
  const rawItems = prof === 'coordenacao' ? NAV_ITEMS_COORD
              : prof === 'docente'     ? NAV_ITEMS_DOC
              :                          NAV_ITEMS;
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
      width: collapsed ? 64 : 220, minHeight: '100%',
      background: themeP.bg, display: 'flex', flexDirection: 'column',
      flexShrink: 0, transition: 'width 0.2s, background 0.25s',
      position: 'relative', zIndex: 10,
    }}>
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

      <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
        {items.map(item => {
          const active = currentScreen === item.id;
          return (
            <button key={item.id} onClick={() => onNavigate(item.id)}
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
                fontWeight: active ? 600 : 400, fontSize: 13, transition: 'all 0.1s',
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

export function BottomNav({ currentScreen, onNavigate }) {
  const items = NAV_ITEMS.slice(0, 5);
  return (
    <nav style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: DS.surface, borderTop: `1px solid ${DS.border}`,
      display: 'flex', zIndex: 100,
    }}>
      {items.map(item => {
        const active = currentScreen === item.id;
        return (
          <button key={item.id} onClick={() => onNavigate(item.id)}
            style={{
              flex: 1, padding: '8px 4px', border: 'none',
              background: 'transparent', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              color: active ? DS.blue : DS.textMuted,
              fontFamily: 'IBM Plex Sans, sans-serif',
            }}>
            <Icon name={item.icon} size={22} color="currentColor" />
            <span style={{ fontSize: 9, fontWeight: active ? 700 : 400 }}>{item.label.split(' ')[0]}</span>
          </button>
        );
      })}
    </nav>
  );
}
