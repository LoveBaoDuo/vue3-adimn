import { createApp } from 'vue'
import App from './App.vue'
import router from '@/route'
import { createPinia } from 'pinia'
import components from './components'
// 导入自定义指令
import directive from './directive'
// 导入重置样式
import '@/style/normalize.css'
import './permission'
const app = createApp(App)
app.use(router).use(createPinia()).use(components).use(directive).mount('#app')
