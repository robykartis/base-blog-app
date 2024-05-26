import Env from "./env"; 
// CONFIG API URL
export const API_URL = Env.API_URL + "/api";

// AUTH URLS
export const LOGIN_URL = API_URL + "/Auth/login";
export const LOGOUT_URL =API_URL +"/Auth/logout";
export const LIST_USER_URL =API_URL +"/Auth/listUser";

// USER URLS
export const LIST_USER = API_URL + "/Admin/listUser";
export const DETAIL_USER = API_URL + "/Admin/detailUsers";
export const UPDATE_USER = API_URL + "/Admin/updateUser";
export const STORE_USER = API_URL + "/Admin/registerUser";
export const DELETE_USER = API_URL + "/Admin/deleteUser";

// POHON URLS
export const LIST_POHON = API_URL + "/Admin/getListPohon";
export const STORE_POHON = API_URL + "/Admin/createListPohon";
export const DETAIL_POHON = API_URL + "/Admin/detailListPohon";
export const UPDATE_POHON = API_URL + "/Admin/editListPohon";
export const DELETE_POHON = API_URL + "/Admin/deleteListPohon";

// LOKASI KERUSAKAN
export const LIST_LOKASI_KERUSAKAN = API_URL + "/Admin/getListLokasiKerusakan";
export const STORE_LOKASI_KERUSAKAN = API_URL + "/Admin/createListLokasiKerusakan";
export const DETAIL_LOKASI_KERUSAKAN = API_URL + "/Admin/detailListLokasiKerusakan";
export const UPDATE_LOKASI_KERUSAKAN = API_URL + "/Admin/editListLokasiKerusakan";
export const DELETE_LOKASI_KERUSAKAN = API_URL + "/Admin/deleteListLokasiKerusakan";

// TIPE KERUSAKAN
export const LIST_TIPE_KERUSAKAN = API_URL + "/Admin/getListTipeKerusakan";
export const STORE_TIPE_KERUSAKAN = API_URL + "/Admin/createListTipeKerusakan";
export const DETAIL_TIPE_KERUSAKAN = API_URL + "/Admin/detailListTipeKerusakan";
export const UPDATE_TIPE_KERUSAKAN = API_URL + "/Admin/editListTipeKerusakan";
export const DELETE_TIPE_KERUSAKAN = API_URL + "/Admin/deleteListTipeKerusakan";

// TIPE KERUSAKAN
export const LIST_KELAS_KEPARAHAN = API_URL + "/Admin/getListKelasKeparahan";
export const STORE_KELAS_KEPARAHAN = API_URL + "/Admin/createListKelasKeparahan";
export const DETAIL_KELAS_KEPARAHAN = API_URL + "/Admin/detailListKelasKeparahan";
export const UPDATE_KELAS_KEPARAHAN = API_URL + "/Admin/editListKelasKeparahan";
export const DELETE_KELAS_KEPARAHAN = API_URL + "/Admin/deleteListKelasKeparahan";

// MAPS
export const LIST_MAP_POHON = API_URL + "/Admin/getDataPohon";
export const DETAIL_MAP_POHON = API_URL + "/Admin/detailPohon";