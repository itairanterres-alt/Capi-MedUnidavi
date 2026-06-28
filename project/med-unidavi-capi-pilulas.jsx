// =============================================================================
// MED-UNIDAVI · Capi-Pílulas (mu_capi_pilulas) — Bloco D3
//
// Variante narrativa curta do Capi-Cards: story de 30–90s com macete ou
// fluxo de raciocínio. Não substitui Capi-Cards (revisão espaçada FSRS),
// é unidade complementar.
//
// Densidade maior em f01–f05 (bases biomédicas e morfofuncional).
// =============================================================================

const CAPI_PILULAS = [
  {
    id: 'pil-aqp2',
    titulo: 'Aquaporinas — o macete do ADH',
    fase: '1ª–3ª', densa: ['f01', 'f02', 'f03'],
    duracao: 38, tipo: 'macete',
    miniatura: '💧',
    cor: '#1565C0',
    competencias: ['dcn2025_comp_02'],
    slides: [
      { tipo: 'frase', texto: 'AQP2 = a aquaporina do ADH.', sub: 'só essa decora.' },
      { tipo: 'lista', titulo: 'Onde está', itens: ['Ducto coletor renal', 'Apical (membrana luminal)', 'Mobilizada por vesículas'] },
      { tipo: 'lista', titulo: 'Sem ADH', itens: ['AQP2 fica dentro da célula', 'Urina diluída', 'Volume alto'] },
      { tipo: 'lista', titulo: 'Com ADH', itens: ['AQP2 vai pra membrana', 'Água é reabsorvida', 'Urina concentrada'] },
      { tipo: 'frase', texto: 'DI central: falta ADH.\nDI nefrogênico: AQP2 não responde.', sub: 'mesmo sintoma, lugar diferente.' },
    ],
  },
  {
    id: 'pil-spikes',
    titulo: 'SPIKES em 60 segundos',
    fase: '4ª+', densa: ['f04', 'f05', 'f06', 'f07', 'f08'],
    duracao: 62, tipo: 'fluxo',
    miniatura: '💬',
    cor: '#7A5CBF',
    competencias: ['dcn2025_comp_16', 'dcn2025_comp_18'],
    slides: [
      { tipo: 'frase', texto: 'SPIKES — o roteiro pra dar a notícia difícil.', sub: '6 passos. cada letra um momento.' },
      { tipo: 'lista', titulo: 'S — Setting', itens: ['Lugar adequado', 'Sem interrupção', 'Sentado, no nível dele'] },
      { tipo: 'lista', titulo: 'P — Perception', itens: ['O que ele já sabe?', '"Conta pra mim como vc tá entendendo."'] },
      { tipo: 'lista', titulo: 'I — Invitation', itens: ['Quanto quer saber?', 'Detalhes ou panorama?'] },
      { tipo: 'lista', titulo: 'K — Knowledge', itens: ['Aviso prévio: "vou te contar uma coisa difícil"', 'Frase curta, sem jargão'] },
      { tipo: 'lista', titulo: 'E — Emotions', itens: ['Silêncio. Acolha.', 'Nomeie a emoção que vc vê'] },
      { tipo: 'lista', titulo: 'S — Strategy', itens: ['Próximo passo concreto', 'Quem ele leva junto?'] },
      { tipo: 'frase', texto: 'A pior parte é o silêncio.\nSegure.', sub: 'não preencha por desconforto seu.' },
    ],
  },
  {
    id: 'pil-iam-territorio',
    titulo: 'IAM por território — em 90s',
    fase: '5ª+', densa: ['f05', 'f06', 'f07'],
    duracao: 84, tipo: 'macete',
    miniatura: '❤️',
    cor: '#B23A2A',
    competencias: ['dcn2025_comp_03', 'dcn2025_comp_07'],
    slides: [
      { tipo: 'frase', texto: 'IAM = supra em derivações contíguas.', sub: 'a regra de ouro.' },
      { tipo: 'lista', titulo: 'Anterior — DA', itens: ['V1–V4', 'Pior prognóstico', 'Maior risco de ICC aguda'] },
      { tipo: 'lista', titulo: 'Inferior — CD', itens: ['DII, DIII, aVF', 'Pode ter BAV', 'Cuidado com nitrato se VD'] },
      { tipo: 'lista', titulo: 'Lateral — Cx', itens: ['DI, aVL, V5–V6', 'Frequente combinado'] },
      { tipo: 'lista', titulo: 'Posterior — espelho V1–V3', itens: ['ST infra com R alto', 'V7–V9 confirmam'] },
      { tipo: 'frase', texto: '"Reciprocidade" = imagem espelho.', sub: 'aVL ↔ inferior. V1–V3 ↔ posterior.' },
    ],
  },
  {
    id: 'pil-dpoc',
    titulo: 'DPOC vs. asma — diferencial rápido',
    fase: '3ª+', densa: ['f03', 'f04', 'f05'],
    duracao: 55, tipo: 'macete',
    miniatura: '🫁',
    cor: '#2E7D4F',
    competencias: ['dcn2025_comp_02', 'dcn2025_comp_03'],
    slides: [
      { tipo: 'frase', texto: 'Tem tosse e dispneia. É asma ou DPOC?', sub: 'duas obstrutivas, raciocínios diferentes.' },
      { tipo: 'lista', titulo: 'Idade', itens: ['Asma — começa cedo', 'DPOC — depois dos 40'] },
      { tipo: 'lista', titulo: 'Reversibilidade', itens: ['Asma — reversível com B2', 'DPOC — pouca reversibilidade'] },
      { tipo: 'lista', titulo: 'Tabagismo', itens: ['Asma — desencadeia, não obrigatório', 'DPOC — quase obrigatório'] },
      { tipo: 'lista', titulo: 'Sintoma noturno', itens: ['Asma — pior à noite e madrugada', 'DPOC — dispneia progressiva diária'] },
      { tipo: 'frase', texto: 'Espirometria depois do broncodilatador resolve.', sub: 'pré e pós em qualquer dúvida real.' },
    ],
  },
  {
    id: 'pil-hipoglicemia',
    titulo: 'Hipoglicemia — regra dos 15',
    fase: '5ª+', densa: ['f05', 'f06', 'f07', 'f08'],
    duracao: 42, tipo: 'protocolo',
    miniatura: '🍬',
    cor: '#B97A0F',
    competencias: ['dcn2025_comp_07', 'dcn2025_comp_04'],
    slides: [
      { tipo: 'frase', texto: 'Hipoglicemia consciente: regra dos 15.', sub: '15g de açúcar. 15 minutos. Recheca.' },
      { tipo: 'lista', titulo: '15g equivalem a', itens: ['1 colher de sopa de açúcar', '150 ml de suco de laranja', '3 balas duras', '4 colheres de chá de mel'] },
      { tipo: 'lista', titulo: 'Após 15 min', itens: ['Recheca glicemia capilar', 'Se < 70 → repete dose', 'Se > 70 → refeição completa'] },
      { tipo: 'frase', texto: 'Inconsciente?\nGlucagon IM ou glicose 50% EV.', sub: 'nunca dê açúcar pela boca em inconsciente.' },
    ],
  },
  {
    id: 'pil-cfm-1614',
    titulo: 'Documentação médica — 4 obrigatórias',
    fase: '4ª+', densa: ['f04', 'f05', 'f06', 'f07', 'f08'],
    duracao: 48, tipo: 'fluxo',
    miniatura: '📋',
    cor: '#0E727C',
    competencias: ['dcn2025_comp_18'],
    slides: [
      { tipo: 'frase', texto: 'Documento médico: 4 elementos obrigatórios.', sub: 'falta um, perde valor legal.' },
      { tipo: 'lista', titulo: 'Sempre presentes', itens: ['Identificação do médico (CRM)', 'Identificação do paciente', 'Data e hora', 'Assinatura'] },
      { tipo: 'lista', titulo: 'Receita controlada', itens: ['Endereço do paciente', 'Letra legível', 'Sem rasura', 'Carimbo CRM'] },
      { tipo: 'frase', texto: 'Prontuário é do paciente.\nVc tem dever de guarda.', sub: 'mínimo 20 anos. CFM 1.821/2007.' },
    ],
  },
];

