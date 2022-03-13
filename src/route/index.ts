import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  RouterOptions,
} from 'vue-router'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('comp/HelloWorld.vue'),
    redirect: '/table',
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/form',
    component: () => import('@/views/form/index.vue'),
  },
  {
    path: '/table',
    component: () => import('@/views/table/index.vue'),
  },
  {
    path: '/chart',
    component: () => import('@/views/echarts/index.vue'),
  },
  {
    path: '/cascader',
    component: () => import('@/views/cascader/index.vue'),
  },
]
const RouterOption: RouterOptions = {
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 }
  }, // 管理滚动行为 如果出现滚动 切换就让 让页面回到顶部
  routes: [...constantRoutes], // 把动态路由规则 和 静态路由规则 临时合并在一起
}
const createRoute: any = () => createRouter(RouterOption)
const router = createRoute()
export default router
