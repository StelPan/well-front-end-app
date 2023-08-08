import axios from 'axios';

console.log(process.env);

const http = axios.create({
    baseURL: process.env.VUE_API_URL,
});

http.interceptors.response.use(
    (response) => response,
    (error) => error
);

export default http;