function CapiPilulasScreen({ isMobile, onNavigate }) {
  const [pilAberta, setPilAberta] = React.useState(null);
  const [filtro, setFiltro] = React.useState('todas');

  const filtradas = filtro === 'todas'
    ? CAPI_PILULAS
    : filtro === 'iniciais'
      ? CAPI_PILULAS.filter(p => p.densa.includes('f01') || p.densa.includes('f02') || p.densa.includes('f03'))
      : filtro === 'clinicas'
        ? CAPI_PILULAS.filter(p => p.densa.includes('f05') || p.densa.includes('f06') || p.densa.includes('f07'))
        : CAPI_PILULAS;

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <TopBar
        title="Capi-Pílulas"
        subtitle="Stories de 30–90s · macetes e fluxos · variante narrativa do Capi-Cards"
        isMobile={isMobile}
        breadcrumb={[
          { label: 'Início', onClick: () => onNavigate && onNavigate('dashboard') },
          { label: 'Capi-Pílulas' },
        ]}
      />

      <div style={{ padding: isMobile ? 14 : '24px 32px', display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 1100, margin: '0 auto' }}>

        {/* Cabeçalho com Capi treino + relação com Capi-Cards */}
        <Card style={{ padding: 14, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', background: DS.blueLight }}>
          <CapiSprite pose="dica" height={90} radius={10} animated />
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: DS.blue, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Capi · modo treino</div>
            <div style={{ fontSize: 13, color: DS.text, lineHeight: 1.55, marginTop: 2 }}>
              Pílulas são unidades curtas pra <strong>fixar uma ideia</strong>. Diferente dos Capi-Cards (revisão espaçada FSRS),
              não há resposta a marcar — você só passa. Use entre uma tarefa e outra, no ônibus, antes de dormir.
            </div>
          </div>
          <button onClick={() => onNavigate && onNavigate('capi-cards')} style={{
            padding: '8px 14px', borderRadius: DS.radiusSm,
            background: DS.surface, color: DS.blue, border: `1px solid ${DS.blue}30`,
            cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 800, fontSize: 11,
          }}>Capi-Cards ›</button>
        </Card>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginRight: 4 }}>Filtrar:</span>
          {[
            { id: 'todas',     label: `Todas (${CAPI_PILULAS.length})` },
            { id: 'iniciais',  label: 'Fases iniciais (1ª–3ª)' },
            { id: 'clinicas',  label: 'Ciclo clínico (5ª+)' },
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

        {/* Grade de pílulas (estilo story) */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(170px, 1fr))', gap: 12 }}>
          {filtradas.map(p => (
            <PilulaCard key={p.id} pilula={p} onAbrir={() => setPilAberta(p)} />
          ))}
        </div>

        {/* Rodapé */}
        <div style={{
          padding: '12px 16px', background: `${DS.blueAcc}08`, borderRadius: 8,
          fontSize: 11, color: DS.textMuted, lineHeight: 1.6, textAlign: 'center',
        }}>
          Pílulas são <strong>curadas</strong> — passam por revisão docente antes de virem para o aluno. Não há resposta a marcar (FSRS continua no Capi-Cards).
        </div>

        {isMobile && <div style={{ height: 60 }} />}
      </div>

      {pilAberta && (
        <PilulaViewer pilula={pilAberta} onClose={() => setPilAberta(null)} />
      )}
    </div>
  );
}

function PilulaCard({ pilula, onAbrir }) {
  return (
    <button onClick={onAbrir} style={{
      textAlign: 'left', padding: 0, border: 'none', cursor: 'pointer',
      borderRadius: DS.radius, overflow: 'hidden', position: 'relative',
      aspectRatio: '9/14', // formato story
      background: `linear-gradient(160deg, ${pilula.cor} 0%, ${_darken(pilula.cor)} 100%)`,
      boxShadow: DS.shadow, fontFamily: 'IBM Plex Sans, sans-serif',
      color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      padding: 14,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{
          padding: '2px 8px', borderRadius: 100, background: 'rgba(255,255,255,0.22)',
          fontSize: 9, fontWeight: 800, letterSpacing: '0.4px',
        }}>{pilula.fase}</span>
        <span style={{ fontSize: 22, lineHeight: 1 }}>{pilula.miniatura}</span>
      </div>
      <div>
        <div style={{ fontSize: 9.5, fontWeight: 800, opacity: 0.85, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 4 }}>
          {pilula.tipo}
        </div>
        <div style={{ fontSize: 14, fontWeight: 800, lineHeight: 1.2 }}>{pilula.titulo}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
          <span style={{ fontSize: 10.5, opacity: 0.9 }}>⏱ {pilula.duracao}s</span>
          <span style={{ fontSize: 10.5, opacity: 0.6 }}>·</span>
          <span style={{ fontSize: 10.5, opacity: 0.9 }}>{pilula.slides.length} slides</span>
        </div>
      </div>
    </button>
  );
}

// Helper: escurece uma cor hex
function _darken(hex) {
  const c = hex.replace('#', '');
  const r = Math.max(0, parseInt(c.substr(0,2), 16) - 30);
  const g = Math.max(0, parseInt(c.substr(2,2), 16) - 30);
  const b = Math.max(0, parseInt(c.substr(4,2), 16) - 30);
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
}

function PilulaViewer({ pilula, onClose }) {
  const [idx, setIdx] = React.useState(0);
  const [pausado, setPausado] = React.useState(false);
  const [progresso, setProgresso] = React.useState(0); // 0..1 do slide atual

  const totalSlides = pilula.slides.length;
  const duracaoSlide = (pilula.duracao * 1000) / totalSlides;

  // Autoplay
  React.useEffect(() => {
    if (pausado) return;
    const inicio = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - inicio;
      const p = Math.min(1, elapsed / duracaoSlide);
      setProgresso(p);
      if (p >= 1) {
        clearInterval(tick);
        if (idx < totalSlides - 1) {
          setIdx(i => i + 1);
          setProgresso(0);
        } else {
          // Fim — não fecha sozinho, espera o usuário
          setPausado(true);
        }
      }
    }, 50);
    return () => clearInterval(tick);
  }, [idx, pausado, duracaoSlide, totalSlides]);

  const slide = pilula.slides[idx];
  const proximo = () => { if (idx < totalSlides - 1) { setIdx(i => i + 1); setProgresso(0); setPausado(false); } };
  const anterior = () => { if (idx > 0) { setIdx(i => i - 1); setProgresso(0); setPausado(false); } };

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(8,12,20,0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 200,
      fontFamily: 'IBM Plex Sans, sans-serif',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 380, aspectRatio: '9/14',
        maxHeight: '95vh',
        borderRadius: DS.radiusLg, overflow: 'hidden',
        background: `linear-gradient(160deg, ${pilula.cor} 0%, ${_darken(pilula.cor)} 100%)`,
        color: '#fff', position: 'relative', display: 'flex', flexDirection: 'column',
      }}>
        {/* Progress bars no topo */}
        <div style={{ padding: '12px 14px 8px', display: 'flex', gap: 4 }}>
          {pilula.slides.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.25)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{
                width: i < idx ? '100%' : i === idx ? `${progresso * 100}%` : '0%',
                height: '100%', background: '#fff',
                transition: i === idx ? 'width 0.05s linear' : 'none',
              }} />
            </div>
          ))}
        </div>

        {/* Header */}
        <div style={{ padding: '4px 14px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>{pilula.miniatura}</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, lineHeight: 1.2 }}>{pilula.titulo}</div>
              <div style={{ fontSize: 9.5, opacity: 0.85, marginTop: 1 }}>{pilula.tipo} · {pilula.fase}</div>
            </div>
          </div>
          <button onClick={onClose} style={{
            width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.22)',
            border: 'none', cursor: 'pointer', color: '#fff', fontSize: 14, fontWeight: 800,
          }}>×</button>
        </div>

        {/* Slide */}
        <div onClick={(e) => {
          // tap right = próximo · tap left = anterior
          const r = e.currentTarget.getBoundingClientRect();
          if (e.clientX - r.left < r.width / 3) anterior();
          else proximo();
        }} style={{
          flex: 1, padding: '20px 22px', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', cursor: 'pointer', userSelect: 'none',
        }}>
          {slide.tipo === 'frase' && (
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.3, whiteSpace: 'pre-line' }}>
                {slide.texto}
              </div>
              {slide.sub && (
                <div style={{ fontSize: 13, opacity: 0.8, marginTop: 14, lineHeight: 1.5, fontStyle: 'italic' }}>
                  {slide.sub}
                </div>
              )}
            </div>
          )}
          {slide.tipo === 'lista' && (
            <div>
              {slide.titulo && (
                <div style={{ fontSize: 11, fontWeight: 800, opacity: 0.85, letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: 12 }}>
                  {slide.titulo}
                </div>
              )}
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {slide.itens.map((it, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 15, fontWeight: 600, lineHeight: 1.4 }}>
                    <span style={{ marginTop: 7, width: 6, height: 6, borderRadius: '50%', background: '#fff', flexShrink: 0 }} />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '8px 14px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 10.5, opacity: 0.85 }}>
          <span>{idx + 1} / {totalSlides}</span>
          <span>{idx === totalSlides - 1 && progresso >= 1 ? 'fim · toque ↓ para fechar' : 'toque para avançar'}</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CapiPilulasScreen, CAPI_PILULAS });
