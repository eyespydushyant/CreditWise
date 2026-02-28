import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, CreditCard, PieChart, RefreshCcw } from 'lucide-react';
import { getHistory } from '../api';

function Account() {
    const { user } = useAuth();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHistory = React.useCallback(async () => {
        try {
            setLoading(true);
            const data = await getHistory(user?.id);
            setHistory(data);
        } catch (error) {
            console.error('Failed to fetch history:', error);
        } finally {
            setLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        if (user) {
            fetchHistory();
        }
    }, [user, fetchHistory]);

    if (!user) return null;

    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-950 py-6 sm:py-12 px-0 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">My Account</h1>
                    <p className="text-slate-400">Manage your profile and track your loan applications</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                    {/* User Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-xl text-center h-full flex flex-col items-center justify-center">
                            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 text-4xl font-bold text-white shadow-lg shadow-indigo-500/20">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">{user.username}</h3>
                            <div className="flex items-center text-slate-400 mb-6 gap-2">
                                <Mail size={16} />
                                <span>{user.email}</span>
                            </div>
                            <div className="w-full pt-6 border-t border-slate-700/50 mt-auto">
                                <button className="w-full py-2.5 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-sm font-semibold transition-all">
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats/Summary Section */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700 flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400">
                                    <CreditCard size={24} />
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm">Total Applications</p>
                                    <p className="text-2xl font-bold text-white">{history.length}</p>
                                </div>
                            </div>
                            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700 flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                                    <PieChart size={24} />
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm">Approval Rate</p>
                                    <p className="text-2xl font-bold text-white">
                                        {history.length > 0
                                            ? Math.round((history.filter(a => a.prediction === 'Approved').length / history.length) * 100)
                                            : 0}%
                                    </p>
                                </div>
                            </div>
                            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700 sm:col-span-2">
                                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                                    <Calendar size={18} className="text-indigo-400" /> Account Security
                                </h4>
                                <p className="text-slate-400 text-sm mb-4">Your account is secured with end-to-end encryption. Last activity: {new Date().toLocaleDateString()}</p>
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-medium border border-green-500/20">Verified Email</span>
                                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-medium border border-indigo-500/20">Active Session</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* History Table */}
                <div className="bg-slate-800/30 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                    <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
                        <h3 className="text-xl font-bold text-white">Application History</h3>
                        <button
                            onClick={fetchHistory}
                            disabled={loading}
                            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-semibold transition-colors disabled:opacity-50"
                        >
                            <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
                            Refresh
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        {loading && history.length === 0 ? (
                            <div className="p-12 text-center">
                                <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                                <p className="text-slate-400">Fetching your application history...</p>
                            </div>
                        ) : history.length === 0 ? (
                            <div className="p-16 text-center text-slate-400">
                                <div className="relative mb-6 inline-block">
                                    <div className="absolute -inset-4 bg-indigo-500/20 rounded-full blur-xl animate-pulse"></div>
                                    <img
                                        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Y5Ym9qZWF4eGZ6eGZ6eGZ6eGZ6eGZ6eGZ6eGZ6eGZ6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKMGpx4YlE3V0Yw/giphy.gif"
                                        className="h-32 w-32 object-cover rounded-2xl relative z-10 border border-slate-700 mx-auto"
                                        alt="Empty History"
                                    />
                                </div>
                                <p className="text-lg font-medium text-slate-300 mb-2">No applications yet</p>
                                <p className="text-sm max-w-xs mx-auto">When you check your eligibility, your professional AI results will appear right here.</p>
                            </div>
                        ) : (
                            <table className="min-w-full divide-y divide-slate-700">
                                <thead className="bg-slate-900/40">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Loan Amount</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Monthly Income</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Score</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50 bg-slate-800/20">
                                    {history.map((app) => (
                                        <tr key={app.id} className="hover:bg-indigo-500/5 transition-colors group">
                                            <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-300 font-medium">
                                                {new Date(app.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap text-sm text-white font-bold">
                                                ₹{app.Loan_Amount?.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-300">
                                                ₹{app.Applicant_Income?.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-lg border ${app.prediction === 'Approved'
                                                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                                                    }`}>
                                                    {app.prediction}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 h-1.5 w-16 bg-slate-700 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full ${app.prediction === 'Approved' ? 'bg-green-500' : 'bg-red-500'}`}
                                                            style={{ width: `${app.probability * 100}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-xs font-bold text-slate-400">{Math.round(app.probability * 100)}%</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
