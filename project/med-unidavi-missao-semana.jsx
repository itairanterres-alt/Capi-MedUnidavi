// =============================================================================
// MED-UNIDAVI · Missão da Semana (mu_missao_semana) — Bloco D2
// Complementa a "Missão do Dia" do Dashboard. Plano semanal gerado a partir
// de agenda da fase + lacunas de competência + próximas avaliações.
// Sugere, não impõe. Opt-in.
// =============================================================================

const MISSAO_SEMANA = {
  semana: 'Semana 14/05 — 20/05/2026',
  fase: '5ª fase · T14',
  contexto: [
    { tipo: 'agenda',    icon: '📅', titulo: 'Tutorial SP5.2 · sex 16/05', detalhe: 'Adesão à terapia anti-hipertensiva', cor: DS.blue },
    { tipo: 'agenda',    icon: '🏘',  titulo: 'IESC IV · qua 14/05',         detalhe: 'Visita BSV-009 · Dona Iracema',   cor: DS.green },
    { tipo: 'avaliacao', icon: '📊', titulo: 'TP · sáb 22/05',              detalhe: 'Teste de Progresso presencial',   cor: DS.terra },
    { tipo: 'gap',       icon: '🎯', titulo: 'Lacuna · C09 Saúde Mental',   detalhe: 'Volume alto, proficiência baixa', cor: DS.amber },
    { tipo: 'gap',       icon: '🎯', titulo: 'Lacuna · C05 Terapêutico',    detalhe: 'APC recente Dreyfus 2',           cor: DS.amber },
  ],
  itens: [
    { id: 'm1',  dia: 'seg', tipo: 'pilula',   titulo: 'Pílula · OARS · entrevista motivacional', dur: 2,  motivo: 'gap C05',     rota: 'pilulas' },
    { id: 'm2',  dia: 'seg', tipo: 'cards',    titulo: 'Capi-Cards · HAS · 12 cards',             dur: 15, motivo: 'prep SP5.2',  rota: 'capi-cards' },
    { id: 'm3',  dia: 'ter', tipo: 'hub',      titulo: 'Hub SP/UC · SP5.2 · objetivos e leituras',dur: 25, motivo: 'tutorial sex',rota: 'hub-spuc' },
    { id: 'm4',  dia: 'ter', tipo: 'questoes', titulo: '8 questões · Adesão e HAS',               dur: 12, motivo: 'gap C05',     rota: 'questoes' },
    { id: 'm5',  dia: 'qua', tipo: 'agenda',   titulo: 'IESC IV · visita BSV-009 · 8h',           dur: 180, motivo: 'currículo',  bloqueado: true },
    { id: 'm6',  dia: 'qua', tipo: 'reflexao', titulo: 'Reflexão Gibbs · pós-visita',             dur: 15, motivo: 'portfólio',   rota: 'reflexivo' },
    { id: 'm7',  dia: 'qui', tipo: 'pilula',   titulo: 'Pílula · SPIKES em 60s',                  dur: 1,  motivo: 'comunicação', rota: 'pilulas' },
    { id: 'm8',  dia: 'qui', tipo: 'questoes', titulo: '10 questões · Saúde Mental',              dur: 15, motivo: 'gap C09',     rota: 'questoes' },
    { id: 'm9',  dia: 'sex', tipo: 'agenda',   titulo: 'Tutorial SP5.2 · 14h',                    dur: 120, motivo: 'currículo',  bloqueado: true },
    { id: 'm10', dia: 'sex', tipo: 'cards',    titulo: 'Revisão FSRS do dia',                     dur: 10, motivo: 'rotina',      rota: 'capi-cards' },
    { id: 'm11', dia: 'sab', tipo: 'simulado', titulo: 'Simulado flash · 10 questões',            dur: 20, motivo: 'aquecimento TP', rota: 'simulado' },
    { id: 'm12', dia: 'sab', tipo: 'agenda',   titulo: 'Teste de Progresso · 8h presencial',      dur: 240, motivo: 'currículo',  bloqueado: true },
    { id: 'm13', dia: 'dom', tipo: 'verde',    titulo: '— Área Verde · descanso protegido —',     dur: 0,  motivo: 'DCN 2025',    bloqueado: true },
  ],
};

const DIA_LBL = { seg: 'Segunda', ter: 'Terça', qua: 'Quarta', qui: 'Quinta', sex: 'Sexta', sab: 'Sábado', dom: 'Domingo' };
const TIPO_ICON = { pilula: '💊', cards: '🃏', hub: '🧩', questoes: '📝', reflexao: '✍️', simulado: '⏱', agenda: '📅', verde: '🌱' };
const TIPO_COR  = { pilula: '#7A5CBF', cards: '#1D50A8', hub: '#1565C0', questoes: '#0E727C', reflexao: '#B97A0F', simulado: '#B23A2A', agenda: '#8E97B0', verde: '#2E7D4F' };

