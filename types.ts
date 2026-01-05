
export enum Jenjang {
  SD = 'SD',
  SMP = 'SMP',
  SMA = 'SMA',
  SMK = 'SMK'
}

export enum PraktikPedagogis {
  Inkuiri = 'Inkuiri-Discovery',
  PjBL = 'PjBL (Project Based Learning)',
  ProblemSolving = 'Problem Solving',
  ProblemBased = 'Problem Based Learning',
  GameBased = 'Game Based Learning',
  Station = 'Station Learning'
}

export type DimensiLulusan = 
  | 'Keimanan & Ketakwaan'
  | 'Kewargaan'
  | 'Penalaran Kritis'
  | 'Kreativitas'
  | 'Kolaborasi'
  | 'Kemandirian'
  | 'Kesehatan'
  | 'Komunikasi';

export type DeepLearningPrinciple = 'Berkesadaran' | 'Bermakna' | 'Menggembirakan';

export interface DetailLangkah {
  kegiatan: 'Kegiatan Awal' | 'Kegiatan Inti' | 'Kegiatan Penutup';
  fase: string; 
  deskripsi: string;
  prinsip: DeepLearningPrinciple[];
}

export interface PengalamanPertemuan {
  meetingNumber: number;
  pedagogy: string;
  langkahLangkah: DetailLangkah[];
}

export interface MaterialReference {
  judul: string;
  url: string;
  tipe: 'Video' | 'Artikel' | 'Gambar' | 'E-Book' | 'LKPD' | 'Game Edukasi';
  deskripsi: string;
}

export interface MeetingConfig {
  meetingNumber: number;
  pedagogy: PraktikPedagogis;
}

export interface RPMInput {
  satuanPendidikan: string;
  namaGuru: string;
  nipGuru: string;
  namaKepalaSekolah: string;
  nipKepalaSekolah: string;
  jenjang: Jenjang;
  jurusan: string;
  kelas: string;
  mapel: string;
  elemen: string;
  cp: string;
  tp: string;
  materi: string;
  semester: 'Ganjil' | 'Genap';
  tahunPelajaran: string;
  tempat: string;
  tanggal: string;
  jumlahPertemuan: number;
  durasiPertemuan: string;
  pedagogiPerPertemuan: MeetingConfig[];
  dimensiLulusan: DimensiLulusan[];
}

export interface RPMGeneratedOutput {
  identifikasi: {
    murid: string;
    lintasDisiplin: string;
    topik: string;
    kemitraan: string;
    lingkungan: string;
    pemanfaatanDigital: string;
    mediaAjar: string;
  };
  pengalamanBelajar: {
    perPertemuan: PengalamanPertemuan[];
    referensiMateri: MaterialReference[];
    lkpdDigital: string;
    gameEdukasi: string;
  };
  asesmen: {
    awal: string;
    proses: string;
    akhir: string;
  };
  glosarium: string;
  daftarPustaka: string;
}

export interface FullRPMData extends RPMInput, RPMGeneratedOutput {}

export interface UserAccount {
  username: string;
  accessKey: string;
  name: string;
}
