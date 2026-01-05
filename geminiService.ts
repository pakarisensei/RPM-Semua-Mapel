
import { GoogleGenAI, Type } from "@google/genai";
import { RPMInput, RPMGeneratedOutput } from "./types";

export const generateRPMContent = async (input: RPMInput): Promise<RPMGeneratedOutput> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Bertindaklah sebagai pakar Kurikulum Merdeka dan Pembelajaran Mendalam (Deep Learning).
    Buatlah Perencanaan Pembelajaran Mendalam (RPM) yang SANGAT DETAIL dan TERSTRUKTUR.

    WAJIB GUNAKAN ISTILAH "MURID" (BUKAN PESERTA DIDIK).

    DATA INPUT:
    - Satuan Pendidikan: ${input.satuanPendidikan}
    - Mata Pelajaran: ${input.mapel}
    - Elemen Kurikulum: ${input.elemen}
    - Materi Utama: ${input.materi}
    - Capaian Pembelajaran (CP): ${input.cp}
    - Tujuan Pembelajaran (TP): ${input.tp}
    - Model Pedagogi: ${input.pedagogiPerPertemuan.map(p => `Sesi ${p.meetingNumber}: ${p.pedagogy}`).join(', ')}

    STRUKTUR OUTPUT WAJIB:
    1. Identifikasi: Generate deskripsi Murid, Lintas Disiplin Ilmu, dan Media Ajar (Alat/Bahan) yang konkret.
    2. Desain Pembelajaran: Generate Topik, Kemitraan, Lingkungan Belajar, dan Pemanfaatan Digital (tool spesifik).
    3. Pengalaman Belajar: Langkah detail (Awal, Inti, Penutup) per pertemuan dengan prinsip 3P (Berkesadaran, Bermakna, Menggembirakan).
    4. Asesmen: Awal, Proses, dan Akhir.
    5. Referensi & Tambahan: 
       - Referensi Materi (Sertakan Judul dan Link URL dummy yang relevan, misal Youtube/PMM).
       - Glosarium (minimal 3 istilah penting).
       - Daftar Pustaka (referensi buku/web).

    Output JSON murni sesuai schema. Teks harus profesional, edukatif, dan inspiratif.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: prompt }] }],
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
                mediaAjar: { type: Type.STRING },
              },
              required: ["murid", "lintasDisiplin", "topik", "kemitraan", "lingkungan", "pemanfaatanDigital", "mediaAjar"]
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

    const text = response.text;
    if (!text) throw new Error("Respons AI kosong.");
    return JSON.parse(text);
  } catch (err) {
    console.error("Generator Error:", err);
    throw err;
  }
};
