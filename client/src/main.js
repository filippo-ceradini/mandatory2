import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toastr from 'toastr'

const app = createApp(App)
app.use(router)
app.use(store)
app.provide('toastr', toastr)
app.mount('#app')
