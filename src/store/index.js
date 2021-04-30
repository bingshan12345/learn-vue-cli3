import Vue from "vue";
import Vuex from "vuex";

//1.安装插件
Vue.use(Vuex);

//2.创建store对象：
const store = new Vuex.Store({
  state: {
    cartList:[],
  },
  mutations: {
    addCart(state, payLoad) {
      console.log(payLoad);
      // state.cartList.push(payLoad)
      let oldProduct = state.cartList.find(item => item.iid === payLoad.iid);
      if (oldProduct) {
        oldProduct.count += 1;
      } else {
        payLoad.count = 1;
        state.cartList.push(payLoad);
      }
    }
  }
})

export default store;