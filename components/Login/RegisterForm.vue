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
import { ValidationProvider, ValidationObserver } from 'vee-validate'

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
      },
      confirmPassword: null,
    }
  },
  methods: {
    onSubmit() {
      console.log(this.formData)
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
