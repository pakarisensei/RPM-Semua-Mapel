
import React, { useState, useEffect } from 'react';
import { UserAccount } from '../types';

// DAFTAR USER YANG BISA AKSES
// Anda bisa menambah/menghapus user di sini untuk manajemen lisensi
const VALID_USERS: UserAccount[] = [
  // Akun Utama
  { username: 'admin', accessKey: 'RPM-2025-SUPER', name: 'Administrator' },
  
  // 10 Pengguna Pertama (Early Bird / Beta Testers)
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
      setError('Username atau Kode Akses salah. Silakan hubungi admin.');
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
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 mb-4 bg-indigo-600 rounded-2xl shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Akses Terbatas</h2>
              <p className="text-slate-500 font-medium">Silakan masukkan kredensial Anda untuk menggunakan Generator RPM</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 uppercase mb-1">Username</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 uppercase mb-1">Kode Akses (License Key)</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  placeholder="••••••••••••"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm font-bold rounded-xl animate-pulse">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-xl shadow-lg transition-all active:scale-95 uppercase tracking-wider"
              >
                Masuk ke Aplikasi
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400 font-bold uppercase italic">
                Belum punya akses? Hubungi Admin untuk berlangganan.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-4 right-4 z-[100] no-print">
        <button
          onClick={handleLogout}
          className="bg-white/80 backdrop-blur border border-slate-200 text-slate-600 px-4 py-2 rounded-full text-xs font-bold hover:bg-red-50 hover:text-red-600 transition-all shadow-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          LOGOUT
        </button>
      </div>
      {children}
    </>
  );
};
