import MyLayout from '@/Layout/index.vue'
export default {
  path: '/use',
  name: 'adminCreate',
  component: MyLayout,
  children: [
    {
      path: 'admin/admincreate',
      component: () => import('@/views/cascader/index.vue'),
      meta: { title: '新增' },
    },
  ],
}
