<template>
    <div class="connect">
        <div class="container">
            <div class="connect_other">
                <p>B站主页：</p>
                <a href="https://space.bilibili.com/73785133" target="_blank" class="bilibili">
                    <div class="bi">
                        <div class="bi_img">
                            <img src="../../assets/img/bi_img.jpg" alt="">
                            <span></span>
                        </div>
                        <div class="bi_con">
                            <div class="bi_tit">
                                <span>BigCat_</span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span>抱狸龙</span>
                                <span>12</span>
                            </div>
                            <div class="bi_span">
                                一路风雨我在前Dennis
                            </div>
                        </div>
                    </div>
                </a>
            </div>

            <div class="connect_other">
                <p>其他平台</p>
                <a href="" target="_blank">github</a>
                <a href="https://gitee.com/jiezinihao/projects">gitee</a>
                <a href="mailto:1275401327@QQ.com">QQ邮箱</a>
                <a href="mailto:g1275401327@gmail.com">谷歌邮箱</a>
            </div>
            <div class="connect_msg">
                <h3>
                    Say to Fish
                </h3>
                <Comment :commentId="99" :mark="'m'"></Comment>
            </div>
        </div>
        <Foot></Foot>

    </div>

</template>
<script setup lang="ts">
import Foot from "@/components/Foot/index.vue"
import Comment from "@/components/Comment/index.vue"
</script>
<style scoped lang="scss">
a {
    text-decoration: none;
}

.connect {
    width: 100%;

    .container {
        border-radius: 10px;
        padding-left: 3rem;
        min-height: 90vh;
        margin-bottom: 2rem;
    }

    .bilibili {
        width: 1100px;
        height: 185px;
        background: url("../../assets/img/bi_bg.webp") no-repeat;
        background-size: 100% 100%;
        display: flex;
        padding-top: 116px;
        padding-bottom: 16px;
        cursor: pointer;
        overflow: hidden;
        transition: .2s ease;
        border: 1px solid transparent;
        border-radius: 5px;

        &:hover {
            border: 1px solid #ffc14d;
        }

        .bi {
            margin-left: 20px;
            height: 100%;
            display: flex;
            align-items: center;

            .bi_img {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                // overflow: hidden;
                position: relative;
                border: 2px solid hsla(0, 0%, 100%, .4);

                img {
                    width: 100%;
                    height: 100%;
                    display: block;
                    border-radius: 50%;

                }

                span {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    width: 18px;
                    height: 18px;
                    background: url(../../assets/img/bi_icon.png) no-repeat;
                    background-size: 100% 100%;

                }
            }
        }

        .bi_con {
            margin-left: 22px;

            .bi_tit {
                display: flex;
                align-items: center;
                color: white;

                span {
                    &:nth-child(1) {
                        margin-right: 5px;
                        font-weight: 700;
                        line-height: 18px;
                        font-size: 18px;
                    }

                    &:nth-child(2) {
                        margin-right: 5px;
                        background: url(../../assets/img/bi_icon.png) no-repeat;
                        background-size: 100% 100%;
                        height: 18px;
                        width: 18px;
                    }

                    &:nth-child(3) {
                        margin-right: 5px;
                        background: url(../../assets/img/bi_lv6.jpg) no-repeat;
                        background-size: 100% 100%;
                        width: 25px;
                        height: 11px;
                    }


                    &:nth-child(4) {
                        margin-right: 8px;
                        background: url(../../assets/img/bi_vip.webp) no-repeat;
                        background-size: 100% 100%;
                        height: 20px;
                        width: 69px;
                    }

                    &:nth-child(5) {
                        width: 37px;
                        height: 16px;
                        border-color: rgb(141, 124, 166);
                        color: rgb(255, 255, 255);
                        background-image: linear-gradient(90deg, rgb(141, 124, 166), rgb(141, 124, 166));
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: 400;
                        font-size: 10px;
                    }

                    &:nth-child(6) {
                        border: 0.5px solid rgb(141, 124, 166);
                        color: rgb(141, 124, 166);
                        width: 18px;
                        height: 16px;
                        background: #fff;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 10px;
                    }
                }
            }

            .bi_span {
                margin-top: 6px;
                background: transparent;
                border-radius: 4px;
                border: none;
                box-shadow: none;
                color: hsla(0, 0%, 100%, .8);
                font-size: 12px;
                font-family: Microsoft Yahei;
                line-height: 26px;
                height: 26px;
                margin-left: -5px;
                padding: 0 5px;
                position: relative;
                top: -1px;
                width: 730px;
                font-weight: 400;
            }
        }
    }

    .connect_other {
        padding: 20px 0;
        line-height: 30px;
        font-size: 24px;
        border-bottom: var(--border);

        p {
            margin-bottom: 20px;
        }

        a {

            color: #999;
            margin-right: 30px;

            &:hover {
                text-decoration: underline;

            }
        }
    }

    .connect_msg {
        border-radius: 5px;
        padding-right: 0;
        margin-top: 10px;

        h3 {
            font-size: 28px;
        }

        .connect_msg_con {
            margin: 20px 0;
            border-top: 1px solid #333;

            p {
                em {
                    font-weight: bold;
                }

                font-size: 18px;
                margin: 20px 0;
            }
        }

        h4 {
            font-size: 20px;
            margin: 30px 0 10px 0;
        }


    }
}

@media (max-width:1200px) {
    .connect {
        width: 100%;

        .container {
            padding-left: 1rem;
            width: 100%;
            .connect_other{
                font-size: var(--font-size-medium);
                p{
                    font-size: var(--font-size-title);
                }
                .bilibili{
                    background-size: auto 100%;
                }
            }
        }
    }
}
@media (max-width:500px) {
    .connect {
        width: 100%;

        .container {
            padding-left: 0.2rem;
            width: 100%;
            .connect_other{
                font-size: var(--font-size-medium);
                p{
                    font-size: var(--font-size-title);
                }
                .bilibili{
                    background-size: auto 100%;
                }
            }
        }
    }
}
</style>
