<template>
  <div>
    <div class="columns section">
      <List :title="index"
            :cards="cards"
            v-for="(cards, index) in cards" :key="index"/>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import List from '~/components/List.vue'

export default {
  data () {
    return { cards: [] }
  },
  async asyncData () {
    let { data } = await axios.get('/api/cards')
    let cards = {}
    data.forEach(card => {
      if (!cards[card.listId]) {
        cards[card.listId] = []
      }
      cards[card.listId].push(card)
    })
    return { cards }
  },
  head () {
    return {
      title: 'Retrospective board'
    }
  },
  components: {
    List
  }
}
</script>

<style scoped>
</style>
