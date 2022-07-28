<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: var(--background);
  overflow-x: hidden;
}
:root {
  --color0: #4ec9b0;
  --background: #f5f5f5;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: #000;
}
button,
input,
textarea {
  border: 0;
  background: none;
  outline: none; /*去掉默认边框*/
}
li {
  list-style: none;
}
</style>
