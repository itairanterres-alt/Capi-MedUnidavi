// =============================================================================
// MED-UNIDAVI · Matriz Competência (mu_matriz_competencia) — Bloco B1
//
// Unifica a "matriz institucional 27×12" da Coordenação e a "Matriz programática
// 27×N" do Perfil. Acrescenta:
//  · Gráfico de dispersão por quadrantes (volume × proficiência APC)
//  · Tamanho da bolha = peso composto (mock — incidência ENAMED + cobertura
//    curricular + prioridade NDE); aguarda ratificação NDE
//  · Mediana DINÂMICA da turma (não 50/50 fixo)
//  · Três versões por persona: aluno / tutor / coord
//  · Drilldown ao clicar na bolha
//  · Selo "v1.0 — calibração em curso"
//  · Faixa "não avaliado" semitransparente para competências sem APC
//
// NÃO criar tela duplicada — esta é a evolução conceitual das duas matrizes
// existentes. A Coordenação rota `coord-comp` aterrissa aqui (persona=coord);
// Docente rota `doc-matriz`; tela top-level `matriz` para a persona=aluno.
// =============================================================================

// ── Mock: peso composto + dados por aluno ───────────────────────────────────
// Peso composto vai de 0.3 a 1.0 (mock). Maior nas áreas com forte incidência
// ENAMED (Portaria 478): clínica primária, urgência, saúde da mulher/criança,
// saúde mental. Gestão e Educação têm peso menor.
const DCN27_PESOS = (() => {
  const map = {
    atencao:  { base: 0.65, range: 0.30 },  // 0.65–0.95
    gestao:   { base: 0.45, range: 0.20 },  // 0.45–0.65
    educacao: { base: 0.35, range: 0.15 },  // 0.35–0.50
  };
  const altas = ['dcn2025_comp_03', 'dcn2025_comp_07', 'dcn2025_comp_09', 'dcn2025_comp_10', 'dcn2025_comp_11', 'dcn2025_comp_15', 'dcn2025_comp_17']; // foco ENAMED
  return Object.fromEntries(DCN27.map(c => {
    const m = map[c.area];
    let h = 0; for (let i = 0; i < c.id.length; i++) h = (h * 31 + c.id.charCodeAt(i)) | 0;
    let p = m.base + (Math.abs(h) % 100) / 100 * m.range;
    if (altas.includes(c.id)) p = Math.min(1.0, p + 0.15);
    return [c.id, +p.toFixed(2)];
  }));
})();

// Mock: volume e proficiência por aluno e competência.
// Volume 0–100: % de atividade do aluno na competência.
// Proficiência 0–100: Dreyfus médio das APCs registradas (1→20, 5→100).
//   null = sem APC, vai para faixa "não avaliado" semitransparente.
function _matrizMockAluno(idAluno, fase = 5) {
  return Object.fromEntries(DCN27.map(c => {
    let h = 0; const s = idAluno + ':' + c.id;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    const r1 = (Math.abs(h)) % 100;
    const r2 = (Math.abs(h >> 5)) % 100;
    const n = c.n;
    // Volume cresce com fase do aluno e diminui em competências "tardias" (paliativo, urgência avançada)
    const tardia = [7, 12, 14, 22, 23, 25].includes(n);
    let volume = Math.round((tardia ? 10 : 30) + (fase / 12) * 50 + (r1 % 25));
    if (volume > 100) volume = 100;
    // Proficiência: null quando sem APC (mais provável em fases iniciais e tardias)
    let semApc = r2 < 30 || (tardia && fase < 8);
    if (volume < 25 && r1 < 60) semApc = true;
    const proficiencia = semApc ? null : Math.round(20 + (fase / 12) * 50 + (r2 % 30));
    return [c.id, { volume, proficiencia }];
  }));
}

const MATRIZ_MOCK_JOAO = _matrizMockAluno('joao-melo', 5);

// Quadrantes (ordem: bottom-left, bottom-right, top-left, top-right)
const QUADRANTES = {
  prioridade:  { label: 'Prioridade',  desc: 'Baixo volume, baixa proficiência',  cor: '#B23A2A', corBg: '#FBE9E5' },
  atencao:     { label: 'Atenção',     desc: 'Alto volume, baixa proficiência · gap qualitativo', cor: '#B97A0F', corBg: '#FFF3DA' },
  confirmar:   { label: 'Confirmar',   desc: 'Baixo volume, alta proficiência · pouco dado',     cor: '#1565C0', corBg: '#E3F0FB' },
  dominio:     { label: 'Domínio',     desc: 'Alto volume, alta proficiência',   cor: '#2E7D4F', corBg: '#E7F4EC' },
};

