<template>
  <section>
    <NavBar />
    <div class="container is-fluid">
      <nuxt/>
    </div>
  </section>
</template>

<script>
import NavBar from '~/components/NavBar.vue'

export default {
  components: {
    NavBar
  }
}
</script>

<style>
</style>
