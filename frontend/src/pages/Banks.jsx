import React from 'react';
import { Building, ArrowRight, Star, ExternalLink, CheckCircle } from 'lucide-react';

const banks = [
    {
        id: 1,
        name: 'SBI',
        fullName: 'State Bank of India',
        rate: '10.30% - 15.90%',
        term: '12 - 72 Months',
        maxLoan: '₹20 Lakhs',
        minScore: 700,
        badge: 'Most Popular',
        badgeColor: 'bg-green-500',
        features: [
            'No prepayment charges after 6 EMIs',
            'Instant approval for existing SBI customers',
            'Loan amount up to ₹20 Lakhs',
            'Minimal documentation required',
        ],
        color: 'from-blue-700 to-blue-900',
        link: 'https://sbi.co.in/web/personal-banking/loans/personal-loans',
        logo: 'SBI',
    },
    {
        id: 2,
        name: 'HDFC',
        fullName: 'HDFC Bank',
        rate: '10.50% - 21.00%',
        term: '12 - 60 Months',
        maxLoan: '₹40 Lakhs',
        minScore: 720,
        badge: 'Fastest Disbursal',
        badgeColor: 'bg-indigo-500',
        features: [
            '10-second loan disbursal for pre-approved customers',
            'Loan amount up to ₹40 Lakhs',
            '0.25% rate discount on salary account',
            'Flexible repayment options',
        ],
        color: 'from-red-600 to-red-900',
        link: 'https://www.hdfcbank.com/personal/borrow/popular-loans/personal-loan',
        logo: 'HDFC',
    },
    {
        id: 3,
        name: 'ICICI',
        fullName: 'ICICI Bank',
        rate: '10.65% - 16.00%',
        term: '12 - 72 Months',
        maxLoan: '₹50 Lakhs',
        minScore: 700,
        badge: 'Highest Limit',
        badgeColor: 'bg-purple-500',
        features: [
            'Loan up to ₹50 Lakhs — highest in India',
            'Instant e-approval in 3 seconds',
            'Part-prepayment allowed after 12 EMIs',
            'Doorstep document collection',
        ],
        color: 'from-orange-600 to-orange-900',
        link: 'https://www.icicibank.com/personal-banking/loans/personal-loan',
        logo: 'ICICI',
    },
    {
        id: 4,
        name: 'Axis',
        fullName: 'Axis Bank',
        rate: '10.49% - 22.00%',
        term: '12 - 60 Months',
        maxLoan: '₹40 Lakhs',
        minScore: 680,
        badge: 'Low CIBIL Required',
        badgeColor: 'bg-pink-500',
        features: [
            'Accepts CIBIL score as low as 680',
            'No collateral or guarantor needed',
            '24-hour disbursal guarantee',
            'Online account management',
        ],
        color: 'from-purple-700 to-purple-900',
        link: 'https://www.axisbank.com/retail/loans/personal-loan',
        logo: 'AXIS',
    },
    {
        id: 5,
        name: 'Kotak',
        fullName: 'Kotak Mahindra Bank',
        rate: '10.99% - 24.00%',
        term: '12 - 60 Months',
        maxLoan: '₹35 Lakhs',
        minScore: 700,
        badge: 'Digital First',
        badgeColor: 'bg-red-500',
        features: [
            '100% digital application — no branch visit',
            'Loan amount up to ₹35 Lakhs',
            'Instant approval within minutes',
            'Flexible EMI dates',
        ],
        color: 'from-red-700 to-red-900',
        link: 'https://www.kotak.com/en/personal-banking/loans/personal-loan.html',
        logo: 'KOTAK',
    },
    {
        id: 6,
        name: 'PNB',
        fullName: 'Punjab National Bank',
        rate: '10.40% - 16.95%',
        term: '12 - 60 Months',
        maxLoan: '₹20 Lakhs',
        minScore: 650,
        badge: 'Best for Govt. Employees',
        badgeColor: 'bg-teal-500',
        features: [
            'Special low rates for government employees',
            'Accepts CIBIL score from 650',
            'No processing fee for select categories',
            'Loan up to ₹20 Lakhs',
        ],
        color: 'from-teal-700 to-teal-900',
        link: 'https://www.pnbindia.in/personal-loan.html',
        logo: 'PNB',
    },
];

function Banks() {

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500 mb-4">
                        Partner Banks &amp; Loan Offers
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-slate-400 max-w-2xl mx-auto">
                        Compare real personal loan offers from India's top banks. Rates and terms as of 2025.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm px-4 py-2 rounded-full">
                        <CheckCircle className="w-4 h-4" />
                        All rates are real and sourced from official bank websites
                    </div>
                </div>

                {/* Bank Cards */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {banks.map((bank) => (
                        <div
                            key={bank.id}
                            className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md border border-gray-200 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Card Header */}
                            <div className={`h-28 bg-gradient-to-r ${bank.color} p-5 flex items-center justify-between relative`}>
                                <div className="flex items-center space-x-3">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-xl w-14 h-14 flex items-center justify-center">
                                        <span className="text-white font-extrabold text-sm tracking-tight">{bank.logo}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{bank.name}</h3>
                                        <p className="text-white/70 text-xs">{bank.fullName}</p>
                                    </div>
                                </div>
                                {/* Badge */}
                                <span className={`absolute top-3 right-3 ${bank.badgeColor} text-white text-xs font-semibold px-2 py-1 rounded-full`}>
                                    {bank.badge}
                                </span>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 space-y-4">
                                {/* Rate & Term */}
                                <div className="flex justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-4">
                                    <div>
                                        <p className="text-xs text-gray-400 dark:text-slate-400 uppercase tracking-wide">Interest Rate (p.a.)</p>
                                        <p className="text-xl font-bold text-gray-900 dark:text-white">{bank.rate}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400 dark:text-slate-400 uppercase tracking-wide">Loan Term</p>
                                        <p className="text-base font-semibold text-gray-700 dark:text-slate-200">{bank.term}</p>
                                    </div>
                                </div>

                                {/* Max Loan */}
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 dark:text-slate-400">Max Loan Amount</span>
                                    <span className="font-bold text-indigo-600 dark:text-indigo-400 text-base">{bank.maxLoan}</span>
                                </div>

                                {/* Features */}
                                <div>
                                    <p className="text-xs text-gray-400 dark:text-slate-400 uppercase tracking-wide mb-2">Key Highlights</p>
                                    <ul className="space-y-1.5">
                                        {bank.features.map((feature, index) => (
                                            <li key={index} className="flex items-start text-sm text-gray-600 dark:text-slate-300">
                                                <Star className="w-3.5 h-3.5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Min Credit Score */}
                                <div className="flex justify-between items-center text-sm pt-1">
                                    <span className="text-gray-400 dark:text-slate-500">Min. CIBIL Score</span>
                                    <span className="font-bold text-gray-700 dark:text-slate-200">{bank.minScore}+</span>
                                </div>

                                {/* CTA Button */}
                                <a
                                    href={bank.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center transition-colors group"
                                >
                                    Apply Now
                                    <ExternalLink className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Disclaimer */}
                <p className="text-center text-xs text-gray-400 dark:text-slate-500 mt-10">
                    * Interest rates are indicative and subject to change. Please visit the bank's official website for the latest offers. CreditWise is not affiliated with any of the listed banks.
                </p>
            </div>
        </div>
    );
}

export default Banks;
