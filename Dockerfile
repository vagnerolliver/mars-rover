FROM node:lts as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . ./ 

RUN yarn run build

# production environment
FROM node:lts

ENV PORT=80

COPY --from=build /usr/src/app/dist /opt/app
COPY --from=build /usr/src/app/env /opt/.env


RUN yarn global add http-server-spa \
  && rm -rf /tmp/* /var/tmp/*

WORKDIR /opt
EXPOSE $PORT

COPY ./replaceEnvVarsAndStart.sh .
CMD ["sh", "./replaceEnvVarsAndStart.sh"]