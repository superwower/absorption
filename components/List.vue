<template>
  <div class="column">
    <div class="hero is-dark">
      <div class="hero-body" style="position:relative;">
        <h1 class="title">
          {{ title }}
        </h1>
        <a @click="$emit('remove-list', listId)" class="delete-link" style="position: absolute; right:10px; top:10px;">
          <span class="delete"/>
        </a>
      </div>
    </div>
    <div class="card">
      <div class="box">
        <textarea class="textarea" placeholder="input content here" v-model="newcontent"></textarea>
        <nav class="level">
          <div class="level-left"/>
          <div class="level-right">
            <p class="level-item">
              <a class="button is-dark is-rounded" @click="addCard">Add Card</a>
            </p>
          </div>
        </nav>
      </div>
    </div>
    <draggable :list="cards" :options="{draggable:'.item', group:'card'}" @start="onDragStart" @end="onDragEnd" @change="moveCard" class="draggable">
      <div class="card item" v-for="(card, index) in cards" :key="index">
        <header class="card-header">
          <p class="card-header-title">
            {{ card.content }}
          </p>
          <a @click="removeCard(card, index)" class="card-header-icon delete-link">
            <span class="delete"/>
          </a>
        </header>
      </div>
    </draggable>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import uuid from 'uuid/v1'
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  props: ['listId', 'title', 'cards'],
  data () {
    return {
      newcontent: ''
    }
  },
  methods: {
    addCard: function () {
      if (this.newcontent === '') {
        return
      }
      const id = uuid()
      const newCard = { id, listId: this.listId, content: this.newcontent }
      this.cards.push(newCard)
      axios.post('/api/cards', newCard)
      this.newcontent = ''
    },
    removeCard: function (card, index) {
      this.cards.splice(index, 1)
      axios.delete(`/api/cards/${card.id}`)
    },
    moveCard: function (event) {
      if (event.moved) {
        for (let key in this.cards) {
          this.cards[key].order = key
          if (key >= event.moved.newIndex) {
            axios.put('/api/cards/' + this.cards[key].id, this.cards[key])
          }
        }
      }
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
.button
{
  margin-top: 10px;
}

.draggable
{
  min-height: 100px;
}

.delete-link
{
  display: none;
}

.item:hover > header > .delete-link
{
  display: block;
}

.hero-body:hover > .delete-link
{
  display: block;
}
</style>
