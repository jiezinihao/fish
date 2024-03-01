
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router"



import Notes from "../views/Notes/index.vue"
import Travel from "../views/Travel/index.vue"
import Connect from "../views/Connect/index.vue"



const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/Notes' },

    // 动态字段以冒号开始
    { path: '/notes', name: '随记', component: Notes },

    { path: '/travel', name: '旅行', component: Travel },
    { path: '/connect', name: '联系', component: Connect },

]



const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
})

router.afterEach((to, from) => {
    const name = String(to.name)
    document.title = name || '';
});

export default router