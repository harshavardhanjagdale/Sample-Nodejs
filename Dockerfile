from node:20.13.1

workdir /usr/src/app

copy . .

run npm install
run npm install nodemon

expose 3400

cmd ["npm","start"]