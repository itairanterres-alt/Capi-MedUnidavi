// Populate the SQLite DB from the canonical mock (data.js). Run with `npm run seed`.
import { openDb, createSchema, putDoc } from './db.js';
import {
  DCN27, COMPETENCIAS_27, COMP_DCN_2025, FASES, DCN27_AREAS, DCN27_ESTADO,
  estadoCelula, dcn27EstadoMock, buildJoaoMatriz, JOAO_SEMESTRES, EVIDENCIAS,
  JOAO_MELO, ALUNOS_MOCK, DASHBOARD, TUTOR_PANEL, COORD,
} from './data.js';

function dcn27ByArea(areaId) { return DCN27.filter(c => c.area === areaId); }

function seed() {
  const db = openDb();
  createSchema(db);

  const tx = db.transaction(() => {
    // competencies
    const insDcn = db.prepare('INSERT INTO competencies_dcn27 (id, area, n, titulo, resumo) VALUES (?,?,?,?,?)');
    DCN27.forEach(c => insDcn.run(c.id, c.area, c.n, c.titulo, c.resumo));

    const ins27 = db.prepare('INSERT INTO competencies_27 (idx, n, titulo, eixo) VALUES (?,?,?,?)');
    COMPETENCIAS_27.forEach((c, i) => ins27.run(c.idx, i + 1, c.titulo, c.eixo));

    // students
    const insStu = db.prepare(`INSERT INTO students (id, nome, matricula, turma, fase, ingresso, tutor, status, tp, dreyfus_med)
      VALUES (@id,@nome,@matricula,@turma,@fase,@ingresso,@tutor,@status,@tp,@dreyfus_med)`);
    ALUNOS_MOCK.forEach(a => insStu.run({
      id: a.id, nome: a.nome, matricula: a.matricula ?? null, turma: a.turma, fase: a.fase,
      ingresso: a.id === 'joao-melo' ? JOAO_MELO.ingresso : null,
      tutor: a.id === 'joao-melo' ? JOAO_MELO.tutor : null,
      status: a.status, tp: a.tp, dreyfus_med: a.dreyfus,
    }));

    // João longitudinal competency states (27 x 5)
    const insState = db.prepare('INSERT INTO competency_states (student_id, comp_idx, sem_idx, estado) VALUES (?,?,?,?)');
    buildJoaoMatriz().forEach(linha => {
      linha.sems.forEach((estado, semIdx) => insState.run('joao-melo', linha.idx, semIdx, estado));
    });

    // Institutional coord matrix (27 AS/GS/ES x 12 fases)
    const insCoord = db.prepare('INSERT INTO coord_matrix (comp_id, area, short, fase, estado) VALUES (?,?,?,?,?)');
    COMP_DCN_2025.forEach(comp => {
      FASES.forEach(f => insCoord.run(comp.id, comp.area, comp.short, f, estadoCelula(comp.id, f)));
    });

    // ── Documents ──
    putDoc(db, 'dashboard', 'main', DASHBOARD);
    putDoc(db, 'tutor', 'panel', TUTOR_PANEL);

    // Profile doc (sub-collections + evidence; matrix is built from relational states)
    putDoc(db, 'profile', 'joao-melo', { ...JOAO_MELO, evidencias: EVIDENCIAS, semestres: JOAO_SEMESTRES });

    // Coordenação overview: presentational aggregates + computed area-eixo heatmap
    const areasEixo = Object.entries(DCN27_AREAS).map(([areaId, area]) => {
      const comps = dcn27ByArea(areaId);
      const dist = comps.reduce((acc, c) => { const e = dcn27EstadoMock(c.id); acc[e] = (acc[e] || 0) + 1; return acc; }, {});
      const total = comps.length;
      const ordem = ['insuficiente', 'precisaMelhorar', 'pendente', 'suficiente'];
      const ordemPct = ordem.map(e => ({ e, pct: (dist[e] || 0) / total }));
      let estado = ordemPct.reduce((a, b) => (a.pct >= b.pct ? a : b)).e;
      if ((dist.suficiente || 0) / total > 0.5) estado = 'suficiente';
      return { areaId, label: area.label, cor: area.cor, total, dist, estado, E: DCN27_ESTADO[estado] };
    });
    // matrix cell map for CoordMatriz27x12: "AS-01|1ª" -> estado
    const matrizCells = {};
    COMP_DCN_2025.forEach(comp => FASES.forEach(f => { matrizCells[`${comp.id}|${f}`] = estadoCelula(comp.id, f); }));

    putDoc(db, 'coord', 'overview', {
      ...COORD,
      compDcn: COMP_DCN_2025,
      fases12: FASES,
      areasEixo,
      matrizCells,
      estadoMeta: DCN27_ESTADO,
    });
  });
  tx();

  const n = db.prepare('SELECT COUNT(*) c FROM competency_states').get().c;
  console.log(`Seed OK — ${ALUNOS_MOCK.length} students, ${n} competency-state rows, ${COMP_DCN_2025.length * FASES.length} coord cells.`);
  db.close();
}

seed();
