// MED-UNIDAVI 2027 — Iniciação Científica · Reformulada (Item 16)
// ──────────────────────────────────────────────────────────────────────────
// Não-negociáveis:
//  • Modalidade do aluno: TC obrigatório (todos) vs Trilha de Excelência NPCMed (seleção)
//  • Governança real: Franciani, Samantha, Alinne (operacional, decisória)
//    Caroline Bacca: descrita por FATO — produção em revisões sistemáticas e
//    coordenação institucional dos ambulatórios. Sem "âncora", sem "convite",
//    sem adjetivo institucional. É orientadora de TC como as demais.
//  • 3 áreas no mock: Cardiologia · Pediatria/Perinatologia · Psiquiatria
//  • Repositório: visibilidade dual (público para vitrine / privado em construção)
//  • Catálogo de orientadores com vagas, áreas, produção recente, sugestão de co-orientação
// ──────────────────────────────────────────────────────────────────────────

// ── Dados mock ────────────────────────────────────────────────────────────
const NPCMED_LINHAS = [
  {
    id: 'cardio',
    nome: 'Cardiologia',
    cor: DS.terra,
    pesquisadores: [
      { nome: 'Profa. Caroline Bacca',     papel: 'Orientadora · TC' },
      { nome: 'Prof. Eduardo Stahnke',     papel: 'Orientador · TC' },
      { nome: 'Profa. Renata Wessler',     papel: 'Orientadora · TC e NPCMed' },
    ],
    foco: 'Risco cardiovascular em populações rurais, adesão terapêutica em HAS, prevenção primária no Alto Vale.',
    projetos: 4,
    alunos: 6,
  },
  {
    id: 'pedi',
    nome: 'Pediatria & Perinatologia',
    cor: DS.blue,
    pesquisadores: [
      { nome: 'Prof. Marlou Dalri',     papel: 'Pesquisador titular' },
      { nome: 'Profa. Samantha Lopes',  papel: 'Pesquisadora titular · Governança' },
    ],
    foco: 'Saúde materno-infantil, aleitamento, triagem neonatal e desfechos perinatais regionais.',
    projetos: 5,
    alunos: 8,
  },
  {
    id: 'psiq',
    nome: 'Psiquiatria',
    cor: '#7A5CBF',
    pesquisadores: [
      { nome: 'Prof. José Eduardo Dagostini', papel: 'Pesquisador titular' },
      { nome: 'Profa. Mariana Celli',         papel: 'Pesquisadora titular' },
    ],
    foco: 'Saúde mental do estudante de medicina, depressão na atenção primária, suicídio no jovem adulto.',
    projetos: 3,
    alunos: 5,
  },
];

const NPCMED_GOVERNANCA = [
  { nome: 'Profa. Franciani',     papel: 'Coordenação operacional · NPCMed', formacao: 'Doutora · não-médica', decisao: true },
  { nome: 'Profa. Samantha Lopes', papel: 'Coordenação operacional · NPCMed', formacao: 'Doutora · não-médica', decisao: true },
  { nome: 'Profa. Alinne Petris',  papel: 'Coordenação operacional · NPCMed', formacao: 'Doutora · não-médica', decisao: true },
];

const ORIENTADORES = [
  {
    id: 'caroline', nome: 'Profa. Caroline Bacca', area: 'Cardiologia', linha: 'cardio',
    titulacao: 'Doutora · coordena os ambulatórios institucionais; produção em revisões sistemáticas',
    vagas: { atuais: 2, total: 4 },
    producaoRecente: [
      { ano: '—', tipo: 'Revisão sistemática', titulo: 'Produção em revisões sistemáticas', periodico: 'referências a confirmar' },
    ],
    coOrientadores: ['Prof. Marlou Dalri (estatística)', 'Profa. Franciani (epidemiologia)'],
    favorita: true,
  },
  {
    id: 'marlou', nome: 'Prof. Marlou Dalri', area: 'Pediatria', linha: 'pedi',
    titulacao: 'Doutor em Saúde da Criança',
    vagas: { atuais: 1, total: 3 },
    producaoRecente: [
      { ano: 2025, tipo: 'Artigo', titulo: 'Triagem neonatal: cobertura no Alto Vale', periodico: 'Rev Paul Pediatr' },
      { ano: 2024, tipo: 'Abstract', titulo: 'Aleitamento materno e desfechos perinatais', periodico: 'COBEM 2024' },
    ],
    coOrientadores: ['Profa. Samantha Lopes (clínica)', 'Profa. Alinne (metodologia)'],
  },
  {
    id: 'samantha', nome: 'Profa. Samantha Lopes', area: 'Perinatologia', linha: 'pedi',
    titulacao: 'Doutora em Ginecologia e Obstetrícia',
    vagas: { atuais: 0, total: 2 },
    producaoRecente: [
      { ano: 2025, tipo: 'Artigo', titulo: 'Mortalidade materna em microrregiões SC', periodico: 'Cad Saúde Pública' },
    ],
    coOrientadores: ['Prof. Marlou Dalri', 'Profa. Franciani'],
  },
  {
    id: 'jose', nome: 'Prof. José Eduardo Dagostini', area: 'Psiquiatria', linha: 'psiq',
    titulacao: 'Doutor em Psiquiatria',
    vagas: { atuais: 2, total: 3 },
    producaoRecente: [
      { ano: 2025, tipo: 'Artigo', titulo: 'Depressão na APS — prevalência regional', periodico: 'Rev Bras Psiquiatr' },
    ],
    coOrientadores: ['Profa. Mariana Celli', 'Profa. Samantha (governança)'],
  },
  {
    id: 'mariana', nome: 'Profa. Mariana Celli', area: 'Saúde mental', linha: 'psiq',
    titulacao: 'Doutora em Psicologia Médica',
    vagas: { atuais: 1, total: 2 },
    producaoRecente: [
      { ano: 2024, tipo: 'Artigo', titulo: 'Burnout em estudantes de medicina', periodico: 'BMC Med Educ' },
    ],
    coOrientadores: ['Prof. José Eduardo Dagostini', 'Profa. Alinne'],
  },
  {
    id: 'beatriz', nome: 'Profa. Beatriz Nunes', area: 'Atenção Primária', linha: null,
    titulacao: 'Doutora em Saúde Coletiva',
    vagas: { atuais: 3, total: 5 },
    producaoRecente: [
      { ano: 2025, tipo: 'Revisão', titulo: 'Adesão terapêutica em DM2 na APS', periodico: 'Rev ABEM (rascunho)' },
    ],
    coOrientadores: ['Profa. Franciani (epidemiologia)'],
    favorita: true,
  },
];

