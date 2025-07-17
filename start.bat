@echo off

:: Iniciar o servidor Flask (Backend)
echo Iniciando o servidor Flask...
cd backend
start python app.py
cd ..

:: Iniciar o servidor React (Frontend)
echo Iniciando o servidor React...
cd frontend
start npm start
cd ..
