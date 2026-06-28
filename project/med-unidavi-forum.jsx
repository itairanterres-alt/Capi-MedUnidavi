// =============================================================================
// MED-UNIDAVI · Fórum por objeto pedagógico (mu_forum_objeto) — Bloco E1
// STUB · "Em desenvolvimento". Não implementar de verdade nesta rodada.
// =============================================================================

function ForumObjetoScreen({ isMobile, onNavigate }) {
  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <TopBar
        title="Fórum por objeto pedagógico"
        subtitle="Discussão atrelada a SP, caso, questão ou conferência"
        isMobile={isMobile}
        breadcrumb={[
          { label: 'Início', onClick: () => onNavigate && onNavigate('dashboard') },
          { label: 'Fórum' },
        ]}
      />
      <div style={{ padding: isMobile ? 14 : '24px 32px', maxWidth: 720, margin: '0 auto' }}>
        <Card style={{ padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 44, marginBottom: 10 }}>💬</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: DS.text }}>Fórum por objeto pedagógico</div>
          <p style={{ fontSize: 13, color: DS.textSec, lineHeight: 1.6, marginTop: 8 }}>
            Espaço de discussão assíncrona vinculado a um objeto específico — uma SP, um caso clínico, uma questão do
            banco ou uma conferência. Cada thread herda a metadata curricular do objeto e fica visível só para a turma
            do mesmo ciclo.
          </p>
          <div style={{
            marginTop: 18, display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 100,
            background: DS.terraLight, color: DS.terra,
            fontSize: 11, fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: DS.terra }} />
            Em desenvolvimento · feature flag
          </div>
          <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 18, lineHeight: 1.6 }}>
            Critério de ativação: moderação institucional definida; política de conteúdo aprovada pelo NDE;
            estrutura de denúncia em conformidade com LGPD e Código de Ética Médica.
          </div>
        </Card>
      </div>
    </div>
  );
}

Object.assign(window, { ForumObjetoScreen });
