import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia"
import 'ant-design-vue/dist/antd.css';
import antDesign from 'ant-design-vue';
import { directivePlugin }from "@/js/directive.js"

import '@/assets/styles/public.scss'

createApp(App)
    /* .use(store) */
    .use(router)
    .use(createPinia())
    .use(antDesign)
    .use(directivePlugin)
    .mount('#app')
