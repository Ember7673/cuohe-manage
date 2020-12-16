<!--
 * @Author: wangtengteng
 * @Date: 2020-12-11 17:08:02
 * @LastEditTime: 2020-12-16 18:56:45
 * @FilePath: \cuohe-manage\src\views\systemAccount\userList.vue
-->
<template>
  <div class="userList">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search">
      <span>用户查找：</span>
      <el-input v-model="searchStr" placeholder="请输入昵称/手机号"></el-input>
      <el-button type="primary" size="mini" @click="onSearch">查询</el-button>
    </div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="0,1,2,5,6">
          <ListModule :list="userList" :size="userLen" :pageindex="pageindex" @pageChange="pageChange" @refresh="refresh"></ListModule>
        </el-tab-pane>
        <el-tab-pane label="未审核" name="2,5">
          <ListModule :list="userList" :size="userLen" :pageindex="pageindex" @pageChange="pageChange" @refresh="refresh"></ListModule>
        </el-tab-pane>
        <el-tab-pane label="已审核" name="6">
          <ListModule :list="userList" :size="userLen" :pageindex="pageindex" @pageChange="pageChange" @refresh="refresh"></ListModule>
        </el-tab-pane>
        <el-tab-pane label="信息不完整" name="0,1">
          <ListModule :list="userList" :size="userLen" :pageindex="pageindex" @pageChange="pageChange" @refresh="refresh"></ListModule>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  userListMoudle
} from '@/api/systemAccount';
import ListModule from '@/components/userList'
import {
  uuid
} from '@/utils';
export default {
  components: {
    ListModule
  },
  data () {
    return {
      searchStr: '',
      userList: [],
      activeName: '0,1,2,5,6',
      curStatus: '0,1,2,5,6',
      pageindex: 1,
      userLen: 0,
    }
  },
  async created () {
    this.userList = await this.getUserList('0,1,2,5,6', 1, 10);
  },
  methods: {
    getUserList (status, pageindex, pagesize, keyword = '') {
      return new Promise((resolve, reject) => {
        userListMoudle({
          reqid: uuid(),
          status,
          keyword,
          pageindex,
          pagesize
        }).then(res => {
          const {
            status,
            data,
            message
          } = res.data;
          if (!status) {
            this.userLen = data.size;
            resolve(data.meets);
          } else {
            this.$message.error(message)
            reject();
          }
        })
      })
    },
    async pageChange (index) {
      this.pageindex = index;
      this.userList = await this.getUserList(this.curStatus, index, 10, this.searchStr);
    },
    async handleClick (e) {
      this.curStatus = e.name;
      if (this.curStatus === '5') {
        this.userList = await this.getUserList('0,1,2,5,6', 1, 10, this.searchStr, true);
      } else {
        this.userList = await this.getUserList(this.curStatus, 1, 10, this.searchStr);
      }
    },
    async onSearch () {
      this.userList = await this.getUserList(this.curStatus, 1, 10, this.searchStr);
    },
    async refresh () {
      this.userList = await this.getUserList(this.curStatus, this.pageindex, 10, this.searchStr);
    },
  }
}
</script>

<style lang="scss" scoped>
.userList {
  .search {
    border: 1px solid #dcdfe6;
    padding: 15px;
    margin: 20px 0;

    span {
      margin-right: 20px;
      display: inline-block;
      font-size: 14px;
    }

    /deep/ .el-input {
      width: 80%;
      display: inline-block;
    }

    /deep/ .el-button--mini,
    .el-button--mini.is-round {
      margin-left: 20px;
    }
  }
}
</style>