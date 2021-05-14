<template>
  <div class="cart-bottom-bar">
    <div class="check-all">
      <check-button
        :value="isCheckAll"
        @click.native="selectAll"
      ></check-button>
      <span>全选</span>
    </div>
    <div>合计：{{ totalPrice }}</div>
    <div class="settlement" @click="settleAccounts">去结算（{{ checkedPayListLength }}）</div>
  </div>
</template>
<script>
import CheckButton from "components/content/CheckButton";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  components: { CheckButton },
  data() {
    return {};
  },
  props: {},
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => item.checked)
          .reduce((acc, cur) => {
            return acc + cur.price * cur.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkedPayListLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isCheckAll() {
      if (this.cartList.length === 0) return false;
      return !this.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    selectAll() {
      if (this.isCheckAll) {
        this.cartList.forEach((item) => {
          item.checked = false;
        });
      } else {
        this.cartList.forEach((item) => {
          item.checked = true;
        });
      }
    },
    settleAccounts(){
      if(!this.cartList.length){
        this.$toast.show("购物车为空！",1560)
      }
    }
  },
};
</script>

<style lang='scss' scoped>
.cart-bottom-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 40px;
  background: #eee;
  position: relative;
  bottom: 0;
  //
  .check-all {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .settlement {
    width: 100px;
    height: 100%;
    text-align: center;
    background: red;
    color: #fff;
    line-height: 40px;
  }
}
</style>