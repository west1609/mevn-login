export default function ({ $axios, redirect }) {
  $axios.onError((error) => {
    const status = parseInt(error.response.status)
    const message = error.response.data.message

    if (status === 400) {
      redirect('/400')
    }
    throw message
  })
}
