import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, LogIn, ChevronDown } from 'lucide-react';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const { notifications, removeNotification, clearNotifications } = useNotification();
    const { user, logout } = useAuth();
    const notifRef = useRef(null);
    const userMenuRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setNotifOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        setUserMenuOpen(false);
        navigate('/');
    };

    const isActive = (path) => {
        return location.pathname === path
            ? 'text-indigo-400 font-bold'
            : 'text-slate-300 hover:text-white dark:text-slate-300 dark:hover:text-white text-slate-600 hover:text-slate-900';
    };

    const unreadCount = notifications.length;

    return (
        <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-90 dark:bg-opacity-80 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
                            <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                                CreditWise
                            </span>
                        </Link>
                        {/* Desktop Nav Links */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/')}`}>Home</Link>
                                <Link to="/predict" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/predict')}`}>Check Loan</Link>
                                <Link to="/improve" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/improve')}`}>Credit Engine</Link>
                                <Link to="/credit-tips" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/credit-tips')}`}>Credit Tips</Link>
                                <Link to="/banks" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/banks')}`}>Partner Banks</Link>
                                <Link to="/support" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/support')}`}>Support</Link>
                                {user && <Link to="/account" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/account')}`}>Account</Link>}
                            </div>
                        </div>
                    </div>

                    {/* Right side: Theme Toggle + Notif + User */}
                    <div className="flex items-center space-x-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                            {theme === 'dark' ? <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.71.71M6.34 17.66l-.71.71M17.66 17.66l-.71-.71M6.34 6.34l-.71-.71M12 5a7 7 0 100 14A7 7 0 0012 5z" /></svg> : <svg className="h-5 w-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>}
                        </button>

                        {/* Notifications */}
                        <div className="relative" ref={notifRef}>
                            <button
                                onClick={() => setNotifOpen(!notifOpen)}
                                className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                {unreadCount > 0 && <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">{unreadCount}</span>}
                            </button>
                            {notifOpen && (
                                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
                                    <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</h3>
                                        <button onClick={clearNotifications} className="text-xs text-indigo-500">Clear all</button>
                                    </div>
                                    <div className="max-h-70 overflow-y-auto">
                                        {notifications.length === 0 ? <p className="p-4 text-center text-sm text-slate-500">No new notifications</p> : notifications.map(n => (
                                            <div key={n.id} className="p-3 border-b border-slate-100 dark:border-slate-700 flex items-start">
                                                <div className={`h-2 w-2 rounded-full mt-1.5 mr-2 ${n.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`} />
                                                <div className="flex-1 text-sm text-slate-700 dark:text-slate-200">{n.message}</div>
                                                <button onClick={() => removeNotification(n.id)} className="ml-2 text-slate-400">×</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Menu / Login */}
                        {user ? (
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center space-x-2 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-transparent hover:border-indigo-500/30"
                                >
                                    <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-inner">
                                        {user.username.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="hidden sm:inline text-sm font-medium">{user.username}</span>
                                    <ChevronDown size={14} className={`transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
                                        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                                            <p className="text-xs text-slate-400 mb-0.5">Signed in as</p>
                                            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user.email}</p>
                                        </div>
                                        <Link to="/account" onClick={() => setUserMenuOpen(false)} className="flex items-center space-x-2 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                            <User size={16} /> <span>Account Settings</span>
                                        </Link>
                                        <button onClick={handleLogout} className="w-full flex items-center space-x-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                            <LogOut size={16} /> <span>Sign Out</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center space-x-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-indigo-500/20"
                            >
                                <LogIn size={16} /> <span>Sign In</span>
                            </Link>
                        )}

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md text-slate-500 dark:text-slate-400"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">{isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}</svg></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link to="/" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md ${isActive('/')}`}>Home</Link>
                    <Link to="/predict" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md ${isActive('/predict')}`}>Check Loan</Link>
                    <Link to="/improve" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md ${isActive('/improve')}`}>Credit Engine</Link>
                    <Link to="/credit-tips" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md ${isActive('/credit-tips')}`}>Credit Tips</Link>
                    <Link to="/banks" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md ${isActive('/banks')}`}>Partner Banks</Link>
                    <Link to="/support" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md ${isActive('/support')}`}>Support</Link>
                    {user && <Link to="/account" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md ${isActive('/account')}`}>Account</Link>}
                </div>
            )}
        </nav>
    );
}

export default Navbar;
