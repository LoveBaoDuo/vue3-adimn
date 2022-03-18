import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  RouterOptions,
} from 'vue-router'
import MyLayout from '@/Layout/index.vue'
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/Layout/index.vue'),
    redirect: '/table',
  },
  {
    path: '/login',
    component: MyLayout,
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
      },
    ],
  },
]
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/form',
    component: MyLayout,
    children: [
      {
        path: '',
        name: 'form',
        component: () => import('@/views/form/index.vue'),
        meta: { name: '表单' },
      },
    ],
  },
  {
    path: '/table',
    component: MyLayout,
    children: [
      {
        path: '',
        name: 'table',
        component: () => import('@/views/table/index.vue'),
        meta: { name: '表格' },
      },
    ],
  },
  {
    path: '/chart',
    component: MyLayout,
    children: [
      {
        path: '',
        name: 'chart',
        component: () => import('@/views/echarts/index.vue'),
        meta: { name: '图表' },
      },
    ],
  },
  {
    path: '/cascader',
    component: MyLayout,
    children: [
      {
        path: '',
        name: 'cascader',
        component: () => import('@/views/cascader/index.vue'),
        meta: { name: '联级选择框' },
      },
    ],
  },
]
const RouterOption: RouterOptions = {
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 }
  }, // 管理滚动行为 如果出现滚动 切换就让 让页面回到顶部
  routes: [...constantRoutes, ...asyncRoutes], // 把动态路由规则 和 静态路由规则 临时合并在一起
}
const createRoute: any = () => createRouter(RouterOption)
const router = createRoute()
export default router
