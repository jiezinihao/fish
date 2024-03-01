import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
const app = createApp(App);
// const app = Vue.createApp({})
app.use(router as any)
app.mount('#app')
