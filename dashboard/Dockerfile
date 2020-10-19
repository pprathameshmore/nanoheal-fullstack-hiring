FROM node:12

WORKDIR /use/src/app

COPY package*.json ./

RUN npm install
RUN npm install react-scripts@3.4.1 -g
RUN npm install serve -g

COPY . .

RUN npm run build

EXPOSE 3000


CMD ["npm", "start"]