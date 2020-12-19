export default function ({ $request }, inject) {
  const getUsers = (params) => {
    return $request({
      url: '/users',
      method: 'get',
      params,
    })
  }

  const createUser = (data) => {
    return $request({
      url: '/users',
      method: 'post',
      data,
    })
  }

  inject('getUsers', getUsers)
  inject('createUser', createUser)
}
