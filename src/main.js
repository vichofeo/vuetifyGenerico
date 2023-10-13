import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import { loadFonts } from './plugins/webfontloader'
loadFonts()

//import "bootstrap/dist/css/bootstrap.min.css";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
//import i18n from './i18n'

import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
