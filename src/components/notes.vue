<template>
    <div class="notes">
        <div class="notes_lab">
            <div class="notes_lab_item " :class="index === currentNav ? 'notes_lab_item_active' : ''"
                v-for="(item, index) in navList" :key="item.nav_id" @click="clickNav(item,index)">
                {{ item.title }}
            </div>
            <!-- <div class="notes_lab_item">
                HTML&CSS
            </div>
            <div class="notes_lab_item">
                Typescript
            </div>
            <div class="notes_lab_item">
                vue相关
            </div>
            <div class="notes_lab_item">
                THREE相关
            </div>
            <div class="notes_lab_item">
                编程思想
            </div> -->
        </div>
        <div class="notes_body">
            <div class="notes_list">
                <div class="notes_list_item">
                    <p>js面向对象的创建以及控制</p>
                    <time> 2023-12-26 </time>
                </div>
                <div class="notes_list_item">
                    <p>js面向对象的创建以及控制</p>
                    <time> 2023-12-26 </time>
                </div>
                <div class="notes_list_item">
                    <p>js面向对象的创建以及控制</p>
                    <time> 2023-12-26 </time>
                </div>
                <div class="notes_list_item">
                    <p>js面向对象的创建以及控制</p>
                    <time> 2023-12-26 </time>
                </div>
            </div>
            <div class="notes_page">

            </div>
        </div>

    </div>
</template>
<script setup lang="ts">

import { ref, onMounted } from 'vue';
import { NotesNavsGetAPI } from "../request/api"
let navList = ref<NavNotes[]>()
let currentNav = ref(0)
//加载栏目
const getNavList = async () => {
    const result = await NotesNavsGetAPI().then(data => data)
    console.log(result);
    navList.value = result.data
}

const clickNav = async(item:NavNotes,index:number)=>{
    currentNav.value = index;
    
}
onMounted(() => {
    getNavList()
})
</script>
<style lang="scss">
.notes {
    display: flex;
    width: 100%;
    // border: 5px solid #3c2a4d;
    border-radius: 10px;
    padding: 50px 0;
    // height: 100%;
    align-items: stretch;

    .notes_lab {
        width: 400px;
        flex-shrink: 0;
        padding: 20px;
        margin-left: 120px;
        background: rgba($color: #23272f, $alpha: 0.5);
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

    .notes_body {
        flex: 1;
        padding: 40px;
        background: rgba($color: #23272f, $alpha: 0.5);
        margin-right: 120px;
        border-radius: 0 10px 10px 0;

        .notes_list {
            width: 100%;

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