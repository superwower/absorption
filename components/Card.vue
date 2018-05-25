<template>
  <div class="card item">
    <header class="card-header">
      <p class="card-header-title">
        {{ card.content }}
        <a>
          <b-icon icon="thumb-up-outline" v-if="true" />
          <b-icon icon="thumb-up" v-else />
        </a>
      </p>
      <a @click="$emit('removeCard', card, index)" class="card-header-icon delete-link">
        <span class="delete"/>
      </a>
    </header>
  </div>
</template>

<script>
export default {
  props: ['card', 'index']
}
</script>