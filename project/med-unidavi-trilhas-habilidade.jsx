// =============================================================================
// MED-UNIDAVI · Trilhas de Habilidade (mu_trilhas_habilidade) — Bloco D4
//
// Objetos de aprendizagem curtos, opt-in, transversais às fases. Não
// substituem currículo. Inclui sub-caso obrigatório:
//   · Trilha de Onboarding PBL — 1ª fase, primeiras 2 semanas.
//
// Acesso: rota top-level `trilhas`. Atalho na navbar demo.
// =============================================================================

const TRILHAS = [
  {
    id: 'onboarding-pbl',
    titulo: 'Trilha de Onboarding PBL',
    subtitulo: 'Bem-vindo ao currículo · 1ª fase',
    tag: 'OBRIGATÓRIA · 1ª fase',
    tagCor: DS.terra,
    duracao: '~2h em 5 dias',
    fasesAlvo: '1ª fase · primeiras 2 semanas',
    descricao: 'Conjunto curto que explica o método PBL, o papel do tutor, do estudante, do grupo e da síntese final. Termina com a primeira SP simulada para você praticar antes da real.',
    licoes: [
      { titulo: 'O que é PBL e por que aqui?',       dur: '6 min', tipo: 'vídeo'  },
      { titulo: 'Sete passos · o método do encontro', dur: '12 min', tipo: 'vídeo' },
      { titulo: 'Como é um bom rascunho de hipótese', dur: '8 min',  tipo: 'leitura' },
      { titulo: 'A síntese final — modelo comentado', dur: '10 min', tipo: 'leitura' },
      { titulo: 'Quiz curto · 6 questões',            dur: '8 min',  tipo: 'quiz' },
      { titulo: 'SP simulada · primeiro ciclo',       dur: '40 min', tipo: 'prática' },
    ],
    competencias: ['dcn2025_comp_20', 'dcn2025_comp_26'],
    progresso: 0,
    destaque: true,
  },
  {
    id: 'ecg-plantao',
    titulo: 'ECG no plantão',
    subtitulo: '12 derivações em 12 minutos',
    tag: 'POPULAR',
    tagCor: DS.green,
    duracao: '~1h20',
    fasesAlvo: '5ª–10ª fase',
    descricao: 'Leitura sistemática do ECG na primeira impressão. Foca em situações típicas de plantão: IAM, arritmias frequentes, distúrbios de condução.',
    licoes: [
      { titulo: 'Eixo, ritmo, frequência — em 60s',   dur: '10 min', tipo: 'vídeo' },
      { titulo: 'Padrões de IAM por território',      dur: '14 min', tipo: 'vídeo' },
      { titulo: 'Arritmias: FA, flutter, taqui SV',   dur: '12 min', tipo: 'vídeo' },
      { titulo: 'BAV e bloqueios de ramo',            dur: '10 min', tipo: 'vídeo' },
      { titulo: '20 ECGs comentados',                 dur: '30 min', tipo: 'prática' },
    ],
    competencias: ['dcn2025_comp_03', 'dcn2025_comp_07'],
    progresso: 65,
  },
  {
    id: 'comunicacao-mas-noticias',
    titulo: 'Comunicação de más notícias',
    subtitulo: 'Protocolo SPIKES aplicado',
    tag: 'TRANSVERSAL',
    tagCor: DS.blue,
    duracao: '~50 min',
    fasesAlvo: '4ª fase em diante',
    descricao: 'Estrutura da conversa difícil. Roteiro SPIKES, ensaios em pares e modelos comentados. Foco no que é dito antes, durante e depois.',
    licoes: [
      { titulo: 'SPIKES — visão geral',                dur: '8 min',  tipo: 'vídeo' },
      { titulo: 'Cenários: diagnóstico oncológico',    dur: '12 min', tipo: 'vídeo' },
      { titulo: 'Cenários: óbito por trauma agudo',    dur: '10 min', tipo: 'vídeo' },
      { titulo: 'Ensaio em pares · roteiros impressos', dur: '20 min', tipo: 'prática' },
    ],
    competencias: ['dcn2025_comp_16', 'dcn2025_comp_18', 'dcn2025_comp_14'],
    progresso: 0,
  },
  {
    id: 'entrevista-motivacional',
    titulo: 'Entrevista motivacional · OARS',
    subtitulo: 'Adesão e mudança comportamental',
    tag: 'PRÁTICA',
    tagCor: '#7A5CBF',
    duracao: '~45 min',
    fasesAlvo: '5ª fase em diante',
    descricao: 'Técnica OARS para conduzir adesão terapêutica em hipertensos, diabéticos, tabagistas. Modelos de fala e contramodelos.',
    licoes: [
      { titulo: 'O que é entrevista motivacional',     dur: '7 min',  tipo: 'vídeo' },
      { titulo: 'O — perguntas abertas',               dur: '6 min',  tipo: 'vídeo' },
      { titulo: 'A — afirmações; R — reflexões',       dur: '10 min', tipo: 'vídeo' },
      { titulo: 'S — sumarizar e o paciente sai falando',dur: '8 min',  tipo: 'vídeo' },
      { titulo: 'Roleplay · 3 cenários',                dur: '14 min', tipo: 'prática' },
    ],
    competencias: ['dcn2025_comp_05', 'dcn2025_comp_16'],
    progresso: 30,
  },
  {
    id: 'usp-prescricao',
    titulo: 'Uso seguro de prescrição',
    subtitulo: 'Erros frequentes e como evitá-los',
    tag: 'SEGURANÇA',
    tagCor: DS.amber,
    duracao: '~1h',
    fasesAlvo: '6ª fase em diante',
    descricao: 'Os 10 erros mais comuns na prescrição em enfermaria. Receita por extenso, ajuste renal, interações relevantes, alerta de dose máxima.',
    licoes: [
      { titulo: 'Anatomia de uma receita segura',      dur: '10 min', tipo: 'vídeo' },
      { titulo: 'Ajuste renal — quando e como',        dur: '12 min', tipo: 'vídeo' },
      { titulo: 'Interações: top-20 que importam',     dur: '15 min', tipo: 'vídeo' },
      { titulo: '15 receitas para corrigir',           dur: '20 min', tipo: 'prática' },
    ],
    competencias: ['dcn2025_comp_05', 'dcn2025_comp_17'],
    progresso: 0,
  },
  {
    id: 'busca-pubmed',
    titulo: 'Busca dirigida na PubMed',
    subtitulo: 'Estratégia em 20 minutos',
    tag: 'PESQUISA',
    tagCor: '#0E727C',
    duracao: '~30 min',
    fasesAlvo: 'todas',
    descricao: 'MeSH, filtros, operadores booleanos e os atalhos que economizam tempo. Termina com sua primeira estratégia de busca pronta para a IC.',
    licoes: [
      { titulo: 'PICO em 5 minutos',                   dur: '5 min',  tipo: 'vídeo' },
      { titulo: 'MeSH e operadores',                   dur: '8 min',  tipo: 'vídeo' },
      { titulo: 'Construir sua estratégia',            dur: '10 min', tipo: 'prática' },
      { titulo: 'Salvar e gerar alerta',               dur: '5 min',  tipo: 'leitura' },
    ],
    competencias: ['dcn2025_comp_27', 'dcn2025_comp_24'],
    progresso: 0,
  },
];

