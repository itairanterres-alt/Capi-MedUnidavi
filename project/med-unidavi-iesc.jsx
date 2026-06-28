// MED-UNIDAVI 2027 — Tela IESC · Capi (assistente territorial)

function IESCScreen({ isMobile, onNavigate }) {
  const [registrando, setRegistrando] = React.useState(false);

  const familia = {
    nome: 'Família Silva',
    codigo: 'BSV-042',
    ubs: 'UBS Bela Vista',
    membros: [
      { nome: 'José Silva', idade: 67, condicoes: ['HAS', 'DM2'], risco: 'alto' },
      { nome: 'Maria Silva', idade: 63, condicoes: ['Obesidade'], risco: 'medio' },
      { nome: 'Paulo Silva', idade: 38, condicoes: [], risco: 'baixo' },
    ],
  };

  const indicadores = [
    { label: 'PA controlada', status: false, membro: 'José' },
    { label: 'Glicemia controlada', status: false, membro: 'José' },
    { label: 'Consulta APS em dia', status: true, membro: 'Maria' },
    { label: 'Vacinas atualizadas', status: true, membro: 'Paulo' },
  ];

  const riscoColor = { alto: DS.terra, medio: DS.amber, baixo: DS.green };
  const riscoLabel = { alto: 'Alto risco', medio: 'Risco moderado', baixo: 'Baixo risco' };

  const cardBase = {
    background: DS.surface,
    borderRadius: DS.radiusLg,
    border: `1px solid ${DS.border}`,
    boxShadow: DS.shadow,
    padding: '18px',
  };

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg, fontFamily: 'IBM Plex Sans, sans-serif' }}>

      {/* Top bar */}
      <TopBar
        title="Interação Ensino-Serviço-Comunidade"
        subtitle="IESC III · 3ª Fase · UBS Bela Vista · Rio do Sul, SC · Preceptor: Dr. Alves"
        isMobile={isMobile}
        breadcrumb={[
          { label: 'Início', onClick: () => onNavigate && onNavigate('dashboard') },
          { label: 'IESC' },
        ]}
      />
      <div style={{ padding: isMobile ? '12px 16px 0' : '12px 32px 0' }}>
        <AIDisclaimer text="O acompanhamento real do território é feito pelo preceptor humano da UBS. Ferramentas digitais aqui são apoio à reflexão, não substituem orientação presencial." />
      </div>

      <div style={{ padding: isMobile ? '16px' : '24px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Visita domiciliar pendente */}
        <section>
          <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Visita domiciliar pendente</h3>
          <div style={{ ...cardBase, borderLeft: `4px solid ${DS.terra}` }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: DS.text, marginBottom: 4 }}>Visita à Família Silva — BSV-042</div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 12, color: DS.textSec }}>
                  <span>📍 Rua das Araucárias, 142 · Bela Vista</span>
                  <span>⏱ Prazo: hoje às 17h</span>
                  <span>👤 Preceptor: Dr. Alves</span>
                </div>
              </div>
              <span style={{ padding: '4px 12px', borderRadius: 100, background: DS.terra + '18', color: DS.terra, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>Pendente</span>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button
                onClick={() => { setRegistrando(true); setTimeout(() => setRegistrando(false), 2200); }}
                style={{
                  padding: '9px 18px', borderRadius: DS.radius,
                  background: registrando ? DS.green : DS.blue, color: '#fff',
                  border: 'none', cursor: 'pointer',
                  fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 13,
                  transition: 'background 0.3s',
                }}
              >
                {registrando ? '✓ Registrado!' : 'Registrar visita'}
              </button>
              <button style={{ padding: '9px 18px', borderRadius: DS.radius, background: 'transparent', border: `1px solid ${DS.border}`, color: DS.textSec, cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 13 }}>
                Ver roteiro da visita
              </button>
            </div>
          </div>
        </section>

        <div style={{ display: 'flex', gap: 20, flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start' }}>

          {/* Família vinculada */}
          <section style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Família vinculada — 3ª Fase</h3>
            <div style={cardBase}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, paddingBottom: 14, borderBottom: `1px solid ${DS.borderLight}` }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: DS.blueLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🏠</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: DS.text }}>{familia.nome} · {familia.codigo}</div>
                  <div style={{ fontSize: 12, color: DS.textMuted }}>{familia.ubs} · {familia.membros.length} membros</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {familia.membros.map((m, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: DS.bg, borderRadius: DS.radius }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: riscoColor[m.risco] + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', color: riscoColor[m.risco], fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                      {m.nome.split(' ')[0][0]}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: DS.text }}>{m.nome}, {m.idade} anos</div>
                      <div style={{ fontSize: 11, color: DS.textMuted }}>{m.condicoes.length ? m.condicoes.join(' · ') : 'Sem condições crônicas registradas'}</div>
                    </div>
                    <span style={{ padding: '3px 8px', borderRadius: 100, background: riscoColor[m.risco] + '18', color: riscoColor[m.risco], fontSize: 10, fontWeight: 700 }}>{riscoLabel[m.risco]}</span>
                  </div>
                ))}
              </div>
              {/* Indicadores de saúde */}
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${DS.borderLight}` }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Indicadores de saúde</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {indicadores.map((ind, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                      <span style={{ fontSize: 14 }}>{ind.status ? '✅' : '⚠️'}</span>
                      <span style={{ color: DS.text, flex: 1 }}>{ind.label}</span>
                      <span style={{ color: DS.textMuted }}>{ind.membro}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Coluna direita */}
          <div style={{ flex: isMobile ? 'auto' : '0 0 300px', display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Mapa do território */}
            <section>
              <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Mapa do território</h3>
              <div style={{ ...cardBase, padding: 0, overflow: 'hidden' }}>
                {/* Placeholder de mapa */}
                <div style={{ height: 160, background: 'linear-gradient(135deg, #C8D8E8 0%, #A8C0D4 50%, #B8CCE0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8, position: 'relative' }}>
                  {/* Grade de ruas simulada */}
                  <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
                    {[30,60,90,120].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#4A7A9B" strokeWidth="1" />)}
                    {[50,100,150,200,250,300].map(x => <line key={x} x1={x} y1="0" x2={x} y2="200" stroke="#4A7A9B" strokeWidth="1" />)}
                  </svg>
                  {/* Marcador UBS */}
                  <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                    <div style={{ fontSize: 28 }}>📍</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: DS.blueDark, background: 'rgba(255,255,255,0.9)', padding: '2px 8px', borderRadius: 4, marginTop: 4 }}>UBS Bela Vista</div>
                  </div>
                </div>
                <div style={{ padding: '12px 14px', borderTop: `1px solid ${DS.border}` }}>
                  <div style={{ fontSize: 12, color: DS.textSec }}>Território de abrangência: Bela Vista, Rio do Sul · Aprox. 3.200 hab.</div>
                  <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 4 }}>Visualização em mapa real disponível via EMAP/eSUS</div>
                </div>
              </div>
            </section>

            {/* Reflexão da visita */}
            <section>
              <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Reflexão da visita</h3>
              <div style={{ ...cardBase, background: `linear-gradient(135deg, ${DS.blueLight} 0%, #EEF2FB 100%)` }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0, border: `1px solid ${DS.border}` }}>✍</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: DS.text }}>Próximo passo</div>
                    <div style={{ fontSize: 11, color: DS.textSec }}>Portfólio Reflexivo</div>
                  </div>
                </div>
                <p style={{ margin: '0 0 12px', fontSize: 12, color: DS.textSec, lineHeight: 1.6 }}>
                  Após a visita, registre sua reflexão. Use o modelo Gibbs para estruturar sua experiência no território.
                </p>
                <button
                  onClick={() => onNavigate && onNavigate('reflexivo')}
                  style={{ width: '100%', padding: '9px', borderRadius: DS.radius, background: DS.blue, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 12 }}
                >
                  Ir ao Portfólio Reflexivo ›
                </button>
              </div>
            </section>

          </div>
        </div>

        {/* Selo de desenvolvimento */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', background: DS.bg, borderRadius: DS.radius, border: `1px dashed ${DS.border}` }}>
          <span style={{ fontSize: 14 }}>🔒</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted }}>Agente IA Capi territorial (interação conversacional)</div>
            <StatusFlag kind="flag" criterio="aguarda calibração da persona junto à Profa. Andreia Bertochi (IESC)" />
          </div>
        </div>

        {isMobile && <div style={{ height: 72 }} />}
      </div>
    </div>
  );
}

Object.assign(window, { IESCScreen });
