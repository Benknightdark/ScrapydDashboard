FROM node:14-alpine
ENV TZ=Asia/Taipei
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]