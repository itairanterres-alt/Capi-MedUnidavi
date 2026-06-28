// MED-UNIDAVI 2027 — Portfólio Reflexivo · Capi (metodológico)

function PortfolioReflexivoScreen({ isMobile }) {
  const [subTela, setSubTela] = React.useState('dashboard'); // dashboard | nova | visualizar | acompanhamento
  const [categoriaSel, setCategoriaSel] = React.useState('Tutorial');
  const [textoReflexao, setTextoReflexao] = React.useState('');
  const [reflexaoSel, setReflexaoSel] = React.useState(null);
  const [salvando, setSalvando] = React.useState(null); // null | 'rascunho' | 'publicado'
  const [temReflexoes, setTemReflexoes] = React.useState(false); // false = empty state inicial

  const categorias = ['Tutorial', 'IESC', 'Habilidades', 'Internato', 'Acontecimento significativo', 'Reflexão livre'];

  const catColor = {
    'Tutorial': DS.blue, 'IESC': DS.green, 'Habilidades': '#7A5CBF',
    'Internato': DS.terra, 'Acontecimento significativo': DS.amber, 'Reflexão livre': '#6B7FA8',
  };

  const reflexoes = [
    { id: 1, titulo: 'Primeiro contato com a família Silva', categoria: 'IESC', fase: '3ª Fase', uc: 'IESC III', data: '18/04/2026', status: 'publicada', preview: 'A visita domiciliar me trouxe uma perspectiva que a sala de aula não consegue transmitir...' },
    { id: 2, titulo: 'Dificuldade com o exame físico respiratório', categoria: 'Habilidades', fase: '3ª Fase', uc: 'Habilidades III', data: '10/04/2026', status: 'publicada', preview: 'Percebi que minha escuta ainda é pouco sensível às variações sutis da ausculta pulmonar...' },
    { id: 3, titulo: 'Reflexão sobre autonomia no TBL de DPOC', categoria: 'Tutorial', fase: '3ª Fase', uc: 'Morfofuncional III', data: '02/04/2026', status: 'rascunho', preview: 'A dinâmica do TBL me colocou em posição de defender uma hipótese diagnóstica que...' },
    { id: 4, titulo: 'Por que escolhi medicina — revisitando', categoria: 'Reflexão livre', fase: '2ª Fase', uc: 'Livre', data: '15/11/2025', status: 'publicada', preview: 'Com dois anos de curso, a pergunta inicial volta com mais nitidez e também com mais peso...' },
  ];

  const fases = ['1ª Fase', '2ª Fase', '3ª Fase'];

  const promisGibbs = [
    { etapa: 'Descrição', prompt: 'O que aconteceu? Descreva o fato ou situação de forma objetiva.' },
    { etapa: 'Sentimentos', prompt: 'O que você sentiu antes, durante e depois? Que pensamentos surgiram?' },
    { etapa: 'Avaliação', prompt: 'O que foi positivo nessa experiência? O que foi difícil ou problemático?' },
    { etapa: 'Análise', prompt: 'Por que aconteceu assim? Que conhecimentos ou conceitos ajudam a entender?' },
    { etapa: 'Conclusão', prompt: 'O que você aprendeu? O que faria diferente?' },
    { etapa: 'Plano de ação', prompt: 'O que você vai fazer diferente na próxima situação semelhante?' },
  ];

  const cardBase = {
    background: DS.surface, borderRadius: DS.radiusLg,
    border: `1px solid ${DS.border}`, boxShadow: DS.shadow,
  };

  const DISCLAIMER_REFLEXIVO = 'Suas reflexões podem ser lidas pela coordenação para acompanhamento formativo. Não são compartilhadas com colegas. Não são usadas em avaliação somativa.';

  // ─── Sub-tela: Dashboard ──────────────────────────────────────────────────
  if (subTela === 'dashboard') {
    return (
      <div style={{ flex: 1, overflow: 'auto', background: DS.bg, fontFamily: 'IBM Plex Sans, sans-serif' }}>
        <div style={{ padding: isMobile ? '16px' : '20px 32px', background: DS.surface, borderBottom: `1px solid ${DS.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ margin: '0 0 2px', fontSize: isMobile ? 18 : 22, fontWeight: 700, color: DS.text }}>Portfólio Reflexivo</h1>
            <p style={{ margin: 0, fontSize: 12, color: DS.textSec }}>4 reflexões registradas · 3ª Fase em andamento</p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSubTela('nova')}
              style={{ padding: '9px 18px', borderRadius: DS.radius, background: DS.blue, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 13 }}
            >
              + Nova reflexão
            </button>
          </div>
        </div>

        <div style={{ padding: isMobile ? '16px' : '24px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Empty state ou conteúdo */}
          {!temReflexoes ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 20px', gap: 16, maxHeight: '55vh' }}>
              <CapivaraDecorativa size={isMobile ? 110 : 130} />
              <div style={{ textAlign: 'center', maxWidth: 320 }}>
                <h2 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 700, color: DS.text }}>Sua jornada reflexiva começa aqui.</h2>
                <p style={{ margin: '0 0 20px', fontSize: 14, color: DS.textSec, lineHeight: 1.65 }}>
                  Registre sua primeira reflexão. O portfólio acompanha sua formação ao longo das 12 fases.
                </p>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setSubTela('nova')}
                    style={{ padding: '10px 20px', borderRadius: DS.radius, background: DS.blue, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 13 }}
                  >
                    Escrever reflexão
                  </button>
                  <button
                    onClick={() => setTemReflexoes(true)}
                    style={{ padding: '10px 16px', borderRadius: DS.radius, background: 'transparent', border: `1px solid ${DS.border}`, color: DS.textSec, cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12 }}
                  >
                    Ver dados de exemplo
                  </button>
                </div>
              </div>
            </div>
          ) : (<>

          {/* Prompt do dia */}
          <div style={{ ...cardBase, padding: '16px', background: `linear-gradient(135deg, ${DS.blueLight} 0%, #EEF2FB 100%)`, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0, border: `1px solid ${DS.border}` }}>✍</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: DS.text, marginBottom: 4 }}>Prompt reflexivo do dia</div>
              <p style={{ margin: 0, fontSize: 13, color: DS.textSec, lineHeight: 1.6, fontStyle: 'italic' }}>
                "Na última semana, houve um momento clínico, de ensino ou de convivência que te fez questionar algo que você acreditava saber com certeza? O que foi e o que surgiu no lugar dessa certeza?"
              </p>
              <button onClick={() => setSubTela('nova')} style={{ marginTop: 10, padding: '6px 14px', borderRadius: DS.radiusSm, background: DS.blue, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 12 }}>
                Responder ›
              </button>
            </div>
          </div>

          {/* Categorias */}
          <section>
            <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Categorias</h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {categorias.map(c => {
                const count = reflexoes.filter(r => r.categoria === c).length;
                return (
                  <div key={c} style={{ padding: '6px 14px', borderRadius: 100, background: catColor[c] + '18', border: `1.5px solid ${catColor[c]}30`, cursor: 'pointer', display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: catColor[c] }}>{c}</span>
                    {count > 0 && <span style={{ fontSize: 11, fontWeight: 700, color: catColor[c] }}>·{count}</span>}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Linha do tempo */}
          <section>
            <h3 style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Linha do tempo</h3>
            {fases.map(fase => {
              const doFase = reflexoes.filter(r => r.fase === fase);
              if (!doFase.length) return null;
              return (
                <div key={fase} style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: DS.textSec, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: fase === '3ª Fase' ? DS.blue : DS.border }} />
                    {fase}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 20, borderLeft: `2px solid ${DS.borderLight}` }}>
                    {doFase.map(r => (
                      <div
                        key={r.id}
                        onClick={() => { setReflexaoSel(r); setSubTela('visualizar'); }}
                        style={{ ...cardBase, padding: '14px', cursor: 'pointer', transition: 'box-shadow 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.boxShadow = DS.shadowMd}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = DS.shadow}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 4 }}>
                          <div style={{ fontWeight: 600, fontSize: 13, color: DS.text }}>{r.titulo}</div>
                          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                            <span style={{ padding: '2px 8px', borderRadius: 100, background: catColor[r.categoria] + '18', color: catColor[r.categoria], fontSize: 10, fontWeight: 700 }}>{r.categoria}</span>
                            <span style={{ padding: '2px 8px', borderRadius: 100, background: r.status === 'publicada' ? DS.greenLight : DS.amberLight, color: r.status === 'publicada' ? DS.green : DS.amber, fontSize: 10, fontWeight: 700 }}>{r.status}</span>
                          </div>
                        </div>
                        <div style={{ fontSize: 11, color: DS.textMuted, marginBottom: 6 }}>{r.uc} · {r.data}</div>
                        <div style={{ fontSize: 12, color: DS.textSec, lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{r.preview}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>

          {/* Mapa de Competências DCN — placeholder estendido */}
          <section style={{
            background: DS.surface, border: `1.5px dashed ${DS.border}`,
            borderRadius: DS.radius, padding: isMobile ? 18 : 24,
            display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
          }}>
            <CapivaraDecorativa size={48} />
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: DS.text, marginBottom: 4 }}>
                Mapa de Competências DCN
              </div>
              <div style={{ fontSize: 12, color: DS.textSec, lineHeight: 1.6 }}>
                Disponível após primeira avaliação por competência · 27 competências DCN 2025 · 3 eixos:
                <span style={{ color: DS.text, fontWeight: 600 }}> Atenção à Saúde</span> ·
                <span style={{ color: DS.text, fontWeight: 600 }}> Gestão em Saúde</span> ·
                <span style={{ color: DS.text, fontWeight: 600 }}> Educação em Saúde</span>.
              </div>
            </div>
          </section>

          <button onClick={() => setSubTela('acompanhamento')} style={{ alignSelf: 'flex-start', padding: '8px 16px', borderRadius: DS.radius, background: 'transparent', border: `1px solid ${DS.border}`, color: DS.textSec, cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, fontWeight: 600 }}>
            Ver acompanhamento (coordenação) ›
          </button>
          </>)}

          {isMobile && <div style={{ height: 72 }} />}
        </div>
      </div>
    );
  }

  // ─── Sub-tela: Nova reflexão ──────────────────────────────────────────────
  if (subTela === 'nova') {
    const handleSalvar = (tipo) => {
      setSalvando(tipo);
      setTimeout(() => { setSalvando(null); setSubTela('dashboard'); }, 2000);
    };

    return (
      <div style={{ flex: 1, overflow: 'auto', background: DS.bg, fontFamily: 'IBM Plex Sans, sans-serif' }}>
        <div style={{ padding: isMobile ? '14px 16px' : '18px 32px', background: DS.surface, borderBottom: `1px solid ${DS.border}`, display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={() => setSubTela('dashboard')} style={{ padding: '6px 12px', borderRadius: DS.radiusSm, background: 'transparent', border: `1px solid ${DS.border}`, color: DS.textSec, cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, fontWeight: 600 }}>← Voltar</button>
          <div>
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: DS.text }}>Nova reflexão</h1>
            <p style={{ margin: 0, fontSize: 12, color: DS.textSec }}>Portfólio Reflexivo · 3ª Fase</p>
          </div>
        </div>

        <div style={{ padding: isMobile ? '16px' : '24px 32px', display: 'flex', gap: 24, flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start' }}>

          {/* Editor principal */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Disclaimer */}
            <AIDisclaimer text={DISCLAIMER_REFLEXIVO} />

            {/* Categoria */}
            <div style={cardBase}>
              <div style={{ padding: '16px 18px', borderBottom: `1px solid ${DS.borderLight}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Categoria</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {categorias.map(c => (
                    <button
                      key={c}
                      onClick={() => setCategoriaSel(c)}
                      style={{
                        padding: '5px 12px', borderRadius: 100,
                        background: categoriaSel === c ? catColor[c] : 'transparent',
                        border: `1.5px solid ${catColor[c]}`,
                        color: categoriaSel === c ? '#fff' : catColor[c],
                        fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 11,
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                    >{c}</button>
                  ))}
                </div>
              </div>

              {/* Contexto autopreenchido */}
              <div style={{ padding: '12px 18px', borderBottom: `1px solid ${DS.borderLight}`, display: 'flex', gap: 16, flexWrap: 'wrap', background: DS.bg }}>
                {[['Fase', '3ª Fase'], ['UC', 'IESC III'], ['SP / Situação', 'Visita domiciliar BSV-042']].map(([l, v]) => (
                  <div key={l}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase' }}>{l}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: DS.text }}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Editor */}
              <div style={{ padding: '16px 18px' }}>
                <textarea
                  value={textoReflexao}
                  onChange={e => setTextoReflexao(e.target.value)}
                  placeholder="Escreva sua reflexão aqui. Use os prompts Gibbs ao lado como guia, ou escreva livremente."
                  style={{
                    width: '100%', minHeight: 280, padding: '14px', boxSizing: 'border-box',
                    border: `1.5px solid ${DS.border}`, borderRadius: DS.radius,
                    fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 14, color: DS.text,
                    lineHeight: 1.75, resize: 'vertical', outline: 'none', background: DS.surface,
                  }}
                />
                <div style={{ fontSize: 11, color: DS.textMuted, marginTop: 6 }}>{textoReflexao.length} caracteres</div>
              </div>
            </div>

            {/* Botões */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => handleSalvar('rascunho')}
                disabled={!!salvando}
                style={{ padding: '10px 20px', borderRadius: DS.radius, background: 'transparent', border: `1.5px solid ${DS.border}`, color: DS.textSec, cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 13 }}
              >
                {salvando === 'rascunho' ? '✓ Salvo!' : 'Salvar rascunho'}
              </button>
              <button
                onClick={() => handleSalvar('publicado')}
                disabled={!!salvando || textoReflexao.length < 20}
                style={{ padding: '10px 20px', borderRadius: DS.radius, background: textoReflexao.length >= 20 ? DS.blue : DS.border, color: '#fff', border: 'none', cursor: textoReflexao.length >= 20 ? 'pointer' : 'not-allowed', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 13, transition: 'background 0.2s' }}
              >
                {salvando === 'publicado' ? '✓ Publicado!' : 'Publicar reflexão'}
              </button>
            </div>
          </div>

          {/* Painel lateral — prompts Gibbs */}
          {!isMobile && (
            <div style={{ flex: '0 0 280px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: DS.blueLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>✍</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: DS.text }}>Prompts — Modelo Gibbs</div>
              </div>
              {promisGibbs.map((p, i) => (
                <div key={i} style={{ ...cardBase, padding: '12px 14px' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: DS.blue, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>{i + 1}. {p.etapa}</div>
                  <div style={{ fontSize: 12, color: DS.textSec, lineHeight: 1.6 }}>{p.prompt}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── Sub-tela: Visualizar reflexão ───────────────────────────────────────
  if (subTela === 'visualizar' && reflexaoSel) {
    return (
      <div style={{ flex: 1, overflow: 'auto', background: DS.bg, fontFamily: 'IBM Plex Sans, sans-serif' }}>
        <div style={{ padding: isMobile ? '14px 16px' : '18px 32px', background: DS.surface, borderBottom: `1px solid ${DS.border}`, display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={() => setSubTela('dashboard')} style={{ padding: '6px 12px', borderRadius: DS.radiusSm, background: 'transparent', border: `1px solid ${DS.border}`, color: DS.textSec, cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, fontWeight: 600 }}>← Voltar</button>
          <div>
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: DS.text }}>{reflexaoSel.titulo}</h1>
          </div>
        </div>

        <div style={{ padding: isMobile ? '16px' : '24px 32px', maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 18 }}>

          <AIDisclaimer text={DISCLAIMER_REFLEXIVO} />

          {/* Metadados */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[['Categoria', reflexaoSel.categoria], ['Fase', reflexaoSel.fase], ['UC', reflexaoSel.uc], ['Data', reflexaoSel.data], ['Status', reflexaoSel.status]].map(([l, v]) => (
              <div key={l} style={{ padding: '6px 12px', background: DS.surface, borderRadius: DS.radiusSm, border: `1px solid ${DS.border}` }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase' }}>{l}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: DS.text }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Texto */}
          <div style={{ ...cardBase, padding: '24px' }}>
            <p style={{ margin: 0, fontSize: 14, color: DS.text, lineHeight: 1.85 }}>
              {reflexaoSel.preview}<br /><br />
              <span style={{ color: DS.textSec }}>
                [Texto completo da reflexão apareceria aqui. Em produção, o conteúdo seria carregado do banco de dados e renderizado com formatação rica — parágrafos, ênfases, citações bibliográficas.]
              </span>
            </p>
          </div>

          {/* Devolutiva formativa */}
          <div style={{ ...cardBase, padding: '18px', borderLeft: `4px solid ${DS.blue}` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>Devolutiva formativa</div>
            <div style={{ color: DS.textMuted, fontSize: 13, fontStyle: 'italic' }}>Nenhuma devolutiva registrada ainda. O tutor ou coordenador pode adicionar comentários aqui após a leitura.</div>
          </div>

          <button
            onClick={() => setSubTela('nova')}
            style={{ alignSelf: 'flex-start', padding: '9px 18px', borderRadius: DS.radius, background: 'transparent', border: `1.5px solid ${DS.blue}`, color: DS.blue, cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 13 }}
          >
            Complementar reflexão ›
          </button>

          {isMobile && <div style={{ height: 72 }} />}
        </div>
      </div>
    );
  }

  // ─── Sub-tela: Acompanhamento (coordenação) ───────────────────────────────
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: DS.bg, padding: 40, gap: 16, fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <button onClick={() => setSubTela('dashboard')} style={{ alignSelf: 'flex-start', padding: '6px 12px', borderRadius: DS.radiusSm, background: 'transparent', border: `1px solid ${DS.border}`, color: DS.textSec, cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, fontWeight: 600, position: 'absolute', top: 20, left: 20 }}>← Voltar</button>
      <div style={{ fontSize: 48 }}>📖</div>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: DS.text }}>Acompanhamento formativo</h2>
      <p style={{ margin: 0, fontSize: 13, color: DS.textSec, textAlign: 'center', maxWidth: 400, lineHeight: 1.6 }}>
        Leitura formativa das reflexões pelo NDE e tutores. Os portfólios são lidos para acompanhamento longitudinal — nunca para avaliação somativa.
      </p>
      <StatusFlag kind="flag" criterio="aguarda piloto do fluxo de Acompanhamento com 3 tutores" />
    </div>
  );
}

Object.assign(window, { PortfolioReflexivoScreen });
