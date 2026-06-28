// Canal de Comunicação Institucional (global FAB). Ported from the prototype's
// med-unidavi-canal.jsx. Each action posts a real institutional event to the API.
import React from 'react';
import { DS } from '../lib/ds.js';
import { apiPost } from '../lib/api.js';

const CANAL_OPCOES = [
  { id: 'tutoria', titulo: 'Falar com a Tutoria', sub: 'Estudante → tutor designado', icon: '🎓', color: '#1D50A8', perfis: ['estudante'], detalhe: 'Comunicação direta com seu tutor. Use para dúvidas sobre PBL, encontros tutoriais, EPAs do logbook ou orientação acadêmica.' },
  { id: 'coordenacao', titulo: 'Falar com a Coordenação', sub: 'Estudante ou docente → coordenação adjunta', icon: '🏛️', color: '#0F6A47', perfis: ['estudante', 'docente'], detalhe: 'Demandas institucionais: matrícula, aproveitamento, calendário, NDE, conflitos. Resposta em até 3 dias úteis.' },
  { id: 'suporte', titulo: 'Suporte técnico da plataforma', sub: 'Bugs, acesso, dados', icon: '🛠️', color: '#C4622D', perfis: ['estudante', 'docente', 'coordenacao'], detalhe: 'Problemas de login, dados não exibidos, erros de tela, dúvida sobre a plataforma. Time de TI da MED-UNIDAVI.' },
  { id: 'institucional', titulo: 'Atendimento institucional UNIDAVI', sub: 'Setores administrativos · link out', icon: '🏫', color: '#7A5CBF', perfis: ['estudante', 'docente', 'coordenacao'], detalhe: 'Financeiro, secretaria, RH, ouvidoria, biblioteca central. Abre o portal institucional unidavi.edu.br em nova aba.', extern: true },
];

export function CanalFAB({ telaAtual, perfil = 'estudante' }) {
  const [aberto, setAberto] = React.useState(false);
  const [confirmado, setConfirmado] = React.useState(null);
  const opcoesPerfil = CANAL_OPCOES.filter(o => o.perfis.includes(perfil));

  const acionar = (opcao) => {
    const evento = { tipo: 'canal_comunicacao', opcao: opcao.id, tela: telaAtual || 'desconhecida', perfil };
    if (opcao.extern) {
      window.open('https://www.unidavi.edu.br', '_blank', 'noopener,noreferrer');
      setAberto(false);
      return;
    }
    const ts = new Date().toISOString();
    apiPost('/events/canal', evento).catch(() => {}); // persist the event server-side
    setConfirmado({ opcao, ts });
  };

  const fechar = () => { setAberto(false); setConfirmado(null); };

  return (
    <React.Fragment>
      <button onClick={() => setAberto(true)} aria-label="Canal de comunicação"
        style={{ position: 'fixed', right: 18, bottom: 18, zIndex: 90, width: 52, height: 52, borderRadius: '50%', background: DS.blue, color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 6px 18px rgba(29,80,168,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontFamily: 'inherit' }}
        title="Canal institucional · fale com tutoria, coordenação, suporte ou setores UNIDAVI">💬</button>

      {aberto && (
        <div onClick={fechar} style={{ position: 'fixed', inset: 0, background: 'rgba(8,16,32,0.55)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: DS.surface, borderRadius: 14, maxWidth: 520, width: '100%', maxHeight: '85vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ padding: '18px 22px 14px', borderBottom: `1px solid ${DS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: DS.text }}>Canal de Comunicação</div>
                <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 3 }}>Tela atual: <strong>{telaAtual || '—'}</strong> · perfil: <strong>{perfil}</strong> · cada acionamento é registrado</div>
              </div>
              <button onClick={fechar} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 18, color: DS.textMuted, lineHeight: 1 }} aria-label="Fechar">×</button>
            </div>
            {!confirmado && (
              <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {opcoesPerfil.map(o => (
                  <button key={o.id} onClick={() => acionar(o)}
                    style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: 14, borderRadius: 10, background: DS.bg, border: `1px solid ${DS.border}`, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', transition: 'border-color 0.15s' }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = o.color}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = DS.border}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: `${o.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{o.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: DS.text }}>{o.titulo}</div>
                      <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 1 }}>{o.sub}</div>
                      <div style={{ fontSize: 11, color: DS.textSec, marginTop: 6, lineHeight: 1.5 }}>{o.detalhe}</div>
                    </div>
                    <span style={{ color: o.color, fontSize: 18, alignSelf: 'center' }}>{o.extern ? '↗' : '›'}</span>
                  </button>
                ))}
              </div>
            )}
            {confirmado && (
              <div style={{ padding: 22, textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: `${confirmado.opcao.color}18`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 12 }}>{confirmado.opcao.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: DS.text, marginBottom: 4 }}>Demanda registrada</div>
                <div style={{ fontSize: 12, color: DS.textSec, lineHeight: 1.6, marginBottom: 14 }}>Sua solicitação para <strong>{confirmado.opcao.titulo}</strong> foi protocolada com origem na tela <em>{telaAtual || '—'}</em>. Você receberá retorno pelo e-mail institucional.</div>
                <div style={{ background: DS.bg, padding: 12, borderRadius: 8, fontSize: 11, color: DS.textMuted, fontFamily: 'monospace', textAlign: 'left', marginBottom: 14 }}>
                  evento: canal_comunicacao<br/>opção: {confirmado.opcao.id}<br/>tela: {telaAtual || '—'}<br/>perfil: {perfil}<br/>timestamp: {confirmado.ts}
                </div>
                <button onClick={fechar} style={{ padding: '9px 20px', borderRadius: 8, background: DS.blue, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: 13 }}>Fechar</button>
              </div>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
