import { createApp } from 'vue'
import App from './App.vue'

import { 

    // create naive ui
    create,
  // component
    NConfigProvider, NButton, NInput, NDatePicker, NSpace 
} from 'naive-ui'

const naive = create({
    components: [
        NConfigProvider,
        NButton,
        NInput,
        NDatePicker,
        NSpace,
    ]
})
createApp(App)
    .use(naive)
    .mount('#app')
