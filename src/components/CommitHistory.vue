<template>
  <section class="list-group">
    <Commit v-for="(commit, i) in commits" :key="i" v-bind="commit" />
  </section>
</template>

<script>
import { formatDate } from '../utils/formatDateTime';
import Commit from './Commit';

export default {
  components: {
    Commit,
  },
  props: ['commits'],
  methods: {
    formatDate,
  },
};
</script>
