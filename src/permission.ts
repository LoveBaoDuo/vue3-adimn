// 权限管理
import router, { asyncRoutes } from '@/route'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { RouteRecordRaw } from 'vue-router'
import useLoginStore from '@/store/loginStore'
import { getLocalStorage } from '@/utils/auth'

// 导入菜单过滤的方法
import { menuFilter } from '@/utils/auth'

const whiteList = ['/404', '/login']
import { RouteLocationNormalized } from 'vue-router'
// 获取有权限动态路由
const priRouter = () => {
  // 保存权限路由
  let priroute: RouteRecordRaw[] = []
  // 获取有权限的菜单
  const result = menuFilter(useLoginStore().menuTreeList)
  result.forEach(item => {
    const routers = asyncRoutes.filter((itemRouter: RouteRecordRaw) => {
      return itemRouter.name === item.name
    })
    priroute = [...priroute, ...routers]
  })
  return priroute
}

// 判断要去的目标路由是否已经存在
const hasRoute = (to: RouteLocationNormalized): boolean => {
  // 路由是否存在为true表示不存在路由
  let flag = true
  // 获取当前所有的路由记录并遍历
  router.getRoutes().forEach(item => {
    // 判断是否存在动态路由
    if (item.path.indexOf('/:') !== -1) {
      // 存在动态路由
      if (
        // 判断要去的目标路由是否在路由记录中存在
        to.path.indexOf(item.path.substring(0, item.path.indexOf('/:'))) !== -1
      ) {
        flag = false
      }
    } else {
      // 不存在动态路由
      // 判断目标路由是否存在于路由记录中
      if (item.path === to.path) {
        flag = false
      }
    }
  })
  return flag
}
// 返回当前需要跳转的路由对象
const generateRoute = (
  to: RouteLocationNormalized,
  asyncRouter: Array<any>
) => {
  // 存放动态路由的索引
  let asyncRouteIndex = 0
  let flag = false
  // 截取目标路由路径
  const toArr = to.path.substring(0, to.path.indexOf('/', 1))
  // 遍历动态路由
  asyncRouter.forEach((item: any, index: number) => {
    // 判断动态路由是否有目标路由
    if (item.path === toArr) {
      // 等于
      // 遍历子路由
      item?.children.forEach((value: any) => {
        // 是否存在 动态路由
        if (value.path.indexOf('/:') !== -1) {
          // 存在
          if (
            to.path.indexOf(
              `${toArr}/${value.path.substring(0, value.path.indexOf('/:'))}`
            ) != -1
          ) {
            asyncRouteIndex = index
            flag = true
          }
        } else {
          // 不存在 动态路由
          // 判断 目标路由等于 截取目标路由路径加 子路由路径
          if (to.path === `${toArr}/${value.path}`) {
            asyncRouteIndex = index as number
            flag = true
          }
        }
      })
    }
  })
  // 返回从动态路由数组中中获取的路由
  return { route: asyncRouter[asyncRouteIndex], flag }
}
// 全局前置守卫
router.beforeEach((to: RouteLocationNormalized) => {
  NProgress.start()
  // getLocalStorage('TOKEN') 有token就会返回token 无token返回false
  if (getLocalStorage('TOKEN')) {
    if (to.path === '/login') {
      // 关闭进度条
      NProgress.done()
      // 有token的情况下不能去往登入页 直接跳转到首页
      return '/'
    } else {
      // 判断 目标路由是否存在
      if (hasRoute(to)) {
        // 存在
        // 在动态路由数组中获取与之对应的路由
        const result = generateRoute(to, priRouter())
        // 判断获取动态路由是否成功
        if (result.flag) {
          // 成功 这把动态路由添加到路由记录中
          router.addRoute(result.route)
          // 放行前往目标路由
          return to.fullPath
        } else {
          // 禁止通行
          return false
        }
      } else {
        // 存在
        // 放行
        return true
      }
    }
  } else {
    // 无token的时候 判断目标路由路径是否在白名单中
    if (whiteList.includes(to.path)) {
      NProgress.done()
      return true
    } else {
      return '/login'
    }
  }
})

// 全局后置守卫
router.afterEach(() => {
  NProgress.done()
})
