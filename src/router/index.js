/*
 * @Author: wangtengteng
 * @Date: 2020-12-08 18:32:09
 * @LastEditTime: 2020-12-14 18:57:25
 * @FilePath: \cuohe-manage\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/login'
import RequirementList from '@/views/requirement'
import ResourceList from '@/views/resource'
import SystemAccount from '@/views/systemAccount'
import UserList from '@/views/systemAccount/userList'
import HistoryList from '@/views/systemAccount/history'
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
  {
    path: '/userList',
    component: Layout,
    children: [
      {
        path: '/userList',
        name: 'UserList',
        component: UserList,
      }
    ]
  },
  {
    path: '/history',
    component: Layout,
    children: [
      {
        path: '/history',
        name: 'History',
        component: HistoryList,
      }
    ]
  },
]

const router = new VueRouter({
  routes,
  base: '/manage'
})
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
