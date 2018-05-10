const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { insert } = require('../database/index.js');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const session = require('express-session');
const { CONSUMER_KEY, CONSUMER_SECRET } = require('../config.js');

const app = express();
app.use(session({
  secret: 'keep it secret, keep it safe',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../dist/')));
app.listen(1337, () => console.log('Sup dogs we listing on port 1337'));

/*  Routes  */

app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});
app.post('/post', async ({ body }, res) => {
  const newTweet = { username: body.username, message: body.message, date: body.date };
  try {
    await insert(newTweet);
    res.sendStatus(200).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).end();
  }
});

/*   Twitter login */

app.get('/auth/twitter/login', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/',
    successRedirect: '/' }));

/*
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }));
*/

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
  console.log(cb);
  return cb(null, profile);
}));
