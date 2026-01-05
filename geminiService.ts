
import { GoogleGenAI, Type } from "@google/genai";
import { RPMInput, RPMGeneratedOutput } from "./types";

export const generateRPMContent = async (input: RPMInput): Promise<RPMGeneratedOutput> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const isPJOK = /pjok|olahraga|jasmani|kesehatan/i.test(input.mapel);

  const prompt = `
    Bertindaklah sebagai pakar Kurikulum Merdeka dan Pembelajaran Mendalam (Deep Learning).
    Buatlah Perencanaan Pembelajaran Mendalam (RPM) yang SANGAT DETAIL, PROFESIONAL, dan KOMPREHENSIF.

    DATA INPUT:
    - Satuan Pendidikan: ${input.satuanPendidikan}
    - Jenjang: ${input.jenjang}, Jurusan: ${input.jurusan || 'N/A'}
    - Kelas: ${input.kelas}, Mapel: ${input.mapel}, Elemen: ${input.elemen}
    - Materi: ${input.materi}
    - CP: ${input.cp}
    - TP: ${input.tp}

    INSTRUKSI STRUKTUR TABEL (WAJIB):
    1. Kolom "Kegiatan" HANYA boleh berisi: "Kegiatan Awal", "Kegiatan Inti", atau "Kegiatan Penutup".
    2. Kolom "Fase / Sintak" berisi: Sintak pedagogis sesuai model ${input.pedagogiPerPertemuan.map(p => p.pedagogy).join(', ')}.
    3. Kolom "Langkah Pembelajaran": 
       - WAJIB gunakan format daftar bernomor (1., 2., 3., dst).
       - Gunakan baris baru (Enter/Newline) di setiap nomor agar rapi.
       - Tambahkan emoji yang relevan di setiap awal poin untuk daya tarik visual.

    INSTRUKSI KONTEN KHUSUS:
    - KEGIATAN AWAL: Sertakan instruksi detail Ice Breaking (jika umum) atau Pemanasan Dinamis (jika PJOK).
    - KEGIATAN PENUTUP: Sertakan motivasi berupa QUOTES dari tokoh hebat/ilmuwan/atlet yang berbeda di setiap pertemuan, relevan dengan materi ${input.materi}.
    - MEDIA & MATERI: Berikan link YouTube, Portal Guru, atau Game Edukasi (Wordwall/Quizizz/Blooket) yang BENAR-BENAR RELEVAN.

    PRINSIP DEEP LEARNING (Label Indonesia & Inggris):
    1. Berkesadaran Mindful
    2. Bermakna Meaningful
    3. Menggembirakan Joyful

    Hasilkan output JSON yang sangat detail.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          identifikasi: {
            type: Type.OBJECT,
            properties: {
              murid: { type: Type.STRING },
              lintasDisiplin: { type: Type.STRING },
              topik: { type: Type.STRING },
              kemitraan: { type: Type.STRING },
              lingkungan: { type: Type.STRING },
              pemanfaatanDigital: { type: Type.STRING },
            },
            required: ["murid", "lintasDisiplin", "topik", "kemitraan", "lingkungan", "pemanfaatanDigital"]
          },
          pengalamanBelajar: {
            type: Type.OBJECT,
            properties: {
              perPertemuan: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    meetingNumber: { type: Type.NUMBER },
                    pedagogy: { type: Type.STRING },
                    langkahLangkah: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          kegiatan: { type: Type.STRING },
                          fase: { type: Type.STRING },
                          deskripsi: { type: Type.STRING },
                          prinsip: { type: Type.ARRAY, items: { type: Type.STRING } }
                        },
                        required: ["kegiatan", "fase", "deskripsi", "prinsip"]
                      }
                    }
                  },
                  required: ["meetingNumber", "pedagogy", "langkahLangkah"]
                }
              },
              referensiMateri: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    judul: { type: Type.STRING },
                    url: { type: Type.STRING },
                    tipe: { type: Type.STRING },
                    deskripsi: { type: Type.STRING }
                  },
                  required: ["judul", "url", "tipe", "deskripsi"]
                }
              },
              lkpdDigital: { type: Type.STRING },
              gameEdukasi: { type: Type.STRING }
            },
            required: ["perPertemuan", "referensiMateri", "lkpdDigital", "gameEdukasi"]
          },
          asesmen: {
            type: Type.OBJECT,
            properties: {
              awal: { type: Type.STRING },
              proses: { type: Type.STRING },
              akhir: { type: Type.STRING },
            },
            required: ["awal", "proses", "akhir"]
          },
          glosarium: { type: Type.STRING },
          daftarPustaka: { type: Type.STRING }
        },
        required: ["identifikasi", "pengalamanBelajar", "asesmen", "glosarium", "daftarPustaka"]
      }
    }
  });

  return JSON.parse(response.text);
};
