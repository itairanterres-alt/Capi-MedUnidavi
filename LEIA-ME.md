# MED-UNIDAVI 2027 — Guia rápido (para o Caio)

Este projeto é a implementação "de verdade" do protótipo MED-UNIDAVI 2027.
São duas partes que rodam juntas:

- **`web/`** — a interface (React + Vite) que o usuário vê no navegador.
- **`api/`** — o servidor de dados (Node + SQLite). Um banco de dados local,
  simples, sem precisar de Supabase nem de nenhum serviço na nuvem.

Por enquanto estão implementadas **5 telas** (Login, Dashboard do Estudante,
Perfil do Aluno, Painel do Tutor e Coordenação), todas puxando dados reais do
servidor.

---

## Como rodar na sua máquina

Pré-requisito: ter o **Node.js 18+** instalado (https://nodejs.org).

Abra **dois terminais**.

### Terminal 1 — o servidor de dados (api)
```bash
cd api
npm install      # só na primeira vez
npm run seed     # cria e popula o banco (só na primeira vez, ou pra resetar)
npm start        # sobe a API em http://localhost:4000
```

### Terminal 2 — a interface (web)
```bash
cd web
npm install      # só na primeira vez
npm run dev      # sobe o site em http://localhost:5173
```

Pronto. Abra **http://localhost:5173** no navegador.

- O menu de cima troca entre Login / Dashboard / Perfil do Aluno / Painel do
  Tutor / Coordenação.
- O painel "Tweaks" (canto inferior direito) troca tema claro/escuro,
  visualização (split/desktop/mobile) e o nome do usuário.

---

## Onde estão as coisas

- **Telas**: `web/src/screens/`
- **Componentes reaproveitáveis** (Sidebar, botões, cores, mascote Capi):
  `web/src/components/` e `web/src/lib/ds.js` (paleta de cores oficial).
- **Dados e regras do backend**: `api/src/data.js` (todo o mock canônico) e
  `api/src/index.js` (os endpoints, um por tela).
- **Banco de dados**: o arquivo `api/med-unidavi.db` é gerado pelo `npm run seed`.

## Detalhes técnicos completos

Estão no arquivo **`IMPLEMENTATION.md`** (em inglês): arquitetura, lista de
endpoints, schema do banco e como ele foi pensado para, no futuro, migrar para
Postgres/Supabase com pouco esforço — se um dia a UNIDAVI quiser.
