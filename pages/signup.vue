<template>
  <section class="signup">
    <div class="container mx-auto h-full">
      <div class="form">
        <div class="mb-2">
          <h1 class="form__title">Create an account</h1>
        </div>
        <RegisterForm />

        <hr class="border-b-1 border-gray-400" />
        <div class="flex justify-between mt-2">
          <div class="text-right">
            <nuxt-link to="/login">
              <span class="text-black cursor-pointer hover:underline"
                ><small>Already has an account?</small></span
              >
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import RegisterForm from '@/components/Login/RegisterForm'

export default {
  components: {
    RegisterForm,
  },
  middleware: ['auth'],
  layout: 'noHeader',
}
</script>

<style lang="scss" scoped>
.signup {
  background-image: url('/login-bg.webp'),
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  background-blend-mode: overlay;
  @apply py-8 md:py-5;
}

.form {
  @apply bg-gray-200;
  @apply relative w-3/4 md:w-1/2 lg:w-1/3 h-full;
  @apply p-5 mx-auto;
  @apply rounded;
  &__title {
    @apply text-gray-600 text-lg font-bold uppercase text-center;
  }
}
</style>
