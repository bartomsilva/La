<h1 align="left" margin-top="0">Labook</h1> 
O Labook é uma rede social com o objetivo de promover a conexão e interação entre pessoas. Quem se cadastrar no aplicativo poderá criar e curtir publicações.

<span id='indice'></span>
## Índice:

- <a href="#layout">Layout</a>
- <a href="#requests">Requisições</a>
- <a href="#example">Exemplo de Requisições</a>
- <a href="#comorodar">Como rodar este projeto</a>
- <a href="#tecnologias">Tecnologias Utilizadas</a>
- <a href="#link">Documentação</a>
- <a href="#author">Pessoas autoras</a>
- <a href="#next">Considerações sobre este projeto</a>
<hr/>

<span id="layout"></span>
<a href="#indice">:arrow_backward:Indíce</a>
	
## Layout: 
#### a) Estrutura das pastas
<img src="https://github.com/bartomsilva/Labook-backend/assets/106079184/eac02979-d853-46b0-b1c0-733986533028" height="40%"/>

#### b) Endpoints implementados
- [X]  Singup
- [X]  Login 
- [X]  Create post
- [X]  Get posts 
- [X]  Edit post
- [X]  Delete post
- [X]  Like / Dislike post
<hr/>
<span id="requests"></span>
<a href="#indice">:arrow_backward:Indíce</a>

## Requisições (Paths): 
#### Requisições de Usuários
- /users
#### Requisições de Posts
- /posts

<hr/>
<span id="example"></span>
<a href="#indice">:arrow_backward:Indíce</a>

## Exemplos de requisição:
### users
#### POST posts/singup
Permite o cadastro de um usuário e retorna um token. 

#### POST posts/login 
Permite o usuário efetuar login e devolve um token. 



<hr/>
<span id='comorodar'></span>
<a href="#indice">:arrow_backward:Indíce</a>

## 📄 Como rodar este projeto:

<p>Caso queira baixar e instalar este projeto em seu computador, é necessário que tenha o git e o node instalados.</p>

### Links:  <a href="https://nodejs.org/en">Node</a> - <a href="https://git-scm.com/">Git</a>

<p>Se já tem ambos instalados ou após instalar, siga os passos abaixo:</p>

```bash

# Copie o link a baixo

https://github.com/bartomsilva/labecommerce-backend.git

# Abra um terminal e digite o seguinte comando

git clone (cole a url aqui)

# acesse a página criada 

cd labecommerce-backend

# Instale as dependências
npm install
ou
yarn install

# Executando o Projeto
npm run start
ou 
yarn start

```
<hr/>
<span id="tecnologias"></span>
<a href="#indice">:arrow_backward:Indíce</a>

## 💻 Tecnologias:
<div align="center">

<img src="https://github.com/bartomsilva/labecommerce-backend/assets/106079184/2ecbb441-e22d-4be2-b67b-5fff6f606583" higth="35px"/>
<img src="https://github.com/bartomsilva/labecommerce-backend/assets/106079184/365c791b-268b-45f5-9268-9b1bad354a57" higth="35px"/>
<img src="https://github.com/bartomsilva/labecommerce-backend/assets/106079184/0e5d0c6e-bae0-43c9-b641-2d375361c29a" higth="35px"/><br>
<img src="https://github.com/bartomsilva/labecommerce-backend/assets/106079184/a6ce0cb3-39d8-4d48-af03-9b1ff68a2809" higth="35px"/>
<img src="https://github.com/bartomsilva/labecommerce-backend/assets/106079184/932a21bf-bd42-4b0c-87f8-8941d86f56f7" higth="35px"/>
<img src="https://github.com/bartomsilva/labecommerce-backend/assets/106079184/bb5f2801-cf54-40da-ab18-1878173a177b" higth="35px"/>
</div>
<hr/>

<span id="link"></span>

## Documentação: 
https://documenter.getpostman.com/view/26149268/2s946cfEBZ

<span id="author"></span>

## 📫 Pessoas autoras:

<img style="width: 200px; border-radius: 50% 0 " src="https://avatars.githubusercontent.com/u/106079184?s=400&u=753f5466a77193fe7077e495475b242787de0435&v=4" alt="imagem do autor">
<p>Bartolomeu Mariano ( Bart Silva )</p>

linkedin: https://www.linkedin.com/in/bart-silva-br/

<span id='next'></span>

## Considerações sobre este projeto:
Bom, sobre este projeto, gostaria de pontuar algumas coisas:
Com relação aos pedidos, acredito que deveria ser incluído na tabela de itens do pedido ( purchases_products ) a coluna referente
ao valor do produto ( price ), uma vez que sem esse valor registrado, em uma consulta posterior a referência do valor é 
perdida, pelo fato de que os preços podem aumentar ou diminuir, outra questão é a não implementação de uma autorização 
tanto para leitura como para escrita de dados no banco de dados, estes dois pontos, assim como algumas melhorias seram adicionadas
após a correção deste projeto.
<hr/>

