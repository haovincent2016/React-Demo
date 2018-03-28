const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const expressjwt = require('express-jwt')
const authRouter = require('./auth')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/taxi', { useMongoClient: true, config: { autoIndex: false }})

const app = new express()
const port = process.env.PORT || 3000
const SUPER_SECRET = '59bc6b7d782abba4cc60a5c7'
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser(SUPER_SECRET))

app.use('/api', authRouter(SUPER_SECRET))

app.listen(port, () => {
  console.log(`application is listening on port ${port}`)
})

module.exports = app