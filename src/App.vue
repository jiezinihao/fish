<script setup lang="ts">
import home from './views/home/index.vue'


</script>

<template>
  <home></home>
</template>

<style>
:root {
  --divider-black: rgba(84, 84, 84, .68);
  --divider-light: rgba(60, 60, 60, .29);
}

/* * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  width: 100%;
  height: 100%;
  overflow: hidden;

} */

body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--h-bg);
}

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
