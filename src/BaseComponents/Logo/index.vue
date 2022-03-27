<script setup lang="ts">
import { LogoImageConfig } from './src/types/index'
const props = defineProps<{ LogoConfig: LogoImageConfig; isTitle: boolean }>()
const istitle = computed(() => !props.isTitle)
</script>
<script lang="ts">
import { computed, defineComponent } from 'vue'
export default defineComponent({ name: 'MyLogo' })
</script>
<template>
  <div id="myLog">
    <router-link :to="props?.LogoConfig?.path">
      <!-- <el-image :src="" fit="cover"></el-image> -->
      <img
        :src="props?.LogoConfig?.imgUrl"
        alt="首页"
        :style="{
          width: props?.LogoConfig?.width,
          height: props?.LogoConfig?.height,
          paddingRight: '5px',
        }"
      />
      <h1 class="title" v-show="istitle" :style="{ color: '#fff' }">
        {{ props?.LogoConfig?.title }}
      </h1>
    </router-link>
  </div>
</template>
<style lang="less" scoped>
#myLog {
  > a {
    display: flex;
    width: 100%;
    align-items: center;
    img {
      object-fit: cover;
    }
  }
}
</style>
