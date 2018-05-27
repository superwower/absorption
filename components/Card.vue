<template>
  <div class="card item">
    <header class="card-header">
      <p class="card-header-title">
        {{ card.content }}
        <a @click="$emit('unlike', card, index)" v-if="isLiked">
          <b-icon icon="thumb-up" />
        </a>
        <a @click="$emit('like', card)" v-else>
          <b-icon icon="thumb-up-outline" />
        </a>
        {{ card.like.length }}
      </p>
      <a @click="$emit('removeCard', card, index)" class="card-header-icon delete-link">
        <span class="delete"/>
      </a>
    </header>
  </div>
</template>

<script>
export default {
  props: ['card', 'index'],
  computed: {
    isLiked: function () {
      return this.card.like.includes(this.$store.state.authUser.username)
    }
  }
}
</script>