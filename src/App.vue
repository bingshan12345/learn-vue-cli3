<template>
  <div id="app">
    <router-view></router-view>
    <!-- <main-tab-bar class="main-tab-bar"></main-tab-bar> -->
    <tab-bar1></tab-bar1>
  </div>
</template>

<script>
// import MainTabBar from 'components/content/MainTabBar.vue'
import TabBar1 from "components/common/tabbar/TabBar1.vue";
export default {
  name: "App",
  components: {
    // MainTabBar,
    TabBar1,
  },
};
</script>

<style lang="scss" scoped>
@import "assets/css/base.css";

.main-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
}
</style>
