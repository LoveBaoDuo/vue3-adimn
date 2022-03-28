<script setup lang="ts">
// import Breadcrumb from './index'
import useBreadcrumb from '@/store/breadcrumbStore'
import { useRouter } from 'vue-router'
import './src/routerGuard'
const router = useRouter()
const usebreadcrumb = useBreadcrumb()
const tagBreadcrumbList = computed(() => usebreadcrumb.beradPath)
console.log(tagBreadcrumbList.value)
// const props = defineProps<{ breadConfig: breadConfigType }>()
// const handleClose = (index: number) => {
//   usebreadcrumb.delBeradPath(index)
// }
// 实例化面包屑的操作类
// const breadcrumbObj = new Breadcrumb()
// 获取完整路径的数组
// const currentPathArr = breadcrumbObj.getCurrentRoutePath()
const clickHandle = (path: string) => {
  if (path === '') {
    return
  }
  // 跳转
  router.push(path)
}
</script>
<script lang="ts">
import { computed, defineComponent } from 'vue'
// import { breadConfigType } from './src/types/index'
export default defineComponent({ name: 'MyBreadcrumeb' })
</script>
<template>
  <div id="breadcrumb">
    <div class="breadcrumb-item" @click="clickHandle('/')">首页</div>
    <div
      class="breadcrumb-item"
      v-for="(item, index) in tagBreadcrumbList"
      @click="clickHandle(item.path)"
      :key="index"
    >
      {{ item.title }}
    </div>
  </div>
</template>
<style lang="less" scoped>
#breadcrumb {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 26px;
  .breadcrumb-item {
    margin-left: 5px;
    padding: 5px;
    height: 100%;
    line-height: 26px;
    border-radius: 5px;
    box-sizing: border-box;
    border: 1px solid #e6e6e6;
    font-size: 12px;
  }
}
</style>
