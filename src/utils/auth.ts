import { ElMessage, MessageParams } from 'element-plus'
import 'element-plus/es/components/message/style/css'

export const $message = (options: MessageParams) => {
  ElMessage(options)
}

// 节流函数
export const throttle = (Callback: () => void, delay: number) => {
  let Time = +new Date() // 当前时间戳
  return function (this: any, ...params: any) {
    const currentTime = +new Date()
    if (currentTime - Time > delay) {
      Time = currentTime
      Callback.apply(this, params)
    }
  }
}

/**
 * // 封装一个防抖的方法
 * @param { Function } Callback
 * @param { Number } delay
 * @returns
 */
export const debounce = (Callback: () => void, delay: number) => {
  let args: [], context: any, timeout: NodeJS.Timeout
  function later() {
    Callback.apply(context, args)
  }
  /**
   *  arg 保存所有的参数
   */
  return function (this: any, ...arg: any) {
    args = arg
    // 保存上下执行文
    context = this
    // 判断是否有 定时器
    if (timeout) {
      // 有就删除前面的定时器
      clearTimeout(timeout)
      // 在重新开启一个定时器
      timeout = setTimeout(later, delay)
    } else {
      // 没有就是开启一个定时器
      timeout = setTimeout(later, delay)
    }
  }
}
