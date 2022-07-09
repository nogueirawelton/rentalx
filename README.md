<h1 align="center">
  RentalX
</h1>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=E51C44&labelColor=0A1033">

## 💻 Projeto

Serviço de aluguel de carros.

## ✨ Tecnologias

- [ ] Node
- [ ] Typescript
- [ ] Express
- [ ] Prisma
- [ ] Docker
- [ ] JWT
- [ ] PostgreSQL
- [ ] Swagger
- [ ] Jest
- [ ] Nodemailer
- [ ] AWS S3

## :hammer_and_wrench: Requisitos

### Cadastro de Carro

#### Requisitos Funcionais

- Deve ser possível cadastrar um novo carro.

#### Regras de Negócio

- Não deve ser possível cadastrar um carro com uma placa já existente.
- Não deve ser possível cadastrar um carro se o usuário não for administrador \*.
- Deve se cadastrar um carro com disponibilidade por padrão.

### Listagem de Carros

#### Requisito Funcional

- Deve ser possível listar todos os carros disponíveis.
- Deve ser possivel listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possivel listar todos os carros disponíveis pelo nome da marca.
- Deve ser possivel listar todos os carros disponíveis pelo nome do carro (modelo).

#### Regra de Negócio

- Deve ser possível listar os carros mesmo se o usuário não estiver logado.

### Cadastro de Especificação no Carro

#### Requisitos Funcionais

- Deve ser possivel cadastrar especificações para um carro.
- Deve ser possivel listar todas as especificações.
- Deve ser possível listar todos os carros

#### Regras de Negócio

- Não deve ser possivel cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para um mesmo carro.
- Não deve ser possível cadastrar um carro se o usuário não for administrador.

### Cadastro de Imagens do Carro

#### Requisitos Funcionais

- Deve ser possível cadastrar a imagem do carro.
- Deve ser possível listar todos os carros, independente da disponibilidade.

#### Requisitos Não-Funcionais

- Utilizar o Multer para upload dos arquivos.

#### Regras de Negócio

- Não deve ser possível cadastrar uma imagem do carro se o usuário não for administrador.
- Deve ser possível cadastrar mais de uma imagem para um mesmo carro.

### Aluguel de Carro

#### Requisito Funcional

- Deve ser possível cadastrar um aluguel.

#### Regras de Negócio

- Não deve ser possível cadastrar um aluguel com duração menor que 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para um mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para um mesmo carro.
- O usuário deve estar logado na aplicação
- Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

### Devolução de Carro

#### Requisito Funcional

- Deve ser possível realizar a devolução de um carro.

#### Regras de Negócio

- Se o carro for devolvido com menos de 24 horas, deverá ser cobrado a diária completa.
- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- Ao realizar a devolução, deverá ser calculado o total do aluguel.
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
- Caso haja multa, deverá ser somado ao total do aluguel.
- O usuário deve estar logado na aplicação.

### Listagem de aluguéis para usuário

#### Requisito Funcional

- Deve ser possível realizar a busca de todos os alugueis para um usuário.

#### Regras de Negócio

- O usuário deve estar logado na aplicação.

### Recuperação de Senha

#### Requisito Funcional

- Deve ser possível o usuário recuparar a senha informando o e-mail
- O usuário deve receber um e-mail com o passo a passo para a recuperação de senha
- O usuário deve conseguir inserir uma nova senha

#### Regras de Negócio

- O usuário precisa informar uma nova senha
- O link enviado para a recuperação deve expirar em 3 horas

### Executando o projeto

Utilize o **yarn** ou o **npm install** para instalar as dependências do projeto.
Em seguida, deve-se criar o container utilizando o docker-compose antes de iniciar o projeto.

```cl
$ docker build -t rentalx

$ docker-compose up
```

## 📄 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

<br />
