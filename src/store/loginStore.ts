import { defineStore } from 'pinia'
import { userLogin, getMenuList } from '@/api'
import { RouteRecordRaw } from 'vue-router'
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from '@/utils/auth'

interface stateTypes {
  TOKEN: string | null
  // 菜单数据的展示
  menuTreeList: any[]
  // 控制菜单的折叠或显示
  isCollapse: boolean
  // 权限路由
  priRouter: RouteRecordRaw[]
}
const state: stateTypes = {
  TOKEN: getLocalStorage('TOKEN') || null,
  menuTreeList: getLocalStorage('MENUTREELIST') || [],
  isCollapse: false,
  priRouter: [],
}
export default defineStore('useLoginStore', {
  state: () => state,
  actions: {
    // 修改菜单折叠的状态
    setCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 用户登录
    async UserLogin(data: any) {
      try {
        const result = await userLogin('/test/admin/login', data)
        // 判断数据是否请求成功
        if (result?.code === 200) {
          const token = `${result.data.tokenHead}${result.data.token}`
          setLocalStorage('TOKEN', token)
          return true
        } else {
          return false
        }
      } catch (err) {
        return false
      }
    },
    // 用户退出登入
    signOut() {
      removeLocalStorage('TOKEN')
      removeLocalStorage('MENUTREELIST')
    },
    // 获取菜单的数据 同时获取权限路由
    async getMenuTreeList(data: any) {
      try {
        const result = await getMenuList('/test/menu/treeList', data)
        // 判断数据是否请求成功
        if (result?.code === 200) {
          setLocalStorage('MENUTREELIST', result.data)
          this.menuTreeList = result.data
        } else {
          // 错误处理
          console.log(result.message)
        }
      } catch (err) {
        console.log(err)
      }
    },
  },
})
