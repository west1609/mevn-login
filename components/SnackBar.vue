<template>
  <transition name="slide-fade">
    <div class="snack-bar" :class="[`bg-${color}`]">
      <div class="flex justify-between items-center">
        <span class="snack-bar__title">
          {{ title }}
        </span>
        <span class="snack-bar__close" @click="close()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'red-400',
    },
  },
  methods: {
    close() {
      this.$store.commit('SET_SNACKBAR', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-in;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.snack-bar {
  @apply absolute top-0 right-0 rounded p-3 mt-5 mr-5;
  width: 300px;
  &__title {
    @apply text-xs font-bold;
  }
  &__close {
    @apply cursor-pointer fill-current text-white ml-1;
    width: 24px;
    height: 24px;
  }
}
</style>
