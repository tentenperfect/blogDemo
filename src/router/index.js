import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'
import { createRouter } from './manageRouter.js'
Vue.use(VueRouter)
const whiteList = ['/login', '/index']
export const constantRouterMap = [{
   path: '/login',
   name: 'login',
   alias: '/',
   component: () =>
      import("../components/login"),
   meta: { content: "no-referrer" }
},
{
   path: '/user/:uid/article/:id',
   name: 'article',
   component: () =>
      import("../views/article")

},
{
   path: '/index',
   name: 'index',
   component: () =>
      import("../views/index"),
}, {
   path: '/hotSearch',
   name: 'hotSearch',
   component: () =>
      import("../components/hotSearch"),
   meta: {
      name: 'hotSearch',
      content: "no-referrer"
   }
},
]

export const asyncRouterMap = [
   {
      path: '/blog',
      name: 'blog',
      component: () =>
         import('../views/blog'),
      meta: {
         role: 'user'
      }
   }, {
      path: '/user/:uid',
      name: 'user',
      component: () =>
         import("../views/user"),
      meta: {
         role: 'user'
      },
      children: [{
         path: '/user/edituser/:uid',
         name: 'edituser',
         component: () =>
            import("../components/edituser"),
         meta: {
            role: 'user'
         }
      },
      {
         path: '/user/draft/:uid',
         name: 'draft',
         component: () =>
            import("../components/drafts"),
         meta: {
            role: 'user'
         }
      }, {
         path: '/user/userArticle/:uid',
         name: 'userArticle',
         component: () =>
            import("../components/userArticle"),
         meta: {
            role: 'user'
         }
      },

      ]
   },
   {
      path: '/admin',
      name: 'admin',
      component: () =>
         import("../components/admin"),
      meta: {
         role: 'admin'
      }
   }
]

const router = new VueRouter({
   mode: 'history',
   routes: constantRouterMap
})

var isRefresh = false
router.beforeEach((to, from, next) => {
   if (sessionStorage.getItem('blogToken')) {
      if (to.path == '/login') {
         next('/index')
      } else {
         if (sessionStorage.role !== '') {
            if (!store.getters.routeList.length || !isRefresh) {
               let role = sessionStorage.getItem('role')
               store.dispatch('generateRoutes', role).then(() => {
                  isRefresh = true
                  let route = store.getters.addRoutes
                  for (let i = 0; i < route.length; i++) {
                     router.addRoute(route[i])
                  }
                  router.options.isAddAsyncMenuData = true;
                  router.options.routes = store.getters.routeList
                  next({ ...to, replace: true })
               }).catch(err => {
                  console.error('出错了：' + err);
               })
            } else {
               next()
            }
         } else {
            console.log('重新登录');
            next()
         }
      }
      next()
   } else {
      if (whiteList.indexOf(to.path) != -1) {
         next()
      } else {
         next({ path: '/login' })
      }
   }
})
export default router