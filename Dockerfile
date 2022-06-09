FROM node:16-slim

RUN apt-get update -y

RUN apt-get install build-essential -y

RUN apt-get install -y python3

COPY heroku/start.sh ./

COPY --chown=node:node . .

RUN npm ci

# Use app entrypoint
CMD ["bash", "start.sh"]
