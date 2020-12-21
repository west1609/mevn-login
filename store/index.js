export const state = () => ({
  accessToken: '',
  accountInfo: '',
  snackbar: false,
  snackbarColor: 'red-400',
  notifyMessage: null,
  pageHeaderTitle: '',
  defaultAvatar: require('../assets/images/default-avatar.webp'),
})

export const getters = {
  accessToken: (state) => {
    return state.accessToken
  },
  defaultAvatar: (state) => {
    return state.defaultAvatar
  },
  accountInfo: (state) => {
    return state.accountInfo
  },
}

export const mutations = {
  SET_ACCESS_TOKEN: (state, accessToken) => {
    state.accessToken = accessToken
  },
  SET_REFRESH_TOKEN: (state, refreshToken) => {
    state.refreshToken = refreshToken
  },
  SET_ACCOUNT_INFO: (state, accountInfo) => {
    state.accountInfo = accountInfo
  },
  SET_SNACKBAR: (state, snackbar) => {
    state.snackbar = snackbar
  },
  SET_SNACKBAR_COLOR: (state, color) => {
    state.snackbarColor = color
  },
  SET_NOTIFY_MESSAGE: (state, mes) => {
    state.notifyMessage = mes
  },
  SET_PAGE_HEADER_TITLE: (state, title) => {
    state.pageHeaderTitle = title
  },
}

export const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      this.$axios
        .post('/auth/login', { username: username.trim(), password })
        .then(({ data }) => {
          if (!data) {
            reject(
              new Error('Something happened! You might have to sign in again!')
            )
          }
          const { user, accessToken } = data

          commit('SET_ACCESS_TOKEN', accessToken) // save accessToken to store
          this.$axios.setToken(accessToken, 'Bearer') // set accessToken to header
          // setRefreshToken(refreshToken) // save refreshToken to cookie
          commit('SET_ACCOUNT_INFO', user)

          resolve(user)
        })
        .catch((error) => {
          return new Error(error)
        })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('/auth/logout')
        .then(() => {
          commit('SET_ACCESS_TOKEN', '')
          commit('SET_ACCOUNT_INFO', '')
          resolve(true)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  showSnackbar({ commit }, { status, message }) {
    commit('SET_SNACKBAR', true)
    // True=>Success or False=>Failure
    if (status) {
      commit('SET_SNACKBAR_COLOR', 'green-500')
      commit('SET_NOTIFY_MESSAGE', message || 'Success')
    } else {
      commit('SET_SNACKBAR_COLOR', 'red-400')
      commit(
        'SET_NOTIFY_MESSAGE',
        message || 'Something went wrong, Please try again!'
      )
    }
    setTimeout(() => {
      commit('SET_SNACKBAR', false)
    }, 5000)
  },
}
