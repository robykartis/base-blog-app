import Env from "./env"; 
// CONFIG API URL
export const API_URL = Env.API_URL + "/api";
export const IMAGE_URL = process.env.NEXT_PUBLIC_API_URL + "/";

// AUTH URLS
export const LOGIN_URL = API_URL + "/login";
export const REGISTER_URL = API_URL + "/register";
export const DETAIL_USER_URL = API_URL + "/profile/";
export const UPDATE_USER_URL = API_URL + "/update/profile";
export const LOGOUT_URL =API_URL +"/logout";

// USER URLS
export const LIST_USER = API_URL + "/Admin/listUser";
export const DETAIL_USER = API_URL + "/Admin/detailUsers";
export const UPDATE_USER = API_URL + "/Admin/updateUser";
export const STORE_USER = API_URL + "/Admin/registerUser";
export const DELETE_USER = API_URL + "/Admin/deleteUser";

