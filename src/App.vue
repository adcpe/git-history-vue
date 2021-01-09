<template>
  <div id="app" class="container my-4">
    <Title :url="url" :owner="owner" :repository="repository" />
    <CommitHistory :commits="commits" />
    <Footer />
  </div>
</template>

<script>
import Title from './components/Title';
import CommitHistory from './components/CommitHistory';
import Footer from './components/Footer';
import { getFromGithub } from './utils/apiCalls';

const owner = 'andres-dc';
const repository = 'ftf-test';

export default {
  name: 'App',
  components: {
    Title,
    CommitHistory,
    Footer,
  },
  data() {
    return {
      owner: owner,
      repository: repository,
      commits: getFromGithub('repos', owner, repository, 'commits'),
      url: `https://github.com/${owner}/${repository}`,
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
