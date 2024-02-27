<template>
    <div class="travel notes">
        <div class="notes_lab">
            <div class="notes_lab_item notes_lab_item_active">
                最近
            </div>
            <div class="notes_lab_item">
                黄山
            </div>
            <div class="notes_lab_item">
                武功山
            </div>
            <div class="notes_lab_item">
                修猫:fish
            </div>
        </div>
        <div class="travel_body" ref="body">
            <div class="travel_list" ref="travel">
                <div class="travel_list_item" v-for="(item, index) in imgList" :key="item.id"
                    @click="showTravelItem($event, item, index)" :style="{ ...imgListLocation[index] }"
                    :class="[item.active ? 'travel_list_item_acitve' : '', item.wideImgType&&item.active ? 'travel_list_item_wide' : '']">
                    <div class="travel_img">
                        <img class="travel_img_main" :src="item.src" alt="">
                    </div>
                    <div class="travel_list_body">
                        <div>
                            <h4>金顶</h4>
                            <div class="travel_list_desc">
                                到达武功山最高点了，哎呀这不金顶吗？...
                            </div>
                            <div class="travel_list_opr">
                                <p>
                                    <svg class="icon rotate" aria-hidden="true">
                                        <use xlink:href="#icon-time"></use>
                                    </svg>
                                    <span>2023-5-30</span>
                                </p>
                                <p>
                                    <svg class="icon swing" aria-hidden="true">
                                        <use xlink:href="#icon-coffee"></use>
                                    </svg>
                                    <span>给博主点杯咖啡吧！</span>
                                </p>
                            </div>
                        </div>
                        <!-- <div class="travel_list_joke">
                            <i></i><span>给博主点杯咖啡吧！</span>
                        </div> -->
                        <div class="travel_comment">
                            <div class="travel_comment_tit">
                                一共有x条评论
                            </div>
                            <div class="travel_comment_body">
                                <div class="travel_comment_item">
                                    <div class="travel_comment_left">
                                        <img src="../assets/img/head.jpg" alt="">
                                    </div>
                                    <div class="travel_comment_right">
                                        <h5>落寂的小丑</h5>
                                        <p>落寂的小丑，站在金顶上，不知道可以给谁分享此时开心的心情...</p>
                                    </div>
                                </div>
                                <div class="travel_comment_item">
                                    <div class="travel_comment_left">
                                        <img src="../assets/img/head.jpg" alt="">
                                    </div>
                                    <div class="travel_comment_right">
                                        <h5>落寂的小丑</h5>
                                        <p>落寂的小丑，站在金顶上，不知道可以给谁分享此时开心的心情...</p>
                                    </div>
                                </div>
                                <div class="travel_comment_item">
                                    <div class="travel_comment_left">
                                        <img src="../assets/img/head.jpg" alt="">
                                    </div>
                                    <div class="travel_comment_right">
                                        <h5>落寂的小丑</h5>
                                        <p>落寂的小丑，站在金顶上，不知道可以给谁分享此时开心的心情...</p>
                                    </div>
                                </div>
                                <div class="travel_comment_item">
                                    <div class="travel_comment_left">
                                        <img src="../assets/img/head.jpg" alt="">
                                    </div>
                                    <div class="travel_comment_right">
                                        <h5>落寂的小丑</h5>
                                        <p>落寂的小丑，站在金顶上，不知道可以给谁分享此时开心的心情...</p>
                                    </div>
                                </div>
                                <div class="travel_comment_item">
                                    <div class="travel_comment_left">
                                        <img src="../assets/img/head.jpg" alt="">
                                    </div>
                                    <div class="travel_comment_right">
                                        <h5>落寂的小丑</h5>
                                        <p>落寂的小丑，站在金顶上，不知道可以给谁分享此时开心的心情...</p>
                                    </div>
                                </div>
                                <div class="travel_comment_item">
                                    <div class="travel_comment_left">
                                        <img src="../assets/img/head.jpg" alt="">
                                    </div>
                                    <div class="travel_comment_right">
                                        <h5>落寂的小丑</h5>
                                        <p>落寂的小丑，站在金顶上，不知道可以给谁分享此时开心的心情...</p>
                                    </div>
                                </div>
                                <div class="travel_comment_item">
                                    <div class="travel_comment_left">
                                        <img src="../assets/img/head.jpg" alt="">
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
                </div>
            </div>
            <div class="travel_page">
            </div>
        </div>
        <div class="travel_mask" @click.self="closeTraveItem()" :class="maskActive ? 'travel_mask_active' : ''">
            <i>×</i>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, nextTick, watch, getCurrentInstance, computed } from 'vue'
