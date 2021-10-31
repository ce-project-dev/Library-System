import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    plugins: [createPersistedState()],
    state: {
        token: null,
        user: null,
        isLoggedin: false,
        role: null,
        books: null,
        dueDates: null
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
        },
        setBooks(state, books)
        {
            state.books = books
        },
        setDueDates(state, dueDates)
        {
            state.dueDates = dueDates
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
        },
        setBooks({commit}, books)
        {
            commit('setBooks', books)
        },
        setDueDates({commit}, dueDates)
        {
            commit('setDueDates', dueDates)
        }
    },
    getters: {
        // ...
        getState: (state, getters) => {
          return state
        }
      }
})