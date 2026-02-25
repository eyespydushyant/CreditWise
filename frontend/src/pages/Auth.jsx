import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { LogIn, UserPlus, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSlowHint, setShowSlowHint] = useState(false);

    const { login, signup, googleLogin } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setShowSlowHint(false);

        const hintTimer = setTimeout(() => setShowSlowHint(true), 3000);

        try {
            if (isLogin) {
                const result = await login({ username: formData.username, password: formData.password });
                if (result.success) {
                    navigate('/predict');
                } else {
                    setError(result.error || 'Login failed. Please check your credentials.');
                }
            } else {
                const result = await signup(formData);
                if (result.success) {
                    setIsLogin(true);
                    setError('Account created! Please sign in now.');
                } else {
                    setError(result.error || 'Signup failed. Username or Email may already exist.');
                }
            }
        } catch (err) {
            setError('Connection failed. Our server might be starting up—please try again in 30 seconds.');
        } finally {
            clearTimeout(hintTimer);
            setLoading(false);
            setShowSlowHint(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        setError('');
        setLoading(true);
        setShowSlowHint(false);
        const hintTimer = setTimeout(() => setShowSlowHint(true), 3000);
        try {
            const result = await googleLogin(credentialResponse.credential);
            if (result.success) {
                navigate('/predict');
            } else {
                setError(result.error || 'Google login failed.');
            }
        } catch (err) {
            setError('Google login failed. Please try again.');
        } finally {
            clearTimeout(hintTimer);
            setLoading(false);
            setShowSlowHint(false);
        }
    };

    const handleGoogleError = () => {
        setError('Google sign-in was cancelled or failed. Please try again.');
    };

    const inputStyle = "w-full bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all text-sm sm:text-base shadow-inner shadow-black/20";

    return (
        <div className="min-h-[calc(100vh-64px)] bg-[#030712] flex items-center justify-center p-0 sm:p-6 lg:p-8 overflow-hidden relative">
            {/* Ambient Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-20 -left-20 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        x: [0, -50, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-20 -right-20 w-[35rem] h-[35rem] bg-purple-600/10 rounded-full blur-[150px]"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-md w-full relative z-10 px-4 sm:px-0"
            >
                {/* Main Auth Card */}
                <div className="bg-slate-900/40 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] border border-white/5 p-6 sm:p-10 relative overflow-hidden group">
                    {/* Premium Edge Glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />

                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0.5, rotate: -20 }}
                            animate={{ scale: 1, rotate: -3 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 mb-6 text-white shadow-2xl shadow-indigo-500/30"
                        >
                            {isLogin ? <LogIn size={32} /> : <UserPlus size={32} />}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2 flex items-center justify-center gap-2">
                                {isLogin ? 'Welcome Back' : 'Create Account'}
                                <Sparkles className="text-indigo-400 h-6 w-6" />
                            </h2>
                            <p className="text-slate-400 font-medium text-sm sm:text-base">
                                {isLogin ? 'Enter your details to access your dashboard' : 'Join CreditWise for smart loan analysis'}
                            </p>
                        </motion.div>
                    </div>

                    {/* Google Login Section */}
                    <div className="space-y-4 mb-8">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex justify-center"
                        >
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={handleGoogleError}
                                size="large"
                                width="340"
                                theme="filled_black"
                                shape="pill"
                                text={isLogin ? "signin_with" : "signup_with"}
                            />
                        </motion.div>

                        <div className="relative flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                            <span className="relative px-4 bg-[#0d1425] rounded-full text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] py-1.5 border border-white/5">Or use Credentials</span>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className={`mb-6 p-4 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 border ${error.includes('created') ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-4">
                            {!isLogin && (
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] ml-1">Email Address</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors w-5 h-5" />
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={inputStyle}
                                            placeholder="name@example.com"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] ml-1">Username</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors w-5 h-5" />
                                    <input
                                        type="text"
                                        name="username"
                                        required
                                        value={formData.username}
                                        onChange={handleChange}
                                        className={inputStyle}
                                        placeholder="johndoe123"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em]">Password</label>
                                    {isLogin && <button type="button" className="text-xs font-bold text-indigo-400 hover:text-indigo-300">Forgot?</button>}
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors w-5 h-5" />
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={inputStyle}
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(79, 70, 229, 0.4)" }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 rounded-2xl text-white font-black text-lg bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center group disabled:opacity-70"
                            >
                                {loading ? (
                                    <div className="h-6 w-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </motion.button>

                            {showSlowHint && loading && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-4 text-xs text-center text-slate-400 font-medium animate-pulse"
                                >
                                    🚀 Waking up the server... Please wait.
                                </motion.p>
                            )}
                        </div>
                    </form>

                    <div className="mt-8 text-center pt-6 border-t border-white/5">
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                            }}
                            className="text-slate-400 hover:text-white font-bold text-sm transition-colors group"
                        >
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <span className="text-indigo-400 group-hover:text-indigo-300 transition-colors">
                                {isLogin ? "Join for free" : "Sign in here"}
                            </span>
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Auth;
