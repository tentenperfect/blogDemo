<template>
  <div class="blog">
    <navbar></navbar>
    <div class="blog-box">
      <div class="box">
        <h2 class="header">发布一个新的Blog</h2>
        <div class="title">
          <input type="text"
                 placeholder="文章标题"
                 class="title-content"
                 v-model="blog_title" />
        </div>

        <div class="content-box">

          <div class="tags">
            <h4>标签选择</h4>
            <div>
              <el-tag v-for="tag in tagSelectList"
                      :key="tag.id"
                      closable
                      type="success"
                      class="el-tag"
                      @close='deltag(tag.tid)'>
                {{ tag.tname }}
              </el-tag>
              <input type="text"
                     placeholder="标签"
                     class="taginput"
                     v-model="tagname"
                     @keyup.enter="newtag(tagname)"
                     v-show="isShow" /><button class="add-tags"
                      @click="isShow = !isShow">
                {{ isShow == false ? "自定义属性添加" : "不添加了" }}
              </button>
            </div>
          </div>
          <div class="category">
            <h4>文章分类</h4>
            <div class="List">
              <button class="article-cat"
                      :class="{selected:highlight==item.cid}"
                      v-for="item in categoryList"
                      :key="item.cid"
                      @click="highlight = item.cid">
                {{ item.cname }}
              </button>
            </div>
          </div>
          <div class="editor-box">
            <!-- 引入editor富文本编辑器 -->
            <editor ref="editorOne"
                    v-model="detail"
                    @change="change"
                    style="height:500px"></editor>
          </div>

        </div>
        <button class="bringup"
                @click="saveInput()">发表</button>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "../components/navbar.vue";
import Editor from '../components/Editor.vue'
export default {
  name: "blog",
  components: {
    navbar,
    Editor
  },
  data () {
    return {
      tagList:[],
      tagname:'',
      blog_title: "",
      blog_content: "",
      category: "",
      isShowTagInput: false,
      isShow: false,
      editor: '',
      detail: "",
      highlight: ''
    };
  },
  mounted () {
    this.$store.dispatch('tagList');
    // this.tagSelectList()
    // this.$store.dispatch("allCategory");

    // this.$store.commit("clearCurrent");
    let that = this
    // if (this.type) {
    //   this.$store.dispatch("article/Article", { aid: this.$route.params.aid })
    //   that.initform()
    // }
  },

  computed: {
    userInfo () {
      return this.$store.state.user.userInfo;
    },
    categoryList () {
      return this.$store.getters.categoryList;
    },
    type () {
      return this.$route.params.action || 'create';
    },
    currentArticle () {
      return this.$store.getters.currentArticle;
    },
    tagSelectList(){
      this.tagList = this.$store.getters.tagSelectList
      return this.$store.getters.tagSelectList
    }
  },
  methods: {
    change (val) {
      this.blog_content = val
    },
    saveInput () {
      if (this.blog_title && this.blog_content) {
        // console.log(this.categoryList);
        // let isCategory = this.categoryList.filter(item => {
        //   return item.flag == true;
        // });
        this.category = '';
        let tagIdList = this.tagList.map(item => item.tid.toString())
        let blog_msg = {
          uid: this.userInfo.uid,
          username: this.userInfo.username,
          title: this.blog_title,
          htmlContent: this.blog_content,
          tagIds: tagIdList.join(','),
          timeStamp: new Date().valueOf(),
          aid: this.userInfo.uid + new Date().valueOf(),
          cid: this.highlight,
        };
        this.saveBlog(this.type, blog_msg);
        // this.$store.commit("clearItem");
        this.clearItem();
      } else {
        this.$message({
          type: "error",
          message: "文章标题和文章内容不能为空！",
        });
      }
    },
    saveBlog (type, msg) {

      if (type == "create") {
        this.$store.dispatch("Blog", {
          type: "create",
          blog: msg,
        });
      } else if (type == "edit") {
        this.$store.dispatch("editBlog", {
          type: "edit",
          blog: msg,
        });
      }
    },
    clearItem () {
      this.tagList = [];
      this.blog_title = "";
      this.blog_content = "";
    },
    newtag (tagName) {
      let tag = {
        id: new Date,
        tagName: tagName
      };
      if (this.tagList.length < 8) {
        this.tagList.push(tag);
      } else {
        this.$message({
          type: "error",
          message: "标签数量上限为八个昂",
        });
      }
      this.tagname = "";
    },

    selected (id) {
      this.cateSelected = id;
    },
    initform () {
      let articleForm = this.currentArticle;
      this.tagList = articleForm[0].tagList;
      // this.tagSelectList = articleForm[0].tagSelectList;
      this.blog_title = articleForm[0].title;
      this.blog_content = articleForm[0].content;
    },
    deltag (id) {
      this.tagList = this.tagList.filter(item => item.id != id)
    }
  },
};
</script>

<style scoped>
h4 {
  text-align: left;
}
.blog {
  position: relative;
}
.header {
  margin: 2rem;
}
.blog-box {
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 200px; */
}
.box {
  display: flex;
  width: 1000px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #fff;
  margin-bottom: 16px;
  padding: 0 5px;
}
.title {
  display: flex;
  justify-content: center;
}
.title-content {
  display: flex;
  width: 50rem;
  height: 2rem;
  border: 2px solid #666;
  padding-left: 0.5rem;
}
.content-box {
  margin: 2rem 0;
}
textarea {
  display: flex;
  justify-content: flex-start;
  width: 50rem;
  height: 40rem;
  border: 2px solid #666;
  padding: 0.5rem;
}
.category {
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 48px 0;
  text-align: left;
}
.article-cat {
  text-align: center;
  line-height: -1.5rem;
  border-radius: 1.2rem;
  border: 2px solid #666;
  padding: 0.5rem 1rem;
  /* height: 1.5rem; */
  margin: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  color: #666;
}
.selected {
  color: #fff;
  background: #666;
}
.tags {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  height: 5rem;
  margin: 0 auto;
}
.tags > div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}
.user-defined {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.el-tag {
  margin: 8px;
}
.tag {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 2rem;
  border: 2px solid #666;
  border-radius: 5px;
  padding: 0.4rem;
  margin: 0 0.5rem;
}
.add-tags {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  padding: 0.4rem;
  border-radius: 5px;
  border: 2px solid #666;
  cursor: pointer;
}
.taginput {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 2rem;
  border: 2px solid #666;
  border-radius: 5px;
  padding: 0.4rem;
  margin: 0 0.5rem;
}
.bringup {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 2rem;
  cursor: pointer;
  border: 2px solid #666;
  border-radius: 10px;
  margin-bottom: 32px;
}
.el-dropdown-link {
  margin: 0 0.4rem;
  padding: 0.4rem;
  border: 2px solid #666;
  border-radius: 5px;
}
</style>