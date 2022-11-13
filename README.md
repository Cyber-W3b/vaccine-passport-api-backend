# Introdução
Este projeto tem como objetivo prover uma camada de salvamento de dados de usuários e geração de imagens de capas dos NFTs no projeto da Carteira de Vacinação BNB

# Requisitos
- NodeJS 16 instalado
- MySQL/MariaDB instalado

# Instalação
- Clone o repositório
- Crie um banco de dados no MySQL/MariaDB
- Instale as dependências com `npm install`
- Crie um arquivo `.env` com as variáveis de ambiente de acordo com o arquivo `.env.example` - Para desenvolvimento, o nome do arquivo é `dev.env`
- Rode o comando `npx prisma db push` para criar as tabelas no banco de dados - Em desenvolvimento, rode `npm run db:push`
- Rode o comando `npm run start:dev` para iniciar o servidor em modo de desenvolvimento
- Compile o programa usando `npm run build`
- Rode o programa usando `node dist/index.js`