import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import resolveExternalsPlugin from 'vite-plugin-resolve-externals'
import { resolve } from 'path'
import { manualChunksPlugin } from "@time50/vite-plugin-webpackchunkname";


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        manualChunksPlugin(),
        // resolveExternalsPlugin({
        //     // three: 'THREE', // THREE是cnd文件在windows的定义 three 是import模块的名字
        //     three: (...args) => (console.log('resolveExternalsPlugin',...args),`
        //         const E = window.THREE;
        //         export default E;
        //         // export const xxx = E.xxx; // todo
        //     `)
        //     })
    ],
	resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    }
})
