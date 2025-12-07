#!/usr/bin/env bash
set -euo pipefail

# Navigate to the correct frontend workspace (previous path had a typo)
cd /home/kavia/workspace/code-generation/kanban-task-manager-121675-287149/kanban_board_frontend

# Install dev dependencies if node_modules is missing (CI friendly)
if [ ! -d node_modules ]; then
  npm ci --no-audit --no-fund || npm install --no-audit --no-fund
fi

# Run lint; non-zero exit on errors for CI
npm run lint
