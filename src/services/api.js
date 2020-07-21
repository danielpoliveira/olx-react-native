import axios from 'axios';

import { isLogged } from './auth';

export const baseURL = 'https://my-olx-server.herokuapp.com';
//export const baseURL = 'http://192.168.0.42:3333/';

const api = axios.create({
  baseURL,
  // baseURL: 'http://192.168.43.5:3333/'
});

api.interceptors.request.use(
  async config => {
    return await isLogged()
      .then(data => {
        if (data) {
          config.headers.Authorization = `Bearer ${data}`;
        }

        return Promise.resolve(config);
      })
      .catch(err => {
        console.log('error: => ', err);
        return Promise.resolve(config);
      });
  },
  err => {
    console.log(err);
    return Promise.reject(err);
  }
);

export default api;