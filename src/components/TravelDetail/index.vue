<template>
    <div>
        <div class="travel_body" :class="isShow ? 'travel_active' : ''" ref="body" :style="animationState">
            <div class="travel_swiper">
                <Swiper :slideList="imgList"></Swiper>
            </div>
            <div class="travel_list_body">
                <div>
                    <h4>{{ currentTravel?.title }}</h4>
                    <div class="travel_list_desc">
                        {{ currentTravel?.body }}
                    </div>
                    <div class="travel_list_opr">
                        <p>
                            <svg class="icon rotate" aria-hidden="true">
                                <use xlink:href="#icon-icon_time"></use>
                            </svg>
                            <span>{{ currentTravel?.time }}</span>
                        </p>
                        <p>
                            <svg class="icon swing" aria-hidden="true">
                                <use xlink:href="#icon-icon_coffee"></use>
                            </svg>
                            <span>给博主点杯咖啡吧！</span>
                        </p>
                    </div>
                </div>
                <div class="travel_comment">
                    <div class="travel_comment_tit">
                        一共有x条评论
                    </div>
                    <div class="travel_comment_body">
                        <div class="travel_comment_item">
                            <div class="travel_comment_left">
                                <img src="../../assets/img/head.jpg" alt="">
                            </div>
                            <div class="travel_comment_right">
                                <h5>落寂的小丑</h5>
                                <p>落寂的小丑，站在金顶上，不知道可以给谁分享此时开心的心情...</p>
                            </div>
                        </div>
                        <div class="travel_comment_item">
                            <div class="travel_comment_left">
                                <img src="../../assets/img/head.jpg" alt="">
                            </div>
                            <div class="travel_comment_right">
                                <h5>落寂的小丑</h5>
                                <p>落寂的小丑，站在金顶上，不知道可以给谁分享此时开心的心情...</p>
                            </div>
                        </div>
                        <div class="travel_comment_item">
                            <div class="travel_comment_left">
                                <img src="../../assets/img/head.jpg" alt="">
                            </div>
                            <div class="travel_comment_right">
                                <h5>落寂的小丑</h5>
                                <p>落寂的小丑，站在金顶上，不知道可以给谁分享此时开心的心情...</p>
                            </div>
                        </div>
                        <div class="travel_comment_item">
                            <div class="travel_comment_left">
                                <img src="../../assets/img/head.jpg" alt="">
                            </div>
                            <div class="travel_comment_right">
                                <h5>落寂的小丑</h5>
                                <p>落寂的小丑，站在金顶上，不知道可以给谁分享此时开心的心情...</p>
                            </div>
                        </div>
                        <div class="travel_comment_item">
                            <div class="travel_comment_left">
                                <img src="../../assets/img/head.jpg" alt="">
                            </div>
                            <div class="travel_comment_right">
                                <h5>落寂的小丑</h5>
                                <p>落寂的小丑，站在金顶上，不知道可以给谁分享此时开心的心情...</p>
                            </div>
                        </div>
                        <div class="travel_comment_item">
                            <div class="travel_comment_left">
                                <img src="../../assets/img/head.jpg" alt="">
                            </div>
                            <div class="travel_comment_right">
                                <h5>落寂的小丑</h5>
                                <p>落寂的小丑，站在金顶上，不知道可以给谁分享此时开心的心情...</p>
                            </div>
                        </div>
                        <div class="travel_comment_item">
                            <div class="travel_comment_left">
                                <img src="../../assets/img/head.jpg" alt="">
                            </div>
                            <div class="travel_comment_right">
                                <h5>落寂的小丑</h5>
                                <p>落寂的小丑，站在金顶上，不知道可以给谁分享此时开心的心情...</p>
                            </div>
                        </div>
                    </div>
                    <div class="travel_comment_input">
                        <input type="text" @blur="commentBlur()" @focus="commentFocus()"
                            placeholder="留言还没做好，前端一枚，后端还在琢磨~">
                        <span :class="commentFocusBol ? 'travel_comment_btn' : ''">留言</span>
                    </div>
                </div>


            </div>
            <div class="travel_page">
            </div>
        </div>
        <div class="travel_mask" :class="maskAnimation ? 'travel_mask_active' : ''" @click.self="closeTraveItemFunc()">
            <i @click.self="closeTraveItemFunc()">×</i>
        </div>
    </div>
</template>


<script setup lang="ts">
type Props = {

}

import Swiper from "./swiper.vue"
import { toRefs, ref, watch, getCurrentInstance, onUpdated, reactive, nextTick, computed, onMounted } from 'vue'
const props = defineProps(['position', 'currentTravel', 'isShow'])
const { position, currentTravel, isShow } = toRefs(props)
const emits = defineEmits(['closeTraveItem'])
//节流,防止频繁点击
const throttleLock = ref(false)
//mask动画问题
const maskAnimation = ref(false)

const imgList = computed(() => {
    if (typeof (currentTravel.value) !== 'undefined') {
        return [
            currentTravel.value.thumb,
            ...currentTravel.value.imgList
        ]
    } else {
        return []
    }

})

