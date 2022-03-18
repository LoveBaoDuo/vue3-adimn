// 权限管理

import router from '@/route'
// import { Route } from 'vue-router'
import usePermission from '@/store/permission'
// 不需要权限就可以访问 在白名单中的页面
// const whiteList = ['/404', '/login']
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const usePer = usePermission()
    usePer.addRouter()
    console.log(usePer.routes)
    next()
  }
)