const ICONE_TIPO = { 'vídeo': '🎥', 'leitura': '📖', 'quiz': '✅', 'prática': '🎯' };

function TrilhasHabilidadeScreen({ isMobile, onNavigate }) {
  const [trilhaAberta, setTrilhaAberta] = React.useState(null);
  const [onboardingAberto, setOnboardingAberto] = React.useState(false);
  const [filtro, setFiltro] = React.useState('todas');

  const filtradas = filtro === 'todas'
    ? TRILHAS
    : filtro === 'em-curso'
      ? TRILHAS.filter(t => t.progresso > 0 && t.progresso < 100)
      : filtro === 'destaque'
        ? TRILHAS.filter(t => t.destaque)
        : TRILHAS;

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <TopBar
        title="Trilhas de Habilidade"
        subtitle="Objetos curtos, opt-in, transversais às fases · não substituem currículo"
        isMobile={isMobile}
        breadcrumb={[
          { label: 'Início', onClick: () => onNavigate && onNavigate('dashboard') },
          { label: 'Trilhas de Habilidade' },
        ]}
      />

      <div style={{ padding: isMobile ? 14 : '24px 32px', display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 1200, margin: '0 auto' }}>

        {/* Destaque Onboarding (sempre visível) */}
        <TrilhaOnboardingDestaque
          trilha={TRILHAS.find(t => t.id === 'onboarding-pbl')}
          onAbrir={() => setOnboardingAberto(true)}
        />

        {/* Filtros */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginRight: 4 }}>Filtrar:</span>
          {[
            { id: 'todas',     label: `Todas (${TRILHAS.length})` },
            { id: 'em-curso',  label: `Em curso (${TRILHAS.filter(t => t.progresso > 0 && t.progresso < 100).length})` },
            { id: 'destaque',  label: 'Recomendadas' },
          ].map(opt => {
            const ativo = filtro === opt.id;
            return (
              <button key={opt.id} onClick={() => setFiltro(opt.id)} style={{
                padding: '6px 12px', borderRadius: 100,
                background: ativo ? DS.blueDark : 'transparent',
                color: ativo ? '#fff' : DS.textDark,
                border: `1px solid ${ativo ? DS.blueDark : DS.border}`,
                fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 11, cursor: 'pointer',
              }}>{opt.label}</button>
            );
          })}
        </div>

        {/* Catálogo */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
          {filtradas.filter(t => t.id !== 'onboarding-pbl').map(t => (
            <TrilhaCard key={t.id} trilha={t} onAbrir={() => setTrilhaAberta(t)} />
          ))}
        </div>

        {/* Rodapé */}
        <div style={{
          padding: '12px 16px', background: `${DS.blueAcc}08`, borderRadius: 8,
          fontSize: 11, color: DS.textMuted, lineHeight: 1.6, textAlign: 'center',
        }}>
          Trilhas são <strong>opt-in</strong> — não pesam no fluxo curricular obrigatório. A trilha
          de Onboarding PBL é a única recomendada para todos os ingressantes na 1ª fase.
        </div>

        {isMobile && <div style={{ height: 60 }} />}
      </div>

      {trilhaAberta && (
        <TrilhaDrilldown trilha={trilhaAberta} onClose={() => setTrilhaAberta(null)} />
      )}
      {onboardingAberto && typeof OnboardingFlow === 'function' && (
        <OnboardingFlow onClose={() => {
          setOnboardingAberto(false);
          setTrilhaAberta(TRILHAS.find(t => t.id === 'onboarding-pbl'));
        }} />
      )}
    </div>
  );
}

