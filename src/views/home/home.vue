<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
// import menu1 from "../../components/menu.vue"
import notes from "../../components/notes.vue"
import travel from "../../components/travel.vue"
import connect from "../../components/connect.vue"
let currentTab = ref(1);
let nav = ref<any>(null);
//栏目信息
const tabs = reactive([
  {
    id: 1,
    name: "随记",
    leftPosition: 50
  },
  {
    id: 2,
    name: "旅行",
    leftPosition: 150
  },
  {
    id: 3,
    name: "联系",
    leftPosition: 250
  },
]);
const tabsComponents = [
  notes, travel, connect
]
const changeNav = (item: any) => {
  currentTab.value = item.id;

}

const listenerFont = () => {
  let div = nav.value;
  //获取手指初始坐标
  let startX = 0;
  let index = -1;//选中哪一个tabs，默认值为-1，表示未匹配到
  let active = false;
  div.addEventListener("mousedown", (e: any) => {
    active = true
    //获取手指初始坐标
    startX = e.pageX - 120;
    tabs.forEach((item, i) => {
      if (startX > item.leftPosition && startX < item.leftPosition + 80) {
        index = i;//

      }
    })
    e.preventDefault(); //阻止屏幕滚动的默认行为

  });
  div.addEventListener("mousemove", (e: any) => {

    if (active && index >= 0) {
      tabs[index].leftPosition = e.pageX - 120
    }
  });
  div.addEventListener("mouseup", (e: any) => {
    if (active) {

      tabs.forEach((item,i) => {
        if (index !== i && Math.abs(e.pageX - item.leftPosition - 120) < 90) {
          if (e.pageX - item.leftPosition - 120 < 0) {
            item.leftPosition += 90
          } else {
            item.leftPosition -= 90
          }
        }
      })
    }
    active = false;

  });
}
onMounted(() => {
  listenerFont()
})

</script>
<template>
  <div class="home">
    <div class="home_nav" ref="nav">
      <div class="home_nav_item" :class="item.id == currentTab ? 'home_nav_item_active' : ''" v-for="(item) in tabs"
        @click="changeNav(item)" :style="'left:' + item.leftPosition + 'px'">
        {{ item.name }}
      </div>
    </div>
    <div class="body">
      <Transition>
        <component :is="tabsComponents[currentTab-1]"></component>
      </Transition>
      <!-- <template :is="'connect'"></template> -->
      <!-- <menu1></menu1> -->
      <!-- <notes></notes> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: #9a97aa;

  .home_nav {
    position: fixed;
    top: 20px;
    z-index: 100;
    width: calc(100% - 240px);
    margin: 0 120px;
    height: 110px;
    padding-left: 120px;
    padding: 10px 40px;
    border-radius: 11px;
    border-radius: 12px;
    background: #574f7d;
    box-shadow: inset 9px 9px 18px #4e4771,
      inset -9px -9px 18px #60578a;

    .home_nav_item {
      height: 80px;
      color: white;
      font-size: 24px;
      width: 80px;
      border-radius: 20px;
      background: linear-gradient(145deg, #5d5586, #4e4771);
      box-shadow: 5px 5px 10px #443e62,
        -5px -5px 10px #6a6099;
      cursor: pointer;
      transition: 0.3s ease-out;
      position: absolute;
      top: 15px;
      display: flex;
      align-items: center;
      justify-content: center;


      &:hover {
        // text-shadow: 5px 5px 10px #333;
      }

      &.home_nav_item_active::after {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 100;
        border: 2px solid #9a97aa;
        border-radius: 20px;
      }
    }
  }

  .body {
    width: 100%;
    height: 100%;
    background: #9a97aa;
    margin: 120px;
    position: relative;
  }
}

.v-leave-from {
  position: absolute;
  top: 0;
}

.v-leave-active {
  position: absolute;
  top: 100vh;
  transition: 0.5s ease;
}

.v-enter-from {
  position: absolute;
  top: -100vh;
}

.v-enter-to {
  position: absolute;
  top: 0;
  transition: 0.5s ease;
}
</style>
