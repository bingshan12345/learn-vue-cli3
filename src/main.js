import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import network from './network'
// import axios from 'axios';
Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

// import request from './network/request'
// request({
//   url:'/home/multidata'
// }).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })
