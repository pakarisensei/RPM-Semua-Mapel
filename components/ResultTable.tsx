
import React from 'react';
import { FullRPMData, DeepLearningPrinciple } from '../types';

interface ResultTableProps {
  data: FullRPMData;
}

const PrincipleBadge: React.FC<{ principles: DeepLearningPrinciple[] }> = ({ principles }) => {
  const getBadgeConfig = (p: string) => {
    switch(p) {
      case 'Berkesadaran': 
        return { id: 'Berkesadaran', en: 'Mindful', color: 'bg-indigo-700 text-white' };
      case 'Bermakna': 
        return { id: 'Bermakna', en: 'Meaningful', color: 'bg-emerald-700 text-white' };
      case 'Menggembirakan': 
        return { id: 'Menggembirakan', en: 'Joyful', color: 'bg-amber-600 text-white' };
      default: 
        return { id: p, en: '', color: 'bg-slate-700 text-white' };
    }
  };

  return (
    <div className="flex flex-col gap-1.5 items-center w-full max-w-[100px] mx-auto">
      {principles.map((p, i) => {
        const config = getBadgeConfig(p);
        return (
          <div key={i} className={`flex flex-col items-center justify-center w-full py-1 px-1 rounded-md border border-black/20 shadow-sm ${config.color}`}>
            <span className="text-[7pt] font-bold uppercase leading-none text-center">{config.id}</span>
            <span className="text-[6pt] font-normal uppercase opacity-90 leading-tight text-center">{config.en}</span>
          </div>
        );
      })}
    </div>
  );
};

