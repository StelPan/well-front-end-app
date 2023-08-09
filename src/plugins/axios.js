import axios from 'axios';

const http = axios.create({
    baseURL: process.env.VUE_API_URL,
});

http.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export default http;
