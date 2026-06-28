// =============================================================================
// MED-UNIDAVI · APC Formulário (transacional)
// Carregar APÓS med-unidavi-apc-avaliacao.jsx
// =============================================================================

function APCFormulario({ apc, isMobile, onSalvar, onSubmeter, onVoltar }) {
  const comps = _compByIds(apc.competencias);
  // Estado de avaliação por competência: { compId: { dreyfus, comentario } }
  const [aval, setAval] = React.useState(() => {
    return Object.fromEntries(comps.map(c => [c.id, { dreyfus: null, comentario: '' }]));
  });
  const [narrativaGeral, setNarrativaGeral] = React.useState('');
  const [evidencias, setEvidencias] = React.useState([]);
  const [contextoExtra, setContextoExtra] = React.useState('');

  const setDreyfus = (compId, d) => setAval(s => ({ ...s, [compId]: { ...s[compId], dreyfus: d } }));
  const setComentario = (compId, v) => setAval(s => ({ ...s, [compId]: { ...s[compId], comentario: v } }));

  const evaluadas = comps.filter(c => aval[c.id].dreyfus !== null);
  const completo = evaluadas.length === comps.length && narrativaGeral.trim().length > 0;
  const dreyfusMedio = evaluadas.length === 0
    ? null
    : (evaluadas.reduce((s, c) => s + aval[c.id].dreyfus, 0) / evaluadas.length);

  const addEvidencia = () => setEvidencias([...evidencias, {
    id: `ev-${Date.now()}`,
    nome: `Evidência ${evidencias.length + 1}`,
    tipo: 'observação',
    nota: '',
  }]);
  const removeEvidencia = (id) => setEvidencias(evidencias.filter(e => e.id !== id));
  const updateEvidencia = (id, patch) => setEvidencias(evidencias.map(e => e.id === id ? { ...e, ...patch } : e));

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <TopBar
        title="Avaliar APC"
        subtitle={`${apc.aluno.nome} · ${apc.aluno.turma} · ${apc.aluno.fase} · ${apc.epa}`}
        isMobile={isMobile}
        breadcrumb={[
          { label: 'Painel do Tutor', onClick: onVoltar },
          { label: 'Avaliações Pendentes', onClick: onVoltar },
          { label: 'Avaliar' },
        ]}
      />

      <div style={{ padding: isMobile ? 14 : '24px 32px', display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 1100, margin: '0 auto' }}>

        {/* ── Cabeçalho do contexto ── */}
        <Card style={{ padding: isMobile ? 14 : 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
            <APCContextoItem label="EPA observada"          valor={apc.epa} />
            <APCContextoItem label="Cenário"                valor={apc.cenario} />
            <APCContextoItem label="Aluno"                  valor={`${apc.aluno.nome} · ${apc.aluno.turma} · ${apc.aluno.fase}`} />
            <APCContextoItem label="Observado em / Prazo"   valor={`${apc.data} · até ${apc.prazo}`} />
            <APCContextoItem label="Preceptor"              valor={apc.preceptor} />
            <APCContextoItem label="Competências DCN"
              valor={
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 2 }}>
                  {comps.map(c => (
                    <span key={c.id} title={c.titulo} style={{
                      padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 800, color: '#fff',
                      background: DCN27_AREAS[c.area].cor,
                    }}>C{String(c.n).padStart(2, '0')} · {c.titulo.length > 26 ? c.titulo.slice(0, 26) + '…' : c.titulo}</span>
                  ))}
                </div>
              } />
          </div>
        </Card>

        {/* ── Régua Dreyfus por competência ── */}
        <Card style={{ padding: isMobile ? 14 : 18 }}>
          <SectionHeading>Avaliação por competência — Dreyfus 1–5</SectionHeading>
          <div style={{ fontSize: 11.5, color: DS.textMuted, marginBottom: 14, lineHeight: 1.55 }}>
            Marque o nível observado em <strong>cada</strong> competência. A escala é Dreyfus —
            atribua o nível pelo desempenho na situação observada, não pela fase do aluno.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {comps.map(c => (
              <APCBlocoCompetencia
                key={c.id}
                comp={c}
                aval={aval[c.id]}
                onSetDreyfus={(d) => setDreyfus(c.id, d)}
                onSetComentario={(v) => setComentario(c.id, v)}
                isMobile={isMobile}
              />
            ))}
          </div>
        </Card>

        {/* ── Narrativa geral ── */}
        <Card style={{ padding: isMobile ? 14 : 18 }}>
          <SectionHeading>Devolutiva narrativa ao aluno</SectionHeading>
          <div style={{ fontSize: 11.5, color: DS.textMuted, marginBottom: 10, lineHeight: 1.55 }}>
            Estruture em 3 partes: <strong>1.</strong> O que observei. <strong>2.</strong> Que aspectos foram positivos.
            <strong> 3.</strong> O que praticar antes da próxima APC.
          </div>
          <textarea
            value={narrativaGeral}
            onChange={(e) => setNarrativaGeral(e.target.value)}
            placeholder="A anamnese teve boa estrutura cronológica; conduziu a HMA com perguntas abertas e fechou bem na revisão de sistemas. Pontos a praticar: nomear os achados negativos relevantes; checar uso de medicações de venda livre; explicitar entendimento da queixa antes de avançar para HPP."
            rows={5}
            style={{
              width: '100%', padding: '12px 14px', borderRadius: DS.radiusSm,
              border: `1px solid ${DS.border}`, fontFamily: 'IBM Plex Sans, sans-serif',
              fontSize: 13, color: DS.text, resize: 'vertical', minHeight: 110, lineHeight: 1.6,
            }}
          />
        </Card>

        {/* ── Evidências ── */}
        <Card style={{ padding: isMobile ? 14 : 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
            <SectionHeading style={{ margin: 0 }}>Evidências anexadas ({evidencias.length})</SectionHeading>
            <button onClick={addEvidencia} style={{
              padding: '7px 14px', borderRadius: DS.radiusSm,
              background: DS.blue, color: '#fff', border: 'none', cursor: 'pointer',
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 11,
            }}>+ Adicionar evidência</button>
          </div>
          {evidencias.length === 0 ? (
            <div style={{
              padding: 16, textAlign: 'center', border: `1px dashed ${DS.border}`,
              borderRadius: DS.radiusSm, fontSize: 12, color: DS.textMuted, lineHeight: 1.6,
            }}>
              Sem evidências anexadas. Recomendado: ao menos uma observação estruturada (mini-CEX) ou
              registro do aluno. Anexos de áudio, vídeo ou foto são opcionais — LGPD aplicada (consentimento prévio).
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {evidencias.map(ev => (
                <div key={ev.id} style={{
                  padding: '10px 12px', borderRadius: DS.radiusSm,
                  background: DS.bg, border: `1px solid ${DS.borderLight}`,
                  display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '140px 140px 1fr 30px', gap: 8, alignItems: 'center',
                }}>
                  <input value={ev.nome} onChange={(e) => updateEvidencia(ev.id, { nome: e.target.value })}
                    style={{ padding: '6px 10px', borderRadius: DS.radiusSm, border: `1px solid ${DS.border}`, fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12 }} />
                  <select value={ev.tipo} onChange={(e) => updateEvidencia(ev.id, { tipo: e.target.value })}
                    style={{ padding: '6px 10px', borderRadius: DS.radiusSm, border: `1px solid ${DS.border}`, fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, background: '#fff' }}>
                    <option value="observação">observação estruturada</option>
                    <option value="mini-cex">mini-CEX</option>
                    <option value="dops">DOPS</option>
                    <option value="audio">áudio</option>
                    <option value="video">vídeo</option>
                    <option value="foto">foto</option>
                    <option value="prontuario">prontuário (referência)</option>
                  </select>
                  <input value={ev.nota} onChange={(e) => updateEvidencia(ev.id, { nota: e.target.value })}
                    placeholder="Nota curta — onde foi capturada, contexto…"
                    style={{ padding: '6px 10px', borderRadius: DS.radiusSm, border: `1px solid ${DS.border}`, fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12 }} />
                  <button onClick={() => removeEvidencia(ev.id)} title="Remover"
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: DS.terra, fontSize: 16, fontWeight: 800 }}>×</button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* ── Contexto extra (privado) ── */}
        <Card style={{ padding: isMobile ? 14 : 18 }}>
          <SectionHeading>Notas para a coordenação (privadas — não visíveis ao aluno)</SectionHeading>
          <textarea
            value={contextoExtra}
            onChange={(e) => setContextoExtra(e.target.value)}
            placeholder="Sinais de risco, atitudinais não imediatamente compartilháveis, contexto familiar. Apenas para a coordenação. LGPD aplicada."
            rows={3}
            style={{
              width: '100%', padding: '12px 14px', borderRadius: DS.radiusSm,
              border: `1px solid ${DS.border}`, fontFamily: 'IBM Plex Sans, sans-serif',
              fontSize: 13, color: DS.text, resize: 'vertical', minHeight: 80, lineHeight: 1.6,
            }}
          />
        </Card>

        {/* ── Resumo + ações ── */}
        <Card style={{ padding: isMobile ? 14 : 18, background: DS.bg, borderTop: `3px solid ${DS.blue}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 800, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Resumo da avaliação
              </div>
              <div style={{ display: 'flex', gap: 16, marginTop: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                <div>
                  <span style={{ fontSize: 22, fontWeight: 800, color: DS.text, fontVariantNumeric: 'tabular-nums' }}>
                    {evaluadas.length}
                  </span>
                  <span style={{ fontSize: 12, color: DS.textMuted, marginLeft: 4 }}>/ {comps.length} competências</span>
                </div>
                <div style={{ borderLeft: `1px solid ${DS.border}`, paddingLeft: 16 }}>
                  <div style={{ fontSize: 10, color: DS.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Dreyfus médio</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: dreyfusMedio !== null ? _dreyfusInfo(Math.round(dreyfusMedio)).cor : DS.textMuted, fontVariantNumeric: 'tabular-nums' }}>
                    {dreyfusMedio !== null ? dreyfusMedio.toFixed(1).replace('.', ',') : '—'}
                  </div>
                </div>
                <div style={{ borderLeft: `1px solid ${DS.border}`, paddingLeft: 16 }}>
                  <div style={{ fontSize: 10, color: DS.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Evidências</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: evidencias.length > 0 ? DS.green : DS.textMuted, fontVariantNumeric: 'tabular-nums' }}>
                    {evidencias.length}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button onClick={onVoltar} style={{
                padding: '10px 14px', borderRadius: DS.radiusSm,
                background: 'transparent', color: DS.textSec, border: `1px solid ${DS.border}`,
                cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 12,
              }}>Cancelar</button>
              <button onClick={onSalvar} style={{
                padding: '10px 14px', borderRadius: DS.radiusSm,
                background: DS.surface, color: DS.textDark, border: `1px solid ${DS.border}`,
                cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 12,
              }}>Salvar rascunho</button>
              <button onClick={onSubmeter} disabled={!completo} style={{
                padding: '10px 16px', borderRadius: DS.radiusSm,
                background: completo ? DS.green : DS.borderLight,
                color: completo ? '#fff' : DS.textMuted,
                border: 'none',
                cursor: completo ? 'pointer' : 'not-allowed',
                fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 800, fontSize: 12,
              }}>Submeter ao aluno ›</button>
            </div>
          </div>
          {!completo && (
            <div style={{ marginTop: 10, fontSize: 11, color: DS.textMuted, fontStyle: 'italic' }}>
              Para submeter, preencha Dreyfus em todas as competências e a devolutiva narrativa. As evidências são recomendadas, não obrigatórias.
            </div>
          )}
        </Card>

        {/* Rodapé técnico */}
        <div style={{
          padding: '12px 16px', background: `${DS.blueAcc}08`, borderRadius: 8,
          fontSize: 11, color: DS.textMuted, lineHeight: 1.6, textAlign: 'center',
        }}>
          APC · Dreyfus 1–5 · curadoria docente obrigatória · captura de evento estruturado (LGPD, indexado por ID interno).
          Submissão alimenta o eixo Y (proficiência) da Matriz Competência e o Bloco APCs do Perfil do Aluno.
        </div>

        {isMobile && <div style={{ height: 60 }} />}
      </div>
    </div>
  );
}

// ── Item de contexto (label + valor) ─────────────────────────────────────────
function APCContextoItem({ label, valor }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 800, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
      <div style={{ fontSize: 13, color: DS.text, marginTop: 3, lineHeight: 1.5, fontWeight: 600 }}>{valor}</div>
    </div>
  );
}

// ── Bloco por competência: régua Dreyfus + comentário ──────────────────────
function APCBlocoCompetencia({ comp, aval, onSetDreyfus, onSetComentario, isMobile }) {
  const area = DCN27_AREAS[comp.area];
  const sel = aval.dreyfus;
  const selInfo = sel ? _dreyfusInfo(sel) : null;

  return (
    <div style={{
      padding: 14, borderRadius: DS.radius,
      background: DS.surface, border: `1px solid ${DS.border}`,
      borderLeft: `3px solid ${area.cor}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: area.cor, marginBottom: 2 }}>
            C{String(comp.n).padStart(2, '0')} · {area.label}
          </div>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: DS.text, lineHeight: 1.3 }}>{comp.titulo}</div>
          <div style={{ fontSize: 11, color: DS.textSec, marginTop: 4, lineHeight: 1.5 }}>{comp.resumo}</div>
        </div>
        {selInfo && (
          <div style={{
            padding: '6px 10px', borderRadius: 100,
            background: selInfo.cor, color: '#fff',
            fontSize: 11, fontWeight: 800, whiteSpace: 'nowrap',
          }}>
            Dreyfus {selInfo.n} · {selInfo.label}
          </div>
        )}
      </div>

      {/* Régua Dreyfus 1–5 */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {DREYFUS.map(d => {
          const ativo = sel === d.n;
          return (
            <button key={d.n} onClick={() => onSetDreyfus(d.n)} style={{
              flex: '1 1 130px', minWidth: 110, padding: '10px 12px', borderRadius: DS.radiusSm,
              background: ativo ? d.cor : DS.surface,
              color: ativo ? '#fff' : DS.textDark,
              border: `1.5px solid ${ativo ? d.cor : DS.border}`,
              cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif',
              textAlign: 'left', transition: 'all 0.1s',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 18, fontWeight: 800, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{d.n}</span>
                <span style={{ fontSize: 11, fontWeight: 700 }}>{d.label}</span>
              </div>
              <div style={{ fontSize: 10, color: ativo ? 'rgba(255,255,255,0.85)' : DS.textMuted, marginTop: 4, lineHeight: 1.4 }}>
                {d.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* Comentário por competência */}
      {sel && (
        <textarea
          value={aval.comentario}
          onChange={(e) => onSetComentario(e.target.value)}
          placeholder={`Comentário específico sobre C${String(comp.n).padStart(2, '0')} (opcional, mas recomendado)…`}
          rows={2}
          style={{
            width: '100%', marginTop: 10, padding: '10px 12px', borderRadius: DS.radiusSm,
            border: `1px solid ${DS.border}`, fontFamily: 'IBM Plex Sans, sans-serif',
            fontSize: 12.5, color: DS.text, resize: 'vertical', minHeight: 56, lineHeight: 1.5,
          }}
        />
      )}
    </div>
  );
}

Object.assign(window, { APCFormulario });
