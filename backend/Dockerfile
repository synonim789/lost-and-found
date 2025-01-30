FROM node:latest

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

RUN apt-get update && apt-get install -y netcat-openbsd

# Copy the rest of the app
COPY . .

EXPOSE 3000

# Run the app

CMD ["sh", "-c", "until nc -z -v -w30 postgres 5432; do echo 'Waiting for database...'; sleep 5; done && npx prisma db push && npm run build && mkdir /app/dist/uploads && npm start"]
