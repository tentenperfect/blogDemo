<template>
  <div class="user-page">
    <navbar></navbar>
    <div class="main">
      <div class="left">
        <banner></banner>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "../components/navbar.vue";
import blogContent from "../components/blogContent.vue";
import banner from "../components/banner.vue";
export default {
  name: "user",
  components: {
    navbar,
    blogContent,
    banner,
  },
};
</script>

<style>
.main {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 16px;
}
@media screen and (max-width: 1000px) {
  .left {
    visibility: hidden;
    transition: 0.2s ease-in-out;
  }
}
</style>