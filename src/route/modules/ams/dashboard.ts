import MyLayout from '@/Layout/index.vue'
export default {
  path: '/main',
  name: 'dashboard',
  component: MyLayout,
  children: [
    {
      path: 'ams/dashboard',
      component: () => import('@/views/table/index.vue'),
      meta: { name: '首页' },
    },
  ],
}
