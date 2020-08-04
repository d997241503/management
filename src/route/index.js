import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let login = () => import("@/view/login/Login")
let home = () => import('@/view/home/Home')
let welecome = () => import('@/view/home/childcomp/Welecome')
let users = () => import('@/view/users/Users')
let rights = () => import('@/view/rights/Rights')
let roles = () => import('@/view/rights/Roles')
let goodscate = () => import('@/view/goods/goodscate/GoodsCate')
let goodsparmas = () => import('@/view/goods/goodsparams/GoodsParams')
let reports = () => import('@/view/reports/Reports')

let routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/login',
    component:login
  },
  {
    path:'/home',
    component:home,
    children:[
      {
        path:'',
        component:welecome
      },
      {
        path:'users',
        component:users
      },
      {
        path:'roles',
        component:roles
      },
      {
        path:'rights',
        component:rights
      },
      {
        path:'categories',
        component:goodscate
      },
      {
        path:'params',
        component:goodsparmas
      },
      {
        path:'reports',
        component:reports
      }
    ]
  }
]


let router = new Router({
  routes,
  mode:'history'
})


router.beforeEach((to,from,next) => {
  if(to.path === '/login')return next();

  if(!window.sessionStorage.getItem('token')){
    return next('/login')
  }
  next()
})

export default router
