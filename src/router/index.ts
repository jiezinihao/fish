
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router"



import Notes from "../views/Notes/index.vue"
import NotesDetail from "../views/Notes/Detail/index.vue"
import Travel from "../views/Travel/index.vue"
import Connect from "../views/Connect/index.vue"
import Index from "../views/Index/index.vue"
import TravelDetail from "../views/Travel/Detail/index.vue"




const routes: RouteRecordRaw[] = [
    { path: '/', name:"鱼的博客" ,redirect: '/index'},
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
    {
        path: '/travel/detail/:id?',
        name: 'travelDetail',
        component: TravelDetail
    },
    { path: '/connect', name: '联系', component: Connect },

]

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_PATH),

    routes, // `routes: routes` 的缩写
})

router.beforeResolve ((to) => {
    const name = String(to.name)
    document.title = name || '';
    console.log(to);
    if(to.fullPath == "/"){
        router.push("/index")
    }
    
    document.getElementById("body")?.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",//平滑滚动
      });
    
});

export default router