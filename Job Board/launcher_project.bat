@echo off
echo Starting Job Board project...

echo Starting backend...
cd backend
start "Job Board Backend" cmd /k "npm start"
cd ..

echo Starting frontend...
cd frontend
start "Job Board Frontend" cmd /k "npm run dev"
cd ..

echo Project launched.
