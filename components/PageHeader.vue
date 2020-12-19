<template>
  <header class="header">
    <div class="container">
      <div class="flex items-center">
        <div
          class="header__menu mr-3"
          :style="{ backgroundImage: `url(${userData.avatar})` }"
        />
        <div class="font-bold">
          {{ userData.username }}
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      userData: this.$store.getters.accountInfo,
    }
  },
}
</script>

<style lang="scss" scoped>
.header {
  @apply w-full h-14 bg-gray-400;
  @apply absolute top-0 left-0;
  @apply flex items-center;
  @apply px-20;

  &__menu {
    background-size: cover;
    border-radius: 3px;
    height: 38px;
    width: 38px;
    transition: 0.8s;
    @apply cursor-pointer;
  }
}
</style>
