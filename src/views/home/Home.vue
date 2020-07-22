<template>
  <div>
  </div>
</template>
<script>
import {getHomeMultiData} from 'network/home.js'
export default {
  name:'Home',
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
<style lang='scss' scoped>
</style>