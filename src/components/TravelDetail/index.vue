<template>
    <div>
        <div class="travel_body travel_active" ref="body" :class="isSpa ? '' : 'travel_spa'" :style="animationState">
            <div class="travel_swiper">
                <Swiper v-if="swiperList.length > 0" :slideList="swiperList" :swiperWidth="swiperWidth"></Swiper>
            </div>
            <div class="travel_list_body">
                <div>
                    <h4>{{ travelDetail?.title }}</h4>
                    <div class="travel_list_desc">
                        {{ travelDetail?.body }}
                    </div>
                    <div class="travel_list_opr">
                        <p>
                            <svg class="icon rotate jump" aria-hidden="true">
                                <use xlink:href="#icon-time"></use>
                            </svg>
                            <span>{{ travelDetail?.time }}</span>
                        </p>
                        <p>
                            <svg class="icon guankan jump" aria-hidden="true">
                                <use xlink:href="#icon-guankan"></use>
                            </svg>
                            <span v-if="travelDetail?.watchNum > 0">{{ travelDetail?.watchNum }}人看过</span>
                            <span v-else>第一名!</span>
                        </p>
                        <p>
                            <svg class="icon swing" aria-hidden="true" @click="orderingCoffee()">
                                <use xlink:href="#icon-icon_coffee"></use>
                            </svg>
                            <span>给博主点杯咖啡吧！</span>
                        </p>
                    </div>
                </div>
                <Comment :commentId="travelDetail?.travel_id" :mark="'t'"></Comment>

            </div>
            <i @click.self="closeTraveItemFunc()" class="exit" v-show="!isSpa">×</i>
        </div>
        <div class="travel_mask" v-show="!isSpa" :class="maskAnimation ? 'travel_mask_active' : ''"
            @click.self="closeTraveItemFunc()">
        </div>
    </div>
</template>


<script setup lang="ts">

import { toRefs, ref, onMounted, onBeforeMount } from 'vue'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import Comment from '@/components/Comment/index.vue'
import { GetTravelDetail } from "@/request/api"


const props = defineProps(['beforePosition', 'travelId'])
const { beforePosition, travelId } = toRefs(props)
const emits = defineEmits(['closeTraveItem'])

//是否为详情单页面
const isSpa = ref(false)
//组件高度
const Height = document.body.clientHeight * 0.9;
//swiper的宽度
const swiperWidth = ref(0);

//节流,防止频繁点击
const throttleLock = ref(false)
//mask动画问题
const maskAnimation = ref(false);

const travelDetail = ref<any>()
const swiperList = ref<any>([])
//如果图片没加载出来给予默认宽度
const fnLength = ref(0)

const animationState = ref({
    height: '0px',
    width: '0px',
    transform: '',
    opacity: '0',
    transition: 'transform 0s'
})
//初始box位置
const initTransform = ref('')
const boxPosition = ref<any>()


const getTravelDetail = async () => {
    const result = await GetTravelDetail({ id: travelId?.value }).then(data => data)
    travelDetail.value = result.data
    swiperList.value = [
        travelDetail?.value.thumb,
        ...travelDetail?.value.imgList
    ]
    return
}

//判断图片宽高
const judgeImg = async (url: string, fn: Function) => {
    //Swiper的宽度
    let width = 0;
    let imgObj = new Image();
    imgObj.src = url;
    // imgObj.onload = function () {
    //     width = (imgObj.width* Height) /imgObj.height
    //     i++
    // }
    //这个之后要做延迟处理

    if (imgObj.width === 0) {
        fnLength.value++
        if (fnLength.value > 10) {
            fn(500)
            fnLength.value = 0
            return
        }
        setTimeout(async () => {
            judgeImg(url, fn)
        }, 50)

    } else {
        width = (imgObj.width * Height) / imgObj.height
        fn(width)
    }
}
//计算swiper宽度
const calSwiperWidth = async (fn: Function) => {
    //获得图片的宽度
    await judgeImg(travelDetail?.value.thumb.url, (width: number) => {
        let imgWidth = width;
        if (imgWidth > document.body.clientWidth / 2) {
            imgWidth = document.body.clientWidth / 2
        }
        if (document.body.clientWidth < 900) {
            imgWidth = (document.body.clientWidth / 5) * 4
        }
        fn(imgWidth)
    })

}
//计算组件宽高
const calBox = async () => {
    let style = {
        height:  Math.ceil(document.body.clientHeight * 0.9),
        width: 0,
        translateX: 0,
        translateY: 80,
        scaleX: 1,
        scaleY: 1
    }

    if (document.body.clientWidth - swiperWidth.value - 700 < 0) {
        style.width = Math.ceil(document.body.clientWidth);
        style.translateX = 0
    } else {
        style.width = swiperWidth.value + 700;
        style.translateX = Math.ceil((document.body.clientWidth - swiperWidth.value - 700) / 2)
    }
    //计算一次持久存储
    boxPosition.value = style
}

