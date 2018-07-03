<template>
  <div>
    <a class="button is-dark is-rounded" @click="log">Log</a>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  apollo: {
    data: {
      prefetch: true,
      query: gql`{
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
      update: data => data,
      // subscribeToMore: {
      //   document: gql`subscription name($param: String!) {
      //     itemAdded(param: $param) {
      //       id
      //       label
      //     }
      //   }`,
      //   // Variables passed to the subscription. Since we're using a function,
      //   // they are reactive
      //   variables () {
      //     return {
      //       param: this.param,
      //     }
      //   },
      //   // Mutate the previous result
      //   updateQuery: (previousResult, { subscriptionData }) => {
      //     // Here, return the new result from the previous with the new data
      //   }
      // }
    }
  },
  methods: {
    log: function () {
      console.log(this.data)
    }
  }
}
</script>
