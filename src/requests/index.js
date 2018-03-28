import axios from 'axios'

export const loginUser = (request) => {
  return axios({
    method: 'post',
    url: '/api/login',
    data: request
  })
}

export const registerUser = (request) => {
  return axios({
    method: 'post',
    url: '/api/register',
    data: request
  })
}

export const logoutUser = () => {
  return axios({
    method: 'get',
    url: '/api/logout'
  })
}