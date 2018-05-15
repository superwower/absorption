<template>
  <section class="section">
    <div class="container is-fluid">
      <nuxt/>
      <my-footer/>
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
