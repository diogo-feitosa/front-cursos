import Vue from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import money from 'v-money'

Vue.config.productionTip = false

Vue.use(VueSweetalert2);
Vue.use(money, {precision: 4})

new Vue({
  render: h => h(App)
}).$mount('#app')
