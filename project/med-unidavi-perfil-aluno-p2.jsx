// =============================================================================
// MED-UNIDAVI · Perfil do Aluno · Parte 2 (Blocos 5-9)
// Carregar APÓS med-unidavi-perfil-aluno.jsx
// =============================================================================

// ── BLOCO 5 — Portfólio Reflexivo (resumo) ────────────────────────────────────
function BlocoPortfolio({ portfolio, isMobile, onAbrirCompleto }) {
  const total = portfolio.reflexoes.length;
  const cats = ['Tutorial', 'IESC', 'Habilidades', 'Morfofuncional', 'Conhecimentos Gerais'];
  const dist = cats.map(c => ({
    cat: c,
    count: portfolio.reflexoes.filter(r => r.categoria === c).length,
  }));
  const ultima = portfolio.reflexoes[0];
  const max = Math.max(...dist.map(d => d.count), 1);

  return (
    <section>
      <SectionHeading action="Ler portfólio completo →" onAction={onAbrirCompleto}>
        Portfólio Reflexivo · resumo
      </SectionHeading>
      <Card style={{ padding: isMobile ? 12 : 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '180px 1fr', gap: 18 }}>
          <div>
            <div style={{ fontSize: 36, fontWeight: 700, color: DS.blueDark, lineHeight: 1, fontFamily: 'IBM Plex Sans, sans-serif' }}>{total}</div>
            <div style={{ fontSize: 12, color: DS.textMuted, marginTop: 4 }}>reflexões publicadas</div>
            {ultima && (
              <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${DS.borderLight}` }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 4 }}>
                  Última reflexão
                </div>
                <div style={{ fontSize: 11, color: DS.textMuted }}>{ultima.data} · {ultima.categoria}</div>
                <div style={{ fontSize: 12, color: DS.textDark, fontWeight: 600, marginTop: 2 }}>{ultima.titulo}</div>
              </div>
            )}
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 8 }}>
              Distribuição por categoria
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {dist.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 130, fontSize: 12, color: DS.textDark, flexShrink: 0 }}>{d.cat}</div>
                  <div style={{ flex: 1, height: 16, background: DS.bg, borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${(d.count / max) * 100}%`, height: '100%', background: DS.blueAcc, borderRadius: 4 }}></div>
                  </div>
                  <div style={{ width: 24, fontSize: 12, fontWeight: 700, color: DS.textDark, textAlign: 'right' }}>{d.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

// ── BLOCO 6 — Atividade de treino (heatmap GitHub-style · 365 dias) ───────────
function BlocoTreino({ treino, isMobile }) {
  // Sinal formativo: queda > 50% no último mês (mantido do heatmap antigo)
  const ultimo = treino[treino.length - 1];
  const penultimo = treino[treino.length - 2];
  const queda = penultimo && ultimo && ultimo.cards < penultimo.cards * 0.5;

  // ── Síntese de atividade diária a partir dos totais mensais ──────────────
  const MES_PT = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  const totalCardsByMonth = {};
  treino.forEach(t => {
    const [m, yy] = t.mes.split('/');
    const mm = String(MES_PT.indexOf(m.toLowerCase()) + 1).padStart(2, '0');
    totalCardsByMonth[`20${yy}-${mm}`] = t.cards;
  });
  const baseMensal = Math.max(60, Math.round(
    treino.reduce((s, t) => s + t.cards, 0) / treino.length * 0.55
  ));

  // Hoje (último dia do grid)
  const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
  const inicio = new Date(hoje); inicio.setDate(inicio.getDate() - 364);

  const hashDay = (d) => {
    const s = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return Math.abs(h);
  };
  const cardsDia = (d) => {
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const totalMes = totalCardsByMonth[key] ?? baseMensal;
    const dim = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    const media = totalMes / dim;
    const h = hashDay(d);
    const dow = d.getDay();
    const isWeekend = dow === 0 || dow === 6;
    const restDay = isWeekend ? (h % 100) < 35 : (h % 100) < 12;
    if (restDay) return 0;
    const variacao = ((h % 121) - 60) / 100; // -0.60..+0.60
    let n = media * (1 + variacao);
    if (isWeekend) n *= 0.55;
    return Math.max(0, Math.round(n));
  };

  // Grade semanal (colunas = semanas; linhas = dias da semana, 0=domingo)
  const cells = [];
  const dia = new Date(inicio);
  while (dia.getDay() !== 0) dia.setDate(dia.getDate() - 1);
  let totalCards = 0, totalDias = 0, maxDay = 0, streakAtual = 0, streakMax = 0, streakTemp = 0;
  while (dia <= hoje) {
    const inRange = dia >= inicio && dia <= hoje;
    const c = inRange ? cardsDia(dia) : null;
    cells.push({ date: new Date(dia), count: c, inRange });
    if (inRange) {
      totalCards += c;
      if (c > 0) { totalDias++; streakTemp++; if (streakTemp > streakMax) streakMax = streakTemp; }
      else streakTemp = 0;
      if (c > maxDay) maxDay = c;
    }
    dia.setDate(dia.getDate() + 1);
  }
  for (let i = cells.length - 1; i >= 0; i--) {
    if (!cells[i].inRange) continue;
    if (cells[i].count > 0) streakAtual++;
    else break;
  }

  const semanas = [];
  for (let i = 0; i < cells.length; i += 7) semanas.push(cells.slice(i, i + 7));

  const corNivel = (c) => {
    if (c === null) return 'transparent';
    if (c === 0) return DS.borderLight;
    if (c <= 3)  return '#9BE5C2';
    if (c <= 8)  return '#52CC93';
    if (c <= 15) return '#2EA572';
    return '#1F7E52';
  };

  const MESES_LBL = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  const mesPos = [];
  let ultimoMes = null;
  semanas.forEach((sem, idxSem) => {
    const primeiroNoRange = sem.find(c => c.inRange);
    if (!primeiroNoRange) return;
    const m = primeiroNoRange.date.getMonth();
    if (m !== ultimoMes) { mesPos.push({ idx: idxSem, label: MESES_LBL[m] }); ultimoMes = m; }
  });

  const fmt = (d) => `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;

  const CELL = isMobile ? 8 : 10;
  const GAP = 2;
  const DOW_W = 18;
  const GRID_W = DOW_W + semanas.length * (CELL + GAP);
  const GRID_H = 7 * (CELL + GAP);

  return (
    <section>
      <SectionHeading>Atividade de treino · últimos 365 dias</SectionHeading>
      <Card style={{ padding: isMobile ? 12 : 18 }}>
        {queda && (
          <div style={{
            marginBottom: 14, padding: '10px 14px', background: DS.amberLight,
            border: `1px solid ${DS.amber}40`, borderRadius: 8,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: DS.amber }}></span>
            <span style={{ fontSize: 12, color: DS.amber, fontWeight: 600 }}>
              Atividade caiu mais de 50% no último mês — sinal formativo para tutoria.
            </span>
          </div>
        )}

        {/* Rótulos de mês */}
        <div style={{ overflowX: 'auto', paddingBottom: 4 }}>
          <div style={{ minWidth: GRID_W, position: 'relative' }}>
            <div style={{ height: 14, position: 'relative', marginLeft: DOW_W }}>
              {mesPos.map((m, i) => (
                <span key={i} style={{
                  position: 'absolute', left: m.idx * (CELL + GAP),
                  fontSize: 10, color: DS.textMuted, fontWeight: 700,
                  textTransform: 'capitalize',
                }}>{m.label}</span>
              ))}
            </div>
            {/* Grade */}
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              {/* Eixo Y: dias da semana (mostra qua e sex) */}
              <div style={{ width: DOW_W, height: GRID_H, position: 'relative' }}>
                {['', 'seg', '', 'qua', '', 'sex', ''].map((d, i) => (
                  <div key={i} style={{
                    position: 'absolute', top: i * (CELL + GAP),
                    fontSize: 9, color: DS.textMuted, height: CELL,
                    lineHeight: `${CELL}px`,
                  }}>{d}</div>
                ))}
              </div>
              {/* Semanas */}
              <div style={{ display: 'flex', gap: GAP }}>
                {semanas.map((sem, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: GAP }}>
                    {Array.from({ length: 7 }, (_, dia) => {
                      const cell = sem[dia];
                      if (!cell) return <div key={dia} style={{ width: CELL, height: CELL }} />;
                      const cor = corNivel(cell.count);
                      const title = cell.inRange
                        ? (cell.count === 0
                          ? `${fmt(cell.date)} · descanso`
                          : `${fmt(cell.date)} · ${cell.count} card${cell.count === 1 ? '' : 's'}`)
                        : '';
                      return (
                        <div key={dia} title={title} style={{
                          width: CELL, height: CELL, borderRadius: 2,
                          background: cor,
                          border: cell.inRange ? `1px solid rgba(0,0,0,0.04)` : 'none',
                          cursor: cell.inRange ? 'help' : 'default',
                        }} />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            {/* Legenda */}
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
              <span style={{ fontSize: 10, color: DS.textMuted }}>menos</span>
              {[0, 1, 5, 10, 20].map((n, i) => (
                <div key={i} title={n === 0 ? '0 cards' : n === 20 ? '16+ cards' : `${n} cards`} style={{
                  width: CELL, height: CELL, borderRadius: 2,
                  background: corNivel(n),
                  border: `1px solid rgba(0,0,0,0.04)`,
                }} />
              ))}
              <span style={{ fontSize: 10, color: DS.textMuted }}>mais</span>
            </div>
          </div>
        </div>

        {/* KPIs agregados */}
        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(5,1fr)', gap: 10 }}>
          {[
            { label: 'Cards revisados (365d)', val: totalCards.toLocaleString('pt-BR') },
            { label: 'Dias ativos', val: `${totalDias} / 365` },
            { label: 'Sequência atual', val: `${streakAtual} ${streakAtual === 1 ? 'dia' : 'dias'}` },
            { label: 'Maior sequência', val: `${streakMax} dias` },
            { label: 'Pico em um dia', val: `${maxDay} cards` },
          ].map((s, i) => (
            <div key={i} style={{ background: DS.bg, padding: 10, borderRadius: 6 }}>
              <div style={{ fontSize: 10, color: DS.textMuted, fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: DS.textDark, marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>{s.val}</div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

// ── BLOCO 7 — IESC e Extensão ─────────────────────────────────────────────────
function BlocoIESC({ iesc, isMobile }) {
  return (
    <section>
      <SectionHeading>IESC e Extensão</SectionHeading>
      <Card style={{ padding: isMobile ? 12 : 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 12 }}>
          {[
            { label: 'Famílias acompanhadas', val: iesc.familias },
            { label: 'Visitas registradas', val: iesc.visitas },
            { label: 'Projetos de educação em saúde', val: iesc.projetos },
            { label: 'Horas de extensão', val: iesc.horas + 'h' },
          ].map((s, i) => (
            <div key={i} style={{ background: DS.bg, padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: DS.blueDark, fontFamily: 'IBM Plex Sans, sans-serif' }}>{s.val}</div>
              <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, fontSize: 11, color: DS.textMuted, fontStyle: 'italic' }}>
          Curricularização da extensão: Resolução CNE/CES nº 7/2018 · mínimo 10% do curso.
        </div>
      </Card>
    </section>
  );
}

// ── BLOCO 8 — Iniciação Científica ────────────────────────────────────────────
function BlocoIC({ ic, isMobile }) {
  const etapas = ['Despertar', 'Pergunta', 'Método', 'Coleta', 'Análise', 'Redação', 'Submissão'];
  const idxAtual = etapas.indexOf(ic.etapa);

  return (
    <section>
      <SectionHeading>Iniciação Científica</SectionHeading>
      <Card style={{ padding: isMobile ? 12 : 18 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14, alignItems: 'center' }}>
          <span style={{
            padding: '4px 10px', borderRadius: 100, background: ic.modalidade === 'NPCMed' ? `${DS.terra}15` : DS.borderLight,
            color: ic.modalidade === 'NPCMed' ? DS.terra : DS.textDark, fontSize: 11, fontWeight: 700,
          }}>{ic.modalidade === 'NPCMed' ? 'Trilha de excelência NPCMed' : ic.modalidade === 'TC' ? 'TC obrigatório' : 'Candidato em avaliação · pipeline NPCMed'}</span>
          {ic.orientador && <span style={{ fontSize: 12, color: DS.textMuted }}>Orientador: <strong style={{ color: DS.textDark }}>{ic.orientador}</strong></span>}
        </div>
        {ic.etapa && idxAtual >= 0 && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 8 }}>
              Trajetória de 8 etapas
            </div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {etapas.map((e, i) => (
                <div key={i} style={{
                  flex: '1 1 80px', padding: '6px 8px', borderRadius: 6,
                  background: i <= idxAtual ? DS.blueDark : DS.borderLight,
                  color: i <= idxAtual ? '#fff' : DS.textMuted,
                  fontSize: 10, fontWeight: 700, textAlign: 'center',
                  border: i === idxAtual ? `2px solid ${DS.blueAcc}` : 'none',
                }}>{e}</div>
              ))}
            </div>
          </div>
        )}
        <div style={{ fontSize: 12, color: DS.textDark, lineHeight: 1.6 }}>
          {ic.descricao}
        </div>
        {ic.producoes && ic.producoes.length > 0 && (
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${DS.borderLight}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 6 }}>Produções</div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: DS.textDark, lineHeight: 1.6 }}>
              {ic.producoes.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
        )}
        {/* F.3 — Meus Trabalhos (Vitrine SAM) ───────────────────────────────── */}
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${DS.borderLight}` }}>
          {typeof MeusTrabalhosSAM !== 'undefined'
            ? <MeusTrabalhosSAM
                alunoNome={ic.alunoNome || 'aluno'}
                isMobile={isMobile}
                onAbrirVitrine={() => window.__setScreen && window.__setScreen('ic')}
              />
            : null}
        </div>
      </Card>
    </section>
  );
}

