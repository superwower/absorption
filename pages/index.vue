<template>
  <div>
    <nav class="level">
      <div class="level-left"/>
      <div class="level-right">
        <input class="input column" type="text" placeholder="list title here" v-model="listTitle">
        <a class="column is-2" @click="addList">
          <b-icon icon="table-column-plus-before" />
        </a>
      </div>
    </nav>
    <draggable :list="lists" :options="{draggable:'.list', group:'list'}" class="columns scrolling-wrapper" @start="onDragStart" @end="onDragEnd" @change="moveList">
        <List :title="list.title"
              :listId="list.id"
              :cards="cards[list.id]"
              v-on:remove-list="removeList"
              v-for="(list, index) in lists" :key="index" class="list"/>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import _ from 'lodash'
import uuid from 'uuid/v1'

import axios from '~/plugins/axios'
import List from '~/components/List.vue'

export default {
  data () {
    return {
      cards: [],
      lists: [],
      listTitle: ''
    }
  },
  fetch ({ store, redirect }) {
    if (!store.state.authUser) {
      return redirect('/login')
    }
  },
  async asyncData () {
    let listsData = await axios.get('/api/lists')
    let cardsData = await axios.get('/api/cards')

    let lists = _.sortBy(listsData.data, ['order'])
    let cards = {}
    for (let list of lists) {
      cards[list.id] = []
    }

    _.orderBy(cardsData.data, ['listId', 'order'], ['asc', 'asc']).forEach(card => {
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
    addList: function () {
      if (this.listTitle === '') {
        return
      }
      const newList = { id: uuid(), order: this.lists.length, title: this.listTitle }
      this.lists.push(newList)
      this.cards[newList.id] = []
      axios.post('/api/lists', newList)
      this.listTitle = ''
    },
    moveList: function (event) {
      for (let key in this.lists) {
        this.lists[key].order = key
        if (key >= event.moved.newIndex) {
          axios.put('/api/lists/' + this.lists[key].id, this.lists[key])
        }
      }
    },
    removeList: function (listid) {
      console.log(listid)
      let index = _.findIndex(this.lists, ['id', listid])
      this.lists.splice(index, 1)
      this.cards[listid].forEach(card => {
        axios.delete(`/api/cards/${card.id}`)
      })
      axios.delete(`/api/lists/${listid}`)
    },
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
.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}
</style>
