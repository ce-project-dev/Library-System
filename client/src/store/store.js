import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        token: null,
        user: null,
        isLoggedin: true,
        role: null
    },
    mutations: {
        setToken(state, token)
        {
            state.token = token
            if(token)
            {
                state.isLoggedin = true
            }
            else
            {
                state.isLoggedin = false
            }
        },
        setUser(state, user)
        {
            state.user = user
        },
        setRole(state, role)
        {
            state.role = role
        }

    },
    actions: {
        setToken({commit}, token)
        {
            commit('setToken', token)
        },
        setUser({commit}, user)
        {
            commit('setUser', user)
        },
        setRole({commit}, role)
        {
            commit('setRole', role)
        }
    },
    getters: {
        // ...
        getState: (state, getters) => {
          return state
        }
      }
})