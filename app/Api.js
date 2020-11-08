import axios from 'axios'

export default axios.create({
  baseURL: 'http://192.168.1.108:5000/',
  auth: {
    username: 'todo',
    password: '1234',
  },
})
