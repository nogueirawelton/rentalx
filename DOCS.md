Config Link: https://www.notion.so/ESLint-e-Prettier-Trilha-Node-js-d3f3ef576e7f45dfbbde5c25fa662779#eaf6e8bdcabc4d809cdae302e29750da

Coisas a estudar:

DTO
SOLID
Singleton
Multer
Stream Node
Swagger
Injeção de dependencias
ORM
Testes unitários
Testes de Integração {
  -> routes -> controllers -> useCases -> repository
  <- repository <- useCases <-controllers <- routes
}
TDD: Metodologia Test Driven Development

docker build -t (nome do projeto) (caminho do arquivo docker)
docker ps -a -> Listar todos containers
docker rm (nome/id do container) -> Remove o container
docker start (nome/id do container) -> Executa o container
docker stop (nome/id do container) -> Para o container
docker-compose up -> Executa o container
docker-compose up -d -> Executa o container em background
docker-compose down -> Remove o container
docker-compose logs -> Lista os logs do container
docker-compose start -> Inicia o container
docker-compose stop -> Para o container
docker exec -it id/nome do container /bin/bash -> Acessa o terminal do container
docker logs id/name do container -> Lista os logs do container
docker-compose up --force-recreate -> Força a atualização de containers
docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' id/name do container -> Mostra o IP do container

Requisitos

