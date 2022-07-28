<template>
  <div class="blogContent">

    <div class="nav">
      <div class="nav-link">
        <el-link :underline="false">升序</el-link>
        <el-link :underline="false">降序</el-link>
        <el-dropdown :hide-on-click="false"
                     size="mini">
          <span class="el-dropdown-link">
            文章类别<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in categoryList"
                              :key="item.id"
                              @click="getCateArticle(item.id)">{{ item.cateName }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="input">
        <input class="search"
               type="text"
               placeholder="搜索" />
      </div>
    </div>
    <div class="allArticle-box">
      <div class="article-box"
           v-for="items in blogList"
           :key="items.id">
        <div class="detail"
             @click="getArticle(items.id)">
          <div class="title">
            <h2>{{ items.title }}</h2>
            <el-tag type="success">{{ items.cateName }}</el-tag>
          </div>
          <div>
            <p class="article"
               v-if="items.htmlContent"
               v-html="showArticle(items.htmlContent)"></p>
          </div>
        </div>
        <div class="author">
          <div class="info">
            <el-avatar :src="items.src_url"></el-avatar>
            <span class="username">{{ items.nickname }}</span>
            <span class="timestamp">发表于 {{ items.publishDate }}</span>
            <div class="tagList">
              <div class="tag"
                   v-for="(tag,index) in items.tags"
                   :key="tag.id">
                <el-tag v-if="index<3">{{ tag.tag }}</el-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <paging :blogList='blogList'></paging>

  </div>
</template>

<script scoped>
import paging from "../components/paging.vue"
export default {
  name: "blogContent",
  data () {
    return {};
  },
  components: {
    paging
  },
  props: {
    type: "",
  },
  created () {
    this.$store.dispatch("allCategory");
    this.$store.dispatch("allArticle");
  },
  computed: {
    //2022/6/12修改正确
    blogList () {
      let array = this.$store.getters.blogList
      console.log("blogList");
      console.log(array);
      return array.array;
    },
    //2022/6/12修改正确
    categoryList () {
      let obj = this.$store.getters.categoryList
      let array = Object.keys(obj).map(function (i) { return obj[i] })
      return array;
    },
    userInfo () {
      return this.$store.getters.userInfo;
    },

  },
  methods: {
    getArticle (id) {
      let current = this.blogList.filter(item => id == item.id)
      this.$router.push({
        name: "article",
        params: { uid: this.userInfo.uid, id: id, article: current[0] },
      });
    },
    showArticle (show) {
      show = show.replace(/<[^>]+>/g, '')
      return show
    }
  },
};
</script>

<style scoped>
.blogContent {
  width: 72rem;
  margin-bottom: 20px;
  background: #e6eaea;
}
.content {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  background: #e6eaea;
  border-radius: 10px;
  overflow: hidden;
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  width: 100%;
  padding: 0 8px;
}
.nav-link {
  display: flex;
  align-items: center;
  width: 12rem;
  justify-content: space-around;
}
.imput {
  display: flex;
}
.search {
  border: none;
  background: #fff;
  width: 15rem;
  height: 32px;
  padding: 0.2rem 0.5rem;
  border-radius: 2rem;
}
.article-box {
  display: flex;
  width: 100%;
  height: 230px;
  justify-content: space-around;
  flex-direction: column;
  padding: 10px;
}
.article-box:hover {
  background: #e5e5e5;
}
.article-box .detail {
  display: flex;
  flex-direction: column;
}
.detail .title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.title h2 {
  margin-right: 16px;
}
.article {
  display: flex;
  width: 100%;
  height: 80px;
  line-height: 28px;
  text-indent: 32px; /*首行缩进 */
  text-align: left;
  overflow: hidden;
  margin-top: 5px;
  text-overflow: ellipsis;
}
.author {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.info {
  display: flex;
  align-items: center;
  height: 30px;
  width: 800px;
  text-align: center;
  align-items: center;
  /* justify-content: space-around; */
}
.author .action {
  opacity: 0;
  transition: 0.5s ease-in-out;
}
.author:hover .action {
  opacity: 1;
}
.timestamp {
  display: flex;
  width: 160px;
  margin: 0 10px;
  overflow: hidden;
}
.username {
  width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.el-avatar {
  width: 40px;
  height: 40px;
  margin: 0 5px;
}
.tagList {
  display: flex;
  width: 260px;
  justify-content: space-around;
  align-items: center;
}
</style>