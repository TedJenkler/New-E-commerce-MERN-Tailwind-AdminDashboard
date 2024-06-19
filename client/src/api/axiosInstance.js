import axios from "axios";

const apiUrl = process.env.NODE_ENV === 'development'
? 'http://localhost:2000'
: 'https://new-e-commerce-mern-tailwind.onrender.com';

const axiosInstance = axios.create({
    baseURL: apiUrl,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;