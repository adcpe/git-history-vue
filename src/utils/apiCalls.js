import axios from 'axios';

const axiosConfig = {
  auth: {
    username: process.env.VUE_APP_USERNAME,
    token: process.env.VUE_APP_ACCESS_TOKEN,
  },
};

const baseURL = 'https://api.github.com';

export function getFromGithub(
  resource,
  username = null,
  repository = null,
  endpoint = null
) {
  const path = [baseURL, resource, username, repository, endpoint]
    .filter((el) => el !== null)
    .join('/');
  return axios(path, axiosConfig);
}
