<template>
  <section>
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <p class="navbar-item title is-3" style="color:white">Retrospective board</p>
      </div>
    </nav>

    <div class="container is-fluid">
      <nuxt/>
    </div>
  </section>
</template>

<script>
import MyFooter from '~/components/Footer.vue'

export default {
  components: {
    MyFooter
  }
}
</script>

<style>
</style>
