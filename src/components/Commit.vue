<template>
  <div class="list-group-item list-group-item-action text-start align-middle">
    <a :href="commitURL" target="_blank" rel="noopener noreferrer">
      {{ message }}
    </a>
    <div>
      <p class="my-0">
        <a :href="userURL" target="_blank" rel="noopener noreferrer"
          ><b>{{ user }}</b></a
        >
        committed on {{ date }} -
        <a :href="commitURL" target="_blank" rel="noopener noreferrer">{{
          sha
        }}</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['commitURL', 'message', 'user', 'userURL', 'date', 'sha'],
};
</script>
