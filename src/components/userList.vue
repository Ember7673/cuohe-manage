<!--
 * @Author: wangtengteng
 * @Date: 2020-12-11 17:55:07
 * @LastEditTime: 2020-12-11 18:33:30
 * @FilePath: \cuohe-manage\src\components\userList.vue
-->
<template>
  <div class="list">
    <el-table ref="singleTable" highlight-current-row @row-click="handleCurrentChange" :data="list" stripe style="width: 100%">
      <el-table-column prop="nick_name" show-overflow-tooltip label="用户列表" width="180">
      </el-table-column>
      <el-table-column prop="phone_num" show-overflow-tooltip label="手机号" width="180">
      </el-table-column>
      <el-table-column prop="nick_name" label="姓名" v-if="Number(userInfo.level) === 1">
      </el-table-column>
      <el-table-column prop="id_card_num" label="身份证" v-if="Number(userInfo.level) === 1">
      </el-table-column>
      <el-table-column prop="invite_code" label="绑定邀请码">
      </el-table-column>
      <el-table-column prop="create_time" label="注册时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click.stop="handelExamine(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination :current-page="pageindex" background layout="prev, pager, next" :page-size="10" :total="size" @current-change="currentChange">
    </el-pagination>

    <el-dialog customClass="details customDialog" title="个人详情" :visible.sync="curItemVisible">
      <div class="detailContent">
        <div class="text">
          <p class="title">头像：</p>
          <img :src="curItem.avatar" alt="">
        </div>
        <div class="text description">
          <p class="title">昵称：</p>
          <p class="nameContent" style="white-space: pre-wrap;">
            {{curItem.nick_name}}</p>
        </div>
        <div class="text">
          <p class="title">手机号：</p>
          <span class="nameContent">{{curItem.phone_num}}</span>
        </div>
        <div class="text" v-if="Number(userInfo.level) === 1">
          <p class="title">姓名：</p>
          <span class="nameContent">{{curItem.real_name}}</span>
        </div>
        <div class="text" v-if="Number(userInfo.level) === 1">
          <p class="title">身份证：</p>
          <span class="nameContent">{{curItem.id_card_num}}</span>
        </div>
        <div class="text">
          <p class="title">职位：</p>
          <span class="nameContent">{{curItem.position}}</span>
        </div>
        <div class="text">
          <p class="title">邀请码：</p>
          <span class="nameContent">{{curItem.invite_code}}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deleteUserMoudle } from '@/api/requirement';
import { uuid } from '@/utils';
export default {
  props: ['list', 'pageindex', 'size'],
  data () {
    return {
      curItem: {},
      filesList: [],
      curItemVisible: false,
      userInfo: {}
    }
  },
  created () {
    this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  },
  methods: {
    handleCurrentChange (currentRow) {
      this.curItem = currentRow;
      this.filesList = currentRow.pic_annex;
      this.curItemVisible = true;
    },
    handelExamine (index, row) {
      this.curItem = row;
      deleteUserMoudle({
        reqid: uuid(),
        id: Number(this.curItem.id)
      }).then(res => {
        const {
          status,
          data,
          message
        } = res.data;
        if (!status) {
          this.$message.success('删除成功');
          this.$emit('refresh')
        } else {
          this.$message.error(message);
        }
      })
    },
    statusFormatter (row) {
      switch (Number(row.status)) {
        case 0:
          row.requirement_status = '未实名';
          break;
        case 1:
          row.requirement_status = '未完善个人信息';
          break;
        case 2:
          row.requirement_status = '已完善信息，未审核';
          break;
        case 5:
          row.requirement_status = '修改资料，未审核';
          break;
        case 6:
          row.requirement_status = '已审核';
          break;
      }
      return row.requirement_status;
    },
    currentChange (index) {
      this.$emit('pageChange', index)
    },
    onDownload (index) {
      const AVATARURL = 'https://cuohe-1304244764.cos.ap-beijing.myqcloud.com/';
      let url = AVATARURL + this.filesList[index].download_name;
      window.location.href = url;
    },
  }
}
</script>

<style lang="scss" scoped>
.list {
  .details {
    position: relative;

    /deep/ .el-dialog__header {
      padding: 20px;
    }

    /deep/ .el-dialog__title {
      color: #fff;
    }
    .action {
      position: absolute;
      top: 20px;
      cursor: pointer;
      color: #ecbe73;
    }

    .editor {
      right: 110px;
    }

    .delete {
      right: 60px;
    }

    .text {
      .cooperationMethod {
        margin-left: 25px;
      }

      /deep/ .el-textarea__inner:focus {
        border-color: #ecbe73;
      }

      /deep/ .el-input.is-active .el-input__inner,
      .el-input__inner:focus {
        border-color: #ecbe73;
      }

      .title {
        display: inline-block;
        width: 80px;
        font-size: 16px;
        font-weight: bold;
        color: #4c4c4c;
        margin: 10px 0;
        text-align: right;
      }

      .descriptionContentEditor {
        margin-left: 105px;
        border: 1px solid #bfbfbf;
        height: 100px;
        overflow: hidden;
        overflow-y: scroll;
      }

      .nameContent {
        display: inline-block;
        margin-left: 25px;
      }

      .uploadFileLabel {
        position: relative;

        #uploadFile {
          width: 100px;
          height: 26px;
          position: absolute;
          top: 0px;
          left: 0;
          opacity: 0;
        }

        .uploadFileBtn {
          width: 100px;
          height: 26px;
          color: #fff;
          background: #f7941d;
          border: none;
          position: absolute;
          top: 0px;
          left: 0;
        }
      }

      .filesList {
        display: block;
        margin-left: 105px;
        margin-top: -43px;

        p {
          margin-top: 10px;

          span {
            width: 100px;
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .downloadBtn {
          font-size: 12px;
          margin-left: 20px;
          border: 1px solid #bfbfbf;
          box-shadow: 0px 1px 9px 0px rgba(1, 1, 1, 0.15);
          border-radius: 5px;
          padding: 3px 5px;
        }
      }

      .editorFileList {
        margin: 20px 0 0 80px;
      }

      /deep/ .el-input__inner {
        width: 400px;
      }
    }

    .coo {
      /deep/ .el-select .el-input.is-focus .el-input__inner {
        border-color: #ecbe73;
      }

      /deep/ .el-select .el-input__inner:focus {
        border-color: #ecbe73;
      }
    }

    .dialog-footer {
      /deep/ .el-button--primary {
        background: #ecbe73;
        border-color: #ecbe73;
      }

      /deep/ .el-button:focus,
      .el-button:hover {
        color: #ed9a14;
        border-color: #f7ead4;
        background-color: #f7ead4;
      }

      /deep/ .el-button--primary:focus,
      .el-button--primary:hover {
        color: #fff;
        border-color: #f1cb8c;
        background-color: #f1cb8c;
      }
    }

    .btn {
      width: 100%;
      text-align: center;
    }
    .examineBtn {
      width: 100px;
      height: 35px;
      line-height: 35px;
      background: #234d61;
      color: #fff;
      border: none;
      margin: 20px auto;
    }
  }
}
</style>