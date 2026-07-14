@echo off
echo Starting Project Management Tool...

echo Starting Backend Server...
start "Backend" cmd /c "cd backend && npm run dev"

echo Starting Frontend Server...
start "Frontend" cmd /c "cd frontend && npm run dev"

echo Both servers are starting up. The frontend should open automatically in your browser shortly!
pause
