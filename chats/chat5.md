# Migração de conta site

_Started 2026-06-10 18:41 UTC_

---

## User

Vamos atualizar com base no arquivo zip, comecei a editar o site em outra conta, institucional, mas vou desistir por limite muito baixo de uso

## Assistant

_[tool: list_files]_

_[tool: questions_v2]_

## User

Arquivo muito grande 97410 kb, não estou conseguindo compartilhar

## Assistant

Sem problema — 97 MB é grande demais para anexar, mas temos caminhos melhores:

**Opção 1 (mais fácil): link do projeto da outra conta**
Abra o projeto na conta institucional e me cole a URL dele aqui (aquela que contém `/p/<id-do-projeto>`). Se a sua conta atual tiver acesso de visualização (você pode compartilhar o projeto com este seu e-mail), eu consigo ler os arquivos diretamente de lá e copiar só o que mudou — sem zip nenhum.

**Opção 2: pasta local**
Descompacte o zip no seu computador e anexe a **pasta** aqui na conversa (existe a opção de vincular uma pasta local). Aí eu leio os arquivos direto dela.

**Opção 3: só os arquivos alterados**
O peso quase todo deve ser das imagens — que já temos aqui em `uploads/`. Se você souber o que editou (por exemplo, o HTML principal e alguns `.jsx`), pode anexar só esses arquivos de texto, que são leves.

Qual prefere?

## User

https://claude.ai/design/p/3ee4a972-a93c-4b94-9d26-8cc860bb4abb?file=MED-UNIDAVI+2027.html

## Assistant

_[tool: list_files]_

_[tool: read_file]_

Ainda não consigo acessar esse projeto — ele aparece como "não encontrado", o que normalmente significa que esta conta não tem permissão de visualização nele.

Para liberar o acesso, na conta institucional:

1. Abra o projeto lá
2. Clique em **Share / Compartilhar** (no topo)
3. Adicione o e-mail desta conta (o seu Gmail) com acesso de visualização — ou ative o compartilhamento por link ("anyone with the link can view")

Depois me avise que eu tento de novo. Se o compartilhamento entre contas não funcionar, o plano B é a **pasta local**: descompacte o zip no computador e anexe a pasta aqui na conversa — eu leio os arquivos direto dela.

## User

https://claude.ai/design/p/3ee4a972-a93c-4b94-9d26-8cc860bb4abb?file=MED-UNIDAVI+2027.html

## User

C:\Users\1016030\Downloads\Med-UNIDAVI

## User

C:\Users\1016030\Downloads\Med-UNIDAVI

## Assistant

_[tool: tool_search_tool_bm25]_

Eu não consigo acessar o caminho `C:\Users\...` diretamente — colar o endereço da pasta não me dá acesso ao seu computador. É preciso **anexar a pasta pela interface**:

1. Aqui na caixa de mensagem, clique no botão de anexar (clipe/+)
2. Escolha a opção de **adicionar/vincular uma pasta local**
3. Selecione a pasta `C:\Users\1016030\Downloads\Med-UNIDAVI`
4. O navegador vai pedir permissão de acesso — confirme

Quando a pasta estiver vinculada, ferramentas de leitura dela ficam disponíveis para mim e eu consigo explorar os arquivos e trazer as atualizações.

Se essa opção não aparecer no seu anexador, a alternativa é arrastar para a conversa apenas os arquivos leves que mudaram — o `MED-UNIDAVI 2027.html` e os `.jsx` editados (pode selecionar vários de uma vez; só evite as imagens pesadas, que já temos aqui).

## User

