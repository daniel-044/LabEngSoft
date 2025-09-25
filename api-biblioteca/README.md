npm install cors
Utilizamos o framework Express e sqlite para o banco de dados.

Utilizamos curls para os requests

URL base: http://localhost:3000/livros

listar:
GET http://localhost:3000/livros

listar por id:
GET http://localhost:3000/livros/:id

Criar livro:
POST
curl --location 'http://localhost:3000/livros' \
--header 'Content-Type: application/json' \
--data '{
  "titulo": "A metamorfose",
  "autor": "Paulo",
  "paginas": 300,
  "ano": 2015
}'

Atualizar livro:
PUT
curl --location --request PUT 'http://localhost:3000/livros/:id' \
--header 'Content-Type: application/json' \
--data '{"titulo":"O Hobbit - Revisado","autor":"Tolkien","paginas":315,"ano":22222}'

Deletar livro:
DELETE
curl --location --request DELETE 'http://localhost:3000/livros/:id'



