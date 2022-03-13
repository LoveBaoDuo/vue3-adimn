<script setup lang="ts">
import { testBar } from '@/components/chart/bar'
// 图表数据
const data = ref([120, 200, 150, 80, 70, 110, 130])
const test = () => {
  data.value = [120, 20, 150, 80, 70, 110, 130]
}
</script>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({ name: 'SetEcharts' })
</script>
<template>
  <div>
    <MyCharts
      height="200px"
      width="200px"
      :data="data"
      :chartOptions="testBar"
    ></MyCharts>
    <el-button @click="test">修改</el-button>
  </div>
</template>
<style lang="less" scoped></style>
