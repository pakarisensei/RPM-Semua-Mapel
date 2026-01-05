
import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 bg-white rounded-[3rem] shadow-2xl border-2 border-dashed border-indigo-200 animate-in fade-in duration-500">
      <div className="relative w-28 h-28 mb-10">
        {/* Ring Luar */}
        <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-100 rounded-[2rem] rotate-45"></div>
        {/* Ring Animasi */}
        <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-[2rem] border-t-transparent animate-spin rotate-45"></div>
        
        <div className="absolute inset-4 bg-indigo-50 rounded-2xl flex items-center justify-center overflow-hidden shadow-inner">
          <svg className="w-10 h-10 text-indigo-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
      </div>
      
      <div className="text-center space-y-3">
        <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Merakit Skenario Terbaik...</h3>
        <p className="text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
          AI kami sedang menyusun strategi <span className="text-indigo-600 font-bold italic">Deep Learning</span> yang bermakna, menantang, dan menggembirakan untuk kelas Anda.
        </p>
      </div>

      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="flex gap-2">
            <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-amber-400 rounded-full animate-bounce"></div>
        </div>
        <span className="text-[9pt] font-black text-slate-300 uppercase tracking-[0.3em]">Hampir Selesai</span>
      </div>
    </div>
  );
};
