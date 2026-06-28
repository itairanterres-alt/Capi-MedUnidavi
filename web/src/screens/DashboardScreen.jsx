import React from 'react';
import { DS } from '../lib/ds.js';
import { CapiBubble, CapiSprite } from '../components/Capi.jsx';

export default function DashboardScreen({ onNavigate, isMobile, userName = 'Maria', theme, data }) {
  const dark = theme === 'dark';
  const bg = dark ? '#0F1824' : DS.bg;
  const surface = dark ? '#162234' : DS.surface;
  const border = dark ? 'rgba(255,255,255,0.09)' : DS.border;
  const text = dark ? '#E8EDF8' : DS.text;
  const textSec = dark ? '#98A8C0' : DS.textSec;
  const textMuted = dark ? '#5A6A80' : DS.textMuted;
  const cardBg = surface;
  const borderLight = dark ? 'rgba(255,255,255,0.05)' : DS.borderLight;

  const todayItems = data?.todayItems ?? [
    { type: 'cards', label: 'Revisar 8 flashcards de Farmacologia', sub: 'Antes do TBL das 14h — gerado por FSRS', color: DS.terra, icon: '🃏', screen: 'capi-cards', cta: '8 cards pendentes' },
    { type: 'leitura', label: 'Leitura obrigatória: DPOC — Harrison\'s, cap. 308', sub: 'Tutorial PBL · Grupo C · prazo: 18h', color: DS.blue, icon: '📖', screen: null, cta: 'Leitura' },
    { type: 'entrega', label: 'IESC: Relatório de Visita Domiciliar', sub: 'Prazo: hoje às 23h59 · UBS Bela Vista', color: DS.green, icon: '🏘', screen: null, cta: 'Entrega' },
  ];

  const agenda = data?.agenda ?? [
    { dia: 'Seg', data: 21, ativo: false, eventos: 2 },
    { dia: 'Ter', data: 22, ativo: false, eventos: 1 },
    { dia: 'Qua', data: 23, ativo: true, eventos: 3 },
    { dia: 'Qui', data: 24, ativo: false, eventos: 2 },
    { dia: 'Sex', data: 25, ativo: false, eventos: 1 },
  ];

  const ucs = data?.ucs ?? [
    { nome: 'Morfofuncional III', fase: '3ª Fase', progresso: 68, color: DS.blue },
    { nome: 'IESC III', fase: '3ª Fase', progresso: 52, color: DS.green },
    { nome: 'Tutorial PBL', fase: 'Grupo C', progresso: 80, color: DS.terra },
    { nome: 'Habilidades Profissionais III', fase: '3ª Fase', progresso: 41, color: '#7A5CBF' },
  ];

  const avisos = data?.avisos ?? [
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
