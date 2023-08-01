# GSW Challenge

O projeto de avaliação foi desenvolvido usando as seguintes tecnologias:
- **backend:** NestJS + Prisma + Mongodb
- **client:** NextJs + Tailwindcss

## Inicialização

Ao clonar o projeto, execute a instalação das dependências:

```bash
npm install
```

basta iniciar o backend:

```bash
npm run start --workspace=backend
```
  e o client:

```bash
npm run dev --workspace=client
```

O projeto já está configurado para usar o mongodb em nuvem, mas caso queira usar localmente, basta alterar o arquivo .env na pasta backend e alterar a variável MONGODB_URI para a string de conexão do seu banco local.

## Testes

Para executar os testes do backend com coverage, basta executar o seguinte comando:

```bash
npm run test:cov --workspace=backend
```
E para executar os testes do client:

```bash
npm run test:cov --workspace=client
```

## TODO

- [ ] Adicionar configuração correta do mongodb no docker para funcionar com o prismaJs
- [ ] Adicionar testes nos custom hooks do client
- [ ] Ajustar as páginas de erro do client
