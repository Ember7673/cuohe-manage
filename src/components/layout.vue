<!--
 * @Author: wangtengteng
 * @Date: 2020-12-10 14:13:13
 * @LastEditTime: 2020-12-11 18:28:10
 * @FilePath: \cuohe-manage\src\components\layout.vue
-->
<template>
  <div class="layout">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-header>
        <div class="left">
          <p class="logo">logo</p>
          <span class="projectTitle">后台管理系统</span>
        </div>
        <div class="right">
          <div class="login" v-show="isLogged">
            <img src="" alt="">
            <span>欢迎，{{userInfo.account}}</span>
          </div>
          <div class="logout">
            <img src="" alt="">
            <span class="logoutBtn" @click="logout">登出</span>
          </div>
        </div>
      </el-header>

      <el-container>
        <el-aside width="200px" style="background-color: #234D61">
          <el-col>
            <el-menu default-active="2" @select="handleSelect" class="el-menu-vertical-demo" background-color="#234D61" text-color="#fff" active-text-color="#188F9F">
              <el-menu-item index="/">
                <i class="el-icon-menu"></i>
                <span slot="title">
                  首页
                </span>
              </el-menu-item>
              <el-menu-item index="/requirementList">
                <i class="el-icon-menu"></i>
                <span slot="title">需求列表</span>
              </el-menu-item>
              <el-menu-item index="/resourceList">
                <i class="el-icon-document"></i>
                <span slot="title">资源列表</span>
              </el-menu-item>
              <el-menu-item index="/userList">
                <i class="el-icon-setting"></i>
                <span slot="title">用户列表</span>
              </el-menu-item>
              <el-menu-item index="/systemAccount">
                <i class="el-icon-setting"></i>
                <span slot="title">系统账户</span>
              </el-menu-item>
              <el-menu-item index="/history">
                <i class="el-icon-setting"></i>
                <span slot="title">历史记录</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>
        <el-container>
          <el-main>
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { logoutMoudle, isLoginMoudle } from '@/api/login'
import { uuid } from '@/utils';
export default {
  data () {
    return {
      userInfo: {},
      isLogged: false
    }
  },
  created () {
    this.isLogin()
  },
  methods: {
    handleSelect (key, keyPath) {
      this.$router.push(keyPath[0])
    },
    isLogin () {
      isLoginMoudle({
        reqid: uuid(),
        domain: 'mgr'
      }).then(res => {
        const {
          status,
          user,
          message
        } = res.data;
        if (!status) {
          this.isLogged = true;
          this.userInfo = user;
          window.localStorage.setItem('userInfo', JSON.stringify(user))
        } else {
          this.$message.error(res.data.message);
        }
      })
    },
    logout () {
      logoutMoudle({
        reqid: uuid(),
        domain: 'mgr'
      }).then(res => {
        const {
          status,
          message
        } = res.data;
        if (!status) {
          this.$message.success('退出登录成功');
          this.$router.push('/login')
        } else {
          this.$message.error(res.data.message);
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-header {
  background-color: #234d61;
  color: #fff;
  line-height: 60px;
  div {
    display: inline-block;
  }
  .left {
    text-align: left;
  }
  .logo {
    width: 50px;
    font-size: 20px;
    display: inline-block;
    background: linear-gradient(
      0deg,
      #2ba2b2 54.931640625%,
      #35cdf2 58.544921875%,
      #2ba2b2 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-right: 20px;
  }
  .projectTitle {
    font-size: 22px;
    font-weight: 400;
    color: #ffffff;
  }
  .right {
    float: right;
  }
  .login {
    width: 140px;
  }
  .logout {
    width: 70px;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    border-left: 1px dotted #fff;
    .logoutBtn {
      cursor: pointer;
    }
  }
}

.el-aside {
  color: #333;
}
</style>