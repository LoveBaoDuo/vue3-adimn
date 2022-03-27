<script setup lang="ts">
// 引入char类
import MyChart from './index'
import type { EChartsCoreOption } from 'echarts'
const props = defineProps<{
  height: string
  width: string
  data: any[]
  chartOptions(data: any): EChartsCoreOption
}>()
const chart = ref<HTMLElement>()
// const data = computed(() => props.data)
// 图表配置
const chartOption: EChartsCoreOption = props.chartOptions(props.data)
// echarts echart 的对象
// chart 图表容器
// chartOption 图表配置
// 回调函数
const mycharts = new MyChart(chart, chartOption)
mycharts.init(echarts, (params: any) => {
  console.log(111, params)
})
watch(
  () => props.data,
  newValue => {
    if (newValue) {
      mycharts.setOption(props.chartOptions(newValue))
    }
  },
  { deep: true }
)
</script>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
])
export default defineComponent({ name: 'MyCharts' })
</script>
<template>
  <div id="chart">
    <div ref="chart" :style="{ height: props.height, width: props.width }" />
  </div>
</template>
<style lang="less" scoped></style>
