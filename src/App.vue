<!--
 * @Author: wangtengteng
 * @Date: 2020-12-05 10:30:18
 * @LastEditTime: 2020-12-05 10:58:03
 * @FillPath: Do not edit
-->
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
  import {
    getRequirementListMoudle
  } from '@/api/resource';
  import {
    uuid
  } from '@/utils/index';
  export default {
    methods: {
      getRequirementList() {
        getRequirementListMoudle({
          reqid: uuid()
        }).then(res => {

        })
      }
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>