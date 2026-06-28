// SQLite data layer (better-sqlite3). The schema below is intentionally
// shaped like the Supabase/Postgres tables the project plans to use (see
// chats: "Supabase + RLS"), so this layer can be swapped for a hosted
// Postgres later with minimal change. `documents` holds composed/reference
// payloads; the relational tables hold the shared domain entities
// (students, competencies, longitudinal competency states).
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const DB_PATH = join(__dirname, '..', 'med-unidavi.db');

export function openDb() {
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  return db;
}

export function createSchema(db) {
  db.exec(`
    DROP TABLE IF EXISTS competency_states;
    DROP TABLE IF EXISTS institutional_matrix;
    DROP TABLE IF EXISTS coord_matrix;
    DROP TABLE IF EXISTS students;
    DROP TABLE IF EXISTS competencies_dcn27;
    DROP TABLE IF EXISTS competencies_27;
    DROP TABLE IF EXISTS documents;

    -- 27 DCN 2025 competencies (canonical slugs dcn2025_comp_01..27)
    CREATE TABLE competencies_dcn27 (
      id      TEXT PRIMARY KEY,
      area    TEXT NOT NULL,
      n       INTEGER NOT NULL,
      titulo  TEXT NOT NULL,
      resumo  TEXT NOT NULL
    );

    -- 27 competencies in Roman-numeral form (Art. 8º), grouped by eixo
    CREATE TABLE competencies_27 (
      idx     TEXT PRIMARY KEY,
      n       INTEGER NOT NULL,
      titulo  TEXT NOT NULL,
      eixo    TEXT NOT NULL
    );

    CREATE TABLE students (
      id          TEXT PRIMARY KEY,
      nome        TEXT NOT NULL,
      matricula   TEXT,
      turma       TEXT NOT NULL,
      fase        TEXT NOT NULL,
      ingresso    TEXT,
      tutor       TEXT,
      status      TEXT NOT NULL,        -- ok | atencao | risco
      tp          REAL,
      dreyfus_med REAL
    );

    -- Longitudinal programmatic matrix per student (competency x semester)
    CREATE TABLE competency_states (
      student_id TEXT NOT NULL REFERENCES students(id),
      comp_idx   TEXT NOT NULL,
      sem_idx    INTEGER NOT NULL,
      estado     TEXT NOT NULL,         -- suficiente | precisa | insuficiente | pendente
      PRIMARY KEY (student_id, comp_idx, sem_idx)
    );

    -- Institutional aggregate matrix (Coordenação): comp (AS/GS/ES) x fase
    CREATE TABLE coord_matrix (
      comp_id TEXT NOT NULL,
      area    TEXT NOT NULL,
      short   TEXT NOT NULL,
      fase    TEXT NOT NULL,
      estado  TEXT NOT NULL,
      PRIMARY KEY (comp_id, fase)
    );

    -- Composed / reference payloads (dashboard arrays, coord macros, etc.)
    CREATE TABLE documents (
      collection TEXT NOT NULL,
      key        TEXT NOT NULL,
      data       TEXT NOT NULL,         -- JSON
      PRIMARY KEY (collection, key)
    );
  `);
}

export function putDoc(db, collection, key, data) {
  db.prepare('INSERT OR REPLACE INTO documents (collection, key, data) VALUES (?, ?, ?)')
    .run(collection, key, JSON.stringify(data));
}

export function getDoc(db, collection, key) {
  const row = db.prepare('SELECT data FROM documents WHERE collection = ? AND key = ?').get(collection, key);
  return row ? JSON.parse(row.data) : null;
}
