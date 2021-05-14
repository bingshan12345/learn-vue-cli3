import {ADD_TO_CART,ADD_COUNT} from "./mutation-types"

export default {
  addCart(context, payLoad) {
    return new Promise((resolve) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid);
      if (oldProduct) {
        context.commit(ADD_COUNT, oldProduct);
        resolve("当前商品数量+1");
      } else {
        payLoad.count = 1;
        payLoad.checked = true;
        context.commit(ADD_TO_CART, payLoad);
        resolve("成功加入购物车！");
        
      }
    })
    
  }
}
