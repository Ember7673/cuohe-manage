<!--
 * @Author: wangtengteng
 * @Date: 2020-12-09 11:01:23
 * @LastEditTime: 2020-12-11 17:06:40
 * @FilePath: \cuohe-manage\src\views\requirement\index.vue
-->
<template>
  <div class="requirementList">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>需求列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search">
      <span>需求查找：</span>
      <el-input v-model="searchStr" placeholder="请输入项目名称/需求介绍"></el-input>
      <el-button type="primary" size="mini" @click="onSearch">查询</el-button>
    </div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="1,2,3,4">
          <ListModule :list="requirementList" :size="requirementLen" :pageindex="pageindex" @pageChange="pageChange" @refresh="refresh"></ListModule>
        </el-tab-pane>
        <el-tab-pane label="未审核" name="1">
          <ListModule :list="requirementList" :size="requirementLen" :pageindex="pageindex" @pageChange="pageChange" @refresh="refresh"></ListModule>
        </el-tab-pane>
        <el-tab-pane label="已审核" name="2">
          <ListModule :list="requirementList" :size="requirementLen" :pageindex="pageindex" @pageChange="pageChange" @refresh="refresh"></ListModule>
        </el-tab-pane>
        <el-tab-pane label="已对接" name="3">
          <ListModule :list="requirementList" :size="requirementLen" :pageindex="pageindex" @pageChange="pageChange" @refresh="refresh"></ListModule>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="4">
          <ListModule :list="requirementList" :size="requirementLen" :pageindex="pageindex" @pageChange="pageChange" @refresh="refresh"></ListModule>
        </el-tab-pane>
        <el-tab-pane label="已删除" name="5">
          <ListModule :list="requirementList" :size="requirementLen" :pageindex="pageindex" @pageChange="pageChange" @refresh="refresh"></ListModule>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { requirementListMoudle } from '@/api/requirement';
import ListModule from '@/components/list'
import { uuid } from '@/utils';
export default {
  components: {
    ListModule
  },
  data () {
    return {
      searchStr: '',
      requirementList: [],
      activeName: '1,2,3,4',
      curStatus: '1,2,3,4',
      isDelete: false,
      pageindex: 1,
      requirementLen: 0,
    }
  },
  async created () {
    this.requirementList = await this.getRequirementList('1,2,3,4', 1, 10);
  },
  methods: {
    getRequirementList (status, pageindex, pagesize, keyword = '', isDelete = false) {
      return new Promise((resolve, reject) => {
        requirementListMoudle({
          reqid: uuid(),
          status,
          delete: isDelete,
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
            this.requirementLen = data.size;
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
      this.requirementList = await this.getRequirementList(this.curStatus, index, 10, this.searchStr, this.isDelete);
    },
    async handleClick (e) {
      this.curStatus = e.name;
      if (this.curStatus === '5') {
        this.isDelete = true;
        this.requirementList = await this.getRequirementList('1,2,3,4', 1, 10, this.searchStr, true);
      } else {
        this.isDelete = false;
        this.requirementList = await this.getRequirementList(this.curStatus, 1, 10, this.searchStr);
      }
    },
    async onSearch () {
      this.requirementList = await this.getRequirementList(this.curStatus, 1, 10, this.searchStr);
    },
    async refresh () {
      this.requirementList = await this.getRequirementList(this.curStatus, this.pageindex, 10, this.searchStr);
    }
  }
}
</script>

<style lang="scss" scoped>
.requirementList {
  .search {
    border: 1px solid #dcdfe6;
    padding: 15px;
    margin-top: 20px;

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