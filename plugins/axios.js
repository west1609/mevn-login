export default function ({ $axios, store }, inject) {
  const request = $axios.create({
    baseURL: process.env.API_URL, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000, // request timeout
  })

  // Inject to context as $request
  inject('request', request)

  request.onRequest((config) => {
    const accessToken = store.state.accessToken ? store.state.accessToken : null
    if (accessToken) {
      request.setToken(accessToken, 'Bearer') // set accessToken to header
    }
    return config
  })

  request.onRequestError((error) => {
    return Promise.reject(error)
  })

  request.onResponseError((error) => {
    const status = parseInt(error.response.data.status)
    const message = error.response.data.message

    if (status === 400 || status === 403) {
      return Promise.reject(new Error(message))
    }
    // do something with request error
    else if (status === 401) {
      /*
       * When response code is 401, it might because the access token is invalid or expired
       * Try to refresh the page to get access token
       * If user has refresh token -> get new access token
       * If user does not have refresh token -> redirect to login (cause of middleware)
       */
      location.reload()
    }
  })
}
