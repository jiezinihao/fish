<script setup lang="ts">
import menu1 from "../../components/menu.vue"
</script>
<template>
  <div class="home">
    <!-- <div class="home_nav">
      <div class="nav_before nav_decorate"></div>
      <div class="nav">
        <div class="nav_item">
          <h1>
            FISH
          </h1>
        </div>
        <div class="nav_item">
          <h1>
            黄山
          </h1>
        </div>
        <div class="nav_item">
          <h1>
            武功山
          </h1>
        </div>
        <div class="nav_item">
          <h1>
            ABOUT&CONNECT
          </h1>
        </div>
      </div>
      <div class="nav_after nav_decorate"></div>
    
    </div> -->
    <menu1></menu1>
  </div>
</template>

<style scoped lang="scss">
@keyframes smoothBackground {

  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.home {
  width: 100%;
  min-height: 100vh;
  position: relative;

  .home_nav {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #b37f36;
    left: 0;
    top: 0;
    z-index: 100;

    .nav {
      width: 100%;
      height: 70%;
      position: absolute;
      transform: translate(-50%, -50%) rotate(-45deg);
      left: 50%;
      top: 50%;

      .nav_item {
        // background: linear-gradient(to right,);
        height: 150px;
        padding: 0;
        color: white;
        font-size: 50px;
        width: 100%;
        text-align: center;
        line-height: 150px;
        cursor: pointer;
        background: linear-gradient(90deg, #4dfff4 0%, #36b3ab 50%, #4dfff4 100%);
        background-size: 200% 100%;
        background-position: 0 0;
        animation: smoothBackground 8s infinite linear alternate;
        transition: .3s ease;

        h1 {
          widows: 100%;
          height: 100%;
          background: #ffc14d;
        }

        &:hover {
          padding: 20px 0;

        }
      }
    }
  }
}
</style>
