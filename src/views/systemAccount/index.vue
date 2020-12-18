<!--
 * @Author: wangtengteng
 * @Date: 2020-12-09 10:31:27
 * @LastEditTime: 2020-12-18 19:53:34
 * @FilePath: \cuohe-manage\src\views\systemAccount\index.vue
-->
<template>
  <div class="history">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>系统账户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button class="createUserBtn" type="primary" size="mini" @click.stop="createUser">添加用户</el-button>
    <div class="historyContent">
      <div class="listContent">
        <el-table :data="managerList" style="width: 100%">
          <el-table-column prop="create_time" label="角色名" width="180">
          </el-table-column>
          <el-table-column prop="account" label="账户" width="180">
          </el-table-column>
          <el-table-column prop="password" label="密码">
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click.stop="handelExamine(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-pagination :current-page="pageindex" background layout="prev, pager, next" :page-size="10" :total="managerListLen" @current-change="currentChange">
    </el-pagination>

    <el-dialog customClass="createUser customDialog" title="创建账户" :visible.sync="createVisible">
      <el-form :model="superForm" :rules="rules" ref="superForm" label-width="100px">
        <el-form-item prop="account">
          <el-input placeholder="请输入账号" v-model="superForm.account"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" tabindex="2" maxlength="16" :show-password="true" placeholder="请输入密码" v-model="superForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onConfirmCreateUser">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import {
  managerListMoudle,
  deleteUserMoudle,
  createUserMoudle
} from '@/api/systemAccount'
import {
  uuid,
  Encrypt
} from '@/utils';
export default {
  data () {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[34578]\d{9}$$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      if (!Number.isInteger(+value)) {
        callback(new Error("请输入数字值"));
      } else {
        if (phoneReg.test(value)) {
          callback();
        } else {
          callback(new Error("电话号码格式不正确"));
        }
      }
    };
    return {
      createVisible: false,
      managerList: [],
      managerListLen: 0,
      pageindex: 1,
      superForm: {
        password: '',
        account: ''
      },
      rules: {
        password: [{
          required: true,
          message: "请输入密码",
          trigger: "blur"
        }],
        account: [{
          required: true,
          message: "请输入账号",
          trigger: "blur"
        }],
      },
    }
  },
  async created () {
    this.managerList = await this.getmanagerList(1)
  },
  methods: {
    getmanagerList (pageindex) {
      return new Promise((reslove, reject) => {
        managerListMoudle({
          reqid: uuid(),
          pageindex,
          pagesize: 10
        }).then(res => {
          const {
            status,
            data,
            message
          } = res.data;
          if (!status) {
            this.managerListLen = data.size;
            reslove(data.meets)
          } else {
            this.$message.error(message)
            reject()
          }
        })
      })
    },
    async currentChange (index) {
      this.pageindex = index;
      this.managerList = await this.getmanagerList(index);
    },
    handelExamine (index, row) {
      deleteUserMoudle({
        reqid: uuid(),
        id: Number(row.id)
      }).then(async res => {
        const {
          status,
          data,
          message
        } = res.data;
        if (!status) {
          this.$message.success('删除成功！')
          this.managerList = await this.getmanagerList(1)
        } else {
          this.$message.error(message)
        }
      })
    },
    createUser () {
      this.createVisible = true;
    },
    onConfirmCreateUser () {
      this.$refs['superForm'].validate((valid) => {
        if (valid) {
          this.createVisible = false;
          createUserMoudle({
            reqid: uuid(),
            account: this.superForm.account,
            password: Encrypt(this.superForm.password)
          }).then(async res => {
            const {
              status,
              data,
              message
            } = res.data;
            if (!status) {
              this.$message.success('创建成功！')
              this.managerList = await this.getmanagerList(1)
            } else {
              this.$message.error(message)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.history {
  .historyContent {
    margin-bottom: 20px;
    /deep/ .el-table {
      padding: 0 20px;
      background: #fff;
    }
  }
  .createUserBtn {
    margin-bottom: 20px;
    float: right;
  }
}
</style>