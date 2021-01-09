<template>
  <section class="list-group">
    <div
      v-for="(commit, i) in data"
      :key="i"
      class="list-group-item list-group-item-action text-start align-middle"
    >
      <a :href="commit.html_url" target="_blank" rel="noopener noreferrer">
        {{ commit.commit.message }}
      </a>
      <div>
        <p class="my-0">
          <a
            :href="commit.committer.html_url"
            target="_blank"
            rel="noopener noreferrer"
            ><b>{{ commit.author.login }}</b></a
          >
          committed on {{ formatDate(commit.commit.author.date) }} -
          <a
            :href="commit.committer.html_url"
            target="_blank"
            rel="noopener noreferrer"
            >{{ trimSHA(commit.sha) }}</a
          >
        </p>
      </div>
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
  methods: {
    formatDate(date) {
      const newDate = new Date(Date.parse(date));
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];

      const mdy = `${
        months[newDate.getUTCMonth()]
      } ${newDate.getUTCDate()}, ${newDate.getUTCFullYear()}`;

      const time = `${newDate.getUTCHours()}:${newDate.getUTCMinutes()}`;

      return `${mdy} at ${time}`;
    },
    trimSHA(sha) {
      return sha.slice(0, 7);
    },
  },
  beforeMount() {
    this.commits.then((res) => (this.data = res.data));
  },
};
</script>

<style>
a {
  text-decoration: none;
  color: black;
  font-weight: bold;
}
</style>
