<script setup lang="ts">
// import { FormOptions } from './types/FormTypes'
// 表单实例的类型
type ElFormInstance = InstanceType<typeof ElForm>
const props = defineProps({
  // 表单配置项
  FormOptions: {
    type: Array as PropType<FormConfig[]>,
    require: true
  }
})
// 保存表单数据
const model = ref<any>(null)
// 保存表单校验规则
const rules = ref<any>(null)
// 表单元素
const form = ref<ElFormInstance>()
// 初始化表单
const initFrom = () => {
  if (props.FormOptions && props.FormOptions.length) {
    // model数据的中转站
    const m: any = {}
    // rules数据的中转站
    const r: any = {}
    props.FormOptions?.map((item: FormConfig) => {
      // 以配置中的 prop 为键名保存 配置中的 value
      m[item.prop!] = item.value
      r[item.prop!] = item.rules
    })
    model.value = cloneDeep(m)
    rules.value = cloneDeep(r)
  }
}
onMounted(() => {
  initFrom()
})
watch(
  () => props.FormOptions,
  () => {
    initFrom()
  },
  { deep: true }
)
// 表单重置方法
const resetFields = () => {
  return form.value?.resetFields
}
// 表单校验的方法
const validate = () => {
  return form.value?.validate
}
defineExpose({
  model,
  resetFields,
  validate
})
</script>
<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from 'vue'
import { FormConfig } from './types/FormTypes'
import type { ElForm } from 'element-plus'
import cloneDeep from 'lodash/cloneDeep'
export default defineComponent({ name: 'MyForms' })
</script>
<template>
  <el-form
    v-if="model"
    ref="form"
    :model="model"
    :validate-on-rule-change="false"
    :rules="rules"
    v-bind="$attrs"
  >
    <div class="form-container">
      <template v-for="(optionItem, index) in props.FormOptions" :key="index">
        <!-- 没有有子元素 -->
        <el-form-item
          v-if="!optionItem.children"
          :prop="optionItem.prop"
          :label="optionItem.label"
          :style="{ width: '100%' }"
        >
          <!-- 输入框 -->
          <el-input
            v-if="optionItem.type === 'input'"
            v-model="model[optionItem.prop!]"
            v-bind="optionItem.attrs"
          />
          <!-- input-name -->
          <el-input-number
            v-if="optionItem.type === 'input-number'"
            v-model="model[optionItem.prop!]"
            v-bind="optionItem.attrs"
          />
          <!-- 日期选择器 -->
          <el-date-picker
            v-else-if="optionItem.type === 'date-picker'"
            v-model="model[optionItem.prop!]"
            v-bind="optionItem.attrs"
          />
        </el-form-item>
        <!-- 有子元素 -->
        <el-form-item
          v-else
          :prop="optionItem.prop"
          :label="optionItem.label"
          :style="{ width: '100%' }"
        >
          <!-- 下拉框 -->
          <el-select
            v-if="optionItem.type === 'select'"
            v-model="model[optionItem.prop!]"
            v-bind="optionItem.attrs"
          >
            <template v-for="(item, index) in optionItem.children" :key="index">
              <el-option
                v-if="item.type === 'option'"
                :label="item.label"
                :value="item.value"
                v-bind="item.attrs"
              ></el-option>
            </template>
          </el-select>
          <!-- 多选框组 -->
          <el-checkbox-group
            v-else-if="optionItem.type === 'checkbox-group'"
            v-model="model[optionItem.prop!]"
            v-bind="optionItem.attrs"
          >
            <template v-for="(item, index) in optionItem.children" :key="index">
              <el-checkbox
                v-if="item.type === 'checkbox'"
                :label="item.label"
                :value="item.value"
                v-bind="item.attrs"
              ></el-checkbox>
            </template>
          </el-checkbox-group>
          <!-- 单选框组 -->
          <el-radio-group
            v-else-if="optionItem.type === 'radio-group'"
            v-model="model[optionItem.prop!]"
            v-bind="optionItem.attrs"
          >
            <template v-for="(item, index) in optionItem.children" :key="index">
              <el-radio
                v-if="item.type === 'radio'"
                :label="item.label"
                :value="item.value"
                v-bind="item.attrs"
              ></el-radio>
            </template>
          </el-radio-group>
        </el-form-item>
      </template>
      <el-form-item>
        <slot name="action" :form="form" :model="model"></slot>
      </el-form-item>
    </div>
  </el-form>
</template>
<style lang="less" scoped>
.form-container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  min-width: 400px;
  justify-content: center;
  .el-form-item {
    width: 100%;
    max-width: 360px;
  }
  // grid-template-columns: repeat(4, minmax(160, 1fr));
  // justify-content: center;
  // align-content: center;
}
</style>
