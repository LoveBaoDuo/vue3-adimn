import { defineStore } from 'pinia'
import { constantRoutes, asyncRoutes } from '@/route/index'
import { RouteRecordRaw } from 'vue-router'
interface stateTypes {
  routes: RouteRecordRaw[]
}
const state: stateTypes = {
  routes: [...constantRoutes],
}

export default defineStore('usePermission', {
  state: () => state,
  actions: {
    addRouter() {
      this.routes = [...constantRoutes, ...asyncRoutes]
    },
  },
})