// ── BLOCO 9 — Profissionalismo / dimensão atitudinal (longitudinal) ───────────
function BlocoAtitudinal({ atitudinal, isMobile }) {
  const compsLigadas = ['IV', 'V', 'XI', 'XII', 'XVII', 'XXII', 'XXIII'];

  return (
    <section>
      <SectionHeading>Profissionalismo · dimensão atitudinal (longitudinal)</SectionHeading>
      <Card style={{ padding: isMobile ? 12 : 18 }}>
        <div style={{
          marginBottom: 14, padding: '10px 12px', background: `${DS.blueAcc}10`,
          borderRadius: 6, fontSize: 11, color: DS.textDark, lineHeight: 1.5,
        }}>
          <strong>Captura formativa, NÃO decisão de progressão.</strong> Síntese global só com triangulação suficiente
          (≥ 3 fontes convergentes em 2 fases consecutivas).
        </div>

        {/* status global */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14, padding: 14,
          background: DS.bg, borderRadius: 8, marginBottom: 14, flexWrap: 'wrap',
        }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
              Status atitudinal global
            </div>
            <div style={{ fontSize: 13, color: DS.textDark, marginTop: 4, lineHeight: 1.5 }}>
              {atitudinal.triangulacaoSuficiente
                ? 'Triangulação suficiente — síntese disponível.'
                : 'Evidência insuficiente para síntese — captura longitudinal em construção.'}
            </div>
          </div>
          {atitudinal.triangulacaoSuficiente
            ? <ConceitoChip tipo={atitudinal.statusGlobal} />
            : <span style={{ fontSize: 11, color: DS.textMuted, fontStyle: 'italic' }}>aguardando triangulação</span>}
        </div>

        {/* fontes */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: 10, marginBottom: 14 }}>
          {[
            { label: 'P-MEX', val: atitudinal.pmex.length, sub: 'observações Tutorial · IESC · Hab.' },
            { label: 'MSF (360°)', val: atitudinal.msf.length, sub: 'aplicações por ciclo' },
            { label: 'Auto-avaliações', val: atitudinal.autoavaliacoes, sub: 'do Portfólio Reflexivo' },
            { label: 'Incidentes críticos', val: atitudinal.incidentes.length, sub: 'registros estruturados' },
          ].map((s, i) => (
            <div key={i} style={{ background: DS.surface, border: `1px solid ${DS.borderLight}`, padding: 10, borderRadius: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: DS.textDark, marginTop: 2 }}>{s.val}</div>
              <div style={{ fontSize: 10, color: DS.textMuted, marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* P-MEX timeline (sparkline) */}
        {atitudinal.pmex.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 8 }}>
              P-MEX por fase × cenário
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {atitudinal.pmex.map((p, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
                  background: DS.bg, borderRadius: 6,
                }}>
                  <span style={{ fontSize: 11, color: DS.textMuted, minWidth: 60 }}>{p.fase}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: DS.textDark, flex: 1 }}>{p.cenario}</span>
                  <span style={{ fontSize: 11, color: DS.textMuted }}>{p.data}</span>
                  <ConceitoChip tipo={p.conceito} size="sm" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* vínculo com competências */}
        <div style={{
          padding: '10px 12px', background: `${DS.blueAcc}08`, borderRadius: 6,
          fontSize: 11, color: DS.textDark, lineHeight: 1.5,
        }}>
          <strong>Vinculação na matriz programática:</strong> este bloco alimenta as competências{' '}
          {compsLigadas.map((c, i) => (
            <span key={i}>
              <code style={{
                padding: '1px 6px', borderRadius: 3, background: DS.blueAcc, color: '#fff',
                fontSize: 10, fontWeight: 700, fontFamily: 'IBM Plex Mono, monospace',
              }}>{c}</code>
              {i < compsLigadas.length - 1 ? ' ' : ''}
            </span>
          ))}{' '}da matriz acima.
        </div>

        <div style={{ marginTop: 12 }}>
          <StatusFlag kind="flag" criterio="aguarda implantação institucional do P-MEX em Tutorial, IESC e Habilidades Profissionais" />
        </div>
      </Card>
    </section>
  );
}

