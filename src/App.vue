<script>
import Title from './components/Title.vue'
import CommitHistory from './components/CommitHistory.vue'
import BranchList from './components/BranchList.vue'
import Footer from './components/Footer.vue'
import Paginator from './components/Paginator.vue'
import { getFromGithub } from './utils/apiCalls'

const owner = 'adcpe'
const repository = 'git-history-vue'

export default {
  name: 'App',
  components: {
    Title,
    BranchList,
    CommitHistory,
    Footer,
    Paginator
  },
  data() {
    return {
      owner: owner,
      name: repository,
      currentBranch: null,
      branches: [],
      allCommits: [],
      activePage: 1,
      numberOfPages: 1,
      url: `https://github.com/${owner}/${repository}`
    }
  },
  methods: {
    async changeCurrentBranch(branch) {
      this.currentBranch = branch
      await this.fetchAllData()
    },
    async getDefaultBranch() {
      await getFromGithub('repos', owner, repository).then((res) => {
        this.currentBranch = res.data.default_branch
      })
    },
    showPageCommits(commits, currPage, numberOfPages) {
      return currPage === 1
        ? commits.slice(0, 10)
        : currPage !== numberOfPages
        ? commits.slice((currPage - 1) * 10, currPage * 10)
        : commits.slice((currPage - 1) * 10)
    },
    async getCommits() {
      this.commits = []
      await getFromGithub('repos', owner, repository, `commits?sha=${this.currentBranch}`).then(
        (res) => {
          this.numberOfPages = Math.floor(res.data.length / 10)
          res.data.forEach((el) => {
            const commit = {
              commitURL: el.html_url,
              message: el.commit.message,
              user: el.author.login,
              userURL: el.author.html_url,
              userAvatarURL: el.author.avatar_url,
              date: el.commit.author.date,
              sha: el.sha
            }

            this.allCommits.push(commit)
          })
        }
      )
    },
    async getBranches() {
      this.branches = []
      await getFromGithub('repos', owner, repository, 'branches').then((res) => {
        res.data.forEach((el) => {
          if (el.name !== this.currentBranch) {
            this.branches.push(el.name)
          }
        })
      })
    },
    async fetchAllData() {
      await this.getCommits()
      await this.getBranches()
    }
  },
  async created() {
    await this.getDefaultBranch()
    await this.fetchAllData()
  }
}
</script>

<template>
  <div class="container mt-2">
    <div
      class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-2">
      <Title :url="url" :owner="owner" :repository="name" />
      <BranchList
        :currentBranch="currentBranch"
        :branches="branches"
        :changeCurrentBranch="changeCurrentBranch" />
      <Paginator
        :activePage="activePage"
        :numberOfPages="numberOfPages"
        @changePage="(n) => (this.activePage = n)" />
    </div>
    <CommitHistory :commits="showPageCommits(allCommits, activePage, numberOfPages)" />
    <Footer />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 0.9rem;
}

a {
  text-decoration: none;
  color: black;
  font-weight: bold;
}
</style>
