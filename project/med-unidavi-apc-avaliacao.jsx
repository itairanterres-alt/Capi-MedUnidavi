// =============================================================================
// MED-UNIDAVI · APC — Tela transacional do preceptor (F2)
// O ato de avaliação que alimenta o eixo Y (proficiência APC) da Matriz
// Competência. Rota: doc-aval (sidebar Docente · "Avaliações Pendentes").
//
// Modelo:
//   APC (Atividade Profissional Confiabilizadora) — escala Dreyfus 1–5.
//   APC ≠ Logbook (procedimental → Ten Cate 1–4). Não confundir.
//
// Fluxo:
//   1) Lista de APCs pendentes (alunos · EPA · prazo)
//   2) Modo de avaliação: Dreyfus 1–5 + comentários + evidências + mapping
//      para 1+ competências DCN 2025.
//   3) Salvar rascunho / Submeter ao aluno (com captura de evento).
// =============================================================================

// ── Dreyfus 1–5 (canônico) ───────────────────────────────────────────────────
const DREYFUS = [
  { n: 1, label: 'Novato',              cor: '#B23A2A', desc: 'Conhecimento teórico, depende totalmente de supervisão direta. Segue regras explícitas.' },
  { n: 2, label: 'Iniciante avançado',  cor: '#D97757', desc: 'Reconhece padrões básicos com supervisão. Identifica situações similares mas não generaliza.' },
  { n: 3, label: 'Competente',          cor: '#B97A0F', desc: 'Executa tarefa rotineira sob supervisão indireta. Prioriza ações com critério próprio.' },
  { n: 4, label: 'Proficiente',         cor: '#1565C0', desc: 'Atua de forma autônoma em situações habituais. Reconhece o desvio do padrão e age.' },
  { n: 5, label: 'Perito',              cor: '#2E7D4F', desc: 'Atua com fluidez em situações complexas. Supervisiona e ensina pares.' },
];

// ── APCs pendentes (mock) ────────────────────────────────────────────────────
const APC_PENDENTES = [
  {
    id: 'apc-001',
    aluno: { id: 'joao-melo', nome: 'João Melo',    turma: 'T14', fase: '5ª' },
    epa: 'EPA-2 · Anamnese clínica estruturada',
    cenario: 'Ambulatório de Clínica Médica · UBS Bela Vista',
    data: '14/05/2026',
    competencias: ['dcn2025_comp_02', 'dcn2025_comp_03', 'dcn2025_comp_16'],
    prazo: '21/05/2026',
    preceptor: 'Dr. Alves',
  },
  {
    id: 'apc-002',
    aluno: { id: 'ana-lima', nome: 'Ana Lima',      turma: 'T16', fase: '3ª' },
    epa: 'EPA-3 · Exame físico geral',
    cenario: 'Habilidades Clínicas · Lab. Sim',
    data: '13/05/2026',
    competencias: ['dcn2025_comp_02'],
    prazo: '20/05/2026',
    preceptor: 'Profa. Talita',
  },
  {
    id: 'apc-003',
    aluno: { id: 'carlos-sousa', nome: 'Carlos Sousa', turma: 'T16', fase: '3ª' },
    epa: 'EPA-2 · Anamnese clínica estruturada',
    cenario: 'IESC · USF Bela Vista (visita domiciliar)',
    data: '12/05/2026',
    competencias: ['dcn2025_comp_02', 'dcn2025_comp_13'],
    prazo: '19/05/2026',
    preceptor: 'Profa. Andreia',
  },
  {
    id: 'apc-004',
    aluno: { id: 'fernanda-reis', nome: 'Fernanda Reis', turma: 'T14', fase: '5ª' },
    epa: 'EPA-4 · Plano diagnóstico inicial',
    cenario: 'Ambulatório de Pediatria · Hospital de Rio do Sul',
    data: '12/05/2026',
    competencias: ['dcn2025_comp_03', 'dcn2025_comp_04', 'dcn2025_comp_11'],
    prazo: '19/05/2026',
    preceptor: 'Dr. Marlou',
  },
];

// ── Helpers ─────────────────────────────────────────────────────────────────
function _dreyfusInfo(n) { return DREYFUS.find(d => d.n === n) || DREYFUS[0]; }
function _compByIds(ids) { return DCN27.filter(c => ids.includes(c.id)); }

