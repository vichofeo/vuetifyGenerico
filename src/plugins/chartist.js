import Vue from 'vue'
import 'chartist/dist/chartist.min.css'
import 'chartist-plugin-tooltips-updated/dist/chartist-plugin-tooltip.min'
//Vue.use(require('vue-chartist'))
Vue.use(require('vue-chartist'), {
    messageNoData: "No se hallo datos.",
    classNoData: "empty"
})