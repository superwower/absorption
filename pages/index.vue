<template>
  <div>
    <div class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Primary title
          </h1>
          <h2 class="subtitle">
            Primary subtitle
          </h2>
        </div>
      </div>
    </div>
    <div class="columns is-mobile">
      <div class="column">
        <div class="card" v-for="(card, index) in cards" :key="index">
          <div class="card-content">
            <p class="subtitle">
              {{ card.content }}
            </p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card" v-for="(card, index) in cards" :key="index">
          <div class="card-content">
            <p class="subtitle">
              {{ card.content }}
            </p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card" v-for="(card, index) in cards" :key="index">
          <div class="card-content">
            <p class="subtitle">
              {{ card.content }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  data () {
    return { cards: [] }
  },
  async asyncData () {
    let { data } = await axios.get('/api/cards')
    return { cards: data }
  },
  head () {
    return {
      title: 'Retrospective board'
    }
  }
}
</script>

<style scoped>
</style>
