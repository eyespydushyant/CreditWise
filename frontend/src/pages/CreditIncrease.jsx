import React from 'react';

function CreditIncrease() {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-4">
                        Boost Your Credit Score
                    </h1>
                    <p className="text-lg text-slate-400">
                        Actionable tips and strategies to improve your financial health and increase loan eligibility.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* Tip 1 */}
                    <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 transform hover:-translate-y-1 transition-transform">
                        <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 text-green-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Pay on Time</h3>
                        <p className="text-slate-400">
                            Payment history is the biggest factor (35%) of your score. Set up autopay to never miss a due date.
                        </p>
                    </div>

                    {/* Tip 2 */}
                    <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 transform hover:-translate-y-1 transition-transform">
                        <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Lower Utilization</h3>
                        <p className="text-slate-400">
                            Keep your credit card balances below 30% of your limit. Paying down debt helps immediately.
                        </p>
                    </div>

                    {/* Tip 3 */}
                    <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 transform hover:-translate-y-1 transition-transform">
                        <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 text-purple-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Check for Errors</h3>
                        <p className="text-slate-400">
                            Regularly review your credit report for inaccuracies. Disputing errors can give your score a quick boost.
                        </p>
                    </div>

                    {/* Tip 4 */}
                    <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 transform hover:-translate-y-1 transition-transform">
                        <div className="h-12 w-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4 text-red-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Keep Old Accounts</h3>
                        <p className="text-slate-400">
                            Don't close old credit cards. The age of your credit history matters significantly.
                        </p>
                    </div>

                    {/* Tip 5 */}
                    <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 transform hover:-translate-y-1 transition-transform">
                        <div className="h-12 w-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4 text-yellow-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Diversify Credit</h3>
                        <p className="text-slate-400">
                            A mix of credit types (credit cards, installment loans) can improve your score over time.
                        </p>
                    </div>

                    {/* Tip 6 */}
                    <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 transform hover:-translate-y-1 transition-transform">
                        <div className="h-12 w-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4 text-pink-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Limit Hard Inquiries</h3>
                        <p className="text-slate-400">
                            Apply for new credit only when necessary. Too many hard inquiries in a short time can lower your score.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreditIncrease;
