import { createApp } from 'vue'
import App from './App.vue'
import mitt, { Emitter } from 'mitt'
import router from './router'
import store from './store'

const mitter: Emitter = mitt()

const app = createApp(App)
app.config.globalProperties.mitter = mitter
app.use(router)
app.use(store)

app.mount('#app')