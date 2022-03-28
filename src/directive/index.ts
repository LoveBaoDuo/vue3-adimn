import { App, DirectiveBinding } from 'vue'
import { debounce, throttle } from '@/utils/auth'
const imgUrl = new URL('../assets/logo.png', import.meta.url).href
const virscrollHandle = (
  el: HTMLElement,
  binding: DirectiveBinding<any>,
  VNode: any
) => {
  // 获取表格的容器
  const tableContainer = el.querySelector('.el-scrollbar__wrap') as HTMLElement
  const tableView = tableContainer.querySelector(
    '.el-scrollbar__view'
  ) as HTMLElement
  // 获取表格
  const tableHTML = tableView.querySelector('.el-table__body') as HTMLElement
  // console.log(tableHTML.querySelector('tr'))
  const tableRow = tableHTML.querySelector('tr') as HTMLElement

  if (tableRow) {
    // 获取表格的宽度
    const height = tableRow.offsetHeight
    // 列表渲染数据的开始
    let start = 0
    // 当前数据的长度
    const tableDataLength = VNode.props?.datasize
    // 计算表格列表总高度
    const actualHeight = tableDataLength * height
    tableView.style.height = `${actualHeight}px`
    const scrollHandle = throttle(function () {
      if (start < 0) {
        start = 0
      }
      start = Math.floor(tableContainer.scrollTop / height)
      binding.value(start, start + 10)
    }, 200)
    tableContainer.removeEventListener('scroll', scrollHandle)
    tableContainer.addEventListener('scroll', scrollHandle)
  }
}
export default {
  install(app: App) {
    // 图片栏加载
    app.directive('lazyimage', {
      mounted(el: HTMLImageElement, binding) {
        // 监听视口的aip
        const oi = new IntersectionObserver(([{ isIntersecting }]) => {
          if (isIntersecting) {
            el.src = binding.value
            oi.unobserve(el)
          }
        })
        oi.observe(el)
        el.onerror = function (e: any) {
          e.target.src = imgUrl
        }
      },
    })
    // 虚拟滚动
    app.directive('virscroll', {
      // 数据更新后执行
      updated(el: HTMLElement, binding, VNode) {
        debounce(function () {
          virscrollHandle(el, binding, VNode)
        }, 20)()
      },
    })
  },
}
