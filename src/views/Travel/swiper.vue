<template>
    <div class="swiper">
        <div class="nav_swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="itemImg in slideList" :key="itemImg.uid">
                    <div class="nav_item">
                        <div class="frame">
                            <img :src="itemImg.url" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="swiper-scrollbar"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toRefs, watch, onMounted, onUnmounted } from 'vue'
import Swiper from "swiper"
import 'swiper/css';
let swiper = [];
const props = defineProps(['slideList', 'travelId']);
const { slideList } = toRefs(props);
const initSwiper = () => {
    swiper.push(new Swiper(".nav_swiper", {
        scrollbar: "true",
        spaceBetween: "30",
        slidesPerView: 'auto',
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    }))
}

const destorySwiper = () => {
    if (swiper.length === 0) {
        return
    }
    if (Array.isArray(swiper[0])) {
        swiper[0].forEach(element => {
            element.destroy(false)
        });
    }
}

onMounted(() => {
    initSwiper()
})
onUnmounted(() => {
    destorySwiper()
})


</script>

<style lang="scss" scoped>
.swiper {
    height: 100%;
}


.nav_swiper {
    height: 100%;

    .swiper-wrapper {
        height: 100%;
        width: 100%;

        .swiper-slide {
            // width: 300px;
            width: auto !important;
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
                // background: url("../../assets/img/background/travel_frame.png");
                background-size: 100% 100%;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                border-radius: 10px;

                img {
                    // width: 100%;
                    height: 100%;
                    // max-height: 90%;
                }
            }

        }
    }


}
</style>