// import { ImgListLocation } from '../interface.ts'
let travel = ref<any>(null);
let body = ref<any>(null);

let loadingImg = 0;//已加载图片数量
let imgListLocation: Array<any> = reactive([]);//图片位置属性

let lineHeightList: Array<number> = [];//每一列高度属性
let imgWidth = 320;//每一列宽度

let imgList: Array<any> = reactive([])
// let imgTotal = imgList.length; // 总体图片数量
let imgTotal: number = 0// 总体图片数量
let saveimgLocation: any;//存储原先图片位置
let pictureActive: boolean = false;//图片点击
let maskActive: boolean = false; // 弹窗背景板
let pictureActiveIndex: number = 0;

let commentFocusBol = ref(false);//评论留言点击
// watch(()=>imgList, () => {
//     imgTotal = imgList.length;
// })
imgList = [
    {
        src: "/src/assets/img/highView.png",
        name: "blablabla",
        time: "2023.10.28",
        id: "1",
        active: false,
        wideImgType: false

        // imgListLocation:ImgListLocation
    },
    {
        src: "/src/assets/img/wideView.png",
        name: "blablabla",
        time: "2023.10.28",
        id: "2",
        active: false,
        wideImgType: false
    },
    {
        src: "/src/assets/img/highView.png",
        name: "blablabla",
        time: "2023.10.28",
        id: "3",
        active: false,
        wideImgType: false
    },
    {
        src: "/src/assets/img/wideView.png",
        name: "blablabla",
        time: "2023.10.28",
        id: "4",
        active: false,
        wideImgType: false
    },
    {
        src: "/src/assets/img/highView.png",
        name: "blablabla",
        time: "2023.10.28",
        id: "5",
        active: false,
        wideImgType: false
    },
    {
        src: "/src/assets/img/wideView.png",
        name: "blablabla",
        time: "2023.10.28",
        id: "6",
        active: false,
        wideImgType: false
    },
    {
        src: "/src/assets/img/highView.png",
        name: "blablabla",
        time: "2023.10.28",
        id: "7",
        active: false,
        wideImgType: false
    },
    {
        src: "/src/assets/img/wideView.png",
        name: "blablabla",
        time: "2023.10.28",
        id: "8",
        active: false,
        wideImgType: false
    },
]
imgTotal = imgList.length;


const getElImg = (el: HTMLElement) => {
    return [...el.getElementsByClassName('travel_img_main')].map(value => {
        return value
    })
}

//返回数组最小值以及下标
const minAndIndexInList = (list: Array<number>) => {
    let value = list[0];
    let index = 0;
    list.map((val, ind) => {
        if (value > val) {
            value = val;
            index = ind
        }
    })

    return { value, index }
}

//计算图片位置
const calculate = (el: Array<HTMLImageElement>) => {

    let position = {
        value: 0, index: 0
    }
    let pass = true
    el.map((value, index) => {
        let items = {
            // wideImgType: false,
            top: "",
            left: "",
            position: "absolute",
            transition: "0.2s ease",
        }
        if (!value.complete) {
            pass = false
        }
        //判断长图或者宽图
        if (value.naturalHeight / value.naturalWidth > 1) {
            imgList[index].wideImgType = false;

        } else {
            imgList[index].wideImgType = true;

        }

        //判断此图片位置
        position = minAndIndexInList(lineHeightList);
        items.left = String(position.index * imgWidth) + "px";
        items.top = String(position.value + 20) + "px";
        lineHeightList[position.index] = position.value + 20 + value.height;

        imgListLocation.push(items);

    })
    // console.log(imgListLocation);

    return pass

}

//监听元素滚动到底部
const scrollBottom = (el: HTMLElement) => {
    const func = debounce(() => {
        if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
            console.log(1);
        }
    }, 500)
    el.addEventListener("scroll", function () {
        func()
    })
}
//防抖
const debounce = (handle: Function, delay: number) => {
    let timer: number;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            handle()
        }, delay)
    }
}

