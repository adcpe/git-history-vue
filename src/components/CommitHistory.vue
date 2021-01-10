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
      months: [
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
      ],
    };
  },
  methods: {
    formatDate(date) {
      const newDate = Date.parse(date);
      const offset = new Date(newDate).getTimezoneOffset() * 60 * 1000;
      const clientDate = new Date(newDate - offset);

      const mdy = `${
        this.months[clientDate.getUTCMonth()]
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
};
</script>
