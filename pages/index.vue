<template>
  <div class="section columns is-multiline">
    <div class="column is-3">
      <nuxt-link :to="{ name: 'board' }">
        <article class="tile is-child notification is-dark">
          <p class="title">Vertical...</p>
          <p class="subtitle">Top tile</p>
        </article>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      board: []
    }
  },
  fetch ({ store, redirect }) {
    if (!store.state.authUser) {
      return redirect('/login')
    }
  }
}
</script>

<style scoped>
</style>
