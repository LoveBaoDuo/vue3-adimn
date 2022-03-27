import { defineStore } from 'pinia'
// 为 store state 声明类型
interface beradAll {
  path: any
  title: string
}
export interface breadcrumbState {
  beradPath: beradAll[]
}
const state: breadcrumbState = {
  beradPath: [],
}
export default defineStore('breadcrumbState', {
  state: () => state,
  actions: {
    setBeradPath(loading: beradAll) {
      if (this.beradPath.length <= 8) {
        if (loading.title === '首页') {
          return
        }
        // 查重
        const isBeing = this.beradPath.some(
          item => item.title === loading.title
        )
        isBeing ? '' : this.beradPath.push(loading)
      } else {
        this.beradPath.shift()
        this.beradPath.push(loading)
      }
    },
    delBeradPath(index: number) {
      this.beradPath.splice(index, 1)
    },
  },
})
