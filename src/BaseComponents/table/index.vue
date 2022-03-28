<script setup lang="ts">
import { tableOptions } from './src/types/tableTypes'
import NormalTableColumn from './NormalTableColumn.vue'
import TableHook, { getTableOptionsHook } from './src/hook/index'
// 接收父组件传值
const props = defineProps<{ tableOptions: tableOptions }>()
// 自定义方法
const emit = defineEmits<{
  (e: 'selectionChange', selectionValue: any[]): void
  (e: 'switchChange', value: any): void
}>()
// 获取表单数据
const { tableData, total, pageAll, currentPage, pageSize } = TableHook(
  props.tableOptions.url
)
// 获取table配置
const options = getTableOptionsHook(props.tableOptions)
// 触发多选框的事件
const handleSelectionChange = (selectionValue: any[]) => {
  emit('selectionChange', selectionValue)
}
// 当前页发送改变时
const handleCurrentChange = (index: any) => {
  // 修改当前页的数据
  currentPage.value = index
}
// pagesiz发送改变时
const handlePageSize = (pageszie: number) => {
  // 修改当前页的数据
  pageSize.value = pageszie
}
// 开关的change事件
const handleSwitch = (val: any, newVal: any) => {
  console.log(val, newVal)
  emit('switchChange', val)
}
// const defaultData = computed(() => tableData.value.slice(0, 10))
// const currentData = ref()
// const currentTableData = (start = 0, end = 10) => {
//   console.log(1)
//   currentData.value = tableData.value.slice(start, end)
// }
// console.log(currentData)
</script>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'myTable' })
</script>
<template>
  <!-- 骨架屏 -->
  <el-skeleton v-if="!tableData.length" :rows="10" animated :throttle="100" />
  <template v-else>
    <el-table
      :data="tableData"
      stripe
      :border="options.border"
      :height="options?.height"
      max-height="532px"
      :style="{ width: options.width }"
      @selection-change="handleSelectionChange"
    >
      <template #default>
        <!-- 是否开启多选框 -->
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <!-- 开启索引 -->
        <el-table-column
          v-if="options.index"
          type="index"
          label="序号"
          width="80"
          align="center"
        />
        <!-- 默认表格列 -->
        <NormalTableColumn :options="options">
          <template #switch="{ row }">
            <el-switch
              v-model="row.status"
              :active-value="1"
              :inactive-value="0"
              class="ml-2"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleSwitch($event, row)"
            />
          </template>
        </NormalTableColumn>
      </template>
    </el-table>
    <!-- 底部分页 -->
    <div id="TablePagination" v-if="pageAll >= 2">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 100, 200, 500, 1000, 5000]"
        background
        layout="prev, pager, next, jumper, ->, total, sizes"
        :page-count="pageAll"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handlePageSize"
      >
      </el-pagination>
    </div>
  </template>
</template>
<style lang="less" scoped>
#TablePagination {
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  background-color: #fff;
  /deep/.el-pagination__total {
    margin-left: 18px;
  }
}
</style>
