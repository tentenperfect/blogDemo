<template>
  <div class="search">
    <navbar></navbar>

    <div class="search-main">
      <div class="header">
        <em>今日热搜</em>
      </div>
      <div class="hot-data-box">
        <div class="data" v-for="(item, index) in hotList" :key="index">
          <div class="left-box" v-if="item.note">
            <div class="title">
              <span class="hot-index" :class="{ hot: index > 2 }">{{
                index + 1
              }}</span
              ><i class="el-icon-trophy" v-show="index < 3"></i>
              <h3>{{ item.note }}</h3>
            </div>
            <div class="main">
              <p>
                {{ item.mblog ? matchText(item.mblog.text) : item.note }}
              </p>
            </div>
          </div>
          <div class="right-box">
            <div class="img">
              <img
                :src="getImg(item.mblog)"
                alt=""
                class="img-format"
                v-if="
                  item.mblog && item.mblog.pic_ids != [] && item.mblog.pic_ids
                "
              /><img
                :src="getImg(item.mblog)"
                alt=""
                class="img-format"
                v-else-if="item.mblog && item.mblog.page_info"
              />
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                alt=""
                v-else
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import navbar from "../components/navbar.vue";

export default {
  name: "hotSearch",
  components: { navbar },
  data() {
    return {
      hotList: [],
    };
  },
  created() {
    this.$loading({
      fullscreen: true,
      text: "正在玩命儿加载中",
    });
    this.getwbData();
  },
  methods: {
    async getwbData() {
      try {
        const { data: res } = await axios({
          url: "/weiboSearch/ajax/statuses/hot_band",
          method: "get",
        });
        if (res.ok !== 1) {
          return;
        }
        this.hotList = res.data.band_list;
        // console.log(this.hotList);
        this.$loading().close();
      } catch (err) {
        console.log("获取数据错误：" + err);
      }
    },
    matchText(text) {
      return text.replace(/<[^>]+>/g, "");
    },
    getImg(obj) {
      let url = "";
      if (obj.pic_ids !== [] && obj.pic_id) {
        url = `https://wx1.sinaimg.cn/orj360/${obj.pic_ids[0]}.jpg`;
      } else {
        if (obj.page_info && obj.page_info.page_pic) {
          url = obj.page_info.page_pic;
        } else {
          url =
            "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png";
        }
      }
      return url;
    },
  },
};
</script>

<style scoped>
.search-main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.header em {
  font-size: 30px;
}
.hot-data-box {
  display: flex;
  flex-direction: column;
  width: 40rem;
  justify-content: center;
  align-items: center;
}
.data {
  display: flex;
  width: 50rem;
  height: 9rem;
  align-items: center;
  flex-direction: row;
  /* border: 1px solid rgb(129, 127, 127); */
  border-radius: 10px;
  background: #fff;
  margin: 0.4rem;
  padding: 0 10px;
  transition: 0.3s ease-in-out;
}
.data:hover {
  box-shadow: 3px 3px 5px rgb(138, 136, 136);
}
.main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
}
.left-box {
  display: flex;
  flex: 4;
  flex-direction: column;
}
.title {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 30rem;
  text-align: left;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
}
.el-icon-trophy {
  position: absolute;
  top: 4px;
  left: 22px;
}
.left-box p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-indent: 1rem;
}
.img {
  width: 8rem;
  height: 8rem;
  justify-content: center;
  align-items: center;
}
.img-format {
  height: 100%;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 5px #000;
}
.right-box {
  margin-left: 10px;
}
.hot-index {
  width: 3rem;
  height: 1.2rem;
  background: linear-gradient(to right, red, white);
  margin-right: 2rem;
  border-radius: 10px 0 0 10px;
  padding-left: 0.4rem;
  font-weight: 600;
}
.hot {
  background: linear-gradient(to right, #666, white);
}
</style>