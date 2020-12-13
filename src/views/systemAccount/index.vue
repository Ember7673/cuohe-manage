<!--
 * @Author: wangtengteng
 * @Date: 2020-12-09 10:31:27
 * @LastEditTime: 2020-12-14 00:24:59
 * @FilePath: \cuohe-manage\src\views\systemAccount\index.vue
-->
<template>
  <div class="history">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>系统账户</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="historyContent">
      <el-button type="primary" size="mini" @click.stop="createUser">添加用户</el-button>
      <el-table :data="managerList" style="width: 100%">
        <el-table-column prop="create_time" label="角色名" width="180">
        </el-table-column>
        <el-table-column prop="account" label="手机号" width="180">
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

    <el-pagination :current-page="pageindex" background layout="prev, pager, next" :page-size="10"
      :total="managerListLen" @current-change="currentChange">
    </el-pagination>
  </div>
</template>

<script>
  import {
    managerListMoudle,
    deleteUserMoudle,
    createUserMoudle
  } from '@/api/systemAccount'
  import {
    uuid
  } from '@/utils';
  export default {
    data() {
      return {
        managerList: [],
        managerListLen: 0,
        pageindex: 1,
      }
    },
    async created() {
      this.managerList = await this.getmanagerList(1)
    },
    methods: {
      getmanagerList(pageindex) {
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
      async currentChange(index) {
        this.pageindex = index;
        this.managerList = await this.getmanagerListttMoudle(index);
      },
      handelExamine(index, row) {
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
            reject()
          }
        })
      },
      createUser() {
        createUserMoudle({
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
            reject()
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .history {
    .historyContent {
      margin-top: 30px;
    }
  }
</style>