function _classifyQuadrante(volume, prof, medianaX, medianaY) {
  if (prof === null || prof === undefined) return null;
  const altoX = volume >= medianaX;
  const altoY = prof   >= medianaY;
  if (!altoX && !altoY) return 'prioridade';
  if ( altoX && !altoY) return 'atencao';
  if (!altoX &&  altoY) return 'confirmar';
  return 'dominio';
}

// ── Tela principal ────────────────────────────────────────────────────────
function MatrizCompetenciaScreen({ isMobile, onNavigate, persona = 'aluno', subRoute }) {
  // Persona dado pelo screen do AppInstance ou pelo prop
  const [bolhaAberta, setBolhaAberta] = React.useState(null);
  const [filtroArea, setFiltroArea] = React.useState('todas');

  // Mock: dados do "aluno foco" — para Aluno = João Melo; para Coord/Tutor é o
  // mesmo João como exemplo de drilldown (a tela coord/tutor agrega N alunos —
  // no protótipo isso vira média mock).
  const dados = MATRIZ_MOCK_JOAO;

  // Aplica filtro de área
  const compsFiltradas = DCN27.filter(c => filtroArea === 'todas' || c.area === filtroArea);
  const datasetVisivel = compsFiltradas.map(c => ({
    comp: c,
    peso: DCN27_PESOS[c.id],
    ...dados[c.id],
  }));

  // Mediana dinâmica considerando só os pontos avaliados
  const pontosAvaliados = datasetVisivel.filter(d => d.proficiencia !== null);
  const medianaX = _mediana(pontosAvaliados.map(d => d.volume))   || 50;
  const medianaY = _mediana(pontosAvaliados.map(d => d.proficiencia)) || 50;

  // Conta por quadrante (só avaliados)
  const contagem = { prioridade: 0, atencao: 0, confirmar: 0, dominio: 0 };
  pontosAvaliados.forEach(d => {
    const q = _classifyQuadrante(d.volume, d.proficiencia, medianaX, medianaY);
    if (q) contagem[q]++;
  });

  // Rotas de origem para o breadcrumb
  const breadcrumb = (() => {
    if (persona === 'coord') return [
      { label: 'Coordenação', onClick: () => onNavigate && onNavigate('coordenacao') },
      { label: 'Matriz Competência · 27 DCN' },
    ];
    if (persona === 'tutor') return [
      { label: 'Painel do Tutor', onClick: () => onNavigate && onNavigate('docente') },
      { label: 'Matriz Competência · turma' },
    ];
    return [
      { label: 'Início', onClick: () => onNavigate && onNavigate('dashboard') },
      { label: 'Matriz Competência' },
    ];
  })();

  const subtitulo = persona === 'coord'
    ? 'Coordenação · 27 competências DCN 2025 · gap curricular coletivo'
    : persona === 'tutor'
      ? 'Painel do Tutor · turma sob tutoria · alunos em quadrante de Atenção'
      : 'Suas 27 competências DCN 2025 · volume × proficiência APC';

  // Sem APC (faixa "não avaliado" — bolhas semitransparentes no rodapé)
  const semApc = datasetVisivel.filter(d => d.proficiencia === null);

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <TopBar
        title="Matriz Competência"
        subtitle={subtitulo}
        isMobile={isMobile}
        breadcrumb={breadcrumb}
      />

      <div style={{ padding: isMobile ? 14 : '24px 32px', display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 1400, margin: '0 auto' }}>

        {/* ── Cabeçalho com selo de calibração e seletor de área ── */}
        <Card style={{ padding: isMobile ? 14 : 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 6 }}>
                <span style={{
                  padding: '3px 9px', borderRadius: 100, background: DS.amberLight, color: DS.amber,
                  fontSize: 10, fontWeight: 800, letterSpacing: '0.4px',
                }}>v1.0 · CALIBRAÇÃO EM CURSO</span>
                {persona === 'coord' && <Badge color={DS.blueAcc}>Visão Coordenação</Badge>}
                {persona === 'tutor' && <Badge color="#5DD3D3">Visão Docente</Badge>}
              </div>
              <div style={{ fontSize: 13, color: DS.textSec, lineHeight: 1.55 }}>
                Pesos compostos (tamanho da bolha) <strong>aguardam ratificação NDE</strong>.
                Mediana de turma <strong>dinâmica</strong> — não há linha 50/50 fixa.
                Eixo Y só existe para competências com APC registrada — as demais ficam na faixa "não avaliado".
              </div>
            </div>
            {/* Filtro por área-eixo */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[{ id: 'todas', label: 'Todas as 27' }, ...Object.entries(DCN27_AREAS).map(([k, v]) => ({ id: k, label: v.label }))].map(opt => {
                const ativo = filtroArea === opt.id;
                return (
                  <button key={opt.id} onClick={() => setFiltroArea(opt.id)} style={{
                    padding: '7px 12px', borderRadius: DS.radiusSm,
                    background: ativo ? DS.blueDark : DS.surface,
                    color: ativo ? '#fff' : DS.textDark,
                    border: `1px solid ${ativo ? DS.blueDark : DS.border}`,
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontWeight: 700, fontSize: 11, cursor: 'pointer', whiteSpace: 'nowrap',
                  }}>{opt.label}</button>
                );
              })}
            </div>
          </div>
        </Card>

        {/* ── Quatro cards-resumo (quadrantes) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 10 }}>
          {Object.entries(QUADRANTES).map(([id, q]) => (
            <Card key={id} style={{ padding: 12, borderLeft: `3px solid ${q.cor}` }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: q.cor, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{q.label}</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: DS.text, fontVariantNumeric: 'tabular-nums', lineHeight: 1.1, marginTop: 2 }}>
                {contagem[id]}
              </div>
              <div style={{ fontSize: 10.5, color: DS.textMuted, marginTop: 2, lineHeight: 1.4 }}>{q.desc}</div>
            </Card>
          ))}
        </div>

        {/* ── Gráfico de dispersão ── */}
        <Card style={{ padding: isMobile ? 12 : 18 }}>
          <SectionHeading>
            Volume × Proficiência APC · mediana dinâmica · {pontosAvaliados.length} bolhas avaliadas · {semApc.length} sem APC
          </SectionHeading>
          <MatrizGrafico
            dataset={datasetVisivel}
            medianaX={medianaX}
            medianaY={medianaY}
            onBolha={(d) => setBolhaAberta(d)}
            isMobile={isMobile}
          />
        </Card>

        {/* ── Painel persona-específico ── */}
        {persona === 'aluno' && (
          <PainelAluno datasetVisivel={datasetVisivel} medianaX={medianaX} medianaY={medianaY}
            onBolha={(d) => setBolhaAberta(d)} isMobile={isMobile} />
        )}
        {persona === 'tutor' && (
          <PainelTutor datasetVisivel={datasetVisivel} medianaX={medianaX} medianaY={medianaY}
            onBolha={(d) => setBolhaAberta(d)} isMobile={isMobile} />
        )}
        {persona === 'coord' && (
          <PainelCoord datasetVisivel={datasetVisivel} medianaX={medianaX} medianaY={medianaY}
            onBolha={(d) => setBolhaAberta(d)} isMobile={isMobile} />
        )}

        {isMobile && <div style={{ height: 60 }} />}
      </div>

      {/* Drilldown modal */}
      {bolhaAberta && (
        <BolhaDrilldown
          bolha={bolhaAberta}
          medianaX={medianaX}
          medianaY={medianaY}
          persona={persona}
          onClose={() => setBolhaAberta(null)}
          onAbrirAluno={() => onNavigate && window.__abrirPerfilAluno && window.__abrirPerfilAluno(persona === 'coord' ? 'coordenacao' : 'docente')}
        />
      )}
    </div>
  );
}

