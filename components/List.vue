<template>
  <div class="column">
    <div class="hero is-dark">
      <div class="hero-body">
        <h1 class="title">
          {{ title }}
        </h1>
      </div>
    </div>
    <div class="card">
      <div class="box">
        <textarea class="textarea" placeholder="e.g. Hello world"></textarea>
        <nav class="level">
          <div class="level-left"/>
          <div class="level-right">
            <p class="level-item">
              <a class="button is-dark" :click="addCard">Add Card</a>
            </p>
          </div>
        </nav>
      </div>
    </div>
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
  props: ['title', 'cards'],
  methods: {
    addCard: () => {
    }
  }
}
</script>

<style scoped>

.button
{
  margin-top: 10px;
}
</style>
