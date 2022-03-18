<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// import { Expand, Fold } from '@element-plus/icons-vue'
// import IconBaseline5g from '~icons/ic/baseline-5g'

// 国际化
const locale = zhCn
</script>
<template>
  <!-- <img src="./assets/logo.png" alt="" />
  <img v-lazyimage="'/imgs/logo.png'" alt="" width="20px" /> -->
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<style>
#app {
  height: 100%;
}
</style>