// ── Mock completo: João Melo ──────────────────────────────────────────────────
const JOAO_MELO = {
  nome: 'João Melo',
  matricula: '2024010542',
  turma: 'T14',
  fase: '5ª fase',
  status: 'Atenção',
  tutor: 'Prof. Ângelo',
  ingresso: '2023/2',
  subturmas: {
    tutorial: 'Subgrupo C · Prof. Ângelo · sala 315B',
    habClinicas: 'T B · Profa. Talita',
    habDigital: 'T A · Prof. Lucas',
    iesc: 'Grupo 2 · Profa. Andreia · USF Bela Vista',
  },
  ucs: [
    { fase: '1ª fase', semestre: '2023/2', titulo: 'Bases Biológicas I', conceito: 'suficiente',
      componentes: [
        { tipo: 'TP', detalhe: '54%', conceito: 'suficiente' },
        { tipo: 'Tutorial', detalhe: 'participação regular', conceito: 'suficiente' },
        { tipo: 'Morfofuncional', detalhe: 'todas as estações concluídas', conceito: 'suficiente' },
      ] },
    { fase: '2ª fase', semestre: '2024/1', titulo: 'Bases Biológicas II', conceito: 'suficiente',
      componentes: [{ tipo: 'TP', detalhe: '57%', conceito: 'suficiente' }] },
    { fase: '3ª fase', semestre: '2024/2', titulo: 'Saúde do Adulto I', conceito: 'precisa',
      componentes: [
        { tipo: 'TP', detalhe: '52%', conceito: 'precisa' },
        { tipo: 'Tutorial', detalhe: 'sínteses curtas, baixa articulação', conceito: 'precisa' },
        { tipo: 'OSCE', detalhe: 'estação comunicação 50/100', conceito: 'precisa' },
      ] },
    { fase: '4ª fase', semestre: '2025/1', titulo: 'Saúde do Adulto II', conceito: 'suficiente',
      componentes: [
        { tipo: 'TP', detalhe: '58%', conceito: 'suficiente' },
        { tipo: 'APC', detalhe: '3 APCs Dreyfus 3', conceito: 'suficiente' },
      ] },
    { fase: '5ª fase', semestre: '2025/2', titulo: 'Saúde da Mulher e da Criança', conceito: 'precisa',
      componentes: [
        { tipo: 'TP parcial', detalhe: '49%', conceito: 'precisa' },
        { tipo: 'APC', detalhe: '1 APC Dreyfus 2 (regressão)', conceito: 'precisa' },
        { tipo: 'IESC', detalhe: 'visita domiciliar — registro discreto', conceito: 'precisa' },
      ] },
  ],
  apcs: [
    { data: '12/03/24', semestre: '2024/1', epa: 'EPA-2 Anamnese', dreyfus: 2, avaliador: 'Prof. Ângelo', parecer: 'Coleta com lacunas; reforçar HMA estruturada.' },
    { data: '08/05/24', semestre: '2024/1', epa: 'EPA-2 Anamnese', dreyfus: 2, avaliador: 'Profa. Talita', parecer: 'Boa empatia; faltou aprofundar revisão de sistemas.' },
    { data: '20/09/24', semestre: '2024/2', epa: 'EPA-3 Exame físico', dreyfus: 3, avaliador: 'Prof. Ângelo', parecer: 'Sequência adequada; ainda hesitante em manobras.' },
    { data: '15/03/25', semestre: '2025/1', epa: 'EPA-4 Plano diagnóstico', dreyfus: 3, avaliador: 'Prof. João Silva', parecer: 'Hipóteses bem ranqueadas; justifica com evidência.' },
    { data: '10/05/25', semestre: '2025/1', epa: 'EPA-4 Plano diagnóstico', dreyfus: 4, avaliador: 'Prof. João Silva', parecer: 'Excelente raciocínio — diagnóstico diferencial robusto.' },
    { data: '08/09/25', semestre: '2025/2', epa: 'EPA-2 Anamnese', dreyfus: 2, avaliador: 'Profa. Talita', parecer: 'Regressão — comunicação difícil mal manejada; sinal de Atenção.' },
  ],
  portfolio: {
    reflexoes: [
      { data: '14/09/25', categoria: 'Tutorial', titulo: 'Limites da minha escuta em entrevistas difíceis' },
      { data: '02/09/25', categoria: 'IESC', titulo: 'Visita domiciliar à família BSV-042 — o que aprendi' },
      { data: '20/08/25', categoria: 'Habilidades', titulo: 'Aprendendo manobras semiológicas' },
      { data: '05/08/25', categoria: 'Conhecimentos Gerais', titulo: 'Cuidados paliativos e a morte digna' },
      { data: '15/07/25', categoria: 'Tutorial', titulo: 'Síntese da SP4 — pneumonia comunitária' },
      { data: '02/07/25', categoria: 'Morfofuncional', titulo: 'Histologia do trato gastrointestinal' },
      { data: '20/06/25', categoria: 'IESC', titulo: 'Determinantes sociais no bairro Bela Vista' },
      { data: '05/06/25', categoria: 'Habilidades', titulo: 'Primeira sutura — desafios' },
      { data: '20/05/25', categoria: 'Tutorial', titulo: 'Discussão de SP3 — diabetes tipo 2' },
      { data: '02/05/25', categoria: 'Conhecimentos Gerais', titulo: 'MBE — leitura crítica de RCT' },
      { data: '15/04/25', categoria: 'IESC', titulo: 'Genograma da família BSV-042' },
      { data: '02/04/25', categoria: 'Tutorial', titulo: 'Mapa conceitual SP2' },
      { data: '20/03/25', categoria: 'Habilidades', titulo: 'Aferição de PA — armadilhas' },
      { data: '05/03/25', categoria: 'Morfofuncional', titulo: 'Anatomia do mediastino' },
      { data: '20/02/25', categoria: 'Tutorial', titulo: 'SP1 — síndrome metabólica' },
      { data: '05/02/25', categoria: 'Conhecimentos Gerais', titulo: 'Bioética e confidencialidade' },
      { data: '20/12/24', categoria: 'IESC', titulo: 'Mapa do território Bela Vista' },
      { data: '05/12/24', categoria: 'Tutorial', titulo: 'Reflexão final 4ª fase' },
    ],
  },
  treino: [
    { mes: 'out/24', cards: 220, questoes: 60, retencao: 78 },
    { mes: 'nov/24', cards: 240, questoes: 72, retencao: 80 },
    { mes: 'dez/24', cards: 180, questoes: 50, retencao: 76 },
    { mes: 'jan/25', cards: 90, questoes: 24, retencao: 70 },
    { mes: 'fev/25', cards: 200, questoes: 55, retencao: 78 },
    { mes: 'mar/25', cards: 260, questoes: 80, retencao: 82 },
    { mes: 'abr/25', cards: 240, questoes: 75, retencao: 81 },
    { mes: 'mai/25', cards: 220, questoes: 70, retencao: 80 },
    { mes: 'jun/25', cards: 180, questoes: 55, retencao: 76 },
    { mes: 'jul/25', cards: 200, questoes: 62, retencao: 78 },
    { mes: 'ago/25', cards: 240, questoes: 78, retencao: 80 },
    { mes: 'set/25', cards: 84, questoes: 22, retencao: 68 },
  ],
  iesc: { familias: 1, visitas: 8, projetos: 1, horas: 32 },
  ic: {
    modalidade: 'candidato', // ainda não TC, mas em pipeline NPCMed
    orientador: null,
    etapa: null,
    descricao: 'João está na 5ª fase — antes do TC I obrigatório (7ª/8ª fase). Está sendo avaliado pelo pipeline NPCMed para trilha de excelência: cards de método consolidados, reflexões com viés científico e leituras frequentes em cardiologia.',
    producoes: [],
  },
  atitudinal: {
    triangulacaoSuficiente: true,
    statusGlobal: 'suficiente',
    pmex: [
      { fase: '3ª fase', cenario: 'Tutorial — debate em SP3', data: '12/11/24', conceito: 'suficiente' },
      { fase: '4ª fase', cenario: 'IESC — visita domiciliar', data: '08/04/25', conceito: 'suficiente' },
    ],
    msf: [{ fase: '4ª fase', data: '02/06/25', conceito: 'suficiente' }],
    autoavaliacoes: 4,
    incidentes: [],
  },
};

Object.assign(window, {
  BlocoPortfolio, BlocoTreino, BlocoIESC, BlocoIC, BlocoAtitudinal,
  JOAO_MELO,
});
