<template>
  <div class="card item">
    <header class="card-header">
      <p class="card-header-title">
        <span class="avator"> {{ authorInitial }} </span>
        {{ card.content }}
        <a @click="$emit('unlike', card, index)" v-if="isLiked" class="thumbup">
          <b-icon icon="thumb-up" />
        </a>
        <a @click="$emit('like', card)" v-else class="thumbup">
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

<style>
.thumbup
{
  padding-left: 10px
}

.avator
{
  width: 30px;
  border-radius: 2px 10px 2px;
  text-align: center;
  margin-right: 5px;
  background: #BADA55;
}
</style>

<script>
export default {
  props: ['card', 'index'],
  computed: {
    authorInitial: function () {
      return this.card.author.substr(0, 1).toUpperCase()
    },
    isLiked: function () {
      return this.card.like.includes(this.$store.state.authUser.username)
    }
  }
}
</script>