const showTravelItem = async (e: any, item: any, index: number) => {
    if (!!pictureActive) {
        return
    } else {
        saveimgLocation = imgListLocation[index];

        const style = {
            top: e.target.getBoundingClientRect().y + "px",
            left: e.target.getBoundingClientRect().x + "px",
            position: "fixed",
            transition: "0s",
            width: "300px",
            height: e.target.getBoundingClientRect().height + "px",
            resouceHeight: e.target.getBoundingClientRect().height + "px"
        };
        imgListLocation[index] = style;
        imgList[index].active = true
        pictureActiveIndex = index;

        await nextTick();
        e.target.style.top = e.target.getBoundingClientRect().y + "px"
        e.target.style.left = e.target.getBoundingClientRect().x + "px"
        $forceUpdate();
        await nextTick();

        imgListLocation[index] = style
        maskActive = true;
        $forceUpdate();
        pictureActive = true;

    }


}

const closeTraveItem = async () => {
    if (!pictureActive) {
        return
    } else {
        const index = pictureActiveIndex;

        const style: any = {
            top: Number(saveimgLocation.top.split("px")[0]) - travel.value.scrollTop + travel.value.getBoundingClientRect().y + "px",
            left: Number(saveimgLocation.left.split("px")[0]) - travel.value.scrollLeft + travel.value.getBoundingClientRect().x + "px",
            position: "fixed",
            transition: "0.5s ease",
            width: "300px",
            height: imgListLocation[index].resouceHeight,
            zIndex: "10"
        }
        console.log(imgListLocation[index].resouceHeight);


        imgListLocation[index] = style;
        imgList[index].active = false;
        $forceUpdate();
        maskActive = false;

        setTimeout(() => {
            style.transition = "0s"
            style.position = "absolute";
            style.top = saveimgLocation.top;
            style.left = saveimgLocation.left;
            style.zIndex = "1"

            // style.left = document.body.clientWidth / 2 - 300 + "px";
            imgListLocation[index] = style
            $forceUpdate();
            pictureActive = false;

        }, 600)
    }

}


const travelBodyHeightFixed = () => {
}

const commentFocus = () => {
    commentFocusBol.value = true;


}

const commentBlur = () => {
    commentFocusBol.value = false;

}

const {
    proxy: { $forceUpdate },
}: any = getCurrentInstance();

onMounted(async () => {
    lineHeightList = [...Array(Math.floor(travel.value.clientWidth / imgWidth))].map(() => 0);
    console.log(lineHeightList);
    
    let elImgList = getElImg(travel.value);
    elImgList.map(value => {
        value.onload = () => {
            loadingImg++;
            if (loadingImg === imgTotal) {
                calculate(elImgList)
            }
        }
    });
    scrollBottom(travel.value)
})

</script>
<style lang="scss" scoped>
@keyframes swing {
    0% {
        transform: rotate(0);
    }

    30% {
        transform: rotate(40deg);
    }

    60% {
        transform: rotate(-40deg);
    }

    70% {
        transform: rotate(30deg);
    }

    80% {
        transform: rotate(-25deg);
    }

    90% {
        transform: rotate(20deg);
    }

    95% {
        transform: rotate(-20deg);
    }

    100% {
        transform: rotate(0);
    }
}

@keyframes rotateAni {
    0% {
        transform: rotate(0);
    }

    0% {
        transform: rotate(-360deg);
    }
}

