
// MED-UNIDAVI 2027 — Vitrine Institucional (stub mínimo)
// Tela top-level. Sem persona, sem capivara.
// Conteúdo elaborado virá em iteração seguinte.

function VitrineScreen({ isMobile }) {
  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg, fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <TopBar
        title="Vitrine Institucional"
        subtitle="Produção científica e indicadores do curso de Medicina UNIDAVI"
        isMobile={isMobile}
      />

      <div style={{ padding: isMobile ? '14px' : '24px 28px', maxWidth: 920 }}>
        <div style={{
          background: DS.surface,
          border: `1px dashed ${DS.border}`,
          borderRadius: DS.radiusLg,
          padding: isMobile ? '20px' : '32px',
          color: DS.textSec,
          lineHeight: 1.7,
          fontSize: 14,
        }}>
          <div style={{
            display: 'inline-block',
            padding: '3px 10px',
            borderRadius: 100,
            background: DS.amberLight,
            color: DS.amber,
            fontSize: 10.5,
            fontWeight: 800,
            letterSpacing: '0.4px',
            textTransform: 'uppercase',
            marginBottom: 14,
          }}>
            Em construção
          </div>

          <h2 style={{
            fontSize: isMobile ? 18 : 22,
            fontWeight: 800,
            color: DS.text,
            margin: '0 0 10px',
            lineHeight: 1.3,
          }}>
            Vitrine Institucional MED-UNIDAVI
          </h2>

          <p style={{ margin: '0 0 12px' }}>
            Espaço público de produção científica, indicadores do curso e
            agenda de eventos. Em construção — seções previstas:
          </p>

          <ul style={{ margin: '0 0 0 20px', padding: 0, color: DS.textSec }}>
            <li style={{ marginBottom: 4 }}>TCs públicos · Repositório UNIDAVI</li>
            <li style={{ marginBottom: 4 }}>Publicações NPCMed (3 linhas de pesquisa)</li>
            <li style={{ marginBottom: 4 }}>Projetos em execução</li>
            <li style={{ marginBottom: 4 }}>Eventos científicos · CIEPE XVI</li>
            <li style={{ marginBottom: 4 }}>Indicadores do curso (ENAMED, residência)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

window.VitrineScreen = VitrineScreen;