let animationState = reactive({
    transition: '0s ease',
    height: '0px',
    width: '0px',
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

let commentFocusBol = ref(false);//评论留言点击
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

        animationState = {
            transition: '0s ease',
            ...position?.value,
            opacity: '0'
        }

        await nextTick()

        if (document.body.clientWidth < 1919) {
            style.width = "89vw";
            style.top = "80px"
            style.left = "5vw"

        } else {
            style.width = "1400px";
            style.top = "80px"
            style.left = ((document.body.clientWidth - 1400) / 2) + "px"
        }
        style.height = document.body.clientHeight * 0.8 + "px";
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
                width: '0px',
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


const closeTraveItemFunc = () => {
    animationFunc('out')
}

const commentBlur = () => {
    commentFocusBol.value = false;
}
const commentFocus = () => {
    commentFocusBol.value = true;
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
    width: 0;
    z-index: 1000;
    height: 100%;
    // position: relative;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
    border: 3px solid black;
    overflow: hidden;
    display: flex;
    align-items: stretch;
    justify-content: center;
    border-radius: 10px;

    &.travel_active {
        background: rgba($color: #23272f, $alpha: 1);
        max-width: 1400px;
    }

    .travel_swiper {
        background: rgba($color: #23272f, $alpha: 0);
        position: relative;
        left: 0;
        top: 0;
        width: 600px;
        flex-shrink: 0;
        transition: .5s ease;
        border-radius: 5px;
        overflow: hidden;
        height: 1023.2px;


        // height: 100%;

    }

    .travel_list_body {
        // opacity: 0;
        transition: 0.4s ease;
        padding-right: 50px;
        // width: 600px;
        height: 100%;
        padding: 50px;
        width: 700px;
        background: rgba($color: #23272f, $alpha: 0);

        h4 {
            font-size: 32px;
            color: #eee;
        }

        .travel_list_desc {
            font-size: 22px;
            color: #999;
            margin: 30px 0;

        }

        .travel_list_opr {
            display: flex;
            height: 40px;
            align-items: center;

            p {
                margin-right: 40px;
                line-height: 10px;
                display: flex;
                align-items: center;

                svg {
                    width: 30px;
                    height: 30px;
                    margin-right: 10px;
                    cursor: pointer;
                    transition: 0.5s ease;
                    transform: rotate(0);

                    &.rotate:hover {
                        animation: rotateAni 0.3s ease;
                    }

                    &.swing:hover {
                        transform: rotate(45deg);
                    }
                }

                span {
                    font-size: 16px;
                    color: #999;
                }
            }
        }

        .travel_comment {
            width: 100%;
            margin-top: 20px;

            .travel_comment_tit {
                font-size: 15px;
                color: #eee;
                margin-bottom: 10px;
            }

            .travel_comment_body {
                border-left: 3px solid rgba(88, 175, 223, .1);
                padding-left: 20px;
                max-height: 500px;
                overflow: scroll;

                &::-webkit-scrollbar {
                    width: 0;
                    display: none;
                }

                .travel_comment_item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 30px;

                    .travel_comment_left {
                        width: 40px;
                        height: 40px;
                        overflow: hidden;
                        border-radius: 50%;
                        margin-right: 10px;
                    }

                    .travel_comment_right {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        h5 {
                            font-size: 16px;
                            color: #999;
                            margin-bottom: 5px;
                        }

                        p {
                            margin: 0;
                            font-size: 14px;
                            color: #999;
                        }
                    }
                }
            }

            .travel_comment_input {
                display: flex;
                margin-top: 40px;
                align-items: center;
                position: relative;



                span {
                    position: absolute;
                    left: 420px;
                    top: 50%;
                    width: 80px;
                    height: 99%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transform: translate(0, -50%);
                    border: 1px solid rgba(88, 175, 223, 1);
                    border-radius: 5px;
                    background: rgba(88, 175, 223, 1);
                    cursor: pointer;
                    opacity: 0;
                    transition: 0.5s ease;
                    color: white;
                    font-weight: bold;
                }

                .travel_comment_btn {
                    opacity: 1;
                }

                input {
                    border: 1px solid #b39836;
                    padding: 10px;
                    border-radius: 5px;
                    transition: 0.2s ease;
                    font-size: 15px;
                    color: #333;
                    letter-spacing: 1px;
                    width: 500px;

                    &:focus {
                        outline: none;
                        border: 1px solid #8450ff;
                    }
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
    background: rgba(88, 175, 223, 0.1);
    transition: opacity .3s ease, width 0s 0.5s, height 0s 0.5s;

    &.travel_mask_active {
        transition: opacity .3s ease, width 0s, height 0s;
        opacity: 0.8;
        width: 100%;
        height: 100%;
    }

    i {
        position: absolute;
        right: 50px;
        top: 50px;
        font-size: 50px;
        cursor: pointer;
        font-style: normal;

    }
}
</style>