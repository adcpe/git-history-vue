<template>
  <div id="app" class="container mt-4">
    <Title :url="url" :owner="owner" :repository="name" />
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
      name: repository,
      currentBranch: null,
      branches: [],
      commits: [],
      url: `https://github.com/${owner}/${repository}`,
    };
  },
  methods: {
    changeCurrentBranch(branch) {
      this.currentBranch = branch;
    },
    async getDefaultBranch() {
      await getFromGithub('repos', owner, repository).then((res) => {
        this.currentBranch = res.data.default_branch;
      });
    },
    async getCommits() {
      await getFromGithub(
        'repos',
        owner,
        repository,
        `commits?sha=${this.currentBranch}`
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

          this.commits.push(commit);
        });
      });
    },
    async getBranches() {
      await getFromGithub('repos', owner, repository, 'branches').then(
        (res) => {
          res.data.forEach((el) => {
            if (el.name !== this.currentBranch) {
              this.branches.push(el.name);
            }
          });
        }
      );
    },
    async fetchAllData() {
      await this.getDefaultBranch();
      await this.getCommits();
      await this.getBranches();
    },
  },
  created() {
    this.fetchAllData();
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
  font-size: 0.9rem;
}

a {
  text-decoration: none;
  color: black;
  font-weight: bold;
}
</style>
