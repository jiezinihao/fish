<template>
    <div class="notes" :class="showDetail ? 'notes-detail' : ''">
        <div class="notes_lab">
            <div class="notes_lab_item " :class="item.nav_id === currentNavId ? 'notes_lab_item_active' : ''"
                v-for="(item) in navList" :key="item.nav_id" @click="clickNav(item)">
                {{ item.title }}
            </div>

        </div>
        <div class="main">
            <NotesDetail :articleId="currentNotesId"></NotesDetail>
        </div>
        <div class="notes_body">
            <div class="notes_list">
                <div class="notes_list_item" :class="currentNotesId === item.article_id ? 'notes_list_item_active' : ''"
                    v-for="item in notesList" :key="item.article_id" @click="clickNotesItem(item.article_id)">
                    <p>{{ item.title }}</p>
                    <time>{{ item.time }} </time>
                </div>
            </div>
            <div class="notes_page">
                <!--  -->
                <el-pagination hide-on-single-page background layout="prev, pager, next" :total="notesListPage.total"
                    :page-size="notesListPage.pageSize" v-model:current-page="notesListPage.currentPage" />
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">

import { ref, onMounted, reactive, watch } from 'vue';
import { NotesNavsGetAPI, NotesListGetAPI } from "../../request/api"
import NotesDetail from "../../components/NotesDetail/index.vue"
import 'element-plus/es/components/pagination/style/css'
import { ElPagination } from 'element-plus'
import { useRouter, useRoute } from 'vue-router';

type RouteParams = {
    navId: string, notesId: string, pageNum: number
}

const router = useRouter()
const route = useRoute()
const routeParams = reactive<RouteParams>({
    navId: route.params.navId as string,
    pageNum: Number(route.params.pageNum as string || 1),
    notesId: route.params.notesId as string,
})

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
let showDetail = ref(false)
let currentNotesId = ref<string>('')

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

//点击栏目
const clickNav = async (item: NavNotes) => {
    if (currentNavId.value === item.nav_id) {
        return
    }
    showDetail.value = false
    currentNavId.value = item.nav_id;
    //赋值且重置页数和随记ID
    routeParams.navId = item.nav_id
    routeParams.pageNum = 1
    routeParams.notesId = ''
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
    showDetail.value = true
    routeParams.pageNum = notesListPage.value.currentPage;
    routeParams.notesId = article_id;
    routeParams.navId = currentNavId.value;
    
}
//更改当前点击的notes(对react的setState拙劣的模范哈哈哈)
const setCurrentNotes = (article_id: string) => {
    if (article_id === '') {
        return
    }

    currentNotesId.value = article_id

}


watch(routeParams, (newParams, oldParams) => {

    let url = '/notes'


    url += '/' + newParams.pageNum;

    if (typeof (oldParams) !== 'undefined') {
        getNotesList(newParams.navId, newParams.pageNum)
    }



    if (newParams.navId !== '') {
        url += '/' + newParams.navId
    }


    if (newParams.notesId !== '') {
        url += '/' + newParams.notesId;
        showDetail.value = true;
        setCurrentNotes(newParams.notesId);
    }

    router.push({
        path: url
    })
}, { immediate: true })
//
onMounted(() => {
    initPage()
})
</script>

<style lang="scss">
.notes {
    display: flex;
    width: calc(100% - 240px);
    // border: 5px solid #3c2a4d;
    border-radius: 10px;
    padding: 50px 0;
    margin: 60px 120px;
    // height: 100%;
    align-items: stretch;
    background: rgba($color: #23272f, $alpha: 0.5);
    transition: 1s ease;
    height: 900px;

    &.notes-detail {
        // background: rgba($color: #23272f, $alpha: 0.9);
        background: #23272f;
        padding: 50px 20px;
        height: 100%;
        margin: 0 0;
        width: 100%;
        // transition:opacity 0.2 ease,width .5s ease;

        .main {
            width: 100%;
            overflow: hidden;
            opacity: 1;
            transition: opacity 1s .5s ease, width 1.5s ease;

        }
    }

    .notes_lab {
        min-width: 400px;
        flex-shrink: 0;
        padding: 20px;
        border-radius: 10px 0 0 10px;

        .notes_lab_item {
            height: 60px;
            width: 100%;
            padding: 0 10px 0 20px;
            line-height: 60px;
            position: relative;
            margin-bottom: 30px;
            font-size: 20px;
            cursor: pointer;
            transition: .2s ease;
            // color: white;
            font-weight: bold;
            letter-spacing: 1px;
            border: 1px solid rgba(88, 175, 223, .1);
            color: #999;

            &::after {
                content: "";
                position: absolute;
                left: 0;
                width: 10px;
                height: 100%;
                background: #95adbe;
            }

            &:hover {
                padding-left: 30px;
                letter-spacing: 1px;
                background: rgba(88, 175, 223, .1);
                box-shadow: 2px 2px 5px rgba(88, 175, 223, .1);
                color: #eee;

                &::after {
                    background: rgba(88, 175, 223, .5);
                }
            }

            &.notes_lab_item_active {
                padding-left: 30px;
                letter-spacing: 1px;
                background: rgba(88, 175, 223, .1);
                box-shadow: 2px 2px 5px rgba(88, 175, 223, .1);
                color: #eee;

                &::after {
                    background: rgba(88, 175, 223, .5);
                }
            }
        }

    }

    .main {
        width: 0%;
        opacity: 0;
        overflow-y: scroll;
        transition: opacity 0.2 ease, width .5s ease;

    }




    .notes_body {
        flex: 2;
        padding: 20px;
        border-radius: 0 10px 10px 0;

        .notes_list {
            width: 100%;
            min-width: 400px;

            .notes_list_item {
                width: 100%;
                margin-bottom: 40px;
                position: relative;
                cursor: pointer;
                border: 2px solid rgba(88, 175, 223, 0);
                border-bottom: none;
                border-radius: 5px;
                padding: 20px 10px;
                padding-left: 30px;

                &.notes_list_item_active {
                    border: 2px solid rgba(88, 175, 223, .1);
                    border-bottom: none;

                    p {
                        color: #eee;
                    }

                    &::before {
                        width: 100%;
                    }
                }

                p {
                    margin-bottom: 10px;
                    font-size: 18px;
                    color: #999;
                }

                time {
                    font-size: 14px;
                    color: #999;
                }

                &::after {
                    content: "";
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    height: 20px;
                    width: 20px;
                    border-radius: 5px 0 0 0;
                    border-left: 2px solid rgba(88, 175, 223, 0.1);
                    border-top: 2px solid rgba(88, 175, 223, 0.1);
                    z-index: 1;
                }

                &::before {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: 2px;
                    width: 10%;
                    background: rgba(88, 175, 223, 0.9);
                    z-index: 2;
                    transition: 0.5s ease-in;
                }

                &:hover {
                    border: 2px solid rgba(88, 175, 223, .1);
                    border-bottom: none;

                    p {
                        color: #eee;
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
</style>