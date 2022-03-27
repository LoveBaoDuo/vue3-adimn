import MyLayout from '@/Layout/index.vue'
export default {
  path: '/main/oms',
  component: MyLayout,
  children: [
    {
      path: 'order',
      name: 'order',
      component: () => import('@/views/form/index.vue'),
      meta: { name: '顶单列表' },
    },
  ],
}
