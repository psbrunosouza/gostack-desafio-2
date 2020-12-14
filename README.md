## Desafio: criação de um backend

Criação de um backend para armazenar repositórios.

O backend deveria conter uma lista de repositórios, com os seguintes campos: id, title, techs ["..., ..."], likes. 
```JSON
  repositories = {
    id,
    title, 
    techs = [],
    likes
  }
```

### Sobre a criação

o id foi gerado pela biblioteca **uuidv4**, que gera ids únicos.

- post: localhost:3333/repositories
os campos foram preenchidos por meio de arquivo JSON, transitados pelo **request.body**, dessa forma era possível criar um repositório 
com todas as informações preenchidas por meio de uma requisição POST, que retornava o repositório criado com informação de sucesso.

- get: localhost:3333/repositories
Para retornar a listagem foi simples, pois retornamos o array com toda a listagem de dados já preenchido anteriormente.

- put: localhost:3333/repositories/:id
para a atualização criei um middleware que verificava se o ID existia ou não, utilizando a função do próprio uuidv4, chamada **isUuid(id)**,
com essa verificação realizada, podiamos capturar os dados enviados pelo **request.body** e atualizar os campos.

- delete: localhost:3333/repositories/:id
no delete eu também utilizei o middleware de validação do id, caso existisse ai o arquivo era deletado com a função splice.

- likes: localhost:3333/repositories/:id/likes
para os likes eu criei uma estrutura de dados separadas, que continha id, like (quantidade de likes), por ser um post, o valor era sempre
criado novamente, ao invés de ser atualizado, e possuia conexão com o projeto através do id passado através do request.param.

```JSON
  likes = {
    id,
    likes
  }
```
