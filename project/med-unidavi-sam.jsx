// =============================================================================
// MED-UNIDAVI · BLOCO F — Integração App-SAM
// F.1 Vitrine SAM   · F.2 Submissão SAM   · F.3 Meus Trabalhos (no Perfil)
// Carregar APÓS med-unidavi-components.jsx e med-unidavi-ic.jsx.
// =============================================================================

// ── Mock de pôsteres ─────────────────────────────────────────────────────────
const SAM_POSTERS = [
  {
    id: 'p1', edicao: 'XII SAM', fase: '8',
    titulo: 'Adesão terapêutica em hipertensão arterial na atenção primária do Alto Vale',
    autores: ['Marina Silva', 'Profa. Caroline Bacca'],
    linha: 'cardio', linhaNome: 'Cardiologia', area: 'Atenção Primária',
    doi: '10.5555/sam.2026.0012',
    submissao: { periodico: 'Rev. Bras. Med. Família', status: 'aceito', link: 'https://doi.org/10.5555/sam.2026.0012' },
    ancoragem: 'Coorte de 6 UBS de Rio do Sul e Bela Vista. Resultados ofereceram à SMS-RSL um mapa de baixa adesão por território.',
    resumo: {
      intro: 'A hipertensão arterial sistêmica (HAS) é a principal causa de morbimortalidade cardiovascular no Brasil. A adesão terapêutica é multifatorial e particularmente baixa em populações rurais.',
      obj: 'Avaliar adesão à terapia anti-hipertensiva em pacientes acompanhados em 6 UBS do Alto Vale e identificar fatores associados.',
      met: 'Estudo transversal · n=312 · questionário Morisky-Green-Levine · análise multivariada por regressão logística.',
      res: 'Adesão plena em 42% (IC95% 36,5–47,5). Fatores associados: escolaridade ≥9 anos (OR 2,1), polifarmácia (OR 0,4), distância à UBS >5 km (OR 0,5).',
      disc: 'Adesão regional inferior à média brasileira. Polifarmácia e barreira geográfica emergem como alvos prioritários para intervenção no SUS regional.',
    },
    refs: 6, audio: false,
  },
  {
    id: 'p2', edicao: 'XII SAM', fase: '7',
    titulo: 'Sintomas depressivos em estudantes de medicina — protocolo de coorte longitudinal',
    autores: ['Pedro Vargas', 'Prof. José Eduardo Dagostini'],
    linha: 'psiq', linhaNome: 'Psiquiatria', area: 'Saúde Mental',
    doi: null,
    ancoragem: 'Recorte regional inclui graduandos da UNIDAVI e cidades-base do internato.',
    resumo: {
      intro: 'Estudantes de medicina apresentam prevalência elevada de sintomas depressivos. Estudos longitudinais regionais são escassos.',
      obj: 'Caracterizar evolução de sintomas depressivos (PHQ-9) ao longo das 12 fases da graduação.',
      met: 'Coorte prospectiva · PHQ-9 semestral · entrevistas qualitativas a cada 4 semestres.',
      res: 'Resultados parciais previstos para SAM XIV.',
      disc: '—',
    },
    refs: 14, audio: true,
  },
  {
    id: 'p3', edicao: 'XII SAM', fase: '7',
    titulo: 'Triagem neonatal: cobertura e tempo de coleta em maternidades regionais',
    autores: ['Marina Silva', 'Prof. Marlou Dalri'],
    linha: 'pedi', linhaNome: 'Pediatria & Perinatologia', area: 'Saúde da Criança',
    doi: null,
    ancoragem: 'Foco em 3 maternidades de referência do Alto Vale.',
    resumo: {
      intro: 'A triagem neonatal precoce reduz morbimortalidade infantil. O tempo ótimo de coleta é entre 48h e 5 dias.',
      obj: 'Descrever cobertura e tempo médio de coleta em 3 maternidades do Alto Vale.',
      met: 'Estudo descritivo · prontuários 2023–2025 · estimativa de tempo até a coleta.',
      res: 'Resultados parciais previstos para SAM XIV.',
      disc: '—',
    },
    refs: 9, audio: true,
  },
  {
    id: 'p4', edicao: 'XI SAM', fase: '8',
    titulo: 'Risco cardiovascular em populações rurais do Alto Vale do Itajaí',
    autores: ['Ana Beatriz Costa', 'Prof. Eduardo Stahnke'],
    linha: 'cardio', linhaNome: 'Cardiologia', area: 'Cardiologia Preventiva',
    doi: '10.5555/sam.2025.0009',
    submissao: { periodico: 'Heart', status: 'em revisão', link: 'https://doi.org/10.5555/sam.2025.0009' },
    ancoragem: 'Mapa de risco cardiovascular do Alto Vale entregue à 18ª SDR-SC.',
    resumo: {
      intro: 'Populações rurais apresentam padrão distinto de risco cardiovascular.',
      obj: 'Caracterizar prevalência de fatores de risco em 4 microrregiões rurais.',
      met: 'Transversal · n=486 · Escore de Framingham.',
      res: 'Alto risco (>20%) em 18% da amostra. Tabagismo e dislipidemia foram os principais fatores associados.',
      disc: 'Risco elevado justifica programa de busca ativa via ESF.',
    },
    refs: 11, audio: false,
  },
  {
    id: 'p5', edicao: 'XI SAM', fase: '7',
    titulo: 'Burnout em estudantes de medicina — projeto piloto',
    autores: ['Lucas Hoffmann', 'Profa. Mariana Celli'],
    linha: 'psiq', linhaNome: 'Psiquiatria', area: 'Educação Médica',
    doi: null,
    ancoragem: null,
    resumo: {
      intro: 'Burnout é prevalente entre estudantes de medicina; instrumentos validados em PT-BR são limitados.',
      obj: 'Aplicar MBI-SS em uma amostra-piloto da UNIDAVI.',
      met: 'Piloto · n=60 · MBI-SS · análise descritiva.',
      res: 'Em coleta.', disc: '—',
    },
    refs: 7, audio: true,
  },
  {
    id: 'p6', edicao: 'XII SAM', fase: '8',
    titulo: 'Aleitamento materno exclusivo em Rio do Sul — análise de 5 anos',
    autores: ['Helena Rocha', 'Profa. Samantha Lopes'],
    linha: 'pedi', linhaNome: 'Pediatria & Perinatologia', area: 'Saúde Materno-Infantil',
    doi: '10.5555/sam.2026.0017',
    submissao: { periodico: 'Rev. Paul. Pediatr.', status: 'publicado', link: 'https://doi.org/10.5555/sam.2026.0017' },
    ancoragem: 'Resultados subsidiaram revisão do protocolo municipal de aleitamento de Rio do Sul.',
    resumo: {
      intro: 'A OMS recomenda aleitamento exclusivo até os 6 meses.',
      obj: 'Estimar prevalência de AME aos 6 meses em Rio do Sul (2020–2024).',
      met: 'Coorte retrospectiva · prontuários · ESF.',
      res: 'AME aos 6 meses: 38% (IC95% 34,2–41,8). Tendência ascendente após capacitação dos ACS (2022).',
      disc: 'Capacitação de ACS associou-se a aumento de AME — caso replicável.',
    },
    refs: 13, audio: false,
  },
];

