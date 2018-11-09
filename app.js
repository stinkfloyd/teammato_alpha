require('dotenv').config()
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cookieSession = require('cookie-session')
const passport = require('passport')
const passportSetup = require('./config/passport-setup')
// Routes
const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')
// Passport Auth


let app = express();

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// set up session cookies
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_SECRET]
}))

// Middleware to initizilize passport & session
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter)
app.use('/auth', authRouter)

// Error Handling Below
app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({
    error: err
  })
})

app.use((req, res, next) => {
  res.status(404).json({
    error: {
      message: 'Not found'
    }
  })
})

module.exports = app