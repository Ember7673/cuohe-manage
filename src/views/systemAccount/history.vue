<!--
 * @Author: wangtengteng
 * @Date: 2020-12-11 17:10:13
 * @LastEditTime: 2020-12-16 19:56:05
 * @FilePath: \cuohe-manage\src\views\systemAccount\history.vue
-->
<template>
  <div class="history">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>历史记录</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="historyContent">
      <el-table :data="historyList" style="width: 100%">
        <el-table-column prop="create_time" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="account" label="账户名" width="180">
        </el-table-column>
        <el-table-column prop="user_id" :formatter="statusFormatter" label="操作对象id" width="180">
        </el-table-column>
        <el-table-column prop="message" label="事件">
        </el-table-column>
      </el-table>
    </div>

    <el-pagination :current-page="pageindex" background layout="prev, pager, next" :page-size="10" :total="historyListLen" @current-change="currentChange">
    </el-pagination>
  </div>
</template>

<script>
import { operateListMoudle } from '@/api/systemAccount'
import { uuid } from '@/utils';
export default {
  data () {
    return {
      historyList: [],
      historyListLen: 0,
      pageindex: 1,
    }
  },
  async created () {
    this.historyList = await this.getoperateList(1)
  },
  methods: {
    getoperateList (pageindex) {
      return new Promise((reslove, reject) => {
        operateListMoudle({
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
            this.historyListLen = data.size;
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
      this.historyList = await this.getoperateList(index);
    },
    statusFormatter (row) {
      if (Number(row.user_id)) {
        return row.user_id = row.user_id;
      } else if (Number(row.requirement_id)) {
        return row.user_id = row.requirement_id;
      } else if (Number(row.resource_id)) {
        return row.user_id = row.resource_id;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.history {
  .historyContent {
    margin: 30px 0;
    padding: 0 20px;
    background: #fff;
  }
}
</style>