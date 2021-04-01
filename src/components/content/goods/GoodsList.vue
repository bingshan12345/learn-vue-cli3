<template>
<div class="goods-list">
  <goods-list-item v-for="(item,index) of goods" :key="index" :goods-item="item"></goods-list-item>
</div>
</template>
<script>
import GoodsListItem from "components/content/goods/GoodsListItem"
export default {
  name:"GoodsList",
  components:{
    GoodsListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: var(--color-background);

    padding: 2px;
  }
</style>