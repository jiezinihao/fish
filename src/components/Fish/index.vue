<template>
    <div class="bg" ref="bg">
        <div class="fish" ref="fish">
            <div class="step1 step" ref="step1" data-border-bottom-right-radius="0-100-%" data-bottom="0-120-%">

                <img class="step_bg" src="../../assets/img/background/sun.jpeg" alt="">
                <div class="mb" data-opacity="0.5-1"></div>
                <div class="comment">
                    <p class="title">走心评论：</p>
                    <div class="comment_list" ref="comment">
                        <a class="comment_box fade-before" :ani-delay="(index * 0.2) + 's'"
                        @click="hotCommentsClick(item)"
                            v-for="(item, index) in hotCommentsList" :key="index" href="javascript:">
                            <div class="head_img">
                                <img :src="item.icon" alt="">
                            </div>
                            <div class="comment_title">
                                <p>{{ item.commentName }}</p>
                                <time :datetime="item.createTime">{{ item.createTime }}</time>
                            </div>
                            <div class="comment_content">
                                {{ item.commentBody }}
                            </div>
                            <div class="comment_from">
                                from “{{ item.title }}”
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <div class="step step2" ref="step2" data-border-bottom-right-radius="0-100-%" data-bottom="0-120-%">
                <img class="step_bg" src="../../assets/img/fish_bg.jpg" alt="">
                <div class="mb" data-opacity="0.5-1"></div>
                <div class="about">
                    <Flip class=" peoty">
                        <template #front>
                            <p class="title">
                                给读者一封信
                            </p>
                        </template>
                        <template #back>
                            <div class="box_peoty">
                                <p>我们在这里相遇，不计从前不计以后</p>
                                <p>这一秒你属于这里，将这段时间交给这里</p>
                                <p>这里纪录着很多关于我的故事和我的猫！</p>
                                <p>我觉得，青春总需要记录，原来听过一句话：“写日记的都不是什么好人”；我并不认同，我觉得，写日记或者记录生活的人都是还能折腾的人，还能记录下当下，然后给以后的自己做路标。
                                </p>
                                <p>如果某一天，这个博客很久不更新了，或许那时候我就已经很懒了吧，不愿意在去折腾了。</p>
                            </div>
                        </template>
                    </Flip>
                    <!-- <div class="box peoty">
                        <p class="title">
                            给读者一封信：
                        </p>
                        <p>我们在这里相遇，不计从前不计以后</p>
                        <p>这一秒你属于这里，将这段时间交给这里</p>
                        <p>这里纪录着很多关于我的故事和我的猫！</p>
                        <p>我觉得，青春总需要记录，原来听过一句话：“写日记的都不是什么好人”；我并不认同，我觉得，写日记或者记录生活的人都是还能折腾的人，还能记录下当下，然后给以后的自己做路标。</p>
                        <p>如果某一天，这个博客很久不更新了，或许那时候我就已经很懒了吧，不愿意在去折腾了。</p>
                    </div> -->
                    <div class="box aboutme">
                        <p class="title">关于我自己</p>

                        <div class="connect">
                            <h6>性格测试：</h6>
                            <span>INTP-T（逻辑学家）</span>
                        </div>
                        <div class="box_item energy">
                            <div class="rank ">
                                <span>內向</span>
                                <div class="line">
                                    <i></i>
                                </div>
                                <span>外向</span>

                            </div>
                        </div>
                        <div class="box_item jugment">
                            <div class="rank ">
                                <span>感性</span>
                                <div class="line">
                                    <i></i>
                                </div>
                                <span>理性分析</span>
                            </div>
                        </div>
                        <div class="connect">
                            <h6>爱好:</h6>
                            <span>游戏、滑板、电动滑板、电影、音乐、爬山、海边</span>
                        </div>
                        <div class="connect">
                            <h6>联系我:</h6>
                            <a href="">
                                <svg class="icon swing" aria-hidden="true">
                                    <use xlink:href="#icon-bilibili-copy"></use>
                                </svg>
                            </a>
                            <a href="">
                                <svg class="icon swing" aria-hidden="true">
                                    <use xlink:href="#icon-logo-black"></use>
                                </svg>
                            </a>
                            <a href="">
                                <svg class="icon swing" aria-hidden="true">
                                    <use xlink:href="#icon-GitHub"></use>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="about">
                    <div class="box">
                        <p class="title">
                            关于我的猫（FISH）
                        </p>
                        <div class="box_item temper">
                            <p class="rank_title">脾气</p>
                            <div class="rank ">
                                <span>打不还手骂不还口</span>
                                <div class="line">
                                    <i></i>
                                </div>
                                <span>易怒</span>
                            </div>
                        </div>
                        <div class="box_item character">
                            <p class="rank_title">性格</p>
                            <div class="rank ">
                                <span>冷漠</span>
                                <div class="line">
                                    <i></i>
                                </div>
                                <span>粘人</span>

                            </div>
                        </div>
                        <div class="box_item distory">
                            <p class="rank_title">破坏力</p>
                            <div class="rank ">
                                <span>弱鸡</span>
                                <div class="line">
                                    <i></i>
                                </div>
                                <span>彻底疯狂</span>

                            </div>
                        </div>


                    </div>

                    <div class="box game">
                        <p class="title">
                            游戏进展！
                        </p>
                        <div class="box_item lol">
                            <p class="rank_title">英雄联盟</p>
                            <div class="rank ">
                                <span>黑铁</span>
                                <div class="line">
                                    <i></i>
                                </div>
                                <span>王者</span>

                            </div>
                        </div>
                        <div class="box_item valorant">
                            <p class="rank_title">无畏契约</p>
                            <div class="rank ">
                                <span>青铜</span>
                                <div class="line">
                                    <i></i>
                                </div>
                                <span>赋能</span>

                            </div>
                        </div>

                        <div class="box_item yjwj">
                            <p class="rank_title">永劫无间</p>
                            <div class="rank ">
                                <span>未知</span>
                                <div class="line">
                                    <i></i>
                                </div>
                                <span>无间修罗</span>

                            </div>
                        </div>

                    </div>
                </div>


            </div>
            <div class="box_fish" :data-show="showCabinetFish" @click="downFish()">
                <img src="../../assets/img/box_fish.jpg" alt="">
                <p>{{ showCabinetFish ? '好吧我不回去啦!' : '恭喜你找到了柜子里的fish！' }}</p>
            </div>
            <div class="fish_introduce" data-top="80-10-%" data-opacity="0.7-1" ref="introduce">
                <img src="../../assets/img/fish_introduce.jpg" alt="">
                <p>一直帅帅的喵</p>
            </div>
            <!-- <div class="step step3">
                <p>more</p>
            </div> -->
        </div>
    </div>
