# Encurtador de URL (Bun + ElysiaJS + Prisma)

Solução em andamento para o projeto de encurtador de URL do [roadmap.sh](https://roadmap.sh/projects/url-shortening-service).

Este é um serviço de encurtamento de URL criado com uma stack moderna de TypeScript para alta performance.

## 🚀 Tech Stack

* **Runtime:** Bun
* **Framework:** ElysiaJS
* **ORM:** Prisma
* **Banco de Dados:** PostgreSQL

## ✨ Features (Atuais)

* `POST /shorten`: Cria um novo link encurtado.
    * Utiliza lógica "Find or Create": se a URL já foi encurtada, retorna o link existente.
    * Gera `shortcodes` aleatórios e únicos usando `nanoid`.

## 🏁 Como Rodar

1.  Clone o repositório.
2.  Crie um arquivo `.env` e adicione sua `DATABASE_URL` do PostgreSQL.
    ```
    DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO"
    ```
3.  Instale as dependências:
    ```bash
    bun install
    ```
4.  Rode as migrações do banco:
    ```bash
    bunx prisma migrate dev
    ```
5.  Inicie o servidor:
    ```bash
    bun run src/server.ts
    ```
    (A API estará rodando em `http://localhost:3000`)
