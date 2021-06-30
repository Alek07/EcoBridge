import axios from 'axios'
import { AxiosPromise } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL
const USERS_API_URL = API_URL + '/users/'

interface AccessToken {
  access_token: string
  token_type: string
}

interface User {
  email?: string
  username?: string
  bio?: string
  is_active: boolean
  is_superuser: boolean
  access_token?: AccessToken
}

interface UserCreate {
  email: string
  username: string
  password: string
}

export const userService = {
  registerNewUser: (newUser: UserCreate): AxiosPromise<User> => {
    return axios.post(USERS_API_URL, newUser, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  getCurrentUser: (token: AccessToken | string): AxiosPromise<User> => {
    let accessToken = 'Bearer '
    if (typeof token === 'object') accessToken += token.access_token
    else if (typeof token === 'string') accessToken += token

    return axios.get(USERS_API_URL + 'me/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    })
  },
  getUserByUsername: (username: string): AxiosPromise<User> => {
    return axios.get(USERS_API_URL + `${username}/`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  login: (email: string, password: string): AxiosPromise<AccessToken> => {
    const formdata = `username=${email}&password=${password}`

    return axios.post(USERS_API_URL + 'login/token/', formdata)
  },
}
