
import React, { useState, useEffect } from 'react';
import { UserAccount } from '../types';

const VALID_USERS: UserAccount[] = [
  { username: 'admin', accessKey: 'RPM-2025-SUPER', name: 'Administrator' },
  { username: 'user01', accessKey: 'RPM-EB-001-XYZ', name: 'Pengguna Perdana 01' },
  { username: 'user02', accessKey: 'RPM-EB-002-ABC', name: 'Pengguna Perdana 02' },
  { username: 'user03', accessKey: 'RPM-EB-003-DEF', name: 'Pengguna Perdana 03' },
  { username: 'user04', accessKey: 'RPM-EB-004-GHI', name: 'Pengguna Perdana 04' },
  { username: 'user05', accessKey: 'RPM-EB-005-JKL', name: 'Pengguna Perdana 05' },
  { username: 'user06', accessKey: 'RPM-EB-006-MNO', name: 'Pengguna Perdana 06' },
  { username: 'user07', accessKey: 'RPM-EB-007-PQR', name: 'Pengguna Perdana 07' },
  { username: 'user08', accessKey: 'RPM-EB-008-STU', name: 'Pengguna Perdana 08' },
  { username: 'user09', accessKey: 'RPM-EB-009-VWX', name: 'Pengguna Perdana 09' },
  { username: 'user10', accessKey: 'RPM-EB-010-YZA', name: 'Pengguna Perdana 10' },
];

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState('');
  const [accessKey, setAccessKey] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const savedAuth = localStorage.getItem('rpm_auth_session');
    if (savedAuth) {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = VALID_USERS.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.accessKey === accessKey
    );

    if (user) {
      localStorage.setItem('rpm_auth_session', JSON.stringify({
        username: user.username,
        name: user.name,
        loginTime: new Date().getTime()
      }));
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Username atau Kode Akses tidak valid. Silakan hubungi administrator.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('rpm_auth_session');
    setIsAuthenticated(false);
    setUsername('');
    setAccessKey('');
  };

  if (isChecking) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Visual Decoration */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-600/10 rounded-full -mr-40 -mt-40 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-emerald-600/10 rounded-full -ml-40 -mb-40 blur-[100px]"></div>

        <div className="max-w-md w-full glass-morphism rounded-[3rem] shadow-2xl overflow-hidden relative z-10 p-1">
          <div className="bg-white rounded-[2.8rem] p-10 shadow-inner">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center p-5 mb-6 bg-slate-900 rounded-[2rem] shadow-2xl rotate-3 transform border-4 border-slate-50">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-3">Login <span className="text-indigo-600">Eksklusif</span></h2>
              <p className="text-slate-500 font-bold uppercase text-[9pt] tracking-widest">Akses Generator RPM Premium</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Username</label>
                <div className="relative">
                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                   </span>
                   <input
                    type="text"
                    required
                    className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-bold text-slate-800"
                    placeholder="Username Anda"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Kode Akses (Lisensi)</label>
                <div className="relative">
                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                   </span>
                  <input
                    type="password"
                    required
                    className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-bold text-slate-800"
                    placeholder="••••••••••••"
                    value={accessKey}
                    onChange={(e) => setAccessKey(e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border-2 border-red-100 text-red-600 text-sm font-bold rounded-2xl animate-shake flex items-center gap-3">
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="group relative w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4.5 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98] uppercase tracking-[0.15em] text-sm overflow-hidden"
              >
                <span className="relative z-10">Buka Akses Sekarang</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-slate-100 text-center">
              <p className="text-[8pt] text-slate-400 font-extrabold uppercase italic tracking-widest leading-relaxed">
                Butuh Lisensi Baru? <br/>
                <a href="#" className="text-indigo-500 hover:underline">Hubungi Tim Developer RPM</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-6 right-6 z-[100] no-print">
        <button
          onClick={handleLogout}
          className="glass-morphism text-slate-600 px-5 py-2.5 rounded-2xl text-[9pt] font-black hover:bg-red-50 hover:text-red-600 transition-all shadow-xl flex items-center gap-2 border-2 border-white"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          KELUAR SESI
        </button>
      </div>
      {children}
    </>
  );
};
