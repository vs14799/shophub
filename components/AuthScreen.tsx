
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, User as UserIcon, Chrome, ShieldCheck, KeyRound, CheckCircle2, Globe } from 'lucide-react';
import { ROLE_CONFIGS } from '../constants';
import { Role, AuthMode, User } from '../types';

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [useOtp, setUseOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [success, setSuccess] = useState(false);

  const selectedRole = (role as Role) || Role.CUSTOMER;
  const config = ROLE_CONFIGS[selectedRole];

  const handleSendOtp = () => {
    if (!otpSent) {
      setLoading(true);
      setTimeout(() => {
        setOtpSent(true);
        setLoading(false);
      }, 1000);
    }
  };

  const performLoginRedirect = (userData: User) => {
    setSuccess(true);
    setTimeout(() => {
      onLogin(userData);
    }, 2000);
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      const googleUser: User = {
        id: `goog_${Math.random().toString(36).substr(2, 9)}`,
        fullName: 'Google User',
        email: 'user.google@gmail.com',
        role: selectedRole,
        preferences: ['Dark Mode', 'Google Auth Sync']
      };
      performLoginRedirect(googleUser);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        fullName: mode === 'register' ? 'New ShopHub Member' : 'Alex Shopper',
        email: 'alex@shophub.io',
        role: selectedRole,
        preferences: ['Dark Mode', 'Notifications']
      };
      performLoginRedirect(mockUser);
    }, 1200);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
        <div className="text-center animate-in fade-in zoom-in duration-500">
          <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${config.gradientClass} flex items-center justify-center mx-auto mb-8 shadow-2xl`}>
            <CheckCircle2 className="w-12 h-12 text-white animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Authenticated</h2>
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <Globe className="w-4 h-4 animate-spin" />
            <p>Entering ShopHub 3.0 Platform...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 bg-gradient-to-br ${config.gradientClass}/10 relative`}>
      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors glass px-4 py-2 rounded-full z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Hub
      </button>

      <div className="w-full max-w-md relative z-10">
        <div className="glass p-10 rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden">
          <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${config.gradientClass} rounded-full blur-[80px] opacity-20`} />
          
          <div className="text-center mb-10 relative">
            <h2 className="text-3xl font-bold text-white mb-2">
              {mode === 'login' ? `${config.title} Portal` : `Create ${config.title} Account`}
            </h2>
            <p className="text-slate-400">
              {mode === 'login' ? 'Welcome back! Please sign in to continue.' : 'Join the ShopHub ecosystem today.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 relative">
            {mode === 'register' && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    required
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">Email or Phone</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  required
                  type="text"
                  placeholder="name@example.com or phone"
                  className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
                />
              </div>
            </div>

            {mode === 'login' && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setUseOtp(!useOtp);
                    setOtpSent(false);
                  }}
                  className={`text-xs font-bold uppercase tracking-widest transition-colors ${config.colorClass} hover:brightness-125`}
                >
                  {useOtp ? 'Use Password instead' : 'Login with OTP'}
                </button>
              </div>
            )}

            {mode === 'login' && useOtp ? (
              <div className="space-y-4">
                {otpSent ? (
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">Verification Code</label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        required
                        type="text"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter 6-digit code"
                        className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 tracking-[0.5em] font-mono text-center text-lg transition-all"
                      />
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={loading || googleLoading}
                    className="w-full py-4 glass rounded-2xl text-white font-bold flex items-center justify-center gap-3 hover:bg-white/5 transition-all active:scale-95 border border-white/10 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <KeyRound className="w-5 h-5" />
                        Generate OTP
                      </>
                    )}
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    required
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
                  />
                </div>
              </div>
            )}

            {(!useOtp || otpSent || mode === 'register') && (
              <button
                disabled={loading || googleLoading}
                type="submit"
                className={`w-full py-4 rounded-2xl text-white font-bold text-lg transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 ${config.buttonClass}`}
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  mode === 'login' ? (useOtp ? 'Verify & Sign In' : 'Sign In') : 'Create Account'
                )}
              </button>
            )}
          </form>

          <div className="mt-8 flex items-center gap-4 text-slate-500">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs font-bold uppercase tracking-widest">or continue with</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <button 
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading || googleLoading}
            className="w-full mt-6 py-4 glass rounded-2xl text-white font-semibold flex items-center justify-center gap-3 hover:bg-white/5 transition-all active:scale-95 border border-white/10 disabled:opacity-50"
          >
            {googleLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Chrome className="w-5 h-5 text-blue-400" />
            )}
            {googleLoading ? 'Connecting...' : 'Sign in with Google'}
          </button>

          <p className="text-center mt-8 text-slate-400">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setUseOtp(false);
                setOtpSent(false);
              }}
              className={`font-bold transition-colors ${config.colorClass} hover:brightness-125`}
            >
              {mode === 'login' ? 'Register Now' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
