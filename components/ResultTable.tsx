
import React from 'react';
import { FullRPMData } from '../types';

interface ResultTableProps {
  data: FullRPMData;
}

const PrincipleBadge: React.FC<{ principles: string[] }> = ({ principles }) => {
  const getBadgeConfig = (p: string) => {
    const cleanP = p.toLowerCase();
    if (cleanP.includes('berkesadaran')) return { id: 'Berkesadaran', color: '#4f46e5', textColor: '#ffffff' }; 
    if (cleanP.includes('bermakna')) return { id: 'Bermakna', color: '#059669', textColor: '#ffffff' }; 
    if (cleanP.includes('menggembirakan')) return { id: 'Menggembirakan', color: '#fbbf24', textColor: '#000000' }; 
    return { id: p, color: '#334155', textColor: '#ffffff' };
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {principles.map((p, i) => {
        const config = getBadgeConfig(p);
        return (
          <div key={i} style={{ 
            backgroundColor: config.color, 
            color: config.textColor, 
            padding: '4px 6px', 
            borderRadius: '4px', 
            fontSize: '8pt', 
            fontWeight: 'bold',
            marginBottom: '4px',
            border: '1px solid rgba(0,0,0,0.1)',
            display: 'block'
          }}>
            {config.id.toUpperCase()}
          </div>
        );
      })}
    </div>
  );
};

