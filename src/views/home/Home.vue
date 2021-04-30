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
    </scroll>
    <back-top @click.native="backTop" class="back-top" v-show="isShowBackTop">
      <img src="~assets/img/common/top.png" alt="" />
    </back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import HomeSwiper from "./components/HomeSwiper";
import RecommendView from "./components/RecommendView";
import FeatureView from "./components/FeatureView";

import { getHomeMultiData, getHomeGoods } from "network/home.js";
import { itemListenerMixin,backTopMixin } from "commonjs/mixin";
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
  },
  mixins: [itemListenerMixin,backTopMixin],
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

  mounted() {},
  methods: {
    getHomeMultiData() {
      getHomeMultiData().then((res) => {
        this.banner = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        if (res.data.data.list) {
          this.goods[type].list.push(...res.data.data.list);

          /* 原接口已不可用，这里是模拟的假数据 */
          /* if (type === "pop") {
          for (let i = 0; i < 30; i++) {
            this.goods[type].list.push({
              id:i+1,
              iid:i+1,
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
              id:1000+i+1,
              iid:1000+i+1,
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
              id:5000+i+1,
              iid:5000+i+1,
              price: "￥280.00",
              cfav: "时尚女装",
              show: {
                img: require("assets/img/home/goodsList/fashion3.jpg"),
              },
              title: "带帽运动服2021新款",
            });
          }
        } */
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

      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    scrollPosition(position) {
      //1，判断backTop是否显示：
      this.isShowBackTop = -position.y > 300;

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
    //1.保存Y值：
    this.saveY = this.$refs.scroll.getScrollY();

    //2.取消全局事件的监听：
    //原因：详情页的图片加载完不需要刷新home页
    this.$bus.$off("imgLoad", this.imgItemListener);
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

