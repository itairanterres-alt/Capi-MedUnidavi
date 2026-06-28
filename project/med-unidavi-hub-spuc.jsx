// =============================================================================
// MED-UNIDAVI · Hub SP/UC (mu_hub_sp_uc) — Bloco C
//
// Evolução do "Roteiro com 7 blocos" do Morfofuncional. Generaliza para
// qualquer SP/UC das fases 1–8. Agrega numa tela só:
//   · Sobre a SP (objetivos)
//   · Conferências gravadas
//   · Capi-Cards da SP (link)
//   · Capi-Pílulas (link)
//   · Questões curadas (filtro automático por SP)
//   · Materiais de leitura (links externos)
//   · Casos clínicos integrados (só fases clínicas, f04+)
//   · Considerações finais do tutor
//
// Restrição curricular:
//   · Morfofuncional só existe em f01–f05. Em outras fases, esse bloco
//     vira "Bases biomédicas" ou some.
//   · Casos clínicos integrados só aparecem em f04+ (ciclo clínico-básico).
// =============================================================================

// ── Mock — uma SP por fase representativa (1ª, 3ª, 5ª, 7ª) ───────────────────
const HUB_SPS = [
  {
    id: 'sp1-uc1-1',
    fase: 1, faseLabel: '1ª fase',
    uc: 'UC1 — Célula e Tecidos Básicos',
    sp: 'SP1.1 · Membrana plasmática e transporte',
    titulo: 'A criança que tossia muito',
    contexto: 'Lara, 6 anos, com tosse crônica e baixo ganho ponderal. O caso introduz fibrose cística como modelo para discutir a membrana plasmática, transporte de cloreto e mutações do canal CFTR.',
    objetivos: [
      'Explicar a estrutura da bicamada lipídica e suas proteínas de membrana.',
      'Diferenciar transporte passivo, ativo e em massa, com exemplos clínicos.',
      'Relacionar a mutação ΔF508 do CFTR com manifestações da fibrose cística.',
    ],
    morfo: true,
    tem: { conferencias: 3, cards: 12, pilulas: 4, questoes: 28, leituras: 5, casos: 0 },
    competencias: ['dcn2025_comp_02', 'dcn2025_comp_03', 'dcn2025_comp_15'],
  },
  {
    id: 'sp3-uc1-2',
    fase: 3, faseLabel: '3ª fase',
    uc: 'UC2 — Aparelho Respiratório',
    sp: 'SP3.4 · Tosse e dispneia em adulto',
    titulo: 'O senhor que não desgrudou do cigarro',
    contexto: 'João, 62 anos, tabagista de longa data, com dispneia progressiva, tosse produtiva e estertores crepitantes em bases. Introdução à DPOC com integração morfo–função–clínica.',
    objetivos: [
      'Correlacionar achados clínicos com a histologia do tecido pulmonar normal e em DPOC.',
      'Aplicar o algoritmo de avaliação inicial da dispneia em atenção primária.',
      'Discutir abordagem motivacional para cessação tabágica.',
    ],
    morfo: true,
    tem: { conferencias: 4, cards: 18, pilulas: 6, questoes: 42, leituras: 7, casos: 0 },
    competencias: ['dcn2025_comp_02', 'dcn2025_comp_03', 'dcn2025_comp_08', 'dcn2025_comp_16'],
  },
  {
    id: 'sp5-uc2-1',
    fase: 5, faseLabel: '5ª fase',
    uc: 'UC1 — Atenção à saúde do adulto I',
    sp: 'SP5.2 · Adesão à terapia anti-hipertensiva',
    titulo: 'A senhora que esqueceu o remédio na gaveta',
    contexto: 'Dona Iracema, 68 anos, HAS estágio 2, com adesão irregular ao tratamento. Caso introduz adesão terapêutica, decisões compartilhadas e abordagem motivacional na atenção primária.',
    objetivos: [
      'Reconhecer fatores associados à baixa adesão em hipertensos crônicos.',
      'Conduzir entrevista motivacional com técnica OARS.',
      'Construir plano terapêutico compartilhado, respeitando contexto socioeconômico.',
    ],
    morfo: false, // ciclo clínico — Morfofuncional não se aplica em f05+
    tem: { conferencias: 2, cards: 14, pilulas: 5, questoes: 36, leituras: 8, casos: 3 },
    competencias: ['dcn2025_comp_01', 'dcn2025_comp_05', 'dcn2025_comp_16', 'dcn2025_comp_13'],
  },
  {
    id: 'sp7-uc1-1',
    fase: 7, faseLabel: '7ª fase',
    uc: 'UC1 — Saúde da Mulher',
    sp: 'SP7.1 · Pré-natal de risco habitual',
    titulo: 'Mariana, primigesta, 24 anos',
    contexto: 'Mariana, 24 anos, primigesta, vem para primeira consulta de pré-natal em UBS de Bela Vista. Caso conduz pelo cronograma de consultas, exames trimestrais e identificação precoce de risco.',
    objetivos: [
      'Aplicar o cronograma do pré-natal de risco habitual conforme PNAB.',
      'Solicitar e interpretar exames obrigatórios por trimestre.',
      'Identificar sinais de alerta que justifiquem encaminhamento a alto risco.',
    ],
    morfo: false,
    tem: { conferencias: 3, cards: 16, pilulas: 7, questoes: 38, leituras: 9, casos: 4 },
    competencias: ['dcn2025_comp_10', 'dcn2025_comp_08', 'dcn2025_comp_13', 'dcn2025_comp_22'],
  },
];

