<template>
    <div class="container">
        <h4>{{ article.title }}</h4>
        <div class="time">
            <time :datetime="article.time"></time>
            {{ article.time }}
        </div>
        <div class="detail">
            123
        </div>
    </div>
</template>
<script setup lang="ts">
import { toRefs, watch } from 'vue'
import {NotesDetailGetAPI} from "../../request/api"
const props = defineProps(['article'])
watch(props, (val) => {
    if (val) {
        console.log(val);
        getDetail(props.article.article_id)
    }
})

const getDetail = async(article_id:string)=>{
   const result = NotesDetailGetAPI({article_id}).then(data=>data)
   console.log(result);
   
}

</script>

<style lang="scss" scoped>

.container {
    width: 100%;
    padding: 20px;
    color: #eee;
    border: 3px solid #666;
    margin-top: 20px;
    border-radius: 10px;
    min-height: 70vh;
    h4{
        font-size:28px;

    }
    .time{
        color:#999;
        font-size:16px;
        margin:20px 0;
    }
}
</style>