//初始化动画
const initAnimation = async () => {
    //初始化box的位置，使用scale缩放处理
    initTransform.value = `translateX(${beforePosition?.value.left}px) translateY(${beforePosition?.value.top}px)  scaleX(${beforePosition?.value.width / boxPosition.value.width})  scaleY(${beforePosition?.value.width / boxPosition.value.width}) scaleZ(1)`
    animationState.value = {
        transform: initTransform.value,
        width: boxPosition.value.width + 'px',
        height: boxPosition.value.height + 'px',
        opacity: '0.1',
        transition: 'transform 0s'
    }
    //链式调用
    setTimeout(() => {
        animationFunc('enter')
    }, 10)
}
//params:动画进入和消失的流程
const animationFunc = async (sign: string) => {
    maskAnimation.value = true;
    if (throttleLock.value) {
        return
    } else {
        throttleLock.value = true
    }
    if (sign === 'enter') {
        let transform = `translateX(${boxPosition.value?.translateX}px) translateY(${boxPosition.value?.translateY}px) scaleX(1) scaleY(1) scaleZ(1)`
        animationState.value = {
            transform: transform,
            width: boxPosition.value?.width + 'px',
            height: boxPosition.value?.height + 'px',
            opacity: '1',
            transition: 'transform 0.6s',

        }

        throttleLock.value = false

    } else if (sign === 'out') {
        maskAnimation.value = false
        animationState.value = {
            transform: initTransform.value,
            width: boxPosition.value.width + 'px',
            height: boxPosition.value.height + 'px',
            opacity: '0.1',
            transition: 'transform 0.6s'
        }
        setTimeout(() => {
            throttleLock.value = false
            emits('closeTraveItem')
        }, 400)
    }

}

const orderingCoffee = () => {
    ElMessage.success('谢谢宝宝的咖啡')
}

const closeTraveItemFunc = () => {
    animationFunc('out')
}

onBeforeMount(async () => {
    await getTravelDetail();
    await calSwiperWidth(async (width: number) => {
        swiperWidth.value = width;
        await calBox().then(data => data);

        if (beforePosition?.value !== false) {
            initAnimation()
        } else {
            isSpa.value = true;
            let transform = `translateX(${boxPosition.value?.translateX}px) translateY(${boxPosition.value?.translateY}px) scaleX(1) scaleY(1) scaleZ(1)`

            animationState.value = {
                height: boxPosition.value.height + 'px',
                width: boxPosition.value.width + 'px',
                transform: transform,
                opacity: '1',
                transition: 'transform 0s'
            }
        }
    });



})
onMounted(async () => {

    // animationFunc('enter')
})



</script>

<style lang="scss" scoped>
.travel_body {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    // position: relative;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
    overflow: scroll;
    display: flex;
    align-items: stretch;
    border-radius: 10px;
    background: var(--h-bg);
    border: var(--border);
    transform-origin: left top;

    &.travel_spa {
        // max-width: 1980px;
        // position: static;
        // width: 100%;
        // height: 100%;

    }

    .exit {
        position: absolute;
        right: 0.5rem;
        top: 0.1rem;
        font-size: var(--font-size-title);
        cursor: pointer;
        font-style: normal;
    }



    .travel_swiper {
        position: relative;
        left: 0;
        top: 0;
        // width: 600px;
        height: 100%;
        flex-shrink: 0;
        border-radius: 5px;
        overflow: hidden;
        height: 100%;

        // height: 100%;

    }

    .travel_list_body {
        // opacity: 0;
        transition: 0.4s ease;
        padding-right: 50px;
        height: 100%;
        flex-shrink: 0;
        padding: 50px;
        width: 700px;
        background: rgba($color: #23272f, $alpha: 0);

        h4 {
            font-size: var(--font-size-title);
            font-weight: var(--font-weight-title);
        }

        .travel_list_desc {
            font-size: var(--font-size-normal);
            margin: 30px 0;
        }

        .travel_list_opr {
            display: flex;
            // height: 40px;
            align-items: center;
            flex-wrap: wrap;
            flex: 1;

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
                }
            }
        }


        // &:hover {
        //     box-shadow: 0 0 20px 5px #95adbe;

        // }

        img {
            width: 100%;
            height: 100%;
            display: block;
        }
    }


}

.travel_mask {
    position: fixed;
    z-index: 999;
    width: 0;
    height: 0;
    left: 0;
    top: 0;
    opacity: 0;
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    transition: opacity .3s ease, width 0s 0.5s, height 0s 0.5s;
    background: var(--fancybox-bg);

    &.travel_mask_active {
        transition: opacity .3s ease, width 0s, height 0s;
        opacity: 0.8;
        width: 100%;
        height: 100%;
    }


}

@media (max-width:1200px) {
    .travel_body {
        .travel_list_body {
            width: calc(50vw - 40px);

            .travel_list_opr {
                p {
                    margin: 0.2rem 0;
                    width: 100%;
                }
            }
        }
    }

}

@media screen and (max-width: 900px) {
    .travel_body {
        flex-direction: column;
        width: 100%;
        align-items: center;
        margin: 0;

        .exit {
            position: fixed;
            right: 0.4rem;
            top: 0;
            z-index: 10;
            font-size: 40px;
        }

        .travel_swiper {
            width: 100%;
            height: 600px;
        }

        .travel_list_body {
            width: 100%;
            padding: 0.5rem;
            height: auto;
        }
    }
}
</style>