<script setup lang="ts">
import home from './views/home/index.vue'

</script>

<template>
  <home></home>
</template>

<style>
:root {
  --vt-c-black: #23272f;
  --vt-c-black-pure: #000000;
  --vt-c-black-soft: #242424;
  --vt-c-black-mute: #2f2f2f;
  --divider-black:rgba(84, 84, 84, .68);
  --divider-light:rgba(60, 60, 60, .29);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  width: 100%;
  height: 100%;
  overflow: hidden;

}

body {
  width: 100%;
  height: 100%;
  overflow: hidden;

}

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}</style>
