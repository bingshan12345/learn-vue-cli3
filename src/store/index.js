import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions.js";
import getters from "./getters.js";

//1.安装插件
Vue.use(Vuex);

const state = {
  cartList: [],
};

//2.创建store对象：
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
