const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

// express.js : lida com as rotas da aplicacao
app.use(express.json());
// cors : lidar com bloqueio de acesso a API
app.use(cors());

// lista de repositorios
const repositories = [];
const likes = [];

function validateRepositoryId(resquest, response, next){

  const { id } = resquest.params;

  if(!isUuid(id)){
    return response.status(400).json("error: id not found");
  }

  return next();
}

app.get("/repositories", (request, response) => {
  // retorna a lista com todos repositorios
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // captura os dados da requisicao
  const { title, url, techs} = request.body;
  // monta a estrutura de um unico repositorio
  const repository = {id: uuid(), title, url, techs};
  // atribui esse repositorio a lista de repositorios
  repositories.push(repository);
  // retorna repositorio cadastrado como resposta ao usuario
  return response.json(repository);
});

app.put("/repositories/:id", validateRepositoryId,  (request, response) => {
  
  const { id } = request.params;
  const { title, url, techs } = request.body;
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0){
    return response.status(400).json("error: repository not found");
  }

  const repository = { id, title, url, techs}

  repositories[repositoryIndex] = repository;
  return response.status(200).json(repository);

});

app.delete("/repositories/:id", validateRepositoryId,  (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0){
    return response.status(400).json("error: repository not found");
  }
  repositories.splice(repositoryIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", validateRepositoryId, (request, response) => {
  const {id} = request.params;
  const { like } = request.body;

  
  const repositoryLikes = {id, like: 1}

  const likeIndex = likes.findIndex(likes => likes.id === id);

  if(likeIndex < 0){
    likes.push(repositoryLikes);
    return response.status(204).json(repositoryLikes);
  }

  likes[likeIndex].like += like;
  return response.json(likes);
});

module.exports = app;
