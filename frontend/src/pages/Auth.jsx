import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { LogIn, UserPlus, Mail, Lock, User, ArrowRight } from 'lucide-react';

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

    const inputStyle = "w-full bg-slate-900 border border-slate-700/50 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all text-sm sm:text-base";

    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-950 flex items-center justify-center p-0 sm:p-6 lg:p-8">
            <div className="max-w-md w-full relative">
                {/* Decorative background glow */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="bg-slate-900/80 backdrop-blur-2xl rounded-none sm:rounded-3xl shadow-2xl border-x-0 border-y sm:border border-slate-800 p-5 sm:p-10 relative z-10 transition-all">
                    <div className="text-center mb-6 sm:mb-8">
                        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 sm:mb-6 text-white shadow-lg shadow-indigo-500/20 transform -rotate-3">
                            {isLogin ? <LogIn size={28} /> : <UserPlus size={28} />}
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-2">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-slate-400 font-medium text-sm sm:text-base">
                            {isLogin ? 'Sign in to access your dashboard' : 'Join CreditWise for smart loan analysis'}
                        </p>
                    </div>

                    {/* Google Login Button */}
                    <div className="space-y-4 mb-6 sm:mb-8">
                        <div className="flex justify-center">
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={handleGoogleError}
                                size="large"
                                width="100%"
                                theme="filled_black"
                                shape="rectangular"
                                text={isLogin ? "signin_with" : "signup_with"}
                            />
                        </div>

                        <div className="relative flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
                            <span className="relative px-4 bg-slate-900 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Or with email</span>
                        </div>
                    </div>

                    {error && (
                        <div className={`mb-5 p-3 sm:p-4 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 animate-in fade-in zoom-in duration-300 ${error.includes('created') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                        <div className="space-y-4 sm:space-y-5">
                            {!isLogin && (
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors w-4 h-4 sm:w-5 sm:h-5" />
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

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Username</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors w-4 h-4 sm:w-5 sm:h-5" />
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

                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
                                    {isLogin && <button type="button" className="text-xs font-bold text-indigo-400 hover:text-indigo-300">Forgot?</button>}
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors w-4 h-4 sm:w-5 sm:h-5" />
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

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 sm:py-4 rounded-2xl text-white font-black text-base sm:text-lg bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-xl shadow-indigo-500/20 transition-all flex flex-col items-center justify-center group disabled:opacity-70 disabled:grayscale"
                            >
                                <div className="flex items-center justify-center">
                                    {loading ? (
                                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                    ) : null}
                                    <span>{loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}</span>
                                    {!loading && <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />}
                                </div>
                            </button>

                            {showSlowHint && loading && (
                                <p className="mt-4 text-xs text-center text-slate-400 font-medium animate-pulse">
                                    🚀 Waking up the server... This might take 30 seconds for the first time.
                                </p>
                            )}
                        </div>
                    </form>

                    <div className="mt-8 text-center pt-6 border-t border-slate-800/50">
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                            }}
                            className="text-slate-400 hover:text-white font-bold text-sm transition-colors"
                        >
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <span className="text-indigo-400 hover:text-indigo-300">
                                {isLogin ? "Sign up free" : "Log in"}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
