FROM node:alpine3.17 as build

WORKDIR /build

# significa que este archivo se va a copiar en la carpeta que es el workdir si no se especifica una ruta absoluta, osea usar el ./
COPY package.json ./

RUN npm install

#el primer argumento es la carpeta del proyecto donde estamos y el segundo es el destino de la imagen docker
COPY . ./

RUN npm run build

#esta es otro stage donde se crea la carpeta app en el nuevo contenedor, luego copia build/dist del contenedor anterior a la carpeta ./dist del contenedor actual
FROM node:alpine3.17

WORKDIR /app

COPY --from=build /build/dist ./dist
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/package.json ./

#esto se ejecuta una vez se crea el contenedor
CMD ["npm", "run", "start"]