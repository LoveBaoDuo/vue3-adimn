<script setup lang="ts">
import * as T from '@/components/types/FormTypes'
import type { ElForm } from 'element-plus'
type ElFormInstance = InstanceType<typeof ElForm>
const props = defineProps<{
  FormOptions: T.FormPropsTypes
  formData: any
  rules: any
}>()
const formData = computed(() => props.formData)
// form表单
const ruleFormRef = ref<ElFormInstance>()
// 触发表单submit事件
const handlesubmit = async ($event: Event) => {
  try {
    const result = await ruleFormRef.value?.validate()
    props.FormOptions.handlesubmit &&
      props.FormOptions.handlesubmit(ruleFormRef)
  } catch (err) {
    console.log(err)
  }
}
// 触发按钮点击事件
const handleClick = ($event: any, handle?: (e: any) => void) => {
  if (!handle) {
    return
  }
  // 重置表单
  try {
    ruleFormRef.value?.resetFields()
    handle($event)
  } catch (err) {
    console.log(err)
  }
}
</script>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
export default defineComponent({ name: 'MyForm' })
</script>
<template>
  <el-form
    ref="ruleFormRef"
    :model="formData"
    :rules="props.rules"
    :label-position="props.FormOptions?.labelAlign"
    :label-width="props.FormOptions?.lableWidth"
    :inline="props.FormOptions?.inline"
    @submit.prevent="handlesubmit"
  >
    <template v-for="(item, index) in props.FormOptions.Options" :key="index">
      <!-- 类型是文本框时 -->
      <el-form-item
        v-if="item.type === 'input'"
        :label="item.label"
        :label-width="item?.lableWidth"
        :prop="item.value"
      >
        <el-input
          v-model="formData[item.value]"
          :type="item.inputType"
          :placeholder="item?.placeholder"
          :style="{ width: item?.width }"
        ></el-input>
      </el-form-item>
      <!-- 类型是下拉框时 -->
      <el-form-item
        v-else-if="item.type === 'select'"
        :label="item.label"
        :label-width="item?.lableWidth"
        :prop="item.value"
      >
        <el-select
          v-model="formData[item.value]"
          :placeholder="item?.placeholder"
          :style="{ width: item?.width }"
        >
          <el-option
            v-for="selectItem in item.selectItem"
            :key="selectItem.label"
            :label="selectItem.label"
            :value="selectItem.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 类型是多选框时框时 -->
      <el-form-item
        v-else-if="item.type === 'checkbox'"
        :label="item.label"
        :label-width="item?.lableWidth"
        :prop="item.value"
      >
        <el-checkbox-group v-model="formData[item.value]">
          <el-checkbox
            name="type"
            v-for="city in item.checkList"
            :key="city"
            :label="city"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- 类型是单选框时框时 -->
      <el-form-item
        v-else-if="item.type === 'radio'"
        :label="item.label"
        :label-width="item?.lableWidth"
        :prop="item.value"
      >
        <el-radio-group v-model="formData[item.value]">
          <el-radio
            v-for="radioItem in item.radio"
            :key="radioItem.label"
            :label="radioItem.label"
            >{{ radioItem.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <!-- 类型是按钮时 -->
      <el-form-item v-else-if="item.type === 'btn'">
        <el-button
          v-for="btn in item.btnList"
          :key="btn"
          :type="btn.type"
          :native-type="btn.nativeType"
          @click="handleClick($event, btn?.handle)"
          >{{ btn.text }}</el-button
        >
      </el-form-item>
      <!-- 类型是slot时 -->
      <el-form-item v-else :label="item.label" :label-width="item?.lableWidth">
        <slot :value="item"></slot>
      </el-form-item>
    </template>
  </el-form>
</template>
<style lang="less" scoped></style>
