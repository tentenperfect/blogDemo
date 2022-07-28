import { asyncRouterMap, constantRouterMap } from '../../router'

function hasPermission (router, role) {
   if (router.meta && router.meta.role) {
      return router.meta.role == role
   }
   return false
}

function filterRouters (asyncRouterMap, role) {
   //filter如果返回值是true就把他放进到新的数组里去
   const accessedRouters = asyncRouterMap.filter(router => {
      if (hasPermission(router, role)) {
         if (router.children && router.children.length) {
            router.children = filterRouters(router.children, role)
         }
         return true
      }
      return true
   })
   return accessedRouters
}

const permission = {
   state: {
      addRoutes: [],
      routeList: [],
   },
   mutations: {
      setRoutes (state, routes) {
         state.addRoutes = routes
         state.routeList = [...constantRouterMap, ...routes]
      },
      clearRoutes (state) {
         state.addRoutes = []
         state.routeList = []
      },
   },
   actions: {
      generateRoutes ({ commit }, role) {
         console.log('开始生成路由');
         return new Promise((resolve, reject) => {
            const accessedRouters = filterRouters(asyncRouterMap, role)
            commit('setRoutes', accessedRouters)
            resolve()
         }).catch(err => {
            console.error("出现错误了" + err);
         })
      }
   },
}

export default permission