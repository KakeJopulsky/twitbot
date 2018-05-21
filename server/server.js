const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { insert, find } = require('../database/db.js');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const session = require('express-session');
const { CONSUMER_KEY, CONSUMER_SECRET } = require('../config.js');
const Twit = require('twit');
const schedule = require('node-schedule');

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
  INSERT INTO DB, UPDATE QUEUE, SORT QUEUE
*/

const tweetQueue = [];
let nextTweet = [];

const sendTweet = (message, auth) => {
  const T = new Twit(auth);

  T.post('statuses/update', { status: `${message}` }, (err, data, response) => {
    console.log(data);
  });
};

const getTweet = (id) => {
  find(id, (err, res) => {
    if (err) return console.log(err);
    console.log(res);
  });
  // sendTweet();
}
getTweet('5b0318c61975f1c64d05df51');

const nextToTweet = (id, time) => {
  if (tweetQueue.length === 0) {
    return;
  }
  if (nextTweet[0] > tweetQueue[tweetQueue.length - 1]) {
    const temp = nextTweet;
    nextTweet = tweetQueue.pop();
    tweetQueue.push(nextTweet);
  }
  schedule.scheduleJob(nextTweet[0], () => {
    console.log('The answer to life, the universe, and everything!');
    getTweet();
  });
};

// Post new entry to db, and update tweetQueue
app.post('/post', ({ body: { message, time } }, res) => {
  newTweet.message = message;
  newTweet.date = time;
  insert(newTweet, (err, id) => {
    if (err) return console.log(err);
    tweetQueue.push({ date: time, tweetId: id });
    tweetQueue.sort((a, b) => a.time - b.time);
    nextToTweet();
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

/*

  TWEET SCHEDULING AND POSTING

*/