export const ResultTable: React.FC<ResultTableProps> = ({ data }) => {
  // Ukuran Font & Berat (Weight) sesuai permintaan:
  // Judul/Sub-judul/Penekanan: Bold (font-bold)
  // Deskripsi/Isi/Keterangan: Normal (font-normal)
  // Ukuran: Judul 14pt, Sub-judul 12pt, Isi 11pt
  
  const SectionHeader = ({ num, title, bgColor }: { num: string, title: string, bgColor: string }) => (
    <thead>
      <tr className="border-t-[2px] border-black">
        <th colSpan={2} className={`${bgColor} text-white p-3 text-left border-x-[2px] border-black`}>
          <div className="flex items-center gap-4">
            <span className="bg-white text-black w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11pt] shrink-0 border border-black/20">
              {num}
            </span>
            <span className="font-bold uppercase tracking-tight text-[12pt] italic leading-none drop-shadow-sm">
              {title}
            </span>
          </div>
        </th>
      </tr>
    </thead>
  );

  return (
    <div id="rpm-table" className="bg-white font-['Inter',sans-serif] text-[11pt] leading-relaxed print:p-0">
      {/* Header Utama Dokumen */}
      <div className="text-center mb-10 border-b-[3px] border-black pb-6 space-y-2">
        <h1 className="text-[14pt] font-bold text-indigo-900 tracking-tighter uppercase">
          RENCANA PELAKSANAAN PEMBELAJARAN (RPM)
        </h1>
        <div className="bg-slate-900 text-white py-1.5 px-6 inline-block rounded-lg shadow-sm border border-black/20">
            <p className="text-[12pt] font-bold uppercase tracking-tight italic">
              PENDEKATAN DEEP LEARNING (PEMBELAJARAN MENDALAM)
            </p>
        </div>
        <div className="flex items-center justify-center gap-2 pt-2">
            <span className="h-[1.5px] w-12 bg-slate-300"></span>
            <p className="text-[11pt] font-bold text-slate-700 uppercase italic text-center px-4">
               {data.mapel} — {data.materi}
            </p>
            <span className="h-[1.5px] w-12 bg-slate-300"></span>
        </div>
      </div>
      
      <table className="w-full border-collapse border-b-[2px] border-black table-fixed">
        {/* SECTION 1: IDENTITAS */}
        <SectionHeader num="01" title="IDENTITAS PEMBELAJARAN" bgColor="bg-indigo-900" />
        <tbody className="border-x-[2px] border-black">
          {[
            ['Satuan Pendidikan', data.satuanPendidikan],
            ['Mata Pelajaran', data.mapel],
            ['Kelas / Semester', `${data.kelas} / Ganjil-Genap`],
            ['Jenjang / Jurusan', `${data.jenjang} ${data.jurusan ? '/ ' + data.jurusan : ''}`],
            ['Jumlah Pertemuan', `${data.jumlahPertemuan} Kali Pertemuan`],
            ['Durasi per Pertemuan', data.durasiPertemuan]
          ].map(([label, val], i) => (
            <tr key={i} className="border-b border-black/10 last:border-b-0">
              <td className="p-3 font-bold border-r-[2px] border-black w-1/3 bg-slate-50 text-slate-700 uppercase text-[10pt]">
                {label}
              </td>
              <td className="p-3 font-normal text-black italic">{val}</td>
            </tr>
          ))}
        </tbody>

        {/* SECTION 2: IDENTIFIKASI */}
        <SectionHeader num="02" title="IDENTIFIKASI MURID & MATERI" bgColor="bg-emerald-800" />
        <tbody className="border-x-[2px] border-black">
          <tr className="border-b border-black/10">
            <td className="p-3 font-bold border-r-[2px] border-black bg-slate-50 text-slate-700 uppercase text-[10pt]">Karakteristik Murid</td>
            <td className="p-3 italic font-normal text-slate-900 leading-relaxed">"{data.identifikasi.murid}"</td>
          </tr>
          <tr className="border-b border-black/10">
            <td className="p-3 font-bold border-r-[2px] border-black bg-slate-50 text-slate-700 uppercase text-[10pt]">Materi Pelajaran</td>
            <td className="p-3 font-normal text-black">{data.materi}</td>
          </tr>
          <tr>
            <td className="p-3 font-bold border-r-[2px] border-black bg-slate-50 text-slate-700 uppercase text-[10pt]">Dimensi Lulusan</td>
            <td className="p-3">
              <div className="flex flex-wrap gap-2">
                {data.dimensiLulusan.map((d, i) => (
                  <span key={i} className="bg-slate-800 text-white px-3 py-0.5 rounded text-[9pt] font-bold uppercase shadow-sm">{d}</span>
                ))}
              </div>
            </td>
          </tr>
        </tbody>

        {/* SECTION 3: DESAIN PEMBELAJARAN */}
        <SectionHeader num="03" title="DESAIN PEMBELAJARAN" bgColor="bg-amber-700" />
        <tbody className="border-x-[2px] border-black">
          {[
            ['Elemen CP', data.elemen],
            ['Capaian Pembelajaran', data.cp],
            ['Tujuan Pembelajaran', data.tp],
            ['Topik / Fokus Utama', data.identifikasi.topik],
            ['Pemanfaatan Digital', data.identifikasi.pemanfaatanDigital],
            ['Kemitraan & Lingkungan', `${data.identifikasi.kemitraan} | ${data.identifikasi.lingkungan}`]
          ].map(([label, val], i) => (
            <tr key={i} className="border-b border-black/10 last:border-b-0">
              <td className="p-3 font-bold border-r-[2px] border-black w-1/3 bg-slate-50 text-slate-700 uppercase text-[10pt]">{label}</td>
              <td className="p-3 font-normal text-slate-900">{val}</td>
            </tr>
          ))}
        </tbody>

        {/* SECTION 4: PENGALAMAN BELAJAR */}
        <SectionHeader num="04" title="PENGALAMAN BELAJAR (LANGKAH-LANGKAH)" bgColor="bg-rose-800" />
        <tbody className="border-x-[2px] border-black">
          <tr>
            <td colSpan={2} className="p-0">
              <table className="w-full border-collapse table-fixed">
                <thead className="bg-slate-100 font-bold text-[9pt] uppercase text-center border-b-[2px] border-black">
                  <tr>
                    <th className="border-r border-black/20 p-2 w-[5%]">Pert</th>
                    <th className="border-r border-black/20 p-2 w-[15%]">Kegiatan</th>
                    <th className="border-r border-black/20 p-2 w-[20%] text-[10pt]">Fase / Sintak</th>
                    <th className="border-r border-black/20 p-2 w-[45%]">Langkah Pembelajaran (Guru & Murid)</th>
                    <th className="p-2 w-[15%] text-[10pt]">Prinsip</th>
                  </tr>
                </thead>
                <tbody className="text-[11pt]">
                  {data.pengalamanBelajar.perPertemuan.map((pertemuan) => (
                    <React.Fragment key={pertemuan.meetingNumber}>
                      <tr className="bg-slate-900 text-white font-bold border-b border-black/30">
                        <td colSpan={5} className="p-2 text-center uppercase tracking-widest text-[9pt] italic">
                          MODUL PERTEMUAN KE-{pertemuan.meetingNumber} — Model: {pertemuan.pedagogy}
                        </td>
                      </tr>
                      {pertemuan.langkahLangkah.map((langkah, lIdx) => (
                        <tr key={`${pertemuan.meetingNumber}-${lIdx}`} className="border-b border-black/10 last:border-b-0 hover:bg-slate-50">
                          {lIdx === 0 && (
                            <td rowSpan={pertemuan.langkahLangkah.length} className="border-r border-black/10 p-2 text-center font-bold bg-slate-50 text-[14pt] text-slate-300 align-middle">
                              {pertemuan.meetingNumber}
                            </td>
                          )}
                          <td className={`border-r border-black/10 p-3 font-bold text-center text-[8pt] uppercase align-middle ${
                            langkah.kegiatan.includes('Inti') ? 'text-blue-700 bg-blue-50/20' : 
                            langkah.kegiatan.includes('Awal') ? 'text-emerald-700 bg-emerald-50/20' : 'text-rose-700 bg-rose-50/20'
                          }`}>
                            {langkah.kegiatan}
                          </td>
                          <td className="border-r border-black/10 p-3 font-bold text-slate-800 bg-slate-50/50 italic text-center align-middle text-[10pt]">
                            {langkah.fase}
                          </td>
                          <td className="border-r border-black/10 p-4 text-justify whitespace-pre-wrap leading-relaxed font-normal text-slate-800">
                            {langkah.deskripsi}
                          </td>
                          <td className="p-2 text-center align-middle bg-slate-50/20 overflow-hidden">
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
          {/* Media & Materi */}
          <tr className="border-t-[2px] border-black">
            <td className="p-3 font-bold border-r-[2px] border-black w-1/3 bg-slate-100 text-slate-900 uppercase text-[10pt] text-center align-middle italic">Media & Materi</td>
            <td className="p-4 space-y-4 bg-white font-normal">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.pengalamanBelajar.referensiMateri.map((ref, rIdx) => (
                  <div key={rIdx} className="border border-black/20 p-3 bg-white rounded-lg hover:shadow-sm transition-all border-l-4 border-l-indigo-600 overflow-hidden min-w-0">
                    <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded font-bold text-[8pt] uppercase self-start mb-1 inline-block">{ref.tipe}</span>
                    <p className="font-bold text-[10pt] text-black leading-tight mb-1 truncate">{ref.judul}</p>
                    <p className="text-[9pt] text-slate-500 line-clamp-1 mb-1 font-normal italic">{ref.deskripsi}</p>
                    <a href={ref.url} target="_blank" className="text-blue-700 text-[9pt] font-bold block truncate underline decoration-dotted underline-offset-4 break-all">
                      {ref.url}
                    </a>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="bg-indigo-50/50 p-4 border border-indigo-200 rounded-xl overflow-hidden min-w-0">
                  <h4 className="font-bold text-indigo-900 uppercase text-[10pt] mb-1">LKPD (Lembar Kerja Murid)</h4>
                  <div className="text-[10pt] text-indigo-950 font-normal italic whitespace-pre-wrap leading-relaxed break-all">
                    {data.pengalamanBelajar.lkpdDigital}
                  </div>
                </div>
                <div className="bg-emerald-50/50 p-4 border border-emerald-200 rounded-xl overflow-hidden min-w-0">
                  <h4 className="font-bold text-emerald-900 uppercase text-[10pt] mb-1">Game Edukasi Panel</h4>
                  <div className="text-[10pt] text-emerald-950 font-normal italic whitespace-pre-wrap leading-relaxed break-all">
                    {data.pengalamanBelajar.gameEdukasi}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>

        {/* SECTION 5: ASESMEN */}
        <SectionHeader num="05" title="ASESMEN PEMBELAJARAN" bgColor="bg-violet-800" />
        <tbody className="border-x-[2px] border-black">
          {[
            ['Asesmen Awal (Diagnostik)', data.asesmen.awal],
            ['Asesmen Proses (Formatif)', data.asesmen.proses],
            ['Asesmen Akhir (Sumatif)', data.asesmen.akhir]
          ].map(([label, val], i) => (
            <tr key={i} className="border-b border-black/10 last:border-b-0">
              <td className="p-3 font-bold border-r-[2px] border-black w-1/3 bg-slate-50 text-slate-700 uppercase text-[10pt]">{label}</td>
              <td className="p-3 font-normal text-slate-900 leading-relaxed">{val}</td>
            </tr>
          ))}
        </tbody>

        {/* SECTION 6: REFERENSI */}
        <SectionHeader num="06" title="REFERENSI & GLOSARIUM" bgColor="bg-slate-800" />
        <tbody className="border-x-[2px] border-black">
          <tr className="border-b border-black/10">
            <td className="p-3 font-bold border-r-[2px] border-black w-1/3 bg-slate-50 text-slate-700 uppercase text-[10pt]">Glosarium</td>
            <td className="p-3 italic text-[11pt] font-normal text-slate-800 leading-relaxed">{data.glosarium}</td>
          </tr>
          <tr>
            <td className="p-3 font-bold border-r-[2px] border-black bg-slate-50 text-slate-700 uppercase text-[10pt]">Daftar Pustaka</td>
            <td className="p-3 text-[10pt] whitespace-pre-wrap font-normal text-slate-800 leading-relaxed">{data.daftarPustaka}</td>
          </tr>
        </tbody>
      </table>

      {/* Tanda Tangan */}
      <div className="mt-20 flex justify-between px-12 text-[11pt] print:mt-12">
        <div className="text-left w-[42%]">
          <p className="font-bold text-slate-700">Mengetahui,</p>
          <p className="mb-24 font-bold uppercase tracking-tighter text-slate-900">Kepala Sekolah</p>
          <p className="font-bold underline uppercase text-[12pt] leading-none text-black">{data.namaKepalaSekolah}</p>
          <p className="font-bold mt-1 text-[10pt] text-slate-500">NIP. {data.nipKepalaSekolah}</p>
        </div>
        <div className="text-left w-[42%]">
          <p className="font-bold text-slate-700">{data.satuanPendidikan.split(' ').pop()}, {new Date().toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
          <p className="mb-24 font-bold uppercase tracking-tighter text-slate-900">Guru Mata Pelajaran</p>
          <p className="font-bold underline uppercase text-[12pt] leading-none text-black">{data.namaGuru}</p>
          <p className="font-bold mt-1 text-[10pt] text-slate-500">NIP. {data.nipGuru}</p>
        </div>
      </div>
    </div>
  );
};