// ── Gráfico SVG ─────────────────────────────────────────────────────────────
function MatrizGrafico({ dataset, medianaX, medianaY, onBolha, isMobile }) {
  // SVG dimensões — viewBox proporcional, responsivo
  const W = 720, H = 460;
  const padL = 40, padR = 28, padT = 28, padB = 60;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const xToPx = (v) => padL + (v / 100) * innerW;
  const yToPx = (v) => padT + ((100 - v) / 100) * innerH; // invertido
  const rPeso = (peso) => 6 + peso * 16; // 6–22 px

  // Bolhas avaliadas (com Y); as não avaliadas vão para a faixa de rodapé
  const avaliadas = dataset.filter(d => d.proficiencia !== null);
  const semApc = dataset.filter(d => d.proficiencia === null);

  // Para faixa "não avaliado": distribuir horizontalmente pelo volume
  const banda = { y: padT + innerH + 14, h: 26 };

  return (
    <div style={{ background: DS.surface, borderRadius: DS.radiusSm, border: `1px solid ${DS.border}`, padding: isMobile ? 6 : 10 }}>
      <svg viewBox={`0 0 ${W} ${H + 30}`} style={{ width: '100%', height: 'auto', display: 'block', fontFamily: 'IBM Plex Sans, sans-serif' }}>
        {/* Fundo dos quadrantes */}
        {/* Top-Right Domínio */}
        <rect x={xToPx(medianaX)} y={padT} width={xToPx(100) - xToPx(medianaX)} height={yToPx(medianaY) - padT} fill="#E7F4EC" opacity="0.5" />
        {/* Top-Left Confirmar */}
        <rect x={padL} y={padT} width={xToPx(medianaX) - padL} height={yToPx(medianaY) - padT} fill="#E3F0FB" opacity="0.5" />
        {/* Bottom-Right Atenção */}
        <rect x={xToPx(medianaX)} y={yToPx(medianaY)} width={xToPx(100) - xToPx(medianaX)} height={padT + innerH - yToPx(medianaY)} fill="#FFF3DA" opacity="0.5" />
        {/* Bottom-Left Prioridade */}
        <rect x={padL} y={yToPx(medianaY)} width={xToPx(medianaX) - padL} height={padT + innerH - yToPx(medianaY)} fill="#FBE9E5" opacity="0.5" />

        {/* Grade leve a cada 25% */}
        {[25, 50, 75].map(t => (
          <g key={'g' + t}>
            <line x1={xToPx(t)} x2={xToPx(t)} y1={padT} y2={padT + innerH} stroke="#E3E7EE" strokeWidth="0.8" strokeDasharray="2 3" />
            <line x1={padL} x2={padL + innerW} y1={yToPx(t)} y2={yToPx(t)} stroke="#E3E7EE" strokeWidth="0.8" strokeDasharray="2 3" />
          </g>
        ))}

        {/* Eixo X (volume) */}
        <line x1={padL} x2={padL + innerW} y1={padT + innerH} y2={padT + innerH} stroke={DS.textMuted} strokeWidth="1" />
        <text x={padL + innerW / 2} y={padT + innerH + 50} textAnchor="middle" fontSize="11" fill={DS.textSec} fontWeight="700">Volume de atividade →</text>
        {[0, 25, 50, 75, 100].map(t => (
          <text key={'tx' + t} x={xToPx(t)} y={padT + innerH + 12} textAnchor="middle" fontSize="9" fill={DS.textMuted}>{t}</text>
        ))}

        {/* Eixo Y (proficiência) */}
        <line x1={padL} x2={padL} y1={padT} y2={padT + innerH} stroke={DS.textMuted} strokeWidth="1" />
        <text x={padL - 30} y={padT + innerH / 2} textAnchor="middle" fontSize="11" fill={DS.textSec} fontWeight="700"
              transform={`rotate(-90 ${padL - 30} ${padT + innerH / 2})`}>Proficiência APC →</text>
        {[0, 25, 50, 75, 100].map(t => (
          <text key={'ty' + t} x={padL - 6} y={yToPx(t) + 3} textAnchor="end" fontSize="9" fill={DS.textMuted}>{t}</text>
        ))}

        {/* Linhas das medianas */}
        <line x1={xToPx(medianaX)} x2={xToPx(medianaX)} y1={padT} y2={padT + innerH} stroke={DS.blueDark} strokeWidth="1.2" strokeDasharray="3 3" />
        <line x1={padL} x2={padL + innerW} y1={yToPx(medianaY)} y2={yToPx(medianaY)} stroke={DS.blueDark} strokeWidth="1.2" strokeDasharray="3 3" />
        <text x={xToPx(medianaX) + 4} y={padT + 12} fontSize="9" fill={DS.blueDark} fontWeight="700">mediana X · {medianaX.toFixed(0)}</text>
        <text x={padL + innerW - 4} y={yToPx(medianaY) - 4} textAnchor="end" fontSize="9" fill={DS.blueDark} fontWeight="700">mediana Y · {medianaY.toFixed(0)}</text>

        {/* Rótulos dos quadrantes */}
        <QuadRotulo x={padL + innerW - 4}                                 y={padT + 16}                                 align="end"   label="Domínio"     cor="#2E7D4F" />
        <QuadRotulo x={padL + 4}                                          y={padT + 16}                                 align="start" label="Confirmar"   cor="#1565C0" />
        <QuadRotulo x={padL + innerW - 4}                                 y={padT + innerH - 6}                          align="end"   label="Atenção"     cor="#B97A0F" />
        <QuadRotulo x={padL + 4}                                          y={padT + innerH - 6}                          align="start" label="Prioridade"  cor="#B23A2A" />

        {/* Bolhas avaliadas */}
        {avaliadas.map(d => {
          const cor = DCN27_AREAS[d.comp.area].cor;
          const r = rPeso(d.peso);
          return (
            <g key={d.comp.id} style={{ cursor: 'pointer' }} onClick={() => onBolha(d)}>
              <circle cx={xToPx(d.volume)} cy={yToPx(d.proficiencia)} r={r}
                      fill={cor} fillOpacity="0.32" stroke={cor} strokeWidth="1.4" />
              <text x={xToPx(d.volume)} y={yToPx(d.proficiencia) + 3} textAnchor="middle"
                    fontSize="9" fill={cor} fontWeight="800" pointerEvents="none">
                {d.comp.n}
              </text>
              <title>{`C${String(d.comp.n).padStart(2,'0')} · ${d.comp.titulo}
Volume ${d.volume} · Proficiência ${d.proficiencia} · Peso ${d.peso}`}</title>
            </g>
          );
        })}

        {/* Faixa "não avaliado" — bolhas semitransparentes no rodapé */}
        <rect x={padL} y={banda.y - 4} width={innerW} height={banda.h + 6} fill={DS.bg} stroke={DS.borderLight} />
        <text x={padL + 4} y={banda.y - 8} fontSize="9" fill={DS.textMuted} fontWeight="700">não avaliado · sem APC registrada · posicionado pelo volume</text>
        {semApc.map((d, i) => {
          const cor = DCN27_AREAS[d.comp.area].cor;
          const r = rPeso(d.peso) * 0.7;
          return (
            <g key={'na-' + d.comp.id} style={{ cursor: 'pointer' }} onClick={() => onBolha(d)}>
              <circle cx={xToPx(d.volume)} cy={banda.y + banda.h / 2} r={r}
                      fill={cor} fillOpacity="0.16" stroke={cor} strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 2" />
              <text x={xToPx(d.volume)} y={banda.y + banda.h / 2 + 3} textAnchor="middle"
                    fontSize="8.5" fill={cor} fillOpacity="0.7" fontWeight="700" pointerEvents="none">{d.comp.n}</text>
            </g>
          );
        })}
      </svg>

      {/* Legenda */}
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 10, alignItems: 'center', padding: '0 6px' }}>
        {Object.entries(DCN27_AREAS).map(([k, v]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: v.cor, display: 'inline-block' }} />
            <span style={{ fontSize: 10.5, color: DS.textSec, fontWeight: 600 }}>{v.label}</span>
          </div>
        ))}
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 10, color: DS.textMuted }}>Tamanho da bolha = peso composto (mock)</span>
      </div>
    </div>
  );
}

