
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, ChevronRight } from 'lucide-react';
import { ROLE_CONFIGS } from '../constants';
import { Role } from '../types';

const PortalLanding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0f172a] overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-slate-600 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-400 to-white">
            ShopHub 3.0
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Experience a unified marketplace ecosystem designed for precision and scale. Select your point of entry.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(ROLE_CONFIGS).map(([role, config]) => (
            <div
              key={role}
              onClick={() => navigate(`/auth/${role}`)}
              className="group glass p-8 rounded-3xl cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 border border-white/5 hover:border-white/10"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${config.gradientClass} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                {role === Role.CUSTOMER ? (
                  <ShoppingBag className="text-white w-8 h-8" />
                ) : (
                  <ShieldCheck className="text-white w-8 h-8" />
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform">
                {config.title}
              </h3>
              <p className="text-slate-400 leading-relaxed mb-8">
                {config.description}
              </p>

              <div className="flex items-center text-sm font-semibold tracking-wide uppercase">
                <span className={`${config.colorClass} group-hover:mr-2 transition-all`}>
                  Enter Portal
                </span>
                <ChevronRight className={`${config.colorClass} w-4 h-4 opacity-0 group-hover:opacity-100 transition-all`} />
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-20 text-center text-slate-500 text-sm">
          <p>&copy; 2024 ShopHub Global. All portals secured by End-to-End Encryption.</p>
        </footer>
      </div>
    </div>
  );
};

export default PortalLanding;