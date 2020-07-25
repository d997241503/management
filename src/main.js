import Vue from 'vue'
import App from './App.vue'
import router from './route'
import './plugin/element.js'
import './network'

import './assets/icon/iconfont.css'
import "./assets/css/base.css"
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
