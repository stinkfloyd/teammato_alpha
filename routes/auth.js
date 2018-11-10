const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken')

// auth login ✔️
router.get('/login', (req, res) => {
  // res.render('login', { user: req.user });
  res.sendfile('./public/login.html');
});

// auth logout ❌
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// auth with github
// Use Passport with the github strategy that we attached to it in config
// This is where it redirects to github oauth
router.get('/github', passport.authenticate('github', {
  // Scope Proctor -> tell us what we want, returned as an array
  scope: ['profile']
}));

// callback route for github to redirect to
// hand control to passport to use code to grab profile info
router.get('/github/callback', passport.authenticate('github'), (req, res) => {
  console.log(`here`);
  // res.send(req.user);
  let payLoad = {
    id: req.user.id,
    oauthid: req.user.oauthId,
    loggedIn: true,
  }
  let token = jwt.sign(payLoad, process.env.TOKEN_SECRET)
  res.cookie("token", token, {
    expires: new Date(Date.now() + 9000000)
  })
  res.redirect('/profile');
});

module.exports = router;