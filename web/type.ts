type AuthStateType = {
    email?: string;
    nama?: string;
    level?: string;
    password?: string;
    password_confirmation?: string;
  };
// User data
type UserType = {
    id?: number;
    id_user?: number;
    name: string;
    email: string;
    no_hp: string;
    level: string;
    jk: string;
    passwor?: string;
    cPassword?: string;
};
// Pohon data
type PohonType = {
  KerusakanPohon?:any
  DetailPohon?:any
  id?: number;
  id_jenis_pohon?:string,
  nama_pohon?: string,
  tahun_tanam?: string,
  id_kel?: string,
  kel?: string,
  id_kec?: string,
  kec?: string,
  nm_jalan?: string,
  lat?: string,
  long?: string,
  status_pohon?: string
  id_petugas?: string
};
// Lokasi kerusakan
type LokasiKerusakanType = {
  id?: number;
  id_pohon?:number;
  kode: string;
  lokasi_kerusakan: string;
};
// Tipe kerusakan
type TipeKerusakanType = {
  id?: number;
  id_pohon?:number;
  kode_kerusakan: string;
  tipe_kerusakan: string;
  ambang_batas_kerusakan: string;
};
// Kelas Keparahan
type KelasKeparahanType = {
  id?: number;
  id_pohon?:number;
  mulai:string;
  akhir: string;
  kode_keparahan: string;
};

interface MapProps {
  xposix: number,
  yposix: number,
  zoom?: number,
}

// Lokasi Kerusakan Maps
type MapsLokasiKerusakanType = {
  KerusakanPohon?:any
  DetailPohon?:any
  id?: number;
  id_jenis_pohon?:string,
  nama_pohon?: string,
  tahun_tanam?: string,
  id_kel?: string,
  kel?: string,
  id_kec?: string,
  kec?: string,
  nm_jalan?: string,
  lat?: string,
  long?: string,
  status_pohon?: string
  id_petugas?: string
}