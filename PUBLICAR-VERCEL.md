# Publicar a demo na Vercel (a partir do GitHub)

A demo é um site estático (dados embutidos), então a Vercel publica sem
precisar de servidor. O arquivo `vercel.json` na raiz já ensina a Vercel a
construir o app que está dentro da pasta `web/` — você não configura nada à mão.

> **Importante:** o `vercel.json` precisa estar no GitHub. Se você importou na
> Vercel ANTES de enviar esta versão, era por isso que dava **404** — a Vercel
> não sabia o que construir. Basta enviar esta versão e ela se conserta sozinha.

## Parte 1 — Atualizar o GitHub (GitHub Desktop)

1. Descompacte o `.zip` mais recente do chat.
2. Copie **todo o conteúdo** para dentro da pasta do repositório
   `Capi-MedUnidavi`, substituindo os arquivos quando perguntar.
3. No GitHub Desktop: escreva um resumo (ex.: `Configuração da Vercel`) →
   **Commit to main** → **Push origin**.

## Parte 2 — Publicar na Vercel

- **Se você JÁ importou o projeto antes:** não precisa fazer nada. Assim que o
  Push terminar, a Vercel republica sozinha em ~1–2 min. Atualize a página da
  demo (Ctrl+F5).
- **Se ainda NÃO importou:** entre em https://vercel.com → **Add New… →
  Project** → escolha **Capi-MedUnidavi** → **Import** → **Deploy**.

No fim aparece o link da demo (ex.: `https://capi-med-unidavi.vercel.app`).

## Se ainda der 404 depois de republicar

Provavelmente a Vercel guardou uma configuração antiga. Conserte assim:

1. No projeto, vá em **Settings → General → Build & Development Settings**.
2. Em **Root Directory**, deixe vazio (raiz). Se preferir o caminho garantido,
   digite **`web`** e clique em **Save**.
   - Se usar `web`: em **Output Directory** deixe `dist` (padrão do Vite).
3. Vá em **Deployments**, abra o último e clique em **Redeploy**.

## Daqui pra frente

Todo **Push** no GitHub Desktop faz a Vercel **republicar sozinha**.
