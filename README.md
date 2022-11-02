# 📝 Projeto Blogs API

![blog](https://user-images.githubusercontent.com/99822908/193403619-0136be91-b5dc-49b0-8229-2a2610d8054e.png)

## 📄 Sobre

Foi desenvolvido uma API e um banco de dados para a produção de conteúdo para um blog!

## 📋 Execute o projeto em sua máquina

Clone o repositório:

```
git clone git@github.com:jpoliveiramateus/blogs-api.git
```
<details>
  <summary><strong>🐋 Rodando no Docker vs Localmente</strong></summary>
  
  ## 👉 Com Docker
 
  **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**


  > :information_source: Rode os serviços `node` e `db` com o comando `docker-compose up -d --build`.

  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers;

  - Esses serviços irão inicializar um container chamado `blogs_api` e outro chamado `blogs_api_db`;

  - A partir daqui você pode rodar o container `blogs_api` via CLI ou abri-lo no VS Code;

  > :information_source: Use o comando `docker exec -it blogs_api bash`.

  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > :information_source: Instale as dependências [**Caso existam**] com `npm install`. (Instale dentro do container)
  
  - **:warning: Atenção:** Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 

  - **:warning: Atenção:** O **git** dentro do container não vem configurado com suas credenciais. Ou faça os commits fora do container, ou configure as suas credenciais do git dentro do container.

  - **:warning: Atenção:** Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

  - ✨ **Dica:** A extensão `Remote - Containers` (que estará na seção de extensões recomendadas do VS Code) é indicada para que você possa desenvolver sua aplicação no container Docker direto no VS Code, como você faz com seus arquivos locais.

  ![sequelize test](./public/remote-container.png)

  <br />
  
  ## 👉 Sem Docker

  > :information_source: Instale as dependências [**Caso existam**] com `npm install`
  
  - **:warning: Atenção:** Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

  - **✨ Dica:** Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.
  - **✨ Dica:** O avaliador espera que a versão do `node` utilizada seja a 16.

  <br/>
</details>

## 👨🏻‍💻 Habilidades

- Endpoints que estão conectados com o banco de dados seguindo os princípios do REST;
- Criar uma API RESTful utilizando a arquitetura MSC (Model-Service-Controller);
- Aplicação em Node.js usando o pacote sequelize para fazer um CRUD de posts;
- Transactions: Uma transação simboliza uma unidade de trabalho indivisível executada do banco de dados de forma independente de outras transações;
- Validar dados das requisições com a biblioteca Joi.

## 🔎 Rotas

### Login

<details>
  <summary><strong>POST /login</strong></summary>
  </br>
  • Se o login for feito com sucesso retorna um token para o usuário.
  </br> 
  • O endpoint deve receber a seguinte estrutura, exemplo:
  
  ```json
  {
    "email": "lewishamilton@gmail.com",
    "password": "123456"
  }
  ```
</details>

### User

<details>
  <summary><strong>POST /user</strong></summary>
  </br>
  • Cadastra um novo usuário, permitindo apenas um email válido, gerando um token.
  </br> 
  • O endpoint deve receber a seguinte estrutura, exemplo:
  
  ```json
  {
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
    // a imagem não é obrigatória
  }
  ```
</details>

<details>
  <summary><strong>GET /user</strong></summary>
  </br>
  • Traz todos users do banco de dados.
  </br>
  • Valida o token - req.authorization.
</details>

<details>
  <summary><strong>GET /user/:id</strong></summary>
  </br>
  • Traz um user por id do banco de dados.
  </br>
  • Valida o token - req.authorization.
</details>

<details>
  <summary><strong>DELETE /user/me</strong></summary>
   </br>
  • Deleta o usuário logado.
  </br>
  • Valida o token - req.authorization.
</details>

### Categories

<details>
  <summary><strong>POST /categories</strong></summary>
  </br>
  • Cadastra uma nova categoria.
  </br>
  • Valida o token - req.authorization.
  </br> 
  • O endpoint deve receber a seguinte estrutura, exemplo:
  
  ```json
  {
    "name": "Typescript"
  }
  ```
</details>

<details>
  <summary><strong>GET /categories</strong></summary>
  </br>
  • Traz todas categorias do banco de dados.
  </br>
  • Valida o token - req.authorization.
</details>

### Post

<details>
  <summary><strong>POST /post</strong></summary>
  </br>
  • Adiciona um novo blog ao usuário logado e vincula as categorias em suas tabelas no banco de dados.
  </br>
  • Valida o token - req.authorization.
  </br> 
  • O endpoint deve receber a seguinte estrutura, exemplo:
  
  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "categoryIds": [1, 2]
  }
  ```
</details>

<details>
  <summary><strong>GET /post</strong></summary>
  </br>
  • Traz todos os blogs post e as categorias do banco de dados.
  </br>
  • Valida o token - req.authorization.
</details>

<details>
  <summary><strong>GET /post/:id</strong></summary>
  </br>
  • Traz o blog post por ID e as categorias do banco de dados.
  </br>
  • Valida o token - req.authorization.
</details>

<details>
  <summary><strong>PUT /post/:id</strong></summary>
  </br>
  • Atualiza o blog post por ID.
  </br>
  • Valida o token - req.authorization.
</details>

<details>
  <summary><strong>DELETE /post/:id</strong></summary>
  </br>
  • Deleta o blog post por ID.
  </br>
  • Valida o token - req.authorization.
</details>

<details>
  <summary><strong>GET /post/search?q=:searchTerm</strong></summary>
  </br>
  • Retornar um array de blogs post que contém em seu título ou conteúdo o termo passado na URL.
  </br>
  • Valida o token - req.authorization.
</details>

## 🛠️ Ferramentas & Metodologias Utilizadas

- [Node.js](https://nodejs.org/en/);
- [Express.js](https://expressjs.com/);
- [MYSQL](https://www.mysql.com/);
- [mysql2](https://www.npmjs.com/package/mysql2);
- [Sequelize(ORM)](https://sequelize.org/);
- [JWT(Autenticação)](https://jwt.io/);
- [Joi](https://joi.dev/api/?v=17.6.0);
- [Docker](https://www.docker.com/);
- JavaScript ES6+;

---
⌨️ desenvolvido por [Jayromberg Lima Santos](https://www.linkedin.com/in/jayromberg-lima-santos) 😄

---

⭐️ Baseado em [João Pedro Oliveira](https://www.linkedin.com/in/jpoliveira7/)
