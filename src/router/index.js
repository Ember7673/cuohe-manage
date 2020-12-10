/*
 * @Author: wangtengteng
 * @Date: 2020-12-08 18:32:09
 * @LastEditTime: 2020-12-10 14:20:01
 * @FilePath: \cuohe-manage\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/login'
import RequirementList from '@/views/requirement'
import ResourceList from '@/views/resource'
import SystemAccount from '@/views/systemAccount'
import Layout from '@/components/layout';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/requirementList',
    component: Layout,
    children: [
      {
        path: '/requirementList',
        name: 'RequirementList',
        component: RequirementList,
      }
    ]
  },
  {
    path: '/resourceList',
    component: Layout,
    children: [
      {
        path: '/resourceList',
        name: 'ResourceList',
        component: ResourceList,
      }
    ]
  },
  {
    path: '/systemAccount',
    component: Layout,
    children: [
      {
        path: '/systemAccount',
        name: 'SystemAccount',
        component: SystemAccount,
      }
    ]
  },

]

const router = new VueRouter({
  routes
})
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
