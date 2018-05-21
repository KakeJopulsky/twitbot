const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { insert } = require('../database/db.js');
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

app.use('/', express.static(path.join(__dirname, '../dist/')));
app.use('/login', express.static(path.join(__dirname, '../dist/')));
app.use('/tweet', express.static(path.join(__dirname, '../dist/')));

/*


// Twitter authorization


*/
// For db entry
const newTweet = {
  user: '',
  message: '',
  date: '',
  token: '',
  token_secret: '',
};

// For posting to Twit
const user = {
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token: '',
  access_token_secret: '',
};

/*
  ROUTE TO POST TO TWITTER
*/

const tweetQueue = [];
// implement message bus
// anytime new tweet added, sort tweetQueue
// place [0] in cron job


// Post new entry to db, and update tweetQueue
app.post('/post', ({ body: { message, time } }, res) => {
  newTweet.message = message;
  newTweet.date = time;
  insert(newTweet, (err, id) => {
    if (err) return console.log(err);
    tweetQueue.push({ date: time, listingId: id });
  });
});

/*

PASSPORT AUTH

*/

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
  newTweet.user = profile.username;
  newTweet.token = token;
  newTweet.token_secret = tokenSecret;
  user.access_token = token;
  user.access_token_secret = tokenSecret;
  return cb(null, profile);
}));
