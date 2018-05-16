<template>
  <div>
    <div class="columns section">
      <List title="keep"
            :cards="cards.keep" />
      <List title="problem"
            :cards="cards.problem" />
      <List title="try"
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
