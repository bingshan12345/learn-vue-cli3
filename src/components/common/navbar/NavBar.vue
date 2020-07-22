<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .nav-bar{
    display:flex;
    line-height:44px;
    box-shadow:0 1px 1px rgba(100,100,100,0.1);
    // box-shadow:0 1px 10px 2px #000;
    .left{
      width:60px;
      text-align: center;
    }
    .center{
      flex:1;
      text-align: center;
    }
    .right{
      width:60px;
      text-align: center;
    }
  }
</style>