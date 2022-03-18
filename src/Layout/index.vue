<script setup lang="ts">
import MyMain from './components/AppMain.vue'
import MySidebar from './components/Sidebar/index.vue'
</script>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'MyLayout' })
</script>
<template>
  <div id="LayoutContainer">
    <!-- 左侧边栏 -->
    <aside id="LeftAside">
      <MySidebar></MySidebar>
    </aside>
    <!-- 主要区域 -->
    <section id="LayoutSection">
      <!-- 头部 -->
      <header id="LayoutHeader"></header>
      <main id="LayoutMain">
        <MyMain></MyMain>
      </main>
    </section>
  </div>
</template>
<style lang="less" scoped>
#LayoutContainer {
  display: grid;
  // 把容器分为六列
  grid-template-columns: repeat(6, minmax(100px, 1fr));
  width: 100%;
  height: 100%;
  #LeftAside {
    height: 100%;
    background: red;
  }
  #LayoutSection {
    // 表是这个item 占据的位置是 从第2列到第6列
    grid-column: 2 / span 5;
    display: grid;
    grid-template-rows: repeat(12, minmax(40px, 1fr));
    height: 100%;
    #LayoutHeader {
      background-color: black;
    }
    #LayoutMain {
      grid-row: 2 / span 11;
      padding: 5px;
      background-color: white;
    }
  }
}
</style>
