import axios from 'axios';
import router from "../router";
import TokenService from "../services/token";

const http = axios.create({
    baseURL: process.env.VUE_API_URL,
});

http.interceptors.response.use(
    (response) => response,
    (error) => {
        const response = error?.response;
        if (!response) {
            return Promise.reject(error);
        }

        const status = response?.status;
        if (!status) {
            return Promise.reject(error);
        }

        if (status === 401) {
            TokenService.removeAccessToken();
            router.push('/login').then(() => {});
        }

        return Promise.reject(error);
    }
);

http.interceptors.request.use(
    (config) => {
        config.headers.Authorization = 'Bearer ' + TokenService.getAccessToken();
        return config;
    }
);

export default http;
