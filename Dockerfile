FROM node:16.10 AS base
WORKDIR /home/app
RUN npm install -g @nestjs/cli


FROM base as dev
COPY --from=base /home/app /home/app/
CMD ["bash"]