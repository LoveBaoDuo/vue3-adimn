<script setup lang="ts">
// 接收传递的数据
const props = defineProps<{ options: any }>()
// 表格筛选的方法
const filterTag = (value: string, row: any, column: any) => {
  const property = column['property']
  return row[property] === value
}
</script>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'NormalTableColumn' })
</script>
<template>
  <!-- 正常列的遍历 -->
  <template v-for="item in props.options.thead" :key="item.parkinNagem">
    <!-- {{ item.parkinNagem }} -->
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
    <template v-if="item.type === 'slot'">
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :width="item?.width"
        align="center"
        :fixed="item?.fixed"
      >
        <template #default="{ row }">
          <slot v-if="item.slotName" :name="item.slotName" :row="row"></slot>
          <slot v-else :row="row"></slot>
        </template>
      </el-table-column>
    </template>
  </template>
</template>
<style lang="less" scoped></style>
