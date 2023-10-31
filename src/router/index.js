import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

import { authGuard } from '@/guards/authGuard'


Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import(/* webpackChunkName: "about" */ "@/views/pagina/Login.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },

  //modulo de la sala situacional geo referenciacion 
  {
    path: '/ssepi',
    name: 'SalaSituacional',
    component: () => import(/* webpackChunkName: "about" */ "@/layouts/LayoutSsepi.vue"),
    beforeEnter: authGuard,
    meta: { requiereAuth: true },
    children: [
      {
        path: 'sssscp/:idx',
        name: 'ssepi',
        component: () => import(/* webpackChunkName: "about" */ "@/views/ssepi/modules/Georeferencia.vue"),
        beforeEnter: authGuard,
        meta: { requiereAuth: true },
      }
    ]
  },
  { path: "*", component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue") },

//modulo de administracion
  {
    path: '/admin',
    name: 'administracion',
    component: () => import(/* webpackChunkName: "about" */ "@/layouts/LayoutAdmin.vue"),
    beforeEnter: authGuard,
    meta: { requiereAuth: true },
    children: [
      {
        path: 'modulos',
        name: 'adminMod',
        component: () => import(/* webpackChunkName: "about" */ "@/views/pageAdmin/AdminModulePages.vue"),
        beforeEnter: authGuard,
        meta: { requiereAuth: true },
      },
      {
        path: 'pages',
        name: 'adminPages',
        component: () => import(/* webpackChunkName: "about" */ "@/views/pageAdmin/AdminUserLicences.vue"),
        beforeEnter: authGuard,
        meta: { requiereAuth: true },
      }
    ]
  },

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
