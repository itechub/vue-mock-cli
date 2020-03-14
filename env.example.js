module.exports = {
  is_server: false, // 用于控制前端axios发送的请求是代理到server_url还是locale_url
  server_url: 'http://123.207.24.210:8888/', // 后端服务器url
  locale_url: 'http://localhost:3030/', // 前端服务器url
  proxy_server_url: [] // 代理到后端服务器的url
}
