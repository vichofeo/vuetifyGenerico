import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

import { authGuard } from '@/guards/authGuard'


Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Login",
    component: ()=>import(/* webpackChunkName: "about" */ "@/views/pagina/Login.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),      
  },
  {
    path: '/georef',
    name: 'georeferencia',
    component: ()=>import(/* webpackChunkName: "about" */ "@/layouts/LayoutGral.vue"),        
    //beforeEnter: authGuard,
    //meta: {requiereAuth: true},    
    children:[
      {path: ':idx',
      name: 'geo',
      component: ()=>import(/* webpackChunkName: "about" */ "@/views/modules/Georeferencia.vue"),
      //beforeEnter: authGuard,
    meta: {requiereAuth: true},
    }
    ]
  },
  { path: "*", component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue") },
 

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/*router.beforeEach((to, from, next) => {  
  const token = sessionStorage.getItem("token");  
  if (to.matched.some(record => record.meta.libre)) {
    next();
  } else if (token) {
    const { exp } = decode(token);
    if (exp < (new Date().getTime() + 1) / 1000) {
      sessionStorage.clear();
      next({ name: "login" });
    } else {   
      next();
    }
  } else {
    next({ name: "login" });
  }
});
*/
// metodo para enviar urls privadas a login
router.beforeEach((to, from, next) => {
  // verificamos todas la rutas
  router.options.routes.forEach((route) => {
    // si coincide con una ruta y tiene propiedad secure verificamos login
    if (to.matched[0].path === route.path && route.secure) {
      if (!state.isLoggedIn) {
        return next('/login')
      }
    }
  })
  // curso normal del proceso
  next()
})
export default router