function MissaoSemanaScreen({ isMobile, onNavigate }) {
  const [optIn, setOptIn] = React.useState(true);
  const [feitos, setFeitos] = React.useState({});
  const dias = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'];

  const total = MISSAO_SEMANA.itens.filter(i => !i.bloqueado).length;
  const conc = Object.values(feitos).filter(Boolean).length;
  const pct = total ? Math.round((conc / total) * 100) : 0;
  const minTotais = MISSAO_SEMANA.itens.filter(i => !i.bloqueado).reduce((s, i) => s + i.dur, 0);

  if (!optIn) return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <TopBar title="Missão da Semana" subtitle="Opt-in · plano semanal sugerido" isMobile={isMobile}
        breadcrumb={[{ label: 'Início', onClick: () => onNavigate && onNavigate('dashboard') }, { label: 'Missão da Semana' }]} />
      <div style={{ padding: 24, maxWidth: 700, margin: '0 auto' }}>
        <Card style={{ padding: 28, textAlign: 'center' }}>
          <CapivaraDecorativa size={72} modo="treino" />
          <div style={{ fontSize: 17, fontWeight: 800, color: DS.text, marginTop: 14 }}>Ativar Missão da Semana?</div>
          <p style={{ fontSize: 13, color: DS.textSec, lineHeight: 1.6, marginTop: 8 }}>
            A Capi monta um plano semanal a partir da sua agenda, lacunas de competência e próximas avaliações.
            Sugere, não impõe. Você pode marcar como feito, pular, ou desativar a qualquer momento.
          </p>
          <button onClick={() => setOptIn(true)} style={{
            marginTop: 18, padding: '11px 22px', borderRadius: DS.radiusSm,
            background: DS.blue, color: '#fff', border: 'none', cursor: 'pointer',
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 800, fontSize: 13,
          }}>Ativar Missão da Semana ›</button>
        </Card>
      </div>
    </div>
  );

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <TopBar
        title="Missão da Semana"
        subtitle={MISSAO_SEMANA.semana}
        isMobile={isMobile}
        breadcrumb={[
          { label: 'Início', onClick: () => onNavigate && onNavigate('dashboard') },
          { label: 'Missão da Semana' },
        ]}
      />

      <div style={{ padding: isMobile ? 14 : '24px 32px', display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 1200, margin: '0 auto' }}>

        {/* Cabeçalho */}
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: isMobile ? 14 : 18, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr 1fr', gap: 14, alignItems: 'center', background: DS.blueLight }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <CapivaraDecorativa size={48} modo="treino" />
              <div>
                <div style={{ fontSize: 10.5, fontWeight: 800, color: DS.blue, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Capi · modo treino</div>
                <div style={{ fontSize: 13, color: DS.text, lineHeight: 1.5, marginTop: 2 }}>
                  Plano sugerido pra {MISSAO_SEMANA.fase}. <strong>Sugere, não impõe.</strong>
                </div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 800, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Progresso</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 2 }}>
                <span style={{ fontSize: 28, fontWeight: 800, color: DS.text, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{conc}</span>
                <span style={{ fontSize: 13, color: DS.textMuted }}>/ {total} · {pct}%</span>
              </div>
              <div style={{ height: 6, background: DS.borderLight, borderRadius: 3, overflow: 'hidden', marginTop: 6 }}>
                <div style={{ width: `${pct}%`, height: '100%', background: DS.green, transition: 'width 0.2s' }} />
              </div>
              <div style={{ fontSize: 10.5, color: DS.textMuted, marginTop: 4 }}>Total estimado: {minTotais} min</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
              <button onClick={() => setOptIn(false)} style={{
                padding: '6px 12px', borderRadius: DS.radiusSm,
                background: 'transparent', color: DS.textSec, border: `1px solid ${DS.border}`, cursor: 'pointer',
                fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 11,
              }}>Desativar</button>
              <span style={{ fontSize: 10, color: DS.textMuted }}>Opt-in · sem peso institucional</span>
            </div>
          </div>
        </Card>

        {/* Por que esse plano */}
        <Card style={{ padding: isMobile ? 14 : 18 }}>
          <SectionHeading>Por que esse plano</SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8 }}>
            {MISSAO_SEMANA.contexto.map((c, i) => (
              <div key={i} style={{
                padding: '10px 12px', borderRadius: DS.radiusSm,
                background: DS.bg, border: `1px solid ${DS.borderLight}`,
                borderLeft: `3px solid ${c.cor}`,
                display: 'flex', gap: 10, alignItems: 'flex-start',
              }}>
                <span style={{ fontSize: 16 }}>{c.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: DS.text, lineHeight: 1.3 }}>{c.titulo}</div>
                  <div style={{ fontSize: 10.5, color: DS.textMuted, marginTop: 2 }}>{c.detalhe}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Plano por dia */}
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${DS.border}`, background: DS.bg }}>
            <SectionHeading style={{ margin: 0 }}>Plano da semana</SectionHeading>
          </div>
          <div>
            {dias.map(d => {
              const itensDia = MISSAO_SEMANA.itens.filter(i => i.dia === d);
              if (itensDia.length === 0) return null;
              const totalMinDia = itensDia.filter(i => !i.bloqueado).reduce((s, i) => s + i.dur, 0);
              return (
                <div key={d} style={{
                  display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
                  borderBottom: `1px solid ${DS.borderLight}`,
                }}>
                  <div style={{
                    padding: isMobile ? '12px 16px 4px' : '14px 16px',
                    background: DS.bg,
                    borderRight: isMobile ? 'none' : `1px solid ${DS.borderLight}`,
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: DS.text, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{DIA_LBL[d]}</div>
                    {totalMinDia > 0 && (
                      <div style={{ fontSize: 10.5, color: DS.textMuted, marginTop: 2 }}>{totalMinDia} min · {itensDia.filter(i => !i.bloqueado).length} itens</div>
                    )}
                  </div>
                  <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {itensDia.map(i => {
                      const feito = !!feitos[i.id];
                      const bloqueado = i.bloqueado;
                      const cor = TIPO_COR[i.tipo] || DS.textMuted;
                      return (
                        <div key={i.id} style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '10px 12px', borderRadius: DS.radiusSm,
                          background: feito ? DS.greenLight : bloqueado ? DS.bg : DS.surface,
                          border: `1px solid ${feito ? DS.green + '40' : bloqueado ? DS.borderLight : DS.border}`,
                          borderLeft: `3px solid ${bloqueado ? DS.textMuted : feito ? DS.green : cor}`,
                          opacity: bloqueado ? 0.85 : 1,
                        }}>
                          {!bloqueado ? (
                            <button onClick={() => setFeitos(f => ({ ...f, [i.id]: !f[i.id] }))}
                              aria-label={feito ? 'Desmarcar' : 'Marcar como feito'}
                              style={{
                                width: 22, height: 22, borderRadius: '50%',
                                background: feito ? DS.green : 'transparent',
                                border: `1.5px solid ${feito ? DS.green : DS.border}`,
                                color: '#fff', cursor: 'pointer', flexShrink: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 800, fontSize: 11,
                              }}>{feito ? '✓' : ''}</button>
                          ) : (
                            <span style={{
                              width: 22, height: 22, display: 'inline-flex',
                              alignItems: 'center', justifyContent: 'center',
                              color: DS.textMuted, fontSize: 12,
                            }}>🔒</span>
                          )}
                          <span style={{ fontSize: 16, flexShrink: 0 }}>{TIPO_ICON[i.tipo]}</span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                              fontSize: 12.5, fontWeight: 700,
                              color: feito ? DS.textMuted : DS.text,
                              textDecoration: feito ? 'line-through' : 'none',
                              lineHeight: 1.35,
                            }}>{i.titulo}</div>
                            <div style={{ fontSize: 10.5, color: DS.textMuted, marginTop: 2 }}>
                              {bloqueado ? 'Bloco curricular fixo · ' : ''}{i.motivo}{i.dur > 0 ? ` · ${i.dur} min` : ''}
                            </div>
                          </div>
                          {i.rota && !bloqueado && (
                            <button onClick={() => onNavigate && onNavigate(i.rota)} style={{
                              padding: '5px 10px', borderRadius: DS.radiusSm,
                              background: DS.surface, color: cor,
                              border: `1px solid ${cor}30`, cursor: 'pointer',
                              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 800, fontSize: 10.5, whiteSpace: 'nowrap',
                            }}>Abrir ›</button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Rodapé */}
        <div style={{
          padding: '12px 16px', background: `${DS.blueAcc}08`, borderRadius: 8,
          fontSize: 11, color: DS.textMuted, lineHeight: 1.6, textAlign: 'center',
        }}>
          Missão da Semana é <strong>opt-in</strong>. Itens marcados como feitos não contam para nota, frequência ou
          progressão — servem só para você acompanhar seu próprio plano.
        </div>

        {isMobile && <div style={{ height: 60 }} />}
      </div>
    </div>
  );
}

Object.assign(window, { MissaoSemanaScreen, MISSAO_SEMANA });
