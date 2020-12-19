<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form autocomplete="false" @submit.prevent="handleSubmit(onSubmit)">
      <ValidationProvider
        v-slot="{ errors, classes }"
        name="username"
        rules="required|username"
      >
        <div :class="['field', classes]">
          <input
            v-model.trim="formData.username"
            type="text"
            class="field__input"
            placeholder="Username"
            name="username"
            autocomplete="false"
          />
          <span class="text-red-600 text-xs">{{ errors[0] }}</span>
        </div>
      </ValidationProvider>
      <ValidationProvider
        v-slot="{ errors, classes }"
        name="email"
        rules="required|email"
      >
        <div :class="['field', classes]">
          <input
            v-model.trim="formData.email"
            type="email"
            class="field__input"
            placeholder="Email"
          />
          <span class="text-red-600 text-xs">{{ errors[0] }}</span>
        </div>
      </ValidationProvider>
      <ValidationProvider
        v-slot="{ errors, classes }"
        name="password"
        rules="required|password"
      >
        <div :class="['field', classes]">
          <input
            v-model.trim="formData.password"
            type="password"
            class="field__input"
            placeholder="Password"
            autocomplete="false"
          />
          <span class="text-red-600 text-xs">{{ errors[0] }}</span>
        </div>
      </ValidationProvider>
      <ValidationProvider
        v-slot="{ errors, classes }"
        name="confirmPassword"
        rules="required|confirmed:password"
      >
        <div :class="['field', classes]">
          <input
            v-model.trim="confirmPassword"
            type="password"
            class="field__input"
            placeholder="Confirm password"
          />
          <span class="text-red-600 text-xs">{{ errors[0] }}</span>
        </div>
      </ValidationProvider>
      <div class="field">
        <button class="submit-btn" type="submit">sign up</button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  configure,
} from 'vee-validate'
import { confirmed, email, required } from 'vee-validate/dist/rules'
configure({
  classes: {
    invalid: 'is-invalid',
  },
})

extend('required', {
  ...required,
  message: 'This field is required',
})

extend('confirmed', {
  ...confirmed,
  message: 'Confirmed password does not match with password',
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

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      formData: {
        email: null,
        username: null,
        password: null,
        avatar: this.$store.getters.defaultAvatar,
      },
      confirmPassword: null,
    }
  },
  methods: {
    onSubmit() {
      console.log(this.formData)
      const formData = new FormData()
      const { email, username, password, avatar } = this.formData
      formData.append('email', email)
      formData.append('username', username)
      formData.append('password', password)
      formData.append('avatar', avatar)
    },
  },
}
</script>

<style lang="scss" scoped>
.field {
  @apply relative w-full mb-3;
  &__title {
    @apply block;
    @apply mb-2;
    @apply uppercase text-gray-700 text-xs font-bold;
  }
  &__input {
    @apply px-3 py-3;
    @apply placeholder-gray-400 text-gray-700 text-sm;
    @apply w-full bg-white rounded shadow;
    @apply focus:outline-none focus:ring-2 focus:ring-blue-600;
    @apply transition-all;
  }
}

.submit-btn {
  @apply bg-gray-900 rounded shadow;
  @apply px-6 py-3 mr-1 mb-1 mt-3;
  @apply w-full outline-none;
  @apply text-white text-sm font-bold uppercase;
  @apply transition hover:bg-gray-700 hover:shadow-lg focus:outline-none;
}

.is-invalid {
  input {
    @apply ring-2 ring-red-600 focus:ring-red-600;
  }
}
</style>
