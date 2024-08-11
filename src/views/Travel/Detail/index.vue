<template>
    <div class="travel">
        <div class="travel_body">
            <TravelDetail :beforePosition="false" :travelId="travelId">
            </TravelDetail>
        </div>
        <Foot></Foot>
    </div>
</template>

<script setup lang="ts">
//暂时废弃
import TravelDetail from '@/components/TravelDetail/index.vue'
import { onMounted, ref } from 'vue';
import Foot from "@/components/Foot/index.vue"
import { useRouter } from 'vue-router';

const router = useRouter()
const travelId = ref(router.currentRoute.value.query.id)

onMounted(() => {

})

</script>

<style lang="scss" scoped>
.travel {
    height: 100%;
    .travel_body{
    height: 100%;

    }
}
</style>