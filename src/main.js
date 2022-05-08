import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import store from './store'
import router from './router/index'
import 'element-plus/dist/index.css';
import * as Icons from '@element-plus/icons-vue'


const app = createApp(App)
app.use(router)
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key])
})
app.use(ElementPlus)
app.use(store)
app.mount('#app')
