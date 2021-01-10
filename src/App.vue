<template>
  <div id="app" class="container mt-4">
    <Title :url="url" :owner="datos.owner" :repository="datos.name" />
    <CommitHistory :commits="datos.commits" />
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
      datos: {
        owner: null,
        name: null,
        defaultBranch: null,
        activeBranch: null,
        branches: [],
        commits: [],
      },
      url: `https://github.com/${owner}/${repository}`,
    };
  },
  async created() {
    await getFromGithub('repos', owner, repository).then((res) => {
      this.datos.owner = res.data.owner.login;
      this.datos.name = res.data.name;
      this.datos.defaultBranch = res.data.default_branch;
      this.datos.activeBranch = res.data.default_branch;
    });

    // get commit history from default branch
    await getFromGithub(
      'repos',
      owner,
      repository,
      `commits?sha=${this.datos.activeBranch}`
    ).then((res) => {
      res.data.forEach((el) => {
        const commit = {
          commitURL: el.html_url,
          message: el.commit.message,
          user: el.author.login,
          userURL: el.author.html_url,
          userAvatarURL: el.author.avatar_url,
          date: el.commit.author.date,
          sha: el.sha,
        };

        this.datos.commits.push(commit);
      });
    });

    // get all branches except for default
    await getFromGithub('repos', owner, repository, 'branches').then((res) => {
      res.data.forEach((el) => {
        if (el.name !== this.datos.defaultBranch) {
          this.datos.branches.push(el.name);
        }
      });
    });
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
