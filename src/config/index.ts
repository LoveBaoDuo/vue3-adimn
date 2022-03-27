// 配置不同环境的请求地址
let BASE_URL = ''
const TIME_OUT = 5000

if (import.meta.env.VITE_NODE_ENV === 'development') {
  BASE_URL = '/api'
} else {
  BASE_URL = '/'
}

export { BASE_URL, TIME_OUT }
