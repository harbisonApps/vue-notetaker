import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import store from './store'

const base = axios.create({ baseURL: "http://localhost:5000" });

Vue.prototype.$http = base;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
