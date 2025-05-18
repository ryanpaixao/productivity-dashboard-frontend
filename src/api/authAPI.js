import API from "./axiosAPI";

const AUTH_BASE_PATH = '/auth';

export const login = (credentials) => API.post(`${AUTH_BASE_PATH}/login`, credentials);
export const register = (userData) => API.post(`${AUTH_BASE_PATH}/register`, userData);
export const getProfile = () => API.get(`${AUTH_BASE_PATH}/profile`);
