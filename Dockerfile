FROM node:20-alpine

WORKDIR /app

# package files copy
COPY package.json package-lock.json ./
RUN npm install --production

# backend folder copy
COPY backend ./backend

EXPOSE 3000

# correct entry point
CMD ["node", "backend/server.js"]