// ── Tela principal ──────────────────────────────────────────────────────────
function APCAvaliacaoScreen({ isMobile, onNavigate }) {
  const [apcAberta, setApcAberta] = React.useState(null);

  if (apcAberta) {
    return <APCFormulario
      apc={apcAberta}
      isMobile={isMobile}
      onSalvar={() => { alert('Rascunho salvo (mock).'); }}
      onSubmeter={() => { alert('APC submetida ao aluno (mock). Evento institucional registrado.'); setApcAberta(null); }}
      onVoltar={() => setApcAberta(null)}
      onNavegarDashboard={() => onNavigate && onNavigate('docente')}
    />;
  }

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <TopBar
        title="Avaliações pendentes · APCs"
        subtitle={`${APC_PENDENTES.length} APCs aguardando registro · Dreyfus 1–5 · curadoria docente obrigatória`}
        isMobile={isMobile}
        breadcrumb={[
          { label: 'Painel do Tutor', onClick: () => onNavigate && onNavigate('docente') },
          { label: 'Avaliações Pendentes' },
        ]}
      />

      <div style={{ padding: isMobile ? 14 : '24px 32px', display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 1100, margin: '0 auto' }}>

        {/* Disclaimer institucional */}
        <div style={{
          padding: '12px 14px', background: DS.blueLight, borderRadius: DS.radiusSm,
          border: `1px solid ${DS.blueAcc}40`,
          fontSize: 12, color: DS.textDark, lineHeight: 1.55,
        }}>
          <strong>APC × Logbook — escalas distintas.</strong>{' '}
          APC (Atividade Profissional Confiabilizadora) usa <strong>Dreyfus 1–5</strong> em observação estruturada.
          Logbook procedimental usa <strong>Ten Cate 1–4</strong>. Não confundir. Toda avaliação alimenta o
          eixo Y (proficiência) da Matriz Competência e a barra de progressão da competência no Perfil do Aluno.
        </div>

        {/* Lista */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(360px, 1fr))', gap: 12 }}>
          {APC_PENDENTES.map(apc => (
            <APCCardPendente key={apc.id} apc={apc} isMobile={isMobile} onAbrir={() => setApcAberta(apc)} />
          ))}
        </div>

        {isMobile && <div style={{ height: 60 }} />}
      </div>
    </div>
  );
}

// ── Card de pendência ───────────────────────────────────────────────────────
function APCCardPendente({ apc, onAbrir }) {
  const comps = _compByIds(apc.competencias);
  return (
    <button onClick={onAbrir} style={{
      textAlign: 'left', padding: 14, borderRadius: DS.radius,
      background: DS.surface, border: `1px solid ${DS.border}`,
      borderLeft: `3px solid ${DS.terra}`, cursor: 'pointer',
      fontFamily: 'IBM Plex Sans, sans-serif',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 800, color: DS.text }}>{apc.aluno.nome}</span>
        <span style={{ fontSize: 10.5, color: DS.textMuted, fontWeight: 600 }}>{apc.aluno.turma} · {apc.aluno.fase}</span>
      </div>
      <div style={{ fontSize: 12.5, color: DS.terra, fontWeight: 700 }}>{apc.epa}</div>
      <div style={{ fontSize: 11.5, color: DS.textSec, lineHeight: 1.5 }}>{apc.cenario}</div>

      {/* Competências DCN tocadas */}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
        {comps.map(c => (
          <span key={c.id} title={c.titulo} style={{
            padding: '2px 7px', borderRadius: 4, fontSize: 9.5, fontWeight: 800, color: '#fff',
            background: DCN27_AREAS[c.area].cor,
          }}>C{String(c.n).padStart(2, '0')}</span>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, paddingTop: 8, borderTop: `1px solid ${DS.borderLight}` }}>
        <span style={{ fontSize: 10.5, color: DS.textMuted }}>Observado em {apc.data} · prazo {apc.prazo}</span>
        <span style={{ fontSize: 11, color: DS.blue, fontWeight: 800 }}>Avaliar ›</span>
      </div>
    </button>
  );
}

Object.assign(window, {
  APCAvaliacaoScreen, DREYFUS, APC_PENDENTES,
});