</template>

<script setup lang="ts">

interface PrecentObj {
    precentStart: number,
    precent1: number,
    precent2: number,
    precent3: number,
    precent4: number
}

import { ref, onMounted, inject, watch } from 'vue'
import Flip from '@/components/Flip/index.vue'
import { useRouter, useRoute } from 'vue-router';
import { GetHotCommentListAPI } from '@/request/api'

const router = useRouter()
const showCabinetFish = ref<boolean>(false);

const bg = ref<any>(null);
const fish = ref<any>(null);
const step1 = ref<any>();
const step2 = ref<any>();
const step3 = ref<any>();

const introduce = ref<any>();
const comment = ref<any>();
const process = inject('processOrigin', ref(0));

//评论
const hotCommentsList = ref<GetHotCommentListAPIRes['data']>([]);


const getHotComments = async () => {
    const result = await GetHotCommentListAPI().then((data) => data);
    hotCommentsList.value = result.data
}

const hotCommentsClick = (item:GetHotCommentListAPIRes['data'][0])=>{
    let url = '';
    let markMap = {
        a:'/notes/detail/',
        t:"/travel?id=",
        m:'/connect'
    }

    url = markMap[item.mark] + item.aid
    console.log(url);
    
    router.replace(url)
}

watch(process, (newValue) => {
    updateStyles(newValue)
    scrollIntoView(newValue)
})

const scrollIntoView = (process: number) => {
    const precentObj: PrecentObj = initPrecent()

    if (process > precentObj.precentStart / 3) {
        for (let dom of comment.value.children) {
            dom.classList.add('fade-after')
        }
    }
}
//初始化动画开始和结束部分
const initPrecent = () => {
    const BGRect = bg.value.getBoundingClientRect()
    const scrollStart = Number(BGRect.top + process.value);
    const scrollEnd = Number(BGRect.bottom + process.value - window.innerHeight);

    const precent = (scrollEnd - scrollStart) / 3
    const precentObj: PrecentObj = {
        precentStart: scrollStart,
        precent1: scrollStart + precent,
        precent2: scrollStart + precent * 2,
        precent3: scrollStart + precent * 3,
        precent4: scrollStart + precent * 4
    }
    return precentObj
}


