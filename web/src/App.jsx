// MED-UNIDAVI 2027 — application shell. Device frames + contextual sidebar +
// demo top-nav + the five implemented screens, all fed by the live API.
import React from 'react';
import { DS, profileFromScreen } from './lib/ds.js';
import { useApi } from './lib/api.js';
import { Sidebar, BottomNav } from './components/Sidebar.jsx';
import { CanalFAB } from './components/CanalFAB.jsx';
import { CapiChat } from './components/CapiChat.jsx';
import PlaceholderScreen from './components/PlaceholderScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import DashboardScreen from './screens/DashboardScreen.jsx';
import DocenteScreen from './screens/DocenteScreen.jsx';
import CoordenacaoScreen from './screens/CoordenacaoScreen.jsx';
import PerfilAlunoScreen from './screens/PerfilAlunoScreen.jsx';

// ── Loading / error states ──────────────────────────────────────────────────
function Loading({ label }) {
  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: DS.bg, color: DS.textMuted, fontSize: 13, fontFamily: 'IBM Plex Sans, sans-serif' }}>
      Carregando {label}…
    </div>
  );
}
function ApiError({ error }) {
  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: DS.bg, padding: 24 }}>
      <div style={{ maxWidth: 460, textAlign: 'center', color: DS.terra, fontSize: 13, lineHeight: 1.6 }}>
        <strong>Falha ao carregar dados do backend.</strong><br />
        Verifique se a API está rodando (npm run dev em /api).<br />
        <code style={{ fontSize: 11, color: DS.textMuted }}>{String(error?.message || error)}</code>
      </div>
    </div>
  );
}

