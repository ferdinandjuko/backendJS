#!/bin/bash

echo "Starting frontend..."
# cd "$ROOT_DIR/frontend"
cd frontend
npm start&   # <-- & sends it to background

echo "Starting backend..."
# cd "$ROOT_DIR/backend"
cd ..
cd backend
npm start     # runs in foreground (keeps script alive

