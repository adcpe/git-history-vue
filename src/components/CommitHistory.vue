<template>
  <section class="list-group">
    <div
      v-for="(commit, i) in data"
      :key="i"
      class="list-group-item list-group-item-action text-start align-middle"
    >
      <h3>
        {{ commit.commit.message }}
      </h3>
      <div>
        <p class="my-0">
          <b>{{ commit.author.login }}</b> committed on
          <b>{{ formatDate(commit.commit.author.date) }}</b> - {{ commit.sha }}
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
  },
  beforeMount() {
    this.commits.then((res) => (this.data = res.data));
  },
};
</script>

<style></style>
