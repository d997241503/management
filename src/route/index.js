import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let login = () => import("@/view/login/Login")
let home = () => import('@/view/home/Home')

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
    component:home
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
