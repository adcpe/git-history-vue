<script setup>
import { onBeforeMount, ref } from 'vue'
import Title from './components/Title.vue'
import CommitHistory from './components/CommitHistory.vue'
import BranchList from './components/BranchList.vue'
import Footer from './components/Footer.vue'
import Paginator from './components/Paginator.vue'
import { getFromGithub } from './utils/apiCalls'

const owner = 'adcpe'
const repository = 'git-history-vue'
const url = `https://github.com/${owner}/${repository}`

const currentBranch = ref(null)
const branches = ref([])
const allCommits = ref([])
const activePage = ref(1)
const numberOfPages = ref(1)

async function changeCurrentBranch(branch) {
  currentBranch.value = branch
  await fetchAllData()
}

async function getDefaultBranch() {
  await getFromGithub('repos', owner, repository).then((res) => {
    currentBranch.value = res.data.default_branch
  })
}

function showPageCommits(commits, currPage, numberOfPages) {
  return currPage === 1
    ? commits.slice(0, 10)
    : currPage !== numberOfPages
    ? commits.slice((currPage - 1) * 10, currPage * 10)
    : commits.slice((currPage - 1) * 10)
}

async function getCommits() {
  allCommits.value = []
  await getFromGithub('repos', owner, repository, `commits?sha=${currentBranch.value}`).then(
    (res) => {
      numberOfPages.value = Math.floor(res.data.length / 10)
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

        allCommits.value.push(commit)
      })
    }
  )
}

async function getBranches() {
  branches.value = []
  await getFromGithub('repos', owner, repository, 'branches').then((res) => {
    res.data.forEach((el) => {
      if (el.name !== currentBranch.value) {
        branches.value.push(el.name)
      }
    })
  })
}

async function fetchAllData() {
  await getCommits()
  await getBranches()
}

onBeforeMount(async () => {
  await getDefaultBranch()
  await fetchAllData()
})
</script>

<template>
  <div class="container mt-2">
    <div
      class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-2">
      <Title :url="url" :owner="owner" :repository="repository" />
      <BranchList
        :currentBranch="currentBranch"
        :branches="branches"
        :changeCurrentBranch="changeCurrentBranch" />
      <Paginator
        :activePage="activePage"
        :numberOfPages="numberOfPages"
        @changePage="(n) => (activePage = n)" />
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
