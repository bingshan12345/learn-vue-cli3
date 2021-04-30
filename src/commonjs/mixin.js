import { debounce } from './utils'
import BackTop from "components/content/backTop/BackTop";
export const itemListenerMixin = {
  data() {
    return {
      imgItemListener: null,
      newRefresh:null,
    }
  },
  mounted() {
    this.$nextTick(() => {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 200);

      this.imgItemListener = () => {
        this.newRefresh();
      };
      //监听item中的图片是否加载完成
      this.$bus.$on("imgLoad", this.imgItemListener);
    });
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500);
    },
  }
}