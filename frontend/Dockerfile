FROM node
WORKDIR /app/
COPY /public /app/public
COPY src/ /app/src
COPY package.json /app/
COPY jsconfig.json /app/
RUN npm install --force
CMD ["npm", "start"]