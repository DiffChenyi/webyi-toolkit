<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    window.document.title = "Toolkit";
  },
};
</script>

<style></style>