BRIEF — XI SAM · acabamento da curadoria e da página do trabalho (4 itens)
Manter design system, contrato do backend e chaves de dados. Itens:
1. Página do trabalho — layout desktop (posters.jsx/tela #/trabalho): hoje renderiza em coluna estreita de leitura mesmo em monitor grande. Em telas ≥ ~1000px, usar largura maior (~900–1100px) com o corpo em 2 colunas (como o modo pôster já faz: Introdução/Objetivo/Metodologia | Resultados/figuras complementares), mantendo a coluna única no celular. Referências e palavras-chave em largura total ao pé.
2. Ficha da curadoria — campos por fase (curadoria-app.jsx): a ficha deve exibir somente os campos que o formulário daquela fase coleta. Concretamente: remover a linha "Orientação" (nenhuma fase coleta mais) e, na 7ª, remover o campo "Conclusão". Rótulo "Resultados esperados" na 7ª (como no pôster). A 8ª permanece como ficou (só Resumo).
3. Ficha da curadoria — seção com figuras (curadoria-app.jsx): quando o campo de texto de uma seção estiver vazio mas existirem figuras atribuídas àquela seção, trocar o aviso vermelho "Campo não preenchido" por nota neutra cinza "(seção apresentada em figura)". Vermelho continua só quando não há nem texto nem figura.
4. Login da curadoria — campo de senha (curadoria-app.jsx): adicionar campo "Senha da curadoria" abaixo do e-mail. Enviar &senha= na chamada ?action=curadoria e senha_curadora no POST de decisão. Guardar a senha junto do e-mail no localStorage para a revalidação automática (item já existente). Mensagem de erro do backend: exibir como veio ("Senha da curadoria incorreta."). Compatibilidade: o backend não exige senha enquanto ela não for configurada — o front pode enviar o campo sempre, vazio inclusive.
Teste de aceite: trabalho da 7ª no desktop em 2 colunas e no celular em 1; ficha da 7ª sem Orientação/Conclusão; seção métodos-em-figura com nota cinza; login com senha errada barra, com senha certa entra e persiste na recarga.

## Assistant

_[tool: list_files]_

_[tool: grep]_

_[tool: grep]_

The project synced. I don't see `posters.jsx` or `curadoria-app.jsx` by those exact names — let me locate them.

_[tool: grep]_

_[tool: grep]_

The brief references `posters.jsx` and `curadoria-app.jsx` — but neither exists in this project. Let me confirm what's actually here versus what the brief assumes.

_[tool: grep]_

Verifiquei o projeto inteiro e preciso ser direto com você sobre um descompasso importante:

**Este projeto (o Remix) não contém os arquivos que a brief pede para editar.** A brief fala em `posters.jsx` (página standalone do trabalho, rota `#/trabalho`) e `curadoria-app.jsx` (app de curadoria com login, senha, fases, integração `?action=curadoria` no backend). Nenhum dos dois existe aqui.

O que este projeto tem de mais próximo é:
- **`med-unidavi-sam.jsx`** — a Vitrine SAM com um **modal** de pôster (`PosterViewerModal`), formulário de submissão e "Meus Trabalhos". Não é uma página standalone em 2 colunas, e não tem ficha de curadoria por fase, login nem senha.
- Não há **nenhum** app de curadoria com backend, fases, campos "Orientação/Conclusão", aviso "Campo não preenchido" etc.

Ou seja: os 4 itens da brief foram escritos para a versão **mais avançada que você construiu na conta institucional** — e essa versão não veio junto. O que chegou aqui (provavelmente via o zip/HANDOFF antigo) é uma geração anterior, sem o módulo de curadoria nem a página do trabalho.

**Para eu conseguir aplicar a brief, preciso desses dois arquivos aqui.** Eles são leves (texto/JSX), então:

1. **Mais simples:** na conta institucional, abra `posters.jsx` e `curadoria-app.jsx`, copie o conteúdo de cada um e cole aqui na conversa (um por mensagem, se for grande). Eu crio os arquivos e aplico os 4 ajustes.
2. **Ou** anexe só esses dois `.jsx` como arquivos (não o zip inteiro de 97 MB).
3. **Ou**, se preferir, eu posso **construir do zero** a página do trabalho em 2 colunas e a ficha/login de curadoria aqui dentro, seguindo a brief e o design system existente — mas aí eu estaria recriando algo que você já fez, possivelmente divergindo do seu backend e das chaves de dados. Não recomendo sem ver os originais.

Como quer seguir? Se conseguir colar os dois arquivos, em seguida eu já executo os 4 itens de uma vez.

## User

não mexa, projeto errado, desconsidere

## Assistant

Entendido — não vou mexer em nada. Desconsiderado. 👍

Quando estiver no projeto certo (ou conseguir trazer os arquivos `posters.jsx` e `curadoria-app.jsx`), é só me chamar que aplico os 4 itens da brief.

