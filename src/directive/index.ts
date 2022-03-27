import { App, VNode } from 'vue'
const imgUrl = new URL('../assets/logo.png', import.meta.url).href
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
      updated(el: HTMLElement, binding, VNode, prevNode) {
        // 获取表格的容器
        const tableContainer = el.querySelector(
          '.el-scrollbar__wrap'
        ) as HTMLElement
        const tableView = tableContainer.querySelector(
          '.el-scrollbar__view'
        ) as HTMLElement
        // 获取表格
        const tableHTML = tableView.querySelector(
          '.el-table__body'
        ) as HTMLElement
        // console.log(tableHTML.querySelector('tr'))
        const tableRow = tableHTML.querySelector('tr') as HTMLElement
        // 获取表格的宽度
        const height = tableRow.offsetHeight
        if (height !== 0) {
          // 当前数据的长度
          const tableDataLength = VNode.props?.datasize
          // 计算表格列表总高度
          const actualHeight = tableDataLength * height
          tableView.style.height = `${actualHeight}px`
          console.log(actualHeight)
          tableContainer.addEventListener('scroll', () => {
            console.log(1)
          })
          generateTable(prevNode)
        }
      },
    })
  },
}
const generateTable = (
  prevNode: VNode<
    any,
    any,
    {
      [key: string]: any
    }
  >
) => {
  console.log(prevNode)
}
