FROM node:6.5.0

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY package.json /opt/app/
RUN npm install --production

COPY . /opt/app
CMD ["npm", "start"];
