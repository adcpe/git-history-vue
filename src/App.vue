<template>
    <h1>Commit history of {{ username }}/{{ repository }}</h1>
    <CommitHistory :commits="commits" />
  </div>
</template>

<script>
import CommitHistory from './components/CommitHistory';
import { getCommitHistory, username, repository } from './utils/apiCalls';

export default {
  name: 'App',
  components: {
    CommitHistory,
  },
  data() {
    return {
      commits: getCommitHistory(),
      username: username,
      repository: repository,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
