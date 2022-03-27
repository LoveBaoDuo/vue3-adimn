<script setup lang="ts">
// 导入 pinia 状态管理
import useLoginStore from '@/store/loginStore'
import MyMenuItem from './menuItem.vue'
// 导入 MyLogo 组件的配置文件
import { baseConfig } from '@/BaseComponents/Logo/src/config'
import { getLocalStorage } from '@/utils/auth'
const useLogin = useLoginStore()

// 所有菜单数据
const menuTreeList = computed(() => {
  // 判断useLogin.menuTreeList的值
  if (useLogin.menuTreeList.length === 0) {
    // 获取菜单数据 没有数据getLocalStorage返回值是fals
    const menuData = getLocalStorage('MENUTREELIST')
    // menuData
    return menuData ? menuData : []
  }
  return useLogin.menuTreeList
})
// 控制菜单的折叠
const isCollapse = computed(() => useLogin.isCollapse)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(111, key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<script lang="ts">
import { computed, defineComponent } from 'vue'
export default defineComponent({ name: 'MyMenu' })
</script>
<template>
  <el-menu
    default-active="/main/ams/dashboard"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    :collapse-transition="true"
    background-color="#001529"
    text-color="#fff"
    :router="true"
    :unique-opened="true"
    @open="handleOpen"
    @close="handleClose"
  >
    <template #default>
      <!-- logo 标题 -->
      <el-menu-item>
        <template #default>
          <MyLogo :LogoConfig="baseConfig" :isTitle="isCollapse"></MyLogo>
        </template>
      </el-menu-item>
      <MyMenuItem :menuTreeList="menuTreeList"> </MyMenuItem>
    </template>
  </el-menu>
</template>
<style lang="less" scoped>
.el-menu {
  height: 100%;
  border-right: unset;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}
</style>
