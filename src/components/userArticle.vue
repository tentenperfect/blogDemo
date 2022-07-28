<template>
  <div class="userArticle">
    <div class="content">
      <div class="nav">
        <div class="nav-link">
          <el-link :underline="false">升序</el-link>
          <el-link :underline="false">降序</el-link>
          <el-dropdown :hide-on-click="false"
                       size="mini">
            <span class="el-dropdown-link">
              文章类别<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown"
                              v-for="item in categoryList"
                              :key="item.id"
                              @click="catArticle(item.id)">
              <el-dropdown-item>{{ item.name }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="input">
          <input class="search"
                 type="text"
                 placeholder="搜索" />
        </div>
      </div>
      <div class="userArticle-box"
           v-if="userArticleList">
        <div class="article-box"
             v-for="items in userArticleList"
             :key="items.id">
          <div class="detail"
               @click="getArticle(items.id)">
            <div class="title">
              <h2>{{ items.title }}</h2>
              <el-tag type="success"
                      style="margin-left:20px">{{ items.cateName }}</el-tag>
            </div>

            <p class="article"
               v-html="items.htmlContent.replace(/<[^>]+>/g, '')"></p>
          </div>
          <div class="author">
            <div class="info">
              <el-avatar :src="items.src_url"></el-avatar>
              <span class="username">{{ items.nickname }}</span>
              <span class="timestamp">发表于 {{ items.publishDate }}</span>
              <div class="tag"
                   v-for="tag in items.tags.slice(0,3)"
                   :key="tag.id">
                <el-tag type="success">{{ tag.tag }}</el-tag>
              </div>
            </div>
            <div class="action">
              <el-button type="primary"
                         icon="el-icon-edit"
                         circle
                         @click.native="editDraft(items.id)"></el-button>
              <el-button type="danger"
                         icon="el-icon-delete"
                         circle
                         @click.native="removeDraft(items.id)"></el-button>
            </div>
          </div>
        </div>

      </div>
      <div class="null"
           v-else>快去发布博客叭</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userArticle",
  data () {
    return {
      currentPage: 1,
      count: 2,
    };
  },
  created () {
    this.$store.dispatch("userArticle", {
      uid: this.$store.state.user.userInfo.uid,
      page: this.currentPage,
      count: this.count,
    });
  },
  computed: {
    categoryList () {
      return this.$store.getters.categoryList;
    },
    userArticleList () {
      console.log("user");
      console.log(this.$store.getters.userArticleList)
      return this.$store.getters.userArticleList;
    },
  },
  methods: {
    editDraft (id) {
      this.$router.push({ name: "blog", params: { action: "edit", aid: id } });
    },
    removeDraft (id) {
      this.$store.dispatch("removeArticle", id);
    },
    selectPage (index) {
      this.currentPage = index;
      // this.$loading({
      //   text:'获取文章'
      // })
      this.$store.dispatch("userArticle", {
        uid: this.$store.state.userInfo.uid,
        page: this.currentPage,
        count: this.count,
      });
    },
    prePage () {
      this.currentPage++;
    },
    nextPage () {
      if (this.currentPage > 0) this.currentPage--;
    },
  },
};
</script>

<style scoped>
.userArticle {
  width: 72rem;
}
.content {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  width: 100%;
  padding: 0 0.5rem;
  border-radius: 10px;
  background: #e6eaea;
}
.nav-link {
  display: flex;
  align-items: center;
  width: 12rem;
  justify-content: space-around;
}
.input {
  display: flex;
}
.search {
  border: none;
  background: #fff;
  width: 15rem;
  height: 2rem;
  padding: 0.2rem 0.5rem;
  border-radius: 2rem;
}
.userArticle-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
.article-box {
  display: flex;
  width: 100%;
  height: 200px;
  justify-content: space-between;
  flex-direction: column;
  padding: 0.5rem;
  margin: 10px 0;
  border-radius: 10px;
  background: #e6eaea;
}
.article-box .detail {
  display: flex;
  flex-direction: column;
}
.detail .title {
  display: flex;
  flex-direction: row;
}
.article {
  display: flex;
  width: 100%;
  height: 5rem;
  text-indent: 2rem; /*首行缩进 */
  overflow: hidden;
  text-overflow: ellipsis;
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
  flex-direction: row;
  justify-content: space-between;
}
.tag {
  margin-left: 10px;
}
.author .action {
  opacity: 0;
  transition: 0.5s ease-in-out;
}
.author:hover .action {
  opacity: 1;
}
.username {
  width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.el-avatar {
  width: 40px;
  height: 40px;
}
.el-pagination {
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
}
.bottom-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
}
.bottom-box > ul {
  display: flex;
  flex-direction: row;
  margin: 0 16px;
}
.bottom-box > ul li {
  width: 35px;
  height: 35px;
  line-height: 35px;
  margin: 5px;
  color: rgb(111, 109, 109);
  border-radius: 17.5px;
  transition: 0.3s ease-in-out;
  cursor: pointer;
}
.bottom-box > ul li:hover {
  background: #b5b6b9;
}
.isSelected {
  background: #b5b6b9;
}
.el-icon-arrow-left,
.el-icon-arrow-right {
  cursor: pointer;
}
.null {
  display: flex;
  width: 100%;
  height: 800px;
  justify-content: center;
  align-items: center;
  background: #fff;
  color: #abaaaa;
}
</style>