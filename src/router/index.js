import Vue from 'vue'
import VueRouter from 'vue-router'

 
const Home = () => import('views/home/Home.vue')
const Cart = () => import('views/cart/Cart.vue')
const Category = () => import('views/category/Category.vue')
const Profile = () => import('views/profile/Profile.vue')
const Detail = () => import('views/detail/Detail.vue')

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location){
  return originalPush.call(this,location).catch(err => err);
}
export default new VueRouter({
  routes:[{
    path:'/',
    redirect:{
      name:'Home',
    }
  },{
    path:'/home',
    name:'Home',
    component:Home
  },{
    path:'/cart',
    name:'Cart',
    component:Cart
  },{
    path:'/category',
    name:'Category',
    component:Category
  },{
    path:'/profile',
    name:'Profile',
    component:Profile
    }, {
      path: 'detail/:id',
      name:'Detail',
      component:Detail
    }
  ],
  mode:'history'
})