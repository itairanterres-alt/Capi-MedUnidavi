// MED-UNIDAVI 2027 — Aba Eventos (ITEM 10)

const CATEGORIAS_EVENTO = {
  'científico':   { label: 'Evento Científico',       color: DS.blue,     icon: '🔬' },
  'externo':      { label: 'Evento Externo',           color: '#7A5CBF',   icon: '🌐' },
  'avaliacao':    { label: 'Avaliação',                color: DS.terra,    icon: '📊' },
  'institucional':{ label: 'Reunião Institucional',   color: DS.green,    icon: '🏛' },
  'extensao':     { label: 'Extensão / Liga',         color: DS.amber,    icon: '🤝' },
  'orientacao':   { label: 'Orientação TC',           color: '#1A6E8A',   icon: '🎓' },
};

const EVENTOS_MOCK = [
  { id: 1,  titulo: 'XVI CIEPE — Congresso Integrado de Ensino, Pesquisa e Extensão UNIDAVI', categoria: 'científico',    data: '2026-05-20', hora: '08:00', local: 'Campus UNIDAVI (local a confirmar)', responsavel: 'Pró-Reitoria de Pesquisa · ciepe@unidavi.edu.br', inscricao: '#', material: { pre: 'Programação científica disponível 15 dias antes · 20–21/05/2026 · 15 cadernos de área', pos: null }, feedback: '' },
  { id: 2,  titulo: 'Jornada de Medicina UNIDAVI — 10ª edição', categoria: 'científico',    data: '2026-05-09', hora: '08:00', local: 'Auditório Central UNIDAVI', responsavel: 'Centro Acadêmico de Medicina', inscricao: '#', material: { pre: 'Programação disponível no site UNIDAVI', pos: null }, feedback: '' },
  { id: 3,  titulo: 'Jornada Catarinense de Medicina de Família — SBMFC/SC', categoria: 'externo',      data: '2026-05-15', hora: '09:00', local: 'Florianópolis, SC (presencial + transmissão)', responsavel: 'SBMFC Regional SC', inscricao: '#', material: { pre: 'Programa científico (PDF)', pos: null }, feedback: '' },
  { id: 4,  titulo: 'Simulado ENAMED Medicina — 30 questões', categoria: 'avaliacao',    data: '2026-05-15', hora: '08:00', local: 'Sala de informática 2 — Bloco B', responsavel: 'CPA / Coordenação do Curso', inscricao: '#', material: { pre: 'Revisão por área recomendada (ver Banco de Questões)', pos: null }, feedback: '' },
  { id: 5,  titulo: 'COBEM 2026 — Congresso Brasileiro de Educação Médica', categoria: 'externo',      data: '2026-05-18', hora: '08:00', local: 'São Paulo, SP', responsavel: 'ABEM', inscricao: '#', material: { pre: 'Programa disponível em abem.org.br', pos: null }, feedback: '' },
  { id: 6,  titulo: 'Reunião NDE — PPC 2023 vigente · Adequação DCN 2025 em discussão', categoria: 'institucional', data: '2026-04-30', hora: '17:00', local: 'Sala de Reuniões 301 — Bloco A', responsavel: 'Profa. Adriana Thives (docente convidada NDE)', inscricao: null, material: { pre: 'Ata da reunião anterior (consultar secretaria)', pos: null }, feedback: '' },
  { id: 7,  titulo: 'Liga de Clínica Médica UNIDAVI — Sessão Clínica Mensal', categoria: 'extensao',    data: '2026-04-29', hora: '19:00', local: 'Sala de Tutorial 2', responsavel: 'Liga de Clínica Médica (preceptor responsável a confirmar)', inscricao: '#', material: { pre: 'Caso clínico prévio enviado por e-mail', pos: null }, feedback: '' },
  { id: 8,  titulo: 'Checkpoint UC — Morfofuncional III (OSCE de fim de UC)', categoria: 'avaliacao',    data: '2026-05-19', hora: '08:00', local: 'Laboratório de Habilidades', responsavel: 'Profa. Paola Lima (responsável Morfofuncional)', inscricao: '#', material: { pre: 'Lista de estações disponível 72h antes', pos: null }, feedback: '' },
  { id: 9,  titulo: 'Reunião de orientação de TC — Turma 2024', categoria: 'orientacao',   data: '2026-05-06', hora: '14:00', local: 'Sala 304 / Google Meet (link enviado por e-mail)', responsavel: 'Comitê de TCC', inscricao: null, material: { pre: 'Cronograma de TC (ver portal do aluno)', pos: null }, feedback: '' },
  { id: 10, escopo: 'curricular', titulo: 'Teste de Progresso — 2026.1 (aplicação presencial)', categoria: 'avaliacao',    data: '2026-05-22', hora: '08:00', local: 'Bloco D — todas as salas (conforme escala)', responsavel: 'Coordenação do Curso', inscricao: '#', material: { pre: 'Nenhum material prévio divulgado (avaliação longitudinal)', pos: null }, feedback: '' },
  { id: 11, escopo: 'curricular', titulo: 'Liga de Urgência e Emergência — Simulação ACLS', categoria: 'extensao',    data: '2026-05-08', hora: '13:00', local: 'Laboratório de Simulação — Bloco C', responsavel: 'Liga UE — Prof. Eduardo Beduschi Voelz (docente convidado)', inscricao: '#', material: { pre: 'Algoritmos ACLS 2020 (AHA)', pos: null }, feedback: '' },
  { id: 12, escopo: 'curricular', titulo: 'Reunião Ampliada de Colegiado — Docentes e Discentes', categoria: 'institucional', data: '2026-05-13', hora: '17:30', local: 'Auditório Central UNIDAVI', responsavel: 'Coordenação do Curso de Medicina', inscricao: null, material: { pre: 'Pauta disponível no portal institucional', pos: null }, feedback: '' },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatDataBR(dataStr) {
  const [a, m, d] = dataStr.split('-');
  return `${d}/${m}/${a}`;
}
function diaSemana(dataStr) {
  const dias = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
  return dias[new Date(dataStr + 'T12:00:00').getDay()];
}

// ── Calendário Mensal ─────────────────────────────────────────────────────────
function CalendarioMensal({ eventos, categoriasFiltro, onSelectEvento }) {
  const ANO = 2026, MES = 4; // abril 2026 (0-indexed)
  const diasNoMes = new Date(ANO, MES + 1, 0).getDate();
  const primeiroDia = new Date(ANO, MES, 1).getDay();
  const hoje = 26; // 26 de abril de 2026

  const eventosPorDia = {};
  eventos.forEach(ev => {
    const dia = parseInt(ev.data.split('-')[2]);
    const mes = parseInt(ev.data.split('-')[1]) - 1;
    if (mes === MES) {
      if (!eventosPorDia[dia]) eventosPorDia[dia] = [];
      eventosPorDia[dia].push(ev);
    }
  });

  const dias = [];
  for (let i = 0; i < primeiroDia; i++) dias.push(null);
  for (let d = 1; d <= diasNoMes; d++) dias.push(d);

  return (
    <div style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, overflow: 'hidden', boxShadow: DS.shadow }}>
      {/* Header */}
      <div style={{ padding: '14px 18px', borderBottom: `1px solid ${DS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 800, fontSize: 15, color: DS.text }}>Abril 2026</span>
        <div style={{ display: 'flex', gap: 6 }}>
          <button style={{ padding: '4px 10px', borderRadius: 6, border: `1px solid ${DS.border}`, background: 'none', cursor: 'pointer', color: DS.textMuted, fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12 }}>← Mar</button>
          <button style={{ padding: '4px 10px', borderRadius: 6, border: `1px solid ${DS.border}`, background: 'none', cursor: 'pointer', color: DS.textMuted, fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12 }}>Mai →</button>
        </div>
      </div>
      {/* Dias da semana */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', background: DS.bg }}>
        {['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'].map(d => (
          <div key={d} style={{ padding: '6px 0', textAlign: 'center', fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{d}</div>
        ))}
      </div>
      {/* Células */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 0 }}>
        {dias.map((dia, i) => {
          const evsDia = dia ? (eventosPorDia[dia] || []).filter(ev => !categoriasFiltro.length || categoriasFiltro.includes(ev.categoria)) : [];
          const isHoje = dia === hoje;
          return (
            <div key={i} style={{ minHeight: 72, padding: '5px 6px', borderRight: `1px solid ${DS.borderLight}`, borderBottom: `1px solid ${DS.borderLight}`, background: isHoje ? DS.blueLight : 'transparent' }}>
              {dia && (
                <>
                  <div style={{ fontSize: 12, fontWeight: isHoje ? 800 : 400, color: isHoje ? DS.blue : DS.text, marginBottom: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: '50%', background: isHoje ? DS.blue : 'transparent', color: isHoje ? '#fff' : DS.text }}>{dia}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {evsDia.slice(0, 2).map(ev => {
                      const cat = CATEGORIAS_EVENTO[ev.categoria];
                      return (
                        <div key={ev.id} onClick={() => onSelectEvento(ev)} style={{ padding: '2px 5px', borderRadius: 3, background: cat.color + '20', borderLeft: `2px solid ${cat.color}`, cursor: 'pointer', fontSize: 9, fontWeight: 600, color: cat.color, lineHeight: 1.3, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                          {ev.titulo}
                        </div>
                      );
                    })}
                    {evsDia.length > 2 && <div style={{ fontSize: 9, color: DS.textMuted, paddingLeft: 5 }}>+{evsDia.length - 2} mais</div>}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Lista de eventos (view semanal) ──────────────────────────────────────────
function ListaEventos({ eventos, categoriasFiltro, onSelectEvento }) {
  const filtrados = eventos.filter(ev => !categoriasFiltro.length || categoriasFiltro.includes(ev.categoria))
    .sort((a, b) => a.data.localeCompare(b.data));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {filtrados.map(ev => {
        const cat = CATEGORIAS_EVENTO[ev.categoria];
        return (
          <div
            key={ev.id}
            onClick={() => onSelectEvento(ev)}
            style={{ background: DS.surface, borderRadius: DS.radius, border: `1px solid ${DS.border}`, padding: '12px 16px', cursor: 'pointer', display: 'flex', gap: 14, alignItems: 'flex-start', boxShadow: DS.shadow, borderLeft: `3px solid ${cat.color}`, transition: 'box-shadow 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = DS.shadowMd}
            onMouseLeave={e => e.currentTarget.style.boxShadow = DS.shadow}
          >
            <div style={{ width: 44, height: 44, borderRadius: 10, background: cat.color + '18', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: 16 }}>{cat.icon}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: DS.text, marginBottom: 3, lineHeight: 1.3 }}>{ev.titulo}</div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', fontSize: 11, color: DS.textMuted }}>
                <span>📅 {diaSemana(ev.data)}, {formatDataBR(ev.data)}</span>
                <span>🕐 {ev.hora}</span>
                <span>📍 {ev.local.length > 40 ? ev.local.slice(0, 40) + '…' : ev.local}</span>
              </div>
            </div>
            <Badge color={cat.color}>{cat.label}</Badge>
          </div>
        );
      })}
      {filtrados.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 24px', color: DS.textMuted, fontSize: 13 }}>
          Nenhum evento para os filtros selecionados.
        </div>
      )}
    </div>
  );
}

// ── Detalhe do evento ─────────────────────────────────────────────────────────
function EventoDetalhe({ evento, onVoltar }) {
  const [feedback, setFeedback] = React.useState('');
  const [feedbackEnviado, setFeedbackEnviado] = React.useState(false);
  const cat = CATEGORIAS_EVENTO[evento.categoria];
  const passado = new Date(evento.data) < new Date('2026-04-26');

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <div style={{ padding: '16px 28px', background: DS.surface, borderBottom: `1px solid ${DS.border}`, display: 'flex', gap: 12, alignItems: 'center' }}>
        <button onClick={onVoltar} style={{ background: 'none', border: 'none', cursor: 'pointer', color: DS.blue, fontWeight: 700, fontSize: 13, fontFamily: 'IBM Plex Sans, sans-serif', padding: 0 }}>← Eventos</button>
      </div>

      <div style={{ padding: '24px 32px', maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Header */}
        <div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 24 }}>{cat.icon}</span>
            <Badge color={cat.color}>{cat.label}</Badge>
            {passado && <Badge color={DS.textMuted}>Realizado</Badge>}
          </div>
          <h1 style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 800, color: DS.text, lineHeight: 1.3 }}>{evento.titulo}</h1>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: 'Data', valor: `${diaSemana(evento.data)}, ${formatDataBR(evento.data)}` },
              { label: 'Horário', valor: evento.hora },
              { label: 'Local', valor: evento.local },
              { label: 'Responsável', valor: evento.responsavel },
            ].map(m => (
              <div key={m.label} style={{ background: DS.surface, borderRadius: DS.radiusSm, padding: '10px 14px', border: `1px solid ${DS.border}` }}>
                <div style={{ fontSize: 10, color: DS.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>{m.label}</div>
                <div style={{ fontSize: 13, color: DS.text, fontWeight: 500 }}>{m.valor}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Inscrição */}
        {evento.inscricao && !passado && (
          <Card style={{ padding: '14px 18px', borderLeft: `3px solid ${cat.color}` }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: DS.text, marginBottom: 6 }}>Inscrição</div>
            <Btn variant="primary" size="sm">Acessar formulário de inscrição ↗</Btn>
          </Card>
        )}

        {/* Material */}
        {evento.material.pre && (
          <Card style={{ padding: '14px 18px' }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: DS.text, marginBottom: 8 }}>Material associado</div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 12px', background: DS.bg, borderRadius: DS.radiusSm, border: `1px solid ${DS.border}` }}>
              <span style={{ fontSize: 16 }}>📄</span>
              <span style={{ fontSize: 13, color: DS.textSec, flex: 1 }}>{evento.material.pre}</span>
              {!passado ? <Badge color={DS.amber}>Pré-evento</Badge> : <Badge color={DS.green}>Disponível</Badge>}
            </div>
            {evento.material.pos && (
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 12px', background: DS.bg, borderRadius: DS.radiusSm, border: `1px solid ${DS.border}`, marginTop: 8 }}>
                <span style={{ fontSize: 16 }}>🎥</span>
                <span style={{ fontSize: 13, color: DS.textSec, flex: 1 }}>{evento.material.pos}</span>
                <Badge color={DS.green}>Pós-evento</Badge>
              </div>
            )}
          </Card>
        )}

        {/* Feedback pós-evento */}
        {passado && (
          <Card style={{ padding: '14px 18px' }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: DS.text, marginBottom: 8 }}>Feedback pós-evento</div>
            {feedbackEnviado ? (
              <div style={{ padding: '12px 14px', background: DS.greenLight, borderRadius: DS.radius, fontSize: 13, color: DS.green, fontWeight: 600 }}>
                ✓ Feedback enviado. Obrigado pela avaliação!
              </div>
            ) : (
              <>
                <textarea
                  value={feedback} onChange={e => setFeedback(e.target.value)}
                  placeholder="Como foi sua experiência neste evento? O que poderia melhorar?"
                  rows={4}
                  style={{ width: '100%', padding: '10px 12px', border: `1.5px solid ${DS.border}`, borderRadius: DS.radius, fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13, color: DS.text, resize: 'vertical', outline: 'none', boxSizing: 'border-box', marginBottom: 10 }}
                />
                <Btn variant="primary" size="sm" onClick={() => feedback.trim() && setFeedbackEnviado(true)}>Enviar feedback</Btn>
              </>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}

// ── Orquestrador ──────────────────────────────────────────────────────────────
function EventosScreen({ isMobile }) {
  const [view, setView] = React.useState('calendario');
  const [modoVisualizacao, setModoVisualizacao] = React.useState('mensal');
  const [categoriasFiltro, setCategoriasFiltro] = React.useState([]);
  const [escopo, setEscopo] = React.useState('curricular'); // 'curricular' | 'institucional'
  const [eventoSelecionado, setEventoSelecionado] = React.useState(null);

  if (eventoSelecionado) {
    return <EventoDetalhe evento={eventoSelecionado} onVoltar={() => setEventoSelecionado(null)} />;
  }

  const toggleCategoria = (cat) => {
    setCategoriasFiltro(p => p.includes(cat) ? p.filter(c => c !== cat) : [...p, cat]);
  };

  const eventosEscopo = EVENTOS_MOCK.filter(ev => ev.escopo === escopo);

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <TopBar title="Eventos" subtitle="Agenda científica, avaliações e atividades institucionais" isMobile={isMobile} />

      <div style={{ padding: isMobile ? '14px' : '20px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Toggle Curriculares / Institucionais */}
        <div style={{ display: 'flex', gap: 0, background: DS.surface, border: `1px solid ${DS.border}`, borderRadius: DS.radius, padding: 4, alignSelf: 'flex-start' }}>
          {[
            { id: 'curricular', label: 'Eventos Curriculares', sub: 'TBL · CBL · OSCE · APCs · Liga · NDE' },
            { id: 'institucional', label: 'Eventos Institucionais', sub: 'CIEPE · COBEM · Mentor Web' },
          ].map(e => (
            <button key={e.id} onClick={() => setEscopo(e.id)} title={e.sub} style={{
              padding: '8px 14px', border: 'none', borderRadius: DS.radiusSm,
              background: escopo === e.id ? DS.blue : 'transparent',
              color: escopo === e.id ? '#fff' : DS.textSec,
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 12, cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1,
            }}>
              <span>{e.label}</span>
              <span style={{ fontSize: 10, fontWeight: 500, opacity: 0.85 }}>{e.sub}</span>
            </button>
          ))}
          {escopo === 'institucional' && (
            <a href="#" target="_blank" rel="noopener noreferrer" style={{
              alignSelf: 'center', marginLeft: 8, padding: '6px 12px', borderRadius: DS.radiusSm,
              background: DS.terra, color: '#fff', textDecoration: 'none',
              fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              <span>Ver no Mentor Web</span><span>↗</span>
            </a>
          )}
        </div>

        {/* Controles */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Toggle visualização */}
          <div style={{ display: 'flex', gap: 0, border: `1px solid ${DS.border}`, borderRadius: DS.radius, overflow: 'hidden' }}>
            {[{ id: 'mensal', label: 'Mês' }, { id: 'lista', label: 'Lista' }].map(v => (
              <button key={v.id} onClick={() => setModoVisualizacao(v.id)} style={{
                padding: '7px 16px', border: 'none', background: modoVisualizacao === v.id ? DS.blue : DS.surface,
                color: modoVisualizacao === v.id ? '#fff' : DS.textSec,
                fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 12, cursor: 'pointer',
              }}>{v.label}</button>
            ))}
          </div>
          {/* Filtros de categoria */}
          {Object.entries(CATEGORIAS_EVENTO).map(([id, cat]) => (
            <button key={id} onClick={() => toggleCategoria(id)} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '5px 12px', borderRadius: 100,
              border: `1.5px solid ${categoriasFiltro.includes(id) ? cat.color : DS.border}`,
              background: categoriasFiltro.includes(id) ? cat.color + '18' : DS.surface,
              color: categoriasFiltro.includes(id) ? cat.color : DS.textSec,
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 11, cursor: 'pointer',
            }}>
              <span>{cat.icon}</span>
              <span>{cat.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Próximos eventos — destaque */}
        {modoVisualizacao === 'mensal' && (
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
            {eventosEscopo.filter(ev => ev.data >= '2026-04-26').slice(0, 4).map(ev => {
              const cat = CATEGORIAS_EVENTO[ev.categoria];
              return (
                <div key={ev.id} onClick={() => setEventoSelecionado(ev)} style={{ flexShrink: 0, width: 200, background: DS.surface, borderRadius: DS.radius, border: `1px solid ${DS.border}`, padding: '12px 14px', cursor: 'pointer', borderTop: `3px solid ${cat.color}`, boxShadow: DS.shadow, transition: 'box-shadow 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = DS.shadowMd}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = DS.shadow}
                >
                  <div style={{ fontSize: 10, color: cat.color, fontWeight: 700, marginBottom: 3 }}>{cat.icon} {formatDataBR(ev.data)} · {ev.hora}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: DS.text, lineHeight: 1.4 }}>{ev.titulo.length > 55 ? ev.titulo.slice(0, 55) + '…' : ev.titulo}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Calendário ou lista */}
        {modoVisualizacao === 'mensal' ? (
          <CalendarioMensal eventos={eventosEscopo} categoriasFiltro={categoriasFiltro} onSelectEvento={setEventoSelecionado} />
        ) : (
          <ListaEventos eventos={eventosEscopo} categoriasFiltro={categoriasFiltro} onSelectEvento={setEventoSelecionado} />
        )}

        {isMobile && <div style={{ height: 60 }} />}
      </div>
    </div>
  );
}

Object.assign(window, { EventosScreen, CATEGORIAS_EVENTO, EVENTOS_MOCK });
