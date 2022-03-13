<script setup lang="ts">
import * as T from '@/components/types/tableTypes'
import TableHook from '@/components/table/table'
// 接收父组件传值
const props = defineProps<{ tableOptions: T.tableOptions }>()
// 自定义方法
const emit = defineEmits<{
  (e: 'selectionChange', selectionValue: any[]): void
  (e: 'switchChange', value: any): void
}>()
const TableHookObj = new TableHook('/get')
const { currentData, length, pageSize, currentPage } = TableHookObj
const options = TableHookObj.getTableOptionsHook(props.tableOptions)
// 触发多选框的事件
const handleSelectionChange = (selectionValue: any[]) => {
  emit('selectionChange', selectionValue)
}
// 开关的change事件
const handleSwitch = (val: any, newVal: any) => {
  console.log(val, newVal)
  emit('switchChange', val)
}
// 表格筛选的方法
const filterTag = (value: string, row: any, column: any) => {
  const property = column['property']
  return row[property] === value
}

// 总页数
const pageAll = computed(() => Math.ceil(length.value / pageSize.value))

// 当前页发送改变时
const handleCurrentChange = (index: any) => {
  // 修改当前页的数据
  TableHookObj.currentData.value = TableHookObj.getCurrentpageDataHook(
    index,
    pageSize.value
  )
}
// pagesiz发送改变时
const handlePageSize = (pageszie: number) => {
  // 修改当前页的数据
  TableHookObj.currentData.value = TableHookObj.getCurrentpageDataHook(
    currentPage.value,
    pageszie
  )
}
</script>
<script lang="ts">
import { computed, defineComponent } from 'vue'
export default defineComponent({ name: 'myTable' })
</script>

<template>
  <!-- 骨架屏 -->
  <el-skeleton
    v-if="!TableHookObj.length.value"
    :rows="10"
    animated
    :throttle="500"
  />
  <el-table
    v-else
    :data="currentData"
    stripe
    :border="options.border"
    :height="options?.height"
    :style="{ width: options.width }"
    @selection-change="handleSelectionChange"
  >
    <template #default>
      <!-- 开启索引 -->
      <el-table-column
        v-if="options.index"
        type="index"
        label="序号"
        width="80"
        align="center"
      />
      <!-- 是否开启多选框 -->
      <el-table-column
        v-if="options.checkbox"
        type="selection"
        width="55"
        align="center"
      ></el-table-column>
      <!-- 正常列的遍历 -->
      <template v-for="item in options.thead" :key="item.parkinNagem">
        <!-- 默认正常的类型 -->
        <el-table-column
          v-if="item.type === 'normal'"
          :prop="item.prop"
          :label="item.label"
          :filters="item?.filters"
          :filter-method="item.filters && filterTag"
          :width="item?.width"
          :fixed="item?.fixed"
          :sortable="item?.sort"
          align="center"
        />
        <!-- 类型是function -->
        <el-table-column
          v-else-if="item.type === 'function'"
          :prop="item.prop"
          :label="item.label"
          :width="item?.width"
          :fixed="item?.fixed"
          :sortable="item?.sort"
          align="center"
        >
          <template #default="{ row }">
            {{ item.handle && item.handle(row[item.prop]) }}
          </template>
        </el-table-column>
        <!-- 类型是 switch -->
        <el-table-column
          v-else-if="item.type === 'switch'"
          :prop="item.prop"
          :label="item.label"
          :width="item?.width"
          :fixed="item?.fixed"
          :sortable="item?.sort"
          align="center"
        >
          <template #default="{ row }">
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
        </el-table-column>
        <!-- 类型是操作 handle按钮 -->
        <el-table-column
          v-else-if="item.type === 'handle'"
          :label="item.label"
          :width="item?.width"
          :fixed="item?.fixed"
          :sortable="item?.sort"
          align="center"
        >
          <template #default="{ row }">
            <el-button
              v-for="btnItem in item.btn"
              :key="btnItem.text"
              :type="btnItem?.type"
              :size="btnItem?.size"
              @click="btnItem.handleClick($event, row)"
            >
              <!-- {{ btnItem.text }} -->
              <template #default>
                {{ btnItem.text }}
              </template>
              <template #icon>
                <el-icon>
                  <MyIcons :name="btnItem.icon"></MyIcons>
                </el-icon>
              </template>
            </el-button>
          </template>
        </el-table-column>
        <!-- 类型是slot -->
        <el-table-column v-else>
          <template #default="{ row }">
            <slot :row="row"></slot>
          </template>
        </el-table-column>
      </template>
    </template>
    <!-- 底部分页 -->
    <template #append> </template>
  </el-table>
  <div id="TablePagination" v-if="pageAll >= 2">
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      background
      layout="prev, pager, next, jumper, ->, total, sizes"
      :page-count="pageAll"
      :total="length"
      @current-change="handleCurrentChange"
      @size-change="handlePageSize"
    >
    </el-pagination>
  </div>
</template>

<style lang="less" scoped>
#TablePagination {
  width: 100%;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  /deep/.el-pagination__total {
    margin-left: 18px;
  }
}
</style>
