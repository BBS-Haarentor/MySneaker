FROM node:12-bullseye-slim

# set working directory
WORKDIR /src

# install app dependencies
COPY package.json .
RUN npm install

# add app
COPY . .

EXPOSE 3000

# start app
CMD ["npm", "start"]