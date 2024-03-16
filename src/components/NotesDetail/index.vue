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

        <!-- <div class="detail" v-html="body" v-if="body">
        </div> -->
        <div class="detail markdown-body" v-if="body" v-html="body">
        </div>
    </div>
</template>

<script setup lang="ts">
import './tailwind-dark.scss';
import './heightlight.css';
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import { watch, ref } from 'vue'
import { NotesDetailGetAPI } from "../../request/api"
import md from "../../func/md.ts"
const props = defineProps(['articleId']);
const detail = ref<NotesDetail>({
    nav_id: '',
    title: '',
    time: 0,
    article_id: '',
    file: '',
    watchNum: '',
})

const body = ref('')



const getDetail = async (article_id: string) => {
    const result = await NotesDetailGetAPI({ article_id }).then(data => data)
    detail.value = result.data;
    body.value = md.render(result.data.file, 'typesrcipt')
}
watch(props, () => {

    if (props.articleId !== '') {
        getDetail(props.articleId)
    }
}, { immediate: true })

const orderingCoffee = () => {
    ElMessage.success('谢谢宝宝的咖啡')
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

    .sub {
        display: flex;
        // height: 40px;
        align-items: center;
        justify-content: center;
        padding: 20px 0;
        border-bottom: 2px solid #666;
        p {
            margin-right: 40px;
            line-height: 10px;
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


}
</style>