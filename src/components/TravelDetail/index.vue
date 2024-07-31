<template>
    <div>
        <div class="travel_body" :class="isShow ? 'travel_active' : ''" ref="body" :style="animationState">
            <div class="travel_swiper" v-if='isShow'>
                <Swiper :slideList="imgList" :swiperWidth="swiperWidth"></Swiper>
            </div>
            <div class="travel_list_body">
                <div>
                    <h4>{{ currentTravel?.title }}</h4>
                    <div class="travel_list_desc">
                        {{ currentTravel?.body }}
                    </div>
                    <div class="travel_list_opr">
                        <p>
                            <svg class="icon rotate jump" aria-hidden="true">
                                <use xlink:href="#icon-time"></use>
                            </svg>
                            <span>{{ currentTravel?.time }}</span>
                        </p>
                        <p>
                            <svg class="icon guankan jump" aria-hidden="true">
                                <use xlink:href="#icon-guankan"></use>
                            </svg>
                            <span v-if="currentTravel?.watchNum > 0">{{ currentTravel?.watchNum }}人看过</span>
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
                <Comment :commentId="currentTravel?.travel_id" :mark="'t'"></Comment>

            </div>
            <i @click.self="closeTraveItemFunc()" class="exit">×</i>
        </div>
        <div class="travel_mask" :class="maskAnimation ? 'travel_mask_active' : ''" @click.self="closeTraveItemFunc()">

        </div>

    </div>
</template>


<script setup lang="ts">

import { toRefs, ref, watch, getCurrentInstance, reactive, nextTick, computed, onMounted, shallowRef } from 'vue'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import Comment from '@/components/Comment/index.vue'


const props = defineProps(['position', 'currentTravel', 'isShow'])
const { position, currentTravel, isShow } = toRefs(props)
const emits = defineEmits(['closeTraveItem'])

//组件高度
const Height = document.body.clientHeight * 0.9;
//swiper的宽度
const swiperWidth = ref(0);

//节流,防止频繁点击
const throttleLock = ref(false)
//mask动画问题
const maskAnimation = ref(false)

const imgList = computed(() => {
    if (typeof (currentTravel?.value) !== 'undefined') {
        return [
            currentTravel?.value.thumb,
            ...currentTravel?.value.imgList
        ]
    } else {
        return []
    }

})

let animationState = reactive({
    transition: '0s ease',
    height: '0px',
    // width: '0px',
    top: '0px',
    left: '0px',
    opacity: '0'
})

//监听渲染流程，触发动画方法
watch(() => isShow?.value, (val) => {
    if (val) {
        animationFunc('enter')
    }
})

//判断图片宽高
const judgeImg = async (url: string) => {
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
        await judgeImg(url)
    } else {
        width = (imgObj.width * Height) / imgObj.height

        return width || 0;
    }
}
//计算swiper宽度
const calSwiperWidth = async () => {

    //获得图片的宽度
    let imgWidth = await judgeImg(currentTravel?.value.thumb.url) || 0;

    if (imgWidth > document.body.clientWidth / 2) {
        imgWidth = document.body.clientWidth / 2
    }
    if (document.body.clientWidth < 900) {
        imgWidth = (document.body.clientWidth / 5) * 4
    }
    swiperWidth.value = imgWidth
}
//params:动画进入和消失的流程
const animationFunc = async (sign: string) => {

    maskAnimation.value = true
    if (throttleLock.value) {
        return
    } else {
        throttleLock.value = true
    }
    let style = { ...animationState }
    if (sign === 'enter') {
        swiperWidth.value = position?.value.width;
        animationState = {
            transition: '0s ease',
            ...position?.value,
            opacity: '1'
        }

        await nextTick()
        await calSwiperWidth()
        style.top = "80px"

        if (document.body.clientWidth - swiperWidth.value - 700 < 0) {
            style.left = '0px'
        } else {
            style.left = ((document.body.clientWidth - swiperWidth.value - 700) / 2) + "px"
        }

        style.height = Height + 'px';
        style.transition = " 0.5s ease"
        style.opacity = "1"
        animationState = {
            ...style
        }
        $forceUpdate()
        throttleLock.value = false

    } else if (sign === 'out') {
        maskAnimation.value = false
        animationState = {
            transition: "0.5s ease",
            ...position?.value,
            opacity: "0"
        }
        $forceUpdate()

        setTimeout(() => {
            throttleLock.value = false
            animationState = {
                transition: '0s ease',
                height: '0px',
                top: '0px',
                left: '0px',
                opacity: '0'
            }
            $forceUpdate()
            emits('closeTraveItem')

        }, 600)
    }

}
const {
    proxy: { $forceUpdate },
}: any = getCurrentInstance();



const orderingCoffee = () => {
    ElMessage.success('谢谢宝宝的咖啡')
}

const closeTraveItemFunc = () => {
    animationFunc('out')
}


onMounted(() => {

})
</script>

<style lang="scss" scoped>
.travel_body {
    position: fixed;
    left: 0;
    top: 0;
    height: 0;
    // width: 0;
    z-index: 1000;
    height: 100%;
    // position: relative;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
    overflow: scroll;
    display: flex;
    align-items: stretch;
    // justify-content: center;
    border-radius: 10px;

    .exit {
        position: absolute;
        right: 0.5rem;
        top: 0.1rem;
        font-size: var(--font-size-title);
        cursor: pointer;
        font-style: normal;
    }

    &.travel_active {
        background: var(--h-bg);
        border: var(--border);
        // max-width: 1400px;
    }

    .travel_swiper {
        position: relative;
        left: 0;
        top: 0;
        // width: 600px;
        height: 100%;
        flex-shrink: 0;
        transition: .5s ease;
        border-radius: 5px;
        overflow: hidden;
        height: 100%;

        // height: 100%;

    }

    .travel_list_body {
        // opacity: 0;
        transition: 0.4s ease;
        padding-right: 50px;
        width: 600px;
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
        margin: 0 20px;

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
            top: 2.5rem;
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