import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Building, ArrowRight, CheckCircle, Smartphone, ShieldCheck, Briefcase, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { predictLoan } from '../api';

const inputClass = "w-full bg-slate-900/50 dark:bg-slate-900/50 bg-gray-100 border border-slate-600 dark:border-slate-600 border-gray-300 rounded-lg px-4 py-2.5 text-slate-200 dark:text-slate-200 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-slate-500";
const labelClass = "block text-sm font-medium text-slate-300 dark:text-slate-300 text-gray-600 mb-1 group-focus-within:text-indigo-400 transition-colors";

function SectionHeader({ title, gradient }) {
    return (
        <h3 className={`text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r ${gradient} border-b border-slate-700 dark:border-slate-700 border-gray-200 pb-2 mb-1`}>
            {title}
        </h3>
    );
}

function Field({ label, children }) {
    return (
        <div className="group">
            <label className={labelClass}>{label}</label>
            {children}
        </div>
    );
}

const banks = [
    { id: 1, name: 'SBI', minScore: 700, rate: '10.30%', limit: '20L', color: 'from-blue-600 to-blue-800' },
    { id: 2, name: 'HDFC', minScore: 720, rate: '10.50%', limit: '40L', color: 'from-red-600 to-red-800' },
    { id: 3, name: 'ICICI', minScore: 700, rate: '10.65%', limit: '50L', color: 'from-orange-600 to-orange-800' },
    { id: 4, name: 'Axis', minScore: 680, rate: '10.49%', limit: '40L', color: 'from-purple-600 to-purple-800' },
    { id: 5, name: 'Kotak', minScore: 700, rate: '10.99%', limit: '35L', color: 'from-red-700 to-red-900' },
    { id: 6, name: 'PNB', minScore: 650, rate: '10.40%', limit: '20L', color: 'from-teal-600 to-teal-800' },
];

