import { createApp } from 'vue'
import App from './App.vue'
import mitt, { Emitter } from 'mitt'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'
axios.interceptors.request.use((config) => {
  store.commit('setLoading', true)
  return config
})
axios.interceptors.response.use((config) => {
  store.commit('setLoading', false)
  return config
})

const mitter: Emitter = mitt()

const app = createApp(App)
app.config.globalProperties.mitter = mitter
app.use(router)
app.use(store)

app.mount('#app')
