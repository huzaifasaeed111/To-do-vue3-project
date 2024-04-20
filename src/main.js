// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store.js';
import router from './router'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives
})
app.use(store);
app.use(router);

app.use(vuetify).mount('#app')
