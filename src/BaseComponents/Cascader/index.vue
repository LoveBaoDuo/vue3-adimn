<script setup lang="ts">
import * as T from '@/BaseComponents/types/Cascader'
// 传入的配置参数的约束
interface CascaderOption {
  multiple?: boolean // 开启多选
  checkStrictly?: boolean // 可让父子节点取消关联，选择任意一级选项
  lazy?: boolean // 数据懒加载
  // lazy 为true 时不用传options
  options?: Array<T.cascaderType>
}
// 接收父组件传值
const props = withDefaults(defineProps<CascaderOption>(), {
  multiple: false,
  checkStrictly: false,
  lazy: true,
})
// 配置方法
const emit = defineEmits<{
  // 选项发生改变是的方法
  (e: 'change', value: any): void
  // 开启lazy的懒加载渲染方法
  (e: 'lazyLoad', node: any, resolve: any): void
}>()
const value = ref([])
// 多级展示的数据
const options = computed(() => props.options)
// cascader 需要的 props
const cascaderProps = reactive({
  multiple: props.multiple,
  checkStrictly: props.checkStrictly,
  lazy: props.lazy,
  lazyLoad(node: any, resolve: any) {
    emit('lazyLoad', node, resolve)
  },
})
const handleChange = (value: any) => {
  emit('change', value)
}
</script>
<script lang="ts">
import { computed, defineComponent, reactive, ref, withDefaults } from 'vue'
export default defineComponent({ name: 'MyCascader' })
</script>
<template>
  <el-cascader
    v-model="value"
    :options="options"
    clearable
    :props="cascaderProps"
    @change="handleChange"
  ></el-cascader>
</template>
<style lang="less" scoped></style>
