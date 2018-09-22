FROM node:8.12.0-alpine

WORKDIR /home/node/app

# Install deps
COPY ./package* ./
RUN npm install && \
    npm cache clean --force

COPY . .

# Expose ports (for orchestrators and dynamic reverse proxies)
EXPOSE 3000

# Start the app
CMD npm start