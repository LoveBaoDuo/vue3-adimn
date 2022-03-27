<script setup lang="ts"></script>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'MyMain' })
</script>
<template>
  <router-view v-slot="{ Component }">
    <transition name="pageSwitch" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<style lang="less" scoped>
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
