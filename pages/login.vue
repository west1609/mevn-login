<template>
  <section class="login py-5">
    <div class="container mx-auto h-full">
      <div class="form">
        <div class="mb-3">
          <h1 class="form__title">Sign in</h1>
        </div>
        <LoginForm />

        <hr class="mt-6 border-b-1 border-gray-400" />
        <div class="flex justify-between mt-2">
          <div>
            <span class="text-black cursor-pointer hover:underline"
              ><small>Forgot password?</small></span
            >
          </div>
          <div class="text-right">
            <nuxt-link to="/signup">
              <span class="text-black cursor-pointer hover:underline"
                ><small>Create new account</small></span
              >
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { extend, configure } from 'vee-validate'
import { required, confirmed, email } from 'vee-validate/dist/rules'
import LoginForm from '@/components/Login/LoginForm'

configure({
  classes: {
    invalid: 'is-invalid',
  },
})

extend('email', {
  ...email,
  validate: (v) => {
    return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(v)
  },
  message: 'Email is not valid',
})

extend('username', {
  validate: (v) => {
    return /^[a-z0-9_-]{3,16}$/.test(v)
  },
  message: 'Username may include _ and – having a length of 3 to 16 characters',
})

extend('password', {
  validate: (v) => {
    return /(?=(.*[0-9]))(?=.*[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/.test(
      v
    )
  },
  message:
    'Password should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be at least 8 characters long',
})

extend('required', {
  ...required,
  message: 'This field is required',
})

extend('confirmed', {
  ...confirmed,
  message: 'Confirmed password does not match with password',
})

export default {
  components: {
    LoginForm,
  },
  middleware: ['auth'],
}
</script>

<style lang="scss" scoped>
.login {
  background-image: url('/login-bg.webp'),
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  background-blend-mode: overlay;
}
.form {
  @apply bg-gray-200;
  @apply relative w-3/4 md:w-1/2 lg:w-1/3 h-full;
  @apply px-5 py-8 mx-auto;
  @apply rounded;
  &__title {
    @apply text-gray-600 text-lg font-bold uppercase text-center;
  }
}
</style>