function TrilhaOnboardingDestaque({ trilha, onAbrir }) {
  return (
    <button onClick={onAbrir} style={{
      textAlign: 'left', padding: 0, border: 'none', cursor: 'pointer',
      borderRadius: DS.radiusLg, overflow: 'hidden', boxShadow: DS.shadowMd,
      fontFamily: 'IBM Plex Sans, sans-serif',
      background: `linear-gradient(135deg, ${DS.terra} 0%, #8E3B14 100%)`,
      color: '#fff', display: 'flex', alignItems: 'center', gap: 16,
      padding: '18px 22px',
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: DS.radius,
        background: 'rgba(255,255,255,0.16)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 28, flexShrink: 0,
      }}>🚪</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.5px', opacity: 0.85, marginBottom: 4 }}>
          DESTAQUE · 1ª FASE
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.25 }}>{trilha.titulo}</div>
        <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4, lineHeight: 1.55 }}>
          {trilha.descricao}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: 11, opacity: 0.9, flexWrap: 'wrap' }}>
          <span>⏱ {trilha.duracao}</span>
          <span>📚 {trilha.licoes.length} lições</span>
          <span>🎯 {trilha.fasesAlvo}</span>
        </div>
      </div>
      <span style={{ fontSize: 20, opacity: 0.7, paddingLeft: 8 }}>›</span>
    </button>
  );
}

