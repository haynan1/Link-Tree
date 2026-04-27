# Link Hub

Link Hub é uma alternativa própria ao Linktree, criada para centralizar links profissionais de Haynan Kerlin em uma página estática, responsiva e pronta para GitHub Pages.

O projeto usa apenas HTML, CSS e JavaScript puro. Não depende de backend, banco de dados, frameworks ou bibliotecas externas. A primeira versão funciona abrindo o arquivo `index.html` no navegador e também quando publicada no GitHub Pages.

## Estrutura

```text
link-hub/
├── index.html
├── README.md
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── links.js
│   │   ├── analytics.js
│   │   └── app.js
│   └── img/
│       └── avatar-placeholder.svg
└── pages/
    ├── linux.html
    ├── markdown.html
    └── projetos.html
```

## Como rodar localmente

Opção simples:

1. Abra a pasta `link-hub`.
2. Clique duas vezes em `index.html`.
3. O site será aberto diretamente no navegador.

Opção com servidor local, caso prefira simular uma publicação:

```bash
python -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

## Como editar os links

Todos os links principais ficam centralizados em:

```text
assets/js/links.js
```

Exemplo:

```js
const LINKS = {
  github: "https://github.com/haynan1",
  projetos: "./pages/projetos.html",
  linux: "./pages/linux.html",
  markdown: "./pages/markdown.html",
  grupo: "#",
  contato: "#"
};
```

Troque os valores `#` pelos links reais quando tiver uma comunidade, contato, WhatsApp, Telegram, formulário ou outra página pública.

Para editar o texto dos botões, altere o objeto `LINK_CONTENT` no mesmo arquivo.

## Rastreamento de cliques

A função `trackClick(linkName)` está em:

```text
assets/js/app.js
```

Ela registra:

- nome do botão clicado;
- horário do clique;
- página atual;
- origem simples via `document.referrer`;
- evento para Google Analytics, se `gtag` estiver disponível.

Na primeira versão, os eventos aparecem no console do navegador. Depois, a mesma função pode ser conectada a um endpoint próprio.

## Google Analytics

O arquivo abaixo já está preparado para GA4:

```text
assets/js/analytics.js
```

Ele usa o placeholder:

```js
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
```

Para ativar:

1. Crie uma propriedade GA4 no Google Analytics.
2. Substitua `G-XXXXXXXXXX` pelo seu ID real.
3. Descomente o bloco de carregamento do Google Analytics no arquivo `analytics.js`.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub chamado `link-hub`.
2. Envie todos os arquivos deste projeto para o repositório.
3. No GitHub, acesse `Settings`.
4. Entre em `Pages`.
5. Em `Build and deployment`, selecione `Deploy from a branch`.
6. Escolha a branch `main` e a pasta `/root`.
7. Salve.

O GitHub Pages publicará o site em um endereço parecido com:

```text
https://seu-usuario.github.io/link-hub/
```

O GitHub Pages oferece HTTPS automaticamente em domínios `github.io`. Futuramente também é possível configurar um domínio próprio.

## Conteúdo em desenvolvimento

Pontos preparados para evolução do hub público:

- comunidade WhatsApp ou Telegram;
- canais de contato;
- materiais de estudo;
- projetos publicados;
- referências técnicas;
- dashboard de cliques;
- endpoint próprio para analytics.

O projeto segue totalmente estático e compatível com GitHub Pages.

## Evolução com backend Flask

Quando o projeto precisar de recursos dinâmicos, uma API Flask pode ser criada separadamente para:

- registrar cliques em banco de dados;
- administrar links por painel;
- criar dashboard de acessos;
- gerar links rastreáveis;
- proteger rotas administrativas.

Uma arquitetura simples futura:

```text
frontend estático no GitHub Pages
        ↓
API Flask hospedada em outro serviço
        ↓
banco de dados para cliques, conteúdos e configurações
```

O frontend atual já deixa um ponto natural para essa integração dentro da função `trackClick`.

## Licença

Use, edite e evolua este projeto livremente para fins pessoais, educacionais ou profissionais.
