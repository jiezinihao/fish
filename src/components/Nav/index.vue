<template>
    <nav class="home_nav" :class="process > 0 ? 'home_nav_active' : ''" ref="nav">
        <div class="home_nav_list" ref="navListRef">
            <div class="home_nav_mobile" @click="mobileNavClick()">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-Sunset"></use>
                </svg>
            </div>
            <div class="home_nav_con">
                <div class="home_nav_item" :class="str1InStr2(currentTab, item.path) ? 'home_nav_item_active' : ''"
                    v-for="(item) in tabs" :key="item.id" @click="changeNav(item)">
                    {{ item.name }}
                </div>
            </div>
        </div>
        <h2 :data-active="process">
            {{ randomPoetry }}
        </h2>

        <div class="home_nav_opr">
            <i class="theme" @click="changeTheme()" :data-theme="theme">
                <svg class="icon sun" aria-hidden="true">
                    <use xlink:href="#icon-Sunset"></use>
                </svg>
                <svg class="icon moon" aria-hidden="true">
                    <use xlink:href="#icon-Moon"></use>
                </svg>
            </i>

            <span :data-active="process" @click="toTop()">
                {{ process }}
                <!-- <svg class="icon moon" aria-hidden="true">
                    <use xlink:href="#icon-top"></use>
                </svg> -->
                <i class="iconfont">&#xe681;</i>

            </span>

            <!-- <i>BLA</i> -->
        </div>
    </nav>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { ref, reactive, onMounted, watch } from 'vue'
import { RandomPoetry } from "../../func/randomJson.ts"


import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const { process } = defineProps(['process']);
const emit = defineEmits(['toTop'])
interface NavList {
    id: number,
    name: string,
    path: string
}

const router = useRouter()
const route = useRoute()
const randomPoetry = RandomPoetry();
console.log(randomPoetry);

let currentTab = ref('');
let nav = ref<any>(null);
let theme = ref<string | null>(null);
let navListRef = ref<any>(null);
//栏目信息
const tabs = reactive<NavList[]>([
    {
        id: 4,
        name: "FISH",
        path: '/index'
    },
    {
        id: 2,
        name: "旅行",
        path: '/travel'
    },
    {
        id: 1,
        name: "随记",
        path: '/notes'
    },
    {
        id: 3,
        name: "联系",
        path: '/connect'
    },
]);


const setCurrentNav = (path: string) => {
    currentTab.value = path;
}

watch(() => route.path, newPath => {
    setCurrentNav(newPath)
}, { immediate: true })
//监听与初始化主题
watch(() => theme.value, newValue => {
    let r = newValue || ''
    if (newValue === null) {
        r = 'light'
    }
    toggleDark(r === 'dark')
    localStorage.setItem('theme', r);
    document.getElementsByTagName('html')[0].setAttribute('theme', r);

})

const changeNav = (item: NavList) => {
    setCurrentNav(item.path)
    router.push({
        path: item.path
    })
}
//回到顶部
const toTop = () => {
    emit('toTop')
}

//改变主题颜色
const changeTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'

}


const str1InStr2 = (str1: string, str2: string) => {
    if (str1.indexOf(str2) === -1) {
        return false
    } else {
        return true
    }

}

const mobileNavClick = () => {
    navListRef.value.classList.toggle('home_nav_list_active')
}

onMounted(() => {
    theme.value = localStorage.getItem('theme')
})


</script>

