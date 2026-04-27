# Link Hub

Link Hub e uma alternativa propria ao Linktree, criada para centralizar links profissionais de Haynan Kerlin em uma pagina estatica, responsiva e pronta para GitHub Pages.

O projeto usa apenas HTML, CSS e JavaScript puro. Nao depende de backend, banco de dados, frameworks ou bibliotecas externas. A primeira versao funciona abrindo o arquivo `index.html` no navegador e tambem quando publicada no GitHub Pages.

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

Opcao simples:

1. Abra a pasta `link-hub`.
2. Clique duas vezes em `index.html`.
3. O site sera aberto diretamente no navegador.

Opcao com servidor local, caso prefira simular uma publicacao:

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

Troque os valores `#` pelos links reais quando tiver uma comunidade, contato, WhatsApp, Telegram, formulario ou pagina de captura.

Para editar o texto dos botoes, altere o objeto `LINK_CONTENT` no mesmo arquivo.

## Rastreamento de cliques

A funcao `trackClick(linkName)` esta em:

```text
assets/js/app.js
```

Ela registra:

- nome do botao clicado;
- horario do clique;
- pagina atual;
- origem simples via `document.referrer`;
- evento para Google Analytics, se `gtag` estiver disponivel.

Na primeira versao, os eventos aparecem no console do navegador. Depois, a mesma funcao pode ser conectada a um endpoint proprio.

## Google Analytics

O arquivo abaixo ja esta preparado para GA4:

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

1. Crie um repositorio no GitHub chamado `link-hub`.
2. Envie todos os arquivos deste projeto para o repositorio.
3. No GitHub, acesse `Settings`.
4. Entre em `Pages`.
5. Em `Build and deployment`, selecione `Deploy from a branch`.
6. Escolha a branch `main` e a pasta `/root`.
7. Salve.

O GitHub Pages publicara o site em um endereco parecido com:

```text
https://seu-usuario.github.io/link-hub/
```

O GitHub Pages oferece HTTPS automaticamente em dominios `github.io`. Futuramente tambem e possivel configurar um dominio proprio.

## Conteudo em desenvolvimento

Pontos preparados para evolucao do hub publico:

- comunidade WhatsApp ou Telegram;
- canais de contato;
- materiais de estudo;
- projetos publicados;
- referencias tecnicas;
- dashboard de cliques;
- endpoint proprio para analytics.

O projeto segue totalmente estatico e compativel com GitHub Pages.

## Evolucao com backend Flask

Quando o projeto precisar de recursos dinamicos, uma API Flask pode ser criada separadamente para:

- registrar cliques em banco de dados;
- administrar links por painel;
- criar dashboard de acessos;
- gerar links rastreaveis;
- proteger rotas administrativas.

Uma arquitetura simples futura:

```text
frontend estatico no GitHub Pages
        ↓
API Flask hospedada em outro servico
        ↓
banco de dados para cliques, conteudos e configuracoes
```

O frontend atual ja deixa um ponto natural para essa integracao dentro da funcao `trackClick`.

## Licenca

Use, edite e evolua este projeto livremente para fins pessoais, educacionais ou profissionais.
