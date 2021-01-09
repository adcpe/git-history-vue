<template>
  <section class="list-group">
    <Commit
      class="list-group-item list-group-item-action text-start
    align-middle"
      v-for="(commit, i) in data"
      :key="i"
      :commitURL="commit.html_url"
      :message="commit.commit.message"
      :user="commit.author.login"
      :userURL="commit.committer.html_url"
      :date="formatDate(commit.commit.author.date)"
      :sha="trimSHA(commit.sha)"
    />
  </section>
</template>

<script>
import Commit from './Commit';

export default {
  components: {
    Commit,
  },
  props: ['commits'],
  data() {
    return {
      data: null,
    };
  },
  methods: {
    formatDate(date) {
      const newDate = Date.parse(date);
      const offset = new Date(newDate).getTimezoneOffset() * 60 * 1000;
      const clientDate = new Date(newDate - offset);
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
        months[clientDate.getUTCMonth()]
      } ${clientDate.getUTCDate()}, ${clientDate.getUTCFullYear()}`;

      const time = `${this.formatTime(
        clientDate.getUTCHours()
      )}:${this.formatTime(clientDate.getUTCMinutes())}`;

      return `${mdy} at ${time}`;
    },
    trimSHA(sha) {
      return sha.slice(0, 7);
    },
    formatTime(num) {
      return num <= 9 ? `0${num}` : `${num}`;
    },
  },
  created() {
    this.commits.then((res) => (this.data = res.data));
  },
};
</script>
