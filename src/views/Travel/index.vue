<template>
    <div class="travel">
        <h2 class="title">
            记录身边的人物、风景、故事、还有我和我的猫
        </h2>
        <div class="container" ref="container" >
            <div class="travel_nav" v-for="(item) in travelList" :key="item.travel_id">
                <div class="thumb">
                    <img :src="item.thumb.url" alt="">
                </div>
                <div class="travel_con" @click="showTravelItem($event, item)">
                    <h2> {{ item.title }}</h2>
                    <div class="travel_opr">
                        <div class="lab">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-rili"></use>
                            </svg>
                            <span>
                                {{ item.time }}
                            </span>
                        </div>
                        <div class="lab">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-chakan"></use>
                            </svg>
                            <span>
                                {{ item.watchNum }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <TravelDetail v-if="isShowBox" :beforePosition="boxPostion" :travelId="travelId"
            @closeTraveItem="closeTraveItem">
        </TravelDetail>
        <Foot></Foot>

    </div>
</template>

<script setup lang="ts">
import TravelDetail from '../../components/TravelDetail/index.vue'
import { onMounted, ref, reactive, shallowRef,inject, watch ,nextTick} from 'vue';
import { TravelListGetAPI } from "../../request/api"
import { useRouter, useRoute } from 'vue-router';
// import SwiperNav from "./swiper.vue"
import Foot from "../../components/Foot/index.vue"

interface TravelList extends TravelGetAPIResDataItem {
}
const router = useRouter()
const route = useRoute()

let container = ref<any>(null);
//打开详情定位
let boxPostion = reactive({
    height: 0,
    width: 0,
    top: 0,
    left: 0,
})

// const navSwiper = new Swiper('.travel-nav', {
//     init: false,
//     scrollbar: "true",
//     spaceBetween:"50",
//     slidesPerView:"auto"
// })

//点击旅游名称
const travelId = ref(-1);
const travelList = ref<TravelList[]>([]);
let isShowBox = ref(false);

const throttle = ref(true)
const containerScroll = ref(0);
const process = inject('process', ref(0));

const pageMsg = ref({
    total:0,
    page:1,
    pageSize:4
})

watch(()=>process.value,()=>{
    if(process.value>90 && throttle.value){
        pageMsg.value.page++
        getTravelList()
    }
})


// const travelImgList = computed(()=>{
//     return 
// })
// 获取swiper属性
// const swiperToNext = () => {
//     swiper.value.swiper.slideNext()
// }
//打开栏目详情
const showTravelItem = (e: MouseEvent, item: TravelGetAPIResDataItem) => {
    const target = searchTargetElement('travel_nav', e.target);
    travelId.value = Number(item.travel_id)
    router.replace(`?id=${travelId.value}`)
    boxPostion = {
        height: target.offsetHeight,
        width: target.offsetWidth,
        top: target.getBoundingClientRect().y,
        left: target.getBoundingClientRect().x,
    }
    isShowBox.value = true
}

const closeTraveItem = () => {
    isShowBox.value = false
    router.replace(``)

}
//深度搜索目标父元素
const searchTargetElement = (str: string, element: any): any => {

    if (element === null || element.parentElement === null || element.parentElement === "" || element === undefined) {
        return null
    }

    if (element.classList.contains(str)) {
        return element
    } else {
        return searchTargetElement(str, element.parentElement)
    }

}
const getTravelList = async () => {
    if(throttle.value === false || pageMsg.value.total < (pageMsg.value.page - 1 )*pageMsg.value.pageSize){
        return
    }
    throttle.value = false;
    setTimeout(()=>{
        throttle.value = true
    },1000)
    const result = await TravelListGetAPI({page:pageMsg.value.page,pageSize:pageMsg.value.pageSize}).then(data => data);
    travelList.value = [...travelList.value,...result.data ];
    pageMsg.value.total = result.maxCount;
}

onMounted(() => {
    if (route.query.id && route.query?.id !== '') {
        travelId.value = Number(route.query.id)
        isShowBox.value = true
    }
    getTravelList()

})

</script>

<style lang="scss" scoped>
.travel {
    width: 100%;
    height: 100%;

    .title {
        font-size: var(--font-size-title);
        font-weight: 700;
        margin: 1rem;
    }

    .container {
        margin: 0 1rem;
        // background: rgba($color: #23272f, $alpha: 0.8);
        border-radius: 10px;
        display: grid;
        gap: 30px;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        margin-bottom: 4rem;

        // min-height: 100vh;
        .travel_nav {
            border-radius: 10px;
            padding: 0;
            overflow: hidden;
            transition: .2s;
            border: 1px solid hsl(var(--theme-color)/0);
            height: 410px;

            &:hover {
                border: 1px solid hsl(var(--theme-color)/0.5);

                .thumb {
                    transform: scale(1);
                }

                .travel_con {
                    margin-top: 0px;
                    border-radius: 0;

                    h2 {
                        color: hsl(var(--theme-color)/0.8);
                        padding: 10px;
                    }
                }

                box-shadow: var(--box-shadow);
            }

            .thumb {
                height: 100%;
                width: 100%;
                height: 300px;
                overflow: hidden;
                transform: scale(1.1);
                transition: .2s;

                img {
                    width: 100%;
                }
            }

            .travel_con {
                width: 100%;
                overflow: hidden;
                transition: 0.2s;
                background: var(--s-bg, hsl(0 0% 100% / .9));
                -webkit-backdrop-filter: blur(10px) saturate(1.5);
                backdrop-filter: blur(10px) saturate(1.5);
                border-radius: 15px 15px 0 0;
                margin-top: -15px;
                cursor: pointer;
                height: 110px;

                h2 {
                    transition: 0.2s;
                    padding: 15px 10px;
                    font-weight: var(--font-weight-title);
                    font-size: var(--font-size-normal);
                }

                .travel_opr {
                    padding: 0 10px;
                    display: flex;
                    justify-content: space-between;
                    height: 40px;

                    .lab {
                        display: flex;
                        align-items: center;

                        svg {
                            width: 20px;
                            height: 20px;
                            margin-right: 10px;
                            fill: #000;
                        }

                        span {
                            font-size: var(--font-size-small);
                        }
                    }

                }
            }
        }
    }

    .swiper-scrollbar-drag {
        background: rgba(88, 175, 223, 0.8);
    }
}

@media screen and (max-width: 900px) {
    .travel {
        .title {
            font-size: var(--font-size-small);
            margin: 0.4rem;
        }

        .container {
            margin: 0 1%;
            margin-bottom: 4rem;
            gap: 1%;
            grid-template-columns: repeat(auto-fill, minmax(46%, 1fr));
        }
    }
}
</style>