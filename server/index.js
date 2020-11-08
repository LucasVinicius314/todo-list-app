require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')

const app = express()

const { log } = console

const connection = () => {
  const temp = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    timezone: '-2:00',
  })
  temp.connect()
  temp.on('error', log)
  return temp
}

const query = async (_query, _arr) => await new Promise((resolve, reject) => {
  const con = connection()
  con.query(_query, _arr, (error, results, fields) => log(results) || error ? reject(error) : resolve(true))
  con.end()
})

const queryOne = async (_query, _arr) => await new Promise((resolve, reject) => {
  const con = connection()
  con.query(_query, _arr, (error, results, fields) => log(results[0]) || error ? reject(error) : resolve(results[0]))
  con.end()
})

const queryAll = async (_query, _arr) => await new Promise((resolve, reject) => {
  const con = connection()
  con.query(_query, _arr, (error, results, fields) => log(results) || error ? reject(error) : resolve(results))
  con.end()
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', (req, res, next) => {
  log('/')
  res.contentType('application/json')
  next()
})

//app.post('/', (req, res) => res.send({ message: 'yes' }))

app.post('/user/login', (req, res) => {
  log('/user/login')
  const { email, password } = req.body
  try {
    if (!email) throw 'Invalid email'
    if (!password) throw 'Invalid password'
    queryOne('select * from user where email = ? and password = sha1(?)', [email, password])
      .then(log)
      .catch(log)
  } catch (e) {
    log(e)
    res.status(400).send({ message: e })
  }
})

app.listen(process.env.PORT, () => log(`Listening on port ${process.env.PORT}`))
