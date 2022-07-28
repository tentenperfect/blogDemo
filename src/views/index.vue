<template>
  <div class="index-page">
    <navbar></navbar>
    <div class="index-main">
      <div class="carousel">
        <el-carousel :interval="4000"
                     type="card"
                     height="220px"
                     align="center">
          <el-carousel-item v-for="
                     item
                     in
                     6"
                            :key="item">
            <h3 class="medium">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="categoryList">
        <div v-for="item in categoryList"
             :key="item.id">
          <el-button class="btn-cate"
                     @click="getCateArticle(item.id)">{{item.cateName}}</el-button>
        </div>
      </div>
      <div>
        <blogContent></blogContent>

      </div>
    </div>
    <!-- <canvas id="canvas"></canvas> -->
  </div>
</template>

<script>
import navbar from "../components/navbar.vue";
import blogContent from "../components/blogContent.vue";
import { canvasStar } from "../components/CanvasStar.js"
export default {
  components: { navbar, blogContent, canvasStar },
  name: "index",
  data () {
    return {
      pagetype: "index",
      currentPage: 1,
      count: 2
    };
  },
  mounted () {
    canvasStar()
  },
  computed: {
    categoryList () {
      let obj = this.$store.getters.categoryList
      //将对象转为字符串
      let array = Object.keys(obj).map(function (i) { return obj[i] })
      return array;
    },
  },
  methods: {
    getCateArticle (id) {
      let that = this;
      this.$store.dispatch("categoryArticleRequest", { id: id, page: this.currentPage, count: this.count }).then(() => {
        that.$store.state.categoryArticleList;
      });
    },
  },
};
</script>

<style scoped>
.index-page {
  position: relative;
}
#canvas {
  position: absolute;
  top: 0;
  left: 0;
}
.index-main {
  display: flex;
  width: 1152px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  flex-direction: column;
  z-index: 90;
}
.carousel {
  width: 100%;
  margin: 16px 0;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item {
  border-radius: 10px;
  transition: 0.3s ease-in-out;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.categoryList {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
.btn-cate {
  margin: 8px 16px;
}
</style>