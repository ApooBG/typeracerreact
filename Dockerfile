FROM node:18-alpine
WORKDIR /client
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]