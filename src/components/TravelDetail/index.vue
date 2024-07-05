<template>
    <div>
        <div class="travel_body" :class="isShow ? 'travel_active' : ''" ref="body" :style="animationState">
            <div class="travel_swiper">
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
                <div class="travel_comment">
                    <div class="travel_comment_tit" v-if="commentList.length > 0">
                        一共有{{ commentList.length }}条评论
                    </div>
                    <div class="travel_comment_tit" v-else>
                        暂无评论
                    </div>
                    <!-- <div class="travel_comment_body"> -->
                    <el-scrollbar min-height="400px" max-height="400px" class="travel_comment_body"
                        v-if="commentList.length > 0">
                        <div class="travel_comment_con"
                            :class="item.commentId === commentFrom.commentId ? 'travel_comment_item_active' : ''"
                            v-for="(item, index) in commentList" :key="index">
                            <div class="travel_comment_item">
                                <div class="travel_comment_left">
                                    <img src="../../assets/img/head.jpg" alt="">
                                </div>
                                <div class="travel_comment_right">
                                    <h5>{{ item.commentName }}</h5>
                                    <p>{{ item.commentBody }}</p>
                                </div>
                                <span @click="replyComment(item.commentId as string)">{{ isReply ? '取消' : '回复' }}</span>
                            </div>
                            <div class="atravel_comment_reply travel_comment_item" v-for="itemReply in item.commentBack"
                                :key="itemReply.commentName">
                                <div class="travel_comment_left">
                                    <img src="../../assets/img/head.jpg" alt="">
                                </div>
                                <div class="travel_comment_right">
                                    <h5>{{ itemReply.commentName }}</h5>
                                    <p>{{ itemReply.commentBody }}</p>
                                </div>
                            </div>
                        </div>

                    </el-scrollbar>
                    <!-- </div> -->

                    <p class="comment_inpput_title" v-if="isReply">回复他：</p>
                    <p class="comment_inpput_title" v-else>我来评论一条：</p>

                    <div class="travel_comment_input">
                        <input class="input_name" type="text" id="name" placeholder="昵称"
                            v-model="commentFrom.commentName">
                        <input type="text" id="message" placeholder="想说什么~" v-model="commentFrom.commentBody"
                            @focus="commentFocus()" @blur="commentBlur()">
                        <span :class="commentFocusBol ? 'travel_comment_btn' : ''" @click="comment()">留言</span>
                    </div>
                </div>

            </div>
            <i @click.self="closeTraveItemFunc()" class="exit">×</i>
        </div>
        <div class="travel_mask" :class="maskAnimation ? 'travel_mask_active' : ''" @click.self="closeTraveItemFunc()">

        </div>

    </div>
</template>


<script setup lang="ts">

import { toRefs, ref, watch, getCurrentInstance, reactive, nextTick, computed, onMounted, shallowRef } from 'vue'
import { TravelCommentUploadGetAPI, TravelCommentGetAPI } from "../../request/api"
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'


