// =============================================================================
// MED-UNIDAVI · Cobertura do banco — Portaria 478 (mu_mapa_calor_banco)
// Bloco D6 · evolução das telas de banco/curadoria.
//
// Tela única que mostra a cobertura institucional do banco de questões
// segundo a Portaria MEC 478 (ENAMED). Acessível pela Coordenação
// (sub-rota `coord-banco` já existia — passa a apontar para esta tela)
// e via navbar demo do protótipo.
//
// Estruturas:
//   · 15 competências da Portaria 478 (matriz ENAMED · avaliação externa)
//   · 7 áreas (Clínica, Cirurgia, GO, Pediatria, MFC, Saúde Mental, Saúde Coletiva)
//   · 6 cenários (APS, UE, Materno-Infantil, RAPS, Crônicas, Reabilitação)
//
// Não confundir com a Matriz Competência (B1), que opera nas 27 DCN.
// =============================================================================

const ENAMED15 = [
  { n: 1,  titulo: 'Singularidade, equidade e humanização',   curto: 'Singularidade' },
  { n: 2,  titulo: 'Hipóteses diagnósticas e propedêutica',   curto: 'Hipóteses' },
  { n: 3,  titulo: 'Solicitar e interpretar exames',          curto: 'Exames' },
  { n: 4,  titulo: 'Plano terapêutico colaborativo',          curto: 'Terapêutico' },
  { n: 5,  titulo: 'Urgências e emergências',                 curto: 'Urgências' },
  { n: 6,  titulo: 'Procedimentos clínicos e cirúrgicos',     curto: 'Procedimentos' },
  { n: 7,  titulo: 'Intervenções coletivas',                  curto: 'Coletivas' },
  { n: 8,  titulo: 'Educação, promoção e vigilância',         curto: 'Educação' },
  { n: 9,  titulo: 'Operar SUS e redes',                      curto: 'SUS/Redes' },
  { n: 10, titulo: 'Comunicação clara',                       curto: 'Comunicação' },
  { n: 11, titulo: 'Trabalho em equipe',                      curto: 'Equipe' },
  { n: 12, titulo: 'Registro e documentos médicos',           curto: 'Registro' },
  { n: 13, titulo: 'Ética, deontologia e sigilo',             curto: 'Ética' },
  { n: 14, titulo: 'Autorreflexão e educação permanente',     curto: 'Autorreflexão' },
  { n: 15, titulo: 'TIC na prática médica',                   curto: 'TIC' },
];

const ENAMED_AREAS = [
  { id: 'cm',  label: 'Clínica Médica',                         cor: '#1565C0' },
  { id: 'cg',  label: 'Cirurgia Geral',                         cor: '#C0571E' },
  { id: 'go',  label: 'Ginecologia e Obstetrícia',              cor: '#B23A86' },
  { id: 'ped', label: 'Pediatria',                              cor: '#2E7D4F' },
  { id: 'mfc', label: 'Medicina de Família e Comunidade',       cor: '#7A5CBF' },
  { id: 'sm',  label: 'Saúde Mental',                           cor: '#0E727C' },
  { id: 'sc',  label: 'Saúde Coletiva',                         cor: '#8E97B0' },
];

const ENAMED_CENARIOS = [
  { id: 'aps',  label: 'Atenção Primária' },
  { id: 'ue',   label: 'Urgência e Emergência' },
  { id: 'mi',   label: 'Materno-Infantil' },
  { id: 'raps', label: 'Atenção Psicossocial (RAPS)' },
  { id: 'cr',   label: 'Doenças Crônicas' },
  { id: 'reab', label: 'Reabilitação' },
];

// Hash determinístico simples
function _hashCob(s) { let h=0; for (let i=0;i<s.length;i++) h=(h*31+s.charCodeAt(i))|0; return Math.abs(h); }

