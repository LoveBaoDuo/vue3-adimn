<script setup lang="ts"></script>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'MyMain' })
</script>
<template>
  <div id="App">
    <router-link to="/form">form</router-link>
    <router-link to="/table">table</router-link>
    <router-link to="/chart">chart</router-link>
    <router-link to="/cascader">cascader</router-link>
  </div>
  <router-view v-slot="{ Component }">
    <transition name="pageSwitch" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<style lang="less" scoped>
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
// 过渡动画
.pageSwitch-enter-from,
.pageSwitch-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.pageSwitch-enter-active,
.pageSwitch-leave-active {
  transition: all 1s;
}
.pageSwitch-enter-to,
.pageSwitchleave-from {
  transform: translateX(0px);
  opacity: 1;
}
</style>
