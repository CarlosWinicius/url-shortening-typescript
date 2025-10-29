# Encurtador de URL (Bun + ElysiaJS + Prisma)

Solução em andamento para o projeto de encurtador de URL do [roadmap.sh](https://roadmap.sh/projects/url-shortening-service).

Este é um serviço de encurtamento de URL criado com uma stack moderna de TypeScript para alta performance, focado em simplicidade e velocidade.

## 🚀 Tech Stack

* **Runtime:** Bun
* **Framework:** ElysiaJS
* **ORM:** Prisma
* **Banco de Dados:** PostgreSQL
* **Documentação:** Elysia Swagger

## 📖 API Endpoints

A API expõe os seguintes endpoints para gerenciamento de links:

---

### `POST /shorten`

Cria um novo link encurtado.

* **Body:**
    ```json
    {
      "url": "string"
    }
    ```
* **Lógica:** Utiliza "Find or Create". Se a URL já foi encurtada anteriormente, retorna o `shortcode` existente. Caso contrário, gera um novo `shortcode` (usando `nanoid`) e o salva no banco.
* **Retorno (Sucesso):** `201 Created`
    ```json
    {
      "id": "cl...",
      "linkurl": "[https://url-original.com](https://url-original.com)",
      "shortcode": "aBcD123",
      "createdAt": "...",
      "updatedAt": "..."
    }
    ```

---

### `GET /shorten/{shortcode}`

Redireciona o usuário para a URL original associada ao `shortcode`.

* **Parâmetro de Rota:**
    * `shortcode` (string): O código único do link.
* **Retorno (Sucesso):** `302 Found` (Redirecionamento)
* **Retorno (Erro):** `44 Not Found` se o `shortcode` não existir.

---

### `PUT /shorten/{shortcode}`

Atualiza a URL de destino de um `shortcode` existente.

* **Parâmetro de Rota:**
    * `shortcode` (string): O código a ser atualizado.
* **Body:**
    ```json
    {
      "url": "string"
    }
    ```
* **Retorno (Sucesso):** `200 OK` com os dados do link atualizado.
* **Retorno (Erro):** `404 Not Found` se o `shortcode` não existir.

---

### `DEL /shorten/{shortcode}`

Deleta um link encurtado do banco de dados.

* **Parâmetro de Rota:**
    * `shortcode` (string): O código a ser deletado.
* **Retorno (Sucesso):** `204 No Content`
* **Retorno (Erro):** `404 Not Found` se o `shortcode` não existir.

---

### `GET /shorten/{shortcode}/stats`

Retorna estatísticas de uso do link, como número de cliques (quando implementado).

* **Parâmetro de Rota:**
    * `shortcode` (string): O código do link.
* **Retorno (Sucesso):** `200 OK`
    ```json
    {
      "shortcode": "aBcD123",
      "originalUrl": "[https://url-original.com](https://url-original.com)",
      "clicks": 0 
    }
    ```

## 🤖 Documentação (Swagger)

A documentação interativa da API é gerada automaticamente pelo `@elysiajs/swagger`.

Após iniciar o servidor, você pode acessá-la e testar todos os endpoints em:
**[http://localhost:3000/swagger](http://localhost:3000/swagger)**

## 🏁 Como Rodar

1.  Clone o repositório.
2.  Crie um arquivo `.env` na raiz e adicione sua `DATABASE_URL` do PostgreSQL.
    ```
    DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO"
    ```
3.  Instale as dependências:
    ```bash
    bun install
    ```
4.  Rode as migrações do banco para criar as tabelas:
    ```bash
    bunx prisma migrate dev
    ```
5.  Inicie o servidor em modo de desenvolvimento:
    ```bash
    bun run src/server.ts
    ```
    (A API estará rodando em `http://localhost:3000`)

## 📄 Licença

Este projeto é de código aberto e está sob a licença MIT.
