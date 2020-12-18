export const state = () => ({
  accessToken: '',
  refreshToken: '',
  accountInfo: '',
  snackbar: false,
  snackbarColor: 'red-400',
  notifyMessage: null,
  pageHeaderTitle: '',
  avatarDefault: '',
})

export const getters = {
  accessToken: (state) => {
    return state.accessToken
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
        .post('/login', { username: username.trim(), password })
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
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_ACCESS_TOKEN', '')
      commit('SET_ACCOUNT_INFO', '')
      resolve(true)
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
