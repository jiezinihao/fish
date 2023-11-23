<template>
    <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xxx"></use>
    </svg>
</template>
<script setup lang="ts">
defineProps({
    name: {
        type: String,
        default: ''
    },
    svgClass: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: ''
    }
})
</script>