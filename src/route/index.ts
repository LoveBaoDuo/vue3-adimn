import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  RouterOptions,
} from 'vue-router'
// import MyLayout from '@/Layout/index.vue'
// 批量导入动态路由
const importFn = import.meta.globEager('./**/**/*.ts')
// 导出常量路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main/ams/dashboard',
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
]
const importRoutes: RouteRecordRaw[] = []
for (const item in importFn) {
  importRoutes.push(importFn[item].default)
}
// 导出动态路由
export const asyncRoutes = importRoutes
const RouterOption: RouterOptions = {
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 }
  }, // 管理滚动行为 如果出现切换就让 让页面回到顶部
  routes: [...constantRoutes], // 把动态路由规则 和 静态路由规则 临时合并在一起
}
const createRoute = () => createRouter(RouterOption)
const router = createRoute()
export default router