function QuadRotulo({ x, y, align, label, cor }) {
  return (
    <text x={x} y={y} textAnchor={align} fontSize="11" fontWeight="800" fill={cor} opacity="0.55">
      {label}
    </text>
  );
}

// ── Painel · Aluno ────────────────────────────────────────────────────────
function PainelAluno({ datasetVisivel, medianaX, medianaY, onBolha, isMobile }) {
  // Sugestão Capi: pegar até 3 competências do quadrante "Prioridade" com maior peso
  const prio = datasetVisivel
    .filter(d => _classifyQuadrante(d.volume, d.proficiencia, medianaX, medianaY) === 'prioridade')
    .sort((a, b) => b.peso - a.peso)
    .slice(0, 3);
  // Se não houver Prioridade, pega Atenção
  const aten = prio.length === 0
    ? datasetVisivel
        .filter(d => _classifyQuadrante(d.volume, d.proficiencia, medianaX, medianaY) === 'atencao')
        .sort((a, b) => b.peso - a.peso).slice(0, 3)
    : [];
  const foco = prio.length > 0 ? prio : aten;
  const focoLabel = prio.length > 0 ? 'Prioridade' : 'Atenção';

  return (
    <Card style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px', borderBottom: `1px solid ${DS.border}`, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', background: DS.blueLight }}>
        <CapivaraDecorativa size={48} modo="treino" />
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: DS.blue, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Sugestão do Capi
          </div>
          <div style={{ fontSize: 13, color: DS.text, lineHeight: 1.55, marginTop: 2 }}>
            {foco.length === 0
              ? 'Sua matriz está bem distribuída. Mantenha o ritmo no quadrante Domínio e considere consolidar a área Confirmar com mais APCs registradas.'
              : `Estas ${foco.length} competências aparecem no quadrante ${focoLabel} e têm o maior peso composto — vale plano dirigido.`}
          </div>
        </div>
      </div>

      <div style={{ padding: 14, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 10 }}>
        {foco.length === 0
          ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 18, color: DS.textMuted, fontSize: 12 }}>
              Sem competências em Prioridade ou Atenção neste filtro.
            </div>
          )
          : foco.map(d => {
            const area = DCN27_AREAS[d.comp.area];
            return (
              <button key={d.comp.id} onClick={() => onBolha(d)} style={{
                textAlign: 'left', padding: 12, borderRadius: DS.radius,
                background: DS.surface, border: `1px solid ${DS.border}`, borderLeft: `3px solid ${area.cor}`,
                cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif',
              }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: area.cor, marginBottom: 4 }}>
                  C{String(d.comp.n).padStart(2, '0')} · {area.label}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: DS.text, lineHeight: 1.3 }}>{d.comp.titulo}</div>
                <div style={{ fontSize: 11, color: DS.textSec, marginTop: 6, lineHeight: 1.5 }}>{d.comp.resumo}</div>
                <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
                  <span style={{ fontSize: 10.5, color: DS.textMuted, fontVariantNumeric: 'tabular-nums' }}>
                    Vol {d.volume} · Prof {d.proficiencia ?? '—'}
                  </span>
                  <span style={{ fontSize: 11, color: DS.blue, fontWeight: 800 }}>Plano dirigido ›</span>
                </div>
              </button>
            );
          })}
      </div>
    </Card>
  );
}

