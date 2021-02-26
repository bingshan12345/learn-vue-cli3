<template>
<div>
  <div id="tabBar1">
    <div>首页</div>
    <div>分类</div>
    <div>购物车</div>
    <div>我的</div>
  </div>
</div>
</template>
<script>
export default {
  name:"tabBar1",

}
</script>
<style lang='scss' scoped>
#tabBar1{
  display:flex;
  justify-content: space-around;
  align-items: center;
  height:49px;
  background: #f5f5f5;
  box-shadow: 0 -1px 1px rgba(100,100,100,0.4);
  
  position:fixed;
  left:0;
  right:0;
  bottom:0;
}
</style>
