import axios from 'axios';

const BASE_URL = 'http://localhost:3335';
// const BASE_URL = 'http://192.168.1.101/3335';
// const BASE_URL = 'http://46.34.163.193:3335';
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});
export const api2 = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});
api2.defaults.headers.post['Content-Type'] = 'multipart/form-data';

api.defaults.headers.post['Content-Type'] = 'application/json';

export default api;
