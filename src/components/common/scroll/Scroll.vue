<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "BetterScroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        movable: true,
        observeDOM: true,
        probeType: this.probeType,
        pullUpLoad:this.pullUpLoad
      });

      this.scroll.on("scroll", (position) => {
        // console.log(position);
        this.$emit("scrollPosition",position);
      });

      this.scroll.on("pullingUp",() => {
        console.log("上拉加载更多");
        this.$emit("loadMore")
        
      })
    });
  },
  methods: {
    finishPullUp(){
      this.scroll.finishPullUp();
    }
  },
};
</script>
<style lang='scss' scoped>
</style>