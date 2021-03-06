FROM node:latest

RUN mkdir -p /usr/src/app  
WORKDIR /usr/src/app  
COPY . /usr/src/app

EXPOSE 3000

RUN npm install  
RUN npm run build  
CMD ["npm", "start"] 