FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Environment Variables
ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000

CMD ["npm", "start"]