// ── Componente principal ──────────────────────────────────────────────────
function ICientificaScreen({ isMobile, onNavigate }) {
  const [subTela, setSubTela] = React.useState('hub');
  const [modalidade, setModalidade] = React.useState('tc'); // tc | trilha
  const [buscaLit, setBuscaLit] = React.useState('');
  const [buscandoLit, setBuscandoLit] = React.useState(false);
  const [metodTpl, setMetodTpl] = React.useState(null);
  const [orientadorOpen, setOrientadorOpen] = React.useState(null);
  const [filtroLinha, setFiltroLinha] = React.useState('todas');
  const [linhaOpen, setLinhaOpen] = React.useState(null);
  const [visibPub, setVisibPub] = React.useState({ v3: false, v2: false, v1: false });

  const cardBase = {
    background: DS.surface, borderRadius: DS.radiusLg,
    border: `1px solid ${DS.border}`, boxShadow: DS.shadow,
  };

  const statusColor = { rascunho: DS.textMuted, submetido: DS.blue, 'em revisão': DS.amber, aceito: DS.green, rejeitado: DS.terra, publicado: '#7A5CBF' };

  const NavSub = () => (
    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', padding: isMobile ? '10px 16px' : '10px 32px', background: DS.surface, borderBottom: `1px solid ${DS.border}` }}>
      {[
        { id: 'hub',         label: 'Hub' },
        { id: 'orientadores',label: 'Orientadores' },
        { id: 'curadoria',   label: 'Literatura' },
        { id: 'metodologia', label: 'Metodologia' },
        { id: 'repositorio', label: 'Repositório' },
        { id: 'vitrine-sam', label: 'Vitrine SAM' },
        { id: 'submissao-sam', label: 'Submeter à SAM' },
        { id: 'npcmed',      label: 'NPCMed' },
      ].map(item => (
        <button key={item.id} onClick={() => setSubTela(item.id)} style={{
          padding: '6px 14px', borderRadius: DS.radiusSm,
          background: subTela === item.id ? DS.blue : 'transparent',
          color: subTela === item.id ? '#fff' : DS.textSec,
          border: `1px solid ${subTela === item.id ? DS.blue : DS.border}`,
          fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 12,
          cursor: 'pointer', transition: 'all 0.15s',
        }}>{item.label}</button>
      ))}
    </div>
  );

  const Header = ({ titulo, subtitulo }) => {
    const ehHub = subTela === 'hub';
    const subLabel = subTela === 'orientadores' ? 'Catálogo de orientadores'
                  : subTela === 'curadoria' ? 'Curadoria de literatura'
                  : subTela === 'metodologia' ? 'Apoio metodológico'
                  : subTela === 'repositorio' ? 'Repositório de TCC'
                  : subTela === 'vitrine-sam' ? 'Vitrine SAM'
                  : subTela === 'submissao-sam' ? 'Submeter à SAM'
                  : subTela === 'npcmed' ? 'NPCMed'
                  : null;
    const breadcrumb = [
      { label: 'Início', onClick: () => onNavigate && onNavigate('dashboard') },
      { label: 'Iniciação Científica', onClick: !ehHub ? () => setSubTela('hub') : undefined },
      ...(!ehHub && subLabel ? [{ label: subLabel }] : []),
    ];
    return (
      <TopBar
        title={titulo}
        subtitle={subtitulo}
        isMobile={isMobile}
        breadcrumb={breadcrumb}
      />
    );
  };

  // ─── HUB ────────────────────────────────────────────────────────────────
  if (subTela === 'hub') {
    const etapasTC = [
      { label: 'Tema',      done: true },
      { label: 'Orient.',   done: true },
      { label: 'Projeto',   done: false, ativa: true },
      { label: 'Coleta',    done: false },
      { label: 'Redação',   done: false },
      { label: 'Defesa',    done: false },
    ];
    const etapasTrilha = [
      { label: 'Despertar', done: true },
      { label: 'Tema',      done: true },
      { label: 'Revisão',   done: false, ativa: true },
      { label: 'Projeto',   done: false },
      { label: 'Coleta',    done: false },
      { label: 'Análise',   done: false },
      { label: 'Redação',   done: false },
      { label: 'Submissão', done: false },
    ];
    const etapas = modalidade === 'tc' ? etapasTC : etapasTrilha;

    return (
      <div style={{ flex: 1, overflow: 'auto', background: DS.bg, fontFamily: 'IBM Plex Sans, sans-serif' }}>
        <Header titulo="Iniciação Científica" subtitulo="Trabalho de Conclusão e Trilha de Excelência NPCMed" />
        <NavSub />

        <div style={{ padding: isMobile ? '16px' : '24px 32px', display: 'flex', flexDirection: 'column', gap: 22 }}>

          {/* Switch de modalidade */}
          <section>
            <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>Sua modalidade</div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
              {[
                { id: 'tc',     titulo: 'TC — Trabalho de Conclusão', sub: 'Obrigatório para todos · 1 projeto · orientador único', tag: 'Você (atual)', cor: DS.blue,
                  detalhe: 'Pergunta de pesquisa, revisão dirigida, coleta, redação e defesa. Apoio metodológico do Capi + orientador. CEP quando aplicável.' },
                { id: 'trilha', titulo: 'Trilha de Excelência NPCMed', sub: 'Seletiva · pesquisa longitudinal · co-orientação metodológica', tag: 'Vagas abertas', cor: '#7A5CBF',
                  detalhe: 'Submissão a evento/periódico, integração à linha NPCMed, mentoria de pesquisador titular + apoio metodológico das doutoras coordenadoras.' },
              ].map(m => {
                const ativo = modalidade === m.id;
                return (
                  <button key={m.id} onClick={() => setModalidade(m.id)} style={{
                    ...cardBase, padding: '16px 18px', textAlign: 'left', cursor: 'pointer',
                    border: `2px solid ${ativo ? m.cor : DS.border}`,
                    background: ativo ? m.cor + '08' : DS.surface,
                    fontFamily: 'IBM Plex Sans, sans-serif',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: DS.text }}>{m.titulo}</div>
                      <span style={{ padding: '3px 10px', borderRadius: 100, background: m.cor + '18', color: m.cor, fontSize: 10, fontWeight: 700 }}>{m.tag}</span>
                    </div>
                    <div style={{ fontSize: 12, color: DS.textSec, marginBottom: 8 }}>{m.sub}</div>
                    <div style={{ fontSize: 12, color: DS.textMuted, lineHeight: 1.5 }}>{m.detalhe}</div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Trajetória contextual */}
          <section>
            <h3 style={{ margin: '0 0 14px', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Trajetória — {modalidade === 'tc' ? 'TC' : 'Trilha NPCMed'}
            </h3>
            <div style={{ ...cardBase, padding: '20px', overflowX: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', minWidth: isMobile ? 600 : 'auto' }}>
                {etapas.map((e, i) => (
                  <React.Fragment key={i}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: e.done ? DS.green : e.ativa ? DS.blue : DS.borderLight,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: e.done || e.ativa ? '#fff' : DS.textMuted,
                        fontWeight: 700, fontSize: 13,
                        border: e.ativa ? `3px solid ${DS.blueAcc}` : 'none',
                      }}>
                        {e.done ? '✓' : i + 1}
                      </div>
                      <div style={{ fontSize: 10, fontWeight: e.ativa ? 700 : 500, color: e.done ? DS.green : e.ativa ? DS.blue : DS.textMuted, textAlign: 'center', width: 70 }}>{e.label}</div>
                    </div>
                    {i < etapas.length - 1 && (
                      <div style={{ flex: 1, height: 2, background: e.done ? DS.green : DS.borderLight, minWidth: 16 }} />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div style={{ marginTop: 16, padding: '10px 14px', background: DS.blueLight, borderRadius: DS.radiusSm, fontSize: 12, color: DS.blue, fontWeight: 600 }}>
                Etapa atual: <strong>{modalidade === 'tc' ? 'Projeto' : 'Revisão de literatura'}</strong> — 2 artigos incluídos, 14 em triagem
              </div>
            </div>
          </section>

          {/* Ações rápidas */}
          <section>
            <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Ações rápidas</h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 12 }}>
              {[
                { label: 'Catálogo de orientadores', icon: '👥', color: DS.blue, sub: '6 docentes · 9 vagas abertas', action: () => setSubTela('orientadores') },
                { label: 'Buscar literatura',        icon: '🔬', color: DS.green, sub: 'Curadoria assistida', action: () => setSubTela('curadoria') },
                { label: 'Apoio metodológico',       icon: '💬', color: DS.terra, sub: 'Conversar com o Capi', action: () => setSubTela('metodologia') },
                { label: 'Meu repositório',          icon: '📁', color: '#7A5CBF', sub: 'Versões, visibilidade dual', action: () => setSubTela('repositorio') },
                { label: 'Vitrine SAM',              icon: '🎓', color: DS.green, sub: 'Pôsteres da Semana Acadêmica', action: () => setSubTela('vitrine-sam') },
                { label: 'Submeter à SAM',           icon: '📤', color: DS.terra, sub: 'Pôster 7ª / 8ª fase · fluxo nativo', action: () => setSubTela('submissao-sam') },
              ].map((c, i) => (
                <div key={i} onClick={c.action} style={{ ...cardBase, padding: '16px', textAlign: 'center', cursor: 'pointer', transition: 'box-shadow 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = DS.shadowMd}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = DS.shadow}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: c.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, margin: '0 auto 10px' }}>{c.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 12, color: DS.text, marginBottom: 4 }}>{c.label}</div>
                  <div style={{ fontSize: 11, color: DS.textMuted }}>{c.sub}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Vínculo institucional */}
          <section>
            <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Vínculo institucional</h3>
            <div style={{ ...cardBase, padding: '16px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: 14 }}>
              {[
                { label: 'Núcleo',      valor: 'NPCMed UNIDAVI' },
                { label: 'Modalidade',  valor: modalidade === 'tc' ? 'TC obrigatório' : 'Trilha de Excelência' },
                { label: 'Orientadora', valor: 'Profa. Beatriz Nunes' },
                { label: 'Registro',    valor: 'IC-2024-0023' },
              ].map((v, i) => (
                <div key={i}>
                  <div style={{ fontSize: 10, color: DS.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{v.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: DS.text, marginTop: 2 }}>{v.valor}</div>
                </div>
              ))}
            </div>
          </section>

          {isMobile && <div style={{ height: 72 }} />}
        </div>
      </div>
    );
  }

  // ─── ORIENTADORES ───────────────────────────────────────────────────────
  if (subTela === 'orientadores') {
    const filtrados = filtroLinha === 'todas' ? ORIENTADORES : ORIENTADORES.filter(o => o.linha === filtroLinha);
    return (
      <div style={{ flex: 1, overflow: 'auto', background: DS.bg, fontFamily: 'IBM Plex Sans, sans-serif' }}>
        <Header titulo="Catálogo de orientadores" subtitulo="Vagas, áreas, produção recente e sugestão de co-orientação" />
        <NavSub />

        <div style={{ padding: isMobile ? '16px' : '24px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Filtro por linha */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: DS.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Filtrar por linha:</span>
            {[{ id: 'todas', label: 'Todas' }, ...NPCMED_LINHAS.map(l => ({ id: l.id, label: l.nome })), { id: null, label: 'Sem linha' }]
              .filter(x => x.id !== null || ORIENTADORES.some(o => !o.linha))
              .map(opt => {
                const ativo = filtroLinha === opt.id;
                return (
                  <button key={String(opt.id)} onClick={() => setFiltroLinha(opt.id)} style={{
                    padding: '5px 12px', borderRadius: 100,
                    background: ativo ? DS.blue : 'transparent', color: ativo ? '#fff' : DS.textSec,
                    border: `1px solid ${ativo ? DS.blue : DS.border}`,
                    fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 11, cursor: 'pointer',
                  }}>{opt.label}</button>
                );
              })}
          </div>

          {/* Cards de orientadores */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 12 }}>
            {filtrados.map(o => {
              const linha = NPCMED_LINHAS.find(l => l.id === o.linha);
              const cor = linha ? linha.cor : DS.textMuted;
              const aberto = orientadorOpen === o.id;
              const semVaga = o.vagas.atuais === 0;
              return (
                <div key={o.id} style={{
                  ...cardBase, padding: '16px', borderLeft: `3px solid ${cor}`,
                  opacity: semVaga ? 0.7 : 1, transition: 'box-shadow 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = DS.shadowMd}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = DS.shadow}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 6 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                        <span style={{ fontWeight: 700, fontSize: 14, color: DS.text }}>{o.nome}</span>
                        {o.favorita && <span title="Sua orientadora atual" style={{ fontSize: 11 }}>⭐</span>}
                      </div>
                      <div style={{ fontSize: 12, color: DS.textSec }}>{o.titulacao}</div>
                      <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 2 }}>
                        {o.area}{linha ? ` · linha ${linha.nome}` : ''}
                      </div>
                    </div>
                    <span style={{
                      padding: '4px 10px', borderRadius: 100,
                      background: semVaga ? DS.borderLight : cor + '18',
                      color: semVaga ? DS.textMuted : cor, fontSize: 10, fontWeight: 700, flexShrink: 0,
                    }}>
                      {semVaga ? 'sem vaga' : `${o.vagas.atuais}/${o.vagas.total} vagas`}
                    </span>
                  </div>

                  <button onClick={() => setOrientadorOpen(aberto ? null : o.id)} style={{
                    marginTop: 8, padding: '5px 0', background: 'transparent', border: 'none',
                    color: DS.blue, fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 11,
                    cursor: 'pointer', textAlign: 'left',
                  }}>
                    {aberto ? '▴ Ocultar produção' : '▾ Produção recente e co-orientação'}
                  </button>

                  {aberto && (
                    <div style={{ marginTop: 8, padding: '12px', background: DS.bg, borderRadius: DS.radiusSm, border: `1px solid ${DS.border}` }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6 }}>Produção recente</div>
                      {o.producaoRecente.map((p, i) => (
                        <div key={i} style={{ marginBottom: 6, fontSize: 12, color: DS.text, lineHeight: 1.5 }}>
                          <span style={{ display: 'inline-block', padding: '1px 7px', borderRadius: 100, background: cor + '18', color: cor, fontSize: 10, fontWeight: 700, marginRight: 6 }}>{p.tipo} {p.ano}</span>
                          {p.titulo} · <span style={{ color: DS.textMuted }}>{p.periodico}</span>
                        </div>
                      ))}
                      <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginTop: 12, marginBottom: 6 }}>
                        Sugestão de co-orientação metodológica
                      </div>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {o.coOrientadores.map((c, i) => (
                          <span key={i} style={{ padding: '3px 9px', borderRadius: 100, background: DS.surface, color: DS.textSec, border: `1px solid ${DS.border}`, fontSize: 11, fontWeight: 600 }}>{c}</span>
                        ))}
                      </div>
                      {!semVaga && !o.favorita && (
                        <button style={{
                          marginTop: 12, padding: '6px 14px', borderRadius: DS.radiusSm,
                          background: DS.blue, color: '#fff', border: 'none', cursor: 'pointer',
                          fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 11,
                        }}>Solicitar orientação ›</button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <AIDisclaimer text="Vagas, produção e sugestões de co-orientação são curadas pelo NPCMed. Aprovação final cabe ao orientador e à coordenação operacional do núcleo." />

          {isMobile && <div style={{ height: 72 }} />}
        </div>
      </div>
    );
  }

  // ─── CURADORIA DE LITERATURA ────────────────────────────────────────────
  if (subTela === 'curadoria') {
    const literaturaMock = [
      { titulo: 'Adherence to antihypertensive therapy in primary care: a systematic review', autores: 'Costa R, Andrade M et al.', periodico: 'J Hypertens', ano: 2024, impacto: 'JCR 4.2', tipo: 'Revisão sistemática' },
      { titulo: 'Cardiovascular risk factors in rural Brazilian populations',                  autores: 'Silva AB, Ferreira C et al.', periodico: 'Heart',     ano: 2023, impacto: 'JCR 5.1', tipo: 'Estudo transversal' },
      { titulo: 'Patient education interventions for hypertension control',                    autores: 'Jones K, Brown T et al.',     periodico: 'Cochrane Database', ano: 2025, impacto: 'JCR 8.0', tipo: 'Meta-análise' },
    ];
    const handleBusca = () => { if (!buscaLit.trim()) return; setBuscandoLit(true); setTimeout(() => setBuscandoLit(false), 1800); };

    return (
      <div style={{ flex: 1, overflow: 'auto', background: DS.bg, fontFamily: 'IBM Plex Sans, sans-serif' }}>
        <Header titulo="Curadoria de literatura" subtitulo="Busca assistida pelo Capi · PubMed, Cochrane, LILACS" />
        <NavSub />

        <div style={{ padding: isMobile ? '16px' : '24px 32px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <AIDisclaimer text="Curadoria final é responsabilidade do orientador. O Capi auxilia na triagem, mas não substitui a avaliação crítica humana da literatura." />

          <div style={{ display: 'flex', gap: 10 }}>
            <input
              value={buscaLit}
              onChange={e => setBuscaLit(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleBusca()}
              placeholder="Ex: hipertensão arterial, adesão terapêutica, atenção primária"
              style={{ flex: 1, padding: '11px 16px', border: `1.5px solid ${DS.border}`, borderRadius: DS.radius, fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13, color: DS.text, outline: 'none' }}
            />
            <button onClick={handleBusca} style={{ padding: '11px 20px', borderRadius: DS.radius, background: DS.blue, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 13 }}>
              {buscandoLit ? '…' : 'Buscar'}
            </button>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: DS.textMuted, fontWeight: 600 }}>Filtros:</span>
            {['Revisão sistemática', 'Meta-análise', 'RCT', 'Estudo coorte', '2020–2026', 'Português / Inglês'].map(f => (
              <button key={f} style={{ padding: '4px 10px', borderRadius: 100, border: `1px solid ${DS.border}`, background: DS.surface, color: DS.textSec, fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>{f}</button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {literaturaMock.map((art, i) => (
              <div key={i} style={{ ...cardBase, padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 6 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: DS.text, lineHeight: 1.4, flex: 1 }}>{art.titulo}</div>
                  <span style={{ padding: '3px 8px', borderRadius: 100, background: DS.blue + '18', color: DS.blue, fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{art.tipo}</span>
                </div>
                <div style={{ fontSize: 12, color: DS.textSec, marginBottom: 4 }}>{art.autores}</div>
                <div style={{ display: 'flex', gap: 10, fontSize: 11, color: DS.textMuted, marginBottom: 12 }}>
                  <span>{art.periodico}</span><span>·</span><span>{art.ano}</span><span>·</span>
                  <span style={{ color: DS.green, fontWeight: 600 }}>{art.impacto}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button style={{ padding: '5px 12px', borderRadius: DS.radiusSm, background: DS.blue, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 11 }}>+ Biblioteca de TCC</button>
                  <button style={{ padding: '5px 12px', borderRadius: DS.radiusSm, background: 'transparent', border: `1px solid ${DS.border}`, color: DS.textSec, cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 11 }}>Referência principal</button>
                  <button style={{ padding: '5px 12px', borderRadius: DS.radiusSm, background: 'transparent', border: `1px solid ${DS.border}`, color: DS.textSec, cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 11 }}>Pedir análise crítica</button>
                </div>
              </div>
            ))}
          </div>

          {isMobile && <div style={{ height: 72 }} />}
        </div>
      </div>
    );
  }

  // ─── METODOLOGIA ────────────────────────────────────────────────────────
  if (subTela === 'metodologia') {
    const templates = [
      { id: 'PRISMA',  label: 'PRISMA 2020', desc: 'Revisões sistemáticas e meta-análises', cor: DS.blue },
      { id: 'CONSORT', label: 'CONSORT',     desc: 'Ensaios clínicos randomizados', cor: DS.green },
      { id: 'STROBE',  label: 'STROBE',      desc: 'Estudos observacionais (coorte, caso-controle, transversal)', cor: DS.terra },
      { id: 'GRADE',   label: 'GRADE',       desc: 'Qualidade da evidência e força das recomendações', cor: '#7A5CBF' },
      { id: 'RoB2',    label: 'RoB-2',       desc: 'Risco de viés em ensaios clínicos', cor: DS.amber },
    ];

    return (
      <div style={{ flex: 1, overflow: 'auto', background: DS.bg, fontFamily: 'IBM Plex Sans, sans-serif' }}>
        <Header titulo="Apoio metodológico" subtitulo="Guiado pelo Capi · Templates e desenho de estudo" />
        <NavSub />

        <div style={{ padding: isMobile ? '16px' : '24px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <AIDisclaimer text="Apoio metodológico não substitui validação pelo orientador e pelo Comitê de Ética em Pesquisa (CEP). O Capi auxilia no raciocínio, não valida protocolos." />
          <a href="https://etica.unidavi.edu.br" target="_blank" rel="noopener noreferrer" style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: DS.radiusSm, border: `1px solid ${DS.border}`, background: DS.surface, color: DS.blue, fontWeight: 700, fontSize: 12, textDecoration: 'none' }}>
            <span>Abrir o fluxo do CEP — etica.unidavi.edu.br</span><span>↗</span>
          </a>

          <div style={{ ...cardBase, padding: '18px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: DS.blueLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🧫</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: DS.text, marginBottom: 8 }}>Perguntas guiadas — desenho metodológico</div>
              {[
                'Qual é sua pergunta de pesquisa? Você consegue formulá-la no formato PICO?',
                'Seu estudo vai comparar grupos, seguir pessoas no tempo, ou revisar a literatura existente?',
                'Quais são as variáveis desfecho principais? São mensuráveis e definidas operacionalmente?',
              ].map((q, i) => (
                <div key={i} style={{ padding: '10px 14px', background: DS.bg, borderRadius: DS.radiusSm, marginBottom: 8, fontSize: 13, color: DS.textSec, lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 700, color: DS.blue }}>{i + 1}. </span>{q}
                </div>
              ))}
            </div>
          </div>

          <section>
            <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Templates de relato</h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: 10 }}>
              {templates.map(t => (
                <div key={t.id} onClick={() => setMetodTpl(metodTpl === t.id ? null : t.id)}
                  style={{ ...cardBase, padding: '14px', cursor: 'pointer', borderLeft: `3px solid ${t.cor}`, transition: 'box-shadow 0.15s', background: metodTpl === t.id ? t.cor + '08' : DS.surface }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = DS.shadowMd}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = DS.shadow}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: DS.text }}>{t.label}</div>
                    <span style={{ fontSize: 12, color: DS.textMuted }}>{metodTpl === t.id ? '▲' : '▼'}</span>
                  </div>
                  <div style={{ fontSize: 12, color: DS.textSec, marginTop: 4 }}>{t.desc}</div>
                  {metodTpl === t.id && (
                    <div style={{ marginTop: 12, padding: '10px 12px', background: t.cor + '10', borderRadius: DS.radiusSm, fontSize: 12, color: DS.text, lineHeight: 1.6 }}>
                      Template {t.label} disponível para download e preenchimento colaborativo. Inclui checklist de itens obrigatórios, exemplos e notas explicativas por item.
                      <button style={{ marginTop: 8, display: 'block', padding: '6px 14px', borderRadius: DS.radiusSm, background: t.cor, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 11 }}>
                        Usar este template ›
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {isMobile && <div style={{ height: 72 }} />}
        </div>
      </div>
    );
  }

  // ─── REPOSITÓRIO ────────────────────────────────────────────────────────
  if (subTela === 'repositorio') {
    const versoes = [
      { id: 'v3', versao: 'v0.3', titulo: 'Projeto de TCC — HAS no Alto Vale', data: '22/04/2026', status: 'em revisão', comentarios: 2, podePublicar: false, motivo: 'Em revisão pelo orientador — manter privado' },
      { id: 'v2', versao: 'v0.2', titulo: 'Projeto de TCC — HAS no Alto Vale', data: '08/04/2026', status: 'submetido',  comentarios: 0, podePublicar: true,  motivo: null },
      { id: 'v1', versao: 'v0.1', titulo: 'Rascunho inicial',                  data: '20/03/2026', status: 'rascunho',   comentarios: 0, podePublicar: false, motivo: 'Rascunhos não vão para a Vitrine — manter privado' },
    ];

    return (
      <div style={{ flex: 1, overflow: 'auto', background: DS.bg, fontFamily: 'IBM Plex Sans, sans-serif' }}>
        <Header titulo="Repositório de TCC" subtitulo="Versões · visibilidade dual (privada / Vitrine pública)" />
        <NavSub />

        <div style={{ padding: isMobile ? '16px' : '24px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Explicação visibilidade dual */}
          <div style={{ ...cardBase, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start', borderLeft: `3px solid ${DS.blue}` }}>
            <span style={{ fontSize: 18 }}>🔐</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: DS.text, marginBottom: 4 }}>Visibilidade dual</div>
              <div style={{ fontSize: 12, color: DS.textSec, lineHeight: 1.6 }}>
                <strong>Privado</strong> (padrão): só você, orientador e coordenação NPCMed veem.
                <strong style={{ marginLeft: 8 }}>Público</strong>: liberado para a Vitrine institucional após defesa ou aprovação do orientador.
                Trabalhos em construção permanecem privados — nenhum projeto inacabado vai para a Vitrine.
              </div>
            </div>
          </div>

          {/* Versões com toggle de visibilidade */}
          <section>
            <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Versões do projeto</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {versoes.map(v => {
                const pub = visibPub[v.id];
                return (
                  <div key={v.id} style={{ ...cardBase, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: DS.blueLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, color: DS.blue, flexShrink: 0 }}>{v.versao}</div>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: DS.text }}>{v.titulo}</div>
                      <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 3 }}>{v.data}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      {v.comentarios > 0 && (
                        <span style={{ padding: '2px 8px', borderRadius: 100, background: DS.amberLight, color: DS.amber, fontSize: 11, fontWeight: 700 }}>
                          {v.comentarios} comentário{v.comentarios > 1 ? 's' : ''}
                        </span>
                      )}
                      <span style={{ padding: '3px 10px', borderRadius: 100, background: statusColor[v.status] + '18', color: statusColor[v.status], fontSize: 11, fontWeight: 700 }}>{v.status}</span>

                      {/* Toggle visibilidade */}
                      <div title={v.motivo || (pub ? 'Visível na Vitrine' : 'Privado para você, orientador e NPCMed')}
                        onClick={() => v.podePublicar && setVisibPub({ ...visibPub, [v.id]: !pub })}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 6,
                          padding: '4px 10px', borderRadius: 100,
                          background: pub ? DS.green + '18' : DS.bg,
                          border: `1px solid ${pub ? DS.green : DS.border}`,
                          cursor: v.podePublicar ? 'pointer' : 'not-allowed',
                          opacity: v.podePublicar ? 1 : 0.55,
                        }}>
                        <span style={{ fontSize: 12 }}>{pub ? '🌐' : '🔒'}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: pub ? DS.green : DS.textMuted }}>
                          {pub ? 'Público · Vitrine' : 'Privado'}
                        </span>
                      </div>
                    </div>
                    {v.motivo && (
                      <div style={{ width: '100%', fontSize: 11, color: DS.textMuted, fontStyle: 'italic', paddingLeft: 56 }}>
                        ⚠ {v.motivo}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Histórico de orientações</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { data: '22/04/2026', tipo: 'Síncrona (Google Meet)',     duracao: '45 min', pauta: 'Revisão da estratégia de busca e critérios de inclusão/exclusão' },
                { data: '08/04/2026', tipo: 'Assíncrona (comentários)',                       pauta: 'Feedback no v0.2 — ajustes na pergunta PICO e nos objetivos específicos' },
                { data: '20/03/2026', tipo: 'Síncrona (presencial)',     duracao: '60 min', pauta: 'Definição do tema e delineamento preliminar do estudo' },
              ].map((o, i) => (
                <div key={i} style={{ ...cardBase, padding: '14px 16px' }}>
                  <div style={{ fontWeight: 600, fontSize: 12, color: DS.text, marginBottom: 4 }}>{o.data} — {o.tipo}{o.duracao ? ` · ${o.duracao}` : ''}</div>
                  <div style={{ fontSize: 12, color: DS.textSec }}>{o.pauta}</div>
                </div>
              ))}
            </div>
          </section>

          {isMobile && <div style={{ height: 72 }} />}
        </div>
      </div>
    );
  }

  // ─── VITRINE SAM ─────────────────────────────────────────────────────────────
  if (subTela === 'vitrine-sam') {
    return <VitrineSAMScreen isMobile={isMobile} Header={Header} NavSub={NavSub} cardBase={cardBase} />;
  }

  // ─── SUBMISSÃO SAM ─────────────────────────────────────────────────────────────
  if (subTela === 'submissao-sam') {
    return <SubmissaoSAMScreen isMobile={isMobile} Header={Header} NavSub={NavSub} cardBase={cardBase} faseAluno="7" />;
  }

  // ─── NPCMed (com 2 abas: Trajetória do Aluno · Produção da Linha) ───────
  return <NPCMedScreen
    isMobile={isMobile}
    Header={Header}
    NavSub={NavSub}
    cardBase={cardBase}
    linhaOpen={linhaOpen}
    setLinhaOpen={setLinhaOpen}
  />;
}

// ─── NPCMed: subtela com pipeline em duas abas ─────────────────────────────
function NPCMedScreen({ isMobile, Header, NavSub, cardBase, linhaOpen, setLinhaOpen }) {
  const [aba, setAba] = React.useState('trajetoria'); // trajetoria | producao

  // Mock — etapas da Trajetória do Aluno
  const ETAPAS_TRAJETORIA = [
    { id: 'cand',  label: 'Candidatura',           desc: 'Edital semestral · carta de motivação · histórico',                       alunos: 14 },
    { id: 'sele',  label: 'Seleção',               desc: 'Entrevista metodológica + análise de portfólio reflexivo',                alunos: 9 },
    { id: 'vinc',  label: 'Vinculação à linha',    desc: 'Aluno selecionado é alocado à linha de pesquisa e ao orientador',         alunos: 7 },
    { id: 'proj',  label: 'Projeto ativo',         desc: 'Projeto submetido ao CEP · execução com encontros mensais de orientação', alunos: 19 },
    { id: 'prod',  label: 'Produção',              desc: 'Submissão a periódico/evento · co-autoria com orientador · Vitrine',      alunos: 5 },
  ];

  const ALUNOS_AMOSTRA = [
    { nome: 'João Melo',     fase: '5ª fase',  etapa: 'proj', linha: 'cardio', titulo: 'Adesão terapêutica em HAS na atenção primária — Bela Vista' },
    { nome: 'Marina Silva',  fase: '7ª fase',  etapa: 'prod', linha: 'pedi',   titulo: 'Triagem neonatal e seguimento longitudinal no Alto Vale' },
    { nome: 'Pedro Vargas',  fase: '4ª fase',  etapa: 'vinc', linha: 'psiq',   titulo: 'Sintomas depressivos em estudantes de medicina' },
    { nome: 'Ana Beatriz',   fase: '6ª fase',  etapa: 'proj', linha: 'cardio', titulo: 'Risco cardiovascular em populações rurais' },
  ];

  // Mock — produção por linha
  const PRODUCAO_LINHA = [
    {
      id: 'cardio', nome: 'Cardiologia', cor: DS.terra,
      ativos: 4, submissoes: 2, publicacoes: 3,
      itens: [
        { tipo: 'Em execução', titulo: 'Adesão terapêutica em HAS — coorte de 6 UBS', autores: 'João Melo · Profa. Caroline Bacca', status: 'CEP aprovado · coleta em curso' },
        { tipo: 'Em submissão', titulo: 'Risco CV em populações rurais do Alto Vale', autores: 'Ana Beatriz · Prof. Eduardo Stahnke', status: 'submetido · Heart' },
        { tipo: 'Revisão sistemática', titulo: 'Revisão sistemática — adesão terapêutica em HAS', autores: 'Profa. Caroline Bacca', status: 'produção NPCMed · referência a confirmar' },
      ],
    },
    {
      id: 'pedi', nome: 'Pediatria & Perinatologia', cor: DS.blue,
      ativos: 5, submissoes: 1, publicacoes: 4,
      itens: [
        { tipo: 'Em execução', titulo: 'Triagem neonatal — desfechos longitudinais', autores: 'Marina Silva · Prof. Marlou Dalri', status: 'CEP aprovado · análise preliminar' },
        { tipo: 'Publicado',   titulo: 'Aleitamento exclusivo em Rio do Sul',       autores: 'Profa. Samantha Lopes · Prof. Marlou Dalri', status: '2025 · Rev. Paulista de Pediatria' },
      ],
    },
    {
      id: 'psiq', nome: 'Psiquiatria', cor: '#7A5CBF',
      ativos: 3, submissoes: 1, publicacoes: 2,
      itens: [
        { tipo: 'Em execução', titulo: 'Sintomas depressivos em estudantes de medicina', autores: 'Pedro Vargas · Prof. José Eduardo Dagostini', status: 'coleta de dados · 4ª fase' },
        { tipo: 'Em submissão', titulo: 'Suicídio no jovem adulto — revisão de coortes', autores: 'Profa. Mariana Celli', status: 'submetido · Rev. Brasileira de Psiquiatria' },
      ],
    },
  ];

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg, fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <Header titulo="NPCMed" subtitulo="Núcleo de Pesquisa Científica em Medicina — UNIDAVI" />
      <NavSub />

      <div style={{ padding: isMobile ? '16px' : '24px 32px', display: 'flex', flexDirection: 'column', gap: 22 }}>

        {/* Governança operacional */}
        <section>
          <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Governança operacional</h3>
          <div style={{ ...cardBase, padding: '16px' }}>
            <div style={{ fontSize: 12, color: DS.textSec, lineHeight: 1.6, marginBottom: 14 }}>
              Coordenação executiva do núcleo, com função decisória sobre projetos, ética e captação. Três doutoras com formação em pesquisa.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 12 }}>
              {NPCMED_GOVERNANCA.map((g, i) => (
                <div key={i} style={{ padding: '12px 14px', background: DS.bg, borderRadius: DS.radiusSm, border: `1px solid ${DS.border}` }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: DS.text, marginBottom: 3 }}>{g.nome}</div>
                  <div style={{ fontSize: 11, color: DS.blue, fontWeight: 600, marginBottom: 4 }}>{g.papel}</div>
                  <div style={{ fontSize: 11, color: DS.textMuted }}>{g.formacao}</div>
                  <span style={{ display: 'inline-block', marginTop: 8, padding: '2px 8px', borderRadius: 100, background: DS.green + '18', color: DS.green, fontSize: 10, fontWeight: 700 }}>função decisória</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Distinção institucional importante */}
        <div style={{ ...cardBase, padding: '14px 16px', borderLeft: `3px solid ${DS.amber}`, background: DS.amberLight + '40' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: DS.amber, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 4 }}>Distinção institucional</div>
          <div style={{ fontSize: 12, color: DS.textSec, lineHeight: 1.6 }}>
            <strong>Catálogo de orientadores</strong> reúne todos os docentes do curso disponíveis para orientar TC ou Trilha de Excelência. <strong>NPCMed</strong> é núcleo formal de pesquisa, com linhas, governança e produção institucional. Um docente pode orientar TC sem ser membro do NPCMed.
          </div>
        </div>

        {/* Tabs Pipeline */}
        <section>
          <div style={{ display: 'flex', gap: 8, borderBottom: `1px solid ${DS.border}`, marginBottom: 16 }}>
            {[
              { id: 'trajetoria', label: 'Trajetória do aluno' },
              { id: 'producao',   label: 'Produção da linha' },
            ].map(t => {
              const ativo = aba === t.id;
              return (
                <button key={t.id} onClick={() => setAba(t.id)} style={{
                  padding: '10px 16px', background: 'transparent', border: 'none',
                  borderBottom: `2px solid ${ativo ? DS.blue : 'transparent'}`,
                  color: ativo ? DS.blue : DS.textSec,
                  fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 13,
                  cursor: 'pointer', marginBottom: -1,
                }}>{t.label}</button>
              );
            })}
          </div>

          {aba === 'trajetoria' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Pipeline visual em 5 etapas */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)', gap: 8 }}>
                {ETAPAS_TRAJETORIA.map((e, i) => (
                  <div key={e.id} style={{ ...cardBase, padding: '14px', position: 'relative' }}>
                    <div style={{ fontSize: 10, color: DS.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Etapa {i + 1}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: DS.text, marginTop: 2 }}>{e.label}</div>
                    <div style={{ fontSize: 11, color: DS.textSec, marginTop: 6, lineHeight: 1.5 }}>{e.desc}</div>
                    <div style={{ marginTop: 10, padding: '4px 10px', display: 'inline-block', borderRadius: 100, background: DS.blue + '15', color: DS.blue, fontSize: 11, fontWeight: 700 }}>{e.alunos} alunos</div>
                  </div>
                ))}
              </div>

              {/* Tabela de alunos amostra */}
              <div>
                <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Alunos em formação científica · amostra</h3>
                <div style={{ ...cardBase, padding: 0, overflow: 'hidden' }}>
                  {ALUNOS_AMOSTRA.map((a, i) => {
                    const linha = NPCMED_LINHAS.find(l => l.id === a.linha);
                    const etapa = ETAPAS_TRAJETORIA.find(e => e.id === a.etapa);
                    return (
                      <div key={i} style={{ padding: '12px 16px', borderTop: i ? `1px solid ${DS.border}` : 'none', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: 220 }}>
                          <div style={{ fontWeight: 700, fontSize: 13, color: DS.text }}>{a.nome} <span style={{ fontWeight: 400, color: DS.textMuted, fontSize: 11 }}>· {a.fase}</span></div>
                          <div style={{ fontSize: 11, color: DS.textSec, marginTop: 3, lineHeight: 1.5 }}>{a.titulo}</div>
                        </div>
                        <span style={{ padding: '3px 10px', borderRadius: 100, background: linha.cor + '18', color: linha.cor, fontSize: 11, fontWeight: 700 }}>{linha.nome}</span>
                        <span style={{ padding: '3px 10px', borderRadius: 100, background: DS.bg, color: DS.textSec, border: `1px solid ${DS.border}`, fontSize: 11, fontWeight: 700 }}>{etapa.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {aba === 'producao' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {PRODUCAO_LINHA.map(l => (
                <div key={l.id} style={{ ...cardBase, padding: '16px', borderLeft: `3px solid ${l.cor}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: DS.text }}>{l.nome}</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ padding: '3px 10px', borderRadius: 100, background: l.cor + '18', color: l.cor, fontSize: 11, fontWeight: 700 }}>{l.ativos} ativos</span>
                      <span style={{ padding: '3px 10px', borderRadius: 100, background: DS.amber + '18', color: DS.amber, fontSize: 11, fontWeight: 700 }}>{l.submissoes} em submissão</span>
                      <span style={{ padding: '3px 10px', borderRadius: 100, background: DS.green + '18', color: DS.green, fontSize: 11, fontWeight: 700 }}>{l.publicacoes} publicados</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {l.itens.map((it, i) => {
                      const cor = it.tipo === 'Em execução' ? DS.blue : it.tipo === 'Em submissão' ? DS.amber : DS.green;
                      return (
                        <div key={i} style={{ padding: '12px 14px', background: DS.bg, borderRadius: DS.radiusSm, border: `1px solid ${DS.border}` }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                            <div style={{ flex: 1, minWidth: 240 }}>
                              <div style={{ fontWeight: 700, fontSize: 13, color: DS.text, lineHeight: 1.4 }}>{it.titulo}</div>
                              <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 3 }}>{it.autores}</div>
                            </div>
                            <span style={{ padding: '3px 10px', borderRadius: 100, background: cor + '18', color: cor, fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{it.tipo}</span>
                          </div>
                          <div style={{ fontSize: 11, color: DS.textSec, marginTop: 8, fontStyle: 'italic' }}>{it.status}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {isMobile && <div style={{ height: 72 }} />}
      </div>
    </div>
  );
}

Object.assign(window, { ICientificaScreen });
