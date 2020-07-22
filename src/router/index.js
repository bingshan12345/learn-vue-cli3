import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = () => import ('views/home/Home');
const Cart = () => import ('views/cart/Cart');
const Category = () => import ('views/category/Category');
const About = () => import ('views/about/About');
export default new VueRouter({
  routes: [{
    path: '/',
    redirect: {
      name: 'Home'
    }
  }, {
    path: '/home',
    name: 'Home',
    component: Home
  }, {
    path: '/cart',
    name: 'Cart',
    component: Cart
  }, {
    path: '/category',
    name: 'Category',
    component: Category
  }, {
    path: '/about',
    name: 'About',
    component: About
  }],
  mode: 'history'
})