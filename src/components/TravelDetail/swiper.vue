<template>
    <div class="swiper">
        <div class="travel-swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in slideList" :key="index" @click="showDetail(item.url)">
                    <div class="travel_img">
                        <img :src="item.url" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="detail" :class="detailControl.show ? 'detail_active' : ''" @click="closeDetail()">
            <img :src="detailControl.url" alt="">
        </div>
    </div>
</template>

<script setup lang="ts">
import { toRefs, watch, onMounted, onUnmounted, ref } from 'vue'
import Swiper from "swiper"
import 'swiper/css';
let swiper: Swiper

const props = defineProps(['slideList']);
const { slideList } = toRefs(props);
const fristLoading = ref(true)
const detailControl = ref({
    show: false,
    url: ''
})
watch(() => slideList?.value, () => {

    if (fristLoading) {
        swiper = new Swiper('.travel-swiper', {
            spaceBetween: 0,
            slidesPerView: 1,
        });
        fristLoading.value = false
    }
    //清楚残留页数，滚动到第一页
    
    if (typeof (swiper) !== undefined) {
        swiper.update()
    }
})

const destorySwiper = () => {
    if (typeof (swiper) !== undefined) {
        return
    }
    if (Array.isArray(swiper)) {
        swiper.forEach(element => {
            element.destroy(false)
        });
    } else {
        swiper.destroy(false)
    }
}
const showDetail = (url: string) => {
    detailControl.value.show = true
    detailControl.value.url = url;
}
const closeDetail = () => {
    detailControl.value.show = false
    detailControl.value.url = '';
}

onMounted(() => {

})
onUnmounted(() => {
    destorySwiper()
})

</script>

<style lang="scss" scoped>
.swiper {
    height: 100%;
}


.travel-swiper {
    height: calc(100% - 240px);
    overflow: hidden;
    background: rgba($color: #23272f, $alpha: 0);

    .swiper-slide {
        overflow: hidden;
        height: 100%;
    }

    background: rgba($color: #23272f, $alpha: 0);

    position: relative;
    left: 0;
    top: 0;
    width: 600px;
    flex-shrink: 0;
    transition: .5s ease;
    border-radius: 5px;
    overflow: hidden;
    height: 100%;

    .travel_img {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
}

.detail {
    position: fixed;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    overflow: hidden;
    background: rgba($color: #23272f, $alpha: 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: width 0s .6s, height 0s .6s, opacity .5s ease;

    img {
        max-width: 90%;
        max-height: 90%;
    }

    &.detail_active {
        z-index: 1000;
        opacity: 1;
        transition: width 0s, height 0s, opacity .5s ease;
        width: 100vw;
        height: 100vh;
    }
}
</style>