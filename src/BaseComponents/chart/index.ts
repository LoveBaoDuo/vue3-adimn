import type { ECharts, EChartsCoreOption } from 'echarts'
import { onMounted, onUnmounted, Ref } from 'vue'
export default class MyChart {
  chart: ECharts | undefined
  el: Ref
  chartOption: EChartsCoreOption
  constructor(el: Ref, chartOption: EChartsCoreOption) {
    this.el = el
    this.chartOption = chartOption
  }
  init(echars: any, handleClick: (params: any) => void) {
    onMounted(() => {
      this.chart = echars.init(this.el.value)
      this.setOption(this.chartOption)
      this.chart?.on('click', handleClick)
      // 监听页面的尺寸变化
      window.addEventListener('resize', this.resizeHandler)
    })
    // 注销销毁时清除图表
    onUnmounted(() => {
      this.chart?.dispose()
      window.removeEventListener('resize', this.resizeHandler)
    })
  }
  // 在页面尺寸发生改变时 改变图表尺寸
  resizeHandler() {
    if (!this.chart) {
      return
    }
    this.chart?.resize()
  }
  // 配置图表
  setOption(option: EChartsCoreOption) {
    // 先清除上一张图表
    this.clearChart()
    this.resizeHandler()
    if (this.chart) {
      // 配置图表
      this.chart.setOption(option)
    }
  }
  // 销毁实例
  clearChart() {
    this.chart && this.chart.clear()
  }
}
