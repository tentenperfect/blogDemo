<template>
  <div>
    <div class="nav">
      <navbar></navbar>
    </div>
    <div class="page-center">
      <div class="n-info">
        <div>
          <span>用户数量</span>
          <i>{{info.usersNum}}</i>
        </div>
        <div>
          <span>文章总数</span>
          <i>{{info.artsNum}}</i>
        </div>
      </div>
      <div class="table-list">
        <el-table :data="tableData"
                  style="width: 100%">
          <el-table-column prop="date"
                           label="创建日期"
                           align="center">
          </el-table-column>
          <el-table-column prop="date"
                           label="上次登录日期"
                           align="center">
          </el-table-column>
          <el-table-column prop="uid"
                           label="用户ID"
                           align="center">
          </el-table-column>
          <el-table-column prop="name"
                           label="用户名"
                           align="center">
          </el-table-column>
          <el-table-column prop="articleNum"
                           label="文章"
                           align="center">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "./navbar.vue";
export default {
  name: 'admin',
  components: {
    navbar
  },
  data () {
    return {
      value: true
    }
  },
  computed: {
    btnValue () {
      return this.value ? '禁用' : '激活'
    },
    info () {
      return { usersNum: 123, artsNum: 456 }
    },
    tableData () {
      return [{
        uid: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        articleNum: 12,
        state: true
      }, {
        uid: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        articleNum: 12,
        state: true
      }, {
        uid: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        articleNum: 12,
        state: true
      }, {
        uid: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        articleNum: 12,
        state: true
      }]
    }
  },
  methods: {
    changeState (uid) {
      console.log(uid);
      let item = this.tableData.filter((item) => item.uid == uid)
      console.log(item);
      item.state = !item.state
    }
  }
}
</script>

<style>
.page-center {
  width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
}
.n-info {
  display: flex;
  justify-content: space-around;
}
.n-info > div {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 260px;
  height: 150px;
  text-align: center;
  border: 2px solid rgb(221, 216, 216);
  background: #fff;
  padding: 10px 0;
}
.n-info > div:hover {
  box-shadow: 3px 3px 5px rgb(138, 136, 136);
}
.table-list {
  margin: 20px 0;
}
</style>