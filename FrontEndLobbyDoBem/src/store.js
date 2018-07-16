import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => {
  return new Vuex.Store({
    state: {
      isLoggedIn: !!localStorage.getItem('userAuth')
    }
  })
}

export default store
