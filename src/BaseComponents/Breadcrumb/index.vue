<script setup lang="ts">
// import Breadcrumb from './index'
import useBreadcrumb from '@/store/breadcrumbStore'
import './src/routerGuard'
const usebreadcrumb = useBreadcrumb()
const tagBreadcrumbList = computed(() => usebreadcrumb.beradPath)
const props = defineProps<{ breadConfig: breadConfigType }>()
const handleClose = (index: number) => {
  usebreadcrumb.delBeradPath(index)
}
// 实例化面包屑的操作类
// const breadcrumbObj = new Breadcrumb()
// 获取完整路径的数组
// const currentPathArr = breadcrumbObj.getCurrentRoutePath()
</script>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { breadConfigType } from './src/types/index'
export default defineComponent({ name: 'MyBreadcrumeb' })
</script>
<template>
  <div id="breadcrumb">
    <el-breadcrumb :separator="props.breadConfig.separator">
      <el-breadcrumb-item :to="{ path: '/' }">
        <template #default>
          <el-tag
            class="ml-2"
            type="success"
            size="small"
            :style="{ cursor: 'pointer' }"
            >首页</el-tag
          >
        </template>
      </el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item, index) in tagBreadcrumbList"
        :key="index"
        :to="{ path: item?.path ?? '/' }"
      >
        <template #default>
          <el-tag
            class="ml-2"
            type="success"
            size="small"
            closable
            :style="{ cursor: 'pointer' }"
            @close="handleClose(index)"
            >{{ item.title }}</el-tag
          >
        </template>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<style lang="less" scoped></style>
