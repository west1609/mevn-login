<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form autocomplete="false" @submit.prevent="handleSubmit(onSubmit)">
      <ValidationProvider
        v-slot="{ errors, classes }"
        name="username"
        rules="required"
      >
        <div :class="['field', classes]">
          <label class="field__title" for="username">Username</label>
          <input
            id="username"
            v-model.trim="formData.username"
            type="text"
            class="field__input"
            placeholder="Username"
            autocomplete="false"
          />
          <span class="text-red-600 text-xs">{{ errors[0] }}</span>
        </div>
      </ValidationProvider>
      <ValidationProvider
        v-slot="{ errors, classes }"
        name="password"
        rules="required"
      >
        <div :class="['field', classes]">
          <label class="field__title" for="password">Password</label>
          <input
            id="password"
            v-model.trim="formData.password"
            type="password"
            class="field__input"
            placeholder="Password"
            autocomplete="false"
          />
          <span class="text-red-600 text-xs">{{ errors[0] }}</span>
        </div>
      </ValidationProvider>
      <div class="field">
        <label class="inline-flex items-center cursor-pointer"
          ><input
            id="customCheckLogin"
            type="checkbox"
            class="form-checkbox text-gray-800 ml-1 w-5 h-5 transition"
          /><span class="ml-2 text-sm font-semibold text-gray-700 select-none"
            >Remember me</span
          ></label
        >
      </div>
      <div class="field">
        <button class="submit-btn" type="submit">sign in</button>
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
        username: null,
        password: null,
      },
    }
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch('login', this.formData)
        .then((res) => {
          this.$router.push('/')
        })
        .catch((error) => {
          this.$store.dispatch('showSnackbar', {
            status: false,
            message: error,
          })
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.field {
  @apply w-full mb-3;
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
