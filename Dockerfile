FROM        node:18-alpine as builder

COPY        package.json /srv/node-social-media/
WORKDIR     /srv/node-social-media/

RUN         yarn install --production

COPY        app.js /srv/node-social-media/
COPY        adapters /srv/node-social-media/adapters/
COPY        application /srv/node-social-media/application/
COPY        config /srv/node-social-media/config/
COPY        frameworks /srv/node-social-media/frameworks/
COPY        src /srv/node-social-media/src/

RUN         yarn run build

FROM        node:18-alpine


ENV         HTTP_MODE http
ARG         NODE_PROCESSES=2
ENV         NODE_PROCESSES=$NODE_PROCESSES

# Install pm2
RUN         npm install -g pm2

# Copy over code
WORKDIR     /srv/api/
COPY        --from=builder /srv/node-social-media/build /srv/api/build
COPY        --from=builder /srv/node-social-media/package.json /srv/api/package.json

RUN         deluser --remove-home node \
    && addgroup -S node -g 9999 \
    && adduser -S -G node -u 9999 node

CMD         ["yarn", "start"]

USER        node