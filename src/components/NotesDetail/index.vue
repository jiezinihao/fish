<template>
    <div class="container">
        <div class="title">{{ article.title }}</div>
        <div class="time">
            <time :datetime="article.time"></time>
            {{ article.time }}
        </div>
        <!-- <div class="detail" v-html="body" v-if="body">
        </div> -->
        <div data-v-f020b267="" class="detail markdown-body" v-html="body">
        </div>
    </div>
</template>
<script setup lang="ts">
import './tailwind-dark.scss';
import './heightlight.css';

import {  watch, ref } from 'vue'
import { NotesDetailGetAPI } from "../../request/api"
import md from "../../func/md.ts"
const props = defineProps(['article']);
const body = ref("")
watch(props, (val) => {
    if (props.article.article_id !== '') {
        getDetail(props.article.article_id)
    }
})

const getDetail = async (article_id: string) => {
    const result = await NotesDetailGetAPI({ article_id }).then(data => data)
    body.value = md.render(result.data.file, 'typesrcipt')
}

</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    padding: 20px;
    color: #eee;
    margin-top: 20px;
    border-radius: 10px;
    height: 100%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        background: none
    }

    &::-webkit-scrollbar-thumb {
        background: #999;
        border-radius: 5px;
    }

    .title {
        font-size: 28px;
        text-align: center;

    }

    .time {
        color: #999;
        font-size: 16px;
        margin: 20px 0;
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #666;

    }
}
</style>