<template>
  <div class="cart-list">
    <scroll ref="scroll" class="scroll-content">
      <cart-list-item
        v-for="item in cartList"
        :key="item.iid"
        :item-info="item"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";
import { mapGetters } from "vuex";
export default {
  name: "CartList",
  components: { Scroll, CartListItem },
  props: {
    // cartList: {
    //   type: Array,
    //   default() {
    //     return [];
    //   },
    // },
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    
    this.$nextTick(() => {
      this.$refs.scroll.refresh();
    })
    
  },
};
</script>

<style lang="scss" scoped>
.scroll-content {
  height: 100%;
}
</style>