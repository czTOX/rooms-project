import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://rooms.cloudns.nz:4001',
  withCredentials: true,
});

export default axiosInstance;
