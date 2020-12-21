<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      autocomplete="false"
      enctype="multipart/form-data"
      @submit.prevent="handleSubmit(onSubmit)"
    >
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
        <label class="font-semibold">Avatar</label>
        <h1 class="text-xs text-gray-700 mb-2">
          Allowed Formats: JPEG, PNG. Max size: 3MB. Optimal dimensions: 130x130
        </h1>
        <div class="flex justify-around items-center">
          <div class="dropbox" @click="chooseImage()">
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              name="avatar"
              hidden
              @change="onAvatarChange($event)"
            />
            <p>Drop image here or click to upload</p>
          </div>
          <img :src="formData.avatar" alt="avatar" class="preview-avatar" />
        </div>
      </div>
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
import defaultAvatar from '@/assets/images/default-avatar.webp'

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
        avatar: defaultAvatar,
      },
      file: null,
      confirmPassword: null,
      selectedFile: null,
    }
  },
  methods: {
    chooseImage() {
      this.$refs.fileInput.click()
    },
    onAvatarChange(event) {
      const uploadedFile = event.target.files[0]

      if (uploadedFile && uploadedFile.size > 3 * 1024 * 1024) {
        this.$store.dispatch('showSnackbar', {
          status: false,
          message: 'Avatar: Max file size allowed is 3MB!',
        })
        return
      } else if (
        uploadedFile &&
        uploadedFile.type !== 'image/jpeg' &&
        uploadedFile.type !== 'image/png'
      ) {
        this.$store.dispatch('showSnackbar', {
          status: false,
          message: 'Avatar: Only JPEG, PNG file formats are allowed!',
        })
        return
      }
      this.selectedFile = uploadedFile

      const reader = new FileReader()
      reader.readAsDataURL(this.selectedFile)

      reader.onload = (e) => {
        this.formData.avatar = reader.result
      }
    },
    async onSubmit() {
      const formData = new FormData()
      const { email, username, password } = this.formData
      formData.append('email', email)
      formData.append('username', username)
      formData.append('password', password)
      formData.append('avatar', this.selectedFile)

      try {
        const register = await this.$createUser(formData)
        if (register) {
          this.$router.push('/login')
        }
      } catch (error) {
        this.$store.dispatch('showSnackbar', {
          status: false,
          message: error,
        })
      }
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
  @apply px-6 py-3 mr-1 my-1;
  @apply w-full outline-none;
  @apply text-white text-sm font-bold uppercase;
  @apply transition hover:bg-gray-700 hover:shadow-lg focus:outline-none;
}

.is-invalid {
  input {
    @apply ring-2 ring-red-600 focus:ring-red-600;
  }
}

.dropbox {
  align-items: center;
  background: rgba(229, 235, 241, 0.6);
  border-radius: 4px;
  @apply text-sm text-center;
  color: rgb(64, 78, 92);
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  line-height: 1.5rem;
  margin-right: 20px;
  outline-offset: -12px;
  outline: 2px dashed rgba(38, 52, 63, 0.2);
  padding: 18px 20px;
  position: relative;
  transition: 0.2s;
  vertical-align: text-top;
  width: 150px;
  height: 150px;
}

.preview-avatar {
  width: 130px;
  height: 130px;
}
</style>
