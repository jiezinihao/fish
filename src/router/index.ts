
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router"



import Notes from "../views/Notes/index.vue"
import Travel from "../views/Travel/index.vue"
import Connect from "../views/Connect/index.vue"



const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/notes' },

    // 动态字段以冒号开始
    { path: '/notes', name: '随记', component: Notes },

    { path: '/travel', name: '旅行', component: Travel },
    { path: '/connect', name: '联系', component: Connect },

]

const router = createRouter({
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
})

router.afterEach((to) => {
    const name = String(to.name)
    document.title = name || '';
});

export default router