export const ResultTable: React.FC<ResultTableProps> = ({ data }) => {
  
  const formatDate = (dateString: string) => {
    try {
      const options: any = { day: 'numeric', month: 'long', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    } catch {
      return dateString;
    }
  };

  const sectionHeaderStyle: React.CSSProperties = {
    padding: '12px 15px',
    textAlign: 'left',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '11pt',
    border: '1.5px solid #000000',
    textTransform: 'uppercase'
  };

  const labelCellStyle: React.CSSProperties = {
    padding: '10px 15px',
    fontWeight: 'bold',
    backgroundColor: '#f1f5f9',
    width: '30%',
    border: '1.5px solid #000000',
    fontSize: '10pt',
    textTransform: 'uppercase'
  };

  const contentCellStyle: React.CSSProperties = {
    padding: '10px 15px',
    border: '1.5px solid #000000',
    fontSize: '11pt',
    verticalAlign: 'top',
    textAlign: 'justify'
  };

  return (
    <div id="rpm-table" style={{ backgroundColor: '#ffffff', color: '#000000', fontFamily: 'Arial, sans-serif', width: '100%' }}>
      
      {/* HEADER DOKUMEN */}
      <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '3px solid #000000', paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '18pt', fontWeight: 'bold', textTransform: 'uppercase', margin: '0 0 10px 0' }}>
          RENCANA PELAKSANAAN PEMBELAJARAN (RPM)
        </h1>
        <div style={{ backgroundColor: '#000000', color: '#ffffff', padding: '10px 25px', display: 'inline-block', borderRadius: '4px' }}>
          <p style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', margin: 0, fontStyle: 'italic' }}>
            {data.mapel} — {data.materi}
          </p>
        </div>
        <p style={{ fontSize: '11pt', fontWeight: 'bold', margin: '15px 0 0 0', textTransform: 'uppercase' }}>
           {data.satuanPendidikan} | TAHUN PELAJARAN {data.tahunPelajaran}
        </p>
      </div>

      <table width="100%" border={1} cellPadding={0} cellSpacing={0} style={{ borderCollapse: 'collapse', width: '100%', border: '1.5px solid #000000' }}>
        
        {/* BAGIAN 1: IDENTITAS */}
        <thead>
          <tr style={{ backgroundColor: '#1e3a8a' }}>
            <th colSpan={2} style={sectionHeaderStyle}>01. IDENTITAS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={labelCellStyle}>Nama Satuan Pendidikan</td>
            <td style={contentCellStyle}>{data.satuanPendidikan}</td>
          </tr>
          <tr>
            <td style={labelCellStyle}>Mata Pelajaran</td>
            <td style={contentCellStyle}>{data.mapel}</td>
          </tr>
          <tr>
            <td style={labelCellStyle}>Elemen Kurikulum</td>
            <td style={contentCellStyle}>{data.elemen || '-'}</td>
          </tr>
          <tr>
            <td style={labelCellStyle}>Kelas / Semester</td>
            <td style={contentCellStyle}>{data.kelas} / {data.semester}</td>
          </tr>
          <tr>
            <td style={labelCellStyle}>Tahun Pelajaran</td>
            <td style={contentCellStyle}>{data.tahunPelajaran}</td>
          </tr>
          <tr>
            <td style={labelCellStyle}>Sesi & Durasi</td>
            <td style={contentCellStyle}>{data.jumlahPertemuan} Pertemuan (@ {data.durasiPertemuan})</td>
          </tr>
        </tbody>

        {/* BAGIAN 2: IDENTIFIKASI */}
        <thead>
          <tr style={{ backgroundColor: '#064e3b' }}>
            <th colSpan={2} style={sectionHeaderStyle}>02. IDENTIFIKASI</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={labelCellStyle}>Murid (Karakteristik)</td>
            <td style={contentCellStyle}>{data.identifikasi.murid}</td>
          </tr>
          <tr>
            <td style={labelCellStyle}>Materi Pelajaran</td>
            <td style={contentCellStyle}>{data.materi}</td>
          </tr>
          <tr>
            <td style={labelCellStyle}>Capaian Dimensi Lulusan</td>
            <td style={contentCellStyle}>{data.dimensiLulusan.join(', ')}</td>
          </tr>
        </tbody>

        {/* BAGIAN 3: DESAIN PEMBELAJARAN */}
        <thead>
          <tr style={{ backgroundColor: '#991b1b' }}>
            <th colSpan={2} style={sectionHeaderStyle}>03. DESAIN PEMBELAJARAN</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={labelCellStyle}>Capaian Pembelajaran (CP)</td>
            <td style={contentCellStyle}>{data.cp}</td>
          </tr>
          <tr>
            <td style={labelCellStyle}>Tujuan Pembelajaran (TP)</td>
            <td style={contentCellStyle}>{data.tp}</td>
          </tr>
          <tr>
            <td style={labelCellStyle}>Lintas Disiplin Ilmu</td>
            <td style={contentCellStyle}>{data.identifikasi.lintasDisiplin}</td>
          </tr>
          <tr>
            <td style={labelCellStyle}>Media Pembelajaran (Alat/Bahan)</td>
            <td style={contentCellStyle}>{data.identifikasi.mediaAjar}</td>
          </tr>
          <tr>
            <td style={labelCellStyle}>Pemanfaatan Digital</td>
            <td style={contentCellStyle}>{data.identifikasi.pemanfaatanDigital}</td>
          </tr>
        </tbody>

        {/* BAGIAN 4: PENGALAMAN BELAJAR */}
        <thead>
          <tr style={{ backgroundColor: '#9a3412' }}>
            <th colSpan={2} style={sectionHeaderStyle}>04. PENGALAMAN BELAJAR</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2} style={{ padding: 0 }}>
              <table width="100%" border={1} cellPadding={0} cellSpacing={0} style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead style={{ backgroundColor: '#000000', color: '#ffffff', fontSize: '10pt', fontWeight: 'bold' }}>
                  <tr>
                    <th style={{ padding: '10px', width: '10%', border: '1px solid #ffffff' }}>SESI</th>
                    <th style={{ padding: '10px', width: '15%', border: '1px solid #ffffff' }}>BAGIAN</th>
                    <th style={{ padding: '10px', width: '15%', border: '1px solid #ffffff' }}>SINTAKS</th>
                    <th style={{ padding: '10px', width: '45%', border: '1px solid #ffffff' }}>AKTIVITAS MURID & GURU</th>
                    <th style={{ padding: '10px', width: '15%', border: '1px solid #ffffff' }}>PRINSIP 3P</th>
                  </tr>
                </thead>
                <tbody>
                  {data.pengalamanBelajar.perPertemuan.map((pertemuan) => (
                    <React.Fragment key={pertemuan.meetingNumber}>
                      <tr style={{ backgroundColor: '#f1f5f9' }}>
                        <td colSpan={5} style={{ border: '1.5px solid #000000', padding: '10px', textAlign: 'center', fontWeight: 'bold', fontSize: '10pt', textTransform: 'uppercase' }}>
                          PERTEMUAN KE-{pertemuan.meetingNumber} — MODEL: {pertemuan.pedagogy}
                        </td>
                      </tr>
                      {pertemuan.langkahLangkah.map((langkah, lIdx) => (
                        <tr key={lIdx}>
                          <td style={{ border: '1.5px solid #000000', padding: '12px', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }}>
                            {pertemuan.meetingNumber}
                          </td>
                          <td style={{ border: '1.5px solid #000000', padding: '12px', textAlign: 'center', fontSize: '9pt', fontWeight: 'bold', textTransform: 'uppercase' }}>
                            {langkah.kegiatan}
                          </td>
                          <td style={{ border: '1.5px solid #000000', padding: '12px', textAlign: 'center', fontSize: '9pt', fontStyle: 'italic', fontWeight: 'bold' }}>
                            {langkah.fase}
                          </td>
                          <td style={{ border: '1.5px solid #000000', padding: '15px', fontSize: '11pt', textAlign: 'justify', lineHeight: '1.5' }}>
                            {langkah.deskripsi}
                          </td>
                          <td style={{ border: '1.5px solid #000000', padding: '8px', verticalAlign: 'middle' }}>
                            <PrincipleBadge principles={langkah.prinsip} />
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>

        {/* BAGIAN 5: ASESMEN & REFERENSI */}
        <thead>
          <tr style={{ backgroundColor: '#1e293b' }}>
            <th colSpan={2} style={sectionHeaderStyle}>05. ASESMEN & REFERENSI</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={labelCellStyle}>Asesmen Pembelajaran</td>
            <td style={contentCellStyle}>
              <strong>Asesmen Awal:</strong> {data.asesmen.awal}<br/><br/>
              <strong>Asesmen Proses:</strong> {data.asesmen.proses}<br/><br/>
              <strong>Asesmen Akhir:</strong> {data.asesmen.akhir}
            </td>
          </tr>
          <tr>
            <td style={labelCellStyle}>Referensi Materi & Media Digital</td>
            <td style={contentCellStyle}>
               {data.pengalamanBelajar.referensiMateri.length > 0 ? (
                 <ul style={{ paddingLeft: '20px', margin: 0 }}>
                   {data.pengalamanBelajar.referensiMateri.map((ref, idx) => (
                     <li key={idx} style={{ marginBottom: '8px' }}>
                       <strong>[{ref.tipe}] {ref.judul}:</strong> <a href={ref.url} style={{ color: '#2563eb', textDecoration: 'underline' }}>{ref.url}</a><br/>
                       <span style={{ fontSize: '9pt', color: '#64748b' }}>{ref.deskripsi}</span>
                     </li>
                   ))}
                 </ul>
               ) : (
                 'Tidak ada referensi tambahan.'
               )}
            </td>
          </tr>
          <tr>
            <td style={labelCellStyle}>Glosarium</td>
            <td style={contentCellStyle}>{data.glosarium}</td>
          </tr>
          <tr>
            <td style={labelCellStyle}>Daftar Pustaka</td>
            <td style={contentCellStyle}>{data.daftarPustaka}</td>
          </tr>
        </tbody>
      </table>

      {/* TANDA TANGAN */}
      <table width="100%" style={{ marginTop: '60px', border: 'none' }}>
        <tr>
          <td width="50%" style={{ verticalAlign: 'top', paddingLeft: '40px' }}>
            <p style={{ margin: '0 0 5px 0', fontSize: '10pt', fontWeight: 'bold', color: '#64748b' }}>MENGESAHKAN,</p>
            <p style={{ margin: '0 0 80px 0', fontWeight: 'bold', fontSize: '11pt' }}>KEPALA SEKOLAH</p>
            <p style={{ margin: 0, fontWeight: 'bold', fontSize: '12pt', textDecoration: 'none' }}>{data.namaKepalaSekolah.toUpperCase()}</p>
            <p style={{ margin: '5px 0 0 0', fontSize: '10pt' }}>NIP. {data.nipKepalaSekolah}</p>
          </td>
          <td width="50%" style={{ verticalAlign: 'top', paddingLeft: '40px' }}>
            <p style={{ margin: '0 0 5px 0', fontSize: '10pt' }}>{data.tempat}, {formatDate(data.tanggal)}</p>
            <p style={{ margin: '0 0 80px 0', fontWeight: 'bold', fontSize: '11pt' }}>GURU MATA PELAJARAN</p>
            <p style={{ margin: 0, fontWeight: 'bold', fontSize: '12pt', textDecoration: 'none' }}>{data.namaGuru.toUpperCase()}</p>
            <p style={{ margin: '5px 0 0 0', fontSize: '10pt' }}>NIP. {data.nipGuru}</p>
          </td>
        </tr>
      </table>
    </div>
  );
};