function HubSPUCScreen({ isMobile, onNavigate }) {
  const [spId, setSpId] = React.useState(HUB_SPS[1].id); // 3ª fase como padrão
  const sp = HUB_SPS.find(s => s.id === spId) || HUB_SPS[0];
  const comps = _compByIds(sp.competencias);

  const blocos = [
    { id: 'objetivos',    titulo: 'Objetivos do encontro',     icon: '🎯', cor: DS.blue,    desc: 'Pacto inicial entre tutor e grupo' },
    { id: 'conferencias', titulo: 'Conferências gravadas',     icon: '🎥', cor: DS.terra,   desc: `${sp.tem.conferencias} vídeos · com marcações temporais` },
    { id: 'cards',        titulo: 'Capi-Cards da SP',          icon: '🃏', cor: '#7A5CBF',  desc: `${sp.tem.cards} cards · FSRS · 4 botões`, link: 'capi-cards' },
    { id: 'pilulas',      titulo: 'Capi-Pílulas',              icon: '⚡', cor: DS.amber,   desc: `${sp.tem.pilulas} stories de 30–90s · macetes` },
    { id: 'questoes',     titulo: 'Questões curadas',          icon: '📝', cor: DS.green,   desc: `${sp.tem.questoes} questões ABDC · filtro automático`, link: 'questoes' },
    { id: 'leituras',     titulo: 'Materiais de leitura',      icon: '📚', cor: DS.blueAcc, desc: `${sp.tem.leituras} referências · Minha Biblioteca · UpToDate` },
    sp.tem.casos > 0 ? { id: 'casos', titulo: 'Casos clínicos integrados', icon: '🏥', cor: '#1A6E8A', desc: `${sp.tem.casos} casos · ciclo clínico` } : null,
    { id: 'tutor',        titulo: 'Considerações finais do tutor', icon: '💬', cor: DS.textSec, desc: 'Síntese pós-encontro · não pública' },
  ].filter(Boolean);

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <TopBar
        title="Hub SP/UC"
        subtitle={`${sp.faseLabel} · ${sp.uc}`}
        isMobile={isMobile}
        breadcrumb={[
          { label: 'Início', onClick: () => onNavigate && onNavigate('dashboard') },
          { label: sp.faseLabel },
          { label: sp.uc },
          { label: sp.sp.split('·')[0].trim() },
        ]}
      />

      <div style={{ padding: isMobile ? 14 : '24px 32px', display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 1200, margin: '0 auto' }}>

        {/* Seletor de SP — só no protótipo */}
        <Card style={{ padding: '12px 14px', background: DS.amberLight, borderLeft: `3px solid ${DS.amber}` }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: DS.amber, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6 }}>
            Demo — alternar SP para testar fase
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {HUB_SPS.map(s => {
              const ativo = s.id === spId;
              return (
                <button key={s.id} onClick={() => setSpId(s.id)} style={{
                  padding: '6px 12px', borderRadius: DS.radiusSm,
                  background: ativo ? DS.blueDark : DS.surface,
                  color: ativo ? '#fff' : DS.textDark,
                  border: `1px solid ${ativo ? DS.blueDark : DS.border}`,
                  fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 11, cursor: 'pointer',
                }}>{s.faseLabel} · {s.sp.split('·')[0].trim()}</button>
              );
            })}
          </div>
        </Card>

        {/* Cabeçalho da SP */}
        <Card style={{ padding: isMobile ? 16 : 22 }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
            <Badge color={DS.blue}>{sp.sp}</Badge>
            {sp.morfo && <Badge color={DS.green}>Morfofuncional</Badge>}
            {sp.fase >= 4 && <Badge color={DS.terra}>Ciclo clínico</Badge>}
          </div>
          <h2 style={{ margin: '4px 0 8px', fontSize: isMobile ? 18 : 22, fontWeight: 800, color: DS.text, lineHeight: 1.25 }}>
            {sp.titulo}
          </h2>
          <p style={{ margin: 0, fontSize: 13.5, color: DS.textSec, lineHeight: 1.6 }}>{sp.contexto}</p>

          {/* Competências DCN tocadas */}
          <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Competências DCN tocadas:</span>
            {comps.map(c => (
              <span key={c.id} title={c.titulo} style={{
                padding: '3px 9px', borderRadius: 4, fontSize: 10.5, fontWeight: 800, color: '#fff',
                background: DCN27_AREAS[c.area].cor,
              }}>C{String(c.n).padStart(2, '0')}</span>
            ))}
          </div>
        </Card>

        {/* Objetivos do encontro */}
        <Card style={{ padding: isMobile ? 14 : 18 }}>
          <SectionHeading>Objetivos do encontro</SectionHeading>
          <ul style={{ margin: '6px 0 0', paddingLeft: 20, fontSize: 13.5, color: DS.text, lineHeight: 1.7 }}>
            {sp.objetivos.map((o, i) => <li key={i} style={{ marginBottom: 4 }}>{o}</li>)}
          </ul>
        </Card>

        {/* Blocos agregados como cards */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
          {blocos.filter(b => b.id !== 'objetivos' && b.id !== 'tutor').map(b => (
            <button key={b.id}
              onClick={() => { if (b.link) onNavigate && onNavigate(b.link); }}
              style={{
                textAlign: 'left', padding: 16, borderRadius: DS.radius,
                background: DS.surface, border: `1px solid ${DS.border}`,
                borderLeft: `3px solid ${b.cor}`,
                cursor: b.link ? 'pointer' : 'default',
                fontFamily: 'IBM Plex Sans, sans-serif',
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: DS.radiusSm,
                  background: b.cor + '18', color: b.cor,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18,
                }}>{b.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 800, color: DS.text, lineHeight: 1.3 }}>{b.titulo}</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: DS.textSec, lineHeight: 1.5 }}>{b.desc}</div>
              {b.link && (
                <div style={{ marginTop: 'auto', fontSize: 11, color: b.cor, fontWeight: 800, paddingTop: 4 }}>
                  Abrir ›
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Considerações finais do tutor */}
        <Card style={{ padding: isMobile ? 14 : 18 }}>
          <SectionHeading>Considerações finais do tutor</SectionHeading>
          <div style={{ fontSize: 12, color: DS.textMuted, marginBottom: 10, lineHeight: 1.55 }}>
            Síntese pós-encontro registrada pelo tutor. Não pública — visível só ao tutor e à coordenação.
          </div>
          <div style={{
            padding: '12px 14px', background: DS.bg, borderRadius: DS.radiusSm,
            border: `1px dashed ${DS.border}`,
            fontSize: 13, color: DS.text, lineHeight: 1.6, fontStyle: 'italic',
          }}>
            {sp.fase >= 5
              ? '"Boa adesão do grupo aos objetivos. Carlos e Pedro precisam reforçar a parte de entrevista motivacional — sugerido revisar pílula OARS. Mariana liderou a discussão de caso com competência."'
              : '"Encontro fluido. Grupo conseguiu correlacionar histologia com manifestação clínica. Marcar pílula sobre canais iônicos para revisão na próxima."'}
          </div>
        </Card>

        {/* Rodapé */}
        <div style={{
          padding: '12px 16px', background: `${DS.blueAcc}08`, borderRadius: 8,
          fontSize: 11, color: DS.textMuted, lineHeight: 1.6, textAlign: 'center',
        }}>
          Hub SP/UC · fases 1–8 · agregador único de objetos pedagógicos vinculados à SP.
          Roteiro morfofuncional aparece só em f01–f05. Casos clínicos integrados aparecem só a partir da f04.
        </div>

        {isMobile && <div style={{ height: 60 }} />}
      </div>
    </div>
  );
}

Object.assign(window, { HubSPUCScreen, HUB_SPS });
