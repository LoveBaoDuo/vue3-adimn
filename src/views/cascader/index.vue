<script setup lang="ts">
let id = 0
const lafun = (node: any, resolve: any) => {
  // 是当前点击的级数
  const { level } = node
  setTimeout(() => {
    const nodes = Array.from({ length: level + 1 }).map(item => ({
      k: item,
      value: ++id,
      label: `Option - ${id}`,
      leaf: level >= 2,
    }))
    resolve(nodes)
  }, 1000)
}
const text = (value: any) => {
  console.log(value)
}
// 多级联选择器 的配置
// const options: Array<T.cascaderType> = [
//   {
//     label: '民治',
//     value: '民治',
//     // disabled: true,
//     children: [{ label: '糖水围', value: '糖水围' }],
//   },
//   { label: '龙华', value: '龙华' },
// ]
</script>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'SetCascader' })
</script>
<template>
  <div>
    <MyCascader :lazy="true" @change="text" @lazyLoad="lafun"></MyCascader>
  </div>
</template>
<style lang="less" scoped></style>
