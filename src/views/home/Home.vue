<template>
  <div id="home">
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
    <scroll
      class="scroll-wrapper"
      ref="scroll"
      :probe-type="3"
      @scrollPosition="scrollPosition"
      :pullUpLoad="true"
      @loadMore="getHomeGoods(currentType)"
    >
      <home-swiper :banner="banner" class="home-swiper"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="titles"
        class="tab-control"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
      <ul>
        <li>列表1</li>
        <li>列表2</li>
        <li>列表3</li>
        <li>列表4</li>
        <li>列表5</li>
        <li>列表6</li>
        <li>列表7</li>
        <li>列表8</li>
        <li>列表9</li>
        <li>列表10</li>
        <li>列表11</li>
        <li>列表12</li>
        <li>列表13</li>
        <li>列表14</li>
        <li>列表15</li>
        <li>列表16</li>
        <li>列表17</li>
        <li>列表18</li>
        <li>列表19</li>
        <li>列表20</li>
      </ul>
    </scroll>
    <back-top @click.native="backTop" v-show="isShow"></back-top>
    <ul style="margin-top: 519px">
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
    </ul>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./components/HomeSwiper";
import RecommendView from "./components/RecommendView";
import FeatureView from "./components/FeatureView";

import { getHomeMultiData, getHomeGoods } from "network/home.js";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banner: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShow: false,
    };
  },
  created() {
    this.getHomeMultiData();

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

    //监听item中的图片是否加载完成
    this.$bus.$on("imgLoad",() => {
      this.$refs.scroll.scroll.refresh();
    })
  },
  methods: {
    getHomeMultiData() {
      getHomeMultiData().then((res) => {
        // console.log(res);
        this.banner = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
        // this.titles = res.data.data;
      });
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        if (res.data.list) {
          this.goods[type].list.push(...res.data.list);
        }
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },

    backTop() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500);
    },

    scrollPosition(position) {
      this.isShow = -position.y > 300;
    },

    //防抖函数：
    debounce(func,delay){
      let timer = null;
      
    }
  },
};
</script>

<style lang="scss" scoped>
#home {
  height: 100vh;
  margin-top: 44px;
}
.scroll-wrapper {
  // height:calc(100% - 49px - 44px);
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.home-nav {
  position: fixed;
  z-index: 10;
  top: 0;
  width: 100%;

  background: crimson;
  color: #fff;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
</style>

