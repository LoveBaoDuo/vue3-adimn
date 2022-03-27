import MyLayout from '@/Layout/index.vue'
export default {
  path: '/sms',
  component: MyLayout,
  children: [
    {
      path: 'flash',
      name: 'flash',
      component: () => import('@/views/cascader/index.vue'),
      meta: { title: '活动秒杀价' },
    },
  ],
}
