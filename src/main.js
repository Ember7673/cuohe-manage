/*
 * @Author: wangtengteng
 * @Date: 2020-12-08 18:32:09
 * @LastEditTime: 2020-12-10 18:25:05
 * @FilePath: \cuohe-manage\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import md5 from 'js-md5';
import './assets/css/common.scss';
import { getCookie } from '@/utils';

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$md5 = md5;

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (!getCookie('heat_sess_mgr')) {
    if (to.path !== '/login') {
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next({ path: '/home', replace: true })
    } else {
      next()
    }
  }

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
