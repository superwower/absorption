<template>
  <div class="column">
    <section class="hero is-dark">
      <div class="hero-body">
        <h1 class="title">
          {{ title }}
        </h1>
      </div>
    </section>
    <div class="card" v-for="(card, index) in cards" :key="index">
      <div class="card-content">
        <p class="subtitle">
          {{ card.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'cards']
}
</script>
