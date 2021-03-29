import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from 'echarts'
import './assets/css/global.less'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
axios.defaults.baseURL = 'http://localhost:8080/api/'
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}).$mount('#app')
