import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home.vue')
const Search = () => import('../views/Search.vue')
const Floor = () => import('../views/Floor.vue')
const Detail = () => import('../views/Detail.vue')
const Login = () => import('../views/Login.vue')
const Register = () => import('../views/Register.vue')

// import Home from '../views/Home.vue'
// import Floor from '../views/Floor.vue'
// import Detail from '../views/Detail.vue'
// import Login from '../views/Login.vue'
// import Register from '../views/Register.vue'

Vue.use(VueRouter)
//取消菜单栏重复点击
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/floor',
    component: Floor
  },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})
export default router
