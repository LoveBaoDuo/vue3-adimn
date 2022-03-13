import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

// 进度条
import nProgress from 'nprogress'

import { $message } from './auth'

// 初始化axios
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE,
  timeout: 5000,
})

// 请求拦截
request.interceptors.request.use(
  (config: AxiosRequestConfig<any>) => {
    // 开启进度条
    nProgress.start()
    const token = sessionStorage.getItem('TOKEN')
    if (token) {
      console.log(token)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      config.headers!.Authorization = `Bearer ${token}`
    }
    return config
  },
  err => {
    // 消息提示
    $message({
      message: '请求失败',
      type: 'error',
      duration: 1000,
    })
    // 关闭进度条
    nProgress.done()
    Promise.reject(err)
  }
)
// 请求拦截
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data
    if (code === 200 || code === 201) {
      // 消息提示
      $message({
        message: '请求成功',
        type: 'success',
        duration: 1000,
      })
      return response.data
    } else {
      // 消息提示
      $message({
        message: '请求失败',
        type: 'error',
        duration: 1000,
      })
      return Promise.reject(msg)
    }
    // 关闭进度条
    nProgress.done()
  },
  err => {
    $message({
      message: '请求失败',
      type: 'error',
      duration: 1000,
    })
    // 关闭进度条
    nProgress.done()
    return Promise.reject(err)
  }
)

export default request
