<script>
export default {
  props: ['commitURL', 'message', 'user', 'userURL', 'userAvatarURL', 'date', 'sha']
}
</script>

<template>
  <div
    class="d-flex flex-row list-group-item list-group-item-action text-start align-items-center justify-content-between text-left">
    <a :href="userURL" target="_blank" rel="noopener noreferrer">
      <img :src="userAvatarURL" class="rounded-circle mx-1" :alt="user" />
    </a>

    <div class="flex-grow-1 align-self-center mx-1">
      <a :href="commitURL" target="_blank" rel="noopener noreferrer" class="my-1">
        {{ message }}
      </a>
      <p class="my-0">
        <a :href="userURL" target="_blank" rel="noopener noreferrer">
          <b>{{ user }}</b>
        </a>
        committed on {{ date }}
      </p>
    </div>

    <a :href="commitURL" target="_blank" rel="noopener noreferrer">{{ sha }}</a>
  </div>
</template>

<style scoped>
img {
  height: 50px;
}
</style>
