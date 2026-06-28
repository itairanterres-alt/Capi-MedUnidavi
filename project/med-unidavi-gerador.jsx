// MED-UNIDAVI 2027 — Gerador Pedagógico (ITEM 7)
// Dois modos: QUESTÕES e CARDS — curadoria docente obrigatória

const QUESTOES_GERADAS_MOCK = [
  {
    id: 'g1', status: 'pendente',
    enunciado: 'Homem de 55 anos, tabagista (30 maços-ano), apresenta tosse com hemoptise leve e perda de 6 kg em 2 meses. TC de tórax mostra nódulo espiculado de 2,8 cm no LSD com linfonodomegalia hilar ipsilateral. O exame que confirma o diagnóstico e orienta o tratamento com maior acurácia é:',
    alternativas: [
      { letra: 'A', texto: 'Broncoscopia com biópsia transbrônquica e lavado broncoalveolar para análise citopatológica e imunohistoquímica' },
      { letra: 'B', texto: 'Tomografia por emissão de pósitrons (PET-CT) para estadiamento metabólico sem necessidade de biópsia' },
      { letra: 'C', texto: 'Escariotomia diagnóstica pela técnica de Chamberlain para acesso mediastinal' },
      { letra: 'D', texto: 'Dosagem de CEA e CYFRA 21-1 séricos como marcadores diagnósticos primários' },
    ],
    gabarito: 'A',
    tags: { fase: '3ª', uc: 'Morfofuncional III', subarea: 'Pneumologia', dificuldade: 'avançado' },
  },
  {
    id: 'g2', status: 'pendente',
    enunciado: 'Adolescente de 16 anos do sexo feminino procura o pronto-socorro com dor abdominal em cólica no hipogástrio, sem febre, acompanhada de náuseas. Ciclos menstruais irregulares há 3 meses. Teste de gravidez positivo. USG pélvica transvaginal mostra saco gestacional tópico com embrião sem batimentos cardíacos, BCF ausente, comprimento cabeça-nádega de 8 mm. Qual é o diagnóstico e a conduta imediata?',
    alternativas: [
      { letra: 'A', texto: 'Gravidez ectópica tubária rota; indicar laparotomia de urgência com salpingectomia bilateral' },
      { letra: 'B', texto: 'Abortamento retido com embrião de 8 mm sem BCF; oferecer opções de manejo (expectante, medicamentoso com misoprostol ou cirúrgico após estabilização e aconselhamento)' },
      { letra: 'C', texto: 'Gravidez em evolução normal; a ausência de BCF com CCN de 8 mm é variante da normalidade até 10 mm' },
      { letra: 'D', texto: 'Gravidez molar completa; solicitar beta-hCG seriado e encaminhar para oncologia ginecológica' },
    ],
    gabarito: 'B',
    tags: { fase: '4ª', uc: 'Habilidades IV', subarea: 'Ginecologia / Obstetrícia', dificuldade: 'intermediário' },
  },
  {
    id: 'g3', status: 'aprovada',
    enunciado: 'Lactente de 4 meses em aleitamento materno exclusivo é trazido à UBS com quadro de 48 h de febre (38,8°C axilar), irritabilidade e recusa alimentar. Exame físico: fontanela anterior abaulada, rigidez de nuca, sinal de Kernig positivo. Qual é a conduta imediata obrigatória antes de qualquer exame complementar?',
    alternativas: [
      { letra: 'A', texto: 'Realizar punção lombar imediata para análise do LCR antes de iniciar antibióticos' },
      { letra: 'B', texto: 'Iniciar ceftriaxona IV (100 mg/kg/dia) e dexametasona imediatamente, sem aguardar exames, pois o diagnóstico clínico de meningite bacteriana é emergência' },
      { letra: 'C', texto: 'Aguardar hemograma e PCR e, se leucocitose, iniciar cobertura antibiótica empírica via oral' },
      { letra: 'D', texto: 'Realizar TC de crânio antes da punção lombar para afastar hipertensão intracraniana em lactente' },
    ],
    gabarito: 'B',
    tags: { fase: '3ª', uc: 'Tutorial PBL', subarea: 'Pediatria / Neurologia', dificuldade: 'avançado' },
  },
  {
    id: 'g4', status: 'revisão_par',
    enunciado: 'Paciente de 48 anos com diagnóstico de hipertensão arterial sistêmica há 5 anos, sem outros antecedentes, em uso de anlodipino 5 mg/dia, apresenta PA de 152/96 mmHg em duas aferições com 5 min de intervalo. O próximo passo mais adequado no ajuste do tratamento é:',
    alternativas: [
      { letra: 'A', texto: 'Aumentar anlodipino para 10 mg/dia como monoterapia, atingindo dose máxima antes de associar outro fármaco' },
      { letra: 'B', texto: 'Associar IECA (enalapril 10 mg/dia) ou BRA ao anlodipino, conforme diretriz de HAS que preconiza terapia combinada quando PA > 20/10 mmHg acima da meta' },
      { letra: 'C', texto: 'Trocar anlodipino por hidroclorotiazida 25 mg/dia por ser mais eficaz em monoteratpia' },
      { letra: 'D', texto: 'Manter conduta atual e reavaliação em 6 meses, pois PA 152/96 está dentro da variabilidade aceitável' },
    ],
    gabarito: 'B',
    tags: { fase: '3ª', uc: 'Morfofuncional III', subarea: 'Cardiologia', dificuldade: 'básico' },
  },
  {
    id: 'g5', status: 'rejeitada',
    enunciado: 'Sobre o mecanismo de ação dos inibidores da enzima conversora de angiotensina (IECA), qual das opções abaixo é correta?',
    alternativas: [
      { letra: 'A', texto: 'Bloqueiam o receptor AT1 da angiotensina II, impedindo seus efeitos vasoconstritores' },
      { letra: 'B', texto: 'Inibem a conversão de angiotensina I em angiotensina II pela ECA, reduzindo a produção de angiotensina II e acúmulo de bradicinina' },
      { letra: 'C', texto: 'Bloqueiam os canais de cálcio tipo L nas células musculares lisas vasculares' },
      { letra: 'D', texto: 'Inibem a renina diretamente, impedindo a formação de angiotensinogênio' },
    ],
    gabarito: 'B',
    tags: { fase: '3ª', uc: 'Morfofuncional III', subarea: 'Farmacologia', dificuldade: 'básico' },
  },
];

