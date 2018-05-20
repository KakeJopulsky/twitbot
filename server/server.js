const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const { insert } = require('../database/db.js');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const session = require('express-session');
const { CONSUMER_KEY, CONSUMER_SECRET } = require('../config.js');
const { makeTweet } = require('./helpers.js');

const app = express();
app.use(session({
  secret: 'keep it secret, keep it safe',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.listen(1337, () => console.log('Sup dogs we listing on port 1337'));

/*  Routes  */

// app.get('/', (req, res) => {
//   res.render('index', { user: req.user });
// });
app.use('/', express.static(path.join(__dirname, '../dist/')));
app.use('/login', express.static(path.join(__dirname, '../dist/')));
app.use('/tweet', express.static(path.join(__dirname, '../dist/')));


/*   Twitter login */

const user = {
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
};

app.post('/post', ({ body: { message } }, res) => {
  makeTweet(message, user);
});

app.get('/auth/twitter/login', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/login',
    successRedirect: '/tweet' })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new TwitterStrategy({
  consumerKey: CONSUMER_KEY,
  consumerSecret: CONSUMER_SECRET,
  callbackURL: 'http://127.0.0.1:1337/auth/twitter/callback',
}, (token, tokenSecret, profile, cb) => {
  user.access_token = token;
  user.access_token_secret = tokenSecret;
  return cb(null, profile);
}));
