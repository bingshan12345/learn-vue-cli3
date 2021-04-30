<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav-bar"
      @titleClick="titleClick"
      ref="detailNavBar"
    />
    <Scroll
      class="detial-content"
      ref="scroll"
      :probe-type="3"
      @scrollPosition="contentScroll"
    >
    <!-- <div>{{$store.state.cartList.length}}</div> -->
    <ul>
      <li v-for="item in $store.state.cartList" :key="item.iid">{{item}}</li>
    </ul>
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>

      <detail-param-info
        :param-info="paramInfo"
        class="detail-param-info"
        ref="param"
      ></detail-param-info>
      <detail-comment-info
        :commentInfo="commentInfo"
        class="detail-comment-info"
        ref="comment"
      ></detail-comment-info>
      <goods-list
        :goods="recommends"
        class="goods-list"
        ref="recommend"
      ></goods-list>
    </Scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="isShowBackTop">
      <img src="~assets/img/common/top.png" alt="" />
    </back-top>
  </div>
</template>
<script>
import DetailNavBar from "views/detail/childComponents/DetailNavBar";
import DetailSwiper from "views/detail/childComponents/DetailSwiper";
import DetailBaseInfo from "views/detail/childComponents/DetailBaseInfo";
import DetailShopInfo from "views/detail/childComponents/DetailShopInfo";
import DetailGoodsInfo from "views/detail/childComponents/DetailGoodsInfo";
import DetailParamInfo from "views/detail/childComponents/DetailParamInfo";
import DetailCommentInfo from "views/detail/childComponents/DetailCommentInfo";
import DetailBottomBar from "views/detail/childComponents/DetailBottomBar";
import Scroll from "components/common/scroll/Scroll";

import GoodsList from "components/content/goods/GoodsList";
import { itemListenerMixin,backTopMixin } from "commonjs/mixin";
import { debounce } from "commonjs/utils";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    Scroll,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  data() {
    return {
      iid: null,
      goods: {},
      shop: {},
      topImages: [],
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    this.getDetailData(this.iid);

    //对给this.themeTopYs赋值的操作进行防抖：
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    }, 100);
  },
  mixins: [itemListenerMixin,backTopMixin],
  mounted() {},
  methods: {
    getDetailData(iid) {
      getDetail(iid).then((res) => {
        const data = res.data.result;

        //1.获取顶部的图片轮播数据：
        this.topImages = data.itemInfo.topImages;
        //2.创建商品信息对象：
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        //3.创建店铺信息对象：
        this.shop = new Shop(data.shopInfo);
        //4.保存商品的详情数据：
        this.detailInfo = data.detailInfo;
        //5.获取参数信息：
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );
        //6.取出评论信息：
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
      });

      getRecommend().then((res) => {
        this.recommends = res.data.data.list;
      });
    },

    imageLoad() {
      this.newRefresh();
      this.getThemeTopY();
    },

    titleClick(index) {
      console.log(index);
      console.log(this.$refs);
      console.log(this.$refs.scroll);
      this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },

    contentScroll(position) {
      const positionY = -position.y;
      if (positionY >= 0 && positionY < this.themeTopYs[1]) {
        this.currentIndex = 0;
      } else if (positionY >= this.themeTopYs[1] && positionY < this.themeTopYs[2]) {
        this.currentIndex = 1;
      } else if (positionY >= this.themeTopYs[2] && positionY < this.themeTopYs[3]) {
        this.currentIndex = 2;
      } else if (positionY >= this.themeTopYs[3]) {
        this.currentIndex = 3;
      }
      this.$refs.detailNavBar.currentIndex = this.currentIndex;


      //是否显示回到顶部按钮：
      this.isShowBackTop = positionY > 300;
    },

    addToCart(){
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // console.log(this.$store);
      this.$store.commit("addCart",product)
    }
    
  },

  destroyed() {
    this.$bus.$off("imgLoad", this.imgItemListener);
  },
};
</script>
<style lang='scss' scoped>
#detail {
  position: relative;
  z-index: 9;
  background: #fff;
  height: 100vh;
}

.detail-nav-bar {
  position: relative;
  z-index: 9;
  background: #fff;
}
.detial-content {
  height: calc(100% - 44px - 49px);
}

.detail-param-info,
.detail-comment-info,
.goods-list {
  background: #fff;
}
</style>