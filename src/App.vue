<template>
  <div id="app" class="container-md">
      <Title :url="url" :owner="owner" :repository="repository" />
    <CommitHistory :commits="commits" />
  </div>
</template>

<script>
import Title from './components/Title';
import CommitHistory from './components/CommitHistory';
import { getFromGithub } from './utils/apiCalls';

export default {
  name: 'App',
  components: {
    Title,
    CommitHistory,
  },
  data() {
    return {
      owner: 'andres-dc',
      repository: 'ftf-test',
      commits: '',
      url: '',
    };
  },
  created() {
    this.commits = getFromGithub(
      'repos',
      this.owner,
      this.repository,
      'commits'
    );
    this.url = `https://github.com/${this.owner}/${this.repository}/`;
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
