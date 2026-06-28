import React from 'react';
import { DS } from '../lib/ds.js';
import { CapiAvatar, CapivaraIcon } from '../components/Capi.jsx';

export default function DocenteScreen({ isMobile, onNavigate, subRoute, onAbrirPerfil, data }) {
  const alunos = data?.alunos ?? [
    { nome: 'Ana Lima',     fase: '3ª', turma: 'T16', status: 'ok',     tp: 58, tpHist: [42, 48, 52, 55, 58], dreyfusMed: 3.0, dreyfusTrend: 'up',   apcs: 3, ultRefl: { data: '12/09', titulo: 'SP4 — pneumonia comunitária' }, proxApc: { data: '02/10', epa: 'EPA-3 Exame físico' } },
    { nome: 'Carlos Sousa', fase: '3ª', turma: 'T16', status: 'risco',  tp: 31, tpHist: [40, 38, 35, 33, 31], dreyfusMed: 1.6, dreyfusTrend: 'down', apcs: 1, ultRefl: { data: '02/08', titulo: 'Tutorial — frustração com SP3' }, proxApc: { data: '28/09', epa: 'EPA-2 Anamnese' } },
    { nome: 'Fernanda Reis',fase: '5ª', turma: 'T14', status: 'ok',     tp: 52, tpHist: [44, 47, 49, 51, 52], dreyfusMed: 3.4, dreyfusTrend: 'up',   apcs: 5, ultRefl: { data: '14/09', titulo: 'IESC — visita à família BSV-009' }, proxApc: { data: '05/10', epa: 'EPA-4 Plano diagnóstico' } },
    { nome: 'João Melo',    fase: '5ª', turma: 'T14', status: 'atencao',tp: 41, tpHist: [50, 54, 58, 49, 41], dreyfusMed: 2.5, dreyfusTrend: 'down', apcs: 2, ultRefl: { data: '14/09', titulo: 'Limites da minha escuta em entrevistas difíceis' }, proxApc: { data: '03/10', epa: 'EPA-2 Anamnese' } },
    { nome: 'Livia Torres', fase: '3ª', turma: 'T16', status: 'ok',     tp: 63, tpHist: [55, 58, 61, 62, 63], dreyfusMed: 3.2, dreyfusTrend: 'up',   apcs: 4, ultRefl: { data: '11/09', titulo: 'Bioética — confidencialidade' }, proxApc: { data: '01/10', epa: 'EPA-3 Exame físico' } },
    { nome: 'Pedro Vilas',  fase: '6ª', turma: 'T13', status: 'risco',  tp: 28, tpHist: [38, 35, 32, 30, 28], dreyfusMed: 1.8, dreyfusTrend: 'down', apcs: 0, ultRefl: { data: '20/07', titulo: 'Sobrecarga e dúvidas no curso' }, proxApc: { data: '06/10', epa: 'EPA-2 Anamnese' } },
  ];

  const apcsAvaliar = data?.apcsAvaliar ?? [
    { aluno: 'Ana Lima',     epa: 'Anamnese clínica estruturada',    data: '22/04', fase: '3ª' },
    { aluno: 'Livia Torres', epa: 'Registro em prontuário SOAP',     data: '23/04', fase: '3ª' },
    { aluno: 'Fernanda Reis',epa: 'Exame físico do aparelho resp.',  data: '21/04', fase: '5ª' },
  ];

  const conteudoIA = data?.conteudoIA ?? [
    { titulo: 'Resumo: Hipertensão arterial — 3ª Fase', tipo: 'Resumo', uc: 'Morfofuncional III', data: '23/04' },
    { titulo: '5 questões DPOC — Nível R1', tipo: 'Questões', uc: 'Tutorial PBL', data: '22/04' },
    { titulo: 'Mapa conceitual: Coagulação', tipo: 'Mapa', uc: 'Morfofuncional III', data: '20/04' },
  ];

  const casosSim = data?.casosSim ?? [
    { titulo: 'Dor torácica aguda — caso clínico III', aluno: 'Carlos Sousa', etapa: '2º feedback', data: '23/04' },
    { titulo: 'Dispneia progressiva em idoso', aluno: 'João Melo', etapa: '1º feedback', data: '22/04' },
  ];

  const reflexoesPendentes = data?.reflexoesPendentes ?? [
    { aluno: 'João Melo',     data: '14/09', titulo: 'Limites da minha escuta em entrevistas difíceis', categoria: 'Tutorial' },
    { aluno: 'Carlos Sousa',  data: '02/08', titulo: 'Tutorial — frustração com SP3', categoria: 'Tutorial' },
    { aluno: 'Fernanda Reis', data: '14/09', titulo: 'IESC — visita à família BSV-009', categoria: 'IESC' },
  ];

  // alertas atitudinais aparecem só com triangulação suficiente
  const alertasAtitudinais = data?.alertasAtitudinais ?? []; // mock: nenhum tutorado dispara nesta demo

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
    if (onAbrirPerfil) onAbrirPerfil('docente', aluno);
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
