<template>
  <div id="app">
    <router-view></router-view>
    <main-tab-bar class="main-tab-bar"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/MainTabBar.vue'
export default {
  name: 'App',
  components:{
    MainTabBar
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/base.css'; 

.main-tab-bar{
  position:fixed;
  bottom:0;
  left:0;
  right:0;
  box-shadow: 0 -1px 1px rgba(100,100,100,0.2);
}
</style>
