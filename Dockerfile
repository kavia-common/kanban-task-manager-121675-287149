FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY kanban_board_frontend/package.json kanban_board_frontend/package-lock.json ./

# Install dependencies
RUN npm ci --silent

# Copy source code
COPY kanban_board_frontend/ ./

# Build Arguments
ARG REACT_APP_API_BASE
ARG REACT_APP_BACKEND_URL
ARG REACT_APP_FRONTEND_URL
ARG REACT_APP_WS_URL
ARG REACT_APP_NODE_ENV
ARG REACT_APP_NEXT_TELEMETRY_DISABLED
ARG REACT_APP_ENABLE_SOURCE_MAPS
ARG REACT_APP_PORT

# Environment Variables for build
ENV REACT_APP_API_BASE=$REACT_APP_API_BASE
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
ENV REACT_APP_FRONTEND_URL=$REACT_APP_FRONTEND_URL
ENV REACT_APP_WS_URL=$REACT_APP_WS_URL
ENV REACT_APP_NODE_ENV=$REACT_APP_NODE_ENV
ENV REACT_APP_NEXT_TELEMETRY_DISABLED=$REACT_APP_NEXT_TELEMETRY_DISABLED
ENV REACT_APP_ENABLE_SOURCE_MAPS=$REACT_APP_ENABLE_SOURCE_MAPS
ENV REACT_APP_PORT=$REACT_APP_PORT

# Build the app
RUN npm run build

# Production environment
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
