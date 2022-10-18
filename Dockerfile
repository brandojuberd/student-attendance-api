FROM node:16.10 AS base
WORKDIR /home/student-attendance-api
RUN npm install -g @nestjs/cli
RUN npm install -g pnpm

FROM base AS prod
WORKDIR /home/student-attendance-api
COPY . .
RUN pnpm install
RUN pnpm run build
CMD [ "npm", "run", "start:prod" ]

FROM base as dev
COPY --from=base /home/student-attendance-api /home/student-attendance-api
CMD ["bash"]

