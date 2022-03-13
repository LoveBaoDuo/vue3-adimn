<script setup lang="ts">
// 测试函数
const text = (value: any) => {
  console.log(value)
}
// myform 配置
const Options: OptionsTypes[] = [
  {
    type: 'input',
    inputType: 'text',
    label: '名字',
    value: 'name',
    placeholder: '请输入名字',
    width: '220px',
  },
  {
    type: 'input',
    inputType: 'password',
    label: '密码',
    value: 'pwd',
    placeholder: '请输入名字',
    width: '220px',
  },
  {
    type: 'select',
    label: '筛选',
    value: 'select',
    width: '220px',
    selectItem: [
      { label: '配置1', value: '配置1' },
      { label: '配置2', value: '配置2' },
    ],
  },
  {
    type: 'checkbox',
    label: '爱好',
    value: 'checkList',
    checkList: ['看书', '打游戏'],
  },
  {
    type: 'radio',
    label: '性别',
    value: 'radio',
    radio: [
      { label: 0, name: '男' },
      { label: 1, name: '女' },
    ],
  },
  {
    type: 'btn',
    value: '',
    btnList: [
      {
        type: 'primary',
        text: '提交',
        nativeType: 'submit',
      },
      {
        type: 'default',
        text: '取消',
        nativeType: 'button',
        handle: text,
      },
    ],
  },
]
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
const validate = async () => {
  alert(111)
  // e.target.validate()
}
</script>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { OptionsTypes } from '@/components/types/FormTypes'
export default defineComponent({ name: 'SetForm' })
</script>
<template>
  <div>
    <h1>{{ formData.name }}</h1>
    <h1>{{ formData.select }}</h1>
    <h1>{{ formData.checkList }}</h1>
    <h1>{{ formData.radio }}</h1>
    <MyForm
      :FormOptions="{
        Options,
        lableWidth: '120px',
        inline: true,
        handlesubmit: validate,
      }"
      :formData="formData"
      :rules="rules"
    ></MyForm>
  </div>
</template>
<style lang="less" scoped></style>
