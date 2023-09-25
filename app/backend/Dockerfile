FROM node:16.14-alpine
WORKDIR /app-backend
COPY package*.json ./
COPY packages.npm ./
RUN npm install
# Copiar o restante dos arquivos da aplicação para o container
COPY . .
EXPOSE 3001
# Configurar os comandos para iniciar a aplicação de acordo com as boas práticas
ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]
# Dica: Leia a seção Docker e Docker-compose no README para mais informações