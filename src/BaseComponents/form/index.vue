<script setup lang="ts">
import { FormPropsTypes } from './src/types/FormTypes'
import FormHandle from './formTrigger'
const props = defineProps<{
  FormOptions: FormPropsTypes
  formData: any
  rules: any
}>()
const emit = defineEmits<{
  (e: 'handleSumbie', data: any): void
}>()
const formHandle = new FormHandle()
const formData = computed(() => props.formData)
// form表单
const ruleFormRef = formHandle.getFormElement()
// 触发表单submit事件
const handlesubmit = async ($event: Event) => {
  try {
    // 提交表单时进行表单校验
    await ruleFormRef.value?.validate()
    emit('handleSumbie', $event)
  } catch (err) {
    console.log(err)
  }
}
// 触发按钮点击事件
const handleClick = formHandle.handleClick
</script>
<script lang="ts">
import { computed, defineComponent } from 'vue'
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
    <template v-for="(item, index) in props.FormOptions.options" :key="index">
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
        <!-- 下拉框 -->
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
      <template v-if="item.type === 'slot'">
        <slot v-if="item.slotName" :name="item.slotName"></slot>
        <slot v-else></slot>
      </template>
    </template>
  </el-form>
</template>
<style lang="less" scoped></style>
