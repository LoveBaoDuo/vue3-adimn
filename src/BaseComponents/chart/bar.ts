import type { EChartsCoreOption } from 'echarts'
export const testBar = (data: any): EChartsCoreOption => {
  const defaultConfig: EChartsCoreOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: data,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
      },
    ],
  }
  const opt: EChartsCoreOption = Object.assign({}, defaultConfig)
  return opt
}
