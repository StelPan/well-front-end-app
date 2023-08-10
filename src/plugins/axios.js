import axios from 'axios';
import TokenService from "../services/token";

const http = axios.create({
    baseURL: process.env.VUE_API_URL,
});

http.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

http.interceptors.request.use(
    (config) => {
        config.headers.Authorization = 'Bearer ' + TokenService.getAccessToken();
        return config;
    }
);

export default http;