// Mock — cobertura por (área × competência). Valor = nº de questões no banco
// para aquela célula. Heurística: áreas e competências fortemente correlatas
// têm 30–80, fracamente correlatas têm 0–10. Algumas células zeradas
// intencionalmente para mostrar o alerta.
function _coberturaMock(areaId, n, cenarioFiltro) {
  const seed = `${areaId}:${n}:${cenarioFiltro || 'all'}`;
  const h = _hashCob(seed);
  // Correlações fortes mock
  const fortes = {
    cm:  [2, 3, 4, 9, 10, 12],
    cg:  [3, 5, 6, 12],
    go:  [2, 3, 4, 6, 10],
    ped: [1, 2, 3, 4, 8],
    mfc: [1, 4, 7, 8, 9, 10, 13],
    sm:  [1, 2, 4, 9, 10, 13],
    sc:  [7, 8, 9, 11, 14],
  };
  const forte = (fortes[areaId] || []).includes(n);
  // Gerar valor base
  let v = forte ? 25 + (h % 60) : (h % 13);
  // Pontuação por cenário: cenários "puxam" certas competências
  if (cenarioFiltro && cenarioFiltro !== 'all') {
    const cen = cenarioFiltro;
    const cenarioBoost = {
      aps:  [1, 4, 7, 8, 9, 10],
      ue:   [5, 6, 10, 12],
      mi:   [2, 8, 10, 11],
      raps: [1, 4, 9, 10, 13],
      cr:   [2, 4, 9, 14],
      reab: [4, 7, 11, 14],
    };
    const boost = cenarioBoost[cen] || [];
    if (boost.includes(n) && forte) v = 12 + (h % 30);
    else if (boost.includes(n))     v = (h % 10);
    else                            v = Math.max(0, Math.floor(v / 4));
  }
  // Forçar alguns zeros sinalizadores
  if ((areaId === 'sc' && n === 6) || (areaId === 'cg' && n === 14) || (areaId === 'sm' && n === 6)) v = 0;
  return v;
}

function corCobertura(v) {
  if (v === 0) return '#FBE9E5';
  if (v < 10)  return '#FFE8C7';
  if (v < 25)  return '#F3F0BF';
  if (v < 50)  return '#C8E5C0';
  return '#7BC07A';
}
function corCoberturaText(v) {
  if (v === 0) return DS.terra;
  if (v < 10)  return '#7A5215';
  return DS.text;
}

