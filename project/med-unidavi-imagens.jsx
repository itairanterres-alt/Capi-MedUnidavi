// MED-UNIDAVI 2027 — Banco de Imagens (ITEM 6)

const DISCIPLINA_CORES = {
  Anatomia:    DS.green,
  Histologia:  DS.blue,
  Embriologia: '#7A5CBF',
  Radiologia:  '#1A6E8A',
  ECG:         DS.terra,
  Patologia:   '#A0421E',
};

const IMAGENS_MOCK = [
  { id: 1,  disciplina: 'Histologia',  titulo: 'Membrana plasmática — MET ×80.000', desc: 'Bicamada fosfolipídica de hepatócito humano. Proteínas integrais visíveis nas regiões escuras.', fonte: 'Histology Guide / Univ. Michigan', licenca: 'CC-BY-NC', autor: 'Univ. Michigan Lab', data: '2024-01', tags: ['membrana', 'célula', 'ultraestrutura'], roteiros: ['Membrana plasmática e transporte celular'], revisor: 'Profa. Paola Lima', fases: ['1ª'] },
  { id: 2,  disciplina: 'Anatomia',    titulo: 'Coração — vista anterior — peça anatômica', desc: 'Dissecção cardíaca mostrando artérias coronárias e ventrículos. Peça fixada em formol 10%.', fonte: 'Wikimedia Commons', licenca: 'CC-BY-SA', autor: 'Patrick J. Lynch', data: '2024-03', tags: ['coração', 'coronárias', 'anatomia'], roteiros: ['Anatomia do coração'], revisor: 'Prof. Rodrigo Carvalho', fases: ['3ª'] },
  { id: 3,  disciplina: 'Histologia',  titulo: 'Tecido muscular cardíaco — H&E', desc: 'Cardiomiócitos com estrias transversais e discos intercalares. Coloração HE. Aumento ×400.', fonte: 'Histology Guide / Univ. Michigan', licenca: 'CC-BY-NC', autor: 'Univ. Michigan Lab', data: '2024-03', tags: ['músculo cardíaco', 'disco intercalar', 'histologia'], roteiros: ['Histologia vascular e cardíaca'], revisor: 'Profa. Paola Lima', fases: ['3ª'] },
  { id: 4,  disciplina: 'Radiologia',  titulo: 'Tórax PA — cardiomegalia grau II', desc: 'Radiografia de tórax em PA mostrando índice cardiotorácico > 0,5. Cefalização vascular presente.', fonte: 'Radiopaedia', licenca: 'CC-BY-NC-SA', autor: 'Dr. Andrew Dixon', data: '2024-02', tags: ['cardiopatia', 'radiografia', 'ICC'], roteiros: ['Anatomia do coração', 'Histologia vascular e cardíaca'], revisor: 'Prof. Marcelo Freitas', fases: ['3ª'] },
  { id: 5,  disciplina: 'ECG',         titulo: 'ECG — IAMCSST inferior (DII, DIII, aVF)', desc: 'Supradesnivelamento de ST em DII, DIII e aVF com espelho em aVL. Ritmo sinusal, FC 88 bpm.', fonte: 'LITFL', licenca: 'Uso educacional com atribuição', autor: 'LITFL Team', data: '2024-04', tags: ['IAMCSST', 'ECG', 'infarto inferior'], roteiros: ['Eletrofisiologia e ECG normal'], revisor: 'Prof. Rodrigo Carvalho', fases: ['3ª'] },
  { id: 6,  disciplina: 'Embriologia', titulo: 'Gastrulação — 3ª semana — corte sagital', desc: 'Formação da linha primitiva e migração do epiblasto para formar o mesoderma intraembrionário.', fonte: 'Embryology UNSW', licenca: 'CC-BY-NC-SA', autor: 'UNSW Embryology', data: '2024-01', tags: ['gastrulação', 'trilaminar', 'embriologia geral'], roteiros: ['Embriologia geral — 1ª semana'], revisor: 'Profa. Camila Souza', fases: ['1ª'] },
  { id: 7,  disciplina: 'Patologia',   titulo: 'Aterosclerose — placa aterosclerótica — H&E', desc: 'Corte transversal de artéria coronária com placa fibroaterosclerótica. Núcleo necrótico e capa fibrosa.', fonte: 'Wikimedia Commons', licenca: 'CC-BY-SA', autor: 'Nephron (Wikimedia)', data: '2024-03', tags: ['aterosclerose', 'coronária', 'placa'], roteiros: ['Histologia vascular e cardíaca'], revisor: 'Prof. Leandro Pires', fases: ['3ª'] },
  { id: 8,  disciplina: 'Histologia',  titulo: 'Tecido epitelial simples colunar — intestino delgado', desc: 'Vilosidade intestinal com enterócitos e células caliciformes. Borda em escova visível. HE ×200.', fonte: 'Histology Guide / Univ. Michigan', licenca: 'CC-BY-NC', autor: 'Univ. Michigan Lab', data: '2024-02', tags: ['epitélio', 'intestino', 'vilosidade'], roteiros: ['Tecido epitelial e glandular'], revisor: 'Profa. Paola Lima', fases: ['1ª'] },
  { id: 9,  disciplina: 'Radiologia',  titulo: 'TC de tórax — DPOC — enfisema centrolobular', desc: 'TC axial de alta resolução (TCAR) mostrando áreas de hipoatenuação centrolobulares típicas de enfisema.', fonte: 'Radiopaedia', licenca: 'CC-BY-NC-SA', autor: 'Dr. Henry Knipe', data: '2024-02', tags: ['DPOC', 'enfisema', 'TC tórax'], roteiros: ['Mecânica respiratória e espirometria'], revisor: 'Prof. Marcelo Freitas', fases: ['3ª'] },
  { id: 10, disciplina: 'ECG',         titulo: 'ECG — fibrilação atrial — resposta ventricular lenta', desc: 'Ausência de ondas P, intervalos RR irregulares, linha de base ondulada. FC ventricular 52 bpm.', fonte: 'LITFL', licenca: 'Uso educacional com atribuição', autor: 'LITFL Team', data: '2024-04', tags: ['FA', 'fibrilação atrial', 'ECG'], roteiros: ['Eletrofisiologia e ECG normal'], revisor: 'Prof. Rodrigo Carvalho', fases: ['3ª'] },
  { id: 11, disciplina: 'Anatomia',    titulo: 'Pulmão — vista mediastinal — peça anatômica', desc: 'Face mediastinal do pulmão esquerdo com impressão cardíaca e ligamento pulmonar. Hilo pulmonar.', fonte: 'Wikimedia Commons', licenca: 'CC-BY-SA', autor: 'Henry Vandyke Carter', data: '2024-02', tags: ['pulmão', 'anatomia', 'mediastino'], roteiros: ['Anatomia das vias aéreas e pulmões'], revisor: 'Prof. Rodrigo Carvalho', fases: ['3ª'] },
  { id: 12, disciplina: 'Patologia',   titulo: 'Fibrose pulmonar — Masson ×100', desc: 'Coloração de Masson mostrando fibras colágenas em azul em parênquima pulmonar com fibrose subpleural.', fonte: 'Wikimedia Commons', licenca: 'CC-BY-SA', autor: 'Nephron (Wikimedia)', data: '2024-03', tags: ['fibrose', 'pulmão', 'patologia'], roteiros: ['Histologia do tecido pulmonar'], revisor: 'Prof. Leandro Pires', fases: ['3ª'] },
  { id: 13, disciplina: 'Embriologia', titulo: 'Desenvolvimento cardíaco — 4ª semana — tubo cardíaco', desc: 'Formação do tubo cardíaco primitivo e início da dobramento cardíaco. Vista ventral do embrião.', fonte: 'Embryology UNSW', licenca: 'CC-BY-NC-SA', autor: 'UNSW Embryology', data: '2024-03', tags: ['coração', 'embriologia cardíaca', '4ª semana'], roteiros: ['Anatomia do coração'], revisor: 'Profa. Camila Souza', fases: ['3ª'] },
  { id: 14, disciplina: 'Histologia',  titulo: 'Neurônio multipolar — corno anterior medula — Nissl', desc: 'Neurônio motor com corpúsculos de Nissl bem evidentes (RER rugoso). Coloração de Nissl ×400.', fonte: 'Histology Guide / Univ. Michigan', licenca: 'CC-BY-NC', autor: 'Univ. Michigan Lab', data: '2024-03', tags: ['neurônio', 'medula', 'Nissl'], roteiros: ['Tecido nervoso — neurônio e glia'], revisor: 'Profa. Paola Lima', fases: ['1ª'] },
  { id: 15, disciplina: 'Radiologia',  titulo: 'RX coluna lombar — osteoporose — vértebra em cunha', desc: 'Fratura por compressão de L1 com vértebra em cunha. Redução da altura anterior do corpo vertebral.', fonte: 'Radiopaedia', licenca: 'CC-BY-NC-SA', autor: 'Dr. Bruno Di Muzio', data: '2024-01', tags: ['osteoporose', 'fratura', 'coluna'], roteiros: ['Osteologia geral e coluna vertebral'], revisor: 'Prof. Marcelo Freitas', fases: ['2ª'] },
  { id: 16, disciplina: 'ECG',         titulo: 'ECG — BAV de 2º grau tipo Wenckebach (Mobitz I)', desc: 'Prolongamento progressivo do PR até bloqueio de uma onda P. Padrão típico de Wenckebach.', fonte: 'LITFL', licenca: 'Uso educacional com atribuição', autor: 'LITFL Team', data: '2024-04', tags: ['BAV', 'Wenckebach', 'bloqueio AV'], roteiros: ['Eletrofisiologia e ECG normal'], revisor: 'Prof. Rodrigo Carvalho', fases: ['3ª'] },
  { id: 17, disciplina: 'Patologia',   titulo: 'Pneumonia bacteriana — consolidação lobar — H&E', desc: 'Alvéolos repletos de exsudato fibrinopurulento. Hepatização vermelha. Coloração HE ×100.', fonte: 'Wikimedia Commons', licenca: 'CC-BY-SA', autor: 'Nephron (Wikimedia)', data: '2024-02', tags: ['pneumonia', 'consolidação', 'patologia'], roteiros: ['Histologia do tecido pulmonar'], revisor: 'Prof. Leandro Pires', fases: ['3ª'] },
  { id: 18, disciplina: 'Anatomia',    titulo: 'Joelho — ligamentos — dissecção anterior', desc: 'LCA, LCP, meniscos medial e lateral expostos em dissecção de joelho direito. Vista anterior com flexão de 90°.', fonte: 'Wikimedia Commons', licenca: 'CC-BY-SA', autor: 'Henry Vandyke Carter', data: '2024-01', tags: ['joelho', 'LCA', 'ligamentos'], roteiros: ['Artrologia — articulações sinoviais'], revisor: 'Prof. Rodrigo Carvalho', fases: ['2ª'] },
  { id: 19, disciplina: 'Embriologia', titulo: 'Desenvolvimento renal — rim metanéfrico — 5ª semana', desc: 'Formação do rim definitivo a partir do blastema metanéfrico e broto ureteral. Corte sagital.', fonte: 'Embryology UNSW', licenca: 'CC-BY-NC-SA', autor: 'UNSW Embryology', data: '2024-02', tags: ['rim', 'metanéfrico', 'desenvolvimento'], roteiros: ['Embriologia geral — 1ª semana'], revisor: 'Profa. Camila Souza', fases: ['1ª', '4ª'] },
  { id: 20, disciplina: 'Histologia',  titulo: 'Acervo UNIDAVI — Tecido conjuntivo frouxo — Weigert', desc: 'Fibras elásticas marcadas em azul-escuro com Weigert. Coloração institucional do laboratório UNIDAVI.', fonte: 'Acervo institucional UNIDAVI', licenca: 'Uso educacional', autor: 'Lab. Histologia UNIDAVI', data: '2024-04', tags: ['conjuntivo', 'fibras elásticas', 'UNIDAVI'], roteiros: ['Tecido conjuntivo e suas variedades'], revisor: 'Profa. Paola Lima', fases: ['1ª'] },
];

