import Vue from 'vue'
import Router from 'vue-router'

//1安装插件
Vue.use(Router)

const Home = ()=> import('../views/home/Home')
const Category = ()=> import('../views/category/Category')
const Cart = ()=> import('../views/cart/Cart')
const Profile = ()=> import('../views/profile/Profile')
const Detail = ()=> import('../views/detail/Detail')

//2创建router
const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component: Home,
    meta: { navShow: true, cname: '一级页面' },
  },
  {
    path:'/category',
    component: Category,
    meta: { navShow: true, cname: '一级页面' },
  },
  {
    path:'/cart',
    component: Cart,
    meta: { navShow: true, cname: '一级页面' },
  },
  {
    path:'/profile',
    component: Profile,
    meta: { navShow: true, cname: '一级页面' },
  },
  {
    path:'/detail/:iid' ,
    component: Detail,
    meta: { navShow: false, cname: '二级页面' },
  },
]

//下面的代码是避免重复点击路由报错（虽然对项目没什么影响，但不好看）
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes,
  mode:'history'
})

export default router 

