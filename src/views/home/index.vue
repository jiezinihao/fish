<template>
  <div class="home">
    <canvas id="canvas"></canvas>
    <Nav :process="process" @toTop="toTop" @updateTheme="updateTheme"></Nav>
    <div class="body" ref="body">
      <!-- <Transition>
        <component :is="tabsComponents[currentTab-1]"></component>
      </Transition> -->
      <!-- <template :is="'connect'"></template> -->
      <!-- <menu1></menu1> -->
      <!-- <notes></notes> -->
      <router-view v-slot="{ Component }">
        <transition>
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, provide, readonly } from 'vue'
// import initLoginBg from "./init.ts"
import { useRouter, useRoute } from 'vue-router';
import Nav from "../../components/Nav/index.vue"

const body = ref<any>(null);
let theme = ref<string | null>();
let process = ref<number>(0);
let processOrigin = ref<number>(0)

//滚动监听透传Props
provide('process', readonly(processOrigin));
provide('theme', readonly(theme));

const handleScroll = (event: any) => {
  const scrollHeight = event.target.scrollHeight
  const scrollTop = event.target.scrollTop
  const clientHeight = event.target.clientHeight

  const value = Number(Math.ceil((scrollTop / (scrollHeight - clientHeight)) * 100))
  process.value = isNaN(value) ? 0 : value
  processOrigin.value = scrollTop
}

const toTop = () => {
  body.value.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",//平滑滚动
  });
}
//主动更新主题
const updateTheme = ()=>{
  theme.value = localStorage.getItem('theme');
  console.log(localStorage.getItem('theme'));
  
}

const resize = ()=>{
  window.onresize = () => {
    // console.log('resize');
    // initLoginBg();
  }
}

onMounted(() => {
  //初始化主题
  updateTheme();
  //监听body滚动
  body.value.addEventListener('scroll', handleScroll);


  resize()
})

</script>

<style scoped lang="scss">
#canvas {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;

}

.home {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;

  // background: var(--vt-c-black);


  .body {
    width: 100%;
    height: 100%;
    position: relative;
    padding-top: var(--nav-height);
    transition: .2s;
    z-index: 101;
    overflow-y: scroll;
    overflow-x: hidden;
  }
}

.v-leave-from {
  position: absolute;
  top: 0;
  opacity: 1;
  width: 100%;
  padding-top: var(--nav-height);
}

.v-leave-active {
  position: absolute;
  top: 100vh;
  transition: 0.5s ease;
  opacity: 0;
  width: 100%;
  padding-top: var(--nav-height);

}

.v-enter-from {
  position: absolute;
  top: -100vh;
  opacity: 0;
  width: 100%;
  padding-top: var(--nav-height);
}

.v-enter-to {
  position: absolute;
  top: 0;
  opacity: 1;
  transition: 0.5s ease;
  width: 100%;
  padding-top: var(--nav-height);
}

// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 0.5s ease;
// }

// .fade-enter-from,
// .fade-leave-to {
//   opacity: 0;
// }</style>
