import { ElMessage, MessageParams } from 'element-plus'
// import { useRouter } from 'vue-router'
// import MyLayout from '@/Layout/index.vue'
import 'element-plus/es/components/message/style/css'

// 信息提示的封装
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
interface baseObjType {
  [x: string]: any
}
// 下划线转换驼峰
export const toHump = (data: any): any => {
  // 判断是否是数组
  if (data.constructor === Object) {
    const result: baseObjType = {}
    // 遍历对象
    for (const key in data) {
      // 把对象的key转换成驼峰
      const tokey = key.replace(/_(\w)/g, function (all, letter) {
        return letter.toUpperCase()
      })
      // 判断值是否是复杂类型
      if (typeof data[key] !== 'object') {
        result[tokey] = data[key]
      } else {
        // 是复制类型要进行深拷贝
        result[tokey] = toHump(JSON.parse(JSON.stringify(data[key])))
      }
    }
    // 返回处理的结果
    // console.log(111, result)
    return result
  } else if (data.constructor === Array) {
    // 传入的值是数组
    const result: any[] = []
    data.forEach(item => {
      result.push(toHump(item))
    })
    return result
  }
  return null
}

// 本地持久化
// 设置本地存储
export const setLocalStorage = (name: string, value: any) => {
  localStorage.setItem(name, JSON.stringify(value))
}
// 获取本地存储
export const getLocalStorage = (name: string) => {
  if (localStorage.getItem(name)) {
    return JSON.parse(localStorage.getItem(name) as string)
  } else {
    return false
  }
}
// 删除本地存储
export const removeLocalStorage = (name: string) => {
  if (!getLocalStorage(name)) {
    return
  }
  localStorage.removeItem(name)
}

// 数据扁平化
export const flatData = (data: Array<any>) => {
  const result: any[] = []
  // 遍历目标对象
  data.forEach(item => {
    // 判断子元素的长度
    if (item?.children.length > 0) {
      result.push(...flatData(item.children))
      item.children.lenght = 0
    }
    result.push(item)
  })
  return result
}

// 菜单权限的过滤
export const menuFilter = (data: any[]): any[] => {
  // 获取过滤后的数据
  const filterData = data.filter(item => item.hidden === 0 && item.status === 1)
  filterData.forEach(item => {
    // 判断这些菜单是否还有子菜单
    if (item.children && item.children.lenght > 0) {
      item.children.push(menuFilter(item.children))
    }
  })
  return flatData(filterData)
}