// ── Placeholder visual ────────────────────────────────────────────────────────
function ImgCardPlaceholder({ disciplina, width = '100%', height = 140 }) {
  const cor = DISCIPLINA_CORES[disciplina] || '#888';
  return (
    <div style={{
      width, height, borderRadius: DS.radius,
      background: `repeating-linear-gradient(135deg, ${cor}14 0px, ${cor}14 8px, ${cor}06 8px, ${cor}06 18px)`,
      border: `1.5px dashed ${cor}50`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
    }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: cor, letterSpacing: '0.5px' }}>{disciplina.toUpperCase()}</span>
      <span style={{ fontSize: 9, fontFamily: 'monospace', color: cor, opacity: 0.6 }}>imagem placeholder</span>
    </div>
  );
}

// ── Hub — Grid de imagens ─────────────────────────────────────────────────────
function ImagensGrid({ onSelectImagem, onCuradoria, onNavigate, isMobile }) {
  const [filtroDisciplina, setFiltroDisciplina] = React.useState('todas');
  const [filtroFase, setFiltroFase] = React.useState('todas');
  const [busca, setBusca] = React.useState('');

  const disciplinas = ['todas', ...Object.keys(DISCIPLINA_CORES)];
  const fases = ['todas', '1ª', '2ª', '3ª', '4ª'];

  const imagensFiltradas = IMAGENS_MOCK.filter(img =>
    (filtroDisciplina === 'todas' || img.disciplina === filtroDisciplina) &&
    (filtroFase === 'todas' || img.fases.includes(filtroFase)) &&
    (!busca || img.titulo.toLowerCase().includes(busca.toLowerCase()) || img.tags.some(t => t.includes(busca.toLowerCase())))
  );

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <TopBar
        title="Banco de Imagens"
        subtitle="Curadoria educacional · Anatomia · Histologia · Embriologia · Radiologia · ECG · Patologia"
        isMobile={isMobile}
        breadcrumb={onNavigate ? [
          { label: 'Início', onClick: () => onNavigate('dashboard') },
          { label: 'Banco de Imagens' },
        ] : undefined}
        actions={<Btn variant="primary" size="sm" onClick={onCuradoria}>+ Adicionar imagem</Btn>}
      />
      <div style={{ padding: isMobile ? '14px' : '20px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Busca */}
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: DS.textMuted }}>🔍</span>
          <input
            value={busca} onChange={e => setBusca(e.target.value)}
            placeholder="Buscar por título ou tag…"
            style={{ width: '100%', padding: '10px 14px 10px 36px', border: `1.5px solid ${DS.border}`, borderRadius: DS.radius, fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13, color: DS.text, background: DS.surface, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* Filtros */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {disciplinas.map(d => (
              <button key={d} onClick={() => setFiltroDisciplina(d)} style={{
                padding: '5px 12px', borderRadius: 100,
                border: `1.5px solid ${filtroDisciplina === d ? (DISCIPLINA_CORES[d] || DS.blue) : DS.border}`,
                background: filtroDisciplina === d ? (DISCIPLINA_CORES[d] || DS.blue) : DS.surface,
                color: filtroDisciplina === d ? '#fff' : DS.textSec,
                fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 11, cursor: 'pointer',
              }}>{d.charAt(0).toUpperCase() + d.slice(1)}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, color: DS.textMuted, alignSelf: 'center' }}>Fase:</span>
            {fases.map(f => (
              <button key={f} onClick={() => setFiltroFase(f)} style={{
                padding: '4px 10px', borderRadius: 100,
                border: `1.5px solid ${filtroFase === f ? DS.blue : DS.border}`,
                background: filtroFase === f ? DS.blueLight : DS.surface,
                color: filtroFase === f ? DS.blue : DS.textSec,
                fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: 11, cursor: 'pointer',
              }}>{f}</button>
            ))}
          </div>
        </div>

        <div style={{ fontSize: 12, color: DS.textMuted }}>{imagensFiltradas.length} imagens encontradas</div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
          {imagensFiltradas.map(img => (
            <div
              key={img.id}
              onClick={() => onSelectImagem(img)}
              style={{ background: DS.surface, borderRadius: DS.radiusLg, border: `1px solid ${DS.border}`, overflow: 'hidden', cursor: 'pointer', boxShadow: DS.shadow, transition: 'box-shadow 0.15s, transform 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = DS.shadowMd; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = DS.shadow; e.currentTarget.style.transform = 'none'; }}
            >
              <ImgCardPlaceholder disciplina={img.disciplina} height={110} />
              <div style={{ padding: '10px 12px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: DS.text, lineHeight: 1.3, marginBottom: 4 }}>{img.titulo}</div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  <Badge color={DISCIPLINA_CORES[img.disciplina] || DS.textMuted}>{img.disciplina}</Badge>
                  <Badge color={DS.textMuted}>{img.licenca.split(' ')[0]}</Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isMobile && <div style={{ height: 60 }} />}
      </div>
    </div>
  );
}

// ── Modal de visualização ampliada ────────────────────────────────────────────
function ImagensModal({ imagem, onFechar }) {
  if (!imagem) return null;
  return (
    <div
      onClick={onFechar}
      style={{ position: 'fixed', inset: 0, background: 'rgba(10,18,32,0.75)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: DS.surface, borderRadius: DS.radiusLg, maxWidth: 680, width: '100%', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.45)' }}
      >
        {/* Imagem */}
        <ImgCardPlaceholder disciplina={imagem.disciplina} width="100%" height={240} />

        <div style={{ padding: '20px 24px' }}>
          {/* Título e disciplina */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 800, color: DS.text, lineHeight: 1.3 }}>{imagem.titulo}</h2>
              <p style={{ margin: 0, fontSize: 13, color: DS.textSec, lineHeight: 1.6 }}>{imagem.desc}</p>
            </div>
            <button onClick={onFechar} style={{ background: DS.bg, border: `1px solid ${DS.border}`, borderRadius: 8, cursor: 'pointer', padding: '6px 10px', fontSize: 13, color: DS.textMuted, flexShrink: 0 }}>✕ Fechar</button>
          </div>

          {/* Metadados */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 16 }}>
            {[
              { label: 'Disciplina', valor: imagem.disciplina },
              { label: 'Fonte', valor: imagem.fonte },
              { label: 'Licença', valor: imagem.licenca },
              { label: 'Autor/Instituição', valor: imagem.autor },
              { label: 'Incluído em', valor: imagem.data },
              { label: 'Revisor', valor: imagem.revisor },
            ].map(m => (
              <div key={m.label} style={{ background: DS.bg, borderRadius: DS.radiusSm, padding: '8px 12px' }}>
                <div style={{ fontSize: 10, color: DS.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>{m.label}</div>
                <div style={{ fontSize: 12, color: DS.text, fontWeight: 500 }}>{m.valor}</div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tags estruturais</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {imagem.tags.map(t => <Badge key={t} color={DS.textMuted}>{t}</Badge>)}
              {imagem.fases.map(f => <Badge key={f} color={DS.blue}>{f} Fase</Badge>)}
            </div>
          </div>

          {/* Vinculações */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: DS.textMuted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Vinculações (roteiros e cards)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {imagem.roteiros.map(r => (
                <div key={r} style={{ padding: '8px 12px', background: DS.blueLight, borderRadius: DS.radiusSm, fontSize: 12, color: DS.blue, fontWeight: 500 }}>
                  📋 Roteiro: {r}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Curadoria docente ─────────────────────────────────────────────────────────
function ImagensCuradoria({ onVoltar, isMobile }) {
  const [form, setForm] = React.useState({
    titulo: '', disciplina: 'Histologia', fase: '3ª', descricao: '',
    fonte: '', licenca: 'CC-BY-SA', autor: '', tags: '', revisor: '',
  });
  const [enviado, setEnviado] = React.useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const InputRow = ({ label, field, type = 'text', options }) => (
    <div>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 5 }}>{label}</label>
      {options ? (
        <select value={form[field]} onChange={e => set(field, e.target.value)} style={{ width: '100%', padding: '9px 12px', border: `1.5px solid ${DS.border}`, borderRadius: DS.radius, fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13, color: DS.text, background: DS.surface, boxSizing: 'border-box' }}>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : type === 'textarea' ? (
        <textarea value={form[field]} onChange={e => set(field, e.target.value)} rows={3} style={{ width: '100%', padding: '9px 12px', border: `1.5px solid ${DS.border}`, borderRadius: DS.radius, fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13, color: DS.text, resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
      ) : (
        <input type="text" value={form[field]} onChange={e => set(field, e.target.value)} style={{ width: '100%', padding: '9px 12px', border: `1.5px solid ${DS.border}`, borderRadius: DS.radius, fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13, color: DS.text, outline: 'none', boxSizing: 'border-box' }} />
      )}
    </div>
  );

  if (enviado) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, gap: 16 }}>
        <div style={{ fontSize: 48 }}>✅</div>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: DS.text }}>Imagem enviada para curadoria</h2>
        <p style={{ margin: 0, fontSize: 14, color: DS.textSec, textAlign: 'center', maxWidth: 360, lineHeight: 1.6 }}>
          A imagem "{form.titulo}" foi submetida e aguarda revisão por par docente antes de ser publicada no banco.
        </p>
        <Btn variant="primary" onClick={onVoltar}>Voltar ao banco de imagens</Btn>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg }}>
      <div style={{ padding: '16px 32px', background: DS.surface, borderBottom: `1px solid ${DS.border}`, display: 'flex', gap: 12, alignItems: 'center' }}>
        <button onClick={onVoltar} style={{ background: 'none', border: 'none', cursor: 'pointer', color: DS.blue, fontWeight: 700, fontSize: 13, fontFamily: 'IBM Plex Sans, sans-serif', padding: 0 }}>← Banco de imagens</button>
        <span style={{ color: DS.textMuted }}>/</span>
        <span style={{ fontWeight: 700, fontSize: 14, color: DS.text }}>Incluir nova imagem</span>
      </div>
      <div style={{ padding: isMobile ? '16px' : '24px 40px', maxWidth: 620, display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Upload placeholder */}
        <div style={{ width: '100%', height: 160, background: `repeating-linear-gradient(45deg, ${DS.blueLight}, ${DS.blueLight} 8px, ${DS.bg} 8px, ${DS.bg} 18px)`, border: `2px dashed ${DS.blue}50`, borderRadius: DS.radiusLg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}>
          <span style={{ fontSize: 32 }}>📤</span>
          <span style={{ fontSize: 13, color: DS.blue, fontWeight: 700 }}>Clique para fazer upload</span>
          <span style={{ fontSize: 11, color: DS.textMuted }}>PNG, JPG, TIFF — máx 20 MB</span>
          <span style={{ marginTop: 6 }}><StatusFlag kind="flag" criterio="aguarda integração com endpoint multer" /></span>
        </div>

        <InputRow label="Título da imagem" field="titulo" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <InputRow label="Disciplina" field="disciplina" options={Object.keys(DISCIPLINA_CORES)} />
          <InputRow label="Fase" field="fase" options={['1ª', '2ª', '3ª', '4ª', '5ª']} />
        </div>
        <InputRow label="Descrição / legenda" field="descricao" type="textarea" />
        <InputRow label="Fonte" field="fonte" />
        <InputRow label="Licença" field="licenca" options={['CC-BY', 'CC-BY-SA', 'CC-BY-NC', 'CC-BY-NC-SA', 'Uso educacional com atribuição', 'Acervo institucional UNIDAVI']} />
        <InputRow label="Autor / Instituição" field="autor" />
        <InputRow label="Tags (separadas por vírgula)" field="tags" />
        <InputRow label="Revisor docente" field="revisor" />

        <div style={{ display: 'flex', gap: 12, paddingTop: 4 }}>
          <Btn variant="primary" onClick={() => form.titulo && setEnviado(true)}>Enviar para curadoria ›</Btn>
          <Btn variant="ghost" onClick={onVoltar}>Cancelar</Btn>
        </div>

        {isMobile && <div style={{ height: 60 }} />}
      </div>
    </div>
  );
}

// ── Orquestrador ──────────────────────────────────────────────────────────────
function ImagensScreen({ isMobile, onNavigate }) {
  const [view, setView] = React.useState('grid');
  const [imagemSelecionada, setImagemSelecionada] = React.useState(null);

  if (view === 'curadoria') return <ImagensCuradoria onVoltar={() => setView('grid')} isMobile={isMobile} />;

  return (
    <>
      <ImagensGrid
        isMobile={isMobile}
        onNavigate={onNavigate}
        onSelectImagem={img => setImagemSelecionada(img)}
        onCuradoria={() => setView('curadoria')}
      />
      <ImagensModal imagem={imagemSelecionada} onFechar={() => setImagemSelecionada(null)} />
    </>
  );
}

Object.assign(window, { ImagensScreen, DISCIPLINA_CORES });
