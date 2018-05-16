<template>
  <div>
    <div class="columns section">
      <List title="KEEP"
            :cards="cards.keep" />
      <List title="PROBLEM"
            :cards="cards.problem" />
      <List title="TRY"
            :cards="cards.try" />
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
    console.log(data)
    return { cards: data }
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
