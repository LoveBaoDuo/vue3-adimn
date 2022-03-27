import axios from 'axios'
import type { AxiosInstance } from 'axios'
// 导入 类型约束
import { MyRequestInterceptors, MyRequestConfig } from './types'
// 导入 loading
import { ElLoading } from 'element-plus'
// 导入loading的约束
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
// 默认启用Loading
const DEFAULT_LOADING = true
class Myrequest {
  // 存放 axios 的实例
  instance: AxiosInstance
  // 拦截器的类型约束
  interceptors?: MyRequestInterceptors
  // 是否开启loading
  showLoading: boolean
  loading?: LoadingInstance
  // 构造器
  constructor(config: MyRequestConfig) {
    // 实例化 axios
    this.instance = axios.create(config)
    // 修改是否开启loading的值
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    // 赋值拦截器
    this.interceptors = config.interceptors
    // 实现二级请求拦截器
    this.instance?.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    // 实现二级响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    // 第一级全局的请求拦截器
    this.instance.interceptors.request.use(
      config => {
        if (this.showLoading) {
          //启用则执行loading
          this.loading = ElLoading.service({
            lock: true,
            //todo 后续国际化需要注意处理这里
            text: '正在请求...',
            background: 'rgba(0,0,0,0.5)',
          })
        }
        return config
      },
      err => {
        return err
      }
    )
    // 第一级全局的响应拦截器
    this.instance.interceptors.response.use(
      res => {
        if (this.showLoading) {
          this.loading?.close()
        }
        const result = res.data
        if (result.code !== 200) {
          return undefined
        }
        return res.data
      },
      err => {
        if (err.response.status === 404) {
          console.log('404错误')
        }
        return err
      }
    )
  }
  //解决 类型“T”的参数不能赋给类型“AxiosResponse<any, any>”的参数。
  request<T>(config: MyRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求拦截器
      if (config.interceptors?.requestInterceptor) {
        // 把请求的配置config传给拦截器
        config = config.interceptors.requestInterceptor(config)
      }
      //判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then(res => {
          // 对请求数据进行处理
          if (config.interceptors?.responseInterceptor) {
            // 响应拦截器
            res = config.interceptors.responseInterceptor(res)
          }
          //每次请求结束将showLoading恢复初始化状态，这样不影响下一次请求
          this.showLoading = DEFAULT_LOADING
          resolve(res)
        })
        .catch(err => {
          //每次请求结束将showLoading恢复初始化状态，这样不影响下一次请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }
  //进一步封装，调用更直观更方便
  get<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}

export default Myrequest
