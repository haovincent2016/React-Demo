const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('./models/User')

const router = express.Router()

function login(res, tokenSecret, user) {
  const signedToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, tokenSecret, { expiresIn: 2592000000 })
  res.cookie('token', signedToken, { maxAge: 2592000000 })
}

function isMatchPassword(user, password) {
  return new Promise((resolve, reject) => {
    user.comparePassword(password, (err, isMatch) => {
      if (err) return reject(err)
      resolve(isMatch)
    })
  })
}

function loginRedirect(req, res, next) {
  if (req.user) {
    res.redirect('/')
  } else {
    next()
  }
}

module.exports = (tokenSecret) => {

  router.post('/login', loginRedirect, async (req, res) => {
    let { email, password } = req.body

    let user = await User.findOne({ email })
    if (!user) {
      res.json({ error: 'user not exist'})
      return
    }

    const isMatch = await isMatchPassword(user, password)
    if (isMatch) {
      login(res, tokenSecret, user)
      res.json({ id: user.id, username: user.username, email: user.email, avatar: user.avatar })
    } else {
      res.json({ error: 'incorrect password'})
    }
  })

  router.post('/register', loginRedirect, async (req, res) => {
    let { username, password, email } = req.body
    const data = { username, password, email }

    let user = await User.findOne({ username })
    if (user) {
      res.json({ error: 'user already exists'})
      return
    }

    user = await User.create(data)
    login(res, tokenSecret, user)
    res.json({ id: user.id, username: user.username, email: user.email, avatar: user.avatar })
  })

  router.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
  })

  return router
}