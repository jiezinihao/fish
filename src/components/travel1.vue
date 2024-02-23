<template>
    <div class="travel">
        <div class="container">
            <div class="travel_nav" @click="showTravelItem($event)">
                <div class="thumb">
                    <div class="thumb_img">
                        <img src="/src/assets/img/highView.png" alt="">
                    </div>
                    <p>黄山</p>
                </div>
                <div class="nav_con">
                    <swiper-container scrollbar="true" class="nav_con_swiper" ref="swiper" @swiper="onSwiper"
                        @slideChange="onSlideChange" :space-between="50" :slides-per-view="'auto'">
                        <swiper-slide>
                            <div class="nav_item">
                                <div class="frame">
                                    <img src="/src/assets/img/highView.png" alt="">
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div class="nav_item">
                                <div class="frame">
                                    <img src="/src/assets/img/wideView.png" alt="">
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div class="nav_item">
                                <div class="frame">
                                    <img src="/src/assets/img/wideView.png" alt="">
                                </div>
                            </div>
                        </swiper-slide> <swiper-slide>
                            <div class="nav_item">
                                <div class="frame">
                                    <img src="/src/assets/img/wideView.png" alt="">
                                </div>
                            </div>
                        </swiper-slide> <swiper-slide>
                            <div class="nav_item">
                                <div class="frame">
                                    <img src="/src/assets/img/wideView.png" alt="">
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div class="nav_item">
                                <div class="frame">
                                    <img src="/src/assets/img/wideView.png" alt="">
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div class="nav_item">
                                <div class="frame">
                                    <img src="/src/assets/img/wideView.png" alt="">
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper-container>
                </div>

                <!-- 
                <div class="travel_tips" @click="swiperToNext()">
                    <svg class="icon rotate" aria-hidden="true">
                        <use xlink:href="#icon-right"></use>
                    </svg>
                </div> -->
            </div>
            <div class="travel_nav">
                <div class="thumb">
                    <div class="thumb_img">
                        <img src="/src/assets/img/wideView.png" alt="">
                    </div>

                    <p>武功山</p>
                </div>
                <div class="nav_con">
                    <swiper-container scrollbar="true" class="nav_con_swiper" ref="swiper" @swiper="onSwiper"
                        @slideChange="onSlideChange" :space-between="50" :slides-per-view="'auto'">
                        <swiper-slide class="swiper-slide">
                            <div class="nav_item">
                                <div class="frame">
                                    <img src="/src/assets/img/highView.png" alt="">
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide class="swiper-slide">
                            <div class="nav_item">
                                <div class="frame">
                                    <img src="/src/assets/img/wideView.png" alt="">
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div class="nav_item">
                                <div class="frame">
                                    <img src="/src/assets/img/wideView.png" alt="">
                                </div>
                            </div>
                        </swiper-slide> <swiper-slide>
                            <div class="nav_item">
                                <div class="frame">
                                    <img src="/src/assets/img/wideView.png" alt="">
                                </div>
                            </div>
                        </swiper-slide> <swiper-slide>
                            <div class="nav_item">
                                <div class="frame">
                                    <img src="/src/assets/img/wideView.png" alt="">
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper-container>
                </div>
            </div>
            <div class="travel_nav">
                <div class="thumb">
                    <img src="" alt="">
                    <p>修猫:fish</p>
                </div>
                <div class="nav_con">
                    <div class="nav_item">
                        <img src="" alt="">
                    </div>
                </div>
            </div>
            <div class="travel_nav">
                <div class="thumb">
                    <img src="" alt="">
                    <p>VALORANT</p>
                </div>
                <div class="nav_con">
                    <div class="nav_item">
                        <img src="" alt="">
                    </div>
                </div>
            </div>
        </div>
        <TravelDetail :position="boxPostion" :img-msg="imgMsg" :id="id" :is-show="isShowBox"
            @closeTraveItem="closeTraveItem">

        </TravelDetail>
    </div>
</template>
<script setup lang="ts">
import TravelDetail from './traveldetail.vue'
import { onMounted, ref, reactive } from 'vue';

let nav = ref<any>(null);
let swiper = ref<any>(null)
let boxPostion = reactive({
    height: '0px',
    width: '0px',
    top: '0px',
    left: '0px',
})
let imgMsg = reactive([
    '/src/assets/img/highView.png',
    '/src/assets/img/wideView.png',
    '/src/assets/img/wideView.png',
    '/src/assets/img/wideView.png',
    '/src/assets/img/wideView.png',
])
let id = ref(0)
let isShowBox = ref(false)
// 获取swiper属性s
const onSwiper = (swiper: any) => {
    swiper = swiper
}
const onSlideChange = (swiper: any) => {
}
const swiperToNext = () => {
    swiper.value.swiper.slideNext()
}
//打开栏目详情
const showTravelItem = (e: MouseEvent) => {
    const target = searchTargetElement('travel_nav', e.target)
    
    boxPostion = {
        height: target.offsetHeight + 'px',
        width: target.offsetWidth + 'px',
        top: target.getBoundingClientRect().y + 'px',
        left: target.getBoundingClientRect().x + 'px',
    }
    
    isShowBox.value = true

}
const closeTraveItem = () => {
    isShowBox.value = false
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
onMounted(() => {


})

</script>
<style lang="scss" scoped>
.travel {
    width: 100%;
    height: 80%;

    .container {
        margin: 40px 120px;
        padding: 40px;
        background: rgba($color: #23272f, $alpha: 0.8);
        border-radius: 10px;
        padding-right: 120px;
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;

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

                .nav_con_swiper {
                    height: 100%;
                    width: 100%;

                    swiper-slide {
                        width: 300px;
                    }
                }

                .nav_item {
                    // height: 100%;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    height: calc(100% - 40px);
                    // border: 3px solid rgba(88, 175, 223, 0.3);
                    background: #23272f;
                    border-radius: 10px;
                    padding: 10px;
                    overflow: hidden;
                    margin: 20px 0;

                    .frame {
                        width: 100%;
                        height: 100%;
                        // background: url("../assets/img/background/travel_frame.png");
                        background-size: 100% 100%;
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        overflow: hidden;
                        border-radius: 10px;

                        img {
                            width: 100%;
                            // max-height: 90%;
                        }
                    }

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