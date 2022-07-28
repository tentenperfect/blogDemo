<template>
  <div class="edituser">
    <div class="content">
      <div class="profile">
        <el-avatar :src="usermsg.url"></el-avatar>

        <div class="upload">
          <input
            type="file"
            placeholder="上传头像"
            ref="picfile"
            @change="getUrl"
          />
        </div>
      </div>
      <div class="user-msg">
        <el-descriptions title="用户信息" :column="1" size="medium">
          <el-descriptions-item label="用户ID">{{
            usermsg.uid
          }}</el-descriptions-item>
          <el-descriptions-item label="账户状态">{{
            usermsg.enabled || "-----"
          }}</el-descriptions-item>
          <el-descriptions-item label="账户权限">{{
            usermsg.roles || "-----"
          }}</el-descriptions-item>
          <el-descriptions-item label="用户名"
            >{{ usermsg.username }} <i class="el-icon-edit" @click="open"></i
          ></el-descriptions-item>
          <el-descriptions-item label="文章数">{{
            usermsg.num || "-----"
          }}</el-descriptions-item>
          <el-descriptions-item label="使用时间">{{
            usermsg.time || "-----"
          }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "edituser",
  data() {
    return {
      url: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      userinfo: ["用户ID", "用户名", "文章数", "使用时间"],
      username: "",
    };
  },
  computed: {
    usermsg() {
      // return { id: 1, username: "admin", num: 20, time: 30 };
      return this.$store.getters.userInfo;
    },
  },
  methods: {
    getUrl() {
      console.log("pic: " + this.$refs.picfile.value);
      console.log(this.$refs.picfile.files[0]);
      this.url = this.$refs.picfile.value;
      let imgFile = this.$refs.picfile.files[0];
      this.$store.dispatch("uploadImg", imgFile);
    },
    open() {
      this.$prompt("请输入用户名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{6,10}$/,
        inputErrorMessage: "用户名长度需在6-10位",
      })
        .then(({ value }) => {
          console.log(value);
          this.$store.dispatch("editUser", value).then(function () {
            this.$message({
              type: "success",
              message: "你的用户名成功更改为: " + value,
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
  },
};
</script>

<style scoped>
.edituser {
  width: 72rem;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background: #fff;
  border-radius: 10px;
}
.el-avatar {
  width: 80px;
  height: 80px;
}
.profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.pro-btn {
  margin: 0.4rem 0;
}
.user-msg {
  display: flex;
  width: 50%;
  margin: 0 20px;
}
.update {
  text-align: left;
}
.update-btn {
  width: 6rem;
  height: 1.8rem;
  border: 2px solid #666;
  cursor: pointer;
}
.edit-date {
  align-items: center;
}
.el-descriptions {
  width: 100%;
  justify-content: center;
}

.el-descriptions-item i {
  cursor: pointer;
}
</style>