function CoberturaBancoScreen({ isMobile, onNavigate }) {
  const [cenario, setCenario]   = React.useState('all');
  const [areaFiltro, setAreaFiltro] = React.useState('all');
  const [compFiltro, setCompFiltro] = React.useState('all');

  const areas = areaFiltro === 'all' ? ENAMED_AREAS : ENAMED_AREAS.filter(a => a.id === areaFiltro);
  const comps = compFiltro === 'all' ? ENAMED15     : ENAMED15.filter(c => c.n === parseInt(compFiltro, 10));

  // Cobertura total + zonas zeradas
  let total = 0, zeros = 0, baixas = 0;
  ENAMED_AREAS.forEach(a => ENAMED15.forEach(c => {
    const v = _coberturaMock(a.id, c.n, cenario);
    total += v;
    if (v === 0) zeros++;
    else if (v < 10) baixas++;
  }));
  const totalCelulas = ENAMED_AREAS.length * ENAMED15.length;

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <TopBar
        title="Cobertura do banco · Portaria 478"
        subtitle="7 áreas × 15 competências ENAMED · alerta de cobertura zero"
        isMobile={isMobile}
        breadcrumb={[
          { label: 'Coordenação', onClick: () => onNavigate && onNavigate('coordenacao') },
          { label: 'Saúde do Banco' },
        ]}
      />

      <div style={{ padding: isMobile ? 14 : '24px 32px', display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 1400, margin: '0 auto' }}>

        {/* ── Indicadores ── */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 10 }}>
          {[
            { label: 'Questões mapeadas', val: total.toLocaleString('pt-BR'), cor: DS.blue },
            { label: 'Células zeradas',   val: `${zeros} / ${totalCelulas}`, cor: zeros > 0 ? DS.terra : DS.green, sub: 'cobertura zero · ação prioritária' },
            { label: 'Células baixas',    val: `${baixas} / ${totalCelulas}`, cor: DS.amber, sub: '< 10 questões' },
            { label: 'Cenário ativo',     val: cenario === 'all' ? 'Todos' : ENAMED_CENARIOS.find(c => c.id === cenario).label, cor: DS.terra, sub: 'filtro Portaria 478' },
          ].map((s, i) => (
            <Card key={i} style={{ padding: 12, borderLeft: `3px solid ${s.cor}` }}>
              <div style={{ fontSize: 10.5, fontWeight: 800, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: s.cor, lineHeight: 1.1, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>{s.val}</div>
              {s.sub && <div style={{ fontSize: 10.5, color: DS.textMuted, marginTop: 2 }}>{s.sub}</div>}
            </Card>
          ))}
        </div>

        {/* ── Filtros ── */}
        <Card style={{ padding: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr', gap: 14, alignItems: 'flex-start' }}>
            <CobertFiltroBlock label="Cenário · Portaria 478" valor={cenario} onChange={setCenario}
              opcoes={[{ id: 'all', label: 'Todos os cenários' }, ...ENAMED_CENARIOS]} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14, marginTop: 12 }}>
            <CobertFiltroBlock label="Área" valor={areaFiltro} onChange={setAreaFiltro}
              opcoes={[{ id: 'all', label: 'Todas as 7 áreas' }, ...ENAMED_AREAS]} />
            <CobertFiltroBlock label="Competência (1–15)" valor={compFiltro} onChange={setCompFiltro}
              opcoes={[{ id: 'all', label: 'Todas as 15' }, ...ENAMED15.map(c => ({ id: String(c.n), label: `C${String(c.n).padStart(2,'0')} · ${c.curto}` }))]} />
          </div>
        </Card>

        {/* ── Mapa de calor ── */}
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${DS.border}`, background: DS.bg, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <SectionHeading style={{ margin: 0 }}>Mapa de calor 7 × 15</SectionHeading>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 10.5, color: DS.textMuted }}>menos</span>
              {[0, 5, 15, 30, 60].map(v => (
                <div key={v} title={`${v}+ questões`} style={{
                  width: 18, height: 14, borderRadius: 3,
                  background: corCobertura(v), border: `1px solid ${DS.border}`,
                }} />
              ))}
              <span style={{ fontSize: 10.5, color: DS.textMuted }}>mais</span>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'separate', borderSpacing: 2, padding: 12, fontFamily: 'IBM Plex Sans, sans-serif' }}>
              <thead>
                <tr>
                  <th style={{ padding: '6px 10px', position: 'sticky', left: 0, background: DS.surface, textAlign: 'left' }}></th>
                  {comps.map(c => (
                    <th key={c.n} title={c.titulo} style={{ padding: '6px 4px', fontSize: 10, color: DS.textMuted, fontWeight: 800, minWidth: 50, textAlign: 'center' }}>
                      C{String(c.n).padStart(2,'0')}
                    </th>
                  ))}
                  <th style={{ padding: '6px 10px', fontSize: 10, color: DS.textMuted, fontWeight: 800, textAlign: 'right' }}>Σ</th>
                </tr>
              </thead>
              <tbody>
                {areas.map(a => {
                  const linhaSoma = comps.reduce((s, c) => s + _coberturaMock(a.id, c.n, cenario), 0);
                  return (
                    <tr key={a.id}>
                      <td style={{ padding: '4px 10px', position: 'sticky', left: 0, background: DS.surface, fontSize: 11, fontWeight: 700, color: DS.text, whiteSpace: 'nowrap', borderLeft: `3px solid ${a.cor}` }}>
                        {a.label}
                      </td>
                      {comps.map(c => {
                        const v = _coberturaMock(a.id, c.n, cenario);
                        return (
                          <td key={c.n}>
                            <div title={`${a.label} × C${String(c.n).padStart(2,'0')} · ${c.titulo}\n${v} ${v === 1 ? 'questão' : 'questões'}`} style={{
                              minWidth: 46, height: 28, borderRadius: 4,
                              background: corCobertura(v),
                              color: corCoberturaText(v),
                              border: v === 0 ? `1.5px dashed ${DS.terra}` : `1px solid rgba(0,0,0,0.04)`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 11, fontWeight: 700, fontVariantNumeric: 'tabular-nums',
                              cursor: 'help',
                            }}>
                              {v === 0 ? '0' : v}
                            </div>
                          </td>
                        );
                      })}
                      <td style={{ padding: '4px 10px', textAlign: 'right', fontSize: 11.5, fontWeight: 800, color: DS.text, fontVariantNumeric: 'tabular-nums' }}>{linhaSoma}</td>
                    </tr>
                  );
                })}
                {/* Linha de soma por competência */}
                <tr>
                  <td style={{ padding: '8px 10px', position: 'sticky', left: 0, background: DS.bg, fontSize: 10, fontWeight: 800, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Σ por competência</td>
                  {comps.map(c => {
                    const colSoma = areas.reduce((s, a) => s + _coberturaMock(a.id, c.n, cenario), 0);
                    return (
                      <td key={c.n} style={{ padding: '6px 4px', textAlign: 'center', fontSize: 11, fontWeight: 800, color: DS.text, fontVariantNumeric: 'tabular-nums', background: DS.bg, borderTop: `1px solid ${DS.border}` }}>
                        {colSoma}
                      </td>
                    );
                  })}
                  <td style={{ background: DS.bg, borderTop: `1px solid ${DS.border}` }} />
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ padding: '10px 16px', borderTop: `1px solid ${DS.border}`, fontSize: 10.5, color: DS.textMuted, lineHeight: 1.6 }}>
            <strong>Borda tracejada vermelha</strong> = cobertura zero (ação prioritária). Passe o mouse sobre cada célula para nome completo e contagem. Filtre por cenário para ver
            a cobertura específica daquele recorte da Portaria 478.
          </div>
        </Card>

        {/* ── Alertas: top zeros ── */}
        {zeros > 0 && (
          <Card style={{ padding: 14, borderLeft: `3px solid ${DS.terra}` }}>
            <SectionHeading>Células sem cobertura · ação prioritária</SectionHeading>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: 8, marginTop: 6 }}>
              {ENAMED_AREAS.flatMap(a => ENAMED15.map(c => {
                const v = _coberturaMock(a.id, c.n, cenario);
                return v === 0 ? { a, c } : null;
              })).filter(Boolean).slice(0, 6).map(({ a, c }, i) => (
                <div key={i} style={{
                  padding: '10px 12px', borderRadius: DS.radiusSm,
                  background: DS.terraLight, border: `1px solid ${DS.terra}30`,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8,
                }}>
                  <div>
                    <div style={{ fontSize: 11.5, fontWeight: 800, color: DS.text }}>{a.label}</div>
                    <div style={{ fontSize: 11, color: DS.textSec, marginTop: 2 }}>
                      C{String(c.n).padStart(2,'0')} · {c.curto}
                    </div>
                  </div>
                  <button style={{
                    padding: '6px 10px', borderRadius: DS.radiusSm,
                    background: DS.terra, color: '#fff', border: 'none', cursor: 'pointer',
                    fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 800, fontSize: 10.5, whiteSpace: 'nowrap',
                  }}>Pautar produção ›</button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Rodapé */}
        <div style={{
          padding: '12px 16px', background: `${DS.blueAcc}08`, borderRadius: 8,
          fontSize: 11, color: DS.textMuted, lineHeight: 1.6, textAlign: 'center',
        }}>
          Cobertura do banco · Portaria MEC 478 · 15 competências ENAMED · 7 áreas · 6 cenários · 21 conteúdos<br />
          Distinto da Matriz Competência (B1), que opera nas 27 DCN da formação.
        </div>

        {isMobile && <div style={{ height: 60 }} />}
      </div>
    </div>
  );
}

function CobertFiltroBlock({ label, valor, onChange, opcoes }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 800, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>{label}</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {opcoes.map(opt => {
          const ativo = String(valor) === String(opt.id);
          return (
            <button key={String(opt.id)} onClick={() => onChange(opt.id)} style={{
              padding: '6px 11px', borderRadius: DS.radiusSm,
              background: ativo ? DS.blueDark : DS.surface,
              color: ativo ? '#fff' : DS.textDark,
              border: `1px solid ${ativo ? DS.blueDark : DS.border}`,
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 11, cursor: 'pointer',
            }}>{opt.label}</button>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, {
  CoberturaBancoScreen, ENAMED15, ENAMED_AREAS, ENAMED_CENARIOS,
});
