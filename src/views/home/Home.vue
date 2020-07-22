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
import NavBar from 'components/common/navbar/NavBar';
import {getHomeMultiData} from 'network/home.js'
export default {
  name:'Home',
  components:{
    NavBar,
  },
  data(){
    return {
      banner:null,
      recommend:[],
    }
  },
  created(){
    getHomeMultiData().then(res => {
      console.log(res);
      this.banner = res.data.data.banner.list;
      this.recommend = res.data.data.recommend.list;
    })
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
  .home-nav{
    background:crimson;
    color:#fff;
  }
</style>

