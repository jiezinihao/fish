<template>
    <div class="swiper">
        <div class="travel-swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in slideList" :key="index">
                    <div class="travel_img">
                        <img :src="item.url" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toRefs, watch, onMounted, onUnmounted, ref } from 'vue'
import Swiper from "swiper"
import 'swiper/css';
let swiper = ""

const props = defineProps(['slideList']);
const { slideList } = toRefs(props);
const fristLoading = ref(true)

watch(() => slideList.value, (val) => {

    if (fristLoading) {
        swiper = new Swiper('.travel-swiper', {
            spaceBetween: 0,
            slidesPerView: '1',
        });
        fristLoading.value = false
    }
    if (swiper !== '') {
        swiper.slideTo(0, 0)
    }
})

const destorySwiper = () => {
    if (swiper === '') {
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

onMounted(() => {

    console.log(swiper);

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
</style>