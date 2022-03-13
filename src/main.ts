import { createApp } from 'vue'
import App from './App.vue'
import router from '@/route'
import { createPinia } from 'pinia'
import components from './components'
// 导入重置样式
import '@/style/normalize.css'
const app = createApp(App)
app.use(router).use(createPinia()).use(components).mount('#app')
