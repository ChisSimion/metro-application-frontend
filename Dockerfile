FROM node:14.16.0-alpine
WORKDIR /metro-application-frontend
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN apk add --update \
    python \
    python-dev \
    py-pip \
  && rm -rf /var/cache/apk/*

RUN npm install

COPY . ./

CMD ["npm", "start"]
