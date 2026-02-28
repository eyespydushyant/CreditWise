import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, signup as apiSignup, googleLogin as apiGoogleLogin } from '../api';

/* eslint-disable react-refresh/only-export-components */

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('creditwise_user');
        if (storedUser) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const data = await apiLogin(credentials);
            setUser(data.user);
            localStorage.setItem('creditwise_user', JSON.stringify(data.user));
            return { success: true };
        } catch (err) {
            return { success: false, error: err.error || 'Login failed' };
        }
    };

    const googleLogin = async (credential) => {
        try {
            const data = await apiGoogleLogin(credential);
            setUser(data.user);
            localStorage.setItem('creditwise_user', JSON.stringify(data.user));
            return { success: true };
        } catch (err) {
            return { success: false, error: err.error || 'Google login failed' };
        }
    };

    const signup = async (userData) => {
        try {
            await apiSignup(userData);
            return { success: true };
        } catch (err) {
            return { success: false, error: err.error || 'Signup failed' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('creditwise_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, googleLogin, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

// useAuth exported in another file if needed, but for now we will disable the lint rule for this file
export const useAuth = () => useContext(AuthContext);
