// =============================================================================
// MED-UNIDAVI · Anotações contextuais (mu_anotacoes_contextuais) — Bloco D5
//
// COMPONENTE transversal, NÃO tela isolada. Pode ser plugado em qualquer
// objeto (questão, caso, SP, conferência, flashcard). A tela `notas` é
// só uma vitrine + central de busca/filtro dessas anotações.
//
// Inclui marcação temporal em vídeos (HH:MM:SS).
// =============================================================================

const NOTA_TIPOS = {
  questao:     { label: 'Questão',    icon: '📝', cor: '#0E727C' },
  caso:        { label: 'Caso',       icon: '🩺', cor: '#1565C0' },
  sp:          { label: 'SP',         icon: '🧩', cor: '#1D50A8' },
  conferencia: { label: 'Conferência',icon: '🎥', cor: '#C0571E' },
  flashcard:   { label: 'Capi-Card',  icon: '🃏', cor: '#7A5CBF' },
  pilula:      { label: 'Pílula',     icon: '💊', cor: '#7A5CBF' },
};

const NOTAS_MOCK = [
  {
    id: 'n1', tipo: 'conferencia',
    objeto: 'Conferência · Hipertensão arterial · Dr. Alves',
    contexto: 'UC1 5ª · 12/05/2026',
    timestamp: '14:32',
    texto: 'Algoritmo MAPA × MRPA: se discordância clínica vs. consultório > 10mmHg, MAPA tem prioridade. Confirmar com o tutor na sex.',
    tags: ['HAS', 'MAPA', 'MRPA'],
    competencias: ['dcn2025_comp_04'],
    criadaEm: '12/05/2026 16:14',
  },
  {
    id: 'n2', tipo: 'sp',
    objeto: 'SP5.2 · Adesão à terapia anti-hipertensiva',
    contexto: '5ª fase · UC1',
    texto: 'Dona Iracema esquece a dose da manhã porque toma com café. Pensar em mudar pra dose noturna — tem evidência? Confirmar antes do tutorial.',
    tags: ['adesão', 'IESC', 'BSV-009'],
    competencias: ['dcn2025_comp_05', 'dcn2025_comp_16'],
    criadaEm: '13/05/2026 09:02',
  },
  {
    id: 'n3', tipo: 'questao',
    objeto: 'Questão · IAMCSST inferior · DII DIII aVF',
    contexto: 'Meu Treino · 11/05',
    texto: 'Errei a alternativa de espelho — esqueci de checar aVL. Macete: inferior baixa → aVL sobe. Pílula IAM-território cobre isso.',
    tags: ['ECG', 'IAM', 'derivações'],
    competencias: ['dcn2025_comp_03'],
    criadaEm: '11/05/2026 22:43',
  },
  {
    id: 'n4', tipo: 'flashcard',
    objeto: 'Capi-Card · Aquaporinas — relevância clínica',
    contexto: 'Morfofuncional · 1ª fase',
    texto: 'Lembrar: AQP2 = ADH. Diabetes insípidus central vs nefrogênico distingue por resposta ao ADH exógeno.',
    tags: ['AQP2', 'ADH', 'diabetes insípidus'],
    competencias: ['dcn2025_comp_02'],
    criadaEm: '08/05/2026 19:55',
  },
  {
    id: 'n5', tipo: 'caso',
    objeto: 'Caso · Dispneia progressiva em idoso',
    contexto: 'Prática Clínica · Preceptor Virtual',
    texto: 'Diferencial: ICC vs DPOC exacerbado. BNP > 400 já sugere ICC. RX com cardiomegalia + sinais congestivos confirma. Treinar exame de bulhas.',
    tags: ['dispneia', 'ICC', 'DPOC'],
    competencias: ['dcn2025_comp_03'],
    criadaEm: '10/05/2026 14:18',
  },
  {
    id: 'n6', tipo: 'pilula',
    objeto: 'Pílula · SPIKES em 60s',
    contexto: 'Capi-Pílulas',
    texto: 'Segurar o silêncio depois da notícia é a parte mais difícil. Praticar em um dos roleplays de SPIKES da trilha de habilidade.',
    tags: ['comunicação', 'SPIKES'],
    competencias: ['dcn2025_comp_16'],
    criadaEm: '09/05/2026 21:08',
  },
];

// ── Componente transversal: botão flutuante para anotar em qualquer objeto ──
function AnotacaoChip({ objeto, tipo = 'sp', contexto = '', timestamp = null, onSalvar }) {
  const [aberto, setAberto] = React.useState(false);
  const meta = NOTA_TIPOS[tipo] || NOTA_TIPOS.sp;

  return (
    <>
      <button onClick={() => setAberto(true)} style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '6px 12px', borderRadius: 100,
        background: meta.cor + '14', color: meta.cor,
        border: `1px solid ${meta.cor}30`,
        cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif',
        fontWeight: 700, fontSize: 11,
      }}>
        ✎ Anotar {timestamp ? `em ${timestamp}` : 'neste objeto'}
      </button>
      {aberto && (
        <AnotacaoEditor
          objeto={objeto} tipo={tipo} contexto={contexto} timestamp={timestamp}
          onSalvar={(nota) => { onSalvar && onSalvar(nota); setAberto(false); }}
          onCancelar={() => setAberto(false)}
        />
      )}
    </>
  );
}

