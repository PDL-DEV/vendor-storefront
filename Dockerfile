# Use a imagem oficial do Node.js 20 como base
FROM node:20.16.0

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Instale angular cli
RUN npm install -g @angular/cli@17

# Copie apenas arquivos de dependências primeiro
COPY package.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todo o código do projeto para o diretório de trabalho
COPY . .

# Exponha a porta que sua aplicação vai utilizar
EXPOSE 8000

# Comando para rodar sua aplicação
CMD ["ng", "serve", "--port", "8000", "--host", "0.0.0.0"]
