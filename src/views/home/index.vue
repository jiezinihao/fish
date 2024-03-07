<script setup lang="ts">
import { ref, reactive, onMounted ,watch} from 'vue'
import initLoginBg from "./init.ts"
import { useRouter,useRoute } from 'vue-router';

interface NavList {
  id: number,
  name: string,
  path: string
}

const router = useRouter()
const route = useRoute()

let currentTab = ref('');
let nav = ref<any>(null);


//栏目信息
const tabs = reactive<NavList[]>([
  {
    id: 1,
    name: "随记",
    path: '/notes'
  },
  {
    id: 2,
    name: "旅行",
    path: '/travel'
  },
  {
    id: 3,
    name: "联系",
    path: '/connect'
  },
]);


watch(() => route.path, newPath =>{
  setCurrentNav(newPath)
})
const changeNav = (item: NavList) => {
  setCurrentNav(item.path)
  router.push({
    path: item.path
  })
}

onMounted(() => {
  //节流
  let throttle: any = null;
  let clientWidth = document.body.clientWidth
  // listenerFont()
  initLoginBg()

  window.onresize = () => {
    if (throttle === null && clientWidth !== document.body.clientWidth) {
      throttle = setTimeout(() => {
        initLoginBg()
        clientWidth = document.body.clientWidth
        throttle = null
      }, 1000);
    }
  }
})

const setCurrentNav = (path:string)=>{
  
  currentTab.value = path
}

</script>
<template>
  <div class="home">
    <canvas id="canvas"></canvas>
    <div class="home_nav" ref="nav">
      <div class="home_nav_item" :class="item.path == currentTab ? 'home_nav_item_active' : ''" v-for="(item) in tabs" :key="item.id"
        @click="changeNav(item)">
        {{ item.name }}
      </div>
    </div>
    <div class="body">
      <!-- <Transition>
        <component :is="tabsComponents[currentTab-1]"></component>
      </Transition> -->
      <!-- <template :is="'connect'"></template> -->
      <!-- <menu1></menu1> -->
      <!-- <notes></notes> -->
      <router-view v-slot="{ Component }">
        <transition >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

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
  .home_nav {
    position: relative;
    z-index: 100;
    width: 100%;
    height: 100px;
    padding: 0 120px;
    background: rgba($color: #23272f, $alpha: 0.5);
    display: flex;
    align-items: center;
    border-bottom: 2px solid var(--divider-light);

    .home_nav_item {
      height: 80px;
      color: #999;
      font-size: 28px;
      width: 120px;
      border-radius: 10px;
      cursor: pointer;
      transition: 0.3s ease-in;
      top: 15px;
      display: flex;
      align-items: center;
      justify-content: center;

      &.home_nav_item_active {
        background: rgba(88, 175, 223, .1);
        box-shadow: 2px 2px 5px rgba(88, 175, 223, .2);
        color: #eee;
      }

      &:hover {
        // text-shadow: 5px 5px 10px #333;
      }
    }
  }

  .body {
    width: 100%;
    height: calc(100% - 100px);
    position: relative;
    z-index: 101;

  }
}

.v-leave-from {
  position: absolute;
  top: 0;
  opacity: 1;
}

.v-leave-active {
  position: absolute;
  top: 100vh;
  transition: 0.5s ease;
  opacity: 0;

}

.v-enter-from {
  position: absolute;
  top: -100vh;
  opacity: 0;
}

.v-enter-to {
  position: absolute;
  top: 0;
  opacity: 1;
  transition: 0.5s ease;
}
</style>
