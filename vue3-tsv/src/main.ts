import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from "pinia";
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import { directivePlugin }from "@/js/directive";

import '@/assets/styles/public.scss';

createApp(App)
    /* .use(store) */
    .use(router)
    .use(createPinia())
    .use(Antd)
    .use(directivePlugin)
    .mount('#app');