function Predict() {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        Applicant_Income: '',
        Coapplicant_Income: '0',
        Loan_Amount: '',
        Loan_Term: '60',
        Credit_Score: '',
        DTI_Ratio: '',
        Savings: '0',
        Collateral_Value: '0',
        Existing_Loans: '0',
        Age: '',
        Gender: 'Male',
        Marital_Status: 'Single',
        Dependents: '0',
        Employment_Status: 'Salaried',
        Education_Level: 'Graduate',
        Property_Area: 'Urban',
        Loan_Purpose: 'Personal',
        Employer_Category: 'Private',
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Sync from Simulator params
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const updates = {};
        params.forEach((value, key) => {
            if (formData.hasOwnProperty(key)) {
                updates[key] = value;
            }
        });
        if (Object.keys(updates).length > 0) {
            setFormData(prev => ({ ...prev, ...updates }));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const payload = { ...formData, user_id: user?.id };
            const data = await predictLoan(payload);
            setResult(data);
        } catch (err) {
            setError(err.error || 'Failed to get prediction. Make sure the backend is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getRecommendedBanks = () => {
        if (!result || result.prediction !== 'Approved') return [];
        const score = parseInt(formData.Credit_Score);
        return banks.filter(bank => score >= bank.minScore).slice(0, 3);
    };

    const recommended = getRecommendedBanks();

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-slate-900 py-6 sm:py-12 px-0 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8 sm:mb-10 px-4">
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-3">
                        Check Your Loan Eligibility
                    </h1>
                    <p className="text-gray-500 dark:text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto">
                        Hi <span className="text-indigo-400 font-bold">{user?.username}</span>, fill in your details for an instant AI-powered prediction.
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700/50 overflow-hidden">
                    <div className="p-5 sm:p-10">
                        <form onSubmit={handleSubmit} className="space-y-10">
                            <div>
                                <SectionHeader title="👤 Personal Information" gradient="from-blue-400 to-teal-400" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
                                    <Field label="Gender">
                                        <select name="Gender" value={formData.Gender} onChange={handleChange} className={inputClass}>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </Field>
                                    <Field label="Age">
                                        <input type="number" name="Age" value={formData.Age} onChange={handleChange} required min="18" max="70" className={inputClass} placeholder="e.g. 30" />
                                    </Field>
                                    <Field label="Marital Status">
                                        <select name="Marital_Status" value={formData.Marital_Status} onChange={handleChange} className={inputClass}>
                                            <option value="Single">Single</option>
                                            <option value="Married">Married</option>
                                            <option value="Divorced">Divorced</option>
                                        </select>
                                    </Field>
                                    <Field label="Dependents">
                                        <select name="Dependents" value={formData.Dependents} onChange={handleChange} className={inputClass}>
                                            <option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3+">3+</option>
                                        </select>
                                    </Field>
                                    <Field label="Education">
                                        <select name="Education_Level" value={formData.Education_Level} onChange={handleChange} className={inputClass}>
                                            <option value="Post-Graduate">Post-Graduate</option><option value="Graduate">Graduate</option><option value="Undergraduate">Undergraduate</option><option value="High School">High School</option>
                                        </select>
                                    </Field>
                                    <Field label="Property Area">
                                        <select name="Property_Area" value={formData.Property_Area} onChange={handleChange} className={inputClass}>
                                            <option value="Urban">Urban</option><option value="Semi-Urban">Semi-Urban</option><option value="Rural">Rural</option>
                                        </select>
                                    </Field>
                                </div>
                            </div>

                            <div>
                                <SectionHeader title="💼 Employment & Income" gradient="from-orange-400 to-yellow-400" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
                                    <Field label="Employment Status">
                                        <select name="Employment_Status" value={formData.Employment_Status} onChange={handleChange} className={inputClass}>
                                            <option value="Salaried">Salaried</option><option value="Self-Employed">Self-Employed</option><option value="Business Owner">Business Owner</option>
                                        </select>
                                    </Field>
                                    <Field label="Employer Type">
                                        <select name="Employer_Category" value={formData.Employer_Category} onChange={handleChange} className={inputClass}>
                                            <option value="Government">Government</option><option value="PSU">PSU</option><option value="Private">Private</option><option value="Self">Self</option>
                                        </select>
                                    </Field>
                                    <Field label="Your Income (₹/mo)">
                                        <input type="number" name="Applicant_Income" value={formData.Applicant_Income} onChange={handleChange} required min="0" className={inputClass} placeholder="e.g. 50000" />
                                    </Field>
                                    <Field label="Co-Applicant Income (₹/mo)">
                                        <input type="number" name="Coapplicant_Income" value={formData.Coapplicant_Income} onChange={handleChange} min="0" className={inputClass} placeholder="e.g. 20000" />
                                    </Field>
                                    <Field label="Current Savings (₹)">
                                        <input type="number" name="Savings" value={formData.Savings} onChange={handleChange} min="0" className={inputClass} placeholder="e.g. 100000" />
                                    </Field>
                                    <Field label="Collateral Value (₹)">
                                        <input type="number" name="Collateral_Value" value={formData.Collateral_Value} onChange={handleChange} min="0" className={inputClass} placeholder="e.g. 500000" />
                                    </Field>
                                </div>
                            </div>

                            <div>
                                <SectionHeader title="📊 Loan & Credit Details" gradient="from-purple-400 to-pink-400" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
                                    <Field label="Credit Score (300-900)">
                                        <input type="number" name="Credit_Score" value={formData.Credit_Score} onChange={handleChange} required min="300" max="900" className={inputClass} placeholder="e.g. 720" />
                                    </Field>
                                    <Field label="DTI Ratio (0.0 to 1.0)">
                                        <input type="number" name="DTI_Ratio" value={formData.DTI_Ratio} onChange={handleChange} required step="0.01" min="0" max="1" className={inputClass} placeholder="e.g. 0.35" />
                                    </Field>
                                    <Field label="Existing Loans (Count)">
                                        <select name="Existing_Loans" value={formData.Existing_Loans} onChange={handleChange} className={inputClass}>
                                            {[0, 1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                                        </select>
                                    </Field>
                                    <Field label="Required Amount (₹)">
                                        <input type="number" name="Loan_Amount" value={formData.Loan_Amount} onChange={handleChange} required min="1000" className={inputClass} placeholder="e.g. 500000" />
                                    </Field>
                                    <Field label="Loan Term (Months)">
                                        <select name="Loan_Term" value={formData.Loan_Term} onChange={handleChange} className={inputClass}>
                                            <option value="12">12 months</option><option value="24">24 months</option><option value="36">36 months</option><option value="48">48 months</option><option value="60">60 months</option>
                                        </select>
                                    </Field>
                                    <Field label="Loan Purpose">
                                        <select name="Loan_Purpose" value={formData.Loan_Purpose} onChange={handleChange} className={inputClass}>
                                            <option value="Personal">Personal</option><option value="Home">Home</option><option value="Education">Education</option><option value="Business">Business</option><option value="Vehicle">Vehicle</option>
                                        </select>
                                    </Field>
                                </div>
                            </div>

                            <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl shadow-lg text-lg font-bold text-white uppercase tracking-wider ${loading ? 'bg-slate-600' : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-[1.01]'} transition-all`}>
                                {loading ? 'Analyzing Profile...' : '🔍 Predict Loan Eligibility'}
                            </button>
                        </form>

                        {error && <div className="mt-8 p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-300 text-center">{error}</div>}

                        {result && (
                            <div className="mt-10 space-y-8">
                                <div className={`p-5 sm:p-8 rounded-2xl text-center border backdrop-blur-md ${result.prediction === 'Approved' ? 'bg-green-900/40 border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.2)]' : 'bg-red-900/40 border-red-500/30'}`}>
                                    <h2 className={`text-3xl sm:text-4xl font-extrabold mb-4 ${result.prediction === 'Approved' ? 'text-green-400' : 'text-red-400'}`}>Loan {result.prediction}</h2>
                                    <div className="w-full bg-slate-700/50 rounded-full h-3 mb-3 overflow-hidden">
                                        <div className={`h-full transition-all duration-1000 ${result.prediction === 'Approved' ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${result.probability * 100}%` }} />
                                    </div>
                                    <p className="text-slate-300">{result.prediction === 'Approved' ? 'Excellent! Your profile is strong. Based on your score, we recommend the following banks:' : 'Unfortunately, your profile doesn\'t meet the criteria right now. Try improving your credit score.'}</p>
                                </div>

                                {result.prediction === 'Approved' && recommended.length > 0 && (
                                    <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
                                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                            <ShieldCheck className="text-indigo-400" /> Recommended Banks for You
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {recommended.map(bank => (
                                                <div key={bank.id} className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 hover:border-indigo-500/50 transition-all group">
                                                    <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${bank.color} flex items-center justify-center text-white font-bold mb-4 shadow-lg`}>
                                                        <Landmark size={20} />
                                                    </div>
                                                    <h4 className="text-lg font-bold text-white mb-1">{bank.name} Bank</h4>
                                                    <div className="space-y-2 mb-4">
                                                        <div className="flex justify-between text-sm"><span className="text-slate-400">Rate:</span><span className="text-green-400 font-bold">{bank.rate}</span></div>
                                                        <div className="flex justify-between text-sm"><span className="text-slate-400">Max Limit:</span><span className="text-white font-medium">₹{bank.limit}</span></div>
                                                    </div>
                                                    <Link to="/banks" className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                                                        Apply Now <ArrowRight size={14} />
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Predict;
