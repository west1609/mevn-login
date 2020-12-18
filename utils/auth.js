import Cookies from 'js-cookie'

export function getRefreshToken() {
  return Cookies.get('refreshToken')
}

export function setRefreshToken(token) {
  return Cookies.set('refreshToken', token, { expires: 14 }) // 1 day
}

export function removeRefreshToken() {
  return Cookies.remove('refreshToken') // 1 day
}
