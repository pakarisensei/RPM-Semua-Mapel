
import React, { useState } from 'react';
import { Jenjang, PraktikPedagogis, RPMInput, FullRPMData, MeetingConfig } from './types';
import { generateRPMContent } from './geminiService';
import { InputForm } from './components/InputForm';
import { ResultTable } from './components/ResultTable';
import { LoadingScreen } from './components/LoadingScreen';
import { AuthGuard } from './components/AuthGuard';

const App: React.FC = () => {
  const [formData, setFormData] = useState<RPMInput>({
    satuanPendidikan: '',
    namaGuru: '',
    nipGuru: '',
    namaKepalaSekolah: '',
    nipKepalaSekolah: '',
    jenjang: Jenjang.SD,
    jurusan: '',
    kelas: '',
    mapel: '',
    elemen: '',
    cp: '',
    tp: '',
    materi: '',
    semester: 'Ganjil',
    tahunPelajaran: '2025/2026',
    tempat: '',
    tanggal: new Date().toISOString().split('T')[0],
    jumlahPertemuan: 1,
    durasiPertemuan: '',
    pedagogiPerPertemuan: [{ meetingNumber: 1, pedagogy: PraktikPedagogis.Inkuiri }],
    dimensiLulusan: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [generatedData, setGeneratedData] = useState<FullRPMData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const generated = await generateRPMContent(formData);
      setGeneratedData({
        ...formData,
        ...generated
      });
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } catch (err) {
      console.error(err);
      setError("Gagal menghasilkan RPM. Silakan periksa koneksi internet atau kunci API Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyAndOpen = async () => {
    const tableElement = document.getElementById('rpm-table');
    if (!tableElement) return;

    try {
      const range = document.createRange();
      range.selectNode(tableElement);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      const success = document.execCommand('copy');
      window.getSelection()?.removeAllRanges();

      if (success) {
        alert("✨ RPM telah berhasil disalin ke clipboard! Tab baru Google Dokumen akan segera dibuka.");
        window.open('https://docs.new', '_blank');
      }
    } catch (err) {
      alert("⚠️ Gagal menyalin secara otomatis. Silakan blok tabel secara manual dan tekan Ctrl+C.");
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#f1f5f9]">
        {/* Navigation Bar / Top Header */}
        <nav className="glass-morphism sticky top-0 z-50 px-6 py-4 shadow-sm no-print">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl shadow-indigo-200 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">Generator <span className="text-indigo-600">RPM</span></span>
            </div>
            <div className="hidden md:flex gap-6 items-center">
               <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                v2.5 Deep Learning Edition
               </span>
            </div>
          </div>
        </nav>

        <header className="max-w-6xl mx-auto pt-12 pb-8 px-6 text-center no-print">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight mb-4">
            Rancang Pembelajaran <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">Mendalam & Bermakna.</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Asisten cerdas berbasis AI untuk guru masa kini. Hasilkan Rencana Pembelajaran Mendalam (RPM) yang terstruktur, kreatif, dan berpusat pada murid dalam hitungan detik.
          </p>
        </header>

        <main className="max-w-6xl mx-auto pb-24 px-6 space-y-12">
          {/* Section 1: Input Form Card */}
          <section className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 border border-slate-200 overflow-hidden transition-all no-print">
            <div className="bg-gradient-to-r from-slate-50 to-white px-10 py-8 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight uppercase">Konfigurasi Pembelajaran</h2>
                  <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Lengkapi data untuk mendapatkan hasil terbaik</p>
                </div>
              </div>
            </div>
            <div className="p-10">
              <InputForm 
                formData={formData} 
                setFormData={setFormData} 
                onSubmit={handleSubmit} 
                isLoading={isLoading}
              />
            </div>
          </section>

          {isLoading && <LoadingScreen />}

          {error && (
            <div className="bg-red-50 border-2 border-red-200 p-6 rounded-3xl flex items-start gap-4 animate-bounce no-print">
              <div className="bg-red-100 p-2 rounded-xl text-red-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-red-800">Ups! Ada Masalah</h4>
                <p className="text-red-700 font-medium text-sm">{error}</p>
              </div>
            </div>
          )}

          {generatedData && (
            <section id="result-section" className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 no-print bg-slate-900 p-8 rounded-[2rem] shadow-xl">
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Rencana Siap Digunakan!</h2>
                  <p className="text-slate-400 font-medium">Anda dapat menyalin hasilnya ke Google Dokumen secara otomatis.</p>
                </div>
                <div className="flex gap-4">
                   <button
                    onClick={() => window.print()}
                    className="inline-flex items-center px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all border border-white/10 shadow-lg"
                  >
                    Cetak PDF
                  </button>
                  <button
                    onClick={handleCopyAndOpen}
                    className="inline-flex items-center px-8 py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-500/30 active:scale-95 uppercase tracking-wider text-sm"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Salin & Buka G-Docs
                  </button>
                </div>
              </div>
              
              <div className="bg-white p-6 md:p-12 rounded-[3rem] shadow-2xl border border-slate-200 overflow-x-auto print-shadow-none">
                 <ResultTable data={generatedData} />
              </div>
            </section>
          )}
        </main>

        <footer className="max-w-6xl mx-auto mt-12 pb-16 text-center text-slate-400 text-xs font-bold uppercase tracking-[0.2em] no-print border-t border-slate-200 pt-10">
          <div className="flex justify-center gap-8 mb-4">
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Kebijakan Privasi</span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Bantuan Guru</span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Kontak Admin</span>
          </div>
          &copy; {new Date().getFullYear()} Generator RPM — Empowering Deep Learning Practices.
        </footer>
      </div>
    </AuthGuard>
  );
};

export default App;
