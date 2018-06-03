<template>
  <div class="section columns is-multiline">
    <div class="column is-3" v-for="(board, index) in boards" :key="index" >
      <nuxt-link :to="{ name: 'board' }">
        <article class="tile is-child notification is-dark">
          <p class="title">{{ board.title }}</p>
        </article>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from '~/plugins/axios'

export default {
  data () {
    return {
      boards: []
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
  }
}
</script>

<style scoped>
</style>
