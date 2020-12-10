<!--
 * @Author: wangtengteng
 * @Date: 2020-12-09 11:01:23
 * @LastEditTime: 2020-12-10 19:25:07
 * @FilePath: \cuohe-manage\src\views\requirement\index.vue
-->
<template>
  <div class="requirementList">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>需求列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search">
      <span>用户查找：</span>
      <el-input v-model="searchStr" placeholder="请输入昵称/手机号"></el-input>
    </div>
  </div>
</template>

<script>
import { requirementListMoudle } from '@/api/requirement';
import { uuid } from '@/utils';
export default {
  data () {
    return {
      searchStr: '',
      requirementList: []
    }
  },
  methods: {
    getRequirementList (status, keyword, pageindex, pagesize, isDelete = false) {
      requirementListMoudle({
        reqid: uuid(),
        status,
        delete: isDelete,
        keyword,
        pageindex
      }).then(res => {

      })
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
  }
}
</style>