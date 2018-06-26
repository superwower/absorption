<template>
  <div>
    <a class="button is-dark is-rounded" @click="log">Log</a>
  </div>
</template>

<script>
export default {
  data: () => ({
    data: {}
  }),
  apollo: {
    data: {
      prefetch: true,
      query: `{
  board (id:"1") {
    id,
  },
  boards {
    id,
    order,
    title
  },
  list (id:"1") {
    id,
  },
  lists (boardId:"2") {
    id,
    order,
    title
  },
  card (id:"1") {
    id,
  },
  cards (boardId:"1") {
    id,
    order,
  },
}
`,
      update: ({ user }) => user.repositories.nodes
    }
  },
  methods: {
    log: function () {
      console.log(this.data)
    }
  }
}
</script>