const CARDS_GERADOS_MOCK = [
  { id: 'c1', status: 'pendente', frente: 'Mecanismo de ação do misoprostol na indução do parto', verso: { resposta: 'Agonismo dos receptores de prostaglandina E1 (EP2/EP3) no miométrio → contração uterina; e no colo uterino → amolecimento (amadurecimento cervical).', justificativa: 'O misoprostol é análogo sintético da PGE1. Na prática, usa-se intravaginal (25–50 mcg a cada 4–6h) para amadurecimento cervical e indução. Preferência ao misoprostol oral (25 mcg) nas induções de 2º trimestre também.', referencia: 'FEBRASGO — Indução do Trabalho de Parto, 2023.', tags: { fase: '4ª', uc: 'Habilidades IV', subarea: 'Ginecologia/Obstetrícia' } } },
  { id: 'c2', status: 'aprovada', frente: 'Critérios de SIRS (Systemic Inflammatory Response Syndrome)', verso: { resposta: '≥ 2 dos critérios: T > 38°C ou < 36°C · FC > 90 bpm · FR > 20 rpm ou PaCO₂ < 32 mmHg · Leucócitos > 12.000 ou < 4.000 ou > 10% bastões.', justificativa: 'SIRS não é sinônimo de sepse — pode ser de causa não-infecciosa (pancreatite, queimadura, trauma). Sepse = SIRS + foco infeccioso suspeito ou confirmado. Atualização: Sepsis-3 (2016) substituiu SIRS por SOFA ≥ 2 + disfunção orgânica aguda.', referencia: 'Surviving Sepsis Campaign 2021; Sepsis-3 — JAMA 2016.', tags: { fase: '3ª', uc: 'Tutorial PBL', subarea: 'Medicina Intensiva' } } },
  { id: 'c3', status: 'pendente', frente: 'Tríade de Virchow — trombose venosa', verso: { resposta: '1) Estase venosa · 2) Hipercoagulabilidade · 3) Lesão endotelial. Presença de ≥ 1 fator aumenta risco de TVP/TEP.', justificativa: 'Exemplos práticos: (1) imobilização pós-cirúrgica, FA; (2) trombofilias, contraceptivos orais, gestação; (3) trauma venoso, cateter central. A tromboprofilaxia cirúrgica (enoxaparina + meias compressivas) atua principalmente contra estase e hipercoagulabilidade.', referencia: 'Goldman & Schafer — Cecil Medicine, 26ª ed., cap. TVP; Protocolo ACCP 2022.', tags: { fase: '3ª', uc: 'Morfofuncional III', subarea: 'Hematologia / Cirurgia' } } },
  { id: 'c4', status: 'revisão_par', frente: '{{c1::Glicosídeos cardíacos}} inibem a {{c2::Na⁺/K⁺-ATPase}} → ↑Na⁺ intracelular → ↑Ca²⁺ via trocador Na⁺/Ca²⁺ → ↑contratilidade', verso: { resposta: 'Glicosídeos cardíacos (ex.: digoxina) inibem a Na⁺/K⁺-ATPase, levando ao aumento de Na⁺ intracelular que ativa o trocador Na⁺/Ca²⁺ (NCX) na direção inversa, acumulando Ca²⁺ e aumentando a contratilidade (efeito inotrópico positivo).', justificativa: 'Indicações na ICC: FA com resposta ventricular rápida (controle de FC) e ICC sistólica refratária. Janela terapêutica estreita: digoxina 0,5–0,9 ng/mL. Toxicidade: náuseas, visão amarelada, arritmias (BAV, extra-sístoles ventriculares).', referencia: 'Goodman & Gilman — Farmacologia Terapêutica, 13ª ed., cap. ICC.', tags: { fase: '3ª', uc: 'Morfofuncional III', subarea: 'Farmacologia' } } },
  { id: 'c5', status: 'pendente', frente: 'Diuréticos tiazídicos — mecanismo e uso clínico', verso: { resposta: 'Bloqueio do cotransportador Na⁺-Cl⁻ (NCC) no túbulo contorcido distal → ↓reabsorção de NaCl → ↑natriurese e diurese.', justificativa: 'Uso clínico: HAS (1ª linha em negros e idosos), edema leve-moderado, hipercalciúria/nefrolitíase por cálcio. Efeitos adversos: hipocalemia, hiponatremia, hiperglicemia, hiperuricemia, dislipidemia leve. Cuidado em DRC avançada (TFG < 30) — perdem eficácia.', referencia: 'Harrison\'s Principles, 21ª ed., cap. 313; Diretriz SBC de HAS 2024.', tags: { fase: '3ª', uc: 'Morfofuncional III', subarea: 'Farmacologia / Nefrologia' } } },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
const STATUS_LABEL = { pendente: 'Pendente', aprovada: 'Aprovada', rejeitada: 'Rejeitada', revisão_par: 'Revisão por par' };
const STATUS_COR   = { pendente: DS.amber, aprovada: DS.green, rejeitada: DS.terra, revisão_par: DS.blue };

function StatusBadge({ status }) {
  return <Badge color={STATUS_COR[status] || DS.textMuted}>{STATUS_LABEL[status] || status}</Badge>;
}

function renderCloze(texto) {
  return texto.replace(/\{\{c\d+::([^}]+)\}\}/g, (_, conteudo) => `[${conteudo}]`);
}

