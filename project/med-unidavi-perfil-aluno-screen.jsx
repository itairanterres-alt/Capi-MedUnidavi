// =============================================================================
// MED-UNIDAVI · Perfil do Aluno · Orquestrador (Screen)
// Carregar APÓS med-unidavi-perfil-aluno.jsx e med-unidavi-perfil-aluno-p2.jsx
// =============================================================================

function PerfilAlunoScreen({ isMobile, alunoId, origem, onVoltar, onNavigate }) {
  // Por ora, mock único: João Melo. Em produção, busca por alunoId.
  const aluno = JOAO_MELO;
  const origemLabel = origem === 'docente' ? 'Painel do Tutor'
                    : origem === 'coordenacao' ? 'Coordenação'
                    : 'Voltar';

  // Accordion mobile (≤380px) — Bloco 1 sempre aberto.
  const accordion = isMobile;
  const [open, setOpen] = React.useState({ b2: false, b3: false, b4: false, bEnamed: false, b5: false, b6: false, b7: false, b8: false, b9: false });
  const toggle = (k) => setOpen(o => ({ ...o, [k]: !o[k] }));
  const Acc = ({ id, titulo, sub, children }) => {
    if (!accordion) return children;
    const isOpen = open[id];
    return (
      <div style={{ background: DS.surface, borderRadius: 10, border: `1px solid ${DS.border}`, overflow: 'hidden' }}>
        <button onClick={() => toggle(id)} style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', padding: '14px 16px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'inherit' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: DS.text }}>{titulo}</div>
            {sub && <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 2 }}>{sub}</div>}
          </div>
          <span style={{ fontSize: 12, color: DS.textMuted, transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}>›</span>
        </button>
        {isOpen && <div style={{ padding: '0 16px 16px' }}>{children}</div>}
      </div>
    );
  };

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <TopBar
        title={`Perfil · ${aluno.nome}`}
        subtitle={`${aluno.turma} · ${aluno.fase} · drilldown longitudinal · ${COMPETENCIAS_27.length} competências DCN 2025`}
        isMobile={isMobile}
        breadcrumb={[
          { label: origemLabel, onClick: onVoltar },
          { label: aluno.nome },
        ]}
      />
      <div style={{ padding: isMobile ? 12 : '24px 32px', display: 'flex', flexDirection: 'column', gap: isMobile ? 10 : 24, maxWidth: 1400, margin: '0 auto' }}>

        {/* BLOCO 1 — sempre fixo aberto */}
        <BlocoCabecalho aluno={aluno} isMobile={isMobile} onVoltar={onVoltar} origemLabel={origemLabel} />

        <Acc id="b2" titulo="Matriz programática" sub="27 competências × 5 semestres">
          <BlocoMatrizProgramatica matriz={JOAO_MATRIZ} isMobile={isMobile} />
        </Acc>
        <Acc id="b3" titulo="Trajetória por UC" sub={`${aluno.ucs.length} UCs · 1ª–5ª fase`}>
          <BlocoTrajetoriaUC ucs={aluno.ucs} isMobile={isMobile} />
        </Acc>
        <Acc id="b4" titulo="APCs" sub={`${aluno.apcs.length} EPAs longitudinais`}>
          <BlocoAPCs apcs={aluno.apcs} isMobile={isMobile} />
        </Acc>

        {/* BlocoPreferencias — visível para o próprio aluno (self-view) */}
        {origem !== 'docente' && origem !== 'coordenacao' && typeof BlocoPreferencias === 'function' && (
          <Acc id="bPrefs" titulo="Preferências de estudo" sub="Como o Capi se adapta ao seu ritmo">
            <BlocoPreferencias isMobile={isMobile} />
          </Acc>
        )}
        <Acc id="bEnamed" titulo="Status ENAMED" sub="Nota projetada · coorte prevista">
          <BlocoStatusENAMED aluno={aluno} isMobile={isMobile} />
        </Acc>
        <Acc id="b5" titulo="Portfólio reflexivo" sub={`${aluno.portfolio.entradas.length} entradas`}>
          <BlocoPortfolio portfolio={aluno.portfolio} isMobile={isMobile} onAbrirCompleto={() => onNavigate && onNavigate('reflexivo')} />
        </Acc>
        <Acc id="b6" titulo="Treino" sub="Banco ENAMED">
          <BlocoTreino treino={aluno.treino} isMobile={isMobile} />
        </Acc>
        <Acc id="b7" titulo="IESC" sub="Território Bela Vista">
          <BlocoIESC iesc={aluno.iesc} isMobile={isMobile} />
        </Acc>
        <Acc id="b8" titulo="IC" sub={aluno.ic.modalidade}>
          <BlocoIC ic={aluno.ic} isMobile={isMobile} />
        </Acc>
        <Acc id="b9" titulo="Atitudinal" sub="Frequência · feedbacks · alertas">
          <BlocoAtitudinal atitudinal={aluno.atitudinal} isMobile={isMobile} />
        </Acc>

        {/* BLOCO Conquistas + Notificações — quando o perfil é do próprio aluno */}
        <BlocoConquistas isMobile={isMobile} />

        {/* rodapé */}
        <div style={{
          padding: 16, background: `${DS.blueAcc}08`, borderRadius: 8, fontSize: 11,
          color: DS.textMuted, lineHeight: 1.6, textAlign: 'center',
        }}>
          Perfil do Aluno · materializa o destino final dos eventos de avaliação capturados pelo sistema
          desde o go-live, indexado por ID interno (LGPD). Modelo agnóstico ao tipo de escala (conceitos +
          escalas distintas APC/Logbook). Curadoria docente obrigatória sobre toda síntese gerada por IA.
        </div>
      </div>
    </div>
  );
}

// ── BLOCO Conquistas (gamificação leve) ──────────────────────────────────────
function BlocoConquistas({ isMobile }) {
  const [notif, setNotif] = React.useState(false);
  const conquistas = [
    { emoji: '🃏', label: '100 cards revisados', sub: 'Capi-Cards' },
    { emoji: '📋', label: '1ª SP concluída',     sub: 'Tutorial PBL' },
    { emoji: '🎯', label: '10 questões ENAMED',   sub: 'Meu Treino' },
  ];
  return (
    <Card style={{ padding: isMobile ? 16 : 20 }}>
      <SectionHeading>Conquistas</SectionHeading>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
        {conquistas.map((c, i) => (
          <div key={i} style={{
            padding: '12px 14px', borderRadius: DS.radius,
            background: DS.blueLight, border: `1px solid ${DS.blueAcc}30`,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%', background: DS.surface,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, flexShrink: 0,
            }}>{c.emoji}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: DS.text, lineHeight: 1.3 }}>{c.label}</div>
              <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 2 }}>{c.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Toggle notificação */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 14px', borderRadius: DS.radiusSm,
        background: DS.bg, border: `1px solid ${DS.borderLight}`,
      }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: DS.text }}>Notificação diária de estudo</div>
          <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 2 }}>
            Lembrete às 19h para manter sua sequência. Desligado por padrão.
          </div>
        </div>
        <button onClick={() => setNotif(!notif)} aria-pressed={notif} style={{
          width: 42, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
          background: notif ? DS.green : DS.border, position: 'relative',
          transition: 'background 0.15s', flexShrink: 0,
        }}>
          <span style={{
            position: 'absolute', top: 2, left: notif ? 20 : 2,
            width: 20, height: 20, borderRadius: '50%', background: '#fff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.15s',
          }} />
        </button>
      </div>
    </Card>
  );
}

Object.assign(window, { PerfilAlunoScreen });
