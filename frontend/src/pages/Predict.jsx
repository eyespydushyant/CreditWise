import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Building, ArrowRight, CheckCircle, Smartphone, ShieldCheck, Briefcase, Landmark, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
        <div className="min-h-[calc(100vh-64px)] bg-[#030712] py-8 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
            {/* Premium Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        x: [0, 60, 0],
                        y: [0, 40, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-600/10 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        x: [0, -40, 0],
                        y: [0, -60, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-40 -left-20 w-[35rem] h-[35rem] bg-purple-600/10 rounded-full blur-[150px]"
                />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
                        <TrendingUp size={14} /> AI-Powered Analysis
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
                        Check Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Loan Eligibility</span>
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto font-medium">
                        Hi <span className="text-indigo-400 font-extrabold">{user?.username}</span>, let our AI engine analyze your profile in seconds.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-slate-900/40 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] border border-white/5 overflow-hidden"
                >
                    <div className="p-6 sm:p-12">
                        <form onSubmit={handleSubmit} className="space-y-12">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="space-y-10">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                    >
                                        <SectionHeader title="👤 Personal Profile" gradient="from-blue-400 to-indigo-400" />
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
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
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <SectionHeader title="💼 Financial Standing" gradient="from-orange-400 to-rose-400" />
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
                                            <Field label="Employment Status">
                                                <select name="Employment_Status" value={formData.Employment_Status} onChange={handleChange} className={inputClass}>
                                                    <option value="Salaried">Salaried</option><option value="Self-Employed">Self-Employed</option><option value="Business Owner">Business Owner</option>
                                                </select>
                                            </Field>
                                            <Field label="Employer Category">
                                                <select name="Employer_Category" value={formData.Employer_Category} onChange={handleChange} className={inputClass}>
                                                    <option value="Government">Government</option><option value="PSU">PSU</option><option value="Private">Private</option><option value="Self">Self</option>
                                                </select>
                                            </Field>
                                            <Field label="Income (₹/mo)">
                                                <input type="number" name="Applicant_Income" value={formData.Applicant_Income} onChange={handleChange} required min="0" className={inputClass} placeholder="e.g. 50000" />
                                            </Field>
                                            <Field label="Current Savings (₹)">
                                                <input type="number" name="Savings" value={formData.Savings} onChange={handleChange} min="0" className={inputClass} placeholder="e.g. 100000" />
                                            </Field>
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="space-y-10">
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <SectionHeader title="📊 Loan Parameters" gradient="from-purple-400 to-pink-400" />
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
                                            <Field label="Amount Required (₹)">
                                                <input type="number" name="Loan_Amount" value={formData.Loan_Amount} onChange={handleChange} required min="1000" className={inputClass} placeholder="e.g. 500000" />
                                            </Field>
                                            <Field label="Term (Months)">
                                                <select name="Loan_Term" value={formData.Loan_Term} onChange={handleChange} className={inputClass}>
                                                    <option value="12">12 months</option><option value="24">24 months</option><option value="36">36 months</option><option value="48">48 months</option><option value="60">60 months</option>
                                                </select>
                                            </Field>
                                            <Field label="Purpose">
                                                <select name="Loan_Purpose" value={formData.Loan_Purpose} onChange={handleChange} className={inputClass}>
                                                    <option value="Personal">Personal</option><option value="Home">Home</option><option value="Education">Education</option><option value="Business">Business</option><option value="Vehicle">Vehicle</option>
                                                </select>
                                            </Field>
                                            <Field label="Collateral Value (₹)">
                                                <input type="number" name="Collateral_Value" value={formData.Collateral_Value} onChange={handleChange} min="0" className={inputClass} placeholder="e.g. 500000" />
                                            </Field>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <SectionHeader title="🛡️ Credit Health" gradient="from-emerald-400 to-teal-400" />
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
                                            <Field label="Credit Score (300-900)">
                                                <input type="number" name="Credit_Score" value={formData.Credit_Score} onChange={handleChange} required min="300" max="900" className={inputClass} placeholder="e.g. 720" />
                                            </Field>
                                            <Field label="DTI Ratio (0.0 - 1.0)">
                                                <input type="number" name="DTI_Ratio" value={formData.DTI_Ratio} onChange={handleChange} required step="0.01" min="0" max="1" className={inputClass} placeholder="e.g. 0.35" />
                                            </Field>
                                            <Field label="Existing Loans">
                                                <select name="Existing_Loans" value={formData.Existing_Loans} onChange={handleChange} className={inputClass}>
                                                    {[0, 1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                                                </select>
                                            </Field>
                                            <div className="flex items-center justify-center p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">
                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest text-center">Data is encrypted and private</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.01, boxShadow: "0 0 40px rgba(99, 102, 241, 0.4)" }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                disabled={loading}
                                className={`w-full py-5 rounded-2xl text-lg font-black text-white uppercase tracking-[0.2em] shadow-2xl transition-all relative overflow-hidden group ${loading ? 'bg-slate-700' : 'bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600'}`}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    {loading ? (
                                        <div className="h-6 w-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <Sparkles size={22} className="group-hover:rotate-12 transition-transform" />
                                            Analyze Profile Now
                                        </>
                                    )}
                                </span>
                            </motion.button>
                        </form>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-8 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-center font-bold"
                                >
                                    {error}
                                </motion.div>
                            )}

                            {result && (
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-16 space-y-12"
                                >
                                    <div className={`p-8 sm:p-12 rounded-[2rem] text-center border relative overflow-hidden ${result.prediction === 'Approved' ? 'bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)]' : 'bg-rose-500/10 border-rose-500/20'}`}>
                                        <div className="relative z-10">
                                            <h2 className={`text-4xl sm:text-6xl font-black mb-6 tracking-tighter ${result.prediction === 'Approved' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                Loan {result.prediction}
                                            </h2>
                                            <div className="max-w-md mx-auto mb-8">
                                                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                                    <span>Confidence Score</span>
                                                    <span>{(result.probability * 100).toFixed(0)}%</span>
                                                </div>
                                                <div className="w-full bg-slate-800 rounded-full h-4 p-1">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${result.probability * 100}%` }}
                                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                                        className={`h-full rounded-full ${result.prediction === 'Approved' ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-rose-500 to-pink-500'}`}
                                                    />
                                                </div>
                                            </div>
                                            <p className="text-slate-300 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                                                {result.prediction === 'Approved'
                                                    ? 'Outstanding! Your financial profile demonstrates strong stability. We have matched you with top-tier banking partners.'
                                                    : 'Your current profile doesn\'t quite meet the eligibility threshold. Use our Credit Engine to see which factors to improve.'}
                                            </p>
                                        </div>
                                    </div>

                                    {result.prediction === 'Approved' && recommended.length > 0 && (
                                        <div className="space-y-8">
                                            <div className="flex items-center gap-4">
                                                <h3 className="text-2xl font-black text-white shrink-0 tracking-tight">Top Bank Recommendations</h3>
                                                <div className="h-px bg-white/10 w-full" />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {recommended.map((bank, index) => (
                                                    <motion.div
                                                        key={bank.id}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 hover:border-indigo-500/40 transition-all group relative overflow-hidden"
                                                    >
                                                        <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${bank.color} flex items-center justify-center text-white mb-6 shadow-xl`}>
                                                            <Landmark size={24} />
                                                        </div>
                                                        <h4 className="text-xl font-bold text-white mb-4">{bank.name} Bank</h4>
                                                        <div className="space-y-3 mb-8">
                                                            <div className="flex justify-between items-center"><span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Interest Rate</span><span className="text-emerald-400 font-black">{bank.rate}</span></div>
                                                            <div className="flex justify-between items-center"><span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Max Potential</span><span className="text-white font-bold">₹{bank.limit}</span></div>
                                                        </div>
                                                        <Link to="/banks" className="w-full py-3 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all border border-indigo-500/20">
                                                            View Details <ArrowRight size={16} />
                                                        </Link>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Predict;

export default Predict;
