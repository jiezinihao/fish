<template>
    <div class="notes" ref="notes">
        <div class="main" :class="showMobileNav ? 'main_mobile' : ''" ref="main">
            <div class="notes_lab">
                <div class="notes_lab_list">
                    <div class="notes_lab_item" :class="item.nav_id === currentNavId ? 'notes_lab_item_active' : ''"
                        v-for="(item) in navList" :key="item.nav_id" @click="clickNav(item)">
                        {{ item.title }}
                    </div>
                    <div class="notes_lab_item lab_mobile"
                        :class="item.nav_id === currentNavId ? 'notes_lab_item_active' : ''" v-for="(item) in navList"
                        :key="item.nav_id + '1'" @click="clickMobileNav(item)">
                        {{ item.title }}
                    </div>
                </div>
                <div class="notes_mobile_click" @click="showClickMobileNav()">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-right-left"></use>
                    </svg>
                </div>
            </div>

            <div class="notes_body">
                <div class="notes_list">
                    <div v-for="item in notesList" :key="item.article_id">
                        <transition name="fade">
                            <div class="notes_list_item"
                                :class="currentNotesId === item.article_id ? 'notes_list_item_active' : ''"
                                @click="clickNotesItem(item.article_id)">
                                <p>{{ item.title }}</p>
                                <time>{{ item.time }} </time>
                            </div>
                        </transition>
                    </div>

                </div>
                <div class="notes_page">
                    <!--  -->
                    <el-pagination background layout="prev, pager, next" :total="notesListPage.total"
                        :page-size="notesListPage.pageSize" v-model:current-page="notesListPage.currentPage" />
                </div>
            </div>
        </div>
        <Foot></Foot>
    </div>
</template>

<script setup lang="ts">

import { ref, onMounted, reactive, watch } from 'vue';
import { NotesNavsGetAPI, NotesListGetAPI } from "../../request/api"
import 'element-plus/es/components/pagination/style/css'
import { ElPagination } from 'element-plus'
import { useRouter, useRoute } from 'vue-router';
import Foot from "../../components/Foot/index.vue"

type RouteParams = {
    navId: string, pageNum: number
}

const router = useRouter()
const route = useRoute()
const routeParams = reactive<RouteParams>({
    navId: route.params.navId as string,
    pageNum: Number(route.params.pageNum as string || 1),
})

const notes = ref<any>(null)

//栏目列表
let navList = ref<NavNotes[]>([])
//文章列表
let notesList = ref<NotesList[]>([])
let notesListPage = ref({
    currentPage: Number(route.params.pageNum as string || 1),
    total: 0,
    pageSize: 5
})
let currentNavId = ref('')
// let showDetail = ref(false)
let currentNotesId = ref<string>('');

//移动端显示栏目列表
let showMobileNav = ref(false)

onMounted(() => {
    initPage()
})

watch(() => notesListPage.value.currentPage, (val, oldVal) => {
    if (val !== oldVal) {
        routeParams.pageNum = val

    }
})


//加载栏目
const getNavList = async () => {
    const result = await NotesNavsGetAPI().then(data => data)
    navList.value = result.data
    return result.data
}
//加载文章列表
const getNotesList = async (nav_id: string, page: number = 1, pageSize: number = notesListPage.value.pageSize) => {
    const result = await NotesListGetAPI({ nav_id, page, pageSize }).then(data => data)
    notesList.value = result.data
    resetPagination(result.maxCount)
}
//重置分页参数
const resetPagination = (maxCount: string) => {

    if (isNaN(Number(maxCount))) {
        return
    }

    notesListPage.value.total = Number(maxCount)
}


const showClickMobileNav = () => {
    showMobileNav.value = !showMobileNav.value
}

const clickMobileNav = (item: NavNotes) => {
    showMobileNav.value = !showMobileNav.value
    clickNav(item)
}
//点击栏目
const clickNav = async (item: NavNotes) => {
    if (currentNavId.value === item.nav_id) {
        return
    }
    // showDetail.value = false
    currentNavId.value = item.nav_id;
    //赋值且重置页数和随记ID
    routeParams.navId = item.nav_id
    routeParams.pageNum = 1
    getNotesList(currentNavId.value)
}

//第一次进入逻辑
const initPage = async () => {
    const data = await getNavList();
    if (data.length > 0) {
        currentNavId.value = data[0].nav_id
    }
    await getNotesList(routeParams.navId || currentNavId.value, routeParams.pageNum || 1);

}
//点击随记详情
const clickNotesItem = async (article_id: string) => {
    // showDetail.value = true
    const url = `/notes/detail/${article_id}`
    router.push({
        path: url,
    })

}

const toScrollTop = () => {
    console.log(notes.value);

    notes.value.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",//平滑滚动
    });
}


watch(routeParams, (newParams, oldParams) => {
    let url = '/notes'
    url += '/' + newParams.pageNum;

    if (typeof (oldParams) !== 'undefined') {
        getNotesList(currentNavId.value, newParams.pageNum)
    }

    url += '/' + currentNavId.value

    router.push({
        path: url
    })
    toScrollTop()
})
//
onMounted(() => {
    initPage()
})
</script>