const downFish = () => {
    showCabinetFish.value = !showCabinetFish.value
}
//dom动画映射
const animationMap = new Map();
//更新animationMap映射
const updateStyles = (process: number) => {
    const scroll = process;
    updateMap()

    for (let [dom, value] of animationMap) {
        for (let [key, style] of value) {
            dom.style[key] = style(scroll);

        }
    }
}
//每个步骤动画设置   
const step1Animation = (precentObj: PrecentObj) => {
    const { precentStart, precent1, precent2 } = precentObj

    // if (process.value > precent1) {
    animationMap.set(step1.value, getDomAnimation(precent1, precent2, step1.value))
    // }

    for (const item of step1.value.children) {
        animationMap.set(item, getDomAnimation(precentStart, precent1, item))
    }
}
const step2Animation = (precentObj: PrecentObj) => {
    const { precentStart, precent1, precent2, precent3, precent4 } = precentObj
    // animationMap.set(step2.value, getDomAnimation(precent3, precent4, step2.value))

    for (const item of step2.value.children) {
        animationMap.set(item, getDomAnimation(precent1, precent2, item))
    }

}
const step3Animation = (precentObj: PrecentObj) => {
    // const { precentStart, precent1, precent2,precent3 ,precent4} = precentObj

    // for (const item of step3.value.children) {
    // }

}
const introduceAnimation = (precentObj: PrecentObj) => {
    const { precent1, precent2, precent3 } = precentObj;
    if (process.value < precent3) {
        animationMap.set(introduce.value, getDomAnimation(precent1, precent2, introduce.value))
        introduce.value.style.opacity = 1
    } else {
        introduce.value.style.opacity = 0
        // animationMap.set(introduce.value, getDomAnimation(precent1, precent2, introduce.value))
    }

}
//将当前scroll下的dom动画属性写入animationMap
const updateMap = () => {
    animationMap.clear();

    const precentObj: PrecentObj = initPrecent()

    step1Animation(precentObj)
    step2Animation(precentObj)
    step3Animation(precentObj)

    introduceAnimation(precentObj)
    // for (const item of fish.value.children) {
    //     animationMap.set(item, getDomAnimation(scrollStart, scrollEnd, item))
    // }

}
//设置具体css属性
const getDomAnimation = (scrollStart: number, scrollEnd: number, dom: any) => {
    let styleMap = new Map();
    styleMap.clear();
    for (let key in dom.dataset) {
        const valueList = dom.dataset[key].split("-");
        const suffix = valueList.length > 1 ? valueList[2] : ''

        styleMap.set(key, createAnimation(scrollStart, scrollEnd, Number(valueList[0]), Number(valueList[1]), suffix));
    }

    // const opacityAnimation = createAnimation(scrollStart, scrollEnd - scrollEnd / 5, 0.5, 1);
    // const opacity = function (scroll: number) {
    //     return opacityAnimation(scroll)
    // }

    return styleMap
}
//根据scroll线性曲线返回css属性值

const createAnimation = (scrollStart: number, scrollEnd: number, valueStart: any, valueEnd: any, suffix?: string) => {


    return function (scroll: number) {
        if (scroll < scrollStart) {
            return valueStart
        }
        if (scroll > scrollEnd) {
            return valueEnd
        }
        let res = valueStart + (valueEnd - valueStart) * (scroll - scrollStart) / (scrollEnd - scrollStart)

        if (suffix) {
            return res + suffix
        } else {
            return res
        }

    }
}


onMounted(() => {
    updateStyles(process.value);
    getHotComments();
})



</script>

