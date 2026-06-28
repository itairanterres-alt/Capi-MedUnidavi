// =============================================================================
// MED-UNIDAVI · Prática Clínica — Hub stub (rev. 30 abr 2026)
// 3 cards stub: Consulta Virtual · Preceptor Virtual · Round Virtual
// Todos com badge terracota "Em desenvolvimento" e Capi nomeado.
// =============================================================================

function PraticaClinicaScreen({ isMobile, onNavigate }) {
  const stubs = [
    {
      id: 'consulta',
      titulo: 'Consulta Virtual',
      resumo: 'Paciente virtual para anamnese dirigida e raciocínio clínico em ambulatório. Devolutiva em 2 estágios.',
      icone: '🩺',
    },
    {
      id: 'preceptor',
      titulo: 'Preceptor Virtual',
      resumo: 'Diálogo socrático com Capi sobre casos abertos. Ajuda a estruturar diferenciais e justificar conduta.',
      icone: '👨‍⚕️',
    },
    {
      id: 'round',
      titulo: 'Round Virtual',
      resumo: 'Discussão de caso enfermaria-style. Apresentação estruturada, perguntas dirigidas e plano terapêutico.',
      icone: '🏥',
    },
  ];

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <TopBar
        title="Prática Clínica"
        subtitle="Capi · preceptor virtual — três modalidades de paciente virtual em desenvolvimento"
        isMobile={isMobile}
        breadcrumb={onNavigate ? [
          { label: 'Início', onClick: () => onNavigate('dashboard') },
          { label: 'Prática Clínica' },
        ] : undefined}
      />

      <div style={{ padding: isMobile ? 16 : '24px 32px', display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1100 }}>

        {/* Cabeçalho com Capi + disclaimer */}
        <Card style={{ padding: isMobile ? 16 : 20, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <CapivaraDecorativa size={64} />
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
              Capi · preceptor virtual
            </div>
            <p style={{ margin: 0, fontSize: 13, color: DS.text, lineHeight: 1.6 }}>
              A Prática Clínica reúne três modalidades de paciente virtual conduzidas pela Capi: consulta ambulatorial,
              preceptoria socrática e round de enfermaria. Todas em desenvolvimento — casos validados pelo NDE entram
              progressivamente sob feature flag.
            </p>
          </div>
          <AIDisclaimer text="Capi conduz a simulação. A orientação clínica formal continua sendo função do preceptor humano." style={{ flexBasis: '100%' }} />
        </Card>

        {/* Stubs */}
        <SectionHeading>Modalidades</SectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
          {stubs.map(s => (
            <div key={s.id} style={{
              padding: 16, border: `1px solid ${DS.border}`, borderRadius: DS.radius,
              background: DS.surface, display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: DS.radiusSm,
                  background: DS.blueLight, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 20,
                }}>{s.icone}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: DS.text, lineHeight: 1.3 }}>{s.titulo}</div>
              </div>
              <div style={{ fontSize: 12.5, color: DS.textSec, lineHeight: 1.6, flex: 1 }}>{s.resumo}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: `1px solid ${DS.borderLight}` }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '4px 10px', borderRadius: 100,
                  background: DS.terraLight, color: DS.terra,
                  fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px',
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: DS.terra }} />
                  Em desenvolvimento
                </span>
                <span style={{ fontSize: 11, color: DS.textMuted, fontWeight: 600 }}>Capi</span>
              </div>
            </div>
          ))}
        </div>

        {isMobile && <div style={{ height: 60 }} />}
      </div>
    </div>
  );
}

Object.assign(window, { PraticaClinicaScreen });
