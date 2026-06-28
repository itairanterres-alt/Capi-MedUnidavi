// MED-UNIDAVI API — Express + SQLite. Serves screen-shaped JSON composed from
// the relational tables (students, competencies, competency_states) and the
// reference `documents`. Endpoints map 1:1 to the five key screens.
import express from 'express';
import cors from 'cors';
import { openDb, getDoc } from './db.js';

const db = openDb();
const app = express();
app.use(cors());
app.use(express.json());

const ESTADO_TO_CONCEITO = { suficiente: 'suficiente', precisa: 'precisa', insuficiente: 'insuficiente', pendente: 'pendente' };

app.get('/api/health', (_req, res) => res.json({ ok: true, ts: new Date().toISOString() }));

// 27 DCN competencies (canonical)
app.get('/api/competencies/dcn27', (_req, res) => {
  res.json(db.prepare('SELECT * FROM competencies_dcn27 ORDER BY n').all());
});

// Student cohort (Coordenação search / drilldown)
app.get('/api/students', (req, res) => {
  const { q } = req.query;
  let rows = db.prepare('SELECT id, nome, matricula, turma, fase, status, tp, dreyfus_med AS dreyfus FROM students ORDER BY nome').all();
  if (q && String(q).trim().length >= 2) {
    const needle = String(q).toLowerCase();
    rows = rows.filter(a => a.nome.toLowerCase().includes(needle) || a.id.includes(needle) || (a.matricula || '').includes(needle));
  }
  res.json(rows);
});

// Dashboard (student home)
app.get('/api/dashboard', (_req, res) => {
  res.json(getDoc(db, 'dashboard', 'main'));
});

// Tutor panel (Painel do Tutor / Docente)
app.get('/api/tutor/panel', (_req, res) => {
  res.json(getDoc(db, 'tutor', 'panel'));
});

// Full student profile (Perfil do Aluno · 9 blocks). The programmatic matrix
// is rebuilt from the relational competency_states table joined with the
// 27 competencies — the rest comes from the profile document.
app.get('/api/students/:id/profile', (req, res) => {
  const { id } = req.params;
  const doc = getDoc(db, 'profile', id);
  if (!doc) return res.status(404).json({ error: 'student profile not found', id });

  const comps = db.prepare('SELECT idx, titulo, eixo FROM competencies_27 ORDER BY n').all();
  const states = db.prepare('SELECT comp_idx, sem_idx, estado FROM competency_states WHERE student_id = ? ORDER BY sem_idx').all(id);
  const semestres = doc.semestres || [];
  const byComp = {};
  states.forEach(s => { (byComp[s.comp_idx] ||= [])[s.sem_idx] = ESTADO_TO_CONCEITO[s.estado] || s.estado; });
  const linhas = comps.map(c => ({
    idx: c.idx, titulo: c.titulo, eixo: c.eixo,
    sems: semestres.map((_, i) => byComp[c.idx]?.[i] ?? 'pendente'),
  }));

  res.json({
    aluno: {
      id: doc.id, nome: doc.nome, matricula: doc.matricula, turma: doc.turma, fase: doc.fase,
      status: doc.statusLabel, tutor: doc.tutor, ingresso: doc.ingresso, subturmas: doc.subturmas,
    },
    competencias27: comps,
    matrizProgramatica: { semestres, linhas },
    evidencias: doc.evidencias,
    ucs: doc.ucs, apcs: doc.apcs, portfolio: doc.portfolio, treino: doc.treino,
    iesc: doc.iesc, ic: doc.ic, atitudinal: doc.atitudinal, statusEnamed: doc.statusEnamed,
  });
});

// Coordenação overview (macros, heatmaps, 27x12 matrix cells, drilldown mock)
app.get('/api/coordenacao/overview', (_req, res) => {
  res.json(getDoc(db, 'coord', 'overview'));
});

// Communication-channel event log (Canal FAB) — demonstrates real persistence.
app.post('/api/events/canal', (req, res) => {
  const evt = { ...req.body, ts: new Date().toISOString() };
  // In production this would write to an institutional events table (LGPD: by internal id).
  console.log('[evento institucional]', evt);
  res.json({ ok: true, protocolo: `CANAL-${Date.now().toString(36).toUpperCase()}`, ...evt });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`MED-UNIDAVI API on http://localhost:${PORT}`));
