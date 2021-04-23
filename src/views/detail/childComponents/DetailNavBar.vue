<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <img src="~assets/img/common/back.svg" alt="" @click="goPrePage" class="return-btn">
      </template>
      <template v-slot:center>
        <ul class="title">
          <li
            v-for="(item, index) in titles"
            :key="index"
            :class="['title-item',{'active':currentIndex === index}]"
            @click="titleItemClick(index)"
          >
            {{ item }}
          </li>
        </ul>
      </template>
      
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  components: { NavBar },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleItemClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick",index)
    },
    goPrePage(){
      this.$router.go(-1);
    }
  },
};
</script>
<style lang='scss' scoped>
.title {
  display: flex;
  .title-item {
    flex: 1;
    font-size: 13px;
  }
  .active{
    color:#f00;
  }
}

.return-btn{
    vertical-align: middle;
  }
</style>