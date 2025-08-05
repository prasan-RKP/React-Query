import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5004/auth',
    withCredentials: true
})