<template>
  <h1>
    Commit history of
    <a :href="url" target="_blank" rel="noopener noreferrer"
      ><b>{{ username }}/{{ repository }}</b></a
    >
  </h1>
</template>

<script>
export default {
  props: ['url', 'username', 'repository'],
};
</script>
