import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.42:3333/'
});

/*api.interceptors.request.use(
  async config => {
    return await isLogged()
    .then(data => {
      if(data)
        config.headers.Authorization = `Bearer ${data}`;
        
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
);*/

export default api;