.notes {
    display: flex;
    width: 100%;
    // border: 5px solid #3c2a4d;
    border-radius: 10px;
    padding: 20px 0;
    height: 100%;

    .notes_lab {
        width: 200px;
        flex-shrink: 0;
        margin-right: 20px;

        .notes_lab_item {
            height: 50px;
            width: 100%;
            padding: 0 10px 0 20px;
            line-height: 50px;
            position: relative;
            margin-bottom: 20px;
            font-size: 18px;
            cursor: pointer;
            background: linear-gradient(to right, #e0f0ea, #e0f0ea);
            transition: .2s ease;

            &::after {
                content: "";
                position: absolute;
                left: 0;
                width: 10px;
                height: 100%;
                background: #95adbe;
            }

            &:hover {
                padding-left: 30px;
                letter-spacing: 1px;
                background: linear-gradient(to right, #95adbe, #e0f0ea);

                &::after {
                    background: #503a65;
                }
            }

            &.notes_lab_item_active {
                padding-left: 30px;
                letter-spacing: 1px;
                background: linear-gradient(to right, #95adbe, #e0f0ea);

                &::after {
                    background: #503a65;
                }
            }
        }
    }
}

.travel {
    .travel_body {
        flex: 1;
        height: 100%;
        position: relative;
        -ms-overflow-style: none;
        /* IE and Edge */
        scrollbar-width: none;
        /* Firefox */

        .travel_list {
            height: 100%;
            position: relative;
            overflow: scroll;

            &::-webkit-scrollbar {
                width: 0;
                display: none;
            }

            .travel_list_item {
                width: 300px;
                cursor: pointer;
                border-radius: 5px;
                overflow: hidden;
                transition: .2s ease;
                background: rgba($color: white, $alpha: 1.0);
                max-height: 80vh;
                padding: 0;
                
                .travel_img {
                    position: relative;
                    left: 0;
                    top: 0;
                    width: 300px;
                    flex-shrink: 0;
                    transition: .5s ease;
                    border-radius: 5px;
                    overflow: hidden;
                    // height: 100%;

                }

                .travel_list_body {
                    // position: absolute;
                    // left: 620px;
                    // top: 100px;
                    // width: calc(80vw - 620px);
                    display: none;
                    opacity: 0;
                    transition: 0.4s ease;
                    padding-right: 50px;
                    width: 600px;
                    height: 100%;
                    margin-left: 80px;
                    padding-top: 50px;
                    flex: 1;
                    h4 {
                        font-size: 28px;
                        color: #333;
                    }

                    .travel_list_desc {
                        font-size: 22px;
                        color: #666;
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
                                color: #666;
                            }
                        }
                    }

                    .travel_comment {
                        width: 100%;
                        margin-top: 20px;

                        .travel_comment_tit {
                            font-size: 15px;
                            color: #333;
                            margin-bottom: 10px;
                        }

                        .travel_comment_body {
                            border-left: 3px solid #ffc14d;
                            padding-left: 10px;
                            max-height: 500px;
                            overflow: scroll;

                            &::-webkit-scrollbar {
                                width: 0;
                                display: none;
                            }

                            .travel_comment_item {
                                display: flex;
                                align-items: center;
                                margin-bottom: 15px;

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
                                        color: #333;
                                        margin-bottom: 5px;
                                    }

                                    p {
                                        margin: 0;
                                        font-size: 14px;
                                        color: #333;
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
                                border: 1px solid #8450ff;
                                border-radius: 5px;
                                background: #8450ff;
                                cursor: pointer;
                                opacity: 0;
                                transition: 0.5s ease;
                                color: white;
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
                }

                &.travel_list_item_acitve {
                    z-index: 100;
                    background: rgba($color: #fdebd3, $alpha: 0.5);
                    left: 30vw;
                    top: 200px;
                    max-height: 80vh;
                    height: 80vh;
                    overflow-y: scroll;
                    overflow-x: hidden;
                    padding: 10px;
                    max-width: 80vw;
                    width: 80vw;
                    display: flex;
                    align-items: stretch;
                    cursor: auto;
                    box-shadow: 0 0 20px 5px #95adbe;
                    flex-wrap: nowrap;

                    &::-webkit-scrollbar {
                        width: 0;
                        display: none;
                    }

                    .travel_img {
                        width: 500px;
                        display: flex;
                        align-items: center;

                        img {
                            // max-width: 100%;
                            max-height: 100%;
                            height: auto;
                        }
                    }

                    .travel_list_body {
                        opacity: 1;
                        display: block;

                    }
                }

                &.travel_list_item_wide {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    .travel_img {
                        width: "600px";
                    }
                    .travel_list_body{
                        display: flex;
                        justify-content: space-evenly;
                        width: 100%;
                        .travel_comment{
                            width: 50%;
                        }
                    }
                }

                &:hover {
                    box-shadow: 0 0 20px 5px #95adbe;

                }

                img {
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
        }
    }

    .travel_mask {
        position: fixed;
        z-index: -1;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        opacity: 0;
        background: white;
        transition: z-index 0s ease 0.5s, opacity 0.2s ease;

        &.travel_mask_active {
            z-index: 9;
            opacity: 0.8;
            transition: z-index 0s, opacity 0.5s ease;

        }
    }
}
</style>