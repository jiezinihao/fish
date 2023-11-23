
<template>
    <div class="connect">
        <a href="https://space.bilibili.com/73785133" target="_blank" class="bilibili">
            <div class="bi">
                <div class="bi_img">
                    <img src="../assets/img/bi_img.jpg" alt="">
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
        <div class="connect_other">
            <a href="">github</a>
            <a href="">QQ</a>
        </div>
    </div>
</template>
<script setup lang="ts">


</script>
<style scoped lang="scss">
a {
    text-decoration: none;
}

.connect {
    .bilibili {
        width: 1100px;
        height: 185px;
        background: url("../assets/img/bi_bg.webp") no-repeat;
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
                    background: url(../assets/img/bi_icon.png) no-repeat;
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
                        background: url(../assets/img/bi_icon.png) no-repeat;
                        background-size: 100% 100%;
                        height: 18px;
                        width: 18px;
                    }

                    &:nth-child(3) {
                        margin-right: 5px;
                        background: url(../assets/img/bi_lv6.jpg) no-repeat;
                        background-size: 100% 100%;
                        width: 25px;
                        height: 11px;
                    }


                    &:nth-child(4) {
                        margin-right: 8px;
                        background: url(../assets/img/bi_vip.webp) no-repeat;
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
        display: flex;
        padding: 20px 0;

        a {
            margin-right: 30px;
            line-height: 30px;
            font-size: 24px;

            &:hover {
                text-decoration: underline;

            }
        }
    }
}</style>
