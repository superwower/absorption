<template>
  <div class="section columns is-multiline">
    <div class="column is-3" v-for="(board, index) in boards" :key="index" >
      <nuxt-link :to="{ name: 'board' , params: { id: board.id, title: board.title}}">
        <article class="tile is-child notification is-dark">
          <p class="title">{{ board.title }}</p>
        </article>
      </nuxt-link>
    </div>
    <div class="column is-3">
      <article class="tile is-child notification is-dark">
        <div class="field has-addons">
          <p class="control" style="width:100%">
            <input class="input" type="text" placeholder="input board title here" v-model="boardTitle">
          </p>
          <p class="control">
            <button class="button" @click="addBorad">Add</button>
          </p>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import uuid from 'uuid/v1'

import axios from '~/plugins/axios'

export default {
  data () {
    return {
      boards: [],
      boardTitle: ''
    }
  },
  fetch ({ store, redirect }) {
    if (!store.state.authUser) {
      return redirect('/login')
    }
  },
  async asyncData () {
    let boardsData = await axios.get('/api/boards')
    let boards = _.sortBy(boardsData.data, ['order'])
    return { boards }
  },
  methods: {
    addBorad: function () {
      if (this.boardTitle === '') {
        return
      }
      const newBoard = { id: uuid(), order: this.boards.length, title: this.boardTitle }
      this.boards.push(newBoard)
      axios.post('/api/boards', newBoard)
      this.boardTitle = ''
    }
  }
}
</script>

<style scoped>
</style>
