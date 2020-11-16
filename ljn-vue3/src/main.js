import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')

/**
 vue2 init
new Vue({ 
    el:'#app',
    store: store,
    router: router,
    render: C => C (App)
})
new Vue({
    store: store,
    router: router,
    render: C => C (App)
}).$mount('#app' );

 */