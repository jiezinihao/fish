<template>
    <div class="swiper">
        <div class="travel-swiper" :style="{ 'width': suffixSwiperWidth }">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in slideList" :key="index" @click="showDetail(item.url)">
                    <div class="travel_img">
                        <img :src="item.url" alt="">
                    </div>
                </div>
            </div>
            <div class="travel-swiper-pagination">
            </div>
        </div>

        <div class="detail" :class="detailControl.show ? 'detail_active' : ''" @click="closeDetail()">
            <img :src="detailControl.url" alt="">
        </div>
    </div>
</template>

<script setup lang="ts">
import { toRefs, watch, onMounted, onUnmounted, ref, computed } from 'vue'
import Swiper from "swiper"
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import { fillSuffix } from '@/func/functions'
let swiper: Swiper

const props = defineProps(['slideList', 'swiperWidth']);
const { slideList, swiperWidth } = toRefs(props);

const suffixSwiperWidth = computed(() => {
    return fillSuffix(String(swiperWidth?.value), 'px')
})
const detailControl = ref({
    show: false,
    url: ''
})


watch(() => slideList?.value, () => {
    swiper.update()
})
//通过监听width更新swiper
watch(() => suffixSwiperWidth?.value, (val) => {


    if (typeof (swiper) !== 'undefined') {
        swiper.update()
    }
})

const destorySwiper = () => {
    if (typeof (swiper) === 'undefined') {
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
    swiper = new Swiper('.travel-swiper', {
        spaceBetween: 0,
        slidesPerView: 1,
        pagination: {
            el: '.travel-swiper-pagination',
        },
        modules: [Pagination],
    });
})
onUnmounted(() => {
    destorySwiper()
})

</script>

<style lang="scss" scoped>
.swiper {
    height: 100%;
    display: flex;
    justify-content: center;
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


<style lang="scss">
.travel-swiper {
    .travel-swiper-pagination {
        position: absolute;
        left: 50%;
        bottom: 0.3rem;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99;
        .swiper-pagination-bullet {
            width: 0.15rem;
            height: 0.15rem;
            background: hsl(var(--font-color)/0.5);
            border-radius: 50%;
            margin: 0 5px
        }
        .swiper-pagination-bullet-active{
            width: 0.2rem;
            height: 0.2rem;
            background: hsl(var(--font-color));
        }
    }
}
</style>
