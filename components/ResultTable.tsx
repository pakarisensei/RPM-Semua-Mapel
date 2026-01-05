
import React from 'react';
import { FullRPMData, DeepLearningPrinciple } from '../types';

interface ResultTableProps {
  data: FullRPMData;
}

const PrincipleBadge: React.FC<{ principles: DeepLearningPrinciple[] }> = ({ principles }) => {
  const getBadgeConfig = (p: string) => {
    switch(p) {
      case 'Berkesadaran': 
        return { id: 'Berkesadaran', en: 'Mindful', color: 'bg-indigo-600 text-white shadow-indigo-200' };
      case 'Bermakna': 
        return { id: 'Bermakna', en: 'Meaningful', color: 'bg-emerald-600 text-white shadow-emerald-200' };
      case 'Menggembirakan': 
        return { id: 'Menggembirakan', en: 'Joyful', color: 'bg-amber-400 text-slate-900 shadow-amber-200' };
      default: 
        return { id: p, en: '', color: 'bg-slate-700 text-white' };
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center w-full max-w-[110px] mx-auto py-2">
      {principles.map((p, i) => {
        const config = getBadgeConfig(p);
        return (
          <div key={i} className={`flex flex-col items-center justify-center w-full py-1.5 px-2 rounded-xl shadow-sm border border-white/20 transition-all hover:scale-105 ${config.color}`}>
            <span className="text-[7pt] font-black uppercase leading-none text-center tracking-tighter">{config.id}</span>
            <span className="text-[6pt] font-bold uppercase opacity-80 leading-tight text-center tracking-wide italic">{config.en}</span>
          </div>
        );
      })}
    </div>
  );
};

export const ResultTable: React.FC<ResultTableProps> = ({ data }) => {
  
  const SectionHeader = ({ num, title, bgColor }: { num: string, title: string, bgColor: string }) => (
    <thead>
      <tr className="border-t-[3px] border-slate-900">
        <th colSpan={2} className={`${bgColor} text-white p-4 text-left border-x-[3px] border-slate-900 shadow-inner`}>
          <div className="flex items-center gap-4">
            <span className="bg-white text-slate-900 w-8 h-8 rounded-xl flex items-center justify-center font-black text-[11pt] shrink-0 border-2 border-slate-900 rotate-3">
              {num}
            </span>
            <span className="font-extrabold uppercase tracking-tight text-[13pt] leading-none drop-shadow-md">
              {title}
            </span>
          </div>
        </th>
      </tr>
    </thead>
  );

  const formatDate = (dateString: string) => {
    try {
      const options: any = { day: 'numeric', month: 'long', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    } catch {
      return dateString;
    }
  };

  return (
    <div id="rpm-table" className="bg-white font-inter text-[11pt] leading-relaxed">
      {/* Header Utama Dokumen - Desain Elegan & Profesional */}
      <div className="relative mb-12 border-[3.5px] border-slate-900 p-8 rounded-[2rem] overflow-hidden shadow-2xl bg-white no-print">
        {/* Dekorasi Grafis Modern */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-50 rounded-full opacity-60 z-0"></div>
        <div className="absolute top-1/2 left-0 -ml-16 w-32 h-32 bg-amber-50 rounded-full opacity-40 z-0 rotate-45"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Logo & Judul Utama */}
          <div className="flex items-center gap-8 text-center md:text-left">
            <div className="bg-slate-900 p-5 rounded-[2rem] shadow-2xl border-4 border-slate-100 -rotate-2 transform">
              <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="text-[20pt] font-[900] text-slate-900 tracking-tighter uppercase leading-none mb-2">
                RENCANA PELAKSANAAN <span className="text-indigo-600">PEMBELAJARAN</span>
              </h1>
              <div className="flex items-center gap-3">
                <div className="h-[3px] w-12 bg-indigo-600 rounded-full"></div>
                <p className="text-[14pt] font-extrabold text-slate-500 italic uppercase tracking-tight">MODUL <span className="text-emerald-600">DEEP LEARNING</span></p>
                <div className="h-[3px] w-12 bg-indigo-600 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Aksentuasi Kurikulum */}
          <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
            <div className="bg-amber-400 border-[3px] border-slate-900 px-6 py-2.5 rounded-2xl shadow-[6px_6px_0px_0px_rgba(30,41,59,1)] rotate-1 transform">
              <p className="text-[11pt] font-black uppercase text-slate-900 tracking-widest text-center leading-none">KURIKULUM MERDEKA</p>
            </div>
            <div className="bg-emerald-600 border-[3px] border-slate-900 px-6 py-2 rounded-2xl shadow-[6px_6px_0px_0px_rgba(30,41,59,1)] -rotate-1 transform">
              <p className="text-[10pt] font-bold text-white uppercase italic text-center leading-none">Generasi Emas 2045</p>
            </div>
          </div>
        </div>
        
        {/* Info Label Context */}
        <div className="mt-10 pt-6 border-t-2 border-slate-100 flex flex-wrap items-center justify-center gap-5 text-center">
            <div className="flex items-center gap-3 bg-indigo-50 px-6 py-2 rounded-2xl border-2 border-indigo-100 transition-colors hover:bg-indigo-100">
               <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
               <span className="font-extrabold text-[11pt] text-indigo-900 uppercase tracking-tight">{data.mapel}</span>
            </div>
            <div className="flex items-center gap-3 bg-emerald-50 px-6 py-2 rounded-2xl border-2 border-emerald-100 transition-colors hover:bg-emerald-100">
               <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">T</div>
               <span className="font-extrabold text-[11pt] text-emerald-900 uppercase italic tracking-tight">TAPEL {data.tahunPelajaran}</span>
            </div>
            <div className="flex items-center gap-3 bg-amber-50 px-6 py-2 rounded-2xl border-2 border-amber-100 transition-colors hover:bg-amber-100">
               <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center text-slate-900 font-bold">S</div>
               <span className="font-extrabold text-[11pt] text-amber-900 uppercase tracking-tight">SEM. {data.semester.toUpperCase()}</span>
            </div>
        </div>
      </div>

      {/* Versi Print Header (Sederhana tapi Rapi) */}
      <div className="hidden print-only text-center border-b-4 border-double border-slate-900 pb-6 mb-8">
        <h1 className="text-[18pt] font-black uppercase mb-1">RENCANA PELAKSANAAN PEMBELAJARAN (RPM)</h1>
        <h2 className="text-[14pt] font-bold uppercase italic text-slate-700">PENDEKATAN DEEP LEARNING - KURIKULUM MERDEKA</h2>
        <p className="text-[12pt] font-semibold mt-2">{data.satuanPendidikan} | Tahun Pelajaran {data.tahunPelajaran}</p>
      </div>
      
      <table className="w-full border-collapse border-b-[3.5px] border-slate-900 table-fixed rounded-t-[2rem] overflow-hidden">
        {/* SECTION 1: IDENTITAS */}
        <SectionHeader num="01" title="IDENTITAS PEMBELAJARAN" bgColor="bg-indigo-700" />
        <tbody className="border-x-[3.5px] border-slate-900">
          {[
            ['Satuan Pendidikan', data.satuanPendidikan],
            ['Mata Pelajaran', data.mapel],
            ['Kelas / Semester', `${data.kelas} / ${data.semester}`],
            ['Tahun Pelajaran', data.tahunPelajaran],
            ['Jenjang / Jurusan', `${data.jenjang} ${data.jurusan ? '/ ' + data.jurusan : ''}`],
            ['Jumlah Pertemuan', `${data.jumlahPertemuan} Sesi Pembelajaran`],
            ['Durasi Sesi', data.durasiPertemuan]
          ].map(([label, val], i) => (
            <tr key={i} className="border-b-2 border-slate-100 last:border-b-0 hover:bg-indigo-50/20 transition-colors">
              <td className="p-4 font-black border-r-2 border-slate-900 w-[35%] bg-slate-50/80 text-slate-700 uppercase text-[9pt] tracking-wider align-middle">
                {label}
              </td>
              <td className="p-4 font-semibold text-slate-900 italic text-[11pt]">{val}</td>
            </tr>
          ))}
        </tbody>

        {/* SECTION 2: IDENTIFIKASI */}
        <SectionHeader num="02" title="IDENTIFIKASI MURID & MATERI" bgColor="bg-emerald-700" />
        <tbody className="border-x-[3.5px] border-slate-900">
          <tr className="border-b-2 border-slate-100">
            <td className="p-4 font-black border-r-2 border-slate-900 bg-slate-50/80 text-slate-700 uppercase text-[9pt] tracking-wider align-middle">Karakteristik Murid</td>
            <td className="p-4 italic font-medium text-slate-800 leading-relaxed text-[11pt] px-6">"{data.identifikasi.murid}"</td>
          </tr>
          <tr className="border-b-2 border-slate-100">
            <td className="p-4 font-black border-r-2 border-slate-900 bg-slate-50/80 text-slate-700 uppercase text-[9pt] tracking-wider align-middle">Topik Utama</td>
            <td className="p-4 font-bold text-slate-900 text-[11pt]">{data.materi}</td>
          </tr>
          <tr>
            <td className="p-4 font-black border-r-2 border-slate-900 bg-slate-50/80 text-slate-700 uppercase text-[9pt] tracking-wider align-middle">Target Dimensi Lulusan</td>
            <td className="p-4">
              <div className="flex flex-wrap gap-2 px-2">
                {data.dimensiLulusan.map((d, i) => (
                  <span key={i} className="bg-slate-900 text-white px-3 py-1 rounded-lg text-[8pt] font-black uppercase tracking-tighter border-2 border-white shadow-sm">{d}</span>
                ))}
              </div>
            </td>
          </tr>
        </tbody>

        {/* SECTION 3: DESAIN PEMBELAJARAN */}
        <SectionHeader num="03" title="DESAIN PEMBELAJARAN" bgColor="bg-amber-500" />
        <tbody className="border-x-[3.5px] border-slate-900">
          {[
            ['Domain / Elemen CP', data.elemen],
            ['Capaian Pembelajaran (CP)', data.cp],
            ['Tujuan Pembelajaran (TP)', data.tp],
            ['Fokus Pembahasan', data.identifikasi.topik],
            ['Literasi Digital', data.identifikasi.pemanfaatanDigital],
            ['Kemitraan & Ekosistem', `${data.identifikasi.kemitraan} | ${data.identifikasi.lingkungan}`]
          ].map(([label, val], i) => (
            <tr key={i} className="border-b-2 border-slate-100 last:border-b-0 hover:bg-amber-50/20 transition-colors">
              <td className="p-4 font-black border-r-2 border-slate-900 w-[35%] bg-slate-50/80 text-slate-700 uppercase text-[9pt] tracking-wider align-middle">{label}</td>
              <td className="p-4 font-medium text-slate-800 text-[10.5pt] leading-relaxed text-justify">{val}</td>
            </tr>
          ))}
        </tbody>

        {/* SECTION 4: PENGALAMAN BELAJAR */}
        <SectionHeader num="04" title="STRUKTUR PENGALAMAN BELAJAR" bgColor="bg-rose-600" />
        <tbody className="border-x-[3.5px] border-slate-900">
          <tr>
            <td colSpan={2} className="p-0">
              <table className="w-full border-collapse table-fixed">
                <thead className="bg-slate-900 font-black text-[8pt] uppercase text-white tracking-[0.1em] text-center border-b-[3px] border-slate-900">
                  <tr>
                    <th className="p-3 w-[6%]">Sesi</th>
                    <th className="p-3 w-[14%]">Alur</th>
                    <th className="p-3 w-[20%]">Fase Pedagogis</th>
                    <th className="p-3 w-[45%] text-[9pt]">Aktivitas (Guru & Murid)</th>
                    <th className="p-3 w-[15%]">Nilai DL</th>
                  </tr>
                </thead>
                <tbody className="text-[11pt]">
                  {data.pengalamanBelajar.perPertemuan.map((pertemuan) => (
                    <React.Fragment key={pertemuan.meetingNumber}>
                      <tr className="bg-slate-100/80 border-b-2 border-slate-900">
                        <td colSpan={5} className="p-3 text-center uppercase tracking-[0.2em] text-[10pt] font-black text-slate-900 italic">
                          MODUL SESI {pertemuan.meetingNumber} — Sintaks: {pertemuan.pedagogy}
                        </td>
                      </tr>
                      {pertemuan.langkahLangkah.map((langkah, lIdx) => (
                        <tr key={`${pertemuan.meetingNumber}-${lIdx}`} className="border-b border-slate-100 last:border-b-0 hover:bg-rose-50/10 transition-all">
                          {lIdx === 0 && (
                            <td rowSpan={pertemuan.langkahLangkah.length} className="border-r-2 border-slate-900 p-3 text-center font-black bg-slate-50/50 text-[18pt] text-slate-300 align-middle">
                              {pertemuan.meetingNumber}
                            </td>
                          )}
                          <td className={`border-r-2 border-slate-200 p-3 font-black text-center text-[7.5pt] uppercase align-middle ${
                            langkah.kegiatan.includes('Inti') ? 'text-indigo-700 bg-indigo-50/30' : 
                            langkah.kegiatan.includes('Awal') ? 'text-emerald-700 bg-emerald-50/30' : 'text-rose-700 bg-rose-50/30'
                          }`}>
                            {langkah.kegiatan}
                          </td>
                          <td className="border-r-2 border-slate-200 p-4 font-bold text-slate-800 bg-white/50 italic text-center align-middle text-[10pt] leading-tight">
                            {langkah.fase}
                          </td>
                          <td className="border-r-2 border-slate-200 p-5 text-justify whitespace-pre-wrap leading-[1.8] font-medium text-slate-800 text-[10.5pt]">
                            {langkah.deskripsi}
                          </td>
                          <td className="p-3 text-center align-middle bg-slate-50/10">
                            <PrincipleBadge principles={langkah.prinsip as DeepLearningPrinciple[]} />
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
          <tr className="border-t-[3.5px] border-slate-900">
            <td className="p-5 font-black border-r-2 border-slate-900 w-[35%] bg-slate-100 text-slate-900 uppercase text-[9pt] tracking-widest text-center align-middle italic">Media, Alat & Bahan</td>
            <td className="p-6 space-y-6 bg-white font-medium">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.pengalamanBelajar.referensiMateri.map((ref, rIdx) => (
                  <div key={rIdx} className="border-2 border-slate-100 p-4 bg-slate-50/50 rounded-2xl hover:border-indigo-300 hover:shadow-lg transition-all border-l-8 border-l-indigo-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-indigo-600 text-white px-3 py-0.5 rounded-lg font-black text-[7pt] uppercase tracking-wider">{ref.tipe}</span>
                      <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </div>
                    <p className="font-extrabold text-[10pt] text-slate-900 mb-1 truncate leading-none">{ref.judul}</p>
                    <p className="text-[9pt] text-slate-500 line-clamp-2 mb-2 italic font-normal">{ref.deskripsi}</p>
                    <a href={ref.url} target="_blank" className="text-indigo-600 text-[8.5pt] font-black block truncate underline decoration-dashed underline-offset-4">
                      {ref.url}
                    </a>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                <div className="bg-indigo-50/50 p-5 border-2 border-indigo-100 rounded-[1.5rem] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10"><svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg></div>
                  <h4 className="font-black text-indigo-900 uppercase text-[9pt] mb-2 tracking-widest">Rancangan LKPD Mandiri</h4>
                  <div className="text-[10pt] text-indigo-950 font-medium italic whitespace-pre-wrap leading-relaxed">
                    {data.pengalamanBelajar.lkpdDigital}
                  </div>
                </div>
                <div className="bg-emerald-50/50 p-5 border-2 border-emerald-100 rounded-[1.5rem] relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-2 opacity-10"><svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM14.5 10a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg></div>
                  <h4 className="font-black text-emerald-900 uppercase text-[9pt] mb-2 tracking-widest">Integrasi Gamifikasi</h4>
                  <div className="text-[10pt] text-emerald-950 font-medium italic whitespace-pre-wrap leading-relaxed">
                    {data.pengalamanBelajar.gameEdukasi}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>

        {/* SECTION 5: ASESMEN */}
        <SectionHeader num="05" title="ASESMEN & EVALUASI" bgColor="bg-slate-900" />
        <tbody className="border-x-[3.5px] border-slate-900">
          {[
            ['Diagnostik (Kognitif & Non-Kog)', data.asesmen.awal],
            ['Formatif (Proses & Observasi)', data.asesmen.proses],
            ['Sumatif (Hasil & Produk)', data.asesmen.akhir]
          ].map(([label, val], i) => (
            <tr key={i} className="border-b-2 border-slate-100 last:border-b-0 transition-colors hover:bg-slate-50">
              <td className="p-4 font-black border-r-2 border-slate-900 w-[35%] bg-slate-50/80 text-slate-700 uppercase text-[9pt] tracking-wider align-middle">{label}</td>
              <td className="p-4 font-medium text-slate-800 leading-[1.7] text-[10.5pt]">{val}</td>
            </tr>
          ))}
        </tbody>

        {/* SECTION 6: REFERENSI */}
        <SectionHeader num="06" title="SUMBER DAYA & GLOSARIUM" bgColor="bg-slate-600" />
        <tbody className="border-x-[3.5px] border-slate-900">
          <tr className="border-b-2 border-slate-100">
            <td className="p-4 font-black border-r-2 border-slate-900 w-[35%] bg-slate-50/80 text-slate-700 uppercase text-[9pt] tracking-wider align-middle">Glosarium Kata Kunci</td>
            <td className="p-4 italic text-[10.5pt] font-medium text-slate-600 leading-relaxed">{data.glosarium}</td>
          </tr>
          <tr>
            <td className="p-4 font-black border-r-2 border-slate-900 bg-slate-50/80 text-slate-700 uppercase text-[9pt] tracking-wider align-middle">Daftar Pustaka Utama</td>
            <td className="p-4 text-[10pt] whitespace-pre-wrap font-semibold text-indigo-950 leading-relaxed italic">{data.daftarPustaka}</td>
          </tr>
        </tbody>
      </table>

      {/* Tanda Tangan - Layout Rapi & Profesional */}
      <div className="mt-24 flex justify-between px-16 text-[11pt] print:mt-16">
        <div className="text-left w-[42%] flex flex-col items-start">
          <p className="font-black text-slate-400 uppercase text-[8pt] tracking-widest mb-1">Pejabat Pengesah,</p>
          <p className="mb-24 font-extrabold uppercase tracking-tight text-slate-900 text-[12pt]">Kepala Sekolah</p>
          <div className="border-b-[2.5px] border-slate-900 w-full mb-1">
            <p className="font-black uppercase text-[12pt] leading-none text-slate-900 pb-1">{data.namaKepalaSekolah}</p>
          </div>
          <p className="font-bold text-[10pt] text-slate-500">NIP. {data.nipKepalaSekolah}</p>
        </div>
        <div className="text-left w-[42%] flex flex-col items-start">
          <p className="font-bold text-slate-600 mb-1">{data.tempat}, {formatDate(data.tanggal)}</p>
          <p className="mb-24 font-extrabold uppercase tracking-tight text-slate-900 text-[12pt]">Guru Mata Pelajaran</p>
          <div className="border-b-[2.5px] border-slate-900 w-full mb-1">
            <p className="font-black uppercase text-[12pt] leading-none text-slate-900 pb-1">{data.namaGuru}</p>
          </div>
          <p className="font-bold text-[10pt] text-slate-500">NIP. {data.nipGuru}</p>
        </div>
      </div>

      {/* Footer Dokumen */}
      <div className="mt-20 border-t-2 border-slate-100 pt-4 flex justify-between items-center text-[7.5pt] font-bold text-slate-300 uppercase tracking-widest no-print">
        <span>Doc ID: RPM-{data.mapel.substring(0,3).toUpperCase()}-{Math.floor(Math.random() * 9000) + 1000}</span>
        <span>Generated by AI Generator RPM - Empowering Educators</span>
      </div>
    </div>
  );
};
