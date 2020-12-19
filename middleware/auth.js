export default function ({ store, redirect, $axios, route }) {
  const accessToken = store.state.accessToken ? store.state.accessToken : null
  // check if the user is authenticated or not
  if (!accessToken) {
    // if there is no access token try silent refresh
    return $axios
      .get('/refresh_token')
      .then((res) => {
        const data = res.data
        const { userData, accessToken } = data

        store.commit('SET_ACCESS_TOKEN', accessToken) // save accessToken to store
        $axios.setToken(accessToken, 'Bearer') // set accessToken to header
        // setRefreshToken(refreshToken) // save refreshToken to cookie
        store.commit('SET_ACCOUNT_INFO', userData)

        // if user is on page login and got new tokens
        if (route.name === 'login') {
          return redirect({ name: 'index' })
        }
      })
      .catch((error) => {
        // if refresh token is invalid or expired
        if (route.name !== 'login') {
          redirect({ name: 'login' })
          return Promise.reject(error)
        }
      })
  }
}
