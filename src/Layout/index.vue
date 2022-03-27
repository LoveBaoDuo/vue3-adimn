<script setup lang="ts">
import MyMain from './components/AppMain.vue'
import MySidebar from './components/MyMenu/index.vue'
import MyNavBar from './components/NavBar.vue'
// import useMenuStore from '@/store/menuStore'
// const menuStore = computed(() => useMenuStore().isCollapse)
</script>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'MyLayout' })
</script>
<template>
  <el-container>
    <!-- 左侧边栏 -->
    <el-aside class="asideLeft" width="unset">
      <MySidebar></MySidebar>
    </el-aside>
    <!-- 主要区域 -->
    <el-container>
      <!-- 头部 -->
      <el-header height="unset">
        <MyNavBar></MyNavBar>
      </el-header>
      <el-main>
        <el-card shadow="never" :style="{ height: '100%' }"
          ><MyMain></MyMain
        ></el-card>
      </el-main>
    </el-container>
  </el-container>
</template>
<style lang="less" scoped>
.el-aside {
  // height: 100%;
  // border-right: 1px solid #e6e6e6;
  overflow: hidden;
}
.el-main {
  padding: 5px;
  overflow: hidden;
}
.el-container {
  height: 100%;
  background-color: #e6e6e6;
}
.el-header {
  background-color: #fff;
}
.el-card__body {
  margin-bottom: 10px;
}
#App a {
  display: inline-block;
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background-color: skyblue;
  margin-right: 5px;
  color: #fff;
}
</style>
