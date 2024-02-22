import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template:{
        // 添加以下内容
        compilerOptions:{
          isCustomElement: tag => ['swiper-container','swiper-slide'].includes(tag)
        }
      }
    }),
    createSvgIconsPlugin({
      iconDirs:[path.resolve(process.cwd(),'src/assets/icons')],
      symbolId:"icon-[name]"
    })
  ],
})
