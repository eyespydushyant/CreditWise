from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import pandas as pd
import joblib
import numpy as np
import os
from datetime import datetime

# Google auth imports — graceful fallback if not installed
try:
    from google.oauth2 import id_token
    from google.auth.transport import requests as google_requests
    GOOGLE_AUTH_AVAILABLE = True
except ImportError:
    GOOGLE_AUTH_AVAILABLE = False

app = Flask(__name__)
# Allow all origins for development, can be restricted in production
CORS(app, resources={r"/*": {"origins": "*"}})

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', f"sqlite:///{os.path.abspath(os.path.join(os.path.dirname(__file__), 'loans.db'))}")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

def load_model():
    model_path = 'model.pkl'
    if os.path.exists(model_path):
        return joblib.load(model_path)
    print("Model not found. Please run train_model.py first.")
    return None

model = load_model()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256))  # Increased to support modern password hashes

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class LoanApplication(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True) # Set to True for backward compatibility
    applicant_income     = db.Column(db.Float)
    coapplicant_income   = db.Column(db.Float)
    loan_amount          = db.Column(db.Float)
    loan_term            = db.Column(db.Float)
    credit_score         = db.Column(db.Float)
    dti_ratio            = db.Column(db.Float)
    savings              = db.Column(db.Float)
    collateral_value     = db.Column(db.Float)
    existing_loans       = db.Column(db.Integer)
    age                  = db.Column(db.Integer)
    gender               = db.Column(db.String(10))
    marital_status       = db.Column(db.String(20))
    dependents           = db.Column(db.String(5))
    employment_status    = db.Column(db.String(30))
    education_level      = db.Column(db.String(30))
    property_area        = db.Column(db.String(20))
    loan_purpose         = db.Column(db.String(20))
    employer_category    = db.Column(db.String(20))
    prediction           = db.Column(db.String(20))
    probability          = db.Column(db.Float)
    timestamp            = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('applications', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'Applicant_Income': self.applicant_income,
            'Coapplicant_Income': self.coapplicant_income,
            'Loan_Amount': self.loan_amount,
            'Loan_Term': self.loan_term,
            'Credit_Score': self.credit_score,
            'DTI_Ratio': self.dti_ratio,
            'Savings': self.savings,
            'Collateral_Value': self.collateral_value,
            'Existing_Loans': self.existing_loans,
            'Age': self.age,
            'Gender': self.gender,
            'Marital_Status': self.marital_status,
            'Dependents': self.dependents,
            'Employment_Status': self.employment_status,
            'Education_Level': self.education_level,
            'Property_Area': self.property_area,
            'Loan_Purpose': self.loan_purpose,
            'Employer_Category': self.employer_category,
            'prediction': self.prediction,
            'probability': self.probability,
            'timestamp': self.timestamp.isoformat()
        }

