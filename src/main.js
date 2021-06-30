import './assets/index.css'
import './assets/index2.less'
import Vue from 'vue'
import App from './app'
// import { aa } from './test.txt'
// console.log(aa)
new Vue({
  render: h => h(App)
}).$mount('#app')