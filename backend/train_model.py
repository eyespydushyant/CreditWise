import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

def generate_synthetic_data(n_samples=5000):
    np.random.seed(42)

    applicant_income = np.random.randint(15000, 150000, n_samples)
    coapplicant_income = np.random.randint(0, 80000, n_samples)
    loan_amount = np.random.randint(50000, 5000000, n_samples)
    credit_score = np.random.randint(300, 900, n_samples)
    dti_ratio = np.round(np.random.uniform(0.05, 0.65, n_samples), 2)
    savings = np.random.randint(0, 2000000, n_samples)
    collateral_value = np.random.randint(0, 10000000, n_samples)
    existing_loans = np.random.randint(0, 6, n_samples)
    age = np.random.randint(21, 65, n_samples)
    loan_term = np.random.choice([12, 24, 36, 48, 60, 84, 120, 180, 240], n_samples)
    
    # New features for simulator
    utilization_rate = np.random.uniform(0, 1, n_samples)
    missed_payments = np.random.randint(0, 6, n_samples)
    hard_inquiries = np.random.randint(0, 11, n_samples)

    data = {
        'Applicant_Income':     applicant_income,
        'Coapplicant_Income':   coapplicant_income,
        'Loan_Amount':          loan_amount,
        'Loan_Term':            loan_term,
        'Credit_Score':         credit_score,
        'DTI_Ratio':            dti_ratio,
        'Savings':              savings,
        'Collateral_Value':     collateral_value,
        'Existing_Loans':       existing_loans,
        'Age':                  age,
        'Utilization_Rate':     utilization_rate,
        'Missed_Payments':      missed_payments,
        'Hard_Inquiries':       hard_inquiries,
        'Gender':               np.random.choice(['Male', 'Female'], n_samples),
        'Marital_Status':       np.random.choice(['Single', 'Married', 'Divorced'], n_samples),
        'Dependents':           np.random.choice(['0', '1', '2', '3+'], n_samples),
        'Employment_Status':    np.random.choice(['Salaried', 'Self-Employed', 'Business Owner', 'Unemployed'], n_samples,
                                                  p=[0.55, 0.25, 0.15, 0.05]),
        'Education_Level':      np.random.choice(['Graduate', 'Post-Graduate', 'Undergraduate', 'High School'], n_samples),
        'Property_Area':        np.random.choice(['Urban', 'Semi-Urban', 'Rural'], n_samples),
        'Loan_Purpose':         np.random.choice(['Home', 'Education', 'Business', 'Personal', 'Vehicle', 'Medical'], n_samples),
        'Employer_Category':    np.random.choice(['Government', 'Private', 'PSU', 'Self'], n_samples),
    }

    df = pd.DataFrame(data)

    # Realistic scoring logic
    score = (
        (df['Credit_Score'] - 300) / 6 +                          # 0-100 from credit score
        (df['Applicant_Income'] / 3000) +                          # income boost
        (df['Coapplicant_Income'] / 6000) +                        # co-applicant boost
        (df['Savings'] / 50000) +                                  # savings boost
        (df['Collateral_Value'] / 200000) -                        # collateral helps
        (df['DTI_Ratio'] * 80) -                                   # high DTI hurts
        (df['Existing_Loans'] * 5) -                               # more loans = risky
        (df['Loan_Amount'] / 200000) -                             # large loan = risky
        (df['Utilization_Rate'] * 50) -                            # high utilization hurts
        (df['Missed_Payments'] * 20) -                             # missed payments hurt a lot
        (df['Hard_Inquiries'] * 5) +                               # inquiries hurt a bit
        np.where(df['Employment_Status'] == 'Salaried', 15, 0) +
        np.where(df['Employment_Status'] == 'Government', 10, 0) +
        np.where(df['Education_Level'].isin(['Graduate', 'Post-Graduate']), 8, 0) +
        np.where(df['Property_Area'] == 'Urban', 5, 0) +
        np.where(df['Marital_Status'] == 'Married', 5, 0) +
        np.where(df['Employer_Category'] == 'Government', 10, 0) +
        np.where((df['Age'] >= 25) & (df['Age'] <= 55), 5, -5)
    )

    score += np.random.normal(0, 15, n_samples)
    df['Loan_Approved'] = np.where(score > score.median(), 1, 0)

    return df

print("Generating synthetic dataset...")
df = generate_synthetic_data(5000)
print(f"Dataset generated: {len(df)} samples, approval rate: {df['Loan_Approved'].mean():.1%}")

X = df.drop('Loan_Approved', axis=1)
y = df['Loan_Approved']

numerical_features = [
    'Applicant_Income', 'Coapplicant_Income', 'Loan_Amount', 'Loan_Term',
    'Credit_Score', 'DTI_Ratio', 'Savings', 'Collateral_Value',
    'Existing_Loans', 'Age', 'Utilization_Rate', 'Missed_Payments', 'Hard_Inquiries'
]
categorical_features = [
    'Gender', 'Marital_Status', 'Dependents', 'Employment_Status',
    'Education_Level', 'Property_Area', 'Loan_Purpose', 'Employer_Category'
]

preprocessor = ColumnTransformer(transformers=[
    ('num', StandardScaler(), numerical_features),
    ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
])

clf = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier(n_estimators=200, max_depth=15, random_state=42, n_jobs=-1))
])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print("Training model...")
clf.fit(X_train, y_train)

y_pred = clf.predict(X_test)
print(f"Model Accuracy: {accuracy_score(y_test, y_pred):.4f}")
print(classification_report(y_test, y_pred))

print("Saving model...")
joblib.dump(clf, 'model.pkl')
print("Model saved as 'model.pkl'")
