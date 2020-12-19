<!--
 * @Author: wangtengteng
 * @Date: 2020-12-11 11:01:43
 * @LastEditTime: 2020-12-19 14:28:20
 * @FilePath: \cuohe-manage\src\components\list.vue
-->
<template>
  <div class="list">
    <el-table ref="singleTable" highlight-current-row @cell-mouse-enter="userIdHover" @row-click="handleCurrentChange" :data="list" stripe style="width: 100%">
      <el-table-column prop="id" label="需求id">
      </el-table-column>
      <el-table-column prop="requirement_name" show-overflow-tooltip label="项目名称" width="180">
      </el-table-column>
      <el-table-column prop="description" show-overflow-tooltip label="需求介绍" width="180">
      </el-table-column>
      <el-table-column prop="cooperation_method" label="合作方式">
      </el-table-column>
      <el-table-column prop="requirement_create_time" label="创建时间">
      </el-table-column>
      <el-table-column label="创建者id">
        <template slot-scope="scope">
          <el-popover placement="top-start" title="创建者信息" width="200" trigger="hover">
            <div>
              <p>昵称：{{createUserInfo.nickname}}</p>
              <p>手机号：{{createUserInfo.phone_num}}</p>
            </div>
            <span style="cursor:pointer" slot="reference">
              {{scope.row.user_id}}
            </span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="user_nick_name" label="创建者昵称">
      </el-table-column>
      <el-table-column :formatter="statusFormatter" prop="requirement_status" label="状态">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-show="scope.row.requirement_status === '未审核'" type="primary" size="mini" @click.stop="handelExamine(scope.$index, scope.row)">通过</el-button>
          <el-select v-show="scope.row.requirement_status !== '未审核'" v-model="scope.row.requirement_status" placeholder="请选择审核状态" @change="onSelectStatus(scope.row)">
            <el-option key="未审核" label="未审核" value="1"></el-option>
            <el-option key="已审核" label="已审核" value="2"></el-option>
            <el-option key="已对接" label="已对接" value="3"></el-option>
            <el-option key="已完成" label="已完成" value="4"></el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>

    <div class="listPagination">
      <el-pagination :current-page="pageindex" background layout="prev, pager, next" :page-size="10" :total="size" @current-change="currentChange">
      </el-pagination>
    </div>

    <el-dialog customClass="details customDialog" title="需求详情" :visible.sync="curItemVisible">
      <div class="detailContent">
        <div class="text">
          <p class="title">项目名称：</p>
          <p class="descriptionContent nameContent" style="white-space: pre-wrap;">
            {{curItem.requirement_name}}</p>
        </div>
        <div class="text description">
          <p class="title">需求介绍：</p>
          <p class="descriptionContent descriptionContentEditor" style="white-space: pre-wrap;">
            {{curItem.description}}</p>
        </div>
        <div class="text">
          <p class="title">合作方式：</p>
          <span class="cooperationMethod">{{curItem.cooperation_method}}</span>
        </div>
        <div class="text">
          <p class="title">附件：</p>
          <div class="filesList">
            <p v-show="filesList.length" v-for="(file, fileIndex) in filesList" :key="fileIndex">
              <span class="filename">{{file.name}}</span>
              <button class="downloadBtn" @click="onDownload(fileIndex)">下载</button>
            </p>
            <p v-show="!filesList.length">暂无附件</p>
          </div>
        </div>
        <div class="btn" v-show="curItem.requirement_status === '未审核'">
          <button class="examineBtn" @click="handelExamine">通过</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { requirementInfoUpdateMoudle } from '@/api/requirement';
import { getUserByIdMoudle } from '@/api/systemAccount'
import { uuid } from '@/utils';
export default {
  props: ['list', 'pageindex', 'size'],
  data () {
    return {
      curItem: {},
      filesList: [],
      curItemVisible: false,
      createUserInfo: {},
    }
  },
  methods: {
    handleCurrentChange (currentRow) {
      this.curItem = currentRow;
      this.filesList = currentRow.pic_annex;
      this.curItemVisible = true;
    },
    handelExamine (index, row) {
      if (row) {
        this.curItem = row;
      }
      requirementInfoUpdateMoudle({
        reqid: uuid(),
        status: 2,
        id: Number(this.curItem.id)
      }).then(res => {
        const {
          status,
          data,
          message
        } = res.data;
        if (!status) {
          this.$message.success('状态更新为已审核');
          this.$emit('refresh')
          this.curItemVisible = false;
        } else {
          this.$message.error(message);
        }
      })
    },
    statusFormatter (row) {
      switch (Number(row.requirement_status)) {
        case 1:
          row.requirement_status = '未审核';
          row.requirement_status_num = 1;
          break;
        case 2:
          row.requirement_status = '已审核';
          row.requirement_status_num = 2;
          break;
        case 3:
          row.requirement_status = '已对接';
          row.requirement_status_num = 3;
          break;
        case 4:
          row.requirement_status = '已完成';
          row.requirement_status_num = 4;
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
      // window.location.href = url;
      this.download(url, this.filesList[index].name)
    },
    userIdHover (row, column, cell) {
      if (column.label !== "创建者id") return;
      this.createUserInfo = {};
      this.getUserById(row.user_id)
    },
    getUserById (id) {
      getUserByIdMoudle({
        reqid: uuid(),
        id: Number(id)
      }).then(res => {
        const {
          status,
          user,
          message
        } = res.data;
        if (!status) {
          this.createUserInfo = user;
        } else {
          this.createUserInfo = {}
          this.$message.error(message)
        }

      })
    },
    onSelectStatus (row) {
      this.curItem = row;
      requirementInfoUpdateMoudle({
        reqid: uuid(),
        status: Number(row.requirement_status),
        id: Number(row.id)
      }).then(res => {
        const {
          status,
          data,
          message
        } = res.data;
        if (!status) {
          this.$message.success(`状态更新为${row.requirement_status}`);
          this.$emit('refresh')
        } else {
          this.$message.error(message);
        }
      })
    },
    getBlob (url) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest()
        // 避免 200 from disk cache
        url = url + `?r=${Math.random()}`
        xhr.open('GET', url, true)
        xhr.responseType = 'blob'
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(xhr.response)
          }
        }
        xhr.send()
      })
    },
    saveAs (blob, filename) {
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename)
      } else {
        const anchor = document.createElement('a')
        const body = document.querySelector('body')
        anchor.href = window.URL.createObjectURL(blob)
        anchor.download = filename
        anchor.style.display = 'none'
        body.appendChild(anchor)
        anchor.click()
        body.removeChild(anchor)
        window.URL.revokeObjectURL(anchor.href)
      }
    },
    async download (url, newFileName) {
      const blob = await this.getBlob(url)
      this.saveAs(blob, newFileName)
    }
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
        height: 200px;
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
  .listPagination {
    margin-top: 20px;
  }
}
</style>