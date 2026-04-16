# Banco API Performance

## Introdução

Este repositório contém testes de performance desenvolvidos em **JavaScript** com **k6** para validar o comportamento da API em cenários de autenticação e transferências.

---

## Tecnologias utilizadas

- **JavaScript**
- **k6**
- **JSON** para massa de dados e configuração local

---

## Estrutura do repositório

```text
.
├── config/
│   └── config.local.json
├── fixtures/
│   ├── postLogin.json
│   └── postTransferencias.json
├── helpers/
│   └── autenticacao.js
├── tests/
│   ├── login.test.js
│   └── transferencias.test.js
├── utils/
│   └── variaveis.js
├── .gitignore
├── html-report.html
└── README.md
```

---

## Objetivo de cada grupo de arquivos (pastas)

### `config/`
Contém arquivos de configuração local do projeto.  
No caso deste repositório, o arquivo `config.local.json` armazena a URL base padrão da API.

### `fixtures/`
Contém os arquivos com dados usados nos testes, como payloads JSON para autenticação e transferências.

### `helpers/`
Reúne funções auxiliares e reaproveitáveis para apoiar a execução dos testes.  
O arquivo `autenticacao.js`, por exemplo, centraliza comportamentos relacionados à autenticação.

### `tests/`
Contém os arquivos principais de teste executados pelo k6.  
Atualmente o projeto possui cenários voltados para:
- login
- transferências

### `utils/`
Armazena funções utilitárias compartilhadas entre os testes.  
O arquivo `variaveis.js` é responsável por obter a `BASE_URL`, priorizando a variável de ambiente e usando a configuração local como fallback.

---

## Modo de instalação e execução do projeto

### Pré-requisitos

Antes de executar o projeto, tenha instalado:

- [k6](https://grafana.com/docs/k6/latest/set-up/install-k6/)

### Clonando o repositório

```bash
git clone https://github.com/juliana-munhoz/banco-api-performance.git
cd banco-api-performance
```

### Executando um teste

Exemplo de execução do teste de login:

```bash
k6 run tests/login.test.js
```

Exemplo de execução do teste de transferências:

```bash
k6 run tests/transferencias.test.js
```

### Executando com `BASE_URL` informada no terminal

A execução dos testes pode utilizar a variável de ambiente `BASE_URL`, mas ela é **opcional**. Quando não for informada, o projeto utiliza o valor definido no arquivo local de configuração, e quando informada, ela sobrescreve o valor configurado no arquivo `config/config.local.json`.

Isso permite executar os testes tanto com uma URL definida dinamicamente no terminal quanto com uma configuração local padrão.

Exemplo:

```bash
k6 run tests/transferencias.test.js \ -e BASE_URL=http://localhost:3000
```

### Execução com acompanhamento do relatório em tempo real

Para acompanhar a execução pelo dashboard web do k6 em tempo real:

```bash
K6_WEB_DASHBOARD=true k6 run tests/login.test.js
```

### Execução com exportação do relatório HTML

Para exportar o relatório ao final da execução:

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run tests/login.test.js
```

### Execução com dashboard, exportação e `BASE_URL`

Também é possível combinar tudo no mesmo comando:

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html BASE_URL=https://sua-api.com k6 run tests/login.test.js
```

Exemplo para o teste de transferências:

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html BASE_URL=https://sua-api.com k6 run tests/transferencias.test.js
```

---

## Observações

- A variável `BASE_URL` é opcional.
- Na ausência da variável de ambiente, o projeto utiliza `config/config.local.json`.
- O arquivo `html-report.html` pode ser gerado ao final da execução quando a exportação do dashboard estiver habilitada.