function AnotacaoEditor({ objeto, tipo, contexto, timestamp, onSalvar, onCancelar }) {
  const [texto, setTexto] = React.useState('');
  const [tags, setTags] = React.useState('');
  const meta = NOTA_TIPOS[tipo] || NOTA_TIPOS.sp;

  const salvar = () => {
    if (!texto.trim()) return;
    onSalvar({
      tipo, objeto, contexto, timestamp,
      texto: texto.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    });
  };

  return (
    <div onClick={onCancelar} style={{
      position: 'fixed', inset: 0, background: 'rgba(8,12,20,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 200,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: DS.surface, borderRadius: DS.radiusLg, maxWidth: 520, width: '100%',
        padding: 20, fontFamily: 'IBM Plex Sans, sans-serif',
        boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <span style={{
              padding: '3px 9px', borderRadius: 100, fontSize: 10, fontWeight: 800,
              background: meta.cor + '18', color: meta.cor,
            }}>{meta.icon} {meta.label}{timestamp ? ` · ${timestamp}` : ''}</span>
            <div style={{ fontSize: 13, fontWeight: 700, color: DS.text, marginTop: 6, lineHeight: 1.35 }}>{objeto}</div>
            {contexto && <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 2 }}>{contexto}</div>}
          </div>
          <button onClick={onCancelar} style={{
            width: 28, height: 28, borderRadius: '50%', background: DS.bg,
            border: `1px solid ${DS.border}`, cursor: 'pointer', color: DS.textSec, fontSize: 14, fontWeight: 800,
          }}>×</button>
        </div>
        <textarea value={texto} onChange={(e) => setTexto(e.target.value)} autoFocus
          placeholder="Escreva sua anotação. Seja conciso — você vai querer reler isso depois."
          rows={4} style={{
            width: '100%', padding: '10px 12px', borderRadius: DS.radiusSm,
            border: `1.5px solid ${DS.border}`, fontFamily: 'IBM Plex Sans, sans-serif',
            fontSize: 13, color: DS.text, resize: 'vertical', lineHeight: 1.55, minHeight: 90,
          }} />
        <input value={tags} onChange={(e) => setTags(e.target.value)}
          placeholder="Tags separadas por vírgula (ex: HAS, adesão, IESC)"
          style={{
            marginTop: 8, width: '100%', padding: '8px 10px', borderRadius: DS.radiusSm,
            border: `1px solid ${DS.border}`, fontFamily: 'IBM Plex Sans, sans-serif',
            fontSize: 12, color: DS.text,
          }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, gap: 8 }}>
          <div style={{ fontSize: 10.5, color: DS.textMuted, lineHeight: 1.5 }}>
            Privada · pesquisável · LGPD por ID interno
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={onCancelar} style={{
              padding: '8px 12px', borderRadius: DS.radiusSm,
              background: 'transparent', color: DS.textSec, border: `1px solid ${DS.border}`, cursor: 'pointer',
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 12,
            }}>Cancelar</button>
            <button onClick={salvar} disabled={!texto.trim()} style={{
              padding: '8px 14px', borderRadius: DS.radiusSm,
              background: texto.trim() ? DS.blue : DS.borderLight,
              color: texto.trim() ? '#fff' : DS.textMuted,
              border: 'none', cursor: texto.trim() ? 'pointer' : 'not-allowed',
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 800, fontSize: 12,
            }}>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Tela vitrine: lista, busca, filtros ────────────────────────────────────
function AnotacoesScreen({ isMobile, onNavigate }) {
  const [notas, setNotas] = React.useState(NOTAS_MOCK);
  const [busca, setBusca] = React.useState('');
  const [filtroTipo, setFiltroTipo] = React.useState('todos');
  const [demo, setDemo] = React.useState(false);

  const filtradas = notas.filter(n => {
    if (filtroTipo !== 'todos' && n.tipo !== filtroTipo) return false;
    if (!busca.trim()) return true;
    const q = busca.toLowerCase();
    return n.texto.toLowerCase().includes(q)
      || n.objeto.toLowerCase().includes(q)
      || (n.tags || []).some(t => t.toLowerCase().includes(q));
  });

  const adicionarNota = (nota) => {
    setNotas(ns => [{
      id: 'n-' + Date.now(),
      ...nota,
      criadaEm: new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      competencias: [],
    }, ...ns]);
  };

  // Contagem por tipo
  const contagem = Object.keys(NOTA_TIPOS).reduce((acc, k) => {
    acc[k] = notas.filter(n => n.tipo === k).length; return acc;
  }, {});

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <TopBar
        title="Minhas Anotações"
        subtitle="Pesquisável · privada · vinculada ao objeto · LGPD"
        isMobile={isMobile}
        breadcrumb={[
          { label: 'Início', onClick: () => onNavigate && onNavigate('dashboard') },
          { label: 'Anotações' },
        ]}
      />

      <div style={{ padding: isMobile ? 14 : '24px 32px', display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 1100, margin: '0 auto' }}>

        {/* Disclaimer transversal */}
        <Card style={{ padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', background: DS.blueLight }}>
          <span style={{ fontSize: 22 }}>📓</span>
          <div style={{ flex: 1, minWidth: 220, fontSize: 12, color: DS.text, lineHeight: 1.55 }}>
            <strong>Componente transversal.</strong> Anotações <strong>não são uma tela isolada</strong> — você pode
            anotar em qualquer objeto (questão, caso, SP, conferência, flashcard, pílula). Esta tela é só a vitrine.
            Em conferências e cards, marca também o tempo do vídeo.
          </div>
          <button onClick={() => setDemo(true)} style={{
            padding: '7px 12px', borderRadius: DS.radiusSm,
            background: DS.blue, color: '#fff', border: 'none', cursor: 'pointer',
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 800, fontSize: 11,
          }}>+ Anotar (demo)</button>
        </Card>

        {/* Busca + filtros */}
        <Card style={{ padding: 12 }}>
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="🔍 Buscar em todas as suas anotações — texto, objeto, tag…"
            style={{
              width: '100%', padding: '11px 14px', borderRadius: DS.radiusSm,
              border: `1px solid ${DS.border}`, fontFamily: 'IBM Plex Sans, sans-serif',
              fontSize: 13, color: DS.text,
            }}
          />
          <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            <button onClick={() => setFiltroTipo('todos')} style={{
              padding: '6px 12px', borderRadius: 100,
              background: filtroTipo === 'todos' ? DS.blueDark : 'transparent',
              color: filtroTipo === 'todos' ? '#fff' : DS.textDark,
              border: `1px solid ${filtroTipo === 'todos' ? DS.blueDark : DS.border}`,
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 11, cursor: 'pointer',
            }}>Todas ({notas.length})</button>
            {Object.entries(NOTA_TIPOS).map(([k, v]) => {
              const ativo = filtroTipo === k;
              return (
                <button key={k} onClick={() => setFiltroTipo(k)} style={{
                  padding: '6px 12px', borderRadius: 100,
                  background: ativo ? v.cor : 'transparent',
                  color: ativo ? '#fff' : DS.textDark,
                  border: `1px solid ${ativo ? v.cor : DS.border}`,
                  fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 11, cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                }}>
                  <span style={{ fontSize: 12 }}>{v.icon}</span>{v.label} ({contagem[k]})
                </button>
              );
            })}
          </div>
        </Card>

        {/* Lista */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtradas.length === 0 && (
            <Card style={{ padding: 22, textAlign: 'center', color: DS.textMuted, fontSize: 13 }}>
              Nenhuma anotação encontrada. Tente outra busca ou filtro.
            </Card>
          )}
          {filtradas.map(n => {
            const meta = NOTA_TIPOS[n.tipo] || NOTA_TIPOS.sp;
            return (
              <Card key={n.id} style={{ padding: 14, borderLeft: `3px solid ${meta.cor}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '2px 8px', borderRadius: 100, fontSize: 10, fontWeight: 800,
                      background: meta.cor + '18', color: meta.cor,
                    }}>{meta.icon} {meta.label}{n.timestamp ? ` · ${n.timestamp}` : ''}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: DS.text }}>{n.objeto}</span>
                  </div>
                  <span style={{ fontSize: 10.5, color: DS.textMuted, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{n.criadaEm}</span>
                </div>
                {n.contexto && (
                  <div style={{ fontSize: 11, color: DS.textMuted, marginBottom: 6 }}>{n.contexto}</div>
                )}
                <div style={{ fontSize: 13, color: DS.text, lineHeight: 1.6 }}>{n.texto}</div>
                {n.tags && n.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 8 }}>
                    {n.tags.map((t, i) => (
                      <span key={i} style={{
                        padding: '2px 8px', borderRadius: 100, fontSize: 10, fontWeight: 700,
                        background: DS.bg, color: DS.textSec, border: `1px solid ${DS.borderLight}`,
                      }}>#{t}</span>
                    ))}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Rodapé */}
        <div style={{
          padding: '12px 16px', background: `${DS.blueAcc}08`, borderRadius: 8,
          fontSize: 11, color: DS.textMuted, lineHeight: 1.6, textAlign: 'center',
        }}>
          Notas são <strong>privadas</strong> · não compartilhadas com tutor ou coordenação. Indexadas por ID interno (LGPD).
        </div>

        {isMobile && <div style={{ height: 60 }} />}
      </div>

      {demo && (
        <AnotacaoEditor
          objeto="Conferência · DPOC · Dr. Eduardo Stahnke" tipo="conferencia"
          contexto="UC2 3ª · 14/05/2026"
          timestamp="08:24"
          onSalvar={(n) => { adicionarNota(n); setDemo(false); }}
          onCancelar={() => setDemo(false)}
        />
      )}
    </div>
  );
}

Object.assign(window, {
  AnotacaoChip, AnotacaoEditor, AnotacoesScreen, NOTA_TIPOS, NOTAS_MOCK,
});
