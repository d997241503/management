import Vue from 'vue'
import axios from 'axios'


let http = axios.create({
  baseURL:'https://www.liulongbin.top:8888/api/private/v1',
  timeout:5000
})

http.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

Vue.prototype.$http = http