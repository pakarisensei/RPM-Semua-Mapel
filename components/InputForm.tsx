
import React from 'react';
import { RPMInput, Jenjang, PraktikPedagogis, DimensiLulusan, MeetingConfig } from '../types';

interface InputFormProps {
  formData: RPMInput;
  setFormData: React.Dispatch<React.SetStateAction<RPMInput>>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const DIMENSI_OPTIONS: DimensiLulusan[] = [
  'Keimanan & Ketakwaan', 'Kewargaan', 'Penalaran Kritis', 'Kreativitas', 
  'Kolaborasi', 'Kemandirian', 'Kesehatan', 'Komunikasi'
];

const TAHUN_PELAJARAN_OPTIONS = [
  '2025/2026', '2026/2027', '2027/2028', '2028/2029', '2029/2030'
];

export const InputForm: React.FC<InputFormProps> = ({ formData, setFormData, onSubmit, isLoading }) => {
  
  const updateField = (field: keyof RPMInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMeetingChange = (index: number, pedagogy: PraktikPedagogis) => {
    const newList = [...formData.pedagogiPerPertemuan];
    newList[index] = { ...newList[index], pedagogy };
    updateField('pedagogiPerPertemuan', newList);
  };

  const handleNumMeetingsChange = (val: number) => {
    const num = Math.max(1, Math.min(12, val || 1));
    const newList: MeetingConfig[] = [];
    for(let i = 1; i <= num; i++) {
        newList.push(formData.pedagogiPerPertemuan[i-1] || { meetingNumber: i, pedagogy: PraktikPedagogis.Inkuiri });
    }
    setFormData(prev => ({
        ...prev,
        jumlahPertemuan: num,
        pedagogiPerPertemuan: newList
    }));
  };

  const toggleDimensi = (dimensi: DimensiLulusan) => {
    const current = [...formData.dimensiLulusan];
    if (current.includes(dimensi)) {
      updateField('dimensiLulusan', current.filter(d => d !== dimensi));
    } else {
      updateField('dimensiLulusan', [...current, dimensi]);
    }
  };

  const InputWrapper = ({ label, children, required = false }: { label: string, children: React.ReactNode, required?: boolean }) => (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-slate-700 uppercase tracking-tight ml-1">
        {label} {required && <span className="text-indigo-500">*</span>}
      </label>
      {children}
    </div>
  );

  const inputClasses = "w-full rounded-2xl border-slate-200 bg-slate-50/50 shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 py-3.5 px-5 transition-all text-slate-800 placeholder-slate-400 font-medium";

  return (
    <form onSubmit={onSubmit} className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Kolom Kiri: Identitas Pengajar & Sekolah */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
             <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">A</span>
             <h3 className="font-bold text-slate-800 uppercase tracking-tight">Data Satuan & Pengajar</h3>
          </div>
          
          <InputWrapper label="Nama Satuan Pendidikan" required>
            <input 
              required
              type="text" 
              className={inputClasses}
              value={formData.satuanPendidikan}
              onChange={(e) => updateField('satuanPendidikan', e.target.value)}
              placeholder="Misal: SMP Negeri 1 Jakarta"
            />
          </InputWrapper>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputWrapper label="Nama Guru" required>
              <input required type="text" className={inputClasses} value={formData.namaGuru} onChange={(e) => updateField('namaGuru', e.target.value)} placeholder="Nama Lengkap" />
            </InputWrapper>
            <InputWrapper label="NIP Guru" required>
              <input required type="text" className={inputClasses} value={formData.nipGuru} onChange={(e) => updateField('nipGuru', e.target.value)} placeholder="NIP / ID Guru" />
            </InputWrapper>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputWrapper label="Kepala Sekolah" required>
              <input required type="text" className={inputClasses} value={formData.namaKepalaSekolah} onChange={(e) => updateField('namaKepalaSekolah', e.target.value)} placeholder="Nama Kepala Sekolah" />
            </InputWrapper>
            <InputWrapper label="NIP Kepala Sekolah" required>
              <input required type="text" className={inputClasses} value={formData.nipKepalaSekolah} onChange={(e) => updateField('nipKepalaSekolah', e.target.value)} placeholder="NIP Kepala Sekolah" />
            </InputWrapper>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-indigo-50/50 rounded-[2rem] border border-indigo-100/50">
            <InputWrapper label="Tempat TTD" required>
              <input required type="text" className={`${inputClasses} bg-white`} value={formData.tempat} onChange={(e) => updateField('tempat', e.target.value)} placeholder="Kota" />
            </InputWrapper>
            <InputWrapper label="Tanggal TTD" required>
              <input required type="date" className={`${inputClasses} bg-white`} value={formData.tanggal} onChange={(e) => updateField('tanggal', e.target.value)} />
            </InputWrapper>
          </div>
        </div>

        {/* Kolom Kanan: Detail Kurikulum */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
             <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">B</span>
             <h3 className="font-bold text-slate-800 uppercase tracking-tight">Detail Akademik</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputWrapper label="Jenjang">
              <select className={inputClasses} value={formData.jenjang} onChange={(e) => updateField('jenjang', e.target.value)}>
                {Object.values(Jenjang).map(j => <option key={j} value={j}>{j}</option>)}
              </select>
            </InputWrapper>
            <InputWrapper label="Jurusan" required={formData.jenjang === Jenjang.SMK}>
              <input type="text" className={inputClasses} value={formData.jurusan} onChange={(e) => updateField('jurusan', e.target.value)} placeholder="Contoh: IPA / RPL" />
            </InputWrapper>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputWrapper label="Semester">
              <select className={inputClasses} value={formData.semester} onChange={(e) => updateField('semester', e.target.value)}>
                <option value="Ganjil">Ganjil</option>
                <option value="Genap">Genap</option>
              </select>
            </InputWrapper>
            <InputWrapper label="Tahun Pelajaran">
              <select className={inputClasses} value={formData.tahunPelajaran} onChange={(e) => updateField('tahunPelajaran', e.target.value)}>
                {TAHUN_PELAJARAN_OPTIONS.map(tp => <option key={tp} value={tp}>{tp}</option>)}
              </select>
            </InputWrapper>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputWrapper label="Kelas" required>
              <input required type="text" className={inputClasses} value={formData.kelas} onChange={(e) => updateField('kelas', e.target.value)} placeholder="Contoh: VII-A" />
            </InputWrapper>
            <InputWrapper label="Mata Pelajaran" required>
              <input required type="text" className={inputClasses} value={formData.mapel} onChange={(e) => updateField('mapel', e.target.value)} placeholder="Contoh: Informatika" />
            </InputWrapper>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <InputWrapper label="Jumlah Pertemuan" required>
                <input required type="number" min="1" max="12" className={inputClasses} value={formData.jumlahPertemuan} onChange={(e) => handleNumMeetingsChange(parseInt(e.target.value))} />
              </InputWrapper>
              <InputWrapper label="Durasi" required>
                <input required type="text" className={inputClasses} value={formData.durasiPertemuan} onChange={(e) => updateField('durasiPertemuan', e.target.value)} placeholder="Misal: 3x40 Menit" />
              </InputWrapper>
          </div>
        </div>
      </div>

      {/* Materi & Kompetensi */}
      <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InputWrapper label="Materi Utama" required>
            <textarea required className={`${inputClasses} bg-white`} rows={3} value={formData.materi} onChange={(e) => updateField('materi', e.target.value)} placeholder="Jelaskan topik materi utama..."></textarea>
          </InputWrapper>
          <InputWrapper label="Elemen Kurikulum" required>
            <textarea required className={`${inputClasses} bg-white`} rows={3} value={formData.elemen} onChange={(e) => updateField('elemen', e.target.value)} placeholder="Contoh: Berpikir Komputasional..."></textarea>
          </InputWrapper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InputWrapper label="Capaian Pembelajaran (CP)" required>
            <textarea required className={`${inputClasses} bg-white`} rows={4} value={formData.cp} onChange={(e) => updateField('cp', e.target.value)} placeholder="Tempelkan CP lengkap di sini..."></textarea>
          </InputWrapper>
          <InputWrapper label="Tujuan Pembelajaran (TP)" required>
            <textarea required className={`${inputClasses} bg-white`} rows={4} value={formData.tp} onChange={(e) => updateField('tp', e.target.value)} placeholder="Tempelkan TP di sini..."></textarea>
          </InputWrapper>
        </div>
      </div>

      {/* Pedagogis Per Pertemuan */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.288a2 2 0 01-1.663 0l-.628-.288a6 6 0 00-3.86-.517l-2.387.477a2 2 0 00-1.022.547V18a2 2 0 002 2h11a2 2 0 002-2v-2.572z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 tracking-tight uppercase">Strategi Pedagogis</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {formData.pedagogiPerPertemuan.map((m, idx) => (
            <div key={idx} className="group bg-white p-5 rounded-[1.5rem] border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10pt] font-extrabold text-slate-400 group-hover:text-indigo-400 uppercase tracking-widest transition-colors">Pertemuan {m.meetingNumber}</span>
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              </div>
              <select 
                className="block w-full rounded-xl border-slate-200 bg-slate-50 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 py-2.5 px-4 text-sm font-bold text-slate-700 transition-all"
                value={m.pedagogy}
                onChange={(e) => handleMeetingChange(idx, e.target.value as PraktikPedagogis)}
              >
                {Object.values(PraktikPedagogis).map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Dimensi Lulusan */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-800 tracking-tight uppercase ml-1 flex items-center gap-3">
          <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
             </svg>
          </div>
          Capaian Dimensi Lulusan
        </h3>
        <div className="flex flex-wrap gap-3">
          {DIMENSI_OPTIONS.map(dim => (
            <button
              type="button"
              key={dim}
              onClick={() => toggleDimensi(dim)}
              className={`px-6 py-3 rounded-2xl border-2 font-bold text-sm transition-all flex items-center gap-2 ${
                formData.dimensiLulusan.includes(dim)
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-600/20 scale-105'
                  : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-200 hover:text-indigo-500 hover:bg-indigo-50/30'
              }`}
            >
              {formData.dimensiLulusan.includes(dim) && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              )}
              {dim}
            </button>
          ))}
        </div>
      </div>

      {/* Form Action */}
      <div className="pt-8">
        <button
          disabled={isLoading}
          type="submit"
          className="group relative w-full bg-slate-900 hover:bg-black disabled:bg-slate-400 text-white font-black py-5 rounded-[2rem] shadow-2xl shadow-slate-900/20 transition-all transform hover:-translate-y-1 active:scale-[0.98] overflow-hidden"
        >
          <div className="relative z-10 flex items-center justify-center gap-4 text-lg tracking-wider uppercase">
            {isLoading ? (
              <>
                <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses Skenario...
              </>
            ) : (
              <>
                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Hasilkan Rencana Pembelajaran Mendalam
              </>
            )}
          </div>
          {/* Efek kilauan pada tombol */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </button>
      </div>
    </form>
  );
};
