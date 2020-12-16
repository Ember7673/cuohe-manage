<!--
 * @Author: wangtengteng
 * @Date: 2020-12-09 10:30:52
 * @LastEditTime: 2020-12-16 19:50:01
 * @FilePath: \cuohe-manage\src\views\login\index.vue
-->
<template>
  <div class="layout">
    <el-container>
      <el-header>
        <div class="left">
          <p class="logo">logo</p>
          <span class="projectTitle">后台管理系统</span>
        </div>
      </el-header>

      <el-container>
        <el-main>
          <div class="panel">
            <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
              <el-tab-pane label="管理员" name="1">
                <div class="loginbox managerLogin">
                  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item prop="account">
                      <el-input type="text" tabindex="1" placeholder="请输入账号" v-model="ruleForm.account"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                      <el-input type="password" tabindex="2" maxlength="16" placeholder="请输入密码" :show-password="true" v-model="ruleForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </el-tab-pane>
              <el-tab-pane label="超级管理员" name="2">
                <div class="loginbox superManagerLogin">
                  <el-form :model="superForm" :rules="rules" ref="superForm" label-width="100px">
                    <el-form-item prop="phone_num">
                      <el-input type="text" tabindex="1" placeholder="请输入账号" v-model="superForm.phone_num"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                      <el-input type="password" tabindex="2" maxlength="16" :show-password="true" placeholder="请输入密码" v-model="superForm.password"></el-input>
                    </el-form-item>
                    <el-form-item prop="valid_num">
                      <el-input placeholder="请输入验证码" v-model="superForm.valid_num"></el-input>
                      <div class="get-code">
                        <span v-if="!isShowTimer" @click="getSMSCode">获取验证码</span>
                        <span v-else>重新发送（{{smsTimer}}）秒</span>
                      </div>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="submitForm('superForm')">提交</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import { manageLoginMoudle, sendcodeMoudle, superManageLoginMoudle } from '@/api/login';
import { uuid } from '@/utils';
export default {
  data () {
    return {
      ruleForm: {
        phone_num: '',
        password: '',
      },
      superForm: {
        phone_num: '',
        password: '',
        valid_num: ''
      },
      rules: {
        account: [{
          required: true,
          message: "请输入账号",
          trigger: "blur"
        }],
        phone_num: [{
          required: true,
          message: '请输入账号',
          trigger: "blur"
        }],
        password: [{
          required: true,
          message: "请输入登录密码",
          trigger: "blur"
        }],
        valid_num: [{
          required: true,
          message: "请输入验证码",
          trigger: "blur"
        }],
      },
      activeName: '1',
      smsTimer: 40,
      isShowTimer: false,
      loginType: '1',
      isSendCode: false
    }
  },
  methods: {
    handleClick (val) {
      this.loginType = val.name;
      this.$refs['ruleForm'].resetFields()
      this.$refs['superForm'].resetFields()
    },
    //获取短信验证码
    getSMSCode () {
      if (this.isSendCode) return;
      const me = this;
      me.isSendCode = true;
      const data = {
        reqid: uuid()
      };
      sendcodeMoudle(data).then(res => {
        const {
          status,
          message
        } = res.data;
        if (!status) {
          me.$message.success('验证码已发送');
          me.timer();
          me.isShowTimer = true;
        } else {
          me.isSendCode = false;
          me.$message.error(res.data.message);
        }
      });
    },
    //短信验证码倒计时
    timer () {
      const me = this;
      let _timeInterval = setInterval(function () {
        if (me.smsTimer === 0) {
          me.isShowTimer = false;
          me.isSendCode = false;
          me.smsTimer = 40;
          clearInterval(_timeInterval);
        } else if (me.smsTimer <= 40 && me.smsTimer >= 1) {
          me.isShowTimer = true;
          me.smsTimer--;
        }
      }, 1000);
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.loginType === '1') {
            manageLoginMoudle({
              reqid: uuid(),
              phone_num: this.ruleForm.account,
              password: this.$md5(this.ruleForm.password),
              domain: 'mgr'
            }).then(res => {
              const {
                status,
                message
              } = res.data;
              if (!status) {
                this.$message.success('登录成功');
                this.$router.push('/')
              } else {
                this.$message.error(res.data.message);
              }
            })
          } else {
            superManageLoginMoudle({
              reqid: uuid(),
              phone_num: this.superForm.phone_num,
              password: this.$md5(this.superForm.password),
              valid_num: this.superForm.valid_num,
              domain: 'mgr'
            }).then(res => {
              const {
                status,
                message
              } = res.data;
              if (!status) {
                this.$message.success('登录成功');
                this.$router.push('/')
              } else {
                this.$message.error(res.data.message);
              }
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100vh;
  background: #fff;
}
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
}
.panel {
  border: 1px solid #ddd;
  padding: 30px;
  width: 400px;
  text-align: center;
  margin: 150px auto;
  /deep/ .el-tabs__header {
    margin-bottom: 40px;
  }
  .loginbox {
    .get-code {
      cursor: pointer;
      position: absolute;
      right: 15px;
      bottom: 0;
    }
    /deep/ .el-form-item__content {
      margin-left: 0 !important;
    }
  }
}
</style>