import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-slate-100 min-h-[calc(100vh-64px)] transition-colors duration-300">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-4 bg-gray-50 dark:bg-slate-900 sm:pb-8 md:pb-16 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 transition-colors duration-300">
                        <main className="mt-6 mx-auto max-w-7xl px-0 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">Unlock your financial</span>{' '}
                                    <span className="block text-indigo-500 dark:text-indigo-400 xl:inline">potential today</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 dark:text-slate-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    Get instant loan eligibility predictions powered by advanced AI. Understand your credit health and take control of your financial future.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <Link to="/predict" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                                            Check Eligibility
                                        </Link>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                        <Link to="/credit-tips" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                                            Improve Score
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex items-center justify-center p-8">
                    {/* Animated Fintech Illustration */}
                    <div className="relative w-full max-w-md">
                        <svg viewBox="0 0 420 340" xmlns="http://www.w3.org/2000/svg" className="w-full drop-shadow-2xl">
                            <defs>
                                <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#1e1b4b" />
                                    <stop offset="100%" stopColor="#312e81" />
                                </linearGradient>
                                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#6366f1" />
                                    <stop offset="100%" stopColor="#a855f7" />
                                </linearGradient>
                                <linearGradient id="barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#818cf8" />
                                    <stop offset="100%" stopColor="#4f46e5" />
                                </linearGradient>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                    <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                                </filter>
                            </defs>

                            {/* Background card */}
                            <rect x="10" y="10" width="400" height="320" rx="24" fill="url(#bgGrad)" opacity="0.95" />

                            {/* Decorative dots */}
                            {[30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390].map((x, i) =>
                                [30, 60, 90, 120, 150, 180, 210, 240, 270, 300].map((y, j) => (
                                    <circle key={`${i}-${j}`} cx={x} cy={y} r="1" fill="#6366f1" opacity="0.15" />
                                ))
                            )}

                            {/* ── Credit Score Gauge ── */}
                            {/* Arc background */}
                            <path d="M 100 195 A 80 80 0 0 1 260 195" fill="none" stroke="#374151" strokeWidth="14" strokeLinecap="round" />
                            {/* Arc fill (animated) */}
                            <path d="M 100 195 A 80 80 0 0 1 260 195" fill="none" stroke="url(#scoreGrad)" strokeWidth="14" strokeLinecap="round"
                                strokeDasharray="251" strokeDashoffset="63" filter="url(#glow)">
                                <animate attributeName="stroke-dashoffset" from="251" to="63" dur="1.5s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" />
                            </path>
                            {/* Needle */}
                            <line x1="180" y1="195" x2="180" y2="130" stroke="#a5b4fc" strokeWidth="3" strokeLinecap="round">
                                <animateTransform attributeName="transform" type="rotate" from="-80 180 195" to="25 180 195" dur="1.5s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" />
                            </line>
                            <circle cx="180" cy="195" r="8" fill="#6366f1" filter="url(#glow)" />
                            {/* Score labels */}
                            <text x="95" y="215" fill="#9ca3af" fontSize="10" textAnchor="middle">300</text>
                            <text x="180" y="108" fill="#9ca3af" fontSize="10" textAnchor="middle">600</text>
                            <text x="265" y="215" fill="#9ca3af" fontSize="10" textAnchor="middle">900</text>
                            {/* Score value */}
                            <text x="180" y="175" fill="white" fontSize="28" fontWeight="bold" textAnchor="middle" filter="url(#glow)">750</text>
                            <text x="180" y="192" fill="#a5b4fc" fontSize="11" textAnchor="middle">Credit Score</text>

                            {/* ── Approval Badge ── */}
                            <rect x="20" y="20" width="130" height="55" rx="12" fill="#1f2937" stroke="#4f46e5" strokeWidth="1.5" opacity="0.9">
                                <animate attributeName="opacity" from="0" to="0.9" dur="0.5s" begin="0.8s" fill="freeze" />
                            </rect>
                            <circle cx="42" cy="47" r="12" fill="#10b981">
                                <animate attributeName="r" from="0" to="12" dur="0.4s" begin="0.9s" fill="freeze" />
                            </circle>
                            <text x="42" y="52" fill="white" fontSize="13" textAnchor="middle" fontWeight="bold">✓</text>
                            <text x="85" y="42" fill="white" fontSize="10" fontWeight="bold">APPROVED</text>
                            <text x="85" y="57" fill="#6b7280" fontSize="9">₹5,00,000</text>

                            {/* ── Bar Chart ── */}
                            <rect x="270" y="20" width="130" height="100" rx="12" fill="#1f2937" stroke="#374151" strokeWidth="1" opacity="0.9" />
                            <text x="335" y="38" fill="#9ca3af" fontSize="9" textAnchor="middle">Loan Trend</text>
                            {/* Bars */}
                            {[
                                { x: 285, h: 35, delay: '0.6s' },
                                { x: 305, h: 50, delay: '0.7s' },
                                { x: 325, h: 40, delay: '0.8s' },
                                { x: 345, h: 60, delay: '0.9s' },
                                { x: 365, h: 55, delay: '1.0s' },
                            ].map((bar, i) => (
                                <g key={i}>
                                    <rect x={bar.x} y={110 - bar.h} width="14" height={bar.h} rx="3" fill="url(#barGrad)" opacity="0">
                                        <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin={bar.delay} fill="freeze" />
                                        <animate attributeName="height" from="0" to={bar.h} dur="0.5s" begin={bar.delay} fill="freeze" />
                                        <animate attributeName="y" from="110" to={110 - bar.h} dur="0.5s" begin={bar.delay} fill="freeze" />
                                    </rect>
                                </g>
                            ))}

                            {/* ── Rupee Symbol ── */}
                            <circle cx="335" cy="230" r="40" fill="#1f2937" stroke="#4f46e5" strokeWidth="1.5" opacity="0.85">
                                <animate attributeName="opacity" from="0" to="0.85" dur="0.5s" begin="1.2s" fill="freeze" />
                            </circle>
                            <text x="335" y="242" fill="url(#scoreGrad)" fontSize="36" fontWeight="bold" textAnchor="middle" filter="url(#glow)">₹</text>

                            {/* ── EMI Card ── */}
                            <rect x="20" y="240" width="130" height="55" rx="12" fill="#1f2937" stroke="#374151" strokeWidth="1" opacity="0.9">
                                <animate attributeName="opacity" from="0" to="0.9" dur="0.5s" begin="1.0s" fill="freeze" />
                            </rect>
                            <text x="85" y="262" fill="#9ca3af" fontSize="9" textAnchor="middle">Monthly EMI</text>
                            <text x="85" y="280" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">₹9,500</text>
                            <text x="85" y="292" fill="#10b981" fontSize="9" textAnchor="middle">↓ Low Rate 10.5%</text>

                            {/* Floating particles */}
                            <circle cx="50" cy="150" r="3" fill="#6366f1" opacity="0.6">
                                <animate attributeName="cy" values="150;140;150" dur="3s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="310" cy="160" r="2" fill="#a855f7" opacity="0.5">
                                <animate attributeName="cy" values="160;150;160" dur="2.5s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="200" cy="280" r="4" fill="#818cf8" opacity="0.4">
                                <animate attributeName="cy" values="280;270;280" dur="4s" repeatCount="indefinite" />
                            </circle>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Credit Engine Promo Section */}
            <div className="bg-white dark:bg-slate-800 border-y border-slate-200 dark:border-slate-700/50 py-12 md:py-24 transition-colors duration-300 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 relative z-10">
                    <div className="lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        <div className="mb-12 lg:mb-0">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 mb-6 uppercase tracking-wider">
                                New Feature
                            </span>
                            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                                Boost Your Loan Odds with our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Credit Engine</span>
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                Don't leave your approval to chance. Our new What-If Simulator lets you play with markers like utilization and DTI ratio to see exactly how they affect your probability.
                            </p>

                            <ul className="space-y-4 mb-10">
                                {[
                                    'Real-time probability simulation',
                                    'Personalized 30-day improvement plans',
                                    'No impact on your actual CIBIL score',
                                    'Direct sync with your loan application'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center">
                                            <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to="/improve" className="inline-flex items-center px-8 py-4 rounded-xl text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 transform hover:-translate-y-1 transition-all group">
                                Open Credit Engine
                                <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-50"></div>
                            <div className="relative bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl p-6 sm:p-10 overflow-hidden group">
                                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>

                                <div className="space-y-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="h-2 w-24 bg-slate-700 rounded-full"></div>
                                        <div className="h-6 w-12 bg-indigo-500/20 rounded-lg"></div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                                            <span>Simulating Health</span>
                                            <span className="text-indigo-400">Calculation In Progress</span>
                                        </div>
                                        <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 w-3/4 animate-[shimmer_2s_infinite]"></div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                                            <div className="text-[10px] text-slate-500 mb-1">DTI RATIO</div>
                                            <div className="text-xl font-bold text-white">0.32</div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                                            <div className="text-[10px] text-slate-500 mb-1">UTILIZATION</div>
                                            <div className="text-xl font-bold text-white">28%</div>
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-600/20 text-center relative z-10">
                                        <div className="text-[10px] text-indigo-100 mb-1 uppercase tracking-widest font-bold">Approval Odds</div>
                                        <div className="text-4xl font-black text-white">82%</div>
                                        <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-[8px] font-bold bg-white/20 text-white uppercase">
                                            Excellent Potential
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works Section with GIF */}
            <div className="py-12 md:py-24 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="absolute -inset-10 bg-indigo-500/10 rounded-full blur-3xl"></div>
                            <img
                                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Y5Ym9qZWF4eGZ6eGZ6eGZ6eGZ6eGZ6eGZ6eGZ6eGZ6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKMGpx4YlE3V0Yw/giphy.gif"
                                alt="Financial AI Analysis"
                                className="w-full rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 relative z-10"
                            />
                        </div>
                        <div className="order-1 lg:order-2 mb-12 lg:mb-0">
                            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6">
                                Intelligent Analysis in <span className="text-indigo-500">Real-Time</span>
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                Our AI engine doesn't just look at numbers; it understands patterns. By analyzing thousands of data points, we provide a holistic view of your financial health, helping you make informed decisions that lead to faster approvals.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { title: 'Data Ingestion', desc: 'Securely import your financial profile.' },
                                    { title: 'Pattern Recognition', desc: 'AI identifies strengths and risk factors.' },
                                    { title: 'Instant Score-Update', desc: 'See how simulations change your outlook.' }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white">{step.title}</h4>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-12 bg-gray-100 dark:bg-slate-800 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-indigo-500 dark:text-indigo-400 font-semibold tracking-wide uppercase">Features</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Everything you need for loan approval
                        </p>
                    </div>

                    <div className="mt-10">
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                            <div className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Instant AI Prediction</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-slate-400">
                                    Our advanced machine learning model analyzes your profile in seconds to give you an accurate approval probability.
                                </dd>
                            </div>

                            <div className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Secure &amp; Private</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-slate-400">
                                    Your data is processed securely and never shared with third parties without your explicit consent.
                                </dd>
                            </div>

                            <div className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Credit Education</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-slate-400">
                                    Learn how to improve your credit score and financial health with our expert tips and guides.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