const props = defineProps(['position', 'currentTravel', 'isShow'])
const { position, currentTravel, isShow } = toRefs(props)
const emits = defineEmits(['closeTraveItem'])
//上传评论
const commentFrom = ref<TravelCommentUploadGetAPIReq>({
    commentBody: '',
    commentName: '匿名',
    commentId: '',
    travelId: '',
})
//组件高度
const Height = document.body.clientHeight * 0.9;
//swiper的宽度
const swiperWidth = ref(0);
const isReply = computed(() => {
    return commentFrom.value.commentId === '' ? false : true
})
//显示评论
const commentList = shallowRef<TravelCommentItemFrist[]>([])
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
        getComment()
        animationFunc('enter')
    } else {
        resetData()
    }
})
watch(() => commentFrom.value, (val) => {
    console.log(val);
})
let commentFocusBol = ref(false);//评论留言点击

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
//params:动画进入和消失的流程
const animationFunc = async (sign: string) => {

    //获得图片的宽度
    let imgWidth = await judgeImg(currentTravel?.value.thumb.url) || 0;

    if (imgWidth > document.body.clientWidth / 2) {
        imgWidth = document.body.clientWidth / 2
    }
    if(document.body.clientWidth < 900){
        imgWidth = (document.body.clientWidth /5) * 4
    }
    swiperWidth.value = imgWidth
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

//评论按钮
const comment = async (_?: string) => {

    commentFrom.value.travelId = currentTravel?.value.travel_id;
    if (commentFrom.value.commentName === '') {
        ElMessage({
            message: "评论名称不能为空",
            type: 'error',
        })
        return
    } else if (commentFrom.value.commentBody === '') {
        ElMessage({
            message: "评论不能为空",
            type: 'error',
        })
        return
    }
    const result = await TravelCommentUploadGetAPI(commentFrom.value).then(data => data)

    if (result.code !== '0000') {
        ElMessage({
            message: result.msg,
            type: 'error',
        })
    } else {
        ElMessage({
            message: "评论成功",
            type: 'success',
        })
        resetData()
        getComment()
    }

}
//获取评论
const getComment = async () => {
    if (typeof (currentTravel?.value) === 'undefined') {
        return
    }

    const result = await TravelCommentGetAPI({ travelId: currentTravel?.value.travel_id }).then(data => data)
    commentList.value = [...result.data]

}
//点击回复
const replyComment = (commentId: string) => {
    if (isReply.value) {
        commentFrom.value.commentId = ''
    } else {
        commentFrom.value.commentId = commentId
    }
}

const orderingCoffee = () => {
    ElMessage.success('谢谢宝宝的咖啡')
}

const closeTraveItemFunc = () => {
    animationFunc('out')
}


const commentBlur = () => {
    commentFocusBol.value = false;
}
const commentFocus = () => {
    commentFocusBol.value = true;
}
//重置页面数据
const resetData = () => {
    commentFrom.value = {
        commentBody: '',
        commentName: '匿名',
        commentId: '',
        travelId: '',
    }
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

        .travel_comment {
            width: 100%;
            margin-top: 20px;

            .travel_comment_tit {
                font-size: 15px;
                margin-bottom: 10px;
                border: var(--border);
                padding: 0.4rem;
            }

            .travel_comment_body {
                border-left: 3px solid hsl(var(--theme-color)/0.4);

                &::-webkit-scrollbar {
                    width: 0;
                    display: none;
                }

                .travel_comment_con {
                    position: relative;

                    &.travel_comment_item_active {
                        background: hsl(var(--theme-color)/0.1);

                        &::after {
                            width: 100%;
                            height: 3px;
                        }

                        &::before {
                            height: 80%;
                        }

                        .travel_comment_item span {
                            opacity: 1;
                        }
                    }

                    &:hover {
                        background: hsl(var(--theme-color)/0.1);

                        &::after {
                            width: 100%;
                            height: 3px;
                        }

                        &::before {
                            height: 80%;
                        }

                        .travel_comment_item span {
                            opacity: 1;
                        }
                    }

                    &::after {
                        content: "";
                        position: absolute;
                        right: 10px;
                        top: 0;
                        width: 0;
                        height: 0;
                        border-top: 3px solid hsl(var(--theme-color)/0.1);
                        transition: .4s ease;
                    }

                    &::before {
                        content: "";
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 10px;
                        height: 10px;
                        transition: .4s ease;
                        border-top: 3px solid hsl(var(--theme-color)/0.1);
                        border-right: 3px solid hsl(var(--theme-color)/0.1);
                        border-radius: 0 4px 0 0;
                    }
                }

                .travel_comment_item {
                    display: flex;
                    // align-items: center;
                    padding: 0.2rem 0;
                    margin: 0 0.4rem;
                    position: relative;

                    span {
                        margin-right: 10px;
                        font-size: 16px;
                        font-weight: bold;
                        opacity: 0;
                        cursor: pointer;
                        margin-bottom: 0.2rem;
                    }

                    .travel_comment_left {
                        width: 40px;
                        height: 40px;
                        margin-top: 0.3rem;
                        overflow: hidden;
                        border-radius: 50%;
                        margin-right: 10px;
                    }

                    .travel_comment_right {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        overflow: hidden;

                        h5 {
                            font-size: var(--font-size-normal);
                            line-height: 1rem;
                        }

                        p {
                            margin: 0;
                            font-size: var(--font-size-small);
                            width: 100%;

                        }
                    }
                }

                .atravel_comment_reply {
                    margin-left: 30px;
                    padding: 5px 0;
                    transform: scale(0.9);

                    &::after {
                        content: none;
                    }

                    &::before {
                        content: none;
                    }
                }
            }

            .comment_inpput_title {
                margin-top: 40px;
                font-size: 22px;
                font-weight: var(--font-weight-title);
            }

            .travel_comment_input {
                display: flex;
                margin-top: 0.4rem;
                align-items: center;
                position: relative;

                .input_name {
                    width: 100px;
                    border-radius: 0.1rem 0 0 0.1rem;
                    color: var(--font-color);
                    padding: 10px;
                }

                input {
                    width: 500px;
                    border: 1px solid #333;
                    border-radius: 0 0.2rem 0.2rem 0;
                    line-height: 20px;
                    font-size: 16px;
                    resize: none;
                    padding: 10px;
                    background: none;
                    padding-right: 90px;

                    &:focus {
                        outline: none;
                        border: 1px solid hsl(var(--theme-color));
                        color: hsl(var(--theme-color));
                    }
                }

                span {
                    position: absolute;
                    right: 0;
                    top: 50%;
                    width: 80px;
                    height: 99%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transform: translate(0, -50%);
                    border-radius: 5px;
                    background: hsl(var(--theme-color)/0.1);
                    cursor: pointer;
                    opacity: 0;
                    transition: 0.2s ease;
                    font-size: var(--font-size-normal);

                    &:hover {
                        background: hsl(var(--theme-color)/0.2);
                    }
                }

                .travel_comment_btn {
                    opacity: 1;
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
        margin: 0 ;
        .exit {
            position: fixed;
            right: 0.4rem ;
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