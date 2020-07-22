<template>
  <div id="tab-bar">
      <slot></slot>
  </div>
</template>

<script>
export default {
  name:"Tabbar"
}
</script>

<style lang="scss" scoped>
#tab-bar{
  display: flex;  

  .tab-bar-item{
    flex:1;
    text-align:center;
    height:49px;
    background: #f6f6f6;
  }
  
  .tab-bar-text{

  }
}
</style>