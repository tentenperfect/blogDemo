<template>
  <div class="banner">
    <div class="banner-box">
      <el-avatar
        shape="square"
        :size="100"
        fit="fill"
        :src="userInfo.url"
      ></el-avatar>
      <div class="userinfo">
        <span>用户: {{ userInfo.username }}</span>
        <span>文章数: 20</span>
      </div>
      <div class="user-action">
        <router-link :to="{ name: 'blog', params: { action: 'create' } }">
          <div class="newblog">
            <i class="el-icon-news el-icon--left"></i>
            new Blog
          </div>
        </router-link>
        <router-link :to="`/user/editUser/${userInfo.uid}`">
          <div class="edit-user">
            <i class="el-icon-user el-icon--left"></i>个人资料
          </div></router-link
        >
        <router-link :to="`/user/userArticle/${userInfo.uid}`">
          <div class="user-blog">
            <i class="el-icon-document el-icon--left"></i>我的文章
          </div>
        </router-link>
        <router-link :to="`/user/draft/${userInfo.uid}`">
          <div class="user-blog">
            <i class="el-icon-takeaway-box el-icon--left"></i>草稿箱
          </div>
        </router-link>
      </div>

      <calendar></calendar>
    </div>
  </div>
</template>

<script>
import calendar from "../components/Calendar.vue";
export default {
  name: "banner",
  components: { calendar },
  data() {
    return {
      type: "user",
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
  },
};
</script>

<style scoped>
.banner {
  display: flex;
  justify-content: center;
  width: 320px;
  height: 1600px;
  background: #fff;
  border-radius: 10px;
}
.banner-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
}
.userinfo {
  display: flex;
  flex-direction: column;
  margin: 16px 0;
}
.user-action div {
  width: 144px;
  height: 48px;
  border-radius: 5px;
  cursor: pointer;
  margin: 4.8px 0;
  line-height: 48px;
  transition: 0.3s ease-in-out;
}
.user-action div:hover {
  background: #dfe0e0;
}
</style>