FROM node:14

WORKDIR /app

COPY api/package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]