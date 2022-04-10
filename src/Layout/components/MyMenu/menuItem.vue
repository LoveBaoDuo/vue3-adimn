<script setup lang="ts">
// 导入面包屑相关的 状态
import useBreadcrumbState from '@/store/breadcrumbStore'
// 接收菜单列表
const props = defineProps<{ menuTreeList: any[] }>()
// 面包屑相关的store
const useBreadcrumb = useBreadcrumbState()
// 菜单点击时触发的函数
const handleClick = (path: any, title: string) => {
  useBreadcrumb.setBeradPath({ path: path.index, title })
}
</script>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'MyMenuItem' })
</script>
<template>
  <!-- 第一级 -->
  <template v-for="menuItem in props.menuTreeList" :key="menuItem.id">
    <!-- 没有子菜单正常渲染 -->
    <el-menu-item
      v-if="menuItem.children.length === 0 && menuItem.hidden === 0"
      :index="menuItem?.url"
      :disabled="menuItem.status === 0"
      @click="handleClick($event, menuItem?.title)"
    >
      <!-- <MyIcons :name="menuItem.icon"></MyIcons> -->
      <el-icon></el-icon>
      <span>{{ menuItem?.title }}</span>
    </el-menu-item>
    <!-- 有子菜单 -->
    <el-sub-menu
      :index="menuItem?.url"
      v-if="menuItem.children.length !== 0 && menuItem.hidden === 0"
      :disabled="menuItem.status === 0"
    >
      <!-- 标题插槽 -->
      <template #title>
        <el-icon><iconCustomPermission /></el-icon>
        <!-- <el-icon color="#fff" v-else><iconCustomConsole /></el-icon> -->
        <!-- <span>{{ menuItem?.title }}</span> -->
        <span>{{ menuItem?.title }}</span>
      </template>
      <!-- 下一级 -->
      <MyMenuItem
        v-if="menuItem.children"
        :menuTreeList="menuItem?.children"
      ></MyMenuItem>
    </el-sub-menu>
  </template>
</template>
<style lang="less" scoped></style>
