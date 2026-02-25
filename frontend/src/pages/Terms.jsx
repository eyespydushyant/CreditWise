import React from 'react';
import { Shield, FileText, Scale, Lock } from 'lucide-react';

const sectionClass = "mb-10";
const h2Class = "text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2";
const pClass = "text-slate-600 dark:text-slate-400 leading-relaxed mb-4";

function Terms() {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-slate-900 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-500/10 text-indigo-500 mb-4">
                        <Scale size={32} />
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Terms and Conditions</h1>
                    <p className="text-slate-500 dark:text-slate-400">Last updated: February 20, 2026</p>
                </div>

                <div className="bg-white dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-700/50 shadow-2xl">
                    <div className={sectionClass}>
                        <h2 className={h2Class}><Shield className="text-indigo-500" size={24} /> 1. Introduction</h2>
                        <p className={pClass}>
                            Welcome to CreditWise ("Company", "we", "our", "us"). These Terms and Conditions govern your use of our website at creditwise.example.com (the "Service").
                        </p>
                        <p className={pClass}>
                            By accessing or using the Service, you signify that you have read, understood, and agree to be bound by these Terms. If you do not agree, you are not authorized to use the Service.
                        </p>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}><FileText className="text-indigo-500" size={24} /> 2. Accuracy of Information</h2>
                        <p className={pClass}>
                            The CreditWise Credit Improvement Engine and Loan Predictor are for informational and simulation purposes only. While we strive for accuracy, our AI models are based on patterns and do not guarantee actual approval from any financial institution.
                        </p>
                        <p className={pClass}>
                            We do not provide financial advice. You are encouraged to consult with a professional financial advisor before making any significant financial decisions.
                        </p>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}><Lock className="text-indigo-500" size={24} /> 3. User Accounts</h2>
                        <p className={pClass}>
                            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                        </p>
                        <p className={pClass}>
                            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                        </p>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}><Scale className="text-indigo-500" size={24} /> 4. Intellectual Property</h2>
                        <p className={pClass}>
                            The Service and its original content, features, and functionality are and will remain the exclusive property of CreditWise and its licensors. Our patterns, branding, and AI engine results are protected by copyright and trade secret laws.
                        </p>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}><Shield className="text-indigo-500" size={24} /> 5. Termination</h2>
                        <p className={pClass}>
                            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                        </p>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                        <p className="text-sm text-slate-500 dark:text-slate-500 text-center italic">
                            If you have any questions about these Terms, please contact us at support@creditwise.com.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Terms;
