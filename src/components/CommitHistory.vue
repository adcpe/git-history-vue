<template>
  <section class="list-group">
    <Commit v-for="(commit, i) in commits" :key="i" v-bind="commit" />
  </section>
</template>

<script>
import Commit from './Commit';

export default {
  components: {
    Commit,
  },
  props: ['commits'],
};
</script>
