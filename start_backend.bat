@echo off
cd backend
if not exist .venv (
    echo Creating virtual environment...
    python -m venv .venv
)
call .venv\Scripts\activate
pip install -r requirements.txt
if not exist model.pkl (
    echo Training model...
    python train_model.py
)
echo Starting Backend Server...
python app.py
pause
