<template>
  <div class="draft">
    <h2>草稿箱</h2>
    <div class="draft-box">
      <div v-for="item in draftList" :key="item.id">
        <div class="title">
          <h2>{{ item.title }}</h2>
          <span>{{ item.time }}</span>
        </div>
        <div class="bottom">
          <p>{{ item.content }}</p>
          <div class="action">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click.native="editDraft(item.aid)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click.native="deleteDraft(item.aid)"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-s-promotion"
              circle
              @click.native="publicArticle(item.aid)"
            ></el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "draft",
  data() {
    return {};
  },
  computed: {
    draftList() {
      //   return this.$store.state.draftList;
      return [
        {
          title: "草稿箱",
          content: "sbafnslaf",
          time: "2021-4-21",
          aid: "1111",
        },
      ];
    },
  },
  methods: {
    editDraft(aid) {
      this.$router.push({ name: "blog", params: { action: "edit", aid: aid } });
    },
    deleteDraft(aid) {
      this.$store.dispatch("deleteArticle", aid);
    },
    publicArticle(aid) {
      this.$store.dispatch("restoreArticle", aid);
    },
  },
};
</script>

<style scoped>
.draft {
  width: 72rem;
}
.draft-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #fff;
  border-radius: 10px;
  justify-content: space-between;
  padding: 16px 32px;
  margin-top: 16px;
  transition: 0.3s ease-in-out;
}
.draft-box:hover {
  box-shadow: 3px 3px 5px rgb(138, 136, 136);
}
.draft-box h2 {
  text-align: left;
  height: 2rem;
}
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 12rem;
  height: 32px;
  justify-content: space-between;
  line-height: 32px;
}
.bottom {
  display: flex;
  /* width: 50rem; */
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-indent: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>