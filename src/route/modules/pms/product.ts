import MyLayout from '@/Layout/index.vue'
export default {
  path: '/main',
  component: MyLayout,
  children: [
    {
      path: 'pms/product',
      name: 'product',
      component: () => import('@/views/cascader/index.vue'),
      meta: { title: 'ๅๅๅ่กจ' },
    },
  ],
}
