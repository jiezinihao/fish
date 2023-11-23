<script setup lang="ts">
// import menu1 from "../../components/menu.vue"
// import notes from "../../components/notes.vue"
// import travel from "../../components/travel.vue"
import connect from "../../components/connect.vue"


</script>
<template>
  <div class="home">
    <div class="home_nav">
      <div class="home_nav_item home_nav_item_active">
        随记
      </div>
      <div class="home_nav_item">
        traval
      </div>
      <div class="home_nav_item">
        联系
      </div>
    </div>
    <div class="body">
      <!-- <menu1></menu1> -->
      <!-- <notes></notes> -->
      <connect></connect>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  position: relative;
  height: 100%;
  width: 100%;

  .home_nav {
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 80px;
    display: flex;
    padding-left: 120px;
    background: #574f7d;

    .home_nav_item {
      height: 100%;
      color: white;
      font-size: 24px;
      line-height: 80px;
      padding: 0 20px;
      cursor: pointer;
      transition: 0.5s ease;
      position: relative;

      &:hover {
        text-shadow: 5px 5px 10px #333;
      }

      &.home_nav_item_active::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 80%;
        transform: translate(-50%, 0);
        height: 8px;
        background: #95adbe;
      }
    }
  }

  .body {
    width: 100%;
    height: 100%;
    background: #e0f0ea;
    padding: 120px;
  }
}
</style>
