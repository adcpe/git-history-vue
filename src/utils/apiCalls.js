import axios from 'axios'

const axiosConfig = {
  auth: {
    username: import.meta.env.VITE_USERNAME,
    token: import.meta.env.VITE_ACCESS_TOKEN
  }
}

const baseURL = 'https://api.github.com'

function getFromGithub(resource, username = null, repository = null, endpoint = null) {
  const path = [baseURL, resource, username, repository, endpoint]
    .filter((el) => el !== null)
    .join('/')
  return axios(path, axiosConfig)
}

export { getFromGithub }
