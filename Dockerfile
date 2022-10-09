FROM node:16.10 AS base
WORKDIR /home/app
RUN npm install -g @nestjs/cli

FROM base AS prod
WORKDIR /home/app
COPY . .
RUN npm ci --production
RUN npm run build
CMD [ "npm", "run", "start:prod" ]

FROM base as dev
COPY --from=base /home/app /home/app/
CMD ["bash"]

