<template>
  <el-icon :size="size" :color="color">
    <component :is="name"></component>
  </el-icon>
  <!-- <div>{{ name }}</div> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as Icons from '@element-plus/icons-vue'
export default defineComponent({
  components: Icons,
  name: 'MyIcons',
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
  },
})
</script>
