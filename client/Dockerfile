FROM node:12.18-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install -g @angular/cli 
RUN npm install
EXPOSE 4200
CMD ["npm", "start"]
