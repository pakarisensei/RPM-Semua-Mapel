
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
    const num = Math.max(1, val || 1);
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

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Identitas Satuan */}
        <div className="space-y-4">
          <label className="block">
            <span className="text-slate-700 font-medium">Nama Satuan Pendidikan</span>
            <input 
              required
              type="text" 
              className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3"
              value={formData.satuanPendidikan}
              onChange={(e) => updateField('satuanPendidikan', e.target.value)}
              placeholder="Contoh: SDN 01 Merdeka atau SMKN 1 Jakarta"
            />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-slate-700 font-medium">Nama Guru</span>
              <input required type="text" className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3" value={formData.namaGuru} onChange={(e) => updateField('namaGuru', e.target.value)} />
            </label>
            <label className="block">
              <span className="text-slate-700 font-medium">NIP Guru</span>
              <input required type="text" className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3" value={formData.nipGuru} onChange={(e) => updateField('nipGuru', e.target.value)} />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-slate-700 font-medium">Nama Kepala Sekolah</span>
              <input required type="text" className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3" value={formData.namaKepalaSekolah} onChange={(e) => updateField('namaKepalaSekolah', e.target.value)} />
            </label>
            <label className="block">
              <span className="text-slate-700 font-medium">NIP Kepala Sekolah</span>
              <input required type="text" className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3" value={formData.nipKepalaSekolah} onChange={(e) => updateField('nipKepalaSekolah', e.target.value)} />
            </label>
          </div>
        </div>

        {/* Kurikulum */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-slate-700 font-medium">Jenjang</span>
              <select className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3" value={formData.jenjang} onChange={(e) => updateField('jenjang', e.target.value)}>
                <option value={Jenjang.SD}>SD</option>
                <option value={Jenjang.SMP}>SMP</option>
                <option value={Jenjang.SMA}>SMA</option>
                <option value={Jenjang.SMK}>SMK</option>
              </select>
            </label>
            <label className="block">
              <span className="text-slate-700 font-medium">Jurusan / Kompetensi Keahlian</span>
              <input 
                type="text" 
                className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3" 
                value={formData.jurusan} 
                onChange={(e) => updateField('jurusan', e.target.value)} 
                placeholder={formData.jenjang === Jenjang.SMK ? "Contoh: Teknik Mesin" : "Opsional"} 
                required={formData.jenjang === Jenjang.SMK}
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-slate-700 font-medium">Kelas</span>
              <input required type="text" className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3" value={formData.kelas} onChange={(e) => updateField('kelas', e.target.value)} placeholder="Contoh: X RPL 1" />
            </label>
            <label className="block">
              <span className="text-slate-700 font-medium">Mata Pelajaran</span>
              <input required type="text" className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3" value={formData.mapel} onChange={(e) => updateField('mapel', e.target.value)} placeholder="Contoh: Produktif RPL" />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <label className="block">
                <span className="text-slate-700 font-medium">Jumlah Pertemuan</span>
                <input required type="number" min="1" className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3" value={formData.jumlahPertemuan} onChange={(e) => handleNumMeetingsChange(parseInt(e.target.value))} />
              </label>
              <label className="block">
                <span className="text-slate-700 font-medium">Durasi (Contoh: 3x45 Menit)</span>
                <input required type="text" className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3" value={formData.durasiPertemuan} onChange={(e) => updateField('durasiPertemuan', e.target.value)} />
              </label>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-8 space-y-6">
        <label className="block">
          <span className="text-slate-700 font-medium">Materi Pelajaran</span>
          <textarea required className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3" rows={2} value={formData.materi} onChange={(e) => updateField('materi', e.target.value)}></textarea>
        </label>

        <label className="block">
          <span className="text-slate-700 font-medium">Elemen</span>
          <textarea required className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3" rows={2} value={formData.elemen} onChange={(e) => updateField('elemen', e.target.value)} placeholder="Contoh: Berpikir Komputasional / Pancasila / dsb"></textarea>
        </label>
        
        <label className="block">
          <span className="text-slate-700 font-medium">Capaian Pembelajaran (CP)</span>
          <textarea required className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3" rows={3} value={formData.cp} onChange={(e) => updateField('cp', e.target.value)}></textarea>
        </label>

        <label className="block">
          <span className="text-slate-700 font-medium">Tujuan Pembelajaran (TP)</span>
          <textarea required className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3" rows={3} value={formData.tp} onChange={(e) => updateField('tp', e.target.value)}></textarea>
        </label>
      </div>

      <div className="border-t border-slate-100 pt-8">
        <span className="text-slate-700 font-medium mb-4 block">Praktik Pedagogis per Pertemuan</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {formData.pedagogiPerPertemuan.map((m, idx) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-sm font-semibold text-slate-500 block mb-2 uppercase tracking-wider">Pertemuan {m.meetingNumber}</span>
              <select 
                className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2"
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

      <div className="border-t border-slate-100 pt-8">
        <span className="text-slate-700 font-medium mb-4 block">Dimensi Lulusan (Pilih yang sesuai)</span>
        <div className="flex flex-wrap gap-2">
          {DIMENSI_OPTIONS.map(dim => (
            <button
              type="button"
              key={dim}
              onClick={() => toggleDimensi(dim)}
              className={`px-4 py-2 rounded-full border transition-all text-sm font-medium ${
                formData.dimensiLulusan.includes(dim)
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                  : 'bg-white border-slate-300 text-slate-600 hover:border-indigo-400'
              }`}
            >
              {dim}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-10">
        <button
          disabled={isLoading}
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold py-4 rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sedang Menghasilkan...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate Rencana Pembelajaran
            </>
          )}
        </button>
      </div>
    </form>
  );
};
