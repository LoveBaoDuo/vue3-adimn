<script setup lang="ts">
import { baseFormConfig } from '@/BaseComponents/form/src/config/index'
// myform 数据
const formData = reactive<{
  name: string
  select: string
  checkList: any[]
  radio: number
  pwd: any
}>({
  name: '民治',
  select: '配置1',
  pwd: 12,
  checkList: ['看书'],
  radio: 0,
})
// 表单校验规则
const rules = reactive({
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
})
</script>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({ name: 'SetForm' })
</script>
<template>
  <div>
    <h1>{{ formData.name }}</h1>
    <h1>{{ formData.select }}</h1>
    <h1>{{ formData.checkList }}</h1>
    <h1>{{ formData.radio }}</h1>
    <MyForm
      :FormOptions="baseFormConfig"
      :formData="formData"
      :rules="rules"
    ></MyForm>
  </div>
</template>
<style lang="less" scoped></style>
