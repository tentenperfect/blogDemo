<template>
  <!-- 设置监听 实现吸顶 -->
  <div class="nav-bar">
    <div class="nav-box"
         :class="{ 'fix-nav': navFixed }">
      <div class="left-box">
        <span class="logo">Logo</span>
        <div class="link-box">
          <router-link v-for="(router, index) in routers"
                       :key="index"
                       :to="router.to"
                       class="nav"
                       @click="hightlight = router.value"
                       :class="{ islight: highlight == router.value }">
            <span class="nav-link">{{ router.value }}</span>
          </router-link>
        </div>
      </div>

      <div class="right-box">
        <div class="profile">
          <router-link :to="`/user/edituser/${userInfo.uid}`">
            <el-avatar :src="userInfo.url"></el-avatar>
          </router-link>
        </div>
        <el-dropdown>
          <span class="userstatus el-dropdown-link">
            {{ userInfo.username == "" ? "请登录" : userInfo.username }}
          </span>
          <el-dropdown-menu slot="dropdown"
                            v-show="userInfo.uid">
            <el-dropdown-item @click.native="loginOut">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data () {
    return {
      navFixed: false,
      highlight: "博客",
      routers: [
        { value: "博客", to: "/index" },
        { value: "发布博客", to: "/blog" },
        { value: "热搜榜", to: "/hotsearch" },
        { value: "设置", to: "/setting" },
        { value: "关于我们", to: "/about" },
      ],
    };
  },
  mounted () {
    window.addEventListener("scroll", this.watchScroll);
  },
  destroyed () {
    window.removeEventListener("scroll", this.watchScroll);
  },
  computed: {
    userInfo () {
      return this.$store.getters.userInfo;
    },
  },
  methods: {
    watchScroll () {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(scrollTop);
      var offsetTop = document.querySelector(".nav-box").offsetHeight;
      // console.log("offsetTop:" + offsetTop);
      if (scrollTop > offsetTop) {
        this.navFixed = true;
      } else {
        this.navFixed = false;
      }
    },
    loginOut () {
      console.log("点击登出");
      this.$store.dispatch("user/loginOut").then(
        () => {
          console.log('dengchu123');
          this.$router.push("/login")
        }
      );
      // location.reload();
    },
  },
};
</script>

<style scoped>
@keyframes nav {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.nav-bar {
  z-index: 999999;
}
.nav-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  background: #f5f5f5;
  flex-direction: row;
  width: 100%;
}
.left-box {
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
}
.logo {
  margin: 0 1rem 0 2rem;
}
.link-box {
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
}
.nav {
  color: #000;
  width: 5rem;
  height: 100%;
  line-height: 3rem;
  justify-content: center;
}
.nav:hover {
  background: #fff;
  border-radius: 8px;
  transition: 0.4s ease-in-out;
}
.fix-nav {
  position: fixed;
  top: 0;
  z-index: 99;
  background: rgb(221, 216, 216);
  animation: nav 0.3s ease-in-out;
}
.right-box {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.userstatus {
  margin: 0 1.5rem;
}
.islight {
  background: #fff;
}
</style>