<template>
  <div>
    <nav-bar class="home-nav">
      <template v-slot:left>
        <span>左</span>
      </template>
      <template v-slot:center>
        <div>购物街</div>
      </template>
      <template v-slot:right>
        <span>右</span>
      </template>
    </nav-bar>
    <div div>首页</div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  components:{
    NavBar,
  }
}
</script>

<style lang="scss" scoped>
  .home-nav{
    background:crimson;
    color:#fff;
  }
</style>