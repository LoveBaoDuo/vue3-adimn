<script setup lang="ts">
// const PermissionRouter = usePermission()
// console.log(PermissionRouter.routes)
</script>
<script lang="ts">
import { defineComponent } from 'vue'
// import usePermission from '@/store/permission'
// import MySideBaritem from './SidebarItem.vue'
export default defineComponent({ name: 'MySidebar' })
</script>
<template>
  <!-- <MySideBaritem></MySideBaritem> -->
  <div v-for="item in $pinia.state.value.usePermission.routes" :key="item.path">
    {{ item.children && item.children[0]?.meta?.name }}
  </div>
</template>
<style lang="less" scoped></style>
