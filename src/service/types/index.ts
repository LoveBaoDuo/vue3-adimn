// 导入 axios 的配置文件
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// 我的请求拦截器的类型约束
export interface MyRequestInterceptors<T = AxiosResponse> {
  // 请求拦截的约束配置
  requestInterceptor?(config: AxiosRequestConfig): AxiosRequestConfig
  // 请求拦截出错后的约束配置
  requestInterceptorCatch?(error: any): any
  // 响应拦截的约束配置
  responseInterceptor?(res: T): T
  responseInterceptorCatch?(error: any): any
}
//重复设置默认值的目的增加代码的可移植性
export interface MyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  // 拦截器
  interceptors?: MyRequestInterceptors<T>
  // 是否显示加载
  showLoading?: boolean
}
