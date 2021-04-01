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
    <tab-control
      :titles="titles"
      class="tab-control"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="scroll-wrapper"
      ref="scroll"
      :probe-type="3"
      @scrollPosition="scrollPosition"
      :pullUpLoad="true"
      @loadMore="getHomeGoods(currentType)"
    >
      <home-swiper
        :banner="banner"
        class="home-swiper"
        @swiperImgLoaded.once="swiperImgLoaded"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="titles"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
      <!-- <ul>
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
      </ul> -->
    </scroll>
    <back-top @click.native="backTop" v-show="isShow"></back-top>
    <!-- <ul style="margin-top: 519px">
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
    </ul> -->
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
import debounce from "commonjs/utils";
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
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: null,
    };
  },
  created() {
    this.getHomeMultiData();

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    this.$nextTick(() => {
      let refresh = debounce(this.$refs.scroll.refresh, 200);
      //监听item中的图片是否加载完成
      this.$bus.$on("imgLoad", () => {
        refresh();
      });
    });
  },
  methods: {
    getHomeMultiData() {
      getHomeMultiData().then((res) => {
        this.banner = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
        // this.titles = res.data.data;
      });
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(() => {
        // if (res.data.list) {
        // this.goods[type].list.push(...res.data.list);
        /* 原接口已不可用，这里是模拟的假数据 */
        if (type === "pop") {
          for (let i = 0; i < 30; i++) {
            this.goods[type].list.push({
              id:i,
              price: "￥280.00",
              cfav: "时尚女装",
              show: {
                img: require("assets/img/home/goodsList/fashion.jpg"),
              },
              title: "带帽运动服2021新款",
            });
          }
        } else if (type === "new") {
          for (let i = 0; i < 30; i++) {
            this.goods[type].list.push({
              id:1000+i,
              price: "￥280.00",
              cfav: "时尚女装",
              show: {
                img: require("assets/img/home/goodsList/fashion2.jpg"),
              },
              title: "带帽运动服2021新款",
            });
          }
        } else {
          for (let i = 0; i < 30; i++) {
            this.goods[type].list.push({
              id:5000+i,
              price: "￥280.00",
              cfav: "时尚女装",
              show: {
                img: require("assets/img/home/goodsList/fashion3.jpg"),
              },
              title: "带帽运动服2021新款",
            });
          }
        }

        // }
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

      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backTop() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500);
    },

    scrollPosition(position) {
      //1，判断backTop是否显示：
      this.isShow = -position.y > 300;

      //2,决定tabControl是否吸顶（position:fixed）
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },

    swiperImgLoaded() {
      /* 因为它在计算offsetTop时，页面中的图片还没加载完，此时offsetTop的值因为不包含图片的高度，所以是不准确的，
      正确的做法是先监听图片的加载，等到图片完全加载出来了，再获取offsetTop的值。*/
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
  activated() {
    this.$nextTick(() => {
      this.$refs.scroll.scroll.scrollTo(0, this.saveY, 0);
      this.$refs.scroll.scroll.refresh();
    });
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },
};
</script>

<style lang="scss" scoped>
#home {
  height: 100vh;
  position: relative;
}
.scroll-wrapper {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.home-nav {
  // position: fixed;
  // z-index: 10;
  // top: 0;
  // width: 100%;

  background: crimson;
  color: #fff;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>

