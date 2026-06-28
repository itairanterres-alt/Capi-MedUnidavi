// Generate static JSON snapshots of every API response into web/public/data/.
// Used for the static (serverless-free) Vercel deploy of the demo. The same
// payloads the Express endpoints compose are written to disk here.
import { mkdirSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import {
  DCN27, COMPETENCIAS_27, COMP_DCN_2025, FASES, DCN27_AREAS, DCN27_ESTADO,
  estadoCelula, dcn27EstadoMock, buildJoaoMatriz, JOAO_SEMESTRES, EVIDENCIAS,
  JOAO_MELO, ALUNOS_MOCK, DASHBOARD, TUTOR_PANEL, COORD,
} from './data.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', '..', 'web', 'public', 'data');
mkdirSync(OUT, { recursive: true });
const w = (name, obj) => { writeFileSync(join(OUT, name), JSON.stringify(obj)); console.log('  wrote', name); };

const dcn27ByArea = (areaId) => DCN27.filter(c => c.area === areaId);
const ESTADO_TO_CONCEITO = { suficiente: 'suficiente', precisa: 'precisa', insuficiente: 'insuficiente', pendente: 'pendente' };

// dashboard / tutor
w('dashboard.json', DASHBOARD);
w('tutor-panel.json', TUTOR_PANEL);
w('dcn27.json', DCN27);

// students
w('students.json', ALUNOS_MOCK.map(a => ({ id: a.id, nome: a.nome, matricula: a.matricula ?? null, turma: a.turma, fase: a.fase, status: a.status, tp: a.tp, dreyfus: a.dreyfus })));

// profile (matrix rebuilt from the deterministic generator, like the API)
const linhasMatriz = buildJoaoMatriz();
const byComp = {}; linhasMatriz.forEach(l => { byComp[l.idx] = l.sems; });
const comps27 = COMPETENCIAS_27.map((c, i) => ({ idx: c.idx, titulo: c.titulo, eixo: c.eixo }));
w('joao-melo-profile.json', {
  aluno: { id: JOAO_MELO.id, nome: JOAO_MELO.nome, matricula: JOAO_MELO.matricula, turma: JOAO_MELO.turma, fase: JOAO_MELO.fase, status: JOAO_MELO.statusLabel, tutor: JOAO_MELO.tutor, ingresso: JOAO_MELO.ingresso, subturmas: JOAO_MELO.subturmas },
  competencias27: comps27,
  matrizProgramatica: { semestres: JOAO_SEMESTRES, linhas: comps27.map(c => ({ idx: c.idx, titulo: c.titulo, eixo: c.eixo, sems: (byComp[c.idx] || []).map(e => ESTADO_TO_CONCEITO[e] || e) })) },
  evidencias: EVIDENCIAS,
  ucs: JOAO_MELO.ucs, apcs: JOAO_MELO.apcs, portfolio: JOAO_MELO.portfolio, treino: JOAO_MELO.treino,
  iesc: JOAO_MELO.iesc, ic: JOAO_MELO.ic, atitudinal: JOAO_MELO.atitudinal, statusEnamed: JOAO_MELO.statusEnamed,
});

// coordenação overview
const areasEixo = Object.entries(DCN27_AREAS).map(([areaId, area]) => {
  const comps = dcn27ByArea(areaId);
  const dist = comps.reduce((acc, c) => { const e = dcn27EstadoMock(c.id); acc[e] = (acc[e] || 0) + 1; return acc; }, {});
  const total = comps.length;
  const ordem = ['insuficiente', 'precisaMelhorar', 'pendente', 'suficiente'];
  let estado = ordem.map(e => ({ e, pct: (dist[e] || 0) / total })).reduce((a, b) => (a.pct >= b.pct ? a : b)).e;
  if ((dist.suficiente || 0) / total > 0.5) estado = 'suficiente';
  return { areaId, label: area.label, cor: area.cor, total, dist, estado, E: DCN27_ESTADO[estado] };
});
const matrizCells = {};
COMP_DCN_2025.forEach(comp => FASES.forEach(f => { matrizCells[`${comp.id}|${f}`] = estadoCelula(comp.id, f); }));
w('coordenacao-overview.json', {
  ...COORD,
  competencias27: comps27,
  compDcn: COMP_DCN_2025,
  fases12: FASES,
  areasEixo,
  matrizCells,
  estadoMeta: DCN27_ESTADO,
});

console.log('Static data exported to web/public/data/');
