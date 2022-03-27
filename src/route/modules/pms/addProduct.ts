import MyLayout from '@/Layout/index.vue'
export default {
  path: 'pms',
  name: 'addProduct',
  component: MyLayout,
  children: [
    {
      path: 'pms/addProduct',
      name: 'addProduct',
      component: () => import('@/views/echarts/index.vue'),
      meta: { title: '添加商品' },
    },
  ],
}
