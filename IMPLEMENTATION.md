# MED-UNIDAVI 2027 — Implementation

This is the **real implementation** of the MED-UNIDAVI 2027 design bundle (the
prototype lives in `project/`, the design conversation in `chats/`). It is a
production-style **Vite + React** frontend backed by a real **Express + SQLite**
API.

## Scope of this round

Per the handoff discussion, this round implements the **five key screens**
highlighted for the program-coordination ("Caio") review, wired to a real
backend with live data fetching:

1. **Login** — institutional SSO entry (Google Workspace UNIDAVI), feature-flag SSO badge.
2. **Dashboard do Estudante** — Missão do Dia, Semana Padrão / Área Verde, Acesso Rápido, agenda, UCs, avisos.
3. **Perfil do Aluno** — the 9-block longitudinal drilldown (programmatic 27×N matrix with evidence tooltips, UC trajectory, APC/Dreyfus, Status ENAMED, reflective portfolio, 365-day training heatmap, IESC, IC, professionalism), mock student João Melo · T14 · 5ª fase.
4. **Painel do Tutor (Docente)** — clickable tutee cards → Perfil, class-trend chart, reflections awaiting feedback, pending APCs, AI content to validate.
5. **Coordenação** — global filters + student search, per-phase performance heatmap, longitudinal TP-by-cohort chart, faculty production, "Saúde do Banco", the institutional **27 × 12 competency matrix** with a clickable drilldown panel, and the DCN-2025 area-eixo heatmap.

The contextual sidebar (Estudante / Coordenação / Docente), the global **Canal de
Comunicação** FAB, and the contextual **Capi-Chat** panel are all ported. Sidebar
destinations outside these five screens render an honest "out of scope this round"
placeholder (navigation structure preserved).

Every screen is reproduced from the prototype with its inline styling kept
verbatim, so the visual output matches pixel-for-pixel.

## Architecture

```
repo/
├── web/                 # Vite + React frontend (port 5173)
│   ├── src/
│   │   ├── lib/         # DS tokens, asset resolver, API client (useApi hook)
│   │   ├── components/  # ported design system: Sidebar, TopBar, Capi*, Icon, ui primitives, Canal FAB, Capi-Chat
│   │   ├── screens/     # the 5 key screens
│   │   └── App.jsx      # device frames + demo top-nav + routing + data fetching
│   └── public/uploads/  # Capi mascot sprites
└── api/                 # Express + better-sqlite3 backend (port 4000)
    └── src/
        ├── db.js        # schema (Supabase/Postgres-shaped) + helpers
        ├── data.js      # canonical mock + deterministic generators (ported from prototype)
        ├── seed.js      # populates SQLite from data.js
        └── index.js     # REST endpoints (one per screen)
```

### Data layer ("wire a real backend")

The chats call for **Supabase + RLS**. Because this environment has no Supabase
project/credentials, the backend is a real, runnable **Express + SQLite
(better-sqlite3)** service whose schema is intentionally shaped like the target
Postgres tables, so it can be swapped for hosted Supabase with minimal change.

It is genuinely relational where it matters: `students`, `competencies_27` /
`competencies_dcn27`, and a longitudinal `competency_states` table. The Perfil
screen's programmatic matrix is **rebuilt server-side from `competency_states`**
joined to the 27 competencies — not hardcoded in the client. Looser
presentational aggregates (dashboard cards, coordenação macros) live in a
`documents` table. The Canal FAB posts real events to `POST /api/events/canal`.

Endpoints:

| Method | Path | Screen |
|---|---|---|
| GET | `/api/dashboard` | Dashboard |
| GET | `/api/tutor/panel` | Painel do Tutor |
| GET | `/api/coordenacao/overview` | Coordenação |
| GET | `/api/students` `?q=` | Coordenação search / drilldown |
| GET | `/api/students/:id/profile` | Perfil do Aluno |
| GET | `/api/competencies/dcn27` | reference |
| POST | `/api/events/canal` | Canal FAB event log |

## Running locally

```bash
# 1. Backend
cd api
npm install
npm run seed     # build + populate med-unidavi.db
npm start        # http://localhost:4000

# 2. Frontend (separate terminal)
cd web
npm install
npm run dev      # http://localhost:5173  (proxies /api → :4000)
```

Open http://localhost:5173. The demo top-nav switches between Login, Dashboard,
Perfil do Aluno, Painel do Tutor and Coordenação; the Tweaks panel toggles
theme / viewport (split·desktop·mobile) / user name.

## Pedagogical invariants preserved

From the design's non-negotiables: ENAMED **ABDC** (4 alternatives), qualitative
concepts **Suficiente / Precisa melhorar / Insuficiente / Pendente** (no numeric
grade in student views), **Dreyfus 1–5** for APCs (distinct from Ten Cate 1–4),
the **27 DCN-2025 competencies**, protected **Área Verde**, **FSRS** spacing,
single **Capi** persona, mandatory **AI disclaimer** where AI appears, and
data capture indexed by internal id (LGPD).

## Verification

A headless Chromium smoke test exercised all five screens (navigation, live data
render, the Coordenação matrix-cell drilldown): **17/17 content checks passed,
no app console/page errors.** (Google-Fonts fetch is blocked only inside this
sandbox; it loads normally elsewhere.)
