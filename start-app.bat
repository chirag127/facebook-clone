@echo off
echo Starting Facebook Clone Application...

echo Installing backend dependencies...
cd backend
call npm install
cd ..

echo Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo Starting MongoDB...
start mongod

echo Starting backend server...
start cmd /k "cd backend && npm run dev"

timeout /t 5

echo Starting frontend application...
start cmd /k "cd frontend && npm start"

echo Facebook Clone application is now running!
echo Backend: http://localhost:5000
echo Frontend: Expo development server
