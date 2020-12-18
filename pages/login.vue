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
import {
  required,
  email,
  alpha,
  max,
  min,
  confirmed,
} from 'vee-validate/dist/rules'
import LoginForm from '@/components/Login/LoginForm'

configure({
  classes: {
    invalid: 'is-invalid',
  },
})

extend('email', {
  ...email,
  message: 'Email is invalid',
})

extend('alpha', {
  ...alpha,
  message: 'This field may only contain alphabetic characters',
})

extend('max', {
  ...max,
  message: 'Password may not be greater than 32 characters',
})

extend('min', {
  ...min,
  message: 'Password must be atleast 6 characters',
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
