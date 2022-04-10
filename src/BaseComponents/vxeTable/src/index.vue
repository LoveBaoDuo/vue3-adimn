<script setup lang="ts">
const props = defineProps({
  TableOption: {
    type: Array as PropType<TableOptions[]>,
    required: true
  },
  isIndex: {
    type: Boolean,
    default: true
  },
  isCheckbox: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['selectChange'])
const hadnleCheckboxChange = (val: any) => {
  if (val.records) {
    emit('selectChange', val.records)
  } else {
    emit('selectChange', val.row)
  }
}
</script>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TableOptions } from './types/TableOption'
export default defineComponent({ name: 'MyVxeTable' })
</script>
<template>
  <vxe-table
    v-bind="$attrs"
    @checkbox-change="hadnleCheckboxChange"
    @checkbox-all="hadnleCheckboxChange"
  >
    <vxe-column
      v-if="props.isIndex"
      type="seq"
      width="40"
      align="center"
    ></vxe-column>
    <vxe-column
      v-if="props.isCheckbox"
      type="checkbox"
      width="40"
      align="center"
    ></vxe-column>
    <template v-for="(item, index) in props.TableOption" :key="index">
      <vxe-column
        v-if="!item.slot"
        :field="item.prop"
        :title="item.label"
        v-bind="item.attrs"
      ></vxe-column>
      <vxe-column v-else v-bind="item.attrs">
        <template #header
          ><h1>{{ item.label }}</h1></template
        >
        <template #default="{ row }">
          <slot :name="item.slot" :row="row"></slot>
        </template>
      </vxe-column>
    </template>
  </vxe-table>
</template>
<style lang="less" scoped>
/*滚动条整体部分*/
.mytable-scrollbar ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
/*滚动条的轨道*/
.mytable-scrollbar ::-webkit-scrollbar-track {
  background-color: #ffffff;
}
/*滚动条里面的小方块，能向上向下移动*/
.mytable-scrollbar ::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 5px;
  border: 1px solid #f1f1f1;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}
/*边角，即两个滚动条的交汇处*/
.mytable-scrollbar ::-webkit-scrollbar-corner {
  background-color: #ffffff;
}
</style>
