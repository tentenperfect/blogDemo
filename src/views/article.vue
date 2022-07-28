<template>
  <div class="articles">
    <div class="nav">
      <navbar></navbar>
    </div>
    <div class="main">
      <div class="banner">
        <banner></banner>
      </div>
      <div class="article-box">
        <div class="article-title">
          <div class="title">
            <h2>{{ articleDetail.title }}</h2>
            <el-tag type="success">{{ articleDetail.cateName }}</el-tag>
          </div>

          <div class="article-msg">
            <span>作者: {{ articleDetail.nickname }}</span>
            <span>发布时间: {{ articleDetail.publishDate }}</span>
            <span>最近一次编辑的时间：{{ articleDetail.editTime }}</span>
            <div v-for="tag in articleDetail.tags"
                 :key="tag.id"></div>
          </div>
        </div>
        <div class="article-content">
          <div v-html="articleDetail.htmlContent.replace(/<img/g,'<img style=max-width:100%;height:auto;')"
               style="width: 100%;"></div>
        </div>
        <div class="article-bottom">
          <div class="tag"
               v-for="item in articleDetail.tags"
               :key=item.id>
            <el-tag>{{item.tag}}</el-tag>
          </div>
        </div>

        <div class="comments">
          <h2>评论</h2>
          <input type="text"
                 placeholder="说点啥叭"
                 class="written" />
          <div class="comments-content"
               v-for="comment in articleDetail.commentList"
               :key="comment.id">
            <div class="profile">
              <el-avatar :src="comment.profile_src"></el-avatar>
            </div>
            <div class="box">
              <span>{{ comment.username }}</span>
              <p>{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import banner from "../components/banner";
import navbar from "../components/navbar.vue";
export default {
  name: "article",
  components: { banner, navbar },
  data () {
    return {
      articleDetail: null
    };
  },
  mounted () {
    this.$store.commit("clearCurrent");
    this.initArticle();
    this.articleDetail = this.$route.params.article
    console.log("article:");
    let obj = this.articleDetail.tags
    this.articleDetail.tags = Object.keys(obj).map(function (i) { return obj[i] })
    console.log(this.articleDetail);
  },
  computed: {

  },
  methods: {
    //  toDate (stamp) {
    //    stamp = parseInt(stamp);
    //    let date = new Date(stamp);
    //    let yy = date.getFullYear();
    //    let mm = date.getMonth() + 1;
    //    let dd = date.getDate();
    //    let time = yy + "-" + mm + "-" + dd;
    //    return time;
    //  },
    initArticle () {
      this.$store.dispatch("Article", { id: this.$route.params.id });
    },
  },
};
</script>

<style scoped>
.articles {
  display: flex;
  flex-direction: column;
}
.main {
  display: flex;
  justify-content: space-around;
  padding: 16px 16px;
}
.article-box {
  display: flex;
  background: #fff;
  flex-direction: column;
  width: 1200px;
  padding: 0 8px;
  margin-left: 10px;
  border-radius: 10px;
  padding: 10px 0;
}
.title {
  display: flex;
  flex-direction: row;
  margin: 10px 10px;
}
.title h2 {
  margin: 0 20px;
}
.article-title {
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 3rem;
  justify-content: center;
}
h2 {
  text-align: left;
}
.article-msg {
  display: flex;
  text-align: left;
  height: 1.5rem;
  align-items: center;
  color: #8f8e8e;
}
.article-msg > * {
  margin-left: 1rem;
}
.article-content {
  display: flex;
  width: 100%;
  padding: 0 10px;
  margin: 20px 0;
  text-align: left;
  text-indent: 2rem; /*首行缩进*/
}

.article-bottom {
  display: flex;
  flex-direction: row;
  margin: 10px 10px;
}
.tag {
  margin-left: 10px;
}
.written {
  display: flex;
  width: 100%;
  height: 2rem;
  padding: 0rem 0.5rem;
  border: 2px solid #666;
  border-radius: 5px;
}
.comments {
  padding: 10px 10px;
}
.comments-content {
  display: flex;
  flex-direction: row;
}
.profile {
  margin: 0 0.5rem;
}
.el-tag {
  text-align: center;
}
</style>