// ── Card de questão gerada ────────────────────────────────────────────────────
function QuestaoGeradaCard({ q, onAprovar, onRejeitar, onRevisao }) {
  const [expandida, setExpandida] = React.useState(false);
  const [editando, setEditando] = React.useState(false);
  const [enunciado, setEnunciado] = React.useState(q.enunciado);

  return (
    <div style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, boxShadow: DS.shadow, overflow: 'hidden', flex: '1 1 340px' }}>
      {/* Header */}
      <div style={{ padding: '12px 16px', borderBottom: `1px solid ${DS.borderLight}`, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <StatusBadge status={q.status} />
        <Badge color={DS.textMuted}>{q.tags.subarea}</Badge>
        <Badge color={q.tags.dificuldade === 'avançado' ? DS.terra : q.tags.dificuldade === 'intermediário' ? DS.amber : DS.green}>{q.tags.dificuldade}</Badge>
        <button onClick={() => setExpandida(p => !p)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: DS.blue, fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600 }}>
          {expandida ? 'Recolher ▲' : 'Expandir ▼'}
        </button>
      </div>

      <div style={{ padding: '14px 16px' }}>
        {/* Enunciado */}
        {editando ? (
          <textarea
            value={enunciado} onChange={e => setEnunciado(e.target.value)}
            rows={5}
            style={{ width: '100%', padding: '10px 12px', border: `1.5px solid ${DS.blue}`, borderRadius: DS.radius, fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13, color: DS.text, resize: 'vertical', outline: 'none', boxSizing: 'border-box' }}
          />
        ) : (
          <p style={{ margin: '0 0 10px', fontSize: 13, color: DS.text, lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: expandida ? 'none' : 3, WebkitBoxOrient: 'vertical', overflow: expandida ? 'visible' : 'hidden' }}>
            {enunciado}
          </p>
        )}

        {/* Alternativas — só quando expandido */}
        {expandida && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
            {q.alternativas.map(alt => (
              <div key={alt.letra} style={{ padding: '9px 12px', borderRadius: DS.radiusSm, background: alt.letra === q.gabarito ? DS.greenLight : DS.bg, border: `1px solid ${alt.letra === q.gabarito ? DS.green + '60' : DS.borderLight}`, display: 'flex', gap: 10 }}>
                <span style={{ fontWeight: 800, color: alt.letra === q.gabarito ? DS.green : DS.textMuted, fontSize: 13, minWidth: 18 }}>{alt.letra}</span>
                <span style={{ fontSize: 12, color: DS.text, lineHeight: 1.5 }}>{alt.texto}</span>
              </div>
            ))}
          </div>
        )}

        {/* Botões de ação */}
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {q.status === 'pendente' && (
            <>
              <button onClick={onAprovar} style={{ padding: '6px 12px', borderRadius: DS.radiusSm, background: DS.greenLight, border: `1px solid ${DS.green}60`, color: DS.green, fontWeight: 700, fontSize: 11, cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif' }}>✓ Aprovar</button>
              <button onClick={() => { setEditando(p => !p); }} style={{ padding: '6px 12px', borderRadius: DS.radiusSm, background: DS.blueLight, border: `1px solid ${DS.blue}60`, color: DS.blue, fontWeight: 700, fontSize: 11, cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif' }}>✎ {editando ? 'Salvar edição' : 'Editar'}</button>
              <button onClick={onRejeitar} style={{ padding: '6px 12px', borderRadius: DS.radiusSm, background: DS.terraLight, border: `1px solid ${DS.terra}60`, color: DS.terra, fontWeight: 700, fontSize: 11, cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif' }}>✗ Rejeitar</button>
              <button onClick={onRevisao} style={{ padding: '6px 12px', borderRadius: DS.radiusSm, background: DS.amberLight, border: `1px solid ${DS.amber}60`, color: DS.amber, fontWeight: 700, fontSize: 11, cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif' }}>⚑ Revisão por par</button>
            </>
          )}
          {q.status !== 'pendente' && (
            <button onClick={() => {}} style={{ padding: '6px 12px', borderRadius: DS.radiusSm, background: DS.bg, border: `1px solid ${DS.border}`, color: DS.textMuted, fontWeight: 600, fontSize: 11, cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif' }}>Reabrir para edição</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Card de card gerado ───────────────────────────────────────────────────────
function CardGeradoCard({ c, onAprovar, onRejeitar, onRevisao }) {
  const [expandido, setExpandido] = React.useState(false);

  const temCloze = c.frente.includes('{{c');

  return (
    <div style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, boxShadow: DS.shadow, overflow: 'hidden', flex: '1 1 300px' }}>
      <div style={{ padding: '10px 14px', borderBottom: `1px solid ${DS.borderLight}`, display: 'flex', gap: 8, alignItems: 'center' }}>
        <StatusBadge status={c.status} />
        {temCloze && <Badge color={DS.blue}>Cloze</Badge>}
        <Badge color={DS.textMuted}>{c.verso.tags.subarea}</Badge>
        <button onClick={() => setExpandido(p => !p)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: DS.blue, fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600 }}>
          {expandido ? '▲' : '▼'}
        </button>
      </div>

      <div style={{ padding: '12px 14px' }}>
        {/* Frente */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 10, color: DS.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>Frente</div>
          <p style={{ margin: 0, fontSize: 13, color: DS.text, lineHeight: 1.6, fontStyle: temCloze ? 'italic' : 'normal' }}>
            {temCloze ? renderCloze(c.frente) : c.frente}
          </p>
        </div>

        {/* Verso (4 blocos) — só quando expandido */}
        {expandido && (
          <div style={{ borderTop: `1px solid ${DS.borderLight}`, paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div>
              <div style={{ fontSize: 10, color: DS.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 3 }}>① Resposta-síntese</div>
              <p style={{ margin: 0, fontSize: 13, color: DS.text, fontWeight: 700, lineHeight: 1.6 }}>{c.verso.resposta}</p>
            </div>
            <div>
              <div style={{ fontSize: 10, color: DS.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 3 }}>② Justificativa</div>
              <p style={{ margin: 0, fontSize: 12, color: DS.textSec, lineHeight: 1.65 }}>{c.verso.justificativa}</p>
            </div>
            <div>
              <div style={{ fontSize: 10, color: DS.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 3 }}>③ Referência</div>
              <p style={{ margin: 0, fontSize: 12, color: DS.textMuted, lineHeight: 1.5 }}>{c.verso.referencia}</p>
            </div>
            <div>
              <div style={{ fontSize: 10, color: DS.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>④ Tags</div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                <Badge color={DS.blue}>{c.verso.tags.fase} Fase</Badge>
                <Badge color={DS.textMuted}>{c.verso.tags.uc}</Badge>
                <Badge color={DS.terra}>{c.verso.tags.subarea}</Badge>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
          {c.status === 'pendente' && (
            <>
              <button onClick={onAprovar} style={{ padding: '5px 10px', borderRadius: DS.radiusSm, background: DS.greenLight, border: `1px solid ${DS.green}60`, color: DS.green, fontWeight: 700, fontSize: 11, cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif' }}>✓ Aprovar</button>
              <button onClick={onRejeitar} style={{ padding: '5px 10px', borderRadius: DS.radiusSm, background: DS.terraLight, border: `1px solid ${DS.terra}60`, color: DS.terra, fontWeight: 700, fontSize: 11, cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif' }}>✗ Rejeitar</button>
              <button onClick={onRevisao} style={{ padding: '5px 10px', borderRadius: DS.radiusSm, background: DS.amberLight, border: `1px solid ${DS.amber}60`, color: DS.amber, fontWeight: 700, fontSize: 11, cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif' }}>⚑ Revisão par</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Tela do Gerador ───────────────────────────────────────────────────────────
function GeradorScreen({ isMobile }) {
  const [aba, setAba] = React.useState('questoes');
  const [gerando, setGerando] = React.useState(false);
  const [gerado, setGerado] = React.useState(false);
  const [questoesState, setQuestoesState] = React.useState(QUESTOES_GERADAS_MOCK);
  const [cardsState, setCardsState] = React.useState(CARDS_GERADOS_MOCK);
  const [material, setMaterial] = React.useState('');
  const [params, setParams] = React.useState({ fase: '3ª', subarea: 'Pneumologia', nQuestoes: 5, roteiro: 'Fisiologia cardíaca — ciclo e débito' });

  const updateQ = (id, novoStatus) => setQuestoesState(p => p.map(q => q.id === id ? { ...q, status: novoStatus } : q));
  const updateC = (id, novoStatus) => setCardsState(p => p.map(c => c.id === id ? { ...c, status: novoStatus } : c));

  const handleGerar = () => {
    setGerando(true);
    setTimeout(() => { setGerando(false); setGerado(true); }, 2200);
  };

  const stats = {
    questoes: {
      pendente: questoesState.filter(q => q.status === 'pendente').length,
      aprovada: questoesState.filter(q => q.status === 'aprovada').length,
      rejeitada: questoesState.filter(q => q.status === 'rejeitada').length,
      revisão_par: questoesState.filter(q => q.status === 'revisão_par').length,
    },
    cards: {
      pendente: cardsState.filter(c => c.status === 'pendente').length,
      aprovada: cardsState.filter(c => c.status === 'aprovada').length,
    },
  };

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      {/* Top bar */}
      <div style={{ padding: '16px 28px', background: DS.surface, borderBottom: `1px solid ${DS.border}` }}>
        <div style={{ marginBottom: 6 }}>
          <h1 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: DS.text }}>Gerador Pedagógico</h1>
          <p style={{ margin: 0, fontSize: 12, color: DS.textSec }}>Geração assistida de questões e cards · Curadoria docente obrigatória</p>
        </div>
        <AIDisclaimer text="IA gera, docente valida. Todo conteúdo gerado deve ser revisado antes da publicação. Tempo médio de curadoria por lote: 30 min (questões) · 20 min (cards)." />
      </div>

      {/* Abas */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${DS.border}`, background: DS.surface, paddingLeft: 28 }}>
        {[{ id: 'questoes', label: 'Modo Questões' }, { id: 'cards', label: 'Modo Cards' }].map(a => (
          <button
            key={a.id}
            onClick={() => setAba(a.id)}
            style={{
              padding: '12px 20px', border: 'none', background: 'none', cursor: 'pointer',
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: aba === a.id ? 700 : 400,
              fontSize: 13, color: aba === a.id ? DS.blue : DS.textSec,
              borderBottom: aba === a.id ? `2.5px solid ${DS.blue}` : '2.5px solid transparent',
              marginBottom: -1, transition: 'all 0.15s',
            }}
          >{a.label}</button>
        ))}
      </div>

      <div style={{ padding: isMobile ? '16px' : '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Painel de input */}
        <div style={{ display: 'flex', gap: 20, flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start' }}>

          {/* Input */}
          <Card style={{ flex: '0 0 300px', padding: '18px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 14 }}>
              {aba === 'questoes' ? 'Material de entrada' : 'Roteiro morfofuncional'}
            </div>

            {aba === 'questoes' ? (
              <>
                <textarea
                  value={material} onChange={e => setMaterial(e.target.value)}
                  placeholder="Cole aqui o material de aula, resumo ou objetivos de aprendizagem…"
                  rows={8}
                  style={{ width: '100%', padding: '10px 12px', border: `1.5px solid ${DS.border}`, borderRadius: DS.radius, fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, color: DS.text, resize: 'vertical', outline: 'none', boxSizing: 'border-box', marginBottom: 10 }}
                />
                <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                  <div style={{ flex: 1, padding: '10px 12px', background: DS.amberLight, borderRadius: DS.radius, border: `1px solid ${DS.amber}30`, fontSize: 11, color: DS.amber, cursor: 'not-allowed', textAlign: 'center', fontWeight: 600, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                    <span>📄 Upload de PDF de slides</span>
                    <span style={{ fontSize: 10, fontWeight: 500, color: DS.textSec }}>Em construção — aguarda implementação de parser de slides</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[['Fase', 'fase', ['1ª','2ª','3ª','4ª','5ª']], ['Sub-área', 'subarea', ['Cardiologia','Pneumologia','Nefrologia','Farmacologia','Neurologia','Saúde Coletiva']], ['Nº questões', 'nQuestoes', [3,5,10]]].map(([label, key, opts]) => (
                    <div key={key}>
                      <div style={{ fontSize: 10, color: DS.textMuted, fontWeight: 700, marginBottom: 3 }}>{label}</div>
                      <select value={params[key]} onChange={e => setParams(p => ({...p, [key]: e.target.value}))} style={{ width: '100%', padding: '7px 10px', border: `1px solid ${DS.border}`, borderRadius: DS.radiusSm, fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, color: DS.text, background: DS.surface }}>
                        {opts.map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <select value={params.roteiro} onChange={e => setParams(p => ({...p, roteiro: e.target.value}))} style={{ width: '100%', padding: '9px 12px', border: `1.5px solid ${DS.border}`, borderRadius: DS.radius, fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, color: DS.text, background: DS.surface, marginBottom: 12 }}>
                  {['Fisiologia cardíaca — ciclo e débito','Membrana plasmática e transporte celular','Anatomia do coração','Histologia vascular e cardíaca'].map(r => <option key={r}>{r}</option>)}
                </select>
                <p style={{ fontSize: 12, color: DS.textMuted, lineHeight: 1.6, margin: '0 0 12px' }}>
                  Os objetivos do roteiro selecionado serão usados como base para geração dos cards no padrão Uni-Card (frente curta + 4 blocos no verso).
                </p>
                <p style={{ fontSize: 11, color: DS.amber, background: DS.amberLight, padding: '8px 10px', borderRadius: DS.radiusSm, margin: 0, lineHeight: 1.5 }}>
                  ⚑ Curadoria por par recomendada para cards de morfofuncional.
                </p>
              </>
            )}

            <div style={{ marginTop: 14 }}>
              <Btn variant="primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleGerar}>
                {gerando ? '⟳ Gerando…' : gerado ? '↻ Gerar novo lote' : `Gerar ${aba === 'questoes' ? `${params.nQuestoes} questões` : '5 cards'}`}
              </Btn>
            </div>

            {/* Psicometria footer */}
            <div style={{ marginTop: 14, padding: '8px 10px', background: DS.bg, borderRadius: DS.radiusSm, border: `1px solid ${DS.border}` }}>
              <div style={{ fontSize: 10, color: DS.textMuted, fontWeight: 700, marginBottom: 2 }}>Indicador psicométrico (pós-aplicação)</div>
              <div style={{ fontSize: 11, color: DS.textSec, lineHeight: 1.5 }}>Questões com discriminação &lt;0,2 retornam automaticamente para revisão docente após 1ª aplicação.</div>
            </div>
          </Card>

          {/* Output */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Stats */}
            {gerado && (
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
                {Object.entries(aba === 'questoes' ? stats.questoes : stats.cards).map(([k, v]) => (
                  <div key={k} style={{ padding: '8px 14px', background: DS.surface, borderRadius: DS.radius, border: `1px solid ${STATUS_COR[k] || DS.border}30`, display: 'flex', gap: 6, alignItems: 'center' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_COR[k] || DS.textMuted }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: DS.text }}>{v}</span>
                    <span style={{ fontSize: 11, color: DS.textMuted }}>{STATUS_LABEL[k]}</span>
                  </div>
                ))}
              </div>
            )}

            {!gerado && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px', gap: 16, background: DS.surface, borderRadius: DS.radiusLg, border: `2px dashed ${DS.border}` }}>
                <div style={{ fontSize: 48, opacity: 0.4 }}>✨</div>
                <div style={{ textAlign: 'center', maxWidth: 320 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: DS.text, marginBottom: 6 }}>Aguardando material</div>
                  <div style={{ fontSize: 13, color: DS.textMuted, lineHeight: 1.6 }}>
                    {aba === 'questoes' ? 'Cole o material de aula à esquerda e clique em "Gerar questões" para receber um lote em padrão ENAMED ABDC.' : 'Selecione o roteiro morfofuncional e clique em "Gerar cards" para receber Capi-Cards prontos para curadoria.'}
                  </div>
                </div>
              </div>
            )}

            {gerando && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px', gap: 16, background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}` }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', border: `4px solid ${DS.blueLight}`, borderTop: `4px solid ${DS.blue}`, animation: 'spin 0.8s linear infinite' }} />
                <div style={{ fontSize: 14, color: DS.textSec }}>Gerando conteúdo…</div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            )}

            {gerado && !gerando && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                {aba === 'questoes'
                  ? questoesState.map(q => (
                    <QuestaoGeradaCard key={q.id} q={q}
                      onAprovar={() => updateQ(q.id, 'aprovada')}
                      onRejeitar={() => updateQ(q.id, 'rejeitada')}
                      onRevisao={() => updateQ(q.id, 'revisão_par')}
                    />
                  ))
                  : cardsState.map(c => (
                    <CardGeradoCard key={c.id} c={c}
                      onAprovar={() => updateC(c.id, 'aprovada')}
                      onRejeitar={() => updateC(c.id, 'rejeitada')}
                      onRevisao={() => updateC(c.id, 'revisão_par')}
                    />
                  ))
                }
              </div>
            )}
          </div>
        </div>
        {isMobile && <div style={{ height: 60 }} />}
      </div>
    </div>
  );
}

Object.assign(window, { GeradorScreen });
