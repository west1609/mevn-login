<template>
  <div class="container">
    <div>
      <Logo />
      <h2 class="subtitle text-center">MEVN Login by West1609</h2>
      <div class="links">
        <nuxt-link to="/login" class="button--green"> Sign In </nuxt-link>
        <button class="button--grey" @click="doLogout()">Sign Out</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  methods: {
    async doLogout() {
      try {
        const logout = await this.$store.dispatch('logout')
        if (logout) {
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
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
