import Env from "./env"; 
// CONFIG API URL
export const API_URL = Env.API_URL + "/api";

// AUTH URLS
export const LOGIN_URL = API_URL + "/login";
export const REGISTER_URL = API_URL + "/register";
export const LOGOUT_URL =API_URL +"/logout";
export const LIST_USER_URL =API_URL +"/listUser";

// USER URLS
export const LIST_USER = API_URL + "/Admin/listUser";
export const DETAIL_USER = API_URL + "/Admin/detailUsers";
export const UPDATE_USER = API_URL + "/Admin/updateUser";
export const STORE_USER = API_URL + "/Admin/registerUser";
export const DELETE_USER = API_URL + "/Admin/deleteUser";

