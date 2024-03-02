<template>
    <div class="notes" :class="showDetail ? 'notes-detail' : ''">
        <div class="notes_lab">
            <div class="notes_lab_item " :class="item.nav_id === currentNav.nav_id ? 'notes_lab_item_active' : ''"
                v-for="(item) in navList" :key="item.nav_id" @click="clickNav(item)">
                {{ item.title }}
            </div>
     
        </div>
        <div class="main">
            <NotesDetail :article="currentNotes"></NotesDetail>
        </div>
        <div class="notes_body">
            <div class="notes_list">
                <div class="notes_list_item"
                    :class="currentNotes.article_id === item.article_id ? 'notes_list_item_active' : ''"
                    v-for="item in notesList" :key="item.article_id" @click="clickNotesItem(item)">
                    <p>{{ item.title }}</p>
                    <time>{{ item.time }} </time>
                </div>
            </div>
            <div class="notes_page">
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">

import { ref, onMounted, reactive } from 'vue';
import { NotesNavsGetAPI, NotesListGetAPI } from "../../request/api"
import NotesDetail from "../../components/NotesDetail/index.vue"

let navList = ref<NavNotes[]>([])
let notesList = ref<NotesList[]>([])
let currentNav = reactive<NavNotes>({ nav_id: '', title: '' })
let showDetail = ref(false)
let currentNotes = ref<NotesList>({
    nav_id: '',
    title: '',
    time: '',
    article_id: '',
})
//加载栏目
const getNavList = async () => {
    const result = await NotesNavsGetAPI().then(data => data)
    navList.value = result.data

    return result.data
}
//加载文章列表
const getNotesList = async (nav_id: string) => {
    const result = await NotesListGetAPI({ nav_id }).then(data => data)
    notesList.value = result.data
}

//点击栏目
const clickNav = async (item: NavNotes) => {
    if (currentNav === item) {
        return
    }
    currentNav = item;
    getNotesList(currentNav.nav_id)
}

//第一次进入逻辑
const initPage = async () => {
    const data = await getNavList();
    if (data.length > 0) {
        currentNav = data[0]
    }
    await getNotesList(currentNav.nav_id)
}
//点击随记详情
const clickNotesItem = async (item: NotesList) => {
    showDetail.value = true
    currentNotes.value = item
}

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
    margin: 0 120px;
    // height: 100%;
    align-items: stretch;
    background: rgba($color: #23272f, $alpha: 0.5);
    transition: 1s ease;
    height: 600px;

    &.notes-detail {
        // background: rgba($color: #23272f, $alpha: 0.9);
        background: #23272f;
        padding: 50px 20px;
        height: 100%;
        margin: 0 0;
        width: 100%;

        .main {
            width: 100%;
            overflow: hidden;
            opacity: 1;

        }
    }

    .notes_lab {
        width: 400px;
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
        transition:opacity 1s .5s ease,width 1.5s ease;
        opacity: 0;
        overflow-y: scroll;
    }




    .notes_body {
        flex: 1;
        padding: 40px;
        border-radius: 0 10px 10px 0;

        .notes_list {
            width: 100%;
            min-width: 400px;

            .notes_list_item {
                width: 100%;
                padding: 10px 0;
                margin-bottom: 40px;
                position: relative;
                cursor: pointer;
                border: 2px solid rgba(88, 175, 223, 0);
                border-bottom: none;
                border-radius: 5px;
                padding: 20px 10px;

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

                // &::after {
                //     content: "";
                //     position: absolute;
                //     bottom: 0;
                //     left: 0;
                //     height: 2px;
                //     width: 100%;
                //     background: #95adbe;
                //     z-index: 1;
                // }

                &::before {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: 2px;
                    width: 0;
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
    }

}
</style>