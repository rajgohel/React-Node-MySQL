import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
});

const getToken = async () => {
    let token = await localStorage.getItem("token");
    return token;
}

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        const auth = token ? `Bearer ${token}` : '';
        config.headers.common['Authorization'] = auth;
        return config;
    },
    (error) => Promise.reject(error),
);

export default axiosInstance;