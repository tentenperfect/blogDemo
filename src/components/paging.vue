<template>
  <div class="paging">
    <div class="bottom-box"
         v-if="blogList.length>8">
      <i class="el-icon-arrow-left el-icon--left"
         @click="prePage"></i>
      <ul>
        <li v-for="index in blogList.totalPage"
            :key="index"
            @click="selectPage(index)"
            :class="{ isSelected: currentPage == index }">
          {{ index }}
        </li>
      </ul>
      <i class="el-icon-arrow-right el-icon--right"
         @click="nextPage"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "paging",
  props: {
    blogList: []
  },
  created () {
    console.log();
  },
  data () {
    return {

    }
  },

}
</script>

<style>
</style>