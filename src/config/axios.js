import axios from 'axios'

window.env = {}

axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

axios.get('/env').then((res) => { window.env = res.data })
