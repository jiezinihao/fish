<template>
    <div ref="menu" class="menu">
        123
    </div>
</template>
<script setup lang="ts">
import * as THREE from "three"
import { ref, onMounted } from 'vue'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import * as gsap from 'gsap'
// import { GUI } from "three/examples/jsm/libs/lil-gui.module.min";

//返回三角形另一边长度
const bevelLength = (a: number, b: number) => {
    if (a <= 0 || b <= 0) {
        return
    }
    console.log(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)).toFixed(0));
    
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)).toFixed(0);
}
//创建菜单cube
const createNavItem = () => {
    const geometry = new THREE.BoxGeometry(80, bevelLength(Number(window.innerWidth), Number(window.innerHeight)), 20);
    const sphareTexture = new THREE.TextureLoader().load("/src/assets/material/menuItem.png")
    const material = new THREE.MeshBasicMaterial({ map: sphareTexture })
    const cube = new THREE.Mesh(geometry, material);
    return cube
    // scene.add(cube);
}

const createNav = ()=>{
    const material = new THREE.MeshBasicMaterial({color:"#b37f36"})
    const planeGeometry = new THREE.PlaneGeometry(window.innerWidth,window.innerHeight);
    const plane = new THREE.Mesh(planeGeometry,material)
   createNavItem()
}

const createBg = ()=>{
    const material = new THREE.MeshBasicMaterial({color:"#b37f36"})
    const planeGeometry = new THREE.PlaneGeometry(window.innerWidth,window.innerHeight);
    const plane = new THREE.Mesh(planeGeometry,material)
    console.log(plane);
    plane.rotation.set(0,0,0)
    scene.add(plane)
}

//绘制
const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera)
    controls.update();
}


let menu = ref<any>(null)
// import { toRaw } from "@vue/reactivity"
const scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, -5, 100);
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
scene.add(camera)
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

//轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
createNavItem()
createBg()

animate()


//素材加载管理器
// let textTureManager = {
//     onLoad() {
//         console.log("素材加载完成")
//     },
//     onProgress(url: any, num: any, total: any) {
//         console.log("素材加载完成:" + url);
//         console.log("素材加载进度:" + num);
//         console.log("素材总数:" + total);
//     },
//     onErrror(e: any) {
//         console.log("素材加载失败")
//         console.log(e)
//     },
// }
// const loadingManager = new THREE.loadingManager(textTureManager.onLoad, textTureManager.onProgress, textTureManager.onErrror);
// const textureLoader = new THREE.textureLoader(loadingManager);

// const menuItemTexture = textureLoader.load("")

onMounted(() => {
    console.log(menu);
    
    menu.value.appendChild(renderer.domElement)

})
</script>
<style scoped lang="scss"></style>
  