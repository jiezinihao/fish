<template>
    <div class="travel">
        <div class="container" ref="container" @scroll="handleScroll()">
            <div class="travel_nav" @click="showTravelItem($event, item)" v-for="(item) in travelList"
                :key="item.travel_id">
                <div class="thumb">
                    <div class="thumb_img">
                        <img :src="item.thumb.url" alt="">
                    </div>
                    <p>{{ item.title }}</p>
                </div>
                <div class="nav_con" :class="!fristLoading ? 'nav_con_show' : ''">
                    <SwiperNav :is-show="isInScreen(item.scorllTop)" :travelId="item.travel_id" :slideList="item.imgList">
                    </SwiperNav>
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
import SwiperNav from "./swiper.vue"
import Foot from "../../components/Foot/index.vue"

interface TravelList extends TravelGetAPIResDataItem {
    scorllTop: number,
}

let container = ref<any>(null);
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
const isInScreen = (scorllTop: number) => {
    // console.dir(container.value.clientHeight);
    
    if (scorllTop - containerScroll.value - container.value.clientHeight > 0) {
        return false
    } else {
        return true
    }
    // if(document.body.clientHeight - scorllTop -  containerScroll.value)
}
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
    .container {
        margin: 0 120px;
        padding: 40px;
        // background: rgba($color: #23272f, $alpha: 0.8);
        border-radius: 10px;
        padding-right: 120px;
        // height: 100%;
        .travel_nav {
            width: 100%;
            height: 400px;
            margin: 40px 80px;
            border-radius: 10px;
            border: 3px solid rgba(88, 175, 223, .6);
            padding: 0;
            display: flex;
            align-items: center;
            align-items: stretch;
            cursor: pointer;
            position: relative;

            .thumb {
                height: 100%;
                border-radius: 10px 0 0 10px;
                width: 240px;
                display: flex;
                flex-direction: column;
                padding: 20px 30px;
                background: rgba(88, 175, 223, 0.1);
                box-shadow: 0 4px 5px rgba(88, 175, 223, 0.4);
                flex-shrink: 0;

                .thumb_img {
                    width: 100%;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 288px;
                    overflow: hidden;

                    img {
                        width: 100%;
                    }
                }

                p {
                    margin: 20px;
                    font-size: 20px;
                    font-weight: bold;
                    text-align: center;
                    color: #eee;
                }
            }

            .nav_con {
                height: 100%;
                width: calc(100% - 20px);
                overflow: hidden;
                margin: 0 20px;
                opacity: 0;
                transition: .4s ease;

                &.nav_con_show {
                    opacity: 1
                }

            }

            .travel_tips {
                position: absolute;
                right: 0;
                top: 0;
                width: 100px;
                height: 100%;
                z-index: 2;
                background: linear-gradient(to right, rgba(0, 0, 0, 0.1) 0%, rgba(255, 255, 255, 0.5) 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 10px;

                svg {
                    width: 40px;

                }
            }
        }
    }

    .swiper-scrollbar-drag {
        background: rgba(88, 175, 223, 0.8);
    }
}
</style>