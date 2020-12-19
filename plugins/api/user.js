export default function ({ $request }, inject) {
  const getUsers = (params) => {
    return $request({
      url: '/users',
      method: 'get',
      params,
    })
  }
  inject('getUsers', getUsers)
}
