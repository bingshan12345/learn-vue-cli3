<template>
<div>
  <swiper>
      <swiper-item v-for="item of banner" :key="item.link">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoaded">
        </a>  
      </swiper-item>
    </swiper>
</div>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  name:"HomeSwiper",
  components: {Swiper, SwiperItem},
  props:{
    banner:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    imgLoaded(){
      this.$emit("swiperImgLoaded")
    }
  }
}
</script>
<style lang='scss' scoped>
</style>