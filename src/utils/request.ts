import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { $message, toHump } from './auth'
// 初始化axios
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE,
  timeout: 5000,
})

// 请求拦截
request.interceptors.request.use(
  (config: AxiosRequestConfig<any>) => {
    // const token = sessionStorage.getItem('TOKEN')
    // if (token) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.headers!.Authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiY3JlYXRlZCI6MTY0NzkzMzM1ODkzNCwiZXhwIjoxNjQ4NTM4MTU4fQ.rtBjZLZJ7pHQYWw74QAVYZ5fQLXDBxSzWgwjffMA08LdwbZxfg5LfoRrThy3WWMoZOD4fTi_wgokRhE9N_Gm4g`
    // }
    return config
  },
  err => {
    // 消息提示
    $message({
      message: '请求失败',
      type: 'error',
      duration: 1000,
    })
    Promise.reject(err)
  }
)
// 响应拦截
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data
    if (code === 200 || code === 201) {
      return toHump(response.data)
    } else {
      // 消息提示
      $message({
        message: '请求失败',
        type: 'error',
        duration: 1000,
      })
      return Promise.reject(msg)
    }
  },
  err => {
    $message({
      message: '请求失败',
      type: 'error',
      duration: 1000,
    })
    return Promise.reject(err)
  }
)

export default request
