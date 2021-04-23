import { debounce } from './utils'
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