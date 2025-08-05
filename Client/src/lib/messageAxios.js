import axios from 'axios';

export const messageAxios = axios.create({
    baseURL: 'http://localhost:5004/messages',
    withCredentials: true
})