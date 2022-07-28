import Vue from 'vue'
import Vuex from 'vuex'
import createpersistedState from 'vuex-persistedstate'
import user from './modules/user'
import article from './modules/article'
import getters from './getters'
import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
   //   namespaced: true,
   plugins: [createpersistedState()],
   modules: {
      permission,
      user,
      article
   },
   getters
})

export default store