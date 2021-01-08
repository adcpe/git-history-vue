<template>
  <section>
    <div v-for="(commit, i) in data" :key="i">
      <p>
        {{ commit.author.login }}
      </p>
      <p>
        {{ commit.commit.author.date }}
      </p>
      <p>
        {{ commit.commit.message }}
      </p>
      <p>
        {{ commit.sha }}
      </p>
    </div>
  </section>
</template>

<script>
export default {
  props: ['commits'],
  data() {
    return {
      data: null,
    };
  },
  beforeMount() {
    this.commits.then((res) => (this.data = res.data));
  },
};
</script>

<style></style>
