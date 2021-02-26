<template>
  <div class="bar">
    <i class="fas fa-tachometer-alt-slowest    "></i>
  
    
  </div>
</template>
<script>
export default {
  name: "bar",
  data(){
    return {
      list:["数学","英语","物理","语文","化学"]
    }
  }
};
</script>
<style lang='scss' scoped>
.bar {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>