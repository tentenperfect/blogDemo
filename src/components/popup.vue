<template>
  <transition class="pop">
    <div class="popup" v-show="isShow">
      <span>{{ info }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: "popup",
  data() {
    return {
      isShow: false,
      info: "",
    };
  },
  methods: {
    openPop(tip) {
      this.isShow = true;
      this.info = tip;
      setTimeout(this.closePop, 1000);
    },
    closePop() {
      this.isShow = false;
    },
  },
};
</script>

<style>
@keyframes popanim {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.pop-enter-active {
  animation: popanim 0.5s ease-in-out;
}
.popup {
  display: flex;
  width: 20rem;
  height: 2rem;
  justify-content: center;
  align-items: center;
  border: 2px solid rgb(231, 62, 62);
  border-radius: 5px;
  background: rgba(249, 146, 146, 0.7);
  color: #666;
}
</style>