// ── Painel · Tutor ────────────────────────────────────────────────────────
function PainelTutor({ datasetVisivel, medianaX, medianaY, onBolha, isMobile }) {
  // Competências em "Atenção" (alto volume, baixa proficiência) → gap de qualidade da turma
  const aten = datasetVisivel
    .filter(d => _classifyQuadrante(d.volume, d.proficiencia, medianaX, medianaY) === 'atencao')
    .sort((a, b) => b.peso - a.peso);

  // Alunos mock em quadrante de Atenção (representativos)
  const alunos = [
    { nome: 'João Melo',     turma: 'T14', fase: '5ª', compMaior: aten[0]?.comp },
    { nome: 'Carlos Sousa',  turma: 'T16', fase: '3ª', compMaior: aten[1]?.comp || aten[0]?.comp },
    { nome: 'Pedro Vilas',   turma: 'T13', fase: '6ª', compMaior: aten[0]?.comp },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${DS.border}`, background: DS.bg }}>
          <SectionHeading style={{ margin: 0 }}>Competências em Atenção · turma</SectionHeading>
        </div>
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 320, overflowY: 'auto' }}>
          {aten.length === 0 && <div style={{ textAlign: 'center', padding: 12, color: DS.textMuted, fontSize: 12 }}>Nenhuma competência em Atenção neste filtro.</div>}
          {aten.map(d => {
            const area = DCN27_AREAS[d.comp.area];
            return (
              <button key={d.comp.id} onClick={() => onBolha(d)} style={{
                textAlign: 'left', padding: '10px 12px', borderRadius: DS.radiusSm,
                background: '#FFF3DA', border: `1px solid #E8C97A`, cursor: 'pointer',
                fontFamily: 'IBM Plex Sans, sans-serif', display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{
                  minWidth: 30, height: 22, borderRadius: 4, background: area.cor,
                  color: '#fff', fontWeight: 800, fontSize: 10,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>C{String(d.comp.n).padStart(2, '0')}</span>
                <span style={{ flex: 1, fontSize: 12, color: DS.text, fontWeight: 600 }}>{d.comp.titulo}</span>
                <span style={{ fontSize: 10, color: DS.textMuted, fontVariantNumeric: 'tabular-nums' }}>V{d.volume}·P{d.proficiencia}</span>
              </button>
            );
          })}
        </div>
      </Card>

      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${DS.border}`, background: DS.bg }}>
          <SectionHeading style={{ margin: 0 }}>Alunos da turma · foco Atenção</SectionHeading>
        </div>
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {alunos.map((a, i) => (
            <div key={i} onClick={() => window.__abrirPerfilAluno && window.__abrirPerfilAluno('docente')}
              style={{
                padding: '10px 12px', borderRadius: DS.radiusSm, background: DS.surface,
                border: `1px solid ${DS.border}`, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: DS.amber, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>{a.nome[0]}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, color: DS.text, fontWeight: 700 }}>{a.nome} <span style={{ color: DS.textMuted, fontWeight: 500, fontSize: 11 }}>· {a.turma} · {a.fase}</span></div>
                <div style={{ fontSize: 11, color: DS.textSec, marginTop: 2 }}>
                  {a.compMaior ? `C${String(a.compMaior.n).padStart(2,'0')} · ${a.compMaior.titulo}` : '—'}
                </div>
              </div>
              <span style={{ fontSize: 14, color: DS.textMuted }}>›</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ── Painel · Coordenação ──────────────────────────────────────────────────
function PainelCoord({ datasetVisivel, medianaX, medianaY, onBolha, isMobile }) {
  // Atenção coletiva: competências em "Atenção" para a coordenação são gap curricular
  const gaps = datasetVisivel
    .filter(d => _classifyQuadrante(d.volume, d.proficiencia, medianaX, medianaY) === 'atencao')
    .sort((a, b) => b.peso - a.peso);

  // Trajetória longitudinal mock (heatmap 27 × 12)
  const trajetoria = DCN27.slice(0, 6); // primeiras 6 só p/ amostra visual

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${DS.border}`, background: DS.bg }}>
          <SectionHeading style={{ margin: 0 }}>Gap curricular institucional · quadrante Atenção</SectionHeading>
        </div>
        <div style={{ padding: 12, fontSize: 12, color: DS.textSec, lineHeight: 1.6 }}>
          Competências com <strong>alta exposição</strong> mas <strong>baixa proficiência</strong> são alvos de
          revisão curricular pelo NDE — alta cobertura na atividade do aluno mas baixa entrega de APC.
        </div>
        <div style={{ padding: '0 12px 12px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: 8 }}>
          {gaps.length === 0 && <div style={{ gridColumn: '1 / -1', padding: 12, textAlign: 'center', color: DS.textMuted, fontSize: 12 }}>Sem gaps de Atenção neste filtro.</div>}
          {gaps.map(d => {
            const area = DCN27_AREAS[d.comp.area];
            return (
              <button key={d.comp.id} onClick={() => onBolha(d)} style={{
                textAlign: 'left', padding: '12px 14px', borderRadius: DS.radius,
                background: '#FFF3DA', border: `1px solid #E8C97A`, cursor: 'pointer',
                fontFamily: 'IBM Plex Sans, sans-serif',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                  <span style={{ fontSize: 10.5, fontWeight: 800, color: area.cor }}>
                    C{String(d.comp.n).padStart(2, '0')} · {area.label}
                  </span>
                  <span style={{ fontSize: 10, color: DS.textMuted, fontVariantNumeric: 'tabular-nums' }}>peso {d.peso}</span>
                </div>
                <div style={{ fontSize: 13, color: DS.text, fontWeight: 700, lineHeight: 1.3 }}>{d.comp.titulo}</div>
                <div style={{ marginTop: 6, fontSize: 11, color: DS.textSec, fontVariantNumeric: 'tabular-nums' }}>
                  Volume {d.volume} · Proficiência {d.proficiencia} · ↓ {Math.max(0, medianaY - d.proficiencia).toFixed(0)} pp sob a mediana
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${DS.border}`, background: DS.bg, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <SectionHeading style={{ margin: 0 }}>Trajetória longitudinal · amostra</SectionHeading>
          <span style={{ fontSize: 10, color: DS.textMuted }}>amostra de 6 competências × 12 fases</span>
        </div>
        <div style={{ padding: 12, overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 540, fontFamily: 'IBM Plex Sans, sans-serif' }}>
            <thead>
              <tr>
                <th style={{ padding: '4px 8px', textAlign: 'left', fontSize: 10, color: DS.textMuted, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Comp.</th>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(f => (
                  <th key={f} style={{ padding: '4px 4px', fontSize: 10, color: DS.textMuted, fontWeight: 800 }}>{f}ª</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trajetoria.map(c => (
                <tr key={c.id}>
                  <td style={{ padding: '4px 8px', fontSize: 11, color: DS.text, fontWeight: 700, whiteSpace: 'nowrap' }}>C{String(c.n).padStart(2,'0')}</td>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(f => {
                    // Heurística mock — fases iniciais pendentes/atenção, fases avançadas suficientes
                    let cor = DS.borderLight;
                    if (f <= 2) cor = DCN27_ESTADO.pendente.cor;
                    else if (f <= 4) cor = c.n === 21 ? DCN27_ESTADO.precisaMelhorar.cor : DCN27_ESTADO.precisaMelhorar.cor;
                    else if (f <= 8) cor = DCN27_ESTADO.suficiente.cor;
                    else cor = DCN27_ESTADO.suficiente.cor;
                    return (
                      <td key={f} style={{ padding: '4px 2px' }}>
                        <div title={`Fase ${f}`} style={{ width: 24, height: 18, background: cor, borderRadius: 2, opacity: 0.85 }} />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ── Drilldown ─────────────────────────────────────────────────────────────
function BolhaDrilldown({ bolha, medianaX, medianaY, persona, onClose, onAbrirAluno }) {
  const c = bolha.comp;
  const area = DCN27_AREAS[c.area];
  const q = _classifyQuadrante(bolha.volume, bolha.proficiencia, medianaX, medianaY);
  const quad = q ? QUADRANTES[q] : { label: 'Não avaliado', desc: 'Sem APC registrada', cor: DS.textMuted, corBg: DS.bg };
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(10,18,32,0.55)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 200,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: DS.surface, borderRadius: DS.radiusLg, maxWidth: 560, width: '100%',
        maxHeight: '90vh', overflow: 'auto', boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
        fontFamily: 'IBM Plex Sans, sans-serif',
      }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${DS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 6 }}>
              <span style={{ padding: '3px 9px', borderRadius: 100, background: area.cor, color: '#fff', fontSize: 10, fontWeight: 800 }}>
                C{String(c.n).padStart(2,'0')} · {area.label}
              </span>
              <span style={{ padding: '3px 9px', borderRadius: 100, background: quad.corBg, color: quad.cor, fontSize: 10, fontWeight: 800 }}>{quad.label}</span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: DS.text, lineHeight: 1.3 }}>{c.titulo}</div>
          </div>
          <button onClick={onClose} style={{
            width: 30, height: 30, borderRadius: '50%', background: DS.bg,
            border: `1px solid ${DS.border}`, cursor: 'pointer',
            fontSize: 14, color: DS.textSec, fontWeight: 800,
          }}>×</button>
        </div>

        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 13, color: DS.textSec, lineHeight: 1.6 }}>{c.resumo}</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            <Stat label="Volume" valor={bolha.volume} />
            <Stat label="Proficiência" valor={bolha.proficiencia ?? '—'} sub={bolha.proficiencia ? 'APC consolidada' : 'sem APC'} />
            <Stat label="Peso composto" valor={bolha.peso} sub="mock · NDE" />
          </div>

          <div style={{ padding: '10px 12px', background: quad.corBg, borderRadius: DS.radiusSm, fontSize: 12, color: DS.textDark, lineHeight: 1.55 }}>
            {persona === 'aluno' && q === 'prioridade' && 'Esta competência tem poucas atividades registradas e proficiência baixa. Comece pelos Capi-Cards, depois questões dirigidas. Logo abaixo, um plano sugerido.'}
            {persona === 'aluno' && q === 'atencao' && 'Você tem alta exposição mas proficiência ainda baixa. Procure feedback com seu tutor — pode haver lacuna conceitual antes da execução.'}
            {persona === 'aluno' && q === 'confirmar' && 'Boa proficiência com pouca atividade. Vale registrar mais APCs para confirmar o domínio.'}
            {persona === 'aluno' && q === 'dominio' && 'Competência consolidada. Mantenha o registro de APCs para manter o histórico.'}
            {persona === 'tutor' && 'Verifique distribuição entre alunos da turma. Casos abaixo da mediana podem se beneficiar de plano dirigido.'}
            {persona === 'coord' && 'Gap institucional candidato. Cruzar com cobertura curricular real antes de decisão do NDE.'}
            {!q && 'Sem APC registrada. Competência não pode ser posicionada no gráfico até receber pelo menos uma avaliação observada.'}
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {persona === 'aluno' && (
              <button style={{ padding: '9px 14px', borderRadius: DS.radiusSm, background: DS.blue, color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 800, fontSize: 12 }}>
                Plano dirigido para esta competência ›
              </button>
            )}
            {persona !== 'aluno' && (
              <button onClick={onAbrirAluno} style={{ padding: '9px 14px', borderRadius: DS.radiusSm, background: DS.blueDark, color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 800, fontSize: 12 }}>
                Ver alunos nesta competência ›
              </button>
            )}
            <button onClick={onClose} style={{ padding: '9px 14px', borderRadius: DS.radiusSm, background: 'transparent', color: DS.textSec, border: `1px solid ${DS.border}`, cursor: 'pointer', fontWeight: 700, fontSize: 12 }}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, valor, sub }) {
  return (
    <div style={{ padding: '8px 10px', background: DS.bg, borderRadius: DS.radiusSm, border: `1px solid ${DS.borderLight}` }}>
      <div style={{ fontSize: 10, fontWeight: 800, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: DS.text, fontVariantNumeric: 'tabular-nums', lineHeight: 1.1, marginTop: 2 }}>{valor}</div>
      {sub && <div style={{ fontSize: 10, color: DS.textMuted, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

// ── Util ─────────────────────────────────────────────────────────────────
function _mediana(arr) {
  if (!arr || arr.length === 0) return null;
  const s = [...arr].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 === 1 ? s[m] : (s[m - 1] + s[m]) / 2;
}

Object.assign(window, {
  MatrizCompetenciaScreen, DCN27_PESOS, QUADRANTES, MATRIZ_MOCK_JOAO,
});
