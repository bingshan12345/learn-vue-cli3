import {ADD_TO_CART,ADD_COUNT} from "./mutation-types"
export default {
  /* mutation中的每个方法，尽量要做到完成的逻辑比较单一一点，避免在一个方法中完成多个业务逻辑 */
  [ADD_TO_CART](state, payLoad) {
    state.cartList.push(payLoad);
  },
  [ADD_COUNT](state, payLoad) {
    payLoad.count++;
  }
}