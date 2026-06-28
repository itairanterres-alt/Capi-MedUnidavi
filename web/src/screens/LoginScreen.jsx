import React from 'react';
import { DS } from '../lib/ds.js';
import { CapivaraIcon, CapiAvatar, CapivaraDecorativa } from '../components/Capi.jsx';

const SSO_DEMO_BADGE = true;

export default function LoginScreen({ onLogin }) {
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
