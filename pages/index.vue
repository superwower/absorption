<template>
  <div>
    <div class="columns section">
      <div class="column">
        <section class="hero is-dark">
          <div class="hero-body">
            <h1 class="title">
              KEEP
            </h1>
          </div>
        </section>
        <div class="card" v-for="(card, index) in cards.keep" :key="index">
          <div class="card-content">
            <p class="subtitle">
              {{ card.content }}
            </p>
          </div>
        </div>
      </div>
      <div class="column">
        <section class="hero is-dark">
          <div class="hero-body">
            <h1 class="title">
              PROBLEM
            </h1>
          </div>
        </section>
        <div class="card" v-for="(card, index) in cards.problem" :key="index">
          <div class="card-content">
            <p class="subtitle">
              {{ card.content }}
            </p>
          </div>
        </div>
      </div>
      <div class="column">
                <section class="hero is-dark">
          <div class="hero-body">
            <h1 class="title">
              TRY
            </h1>
          </div>
        </section>
        <div class="card" v-for="(card, index) in cards.try" :key="index">
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
    console.log(data)
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
