<template>
  <draggable :options="{draggable:'.list', group:'list'}" class="columns section" @start="onDragStart" @end="onDragEnd">
      <List :title="list.title"
            :listId="list.id"
            :cards="cards[list.id]"
            v-for="(list, index) in lists" :key="index" class="list"/>
      <b-icon icon="table-column-plus-before" />
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import _ from 'lodash'

import axios from '~/plugins/axios'
import List from '~/components/List.vue'

export default {
  data () {
    return {
      cards: [],
      lists: []
    }
  },
  async asyncData () {
    let listsData = await axios.get('/api/lists')
    let cardsData = await axios.get('/api/cards')

    let lists = _.sortBy(listsData.data, ['order'])

    let cards = {}
    _.orderBy(cardsData.data, ['listId', 'order'], ['asc', 'asc']).forEach(card => {
      if (!cards[card.listId]) {
        cards[card.listId] = []
      }
      cards[card.listId].push(card)
    })
    return { cards, lists }
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
