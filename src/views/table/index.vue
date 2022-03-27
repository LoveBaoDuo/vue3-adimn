<script setup lang="ts">
import { baseTableConfig } from '@/BaseComponents/table/src/config/index'
// 测试函数
const text = (value: any) => {
  console.log(value)
}
// console.log(baseConfig)
</script>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'SetTable' })
</script>
<template>
  <div :style="{ width: '100%' }">
    <myTable
      :table-options="baseTableConfig"
      @selection-change="text"
      @switch-change="text"
    ></myTable>
  </div>
</template>
<style lang="less" scoped></style>
