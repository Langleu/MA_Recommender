FROM node:12-stretch-slim

RUN mkdir /home/node/app/ && chown -R node:node /home/node/app

WORKDIR /home/node/app

USER node

COPY --chown=node:node package*.json ./
COPY --chown=node:node next.config.js ./
COPY --chown=node:node public ./public/
COPY --chown=node:node src ./src/

RUN npm install && npm cache clean --force --loglevel=error && npm run build 

CMD [ "npm", "run", "start"]
