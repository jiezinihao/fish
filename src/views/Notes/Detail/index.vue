<template>
    <div class="container">
        <div class="title">{{ detail.title }}</div>
        <div class="sub">

            <p>
                <svg class="icon rotate jump" aria-hidden="true">
                    <use xlink:href="#icon-time"></use>
                </svg>
                <span>{{ detail.time }}</span>
            </p>
            <p>
                <svg class="icon guankan jump" aria-hidden="true">
                    <use xlink:href="#icon-guankan"></use>
                </svg>
                <span>{{ detail?.watchNum }}</span>
            </p>
            <p>
                <svg class="icon swing" aria-hidden="true" @click="orderingCoffee()">
                    <use xlink:href="#icon-icon_coffee"></use>
                </svg>
                <span>给博主点杯咖啡吧！</span>
            </p>
        </div>

        <div ref="markdownDetail" class="detail markdown-body" :class="theme" v-html="body">
        </div>
        <div class="comment">
            <Comment :commentId="article_id" :mark="mark"></Comment>

        </div>

        <Foot></Foot>

    </div>
</template>

<script setup lang="ts">
import './tailwind-dark.scss';
import "./tailwind.scss";
import './heightlight.css';
import 'element-plus/es/components/message/style/css'
import Foot from "@/components/Foot/index.vue"
import Comment from '@/components/Comment/index.vue'

import { ElMessage } from 'element-plus'
import { watch, ref, onMounted, inject } from 'vue'
import { NotesDetailGetAPI } from "@/request/api.ts"
import { useRoute } from 'vue-router';
import md from "@/func/md.ts"
const route = useRoute()
const body = ref('')
const article_id = route.params.id
const mark = 'a'

//reject对象是非响应式
const themeOrigin = inject('theme', ref(''));
const theme = ref(themeOrigin.value);

watch(themeOrigin, (newValue, oldValue) => {
    theme.value = newValue
})


const detail = ref<NotesDetail>({
    nav_id: '',
    title: '',
    time: 0,
    article_id: '',
    file: '',
    watchNum: '',
})
const markdownDetail = ref<any>(null);


const getDetail = async (article_id: string | string[]) => {
    let id = article_id
    //转化string[] 为 string
    if (typeof (id) === 'object') {
        id = id[0]
    }
    console.log(id);

    const result = await NotesDetailGetAPI({ article_id: id }).then(data => data)
    detail.value = result.data;
    body.value = md.render(result.data.file, 'typesrcipt')
}

const orderingCoffee = () => {
    ElMessage.success('谢谢宝宝的咖啡')
}

onMounted(() => {
    getDetail(article_id)
})

</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    // padding: 0.4rem;
    color: hsl(var(--font-color));
    // margin-top: 0.3rem;
    height: 100%;

    &::-webkit-scrollbar {
        background: none
    }

    &::-webkit-scrollbar-thumb {
        background: #999;
        border-radius: 5px;
    }

    .title {
        font-size: var(--font-size-title);
        text-align: center;
    }

    .sub {
        display: flex;
        // height: 40px;
        align-items: center;
        justify-content: center;
        padding: 0.4rem 0;
        border-bottom: var(--border);

        p {
            margin-right: 1rem;
            display: flex;
            align-items: center;

            svg {
                width: 25px;
                height: 25px;
                margin-right: 10px;
                cursor: pointer;
                transition: 0.5s ease;
                transform: rotate(0);

                &.jump:hover {
                    transform-origin: top left;
                    transform: rotate(20deg) translate(5px, -15px) scale(1.2);
                }

                &.swing:hover {
                    transform: rotate(45deg);
                }
            }

            span {
                line-height: 1.5;
                font-size: 16px;
                color: #999;
            }
        }
    }

    .comment {
        padding: 1rem;
        padding-top: 0;
    }

    .detail {
        min-height: 60%;
        font-size: var(--font-size-medium);
        padding: 1rem 2rem;
    }
}

@media screen and (max-width: 900px) {
    .container {
        .comment {
            padding: 0.3rem;
            padding-top: 0;
        }

        .detail {
            padding: 0.5rem;
        }
    }

}
</style>