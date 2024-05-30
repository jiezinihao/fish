
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router"



import Notes from "../views/Notes/index.vue"
import NotesDetail from "../views/Notes/Detail/index.vue"
import Travel from "../views/Travel/index.vue"
import Connect from "../views/Connect/index.vue"
import Index from "../views/Index/index.vue"



const routes: RouteRecordRaw[] = [
    { path: '/', name:"鱼的博客", redirect: '/index' },
    { path: '/index', name: '鱼的博客', component: Index },

    // 动态字段以冒号开始
    {
        path: '/notes/:pageNum?/:navId?', name: '随记', component: Notes, children: [

        ]
    },
    {
        path: '/notes/detail/:id?',
        name: 'detail',
        component: NotesDetail
    },

    { path: '/travel', name: '旅行', component: Travel },
    { path: '/connect', name: '联系', component: Connect },

]

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_PATH),

    routes, // `routes: routes` 的缩写
})

router.afterEach((to) => {
    const name = String(to.name)
    document.title = name || '';
});

export default router