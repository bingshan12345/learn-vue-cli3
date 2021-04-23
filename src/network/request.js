import axios from 'axios';

export default function request(config) {
  const instence = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  });

  //axios的拦截器：
  //请求拦截：在请求发送前进行一些操作，例如config中的一些信息不符合服务器的要求，在每个请求体里加上token，请求时显示loading组件等，
  instence.interceptors.request.use(config => {
    // console.log(config);
    return config;
  }, err => {
    console.log(err)
  })
  
  //响应拦截：
  instence.interceptors.response.use(response => {
    // console.log(response);
    return response;
  })
  return instence(config)   
}