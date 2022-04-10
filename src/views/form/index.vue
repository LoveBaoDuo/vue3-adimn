<script setup lang="ts">
import { loginFormConfig } from '@/BaseComponents/form/src/config/login.config'
import type { ElForm } from 'element-plus'
import MyForms from '@/BaseComponents/form/src/index.vue'
import VxeTable from '@/BaseComponents/vxeTable/src/index.vue'
import { baseTableConfig } from '@/BaseComponents/vxeTable/src/config/baseTable.config'
import TableHook from '@/BaseComponents/table/src/hook/index'
const { tableData } = TableHook('/get')
type ElFormInstance = InstanceType<typeof ElForm>
const myform = ref<ElFormInstance>()
// 提交表单
const handleSumbie = async (form: ElFormInstance, model: any) => {
  form.validate((valid: any) => {
    if (valid) {
      console.log(model)
    } else {
      console.log('表单填写有误')
    }
  })
}
// 重置表单
const handleRest = (form: ElFormInstance, model: any) => {
  form.resetFields()
}
// 触发列表的多选框
const selectChange = (val: any) => {
  console.log(val)
}
</script>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({ name: 'SetForm' })
</script>
<template>
  <div>
    <MyForms
      ref="myform"
      label-width="80px"
      :style="{ width: '100%' }"
      :inline="true"
      label-position="left"
      :FormOptions="loginFormConfig"
    >
      <template #action="{ form, model }">
        <el-button type="primary" @click="handleSumbie(form!, model)"
          >登入</el-button
        >
        <el-button @click="handleRest(form!, model)">重置</el-button>
      </template>
    </MyForms>
    <VxeTable
      border
      stripe
      max-height="400"
      show-overflow
      :row-config="{ height: 40 }"
      :TableOption="baseTableConfig"
      :data="tableData"
      @selectChange="selectChange"
    >
      <template #status="{ row }">
        <el-switch
          v-model="row.status"
          inline-prompt
          active-text="是"
          inactive-text="否"
        />
      </template>
    </VxeTable>
  </div>
</template>
<style lang="less" scoped></style>
