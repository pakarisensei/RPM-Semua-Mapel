
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
      setError("Gagal menghasilkan RPM. Silakan coba lagi nanti.");
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
        alert("RPM telah disalin! Silakan tempel (Paste) di Google Dokumen.");
        window.open('https://docs.new', '_blank');
      }
    } catch (err) {
      alert("Gagal menyalin secara otomatis. Silakan blok tabel dan tekan Ctrl+C.");
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
        <header className="max-w-5xl mx-auto mb-10 text-center">
          <div className="inline-flex items-center justify-center p-3 mb-4 bg-indigo-600 rounded-2xl shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Generator RPM</h1>
          <p className="mt-3 text-lg text-slate-600 font-medium">Perencanaan Pembelajaran Mendalam Otomatis & Terstruktur</p>
        </header>

        <main className="max-w-5xl mx-auto space-y-12">
          <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center uppercase tracking-tighter">
                <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 text-sm font-black">1</span>
                Informasi Pembelajaran
              </h2>
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
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-bold">{error}</p>
                </div>
              </div>
            </div>
          )}

          {generatedData && (
            <section id="result-section" className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 no-print">
                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Hasil Generator RPM</h2>
                <button
                  onClick={handleCopyAndOpen}
                  className="inline-flex items-center px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl transition-all shadow-lg active:scale-95 uppercase tracking-wider text-sm"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Salin & Buka di Google Dokumen
                </button>
              </div>
              
              <div className="bg-white p-4 sm:p-10 rounded-3xl shadow-xl border border-slate-200 overflow-x-auto">
                 <ResultTable data={generatedData} />
              </div>
            </section>
          )}
        </main>

        <footer className="max-w-5xl mx-auto mt-20 pb-10 text-center text-slate-400 text-xs font-bold uppercase no-print">
          &copy; {new Date().getFullYear()} Generator RPM - Deep Learning Instruction Planner.
        </footer>
      </div>
    </AuthGuard>
  );
};

export default App;
