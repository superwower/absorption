<template>
  <draggable :options="{draggable:'.item', group:'list'}" class="columns section" @start="onDragStart" @end="onDragEnd">
      <List :title="index"
            :listId="index"
            :cards="cards"
            v-for="(cards, index) in cards" :key="index" class="item"/>
      <b-icon icon="table-column-plus-before" />
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'

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
    draggable,
    List
  },
  methods: {
    onDragStart: function (event) {
      event.item.style.opacity = '0.4'
    },
    onDragEnd: function (event) {
      event.item.style.opacity = '1'
    }
  }
}
</script>

<style scoped>
</style>
