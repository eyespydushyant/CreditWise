import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    Activity,
    ArrowUpRight,
    AlertTriangle,
    CheckCircle2,
    Info,
    TrendingUp,
    ShieldCheck,
    CreditCard,
    Calendar,
    Search,
    IndianRupee,
    ArrowRight
} from 'lucide-react';

import { simulateCredit } from '../api';

const inputClass = "w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500";
const cardClass = "bg-white dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-slate-700/50 shadow-xl transition-all duration-300";

function CreditImprovement() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [simulatorData, setSimulatorData] = useState({
        Utilization_Rate: 0.35,
        Missed_Payments: 0,
        Hard_Inquiries: 2,
        Applicant_Income: 50000,
        Monthly_EMI: 15000,
        Credit_Score: 720,
    });

    const [simulation, setSimulation] = useState({
        current_probability: 0.65,
        prediction: 'Approved',
        impacts: {
            utilization: 0.05,
            dti: 0.03,
            credit_score: 0.08
        }
    });

    const fetchSimulation = useCallback(async (data) => {
        setLoading(true);
        try {
            // Map simulator monthly EMI to DTI Ratio for the model
            const dti = data.Monthly_EMI / data.Applicant_Income;

            const payload = {
                ...data,
                DTI_Ratio: dti,
                user_id: user?.id
            };

            const result = await simulateCredit(payload);
            setSimulation(result);
        } catch (err) {
            console.error("Simulation failed:", err);
        } finally {
            setLoading(false);
        }
    }, [user]);

    // Debounce simulation update
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchSimulation(simulatorData);
        }, 500);
        return () => clearTimeout(timer);
    }, [simulatorData, fetchSimulation]);

    const handleSliderChange = (e) => {
        const { name, value } = e.target;
        setSimulatorData(prev => ({
            ...prev,
            [name]: parseFloat(value)
        }));
    };

    const getRiskColor = (prob) => {
        if (prob >= 0.7) return 'text-green-400';
        if (prob >= 0.4) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getRiskLevel = (prob) => {
        if (prob >= 0.7) return 'Low Risk';
        if (prob >= 0.4) return 'Moderate Risk';
        return 'High Risk';
    };

    const suggestions = [
        {
            condition: simulatorData.Utilization_Rate > 0.3,
            text: "Reduce credit card usage below 30% to improve score.",
            icon: <CreditCard className="text-orange-400" />
        },
        {
            condition: simulatorData.Missed_Payments > 0,
            text: "Make on-time payments for the next 6 months to restore health.",
            icon: <Calendar className="text-red-400" />
        },
        {
            condition: simulatorData.Hard_Inquiries > 3,
            text: "Avoid applying for multiple loans in a short period.",
            icon: <Search className="text-yellow-400" />
        },
        {
            condition: (simulatorData.Monthly_EMI / simulatorData.Applicant_Income) > 0.4,
            text: "Your Debt-to-Income ratio is high. Try closing small debts.",
            icon: <Activity className="text-purple-400" />
        }
    ].filter(s => s.condition);

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-slate-900 py-6 sm:py-12 px-2 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-4">
                        Credit Improvement Engine
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Simulate financial actions and see how they impact your loan approval odds in real-time.
                    </p>
                    <div className="mt-4 flex justify-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                            <Info size={12} className="mr-1.5" /> Simulation based on behavior patterns. No CIBIL impact.
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Dashboard & Risk Meter */}
                    <div className="space-y-8 lg:col-span-1">
                        {/* Risk Meter Card */}
                        <div className={cardClass}>
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <TrendingUp size={20} className="text-indigo-400" /> Loan Approval Health
                            </h3>
                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div>
                                        <span className={`text-3xl font-bold ${getRiskColor(simulation.current_probability)}`}>
                                            {(simulation.current_probability * 100).toFixed(0)}%
                                        </span>
                                        <span className="text-slate-500 text-sm ml-2">Probability</span>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-slate-700/50 ${getRiskColor(simulation.current_probability)}`}>
                                            {getRiskLevel(simulation.current_probability)}
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-slate-700">
                                    <div
                                        style={{ width: `${simulation.current_probability * 100}%` }}
                                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-1000 ${simulation.current_probability > 0.7 ? 'bg-green-500' : simulation.current_probability > 0.4 ? 'bg-yellow-500' : 'bg-red-500'
                                            }`}
                                    />
                                </div>
                                <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase">
                                    <span>High Risk</span>
                                    <span>Standard</span>
                                    <span>Excellent</span>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-700/50 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 text-sm">Credit Score</span>
                                    <span className="font-bold text-white">{simulatorData.Credit_Score}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 text-sm">Utilization</span>
                                    <span className="font-bold text-white">{(simulatorData.Utilization_Rate * 100).toFixed(0)}%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 text-sm">DTI Ratio</span>
                                    <span className="font-bold text-white">{(simulatorData.Monthly_EMI / simulatorData.Applicant_Income).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Suggestions Card */}
                        <div className={cardClass}>
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <ShieldCheck size={20} className="text-green-400" /> 30-Day Improvement Plan
                            </h3>
                            {suggestions.length > 0 ? (
                                <div className="space-y-4">
                                    {suggestions.map((s, idx) => (
                                        <div key={idx} className="flex gap-4 items-start p-3 rounded-xl bg-slate-900/30 border border-slate-700/30">
                                            <div className="mt-1">{s.icon}</div>
                                            <p className="text-sm text-slate-300 leading-relaxed">{s.text}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6">
                                    <CheckCircle2 className="mx-auto text-green-500 mb-3" size={32} />
                                    <p className="text-slate-400 text-sm">Your credit health looks great! Keep it up.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Middle & Right: Simulator Sliders */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className={cardClass}>
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Activity size={24} className="text-indigo-500" /> What-If Simulator
                                </h3>
                                {loading && <div className="flex items-center text-indigo-400 text-xs animate-pulse"><Activity size={12} className="mr-1 animate-spin" /> Calculating...</div>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <label className="text-sm text-slate-400">Credit Card Utilization</label>
                                            <span className="text-indigo-400 font-bold">{(simulatorData.Utilization_Rate * 100).toFixed(0)}%</span>
                                        </div>
                                        <input
                                            type="range" name="Utilization_Rate"
                                            min="0" max="1" step="0.01"
                                            value={simulatorData.Utilization_Rate}
                                            onChange={handleSliderChange}
                                            className={inputClass}
                                        />
                                        <div className="flex justify-between text-[10px] text-slate-500"><span>0%</span><span>50%</span><span>100%</span></div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <label className="text-sm text-slate-400">Missed Payments (Last 12mo)</label>
                                            <span className="text-indigo-400 font-bold">{simulatorData.Missed_Payments}</span>
                                        </div>
                                        <input
                                            type="range" name="Missed_Payments"
                                            min="0" max="5" step="1"
                                            value={simulatorData.Missed_Payments}
                                            onChange={handleSliderChange}
                                            className={inputClass}
                                        />
                                        <div className="flex justify-between text-[10px] text-slate-500"><span>0</span><span>2</span><span>5+</span></div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <label className="text-sm text-slate-400">Hard Inquiries</label>
                                            <span className="text-indigo-400 font-bold">{simulatorData.Hard_Inquiries}</span>
                                        </div>
                                        <input
                                            type="range" name="Hard_Inquiries"
                                            min="0" max="10" step="1"
                                            value={simulatorData.Hard_Inquiries}
                                            onChange={handleSliderChange}
                                            className={inputClass}
                                        />
                                        <div className="flex justify-between text-[10px] text-slate-500"><span>0</span><span>5</span><span>10</span></div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <label className="text-sm text-slate-400 font-medium">Monthly Income (₹)</label>
                                            <span className="text-indigo-400 font-bold">₹{simulatorData.Applicant_Income.toLocaleString()}</span>
                                        </div>
                                        <input
                                            type="range" name="Applicant_Income"
                                            min="10000" max="200000" step="1000"
                                            value={simulatorData.Applicant_Income}
                                            onChange={handleSliderChange}
                                            className={inputClass}
                                        />
                                        <div className="flex justify-between text-[10px] text-slate-500"><span>10k</span><span>100k</span><span>200k+</span></div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <label className="text-sm text-slate-400">Monthly EMI (Total)</label>
                                            <span className="text-indigo-400 font-bold">₹{simulatorData.Monthly_EMI.toLocaleString()}</span>
                                        </div>
                                        <input
                                            type="range" name="Monthly_EMI"
                                            min="0" max="100000" step="500"
                                            value={simulatorData.Monthly_EMI}
                                            onChange={handleSliderChange}
                                            className={inputClass}
                                        />
                                        <div className="flex justify-between text-[10px] text-slate-500"><span>0</span><span>50k</span><span>100k</span></div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <label className="text-sm text-slate-400">CIBIL/Credit Score</label>
                                            <span className="text-indigo-400 font-bold">{simulatorData.Credit_Score}</span>
                                        </div>
                                        <input
                                            type="range" name="Credit_Score"
                                            min="300" max="900" step="1"
                                            value={simulatorData.Credit_Score}
                                            onChange={handleSliderChange}
                                            className={inputClass}
                                        />
                                        <div className="flex justify-between text-[10px] text-slate-500"><span>300</span><span>600</span><span>900</span></div>
                                    </div>
                                </div>
                            </div>

                            {/* Potential Gains Section */}
                            <div className="mt-12 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6">
                                <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-4">Potential Feature Impact</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                            <CreditCard size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 uppercase">Lowering Util.</p>
                                            <p className="text-sm font-bold text-white">+{((simulation.impacts?.utilization || 0) * 100).toFixed(1)}% Chance</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                            <IndianRupee size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 uppercase">Lowering DTI</p>
                                            <p className="text-sm font-bold text-white">+{((simulation.impacts?.dti || 0) * 100).toFixed(1)}% Chance</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                            <TrendingUp size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 uppercase">Better Score</p>
                                            <p className="text-sm font-bold text-white">+{((simulation.impacts?.credit_score || 0) * 100).toFixed(1)}% Chance</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Summary Action Card */}
                        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                <Activity size={120} />
                            </div>
                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                                <div>
                                    <h4 className="text-2xl font-bold text-white mb-2">Ready to apply with improved profile?</h4>
                                    <p className="text-indigo-100 text-sm opacity-90">Your current selection has a <span className="font-bold underline">{(simulation.current_probability * 100).toFixed(0)}%</span> approval chance.</p>
                                </div>
                                <button
                                    onClick={() => {
                                        const params = new URLSearchParams({
                                            Applicant_Income: simulatorData.Applicant_Income,
                                            Credit_Score: simulatorData.Credit_Score,
                                            DTI_Ratio: (simulatorData.Monthly_EMI / simulatorData.Applicant_Income).toFixed(2),
                                            Utilization_Rate: simulatorData.Utilization_Rate,
                                            Missed_Payments: simulatorData.Missed_Payments,
                                            Hard_Inquiries: simulatorData.Hard_Inquiries
                                        }).toString();
                                        window.location.href = `/predict?${params}`;
                                    }}
                                    className="px-8 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                                >
                                    Proceed to Application <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="mt-12 text-center text-slate-500 text-xs">
                    <p>© 2026 CreditWise AI. This tool is purely for educational simulation based on machine learning models and does not guarantee bank approval.</p>
                </div>
            </div>
        </div>
    );
}

export default CreditImprovement;
