import { createApp } from 'vue'
import App from './App.vue'
import router from '@/route'
import { createPinia } from 'pinia'
import BaseComponents from './BaseComponents'
// 导入自定义指令
import directive from './directive'
// 导入重置样式
import '@/style/normalize.css'
import './permission'
import vxeTable from './BaseComponents/vxeTable'
const app = createApp(App)
app
  .use(router)
  .use(createPinia())
  .use(BaseComponents)
  .use(directive)
  .use(vxeTable)
  .mount('#app')
