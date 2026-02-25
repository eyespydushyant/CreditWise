import React from 'react';
import { Shield, Eye, Database, Lock, UserCheck } from 'lucide-react';

const sectionClass = "mb-10";
const h2Class = "text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2";
const pClass = "text-slate-600 dark:text-slate-400 leading-relaxed mb-4";

function Privacy() {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-slate-900 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-500/10 text-green-500 mb-4">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Privacy Policy</h1>
                    <p className="text-slate-500 dark:text-slate-400">Last updated: February 20, 2026</p>
                </div>

                <div className="bg-white dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-700/50 shadow-2xl">
                    <div className={sectionClass}>
                        <h2 className={h2Class}><Eye className="text-green-500" size={24} /> 1. Information We Collect</h2>
                        <p className={pClass}>
                            We collect information you provide directly to us when you create an account, use our simulation engine, or communicate with us.
                        </p>
                        <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                            <li>Identity Data: Name, email address, and demographic information.</li>
                            <li>Financial Data: Income, loan amounts, credit health indicators (for simulation).</li>
                            <li>Usage Data: Information about how you use our website and simulators.</li>
                        </ul>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}><Database className="text-green-500" size={24} /> 2. How We Use Your Data</h2>
                        <p className={pClass}>
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                            <li>Provide, maintain, and improve our AI simulation services.</li>
                            <li>Analyze trends and usage to enhance user experience.</li>
                            <li>Protect the security and integrity of our Service.</li>
                            <li>Communicate with you about updates or support requests.</li>
                        </ul>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}><Shield className="text-green-500" size={24} /> 3. Data Protection</h2>
                        <p className={pClass}>
                            We implement a variety of security measures to maintain the safety of your personal information. Your data is encrypted in transit and at rest using industry-standard protocols.
                        </p>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}><UserCheck className="text-green-500" size={24} /> 4. Your Rights</h2>
                        <p className={pClass}>
                            Depending on your location, you may have the following rights regarding your personal data:
                        </p>
                        <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 space-y-2">
                            <li>The right to access, update, or delete the information we have on you.</li>
                            <li>The right of rectification (to have inaccurate data corrected).</li>
                            <li>The right to object to our processing of your personal data.</li>
                        </ul>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                        <p className="text-sm text-slate-500 dark:text-slate-500 text-center italic">
                            Your privacy is important to us. If you have any concerns about how your data is handled, contact our Data Protection Officer at privacy@creditwise.com.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Privacy;
