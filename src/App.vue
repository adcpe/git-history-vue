<template>
  <div id="app" class="container-md">
    <h1>
      Commit history of
      <a :href="url" target="_blank" rel="noopener noreferrer"
        ><b>{{ username }}/{{ repository }}</b></a
      >
    </h1>
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
      url: `https://github.com/${username}/${repository}/`,
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

a {
  text-decoration: none;
  color: black;
  font-weight: bold;
}
</style>
