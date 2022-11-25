<script setup>
import { formatDate, trimSHA } from '../utils/helpers'
import Commit from './Commit.vue'

const props = defineProps(['commits'])
</script>

<template>
  <section class="list-group">
    <Commit
      v-for="(commit, i) in commits"
      :key="i"
      :commitURL="commit.commitURL"
      :message="commit.message"
      :user="commit.user"
      :userURL="commit.userURL"
      :userAvatarURL="commit.userAvatarURL"
      :date="formatDate(commit.date)"
      :sha="trimSHA(commit.sha)" />
  </section>
</template>