<style lang="scss" scoped>
.home_nav {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: var(--nav-height);
    padding: 0 1.6rem;
    display: flex;
    align-items: center;
    // border-bottom: 2px solid var(--divider-light);
    justify-content: space-between;
    align-items: center;
    background: transparent;
    transition: backdrop-filter .2s var(--animation-in);
    transition: height .2s;

    .home_nav_list {
        display: flex;
        align-items: center;
        color: hsl(var(--font-color) / 100%);
        height: 100%;
        .home_nav_mobile {
            display: none;
            width: 0.8rem;
            cursor: pointer;
            position: relative;
            align-items: center;

            svg {
                width: 100%;
                height: 100%;
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
            }
        }

        .home_nav_con {
            display: flex;
            align-content: stretch;
        }

        .home_nav_item {
            // color: hsl(var(--font-color) / 100%);
            font-size: var(--font-size-medium);
            font-weight: var(--font-weight-title);
            line-height: calc(var(--nav-height) / 1.2);
            padding: 0 20px;
            border-radius: 10px;
            cursor: pointer;
            transition: 0.3s var(--animation-in);
            flex-shrink: 0;

            &.home_nav_item_active {
                // box-shadow: 2px 2px 5px rgba(88, 175, 223, .2);
                color: hsl(var(--theme-color)/ 100%);
            }

            &:hover {
                color: hsl(var(--theme-color)/ 80%);
            }
        }

        &:hover {
            color: hsl(var(--font-color) / 60%);
        }
    }

    &.home_nav_active {
        border-bottom: var(--border);
        -webkit-backdrop-filter: saturate(1.8) blur(20px);
        backdrop-filter: saturate(1.8) blur(20px);
        height: calc(var(--nav-height) / 1.2);
        
    }

    h2 {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: var(--font-size-toosmall);
        color: hsl(var(--font-color) / 50%);
        letter-spacing: 0.02rem;
        margin-top: 0;
        opacity: 1;
        transition: .3s var(--animation-in);

        &[data-active="0"] {
            margin-top: 0.5rem;
            opacity: 0;
        }
    }

    .home_nav_opr {
        display: flex;
        align-items: center;

        i.theme {
            width: 0.8rem;
            height: 0.8rem;
            position: relative;
            cursor: pointer;
            overflow: hidden;
            background: hsl(var(--h-bg)/50%);
            transition: .4s var(--animation-in);
            border-radius: 2px;

            &:hover {
                transform: scale(1.1);
            }

            svg {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                transform-origin: 50% 150%;
                transition: .5s var(--animation-in);
            }

            .sun {
                transform: rotate(0);
            }

            .moon {
                transform: rotate(90deg);
            }

            &[data-theme="dark"] {
                .sun {
                    transform: rotate(-90deg);
                }

                .moon {
                    transform: rotate(0);
                }

                background: var(--h-dark-bg);

            }
        }



        span {
            width: 0.8rem;
            height: 0.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: var(--font-size-toosmall);
            margin-left: 0.4rem;
            background: var(--s-color);
            color: var(--f-color, white);
            border-radius: 5px;
            cursor: pointer;
            overflow: hidden;
            transition: .2s var(--animation-in);
            opacity: 1;
            position: relative;

            &[data-active="0"] {
                width: 0;
                opacity: 0;
            }

            i {
                position: absolute;
                left: 50%;
                top: 100%;
                height: 100%;
                z-index: 1;
                opacity: 0;
                font-size: var(--font-size-medium);
                transition: .2s var(--animation-in);
                transform: translateX(-50%);
            }

            &[data-active="100"] {
                color: transparent;

                i {
                    color: var(--f-color, white);
                    top: -10%;
                    opacity: 1;
                }
            }

            &:hover {
                transform: scale(1.1);
            }
        }

    }

}

@media (max-width:1000px) {
    .home_nav {
        h2 {
            display: none;
        }
    }
}

@media (max-width:640px) {
    .home_nav {
        .home_nav_list {
            max-width: 0.8rem;
            transition: max-width .2s var(--animation-in);
            border-radius: 0.3rem;

            .home_nav_con {
                position: absolute;
                top: var(--nav-height);
                left: 0;
                transition: .2s;
                height: 0;
                width: 100vw;
                z-index: 1000;
                overflow: hidden;
                background: var(--h-bg);
            }

            .home_nav_mobile {
                display: flex;
                flex-shrink: 0;
            }
        }

        .home_nav_list_active {

            .home_nav_con {
                height: var(--nav-height);
            }
        }
    }
}
</style>