with app.app_context():
    db.create_all()

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if User.query.filter_by(username=data.get('username')).first():
        return jsonify({'error': 'Username already exists'}), 400
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({'error': 'Email already exists'}), 400
    
    new_user = User(username=data.get('username'), email=data.get('email'))
    new_user.set_password(data.get('password'))
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully', 'user_id': new_user.id})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter((User.username == data.get('username')) | (User.email == data.get('username'))).first()
    if user and user.check_password(data.get('password')):
        return jsonify({
            'message': 'Login successful',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        })
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded. Run train_model.py first.'}), 500

    try:
        data = request.get_json()
        user_id = data.get('user_id')

        input_data = {
            'Applicant_Income':   float(data.get('Applicant_Income', 0)),
            'Coapplicant_Income': float(data.get('Coapplicant_Income', 0)),
            'Loan_Amount':        float(data.get('Loan_Amount', 0)),
            'Loan_Term':          float(data.get('Loan_Term', 60)),
            'Credit_Score':       float(data.get('Credit_Score', 650)),
            'DTI_Ratio':          float(data.get('DTI_Ratio', 0.3)),
            'Savings':            float(data.get('Savings', 0)),
            'Collateral_Value':   float(data.get('Collateral_Value', 0)),
            'Existing_Loans':     int(data.get('Existing_Loans', 0)),
            'Age':                int(data.get('Age', 30)),
            'Utilization_Rate':   float(data.get('Utilization_Rate', 0.3)), # Default 30%
            'Missed_Payments':    int(data.get('Missed_Payments', 0)),      # Default 0
            'Hard_Inquiries':     int(data.get('Hard_Inquiries', 1)),       # Default 1
            'Gender':             data.get('Gender', 'Male'),
            'Marital_Status':     data.get('Marital_Status', 'Single'),
            'Dependents':         data.get('Dependents', '0'),
            'Employment_Status':  data.get('Employment_Status', 'Salaried'),
            'Education_Level':    data.get('Education_Level', 'Graduate'),
            'Property_Area':      data.get('Property_Area', 'Urban'),
            'Loan_Purpose':       data.get('Loan_Purpose', 'Personal'),
            'Employer_Category':  data.get('Employer_Category', 'Private'),
        }

        df = pd.DataFrame([input_data])
        prediction = model.predict(df)[0]
        probability = model.predict_proba(df)[0][1]
        result_text = "Approved" if prediction == 1 else "Rejected"

        new_app = LoanApplication(
            user_id=user_id,
            applicant_income=input_data['Applicant_Income'],
            coapplicant_income=input_data['Coapplicant_Income'],
            loan_amount=input_data['Loan_Amount'],
            loan_term=input_data['Loan_Term'],
            credit_score=input_data['Credit_Score'],
            dti_ratio=input_data['DTI_Ratio'],
            savings=input_data['Savings'],
            collateral_value=input_data['Collateral_Value'],
            existing_loans=input_data['Existing_Loans'],
            age=input_data['Age'],
            gender=input_data['Gender'],
            marital_status=input_data['Marital_Status'],
            dependents=input_data['Dependents'],
            employment_status=input_data['Employment_Status'],
            education_level=input_data['Education_Level'],
            property_area=input_data['Property_Area'],
            loan_purpose=input_data['Loan_Purpose'],
            employer_category=input_data['Employer_Category'],
            prediction=result_text,
            probability=float(probability)
        )
        db.session.add(new_app)
        db.session.commit()

        return jsonify({
            'prediction': result_text,
            'probability': float(probability)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/simulate', methods=['POST'])
def simulate():
    if model is None:
        return jsonify({'error': 'Model not loaded.'}), 500

    try:
        data = request.get_json()
        
        # Helper to get prediction
        def get_prob(payload):
            df = pd.DataFrame([payload])
            return float(model.predict_proba(df)[0][1])

        base_input = {
            'Applicant_Income':   float(data.get('Applicant_Income', 50000)),
            'Coapplicant_Income': float(data.get('Coapplicant_Income', 0)),
            'Loan_Amount':        float(data.get('Loan_Amount', 500000)),
            'Loan_Term':          float(data.get('Loan_Term', 60)),
            'Credit_Score':       float(data.get('Credit_Score', 700)),
            'DTI_Ratio':          float(data.get('DTI_Ratio', 0.3)),
            'Savings':            float(data.get('Savings', 100000)),
            'Collateral_Value':   float(data.get('Collateral_Value', 0)),
            'Existing_Loans':     int(data.get('Existing_Loans', 0)),
            'Age':                int(data.get('Age', 30)),
            'Utilization_Rate':   float(data.get('Utilization_Rate', 0.3)),
            'Missed_Payments':    int(data.get('Missed_Payments', 0)),
            'Hard_Inquiries':     int(data.get('Hard_Inquiries', 1)),
            'Gender':             data.get('Gender', 'Male'),
            'Marital_Status':     data.get('Marital_Status', 'Single'),
            'Dependents':         data.get('Dependents', '0'),
            'Employment_Status':  data.get('Employment_Status', 'Salaried'),
            'Education_Level':    data.get('Education_Level', 'Graduate'),
            'Property_Area':      data.get('Property_Area', 'Urban'),
            'Loan_Purpose':       data.get('Loan_Purpose', 'Personal'),
            'Employer_Category':  data.get('Employer_Category', 'Private'),
        }

        current_prob = get_prob(base_input)

        # Feature Impact Calculation
        impacts = {}
        
        # 1. Utilization Impact (What if utilization was 10% lower)
        if base_input['Utilization_Rate'] > 0.1:
            alt = base_input.copy()
            alt['Utilization_Rate'] = max(0, alt['Utilization_Rate'] - 0.2)
            impacts['utilization'] = get_prob(alt) - current_prob

        # 2. DTI Impact (What if DTI was 10% lower)
        if base_input['DTI_Ratio'] > 0.1:
            alt = base_input.copy()
            alt['DTI_Ratio'] = max(0, alt['DTI_Ratio'] - 0.15)
            impacts['dti'] = get_prob(alt) - current_prob

        # 3. Credit Score Impact (What if score was 50 points higher)
        if base_input['Credit_Score'] < 850:
            alt = base_input.copy()
            alt['Credit_Score'] = min(900, alt['Credit_Score'] + 50)
            impacts['credit_score'] = get_prob(alt) - current_prob

        return jsonify({
            'current_probability': current_prob,
            'prediction': "Approved" if current_prob >= 0.5 else "Rejected",
            'impacts': impacts
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/google-login', methods=['POST'])
def google_login():
    data = request.get_json()
    credential = data.get('credential')
    if not credential:
        return jsonify({'error': 'No credential provided'}), 400

    if not GOOGLE_AUTH_AVAILABLE:
        return jsonify({'error': 'Google auth library not installed on server.'}), 500

    CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID', '')
    if not CLIENT_ID:
        return jsonify({'error': 'Google Sign-In is not configured on this server. Please contact the administrator.'}), 503

    try:
        idinfo = id_token.verify_oauth2_token(credential, google_requests.Request(), CLIENT_ID)

        google_email = idinfo.get('email')
        google_name  = idinfo.get('name', '') or (google_email.split('@')[0] if google_email else 'user')
        google_sub   = idinfo.get('sub')

        if not google_email:
            return jsonify({'error': 'Could not get email from Google'}), 400

        # Find or create user
        user = User.query.filter_by(email=google_email).first()
        if not user:
            # Create a username from name, ensure uniqueness
            base_username = google_name.replace(' ', '').lower()[:20] or 'user'
            username = base_username
            counter = 1
            while User.query.filter_by(username=username).first():
                username = f'{base_username}{counter}'
                counter += 1

            user = User(username=username, email=google_email)
            user.set_password(google_sub)  # Use Google sub as password placeholder
            db.session.add(user)
            db.session.commit()

        return jsonify({
            'message': 'Google login successful',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        })
    except ValueError as e:
        return jsonify({'error': f'Invalid Google token: {str(e)}'}), 401
    except Exception as e:
        return jsonify({'error': f'Google login failed: {str(e)}'}), 500

@app.route('/history', methods=['GET'])
def get_history():
    user_id = request.args.get('user_id')
    try:
        query = LoanApplication.query
        if user_id:
            query = query.filter_by(user_id=user_id)
        applications = query.order_by(LoanApplication.timestamp.desc()).limit(10).all()
        return jsonify([a.to_dict() for a in applications])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)