const FASE_LABELS = { '7': '7ª fase · Projeto de TC', '8': '8ª fase · Resumo final do TC' };
const SUB_STATUS_COR = { 'em revisão': DS.amber, 'aceito': DS.green, 'publicado': '#7A5CBF', 'rejeitado': DS.terra };

// Cor por linha NPCMed
function _linhaCor(id) {
  if (id === 'cardio') return DS.terra;
  if (id === 'pedi')   return DS.blue;
  if (id === 'psiq')   return '#7A5CBF';
  return DS.textMuted;
}

// Placeholder de figura — listras suaves com legenda
function _PosterThumb({ poster, ratio = '4/3', size = 'lg' }) {
  const cor = _linhaCor(poster.linha);
  return (
    <div style={{
      width: '100%', aspectRatio: ratio, position: 'relative',
      background: `linear-gradient(135deg, ${cor}14 0%, ${cor}24 100%)`,
      borderRadius: DS.radiusSm, overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* listras */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.4,
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 14px, ${cor}22 14px, ${cor}22 16px)` }} />
      <div style={{ position: 'relative', fontFamily: 'IBM Plex Mono, ui-monospace, monospace',
        fontSize: size === 'lg' ? 10 : 9, color: cor, fontWeight: 700, letterSpacing: '0.5px', textAlign: 'center', padding: 12 }}>
        FIGURA PRINCIPAL<br/>
        <span style={{ fontWeight: 500, opacity: 0.7 }}>{poster.area}</span>
      </div>
    </div>
  );
}

// =============================================================================
// F.1 — VITRINE SAM
// =============================================================================
function VitrineSAMScreen({ isMobile, Header, NavSub, cardBase }) {
  const [filtros, setFiltros] = React.useState({ edicao: 'todas', fase: 'todas', linha: 'todas' });
  const [posterAberto, setPosterAberto] = React.useState(null);

  const edicoes = ['todas', ...Array.from(new Set(SAM_POSTERS.map(p => p.edicao)))];
  const linhas = [
    { id: 'todas', label: 'Todas' },
    { id: 'cardio', label: 'Cardiologia' },
    { id: 'pedi', label: 'Pediatria & Perinatologia' },
    { id: 'psiq', label: 'Psiquiatria' },
  ];

  const posteresFiltrados = SAM_POSTERS.filter(p =>
    (filtros.edicao === 'todas' || p.edicao === filtros.edicao) &&
    (filtros.fase   === 'todas' || p.fase   === filtros.fase) &&
    (filtros.linha  === 'todas' || p.linha  === filtros.linha)
  );

  const Chip = ({ ativo, children, onClick }) => (
    <button onClick={onClick} style={{
      padding: '5px 12px', borderRadius: 100,
      background: ativo ? DS.blue : 'transparent', color: ativo ? '#fff' : DS.textSec,
      border: `1px solid ${ativo ? DS.blue : DS.border}`,
      fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 11, cursor: 'pointer',
    }}>{children}</button>
  );

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg, fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <Header titulo="Vitrine SAM" subtitulo="Pôsteres da Semana Acadêmica de Medicina — projetos (7ª) e resumos finais (8ª)" />
      <NavSub />

      <div style={{ padding: isMobile ? '16px' : '24px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Filtros */}
        <div style={{ ...cardBase, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, color: DS.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px', minWidth: 60 }}>Edição</span>
            {edicoes.map(e => <Chip key={e} ativo={filtros.edicao === e} onClick={() => setFiltros({ ...filtros, edicao: e })}>{e === 'todas' ? 'Todas' : e}</Chip>)}
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, color: DS.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px', minWidth: 60 }}>Fase</span>
            {[{id:'todas',l:'Todas'},{id:'7',l:'7ª · Projeto'},{id:'8',l:'8ª · Resumo final'}].map(f =>
              <Chip key={f.id} ativo={filtros.fase === f.id} onClick={() => setFiltros({ ...filtros, fase: f.id })}>{f.l}</Chip>
            )}
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, color: DS.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px', minWidth: 60 }}>Linha</span>
            {linhas.map(l => <Chip key={l.id} ativo={filtros.linha === l.id} onClick={() => setFiltros({ ...filtros, linha: l.id })}>{l.label}</Chip>)}
          </div>
        </div>

        {/* Contagem + busca */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 12, color: DS.textSec }}>
            <strong style={{ color: DS.text }}>{posteresFiltrados.length}</strong> pôster{posteresFiltrados.length === 1 ? '' : 'es'} · ordenado por edição (mais recente primeiro)
          </div>
          <input placeholder="🔍  Buscar título, autor, palavra-chave…" style={{
            flex: '0 1 280px', padding: '7px 12px', border: `1px solid ${DS.border}`,
            borderRadius: DS.radius, fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, color: DS.text, outline: 'none',
          }} />
        </div>

        {/* Grid de pôsteres */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 14,
        }}>
          {posteresFiltrados.map(p => {
            const cor = _linhaCor(p.linha);
            return (
              <div key={p.id} onClick={() => setPosterAberto(p)} style={{
                ...cardBase, padding: 0, cursor: 'pointer', overflow: 'hidden', transition: 'all 0.15s',
                display: 'flex', flexDirection: 'column',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = DS.shadowMd; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = DS.shadow; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <_PosterThumb poster={p} />
                <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ padding: '2px 8px', borderRadius: 100, background: DS.bg, color: DS.textSec, border: `1px solid ${DS.border}`, fontSize: 10, fontWeight: 700 }}>{p.edicao}</span>
                    <span style={{ padding: '2px 8px', borderRadius: 100, background: cor + '18', color: cor, fontSize: 10, fontWeight: 700 }}>{p.fase}ª fase</span>
                    {p.doi && <span title={`DOI ${p.doi}`} style={{ padding: '2px 8px', borderRadius: 100, background: DS.green + '18', color: DS.green, fontSize: 10, fontWeight: 700 }}>DOI</span>}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: DS.text, lineHeight: 1.35,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {p.titulo}
                  </div>
                  <div style={{ marginTop: 'auto', fontSize: 11, color: DS.textMuted }}>
                    {p.autores[0]}{p.autores.length > 1 ? ' et al.' : ''} · <span style={{ color: cor, fontWeight: 600 }}>{p.linhaNome}</span>
                  </div>
                </div>
              </div>
            );
          })}
          {posteresFiltrados.length === 0 && (
            <div style={{ ...cardBase, padding: '32px', textAlign: 'center', gridColumn: '1 / -1' }}>
              <div style={{ fontSize: 13, color: DS.textMuted }}>Nenhum pôster encontrado com esses filtros.</div>
            </div>
          )}
        </div>

        {isMobile && <div style={{ height: 72 }} />}
      </div>

      {posterAberto && (
        <PosterViewerModal poster={posterAberto} onClose={() => setPosterAberto(null)} isMobile={isMobile} />
      )}
    </div>
  );
}

// ── Visualização de pôster (modal) ───────────────────────────────────────────
function PosterViewerModal({ poster, onClose, isMobile }) {
  const cor = _linhaCor(poster.linha);
  const r = poster.resumo;
  const Block = ({ label, children }) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 13, color: DS.text, lineHeight: 1.55 }}>{children}</div>
    </div>
  );

  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, background: 'rgba(10,18,32,0.55)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
      padding: isMobile ? 0 : 24,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: DS.surface, borderRadius: isMobile ? 0 : DS.radiusLg,
        width: '100%', maxWidth: 900, maxHeight: '100%', overflow: 'auto',
        boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
      }}>
        {/* Header da modal */}
        <div style={{ position: 'sticky', top: 0, background: DS.surface, padding: isMobile ? '14px 16px' : '20px 24px',
          borderBottom: `1px solid ${DS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, zIndex: 1 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
              <span style={{ padding: '3px 9px', borderRadius: 100, background: DS.bg, color: DS.textSec, border: `1px solid ${DS.border}`, fontSize: 10, fontWeight: 700 }}>{poster.edicao}</span>
              <span style={{ padding: '3px 9px', borderRadius: 100, background: cor + '18', color: cor, fontSize: 10, fontWeight: 700 }}>{FASE_LABELS[poster.fase]}</span>
              <span style={{ padding: '3px 9px', borderRadius: 100, background: cor + '10', color: cor, fontSize: 10, fontWeight: 700 }}>Linha {poster.linhaNome}</span>
              {poster.doi && <span style={{ padding: '3px 9px', borderRadius: 100, background: DS.green + '18', color: DS.green, fontSize: 10, fontWeight: 700 }}>DOI · {poster.doi}</span>}
            </div>
            <div style={{ fontSize: isMobile ? 16 : 18, fontWeight: 800, color: DS.text, lineHeight: 1.3 }}>{poster.titulo}</div>
            <div style={{ fontSize: 12, color: DS.textSec, marginTop: 6 }}>{poster.autores.join(' · ')}</div>
          </div>
          <button onClick={onClose} style={{
            width: 32, height: 32, borderRadius: '50%', background: DS.bg, border: `1px solid ${DS.border}`,
            cursor: 'pointer', fontSize: 16, color: DS.textSec, fontWeight: 700, flexShrink: 0,
          }}>×</button>
        </div>

        <div style={{ padding: isMobile ? '16px' : '24px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr', gap: 24 }}>
          {/* Coluna esquerda — resumo estruturado */}
          <div>
            <Block label="Introdução">{r.intro}</Block>
            <Block label="Objetivos">{r.obj}</Block>
            <Block label="Métodos">{r.met}</Block>
            <Block label="Resultados">{r.res}</Block>
            <Block label="Discussão / Conclusão">{r.disc}</Block>

            <div style={{ marginTop: 18, padding: '12px 14px', background: DS.bg, borderRadius: DS.radiusSm, border: `1px solid ${DS.border}` }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>Referências</div>
              <div style={{ fontSize: 12, color: DS.textSec }}>{poster.refs} referências · formato Vancouver · <a href="#" onClick={e=>e.preventDefault()} style={{ color: DS.blue, fontWeight: 600 }}>ver lista completa</a></div>
            </div>
          </div>

          {/* Coluna direita — figura, áudio, ancoragem, submissão externa */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <_PosterThumb poster={poster} ratio="4/5" />
              <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 6, fontStyle: 'italic' }}>
                Figura 1 — clique para ampliar (zoom interativo).
              </div>
            </div>

            {poster.audio && (
              <div style={{ padding: '12px 14px', background: DS.blueLight, borderRadius: DS.radiusSm, border: `1px solid ${DS.border}` }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: DS.blue, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>🎙 Áudio do autor · 7ª fase</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button style={{ width: 32, height: 32, borderRadius: '50%', background: DS.blue, color: '#fff', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>▶</button>
                  <div style={{ flex: 1, height: 4, background: DS.border, borderRadius: 2, position: 'relative' }}>
                    <div style={{ width: '32%', height: '100%', background: DS.blue, borderRadius: 2 }} />
                  </div>
                  <span style={{ fontSize: 10, color: DS.textMuted, fontVariantNumeric: 'tabular-nums' }}>0:42 / 2:11</span>
                </div>
              </div>
            )}

            {poster.ancoragem && (
              <div style={{ padding: '12px 14px', background: DS.greenLight, borderRadius: DS.radiusSm, border: `1px solid ${DS.green}30` }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: DS.green, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>📍 Ancoragem regional</div>
                <div style={{ fontSize: 12, color: DS.text, lineHeight: 1.55 }}>{poster.ancoragem}</div>
              </div>
            )}

            {poster.submissao && (
              <div style={{ padding: '12px 14px', background: '#FAF7FF', borderRadius: DS.radiusSm, border: `1px solid #7A5CBF30` }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#7A5CBF', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>Submissão externa</div>
                <div style={{ fontSize: 12, color: DS.text, fontWeight: 600 }}>{poster.submissao.periodico}</div>
                <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ padding: '2px 8px', borderRadius: 100, background: SUB_STATUS_COR[poster.submissao.status] + '18', color: SUB_STATUS_COR[poster.submissao.status], fontSize: 10, fontWeight: 700 }}>{poster.submissao.status}</span>
                  <a href={poster.submissao.link} target="_blank" rel="noreferrer" onClick={e=>e.preventDefault()} style={{ fontSize: 11, color: DS.blue, fontWeight: 600 }}>abrir DOI ›</a>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button style={{ padding: '9px 14px', borderRadius: DS.radius, background: DS.blue, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 12 }}>
                Compartilhar link
              </button>
              <button style={{ padding: '9px 14px', borderRadius: DS.radius, background: 'transparent', color: DS.textSec, border: `1px solid ${DS.border}`, cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 12 }}>
                ⬇  Baixar PDF A0 / A1
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// F.2 — SUBMISSÃO SAM (interface nativa)
// =============================================================================
const SUBM_STATES = {
  rascunho:    { label: 'Rascunho',   cor: DS.textMuted, bg: DS.bg,         icon: '✎', desc: 'Salvo localmente — só você vê. Continue editando quando quiser.' },
  em_revisao:  { label: 'Em revisão', cor: DS.amber,     bg: DS.amberLight, icon: '⏳', desc: 'Aguardando análise do orientador. Você receberá notificação quando houver retorno.' },
  aprovado:    { label: 'Aprovado',   cor: DS.green,     bg: DS.greenLight, icon: '✓', desc: 'Pôster aprovado pelo orientador e publicado na Vitrine SAM.' },
  devolvido:   { label: 'Devolvido',  cor: DS.terra,     bg: DS.terraLight, icon: '↺', desc: 'Orientador devolveu com comentários. Revise e reenvie.' },
};

function SubmissaoSAMScreen({ isMobile, Header, NavSub, cardBase, faseAluno }) {
  // Mock: aluno está na 7ª fase → só "projeto de TC" habilitado
  const fase = faseAluno || '7';
  const [tipo, setTipo] = React.useState(fase);
  const [step, setStep] = React.useState(1); // 1=tipo · 2=form · 3=preview · 4=estado
  const [estado, setEstado] = React.useState('rascunho');
  const [form, setForm] = React.useState({
    titulo: '',
    autores: 'Maria Lima (você)',
    orientador: 'Profa. Beatriz Nunes',
    linha: 'cardio',
    intro: '', obj: '', met: '', res: '', disc: '',
    figuras: 0, audio: false,
    ancoragem: true, ancoragemTxt: '',
    refs: '',
    tags: ['Atenção Primária'],
    subPeriodico: '', subStatus: 'em revisão', subDoi: '',
  });

  const StepDot = ({ n, label, ativo, done }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
      <div style={{
        width: 26, height: 26, borderRadius: '50%',
        background: done ? DS.green : ativo ? DS.blue : DS.borderLight,
        color: done || ativo ? '#fff' : DS.textMuted,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 800, fontSize: 12, flexShrink: 0,
      }}>{done ? '✓' : n}</div>
      <span style={{ fontSize: 11, fontWeight: ativo ? 700 : 500, color: done ? DS.green : ativo ? DS.blue : DS.textMuted }}>{label}</span>
    </div>
  );

  const Stepper = () => (
    <div style={{ ...cardBase, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
      {[
        { n: 1, l: 'Tipo' }, { n: 2, l: 'Conteúdo' }, { n: 3, l: 'Pré-visualização' }, { n: 4, l: 'Validação' },
      ].map((s, i, a) => (
        <React.Fragment key={s.n}>
          <StepDot n={s.n} label={s.l} ativo={step === s.n} done={step > s.n} />
          {i < a.length - 1 && <div style={{ flex: 1, height: 2, background: step > s.n ? DS.green : DS.borderLight, minWidth: 12 }} />}
        </React.Fragment>
      ))}
    </div>
  );

  const Label = ({ children, hint }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{children}</span>
      {hint && <span style={{ fontSize: 10, color: DS.textMuted, fontStyle: 'italic' }}>{hint}</span>}
    </div>
  );

  const inputStyle = {
    width: '100%', padding: '9px 12px', border: `1.5px solid ${DS.border}`, borderRadius: DS.radiusSm,
    fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13, color: DS.text, outline: 'none', background: DS.surface,
  };

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg, fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <Header titulo="Submeter à SAM" subtitulo="Fluxo nativo de submissão — espelha a arquitetura do App-SAM" />
      <NavSub />

      <div style={{ padding: isMobile ? '16px' : '24px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        <div style={{ padding: '10px 14px', background: '#FDF5E0', borderRadius: DS.radiusSm, border: `1px solid #B07A1830`, fontSize: 11.5, color: '#7A5215', lineHeight: 1.6 }}>
          <strong>Interface nativa (MVP).</strong> Até o MVP do MED-UNIDAVI entrar em produção, o botão "Submeter à SAM" no Dashboard pode fazer link out para o App-SAM standalone. Esta tela mostra a versão definitiva, para validação institucional.
        </div>

        <Stepper />

        {/* STEP 1 — Tipo */}
        {step === 1 && (
          <div style={{ ...cardBase, padding: '20px' }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: DS.text, marginBottom: 4 }}>Tipo de pôster</div>
            <div style={{ fontSize: 12, color: DS.textSec, marginBottom: 16 }}>Conforme sua fase atual, apenas uma opção está habilitada.</div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
              {[
                { id: '7', titulo: 'Projeto de TC', sub: '7ª fase · Science with Coffee', cor: DS.blue,
                  desc: 'Pôster do projeto em curso — pergunta, métodos planejados e resultados preliminares. Áudio do autor opcional.' },
                { id: '8', titulo: 'Resumo final do TC', sub: '8ª fase · apresentação oral', cor: '#7A5CBF',
                  desc: 'Pôster do TC concluído — resultados, discussão completa e dados de submissão externa, se houver.' },
              ].map(t => {
                const habilitado = t.id === fase;
                const ativo = tipo === t.id && habilitado;
                return (
                  <button key={t.id} disabled={!habilitado} onClick={() => setTipo(t.id)} style={{
                    ...cardBase, padding: '16px', textAlign: 'left',
                    cursor: habilitado ? 'pointer' : 'not-allowed', opacity: habilitado ? 1 : 0.5,
                    border: `2px solid ${ativo ? t.cor : DS.border}`, background: ativo ? t.cor + '08' : DS.surface,
                    fontFamily: 'IBM Plex Sans, sans-serif',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: DS.text }}>{t.titulo}</div>
                      {!habilitado && <span style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, padding: '2px 8px', borderRadius: 100, background: DS.bg }}>indisponível</span>}
                      {habilitado && <span style={{ fontSize: 10, fontWeight: 700, color: t.cor, padding: '2px 8px', borderRadius: 100, background: t.cor + '18' }}>sua fase</span>}
                    </div>
                    <div style={{ fontSize: 12, color: DS.textSec, marginBottom: 8 }}>{t.sub}</div>
                    <div style={{ fontSize: 12, color: DS.textMuted, lineHeight: 1.55 }}>{t.desc}</div>
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setStep(2)} style={{ padding: '9px 18px', borderRadius: DS.radius, background: DS.blue, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 12 }}>Continuar ›</button>
            </div>
          </div>
        )}

        {/* STEP 2 — Formulário */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ ...cardBase, padding: '18px' }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: DS.text, marginBottom: 12 }}>Cabeçalho</div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
                <div><Label>Título</Label><input style={inputStyle} value={form.titulo} placeholder="Título do trabalho" onChange={e => setForm({ ...form, titulo: e.target.value })} /></div>
                <div><Label>Autores</Label><input style={inputStyle} value={form.autores} onChange={e => setForm({ ...form, autores: e.target.value })} /></div>
                <div><Label>Orientador</Label><input style={inputStyle} value={form.orientador} onChange={e => setForm({ ...form, orientador: e.target.value })} /></div>
                <div><Label>Linha NPCMed</Label>
                  <select style={inputStyle} value={form.linha} onChange={e => setForm({ ...form, linha: e.target.value })}>
                    <option value="cardio">Cardiologia</option>
                    <option value="pedi">Pediatria & Perinatologia</option>
                    <option value="psiq">Psiquiatria</option>
                    <option value="">— Sem linha (TC geral)</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ ...cardBase, padding: '18px' }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: DS.text, marginBottom: 12 }}>Resumo estruturado</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { k: 'intro', l: 'Introdução', h: 'contexto e justificativa' },
                  { k: 'obj',   l: 'Objetivos',  h: 'pergunta de pesquisa' },
                  { k: 'met',   l: 'Métodos',    h: 'desenho, amostra, instrumentos' },
                  { k: 'res',   l: 'Resultados', h: tipo === '7' ? 'parciais ou esperados' : 'completos' },
                  { k: 'disc',  l: 'Discussão / Conclusão', h: 'achados em diálogo com a literatura' },
                ].map(c => (
                  <div key={c.k}><Label hint={c.h}>{c.l}</Label>
                    <textarea rows={c.k === 'intro' || c.k === 'res' ? 3 : 2} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'IBM Plex Sans, sans-serif' }}
                      value={form[c.k]} onChange={e => setForm({ ...form, [c.k]: e.target.value })} />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ ...cardBase, padding: '18px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
              <div>
                <Label>Figuras (até 5)</Label>
                <div style={{ border: `2px dashed ${DS.border}`, borderRadius: DS.radiusSm, padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>🖼</div>
                  <div style={{ fontSize: 12, color: DS.textSec }}>Arraste imagens ou <span style={{ color: DS.blue, fontWeight: 600 }}>escolha arquivos</span></div>
                  <div style={{ fontSize: 10, color: DS.textMuted, marginTop: 4 }}>PNG · JPG · SVG · até 5 MB cada</div>
                </div>
              </div>
              {tipo === '7' && (
                <div>
                  <Label hint="só 7ª fase">Áudio do autor (opcional)</Label>
                  <div style={{ border: `2px dashed ${DS.border}`, borderRadius: DS.radiusSm, padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
                    <div style={{ fontSize: 22, marginBottom: 4 }}>🎙</div>
                    <div style={{ fontSize: 12, color: DS.textSec }}>Gravar ou <span style={{ color: DS.blue, fontWeight: 600 }}>enviar MP3</span></div>
                    <div style={{ fontSize: 10, color: DS.textMuted, marginTop: 4 }}>Até 3 minutos</div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ ...cardBase, padding: '18px' }}>
              <Label>Ancoragem regional</Label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: DS.text, marginBottom: 10, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.ancoragem} onChange={e => setForm({ ...form, ancoragem: e.target.checked })} />
                Este trabalho tem relevância para o Alto Vale / Rio do Sul / SUS regional
              </label>
              {form.ancoragem && (
                <textarea rows={2} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'IBM Plex Sans, sans-serif' }}
                  placeholder="Descreva brevemente a relevância regional (opcional)…"
                  value={form.ancoragemTxt} onChange={e => setForm({ ...form, ancoragemTxt: e.target.value })} />
              )}
            </div>

            {tipo === '8' && (
              <div style={{ ...cardBase, padding: '18px', borderLeft: `3px solid #7A5CBF` }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: DS.text, marginBottom: 12 }}>Submissão externa (só 8ª fase)</div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 2fr', gap: 12 }}>
                  <div><Label>Periódico</Label><input style={inputStyle} placeholder="Ex.: Rev. Bras. Med. Família" value={form.subPeriodico} onChange={e => setForm({ ...form, subPeriodico: e.target.value })} /></div>
                  <div><Label>Status</Label>
                    <select style={inputStyle} value={form.subStatus} onChange={e => setForm({ ...form, subStatus: e.target.value })}>
                      <option value="em revisão">em revisão</option>
                      <option value="aceito">aceito</option>
                      <option value="publicado">publicado</option>
                    </select>
                  </div>
                  <div><Label hint="prep. para CrossRef">DOI / link</Label><input style={inputStyle} placeholder="10.5555/..." value={form.subDoi} onChange={e => setForm({ ...form, subDoi: e.target.value })} /></div>
                </div>
              </div>
            )}

            <div style={{ ...cardBase, padding: '18px' }}>
              <Label hint="formato Vancouver">Referências</Label>
              <textarea rows={4} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'IBM Plex Mono, ui-monospace, monospace', fontSize: 12 }}
                placeholder="1. Sobrenome A, Sobrenome B. Título. Periódico. Ano;Vol(Num):pp."
                value={form.refs} onChange={e => setForm({ ...form, refs: e.target.value })} />
              <Label hint="separadas por vírgula">Tags</Label>
              <input style={inputStyle} placeholder="Ex.: Atenção Primária, HAS, Adesão Terapêutica" value={form.tags.join(', ')} onChange={e => setForm({ ...form, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep(1)} style={{ padding: '9px 18px', borderRadius: DS.radius, background: 'transparent', color: DS.textSec, border: `1px solid ${DS.border}`, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>‹ Voltar</button>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setEstado('rascunho')} style={{ padding: '9px 18px', borderRadius: DS.radius, background: 'transparent', color: DS.textSec, border: `1px solid ${DS.border}`, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>Salvar rascunho</button>
                <button onClick={() => setStep(3)} style={{ padding: '9px 18px', borderRadius: DS.radius, background: DS.blue, color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 12 }}>Pré-visualizar ›</button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 — Pré-visualização */}
        {step === 3 && (
          <SubmissaoPreview form={form} tipo={tipo} cardBase={cardBase} isMobile={isMobile}
            onVoltar={() => setStep(2)} onEnviar={() => { setEstado('em_revisao'); setStep(4); }} />
        )}

        {/* STEP 4 — Estado / validação */}
        {step === 4 && (
          <ValidacaoCard estado={estado} setEstado={setEstado} cardBase={cardBase} isMobile={isMobile}
            onEditar={() => setStep(2)} />
        )}

        {isMobile && <div style={{ height: 72 }} />}
      </div>
    </div>
  );
}

// ── Preview da submissão (espelha a Vitrine) ─────────────────────────────────
function SubmissaoPreview({ form, tipo, cardBase, isMobile, onVoltar, onEnviar }) {
  const cor = _linhaCor(form.linha);
  const linhaNome = ({ cardio: 'Cardiologia', pedi: 'Pediatria & Perinatologia', psiq: 'Psiquiatria' })[form.linha] || 'TC geral';
  const Block = ({ label, children }) => (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 13, color: DS.text, lineHeight: 1.55 }}>{children || <span style={{ color: DS.textMuted, fontStyle: 'italic' }}>—</span>}</div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ padding: '10px 14px', background: DS.blueLight, borderRadius: DS.radiusSm, fontSize: 12, color: DS.blue, fontWeight: 600 }}>
        Pré-visualização do pôster montado — esta é a aparência que ele terá na Vitrine SAM após aprovação.
      </div>

      <div style={{ ...cardBase, padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${DS.border}` }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
            <span style={{ padding: '3px 9px', borderRadius: 100, background: DS.bg, color: DS.textSec, border: `1px solid ${DS.border}`, fontSize: 10, fontWeight: 700 }}>XIII SAM</span>
            <span style={{ padding: '3px 9px', borderRadius: 100, background: cor + '18', color: cor, fontSize: 10, fontWeight: 700 }}>{FASE_LABELS[tipo]}</span>
            <span style={{ padding: '3px 9px', borderRadius: 100, background: cor + '10', color: cor, fontSize: 10, fontWeight: 700 }}>{linhaNome}</span>
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: DS.text, lineHeight: 1.3 }}>{form.titulo || <span style={{ color: DS.textMuted }}>Sem título</span>}</div>
          <div style={{ fontSize: 12, color: DS.textSec, marginTop: 6 }}>{form.autores} · orientação: {form.orientador}</div>
        </div>

        <div style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr', gap: 24 }}>
          <div>
            <Block label="Introdução">{form.intro}</Block>
            <Block label="Objetivos">{form.obj}</Block>
            <Block label="Métodos">{form.met}</Block>
            <Block label="Resultados">{form.res}</Block>
            <Block label="Discussão / Conclusão">{form.disc}</Block>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <_PosterThumb poster={{ linha: form.linha, area: linhaNome }} ratio="4/5" />
            {form.ancoragem && (
              <div style={{ padding: '10px 12px', background: DS.greenLight, borderRadius: DS.radiusSm, border: `1px solid ${DS.green}30` }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: DS.green, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 4 }}>Ancoragem regional</div>
                <div style={{ fontSize: 12, color: DS.text, lineHeight: 1.55 }}>{form.ancoragemTxt || 'Relevância para o Alto Vale / Rio do Sul / SUS regional.'}</div>
              </div>
            )}
            {form.tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {form.tags.map((t, i) => <span key={i} style={{ padding: '2px 8px', borderRadius: 100, background: DS.bg, color: DS.textSec, border: `1px solid ${DS.border}`, fontSize: 10, fontWeight: 600 }}>{t}</span>)}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onVoltar} style={{ padding: '9px 18px', borderRadius: DS.radius, background: 'transparent', color: DS.textSec, border: `1px solid ${DS.border}`, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>‹ Editar</button>
        <button onClick={onEnviar} style={{ padding: '9px 18px', borderRadius: DS.radius, background: DS.green, color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 12 }}>Enviar ao orientador para revisão ›</button>
      </div>
    </div>
  );
}

// ── Estado / validação do orientador ─────────────────────────────────────────
function ValidacaoCard({ estado, setEstado, cardBase, isMobile, onEditar }) {
  const s = SUBM_STATES[estado];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ ...cardBase, padding: '20px', borderLeft: `4px solid ${s.cor}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: s.cor, fontWeight: 800 }}>{s.icon}</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Status do pôster</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: s.cor }}>{s.label}</div>
          </div>
        </div>
        <div style={{ fontSize: 13, color: DS.textSec, lineHeight: 1.6 }}>{s.desc}</div>

        {estado === 'devolvido' && (
          <div style={{ marginTop: 14, padding: '12px 14px', background: DS.terraLight, borderRadius: DS.radiusSm, border: `1px solid ${DS.terra}30` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: DS.terra, marginBottom: 6 }}>Comentários da orientadora · Profa. Beatriz Nunes</div>
            <div style={{ fontSize: 12, color: DS.text, lineHeight: 1.6 }}>
              • Revisar pergunta PICO — o "C" (comparador) está implícito; explicitar.<br/>
              • Ampliar discussão para os limites do estudo transversal.<br/>
              • Conferir norma Vancouver nas referências 3 e 7.
            </div>
          </div>
        )}

        <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {estado === 'em_revisao' && (
            <>
              <button onClick={onEditar} style={{ padding: '7px 14px', borderRadius: DS.radius, background: 'transparent', color: DS.textSec, border: `1px solid ${DS.border}`, cursor: 'pointer', fontWeight: 600, fontSize: 11 }}>Editar (cancela revisão)</button>
              {/* Demo helpers */}
              <button onClick={() => setEstado('aprovado')} style={{ padding: '7px 14px', borderRadius: DS.radius, background: DS.green, color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 11 }}>[ demo ] simular aprovação</button>
              <button onClick={() => setEstado('devolvido')} style={{ padding: '7px 14px', borderRadius: DS.radius, background: DS.terra, color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 11 }}>[ demo ] simular devolução</button>
            </>
          )}
          {estado === 'devolvido' && (
            <button onClick={onEditar} style={{ padding: '7px 14px', borderRadius: DS.radius, background: DS.blue, color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 11 }}>Revisar e reenviar</button>
          )}
          {estado === 'aprovado' && (
            <button style={{ padding: '7px 14px', borderRadius: DS.radius, background: DS.blue, color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 11 }}>Ver pôster na Vitrine SAM ›</button>
          )}
        </div>
      </div>

      {/* Quadro de estados (referência visual) */}
      <div style={{ ...cardBase, padding: '14px 16px' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>Possíveis estados</div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 10 }}>
          {Object.entries(SUBM_STATES).map(([k, v]) => (
            <div key={k} style={{ padding: '10px 12px', background: v.bg, borderRadius: DS.radiusSm, border: `1px solid ${v.cor}30` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: v.cor, fontWeight: 800 }}>{v.icon}</span>
                <span style={{ fontSize: 11, color: v.cor, fontWeight: 800 }}>{v.label}</span>
              </div>
              <div style={{ fontSize: 10.5, color: DS.textSec, lineHeight: 1.5 }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// F.3 — MEUS TRABALHOS (para uso dentro de outras telas, ex.: Perfil do Aluno)
// =============================================================================
// Expõe um pequeno listão; usado pelo BlocoIC do Perfil do Aluno.
function MeusTrabalhosSAM({ alunoNome = 'Maria Lima', isMobile, onAbrirVitrine }) {
  // Mock dos próprios trabalhos do aluno
  const meus = [
    { tipo: 'Pôster 7ª · Projeto de TC',     edicao: 'XII SAM (2026/1)', titulo: 'Adesão terapêutica em HAS na atenção primária do Alto Vale', status: 'aprovado',  linha: 'cardio', linhaNome: 'Cardiologia' },
    { tipo: 'Pôster 8ª · Resumo final',      edicao: 'XIII SAM (prev. 2026/2)', titulo: '— pendente, semestre em curso',                                  status: 'rascunho',  linha: 'cardio', linhaNome: 'Cardiologia' },
    { tipo: 'TC completo (PDF)',             edicao: '—',                titulo: 'Defesa programada para 11/2026',                                  status: 'rascunho',  linha: 'cardio', linhaNome: 'Cardiologia' },
    { tipo: 'Publicação externa',            edicao: '—',                titulo: 'Submissão à Rev. Bras. Med. Família · DOI 10.5555/sam.2026.0012', status: 'aceito',    linha: 'cardio', linhaNome: 'Cardiologia' },
  ];
  const corStatus = SUBM_STATES;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px' }}>Meus trabalhos · {alunoNome}</div>
        {onAbrirVitrine && <button onClick={onAbrirVitrine} style={{ padding: '4px 10px', background: 'transparent', border: 'none', color: DS.blue, fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>Vitrine SAM ›</button>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {meus.map((m, i) => {
          const cor = _linhaCor(m.linha);
          const st = corStatus[m.status] || corStatus.rascunho;
          return (
            <div key={i} style={{
              padding: '12px 14px', background: DS.surface, border: `1px solid ${DS.border}`, borderRadius: DS.radiusSm,
              display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
            }}>
              <div style={{ width: 30, height: 30, borderRadius: 6, background: cor + '14', color: cor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, flexShrink: 0 }}>{m.tipo[0]}</div>
              <div style={{ flex: 1, minWidth: 180 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: DS.text }}>{m.tipo}</div>
                <div style={{ fontSize: 11, color: DS.textSec, marginTop: 2 }}>{m.titulo}</div>
                <div style={{ fontSize: 10, color: DS.textMuted, marginTop: 2 }}>{m.edicao}</div>
              </div>
              <span style={{ padding: '3px 10px', borderRadius: 100, background: st.bg, color: st.cor, fontSize: 10, fontWeight: 800 }}>{st.label}</span>
              {m.status === 'aprovado' && onAbrirVitrine && (
                <button onClick={onAbrirVitrine} style={{ fontSize: 11, color: DS.blue, fontWeight: 700, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>abrir ›</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Expor globalmente para uso em outros scripts babel
Object.assign(window, { VitrineSAMScreen, SubmissaoSAMScreen, MeusTrabalhosSAM });
