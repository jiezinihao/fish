<template>
    <div class="travel-list">
        <el-scrollbar>
            <div class="travel_list_item">
                <div class="nav_item" v-for="itemImg in slideList" :key="itemImg.uid">
                    <div class="frame">
                        <img :src="itemImg.url" alt="">
                    </div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { toRefs, onMounted, onUnmounted, ref } from 'vue'
const props = defineProps(['slideList', 'travelId']);
const { slideList } = toRefs(props);


onMounted(() => {
})
onUnmounted(() => {
})


</script>

<style lang="scss" scoped>
.travel-list {
    height: 100%;

    .travel_list_item {
        display: flex;
        align-items: center;
        height: 390px;
        padding: 20px 0;
    }
    .nav_item {
        // height: 100%;
        overflow: hidden;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        // border: 3px solid rgba(88, 175, 223, 0.3);
        background: #23272f;
        border-radius: 10px;
        padding: 10px;
        overflow: hidden;
        margin: 20px 10px;
        height: 100%;
        .frame {
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
</style>