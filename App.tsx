import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import PortalLanding from './components/PortalLanding';
import AuthScreen from './components/AuthScreen';
import Dashboard from './components/Dashboard';
import CustomerStorefront, { PRODUCTS as INITIAL_PRODUCTS, Product } from './components/CustomerStorefront';
import { Role, User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isInitializing, setIsInitializing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem('shophub_auth_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        console.error("Failed to parse stored user", e);
      } finally {
        setTimeout(() => setIsInitializing(false), 500);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('shophub_auth_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('shophub_auth_user');
    navigate('/');
  };

  const handleUpdateProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-indigo-500 rounded-lg animate-pulse"></div>
          </div>
        </div>
        <p className="mt-8 text-slate-500 font-medium tracking-widest uppercase text-xs animate-pulse">
          Connecting to ShopHub 3.0...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-indigo-500/30">
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <PortalLanding />} />
        
        <Route path="/auth/:role" element={
          user ? <Navigate to="/dashboard" /> : <AuthScreen onLogin={handleLogin} />
        } />
        
        <Route path="/dashboard" element={
          user ? (
            user.role === Role.CUSTOMER ? 
            <CustomerStorefront user={user} products={products} onLogout={handleLogout} /> : 
            <Dashboard user={user} products={products} setProducts={handleUpdateProducts} onLogout={handleLogout} />
          ) : <Navigate to="/" />
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;