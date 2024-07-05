<template>
    <div class="travel">
        <h2 class="title">
            记录身边的人物、风景、故事、还有我和我的猫
        </h2>
        <div class="container" ref="container" @scroll="handleScroll()">
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
        <TravelDetail :position="boxPostion" :currentTravel="currentTravel" :is-show="isShowBox"
            @closeTraveItem="closeTraveItem">
        </TravelDetail>
        <Foot></Foot>

    </div>
</template>

<script setup lang="ts">
import TravelDetail from '../../components/TravelDetail/index.vue'
import { onMounted, ref, reactive, shallowRef, nextTick } from 'vue';
import { TravelListGetAPI } from "../../request/api"
// import SwiperNav from "./swiper.vue"
import Foot from "../../components/Foot/index.vue"

interface TravelList extends TravelGetAPIResDataItem {
    scorllTop: number,
}

let container = ref<any>(null);
//打开详情定位
let boxPostion = reactive({
    height: '0px',
    width: '0px',
    top: '0px',
    left: '0px',
})

const fristLoading = ref(true)

// const navSwiper = new Swiper('.travel-nav', {
//     init: false,
//     scrollbar: "true",
//     spaceBetween:"50",
//     slidesPerView:"auto"
// })

//点击旅游名称
let TravelId = ref(-1);
const travelList = shallowRef<TravelList[]>();
let isShowBox = ref(false);
const currentTravel = shallowRef<TravelGetAPIResDataItem>()

let throttle = ref(true)
const containerScroll = ref(0)

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
    TravelId.value = Number(item.travel_id)
    currentTravel.value = item

    boxPostion = {
        height: target.offsetHeight + 'px',
        width: target.offsetWidth + 'px',
        top: target.getBoundingClientRect().y + 'px',
        left: target.getBoundingClientRect().x + 'px',
    }
    isShowBox.value = true
}
// const isInScreen = (scorllTop: number) => {
//     // console.dir(container.value.clientHeight);

//     if (scorllTop - containerScroll.value - container.value.clientHeight > 0) {
//         return false
//     } else {
//         return true
//     }
//     // if(document.body.clientHeight - scorllTop -  containerScroll.value)
// }
const closeTraveItem = () => {
    isShowBox.value = false
}
const handleScroll = () => {
    // console.dir(e.srcElement.scrollTop);
    if (throttle.value) {

        containerScroll.value = container.value.scrollTop || 0
        throttle.value = false;
        setTimeout(() => {
            throttle.value = true;
        }, 500)
    }

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
    const result = await TravelListGetAPI().then(data => data);
    travelList.value = result.data.map((item, index) => {
        let scorllTop = index * 400
        return {
            ...item,
            scorllTop
        }
    })
    console.log(travelList.value)

    nextTick(() => {

    })
}

onMounted(() => {
    getTravelList()

    setTimeout(() => {
        fristLoading.value = false
    }, 500)
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
        .title{
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