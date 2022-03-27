import request from '@/utils/request'
import Myrequest from '@/service/require'
// import { configure } from 'nprogress'
export const MyRequest = new Myrequest({
  baseURL: import.meta.env.VITE_APP_BASE,
  timeout: 5000,
  interceptors: {
    requestInterceptor(config) {
      return config
    },
    responseInterceptor(res) {
      return res
    },
  },
})
export const getMockData = (data: any, url: string) => {
  return request({
    method: 'POST',
    url: url,
    data: data,
  })
}
export const getMenuList = (url: string, data: any): any => {
  return request({
    method: 'POST',
    url: url,
    data,
  })
}

export const userLogin = (url: string, data: any): any => {
  return request({
    method: 'POST',
    url: url,
    data,
  })
}

// export const getMockdatas = (config, url: string) => {
//   return MyRequest.get({ ...config, url })
// }
