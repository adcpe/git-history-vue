<script>
export default {
  props: ['url', 'owner', 'repository']
}
</script>

<template>
  <h1 class="m-0">
    Commit history of
    <a :href="url" target="_blank" rel="noopener noreferrer">
      <b>{{ owner }}/{{ repository }}</b>
    </a>
  </h1>
</template>

<style scoped>
h1 {
  font-size: 1.3rem;
  text-align: left;
}
</style>