function TrilhaCard({ trilha, onAbrir }) {
  const comps = _compByIds(trilha.competencias);
  return (
    <button onClick={onAbrir} style={{
      textAlign: 'left', padding: 0, border: 'none', cursor: 'pointer',
      borderRadius: DS.radius, overflow: 'hidden', background: DS.surface,
      boxShadow: DS.shadow, fontFamily: 'IBM Plex Sans, sans-serif',
      display: 'flex', flexDirection: 'column',
      transition: 'box-shadow 0.15s, transform 0.1s',
    }}>
      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
          <span style={{
            padding: '2px 8px', borderRadius: 100,
            background: trilha.tagCor + '18', color: trilha.tagCor,
            fontSize: 9.5, fontWeight: 800, letterSpacing: '0.3px',
          }}>{trilha.tag}</span>
          <span style={{ fontSize: 10, color: DS.textMuted }}>{trilha.duracao}</span>
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: DS.text, lineHeight: 1.25 }}>{trilha.titulo}</div>
          <div style={{ fontSize: 11.5, color: DS.textSec, marginTop: 2 }}>{trilha.subtitulo}</div>
        </div>
        <div style={{ fontSize: 11.5, color: DS.textMuted, lineHeight: 1.5,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {trilha.descricao}
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {comps.slice(0, 4).map(c => (
            <span key={c.id} title={c.titulo} style={{
              padding: '2px 7px', borderRadius: 3, fontSize: 9.5, fontWeight: 800, color: '#fff',
              background: DCN27_AREAS[c.area].cor,
            }}>C{String(c.n).padStart(2, '0')}</span>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 'auto', padding: '10px 14px', borderTop: `1px solid ${DS.borderLight}`, background: DS.bg, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {trilha.progresso > 0 ? (
          <div style={{ flex: 1, marginRight: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Progresso</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: DS.green, fontVariantNumeric: 'tabular-nums' }}>{trilha.progresso}%</span>
            </div>
            <div style={{ height: 5, background: DS.borderLight, borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${trilha.progresso}%`, height: '100%', background: DS.green }} />
            </div>
          </div>
        ) : (
          <span style={{ fontSize: 11, color: DS.textMuted, fontWeight: 600 }}>{trilha.licoes.length} lições · {trilha.fasesAlvo}</span>
        )}
        <span style={{ fontSize: 11, color: DS.blue, fontWeight: 800, marginLeft: 6 }}>
          {trilha.progresso > 0 ? 'Continuar ›' : 'Começar ›'}
        </span>
      </div>
    </button>
  );
}

function TrilhaDrilldown({ trilha, onClose }) {
  const comps = _compByIds(trilha.competencias);
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(10,18,32,0.55)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 200,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: DS.surface, borderRadius: DS.radiusLg, maxWidth: 640, width: '100%',
        maxHeight: '90vh', overflow: 'auto', boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
        fontFamily: 'IBM Plex Sans, sans-serif',
      }}>
        <div style={{ padding: '18px 22px', borderBottom: `1px solid ${DS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <span style={{
              padding: '3px 9px', borderRadius: 100, fontSize: 10, fontWeight: 800,
              background: trilha.tagCor + '18', color: trilha.tagCor,
            }}>{trilha.tag}</span>
            <div style={{ fontSize: 19, fontWeight: 800, color: DS.text, lineHeight: 1.25, marginTop: 8 }}>{trilha.titulo}</div>
            <div style={{ fontSize: 12.5, color: DS.textSec, marginTop: 2 }}>{trilha.subtitulo}</div>
          </div>
          <button onClick={onClose} style={{
            width: 30, height: 30, borderRadius: '50%', background: DS.bg,
            border: `1px solid ${DS.border}`, cursor: 'pointer',
            fontSize: 14, color: DS.textSec, fontWeight: 800,
          }}>×</button>
        </div>

        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 13.5, color: DS.text, lineHeight: 1.6 }}>{trilha.descricao}</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            <DrillStat label="Duração"   valor={trilha.duracao} />
            <DrillStat label="Lições"    valor={trilha.licoes.length} />
            <DrillStat label="Fases-alvo" valor={trilha.fasesAlvo} />
          </div>

          {/* Lições */}
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Lições</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {trilha.licoes.map((l, i) => (
                <div key={i} style={{
                  padding: '10px 12px', borderRadius: DS.radiusSm,
                  background: DS.bg, border: `1px solid ${DS.borderLight}`,
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{
                    width: 24, height: 24, borderRadius: 4, background: DS.surface,
                    border: `1px solid ${DS.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12,
                    flexShrink: 0,
                  }}>{ICONE_TIPO[l.tipo] || '•'}</span>
                  <span style={{ flex: 1, fontSize: 12.5, color: DS.text, fontWeight: 600 }}>{l.titulo}</span>
                  <span style={{ fontSize: 10.5, color: DS.textMuted, fontWeight: 600 }}>{l.dur}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Competências */}
          {comps.length > 0 && (
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 800, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Competências DCN tocadas</div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {comps.map(c => (
                  <span key={c.id} title={c.titulo} style={{
                    padding: '3px 9px', borderRadius: 4, fontSize: 10.5, fontWeight: 800, color: '#fff',
                    background: DCN27_AREAS[c.area].cor,
                  }}>C{String(c.n).padStart(2, '0')} · {c.titulo.length > 22 ? c.titulo.slice(0, 22) + '…' : c.titulo}</span>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <button style={{
              flex: 1, padding: '11px 14px', borderRadius: DS.radiusSm,
              background: DS.blue, color: '#fff', border: 'none', cursor: 'pointer',
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 800, fontSize: 13,
            }}>{trilha.progresso > 0 ? `Continuar (${trilha.progresso}%) ›` : 'Começar a trilha ›'}</button>
            <button onClick={onClose} style={{
              padding: '11px 14px', borderRadius: DS.radiusSm,
              background: 'transparent', color: DS.textSec, border: `1px solid ${DS.border}`, cursor: 'pointer',
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 13,
            }}>Fechar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DrillStat({ label, valor }) {
  return (
    <div style={{ padding: '8px 10px', background: DS.bg, borderRadius: DS.radiusSm, border: `1px solid ${DS.borderLight}` }}>
      <div style={{ fontSize: 9.5, fontWeight: 800, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 800, color: DS.text, marginTop: 2, lineHeight: 1.25 }}>{valor}</div>
    </div>
  );
}

Object.assign(window, { TrilhasHabilidadeScreen, TRILHAS });
