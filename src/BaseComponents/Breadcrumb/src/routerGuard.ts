import router from '@/route'
// import { Route } from 'vue-router'
// import useBreadcrumb from '@/store/breadcrumbStore'
// const usebreadcrumb = useBreadcrumb()
// console.log(usebreadcrumb)
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    // console.log(to)
    next()
  }
)
