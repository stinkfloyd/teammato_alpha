require('dotenv').config() // 🔐
const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy
const userModel = require('../models/userModel.js')

passport.serializeUser((user, done) => {
  done(null, user.githubId)
})

passport.deserializeUser((id, done) => {
  userModel.checkUser(id)
    .then((user) => {
      // console.log('deser ', user)
      // Do some passport session stuff,
      // then some cookie session stuff 😬😱
      done(null, user)
      // Then we go to the callbackURL 🛫
    })
})


// Takes two parameters
// - Strategy (takes in an object -- options for strategy)
// - Callback function
passport.use(
  new GitHubStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/github/callback'
    },
    // passport call back function
    (accessToken, refreshToken, profile, done) => {
      // accessToken: token we get from GitHub
      // refreshToken: refreshes accessToken when it expires
      // profile: takes the code we get back, and brings back the profile info
      // done: we need to call when we are done with this callback

      // console.log('passport callback function fired')
      // console.log(profile.login)

      // Check if user is in our psql db, if not, make them
      console.log(`profile: `, profile)
      userModel.checkUser(profile._json.id)
        .then((result) => {
          if (result) {
            // User exists, go to serializeUser
            done(null, result)
          } else {
            // Create user
            let newUser = {
              username: profile.username,
              githubId: profile.id,
              profilePic: profile._json.avatar_url
            }
            userModel.create(newUser)
            done(null, newUser) // when done is called, we go to passport.serializeUser
          }
        })
    })
)