// ── Device frames (ported from the prototype shell) ─────────────────────────
function DesktopFrame({ children, theme }) {
  const dark = theme === 'dark';
  return (
    <div style={{ background: dark ? '#1A2840' : '#E8EDF8', borderRadius: 16, padding: '10px 10px 0', boxShadow: '0 24px 60px rgba(0,0,0,0.5)', overflow: 'hidden', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, padding: '0 2px' }}>
        {['#FF5F57','#FFBD2E','#28C840'].map(c => (<div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />))}
        <div style={{ flex: 1, height: 22, borderRadius: 4, background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', marginLeft: 4, display: 'flex', alignItems: 'center', padding: '0 10px' }}>
          <span style={{ fontSize: 9, color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>app.unidavi.edu.br/dashboard</span>
        </div>
      </div>
      <div style={{ borderRadius: '8px 8px 0 0', overflow: 'hidden', height: 620, display: 'flex', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)' }}>{children}</div>
    </div>
  );
}

function MobileFrame({ children, theme }) {
  const dark = theme === 'dark';
  return (
    <div style={{ width: 320, flexShrink: 0, background: dark ? '#1A2840' : '#E0E8F2', borderRadius: 40, padding: '10px 6px', boxShadow: '0 24px 60px rgba(0,0,0,0.5)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 80, height: 24, background: dark ? '#0D1520' : '#111', borderRadius: 12, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#333' }} />
        <div style={{ width: 14, height: 6, borderRadius: 3, background: '#333' }} />
      </div>
      <div style={{ height: 36, borderRadius: '30px 30px 0 0', background: dark ? '#162234' : '#FFFFFF', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 20px 6px' }}>
        <span style={{ fontSize: 9, fontWeight: 700, color: dark ? '#E8EDF8' : '#1A2438' }}>9:41</span>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {[3,4,4,4].map((h,i) => <div key={i} style={{ width: 3, height: h, background: dark ? '#E8EDF8' : '#1A2438', borderRadius: 1 }} />)}
          <div style={{ fontSize: 9, color: dark ? '#E8EDF8' : '#1A2438' }}>▲</div>
          <div style={{ width: 16, height: 8, border: `1.5px solid ${dark ? '#E8EDF8' : '#1A2438'}`, borderRadius: 2, position: 'relative' }}>
            <div style={{ width: '75%', height: '100%', background: dark ? '#E8EDF8' : '#1A2438', borderRadius: 1 }} />
            <div style={{ position: 'absolute', right: -3, top: '50%', transform: 'translateY(-50%)', width: 2, height: 4, background: dark ? '#E8EDF8' : '#1A2438', borderRadius: 1 }} />
          </div>
        </div>
      </div>
      <div style={{ height: 560, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>{children}</div>
      <div style={{ height: 28, borderRadius: '0 0 30px 30px', background: dark ? '#162234' : '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 60, height: 4, background: dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)', borderRadius: 2 }} />
      </div>
    </div>
  );
}

function FrameLabel({ children, theme }) {
  const dark = theme === 'dark';
  return (
    <div style={{ textAlign: 'center', marginBottom: 12, fontSize: 11, fontWeight: 700, letterSpacing: '1px', color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>{children}</div>
  );
}

const IMPLEMENTED = new Set(['dashboard', 'docente', 'coordenacao', 'perfil-aluno']);

// ── A single running app (desktop or mobile) ────────────────────────────────
function AppInstance({ isMobile, theme, userName, initialScreen = 'dashboard' }) {
  const [screen, setScreen] = React.useState(initialScreen);
  const [perfilOrigem, setPerfilOrigem] = React.useState('docente');

  const dashboard = useApi('/dashboard');
  const tutor = useApi('/tutor/panel');
  const coord = useApi('/coordenacao/overview');
  const students = useApi('/students');
  const profile = useApi('/students/joao-melo/profile');

  const onAbrirPerfil = (origem) => { setPerfilOrigem(origem || 'docente'); setScreen('perfil-aluno'); };

  const renderScreen = () => {
    switch (screen) {
      case 'dashboard':
        if (dashboard.loading) return <Loading label="o painel" />;
        if (dashboard.error) return <ApiError error={dashboard.error} />;
        return <DashboardScreen onNavigate={setScreen} isMobile={isMobile} userName={userName} theme={theme} data={dashboard.data} />;
      case 'docente':
        if (tutor.loading) return <Loading label="o painel do tutor" />;
        if (tutor.error) return <ApiError error={tutor.error} />;
        return <DocenteScreen isMobile={isMobile} onNavigate={setScreen} onAbrirPerfil={onAbrirPerfil} data={tutor.data} />;
      case 'coordenacao':
        if (coord.loading || students.loading) return <Loading label="a coordenação" />;
        if (coord.error) return <ApiError error={coord.error} />;
        return <CoordenacaoScreen isMobile={isMobile} onNavigate={setScreen} onAbrirPerfil={onAbrirPerfil} data={coord.data} students={students.data || []} />;
      case 'perfil-aluno':
        if (profile.loading) return <Loading label="o perfil do aluno" />;
        if (profile.error) return <ApiError error={profile.error} />;
        return <PerfilAlunoScreen isMobile={isMobile} data={profile.data} origem={perfilOrigem} onVoltar={() => setScreen(perfilOrigem || 'docente')} onNavigate={setScreen} />;
      default: {
        const labels = {
          biblioteca: 'Biblioteca', 'capi-cards': 'Capi-Cards', ppc: 'Meu Percurso', iesc: 'IESC',
          morfofuncional: 'Morfofuncional', questoes: 'Meu Treino', imagens: 'Banco de Imagens',
          eventos: 'Eventos', progresso: 'Teste de Progresso', simdavi: 'Consulta Virtual',
          pratica: 'Prática Clínica', apcs: 'Portfólio APCs', reflexivo: 'Portfólio Reflexivo',
          ic: 'Iniciação Científica', vitrine: 'Vitrine Institucional', gerador: 'Gerador Pedagógico',
        };
        return <PlaceholderScreen title={labels[screen] || 'Tela'} isMobile={isMobile} />;
      }
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%', overflow: 'hidden', fontFamily: 'IBM Plex Sans, sans-serif', position: 'relative' }}>
      {!isMobile && <Sidebar currentScreen={screen} onNavigate={setScreen} />}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>{renderScreen()}</div>
      {isMobile && <BottomNav currentScreen={screen} onNavigate={setScreen} />}
      <CanalFAB telaAtual={screen} perfil={profileFromScreen(screen)} />
      <CapiChat telaAtual={screen} />
    </div>
  );
}

// ── Top-level page (frames, demo nav, tweaks) ───────────────────────────────
const NAV_ENTRIES = [
  { id: 'login', label: 'Login', logged: false },
  { id: 'dashboard', label: 'Dashboard', logged: true },
  { id: 'perfil-aluno', label: 'Perfil do Aluno', logged: true },
  { id: 'docente', label: '🧑‍🏫 Painel do Tutor', logged: true },
  { id: 'coordenacao', label: '⚙ Coordenação', logged: true },
];

export default function App() {
  const [theme, setTheme] = React.useState('light');
  const [viewMode, setViewMode] = React.useState('split');
  const [userName, setUserName] = React.useState('Maria');
  const [loggedIn, setLoggedIn] = React.useState(true);
  // key bumps remount AppInstance so the demo top-nav can jump screens
  const [jump, setJump] = React.useState({ screen: 'dashboard', n: 0 });

  const dark = theme === 'dark';
  const outerBg = dark ? '#060E1A' : '#1A2D4A';

  const go = (entry) => {
    setLoggedIn(entry.logged);
    if (entry.logged) setJump(j => ({ screen: entry.id, n: j.n + 1 }));
  };

  return (
    <div style={{ minHeight: '100vh', background: outerBg, fontFamily: 'IBM Plex Sans, sans-serif' }}>
      {/* Header */}
      <div style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, background: DS.terra, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, color: '#fff' }}>M</div>
          <span style={{ fontWeight: 700, fontSize: 14, color: '#fff', letterSpacing: '-0.2px' }}>MED-UNIDAVI 2027</span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 400, marginLeft: 4 }}>— implementação Vite + React + API</span>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {NAV_ENTRIES.map(item => (
            <button key={item.id} onClick={() => go(item)}
              style={{ padding: '5px 12px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11, fontWeight: 500, cursor: 'pointer', transition: 'all 0.1s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>{item.label}</button>
          ))}
        </div>
      </div>

      {/* DEMO banner */}
      <div style={{ padding: '6px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#3A2A0F', borderBottom: '1px solid rgba(255,255,255,0.07)', gap: 8 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: DS.amber }}></span>
        <span style={{ fontSize: 10.5, color: '#E6C66E', fontWeight: 600, letterSpacing: '0.3px', textAlign: 'center' }}>
          DEMO — em produção, perfis (Estudante / Coordenação / Docente) serão isolados por permissão. Esta navbar superior coexiste apenas no protótipo.
        </span>
      </div>

      {/* Canvas */}
      <div style={{ padding: viewMode === 'split' ? '32px 24px' : '32px', display: 'flex', gap: 32, alignItems: 'flex-start', justifyContent: 'center', flexWrap: 'wrap', minHeight: 'calc(100vh - 100px)' }}>
        {(viewMode === 'split' || viewMode === 'desktop') && (
          <div style={{ flex: viewMode === 'split' ? '1 1 700px' : 'none', maxWidth: viewMode === 'split' ? 900 : 1100, minWidth: 0 }}>
            <FrameLabel theme={theme}>Desktop — 1280px</FrameLabel>
            <DesktopFrame theme={theme}>
              {!loggedIn
                ? <LoginScreen onLogin={() => setLoggedIn(true)} />
                : <AppInstance key={`d-${jump.n}`} isMobile={false} theme={theme} userName={userName} initialScreen={jump.screen} />}
            </DesktopFrame>
          </div>
        )}
        {(viewMode === 'split' || viewMode === 'mobile') && (
          <div style={{ flexShrink: 0 }}>
            <FrameLabel theme={theme}>Mobile — 380px</FrameLabel>
            <MobileFrame theme={theme}>
              {!loggedIn
                ? <LoginScreen onLogin={() => setLoggedIn(true)} />
                : <AppInstance key={`m-${jump.n}`} isMobile={true} theme={theme} userName={userName} initialScreen={jump.screen} />}
            </MobileFrame>
          </div>
        )}
      </div>

      {/* Tweaks panel */}
      <TweaksPanel theme={theme} setTheme={setTheme} viewMode={viewMode} setViewMode={setViewMode} userName={userName} setUserName={setUserName} />
    </div>
  );
}

function TweaksPanel({ theme, setTheme, viewMode, setViewMode, userName, setUserName }) {
  const seg = (val, cur, on, label) => (
    <button onClick={on} style={{
      flex: 1, padding: '5px 6px', borderRadius: 6, border: 'none', cursor: 'pointer',
      fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11, fontWeight: 600,
      background: val === cur ? DS.blueAcc : 'rgba(255,255,255,0.08)',
      color: val === cur ? '#06243F' : 'rgba(255,255,255,0.7)',
    }}>{label}</button>
  );
  const lbl = { fontSize: 9.5, fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', margin: '0 0 5px' };
  return (
    <div style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 200, background: '#101A2C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 14, width: 210, boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', marginBottom: 10 }}>Tweaks — MED-UNIDAVI</div>
      <div style={lbl}>Tema</div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>{seg('light', theme, () => setTheme('light'), 'Light')}{seg('dark', theme, () => setTheme('dark'), 'Dark')}</div>
      <div style={lbl}>Viewport</div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>{seg('split', viewMode, () => setViewMode('split'), 'Split')}{seg('desktop', viewMode, () => setViewMode('desktop'), 'Desktop')}{seg('mobile', viewMode, () => setViewMode('mobile'), 'Mobile')}</div>
      <div style={lbl}>Usuário</div>
      <input value={userName} onChange={e => setUserName(e.target.value)} placeholder="Primeiro nome"
        style={{ width: '100%', padding: '6px 9px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)', color: '#fff', fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, boxSizing: 'border-box' }} />
    </div>
  );
}
