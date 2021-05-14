import Toast from "./Toast";

const obj = {}
obj.install = function (Vue) {
 // 1, 创建组件构造器：
  const ToastConstructor = Vue.extend(Toast);

  //2,实例化组件对象：
  const toast = new ToastConstructor();
  
  //3.将组件对象挂载到某一个元素上：
  toast.$mount(document.createElement("div"));
  
  //4.将这个元素插入到body中：
  document.body.appendChild(toast.$el);

  //5.将组件对象挂载到Vue原型上：

  Vue.prototype.$toast = toast;
  
}
export default obj;