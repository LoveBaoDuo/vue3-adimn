<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// import { Expand, Fold } from '@element-plus/icons-vue'
// import IconBaseline5g from '~icons/ic/baseline-5g'

// 国际化
const locale = zhCn
</script>
<template>
  <div>
    <router-link to="/form">form</router-link>
    <router-link to="/table">table</router-link>
    <router-link to="/chart">chart</router-link>
    <router-link to="/cascader">cascader</router-link>
  </div>
  <el-config-provider :locale="locale">
    <router-view v-slot="{ Component }">
      <transition name="pageSwitch">
        <component :is="Component" />
      </transition>
    </router-view>
    <!-- <router-view></router-view> -->
  </el-config-provider>
</template>

<style>
div a {
  display: inline-block;
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background-color: skyblue;
  margin-right: 5px;
  color: #fff;
}
.pageSwitch-enter-from,
.pageSwitchleave-to {
  transform: translateX(10px);
  opacity: 0;
}
.pageSwitch-enter-active,
.pageSwitchleave-active {
  transition: all 1s;
}
.pageSwitch-enter-to,
.pageSwitchleave-from {
  transform: translateX(0px);
  opacity: 1;
}
</style>