<style lang="scss" scoped>
.bg {
    height: 200vh;
    position: relative;

    .fish {
        position: sticky;
        position: -webkit-sticky;
        top: var(--nav-height-negative);
        left: 0;
        height: 100vh;
        background: radial-gradient(circle at 25% 65%, rgb(var(--color-rgb) / .4), #0000 25%) no-repeat local,
            radial-gradient(circle at 75% 35%, rgb(var(--color-sub-rgb) / .4), #0000 25%) no-repeat local var(--h-bg);
        color: var(--font-color);
        background-size: 100% 100%;

        .step {
            position: relative;
            align-items: center;
            height: 100%;
            padding-top: var(--nav-height);

            .step_bg {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                -webkit-backdrop-filter: saturate(1.8) blur(20px);
                backdrop-filter: saturate(1.8) blur(20px);
            }

            .mb {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                -webkit-backdrop-filter: saturate(1.8) blur(20px);
                backdrop-filter: saturate(1.8) blur(20px);
            }






        }

        .step1 {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            z-index: 4;
            overflow: hidden;

            .comment {
                padding: var(--edge-lr);

                padding: 0 var(--edge-lr);
                position: relative;
                height: 100%;

                .comment_list {
                    gap: 1em;
                    break-inside: avoid;
                    columns: 15rem auto;
                    height: 100%;

                }

                .title {
                    font-size: var(--font-size-medium);
                    font-weight: var(--font-weight-title);
                    color: var(--font-color);
                    margin: 0.8rem 0 0.4rem 0;

                }

                .comment_box {
                    display: block;
                    break-inside: avoid;
                    margin-bottom: 1.5rem;
                    padding: var(--gap-divs);
                    background: var(--s-bg, rgb(255 255 255 / .5));
                    border: thin solid transparent;
                    border-radius: var(--radius);
                    box-shadow: var(--box-shadow-white);
                    cursor: pointer;
                    position: relative;
                    font-size: var(--font-size-small);
                    color: var(--font-color);
                    transition-duration: 0.8s;

                    &:hover {
                        color: hsl(var(--theme-color));
                        border-color: hsl(var(--theme-color));
                    }

                    .head_img {
                        position: absolute;
                        left: 0;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        height: 1.5rem;
                        width: 1.5rem;
                        border-radius: 50%;
                        border: var(--border);
                        overflow: hidden;

                        svg {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .comment_title {
                        font-weight: var(--font-weight-title);
                        font-size: var(--font-size-medium);
                        display: flex;
                        align-items: flex-end;

                        time {
                            opacity: 0.4;
                            margin-left: 0.5rem;
                            font-size: var(--font-size-small);
                        }
                    }

                    .comment_content {
                        text-align: justify;
                        word-break: break-all;
                        overflow: hidden;
                        /* 文本溢出时省略号显示 */
                        text-overflow: ellipsis;
                        /* 将对象作为弹性伸缩盒子模型显示  */
                        display: -webkit-box;
                        /*第几行裁剪*/
                        -webkit-line-clamp: 3;
                        /* 设置或检索伸缩盒对象的子元素的排列方式 */
                        -webkit-box-orient: vertical;
                    }

                    .comment_from {
                        opacity: 0.4;
                        margin-top: 0.5rem;
                    }
                }
            }

        }

        .step2 {
            overflow: hidden;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            z-index: 3;
            opacity: 1;
            display: flex;
            align-items: center;
            padding-left: 4rem;

            .about {
                width: calc(min(18rem, 50%));
                margin: 0 0.5rem;

            }

            // overflow: hidden;
            .box {
                margin-bottom: 1rem;

                padding: var(--gap-divs);
                border: thin solid transparent;
                border-radius: var(--radius);
                box-shadow: var(--box-shadow-white);
                width: 100%;
                height: 12rem;
                font-size: var(--font-size-small);
                transition: .2s;
                background: var(--s-bg, rgb(255 255 255 / .5));

                --temper: 1%;
                --character: 90%;
                --distory: 80%;
                --temper-color: #ffff00;
                --character-color: #54b5b7;
                --distory-color: #947bd8;

                &:hover {
                    // box-shadow: var(--box-shadow-white), 0 0 0 2px rgb(255 255 255 / 40%);
                    // background: rgb(255 255 255 / 50%);
                    // color: hsl(var(--theme-color));
                    border-color: hsl(var(--theme-color));
                }

                .title {
                    font-weight: var(--font-weight-title);
                    font-size: var(--font-size-normal);

                }

                .rank_title {
                    text-align: center;
                    margin: 0.5rem 0 0.2rem 0;
                    font-weight: var(--font-weight-title);

                    &::after {
                        font-weight: var(--font-weight-normal);
                        font-size: var(--font-size-toosmall);
                    }

                }

                .rank {
                    display: flex;
                    align-items: center;
                    position: relative;
                    margin: 0.3rem 0;
                    height: 1rem;

                    span {
                        flex-shrink: 0;
                        width: 2rem;
                        line-height: 0.6rem;
                        text-align: center;
                        margin: 0 0.3rem;
                    }

                    .line {
                        flex: 1;
                        height: 0.6rem;
                        border-radius: 0.25rem;
                        overflow: hidden;
                        background: rgb(255 255 255 / .2);
                        cursor: pointer;
                        transition: .2s;
                        border: 2px solid transparent;

                        &:hover {
                            transform: scaleY(1.1) scaleX(1.03);
                            box-shadow: var(--box-shadow);
                            border: 2px solid #eee;
                        }

                        i {
                            display: block;
                            border-radius: 0.25rem;
                            height: 100%;
                        }

                    }

                }

                .temper {
                    i {
                        width: var(--temper);
                        background: var(--temper-color);
                    }
                }

                .character {
                    i {
                        width: var(--character);
                        background: var(--character-color);

                    }
                }

                .distory {
                    i {
                        width: var(--distory);
                        background: var(--distory-color);

                    }
                }



            }

            .aboutme {
                --energy: 37%;
                --jugment: 47%;
                --energy-color: #a9f995;
                --jugment-color: #b38136;

                .connect {
                    display: flex;
                    align-items: center;
                    height: 1.8rem;
                    overflow: hidden;

                    h6 {
                        margin-right: 0.5rem;
                        font-weight: var(--font-weight-title);
                    }

                    p {
                        align-items: flex-start;
                    }

                    a {
                        display: block;
                        cursor: pointer;
                        margin: 0 0.5rem;

                        &:hover {
                            transform: scale(1.05);
                        }

                        svg {
                            width: 2rem;
                        }
                    }
                }

                .rank_title {
                    margin: 0;
                }

                .rank {
                    margin: 0.2rem;
                }

                .energy {
                    i {
                        width: var(--energy);
                        background: var(--energy-color);
                    }
                }

                .jugment {
                    i {
                        width: var(--jugment);
                        background: var(--jugment-color);

                    }
                }
            }

            .peoty {
                .front {
                    padding: 1rem;
                }

                p {

                    padding: 0.15rem 0.1rem;
                }

                .box_peoty {
                    padding-top: 0.5rem;
                    font-size: var(--font-size-small);
                }

            }


            .game {
                --lol: 80%;
                --lol-text: '超凡大师387分';
                --lol-color: #002db3;
                --valorant: 60%;
                --valorant-text: '神话3000';
                --valorant-color: #00ffff;
                --yjwj: 40%;
                --yjwj-text: '坠日';
                --yjwj-color: #ff0000;

            }

            .lol {
                .rank_title::after {
                    content: var(--lol-text);
                    margin-left: 0.4rem;
                }

                i {
                    width: var(--lol);
                    background: var(--lol-color);
                }
            }

            .valorant {
                .rank_title::after {
                    content: var(--valorant-text);
                    margin-left: 0.4rem;
                }

                i {
                    width: var(--valorant);
                    background: var(--valorant-color);
                }
            }

            .yjwj {
                .rank_title::after {
                    content: var(--yjwj-text);
                    margin-left: 0.4rem;
                }

                i {
                    width: var(--yjwj);
                    background: var(--yjwj-color);
                }

            }



        }

        .fish_introduce {
            transition: .2s;
            margin: 0 4rem;
            position: absolute;
            right: 0;
            z-index: 10;
            top: 80%;

            img {
                width: 9rem;
                display: block;
                border-radius: 0.2rem;

            }

            p {
                font-weight: var(--font-weight-title);
                font-size: var(--font-size-medium);
            }
        }

        .box_fish {
            width: 5rem;
            height: auto;
            left: -8rem;
            top: 50%;
            transform: rotate(60deg) translateY(-50%);
            padding: 0.2rem;
            position: absolute;
            transition: .3s 2s var(--animation-in);
            cursor: pointer;
            z-index: 3;
            border-radius: 0.2rem;


            p {
                opacity: 1;
                font-size: var(--font-size-small);
            }

            img {
                display: block;
                width: 100%;
                border-radius: 0.3rem;
            }

            &:hover,
            &[data-show="true"] {
                left: 0rem;
                transform: rotate(0) translateY(-50%);
                // border: var(--border);
                background: var(--s-bg, rgba(255, 255, 255, 0.5));
                transition: .3s var(--animation-in);

                p {
                    opacity: 1;
                }
            }
        }
    }
}

@media screen and (max-width: 1750px) {
    .fish_introduce {
        display: none;
    }

    .bg {
        .fish {
            .step2 {
                padding-left: 0;
                justify-content: center;
            }
        }

    }
}

@media screen and (max-width: 1000px) {
    .bg {
        height: auto;

        .fish {
            height: auto;
            position: relative;

            .step {
                position: static;
                height: auto;
                margin-bottom: 1rem;
            }

            .step2 {
                flex-wrap: wrap;
                padding: 0;

                .about {
                    width: 100%;
                }
            }
        }
    }

}
</style>

<style lang="scss"></style>
