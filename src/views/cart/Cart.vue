<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <cart-list class="cart-list"></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';

import CartList from './components/CartList';
import CartBottomBar from './components/CartBottomBar';
import {mapGetters} from "vuex";
export default {
  name:"Cart",
  components:{NavBar,CartList,CartBottomBar},
  // components:{NavBar,CartList},
  computed:{
    ...mapGetters(["cartLength","cartList"])
  },
  methods:{
    
    
    
  }
}
</script>

<style>
.nav-bar {
  background: rgb(240, 144, 144);
  color: #fff;
}
.cart-list {
  height: calc(100vh - 44px - 49px - 40px);
  overflow: hidden;
}
</style>