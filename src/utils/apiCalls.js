import axios from 'axios';

const axiosConfig = {
  auth: {
    username: process.env.VUE_APP_USERNAME,
    token: process.env.VUE_APP_ACCESS_TOKEN,
  },
};

const baseURL = 'https://api.github.com/repos';
const username = '/andres-dc';
const repository = '/ftf-test';
const commits = '/commits';

function getCommitHistory() {
  const path = `${baseURL}${username}${repository}${commits}`;
  return axios(path, axiosConfig);
}

export { getCommitHistory };
