import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Github, Twitter, Linkedin, Mail } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Activity className="text-indigo-500 h-8 w-8" />
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                                CreditWise
                            </span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
                            Empowering your financial future with AI-driven insights and credit improvement simulators.
                            Build your legacy, one point at a time.
                        </p>
                        <div className="flex space-x-5 text-slate-400">
                            <a href="#" className="hover:text-indigo-500 transition-colors"><Github size={20} /></a>
                            <a href="#" className="hover:text-indigo-500 transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-indigo-500 transition-colors"><Linkedin size={20} /></a>
                            <a href="#" className="hover:text-indigo-500 transition-colors"><Mail size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Platform</h4>
                        <ul className="space-y-3">
                            <li><Link to="/predict" className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors">Loan Predictor</Link></li>
                            <li><Link to="/improve" className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors">Credit Engine</Link></li>
                            <li><Link to="/banks" className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors">Partner Banks</Link></li>
                            <li><Link to="/credit-tips" className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors">Credit Tips</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Legal</h4>
                        <ul className="space-y-3">
                            <li><Link to="/privacy" className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors">Terms of Service</Link></li>
                            <li><Link to="/support" className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors">Support Center</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm italic">
                        © 2026 CreditWise AI Systems. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-1 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                            <Activity size={12} className="text-indigo-500" /> Powered by AI
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