<style lang="scss">
@keyframes fade-in {
    0% {
        transform: translateY(-50px);
    }

    100% {
        transform: translateY(0);
    }
}

.notes {
    width: 100%;
    // border: 5px solid #3c2a4d;
    // height: 100%;
    // transition: 1s ease;
    height: 100%;
    overflow: scroll;

    .main {
        position: relative;

        width: 100%;
        min-height: 100%;
        display: flex;
        justify-content: space-between;
        padding: 1rem 2rem;
        align-items: flex-start;
    }


    .notes_lab {
        min-width: 400px;
        flex-shrink: 0;
        padding: 0.5rem;
        border-radius: 10px 0 0 10px;
        position: sticky;
        position: -webkit-sticky;
        top: 0;
        left: 0;
        height: auto;

        .notes_lab_item {
            height: 60px;
            width: 100%;
            padding: 0 10px 0 20px;
            line-height: 60px;
            position: relative;
            margin-bottom: 30px;
            font-size: var(--font-size-medium);
            cursor: pointer;
            transition: .2s ease;
            // color: white;
            font-weight: bold;
            letter-spacing: 1px;
            border: var(--border);
            color: hsl(var(--font-color)/0.8);

            &.lab_mobile {
                display: none;
            }

            &::after {
                content: "";
                position: absolute;
                left: 0;
                width: 10px;
                height: 100%;
                background: hsl(var(--theme-color)/0.7);
            }

            &:hover {
                padding-left: 30px;
                letter-spacing: 1px;
                background: rgba(88, 175, 223, .1);
                box-shadow: 2px 2px 5px rgba(88, 175, 223, .1);
                color: hsl(var(--font-color));


                &::after {
                    background: hsl(var(--theme-color));
                }
            }

            &.notes_lab_item_active {
                padding-left: 30px;
                letter-spacing: 1px;
                background: rgba(88, 175, 223, .1);
                box-shadow: 2px 2px 5px rgba(88, 175, 223, .1);
                color: hsl(var(--font-color)/1.2);

                &::after {
                    background: hsl(var(--theme-color));

                }
            }
        }

        .notes_mobile_click{
            display: none
        }

    }





    .notes_body {
        flex: 2;
        padding: 0.2rem;

        .notes_list {
            width: 100%;
            min-width: 400px;

            .notes_list_item {
                width: 100%;
                margin-bottom: 0.5rem;
                position: relative;
                cursor: pointer;
                border: var(--border);
                border-bottom: none;
                border-radius: 5px;
                padding: 0.6rem 0.4rem;
                padding-left: 0.8rem;
                animation: fade-in 0.4s;

                &.notes_list_item_active {
                    border: var(--border);

                    border-bottom: none;

                    &::before {
                        width: 100%;
                    }
                }

                p {
                    margin-bottom: 10px;
                    font-size: 18px;
                    color: hsl(var(--font-color));
                }

                time {
                    font-size: 14px;
                    color: hsl(var(--font-color)/0.7);
                }

                &::after {
                    content: "";
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    height: 30px;
                    width: 30px;
                    border-radius: 5px 0 0 0;
                    border-left: 2px solid hsl(var(--theme-color)/0.4);
                    border-top: 2px solid hsl(var(--theme-color)/0.4);
                    z-index: 1;
                }

                &::before {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: 2px;
                    width: 10%;
                    background: hsl(var(--theme-color)/0.4);
                    z-index: 2;
                    transition: 0.5s ease-in;
                }

                &:hover {
                    border: var(--border);
                    border-bottom: none;

                    p {
                        color: hsl(var(--theme-color));
                    }

                    &::before {
                        width: 100%;
                    }
                }
            }
        }

        .notes_page {
            display: flex;
            justify-content: center;
        }
    }

}

@media screen and (max-width: 1200px) {
    .notes {
        .main {
            padding: 1rem;

            .notes_lab {
                min-width: 200px;

                .notes_lab_item {
                    height: 55px;
                    line-height: 55px;
                }
            }
        }
    }

}

@media screen and (max-width: 900px) {
    .notes {
        .main {
            padding: 1rem;
            position: relative;
            display: block;
            overflow: hidden;

            &.main_mobile {
                .notes_lab {
                    left: -85%;
                }

                .notes_body {
                    left: 15%;
                }
            }

            .notes_lab {
                position: absolute;
                left: 0;
                top: 1rem;
                width: 100%;
                display: flex;
                align-items: stretch;
                padding: 0;
                transition: .2s linear;

                .notes_lab_list {
                    flex: 1;
                    padding-left: 0.5rem;
                }

                .notes_lab_item {
                    display: none;
                    width: 100%;
                    height: 55px;
                    
                    line-height: 55px;
                }

                .lab_mobile {
                    display: block;
                }

                .notes_mobile_click {
                    width: 15%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    
                    svg {
                        width: 1rem;
                        height: 1rem;
                    }
                }
            }



            .notes_body {
                position: absolute;
                left: 100%;
                top: 1rem;

                width: 90%;
                height: 100%;
                padding-right: 1rem;
                transition: .2s linear;
                .notes_list{
                    width: 100%;
                    min-width: 0;
                    time{
                        display: block;
                    }
                }

            }
        }
    }

}
</style>
<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>