<template>
  <div id="app" class="container-md">
    <Title :url="url" :username="username" :repository="repository" />
    <CommitHistory :commits="commits" />
  </div>
</template>

<script>
import Title from './components/Title';
import CommitHistory from './components/CommitHistory';
import { getCommitHistory, username, repository } from './utils/apiCalls';

export default {
  name: 'App',
  components: {
    Title,
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
