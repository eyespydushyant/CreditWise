import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Predict from './pages/Predict';
import CreditImprovement from './pages/CreditImprovement';
import CreditIncrease from './pages/CreditIncrease';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Support from './pages/Support';
import Account from './pages/Account';
import Banks from './pages/Banks';
import Footer from './components/Footer';
import Auth from './pages/Auth';
import ChatBot from './components/ChatBot';
import NotificationToast from './components/NotificationToast';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
}

function AppContent() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-slate-100 font-sans relative transition-colors duration-300">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/predict" element={
                  <ProtectedRoute>
                    <Predict />
                  </ProtectedRoute>
                } />
                <Route path="/improve" element={
                  <ProtectedRoute>
                    <CreditImprovement />
                  </ProtectedRoute>
                } />
                <Route path="/credit-tips" element={<CreditIncrease />} />
                <Route path="/support" element={<Support />} />
                <Route path="/banks" element={<Banks />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/account" element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                } />
              </Routes>
              <ChatBot />
              <NotificationToast />
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

function App() {
  if (GOOGLE_CLIENT_ID) {
    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AppContent />
      </GoogleOAuthProvider>
    );
  }
  return <AppContent />;
}

export default App;
