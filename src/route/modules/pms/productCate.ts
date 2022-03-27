import MyLayout from '@/Layout/index.vue'
export default {
  path: '/main/pms',
  component: MyLayout,
  children: [
    {
      path: 'productCate',
      name: 'productCate',
      component: () => import('@/views/cascader/index.vue'),
      meta: { title: '商品分类' },
    },
  ],
}
