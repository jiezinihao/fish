import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import 'element-plus/theme-chalk/dark/css-vars.css'
const app = createApp(App);
// const app = Vue.createApp({})
app.use(router as any)
app.mount('#app')
