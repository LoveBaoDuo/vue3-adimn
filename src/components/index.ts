import { App, Component } from 'vue'

interface FileType {
  [key: string]: Component
}
// 导入 globComponents 下面的 所有 .vue文件
const importFn: Record<string, FileType> = import.meta.globEager('./**/*.vue')
// 批量注册
export default {
  install(app: App) {
    Object.keys(importFn).forEach(key => {
      const component = importFn[key]?.default
      app.component(component.name as string, component)
    })
  },
}
