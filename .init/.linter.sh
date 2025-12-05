#!/bin/bash
set -euo pipefail

# Navigate to the correct frontend working directory
cd /home/kavia/workspace/code-generation/kanban-task-manager-121675-287149/kanban_board_frontend

# Install dependencies if node_modules is missing (first run scenarios)
if [ ! -d node_modules ]; then
  npm ci || npm install
fi

# Build the project
npm run build
