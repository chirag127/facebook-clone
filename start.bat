@echo off
echo Starting Facebook Clone Application...

start cmd /k "cd backend && npm run dev"
timeout /t 5
start cmd /k "cd frontend && npm start"
