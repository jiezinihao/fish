<template>
    <div class="index">
        <div>

        </div>
        <div class="thumb">
            <img src="../../assets/img/index_bg.jpg" alt="">
            <div class="introduce">
                <h5>欢迎来到鱼的博客</h5>
                <h2>我是一个前端开发者</h2>
                <h5>FISH是一个猫的名字 <span>？</span></h5>
            </div>
        </div>
        <div class="new">
            <h1>最新动态</h1>
            <div class="new_con">
                <h2>旅行</h2>
                <div v-for="item in travelList" :key="item.travel_id" @click="goTravel(item.travel_id)">
                    <span>{{ item.title }}</span>
                    <p>{{ item.body }}</p>
                    <time :datetime="item.time">{{ item.time }}</time>
                </div>

            </div>
            <div class="new_con">
                <h2>文章：</h2>
                <div v-for="item in notesList" :key="item.nav_id" @click="goNotes(item.article_id)">
                    <span></span>
                    <p>{{ item.title }}</p>
                    <time :datetime="item.time">{{ item.time }}</time>
                </div>
            </div>
        </div>
        <Fish></Fish>
        <div class="blog">

        </div>
        <Foot></Foot>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
// import ArtText from "../../components/ArtText/index.vue"
import Fish from "../../components/Fish/index.vue"
import Foot from "../../components/Foot/index.vue"
import { TravelListGetAPI, NotesListGetAPI } from "../../request/api"

const router = useRouter();
const travelList = ref<TravelGetAPIResDataItem[]>([])
const notesList = ref<NotesList[]>([])


const getTravelList = async () => {
    const result = await TravelListGetAPI({ page: 1, pageSize: 4, sort: 'proportion' }).then(data => data);
    console.log(result);
    travelList.value = [...result.data];
}
const getNotesList = async () => {
    const result = await NotesListGetAPI({ page: 1, pageSize: 4, sort: 'proportion' }).then(data => data);
    console.log(result);
    notesList.value = [...result.data];
}
const goTravel = (id: string) => {
    router.push({ path: '/travel', query: { id } })
}
const goNotes = (id: string) => {
    router.push({ path: '/notes/detail/' + id })
}
onMounted(() => {
    getTravelList()
    getNotesList()
})
</script>


<style scoped lang="scss">
@keyframes thumbAni {
    0% {
        height: 100%;
        transform: scale(1.1);
    }

    70% {
        transform: scale(1);
    }

    100% {
        transform: scale(1);
        height: calc(100% - 2rem);
    }
}

@keyframes thumbAniMobile {
    0% {
        transform: scale(1.05);

    }

    70% {
        transform: scale(1.09);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.index {
    font-family: var(--font-family);
    height: 100%;
    // overflow-x: hidden;
    // overflow-y: scroll;
    margin-top: var(--nav-height-negative);
    height: calc(100% + var(--nav-height));
    background: radial-gradient(circle at 25% 65%, rgb(var(--color-rgb) / .2), #0000 25%) no-repeat local,
        radial-gradient(circle at 75% 35%, rgb(var(--color-sub-rgb) / .2), #0000 25%) no-repeat local var(--h-bg);

    .thumb {
        width: 100%;
        height: calc(100% - 2rem);
        overflow: hidden;
        position: relative;
        animation: thumbAni 2s var(--animation-in);
        box-shadow: var(--box-shadow-white);

        img {
            width: 100%;
            height: 100vh;
            position: absolute;
            bottom: 0;
            left: 0;
        }

        .introduce {
            position: absolute;
            left: 7rem;
            top: 6rem;
            color: hsl(var(--theme-color));
            font-weight: var(--font-weight-title);
            text-shadow: var(--text-shadow);

            h5 {
                font-size: var(--font-size-medium);
            }

            h2 {
                font-size: var(--font-size-title);
            }
        }

    }

    .new {
        display: flex;
        justify-content: center;
        margin-top: -6rem;
        height: 6rem;
        background: radial-gradient(at 50% 0, var(--s-bg, rgb(255 255 255 / .9)), #0000 calc(100% - var(--new-size))) no-repeat;
        border-radius: 50% 50% 0 0;
        position: relative;
        z-index: 100;
        animation: var(--animation);
        animation-delay: 1.5s;
        // box-shadow: 0 -2em 3em -4em rgb(0 0 0 / 5%);
        -webkit-backdrop-filter: saturate(1.2) blur(20px);
        backdrop-filter: saturate(1.2) blur(20px);
        border-bottom: var(--border);
        padding: 1rem 0;
        color: var(--font-color);
        transition: margin-top .4s var(--animation-in), height .4s var(--animation-in);

        &:hover {
            margin-top: -8rem;
            height: 8rem;
        }

        &::after {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            height: 2rem;
            width: 2px;
            background: var(--font-color);
        }

        h1 {
            font-size: var(--font-size-medium);
            position: absolute;
            top: 0.4rem;
            left: 50%;
            transform: translateX(-50%);
            font-weight: var(--font-weight-title);
        }

        .new_con {
            width: 16rem;
            border-radius: 10px;
            overflow: hidden;
            padding: 0.5rem 1rem;

            h2 {
                font-size: var(--font-size-medium);
                margin-bottom: 0.2rem
            }

            div {
                cursor: pointer;
                display: flex;
                color: hsl(var(--font-color) / var(--font-alpha));
                font-size: var(--font-size-small);
                margin-bottom: 0.2rem;

                span {
                    margin-right: 0.4rem;
                    color: hsl(var(--theme-color)/var(--font-alpha));
                }

                p {
                    flex: 1;
                }
            }


        }

        .comment {
            border-right: var(--border);
        }
    }


}


@media (max-width: 1000px) {
    .index {
        .thumb {
            height: auto;
            animation: thumbAniMobile 2s var(--animation-in);

            img {
                position: static;
                height: auto;
            }


            .introduce {
                left: 1.5rem;
                top: calc(var(--nav-height) + 1rem);

                h5 {
                    font-size: 0.6rem;
                }

                h2 {
                    font-size: 0.8rem;
                }
            }
        }

        .new {
            height: auto;
            margin-top: 0;
            flex-wrap: wrap;
            border-radius: 0;
            animation-delay: 0s;
            animation: fade-in 0.5s 1s var(--animation-in) backwards;

            &:hover {
                height: auto;
                margin-top: 0;
            }

            .new_con {
                width: 10rem;
            }
        }
    }
}

@media screen and (max-width: 641px) {
    .index {


        .new {
            .new_con {
                width: 100%;
            }
        }


    }
}
</style>
