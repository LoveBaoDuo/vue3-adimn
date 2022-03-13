<script setup lang="ts">
// 测试函数
const text = (value: any) => {
  console.log(value)
}
enum stopcar {
  carStop = 1,
}
const addresFun = (row: any) => {
  return row === stopcar.carStop ? '可停' : '不可停'
}
const thead: theadType[] = [
  { type: 'normal', label: '名字', prop: 'parkinNagem' },
  {
    type: 'normal',
    label: '地区',
    prop: 'addres',
    sort: true,
    filters: [{ text: '民治', value: '民治' }],
  },
  { type: 'function', label: '可停', prop: 'carsNumber', handle: addresFun },
  { type: 'switch', label: '状态', prop: 'status' },
  {
    type: 'handle',
    label: '操作',
    prop: '',
    width: '300',
    // fixed: 'right',
    btn: [
      {
        type: 'primary',
        text: '添加',
        icon: 'Edit',
        size: 'small',
        handleClick(e: Event, value: any) {
          console.log(e, value)
        },
      },
      {
        type: 'warning',
        text: '删除',
        icon: 'Delete',
        size: 'small',
        handleClick(e: Event, value: any) {
          console.log(e, value)
        },
      },
    ],
  },
]
</script>
<script lang="ts">
import { defineComponent } from 'vue'
import { theadType } from '@/components/types/tableTypes'
export default defineComponent({ name: 'SetTable' })
</script>
<template>
  <div>
    <myTable
      :table-options="{ thead, url: '/get', border: true, height: '100%' }"
      @selection-change="text"
      @switch-change="text"
    ></myTable>
  </div>
</template>
<style lang="less" scoped></style>
