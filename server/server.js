const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { insert, find, removeFromDb, findAll } = require('../database/db.js');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const session = require('express-session');
const { CONSUMER_KEY, CONSUMER_SECRET } = require('../config.js');
const Twit = require('twit');
const schedule = require('node-schedule');

const app = express();
app.use(session({
  secret: 'keep it secret, keep it safe',
  key: 'sports',
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.listen(1337, () => console.log('Sup dogs we listing on port 1337'));

app.use('/', express.static(path.join(__dirname, '../dist/')));
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

const user = {
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token: '',
  access_token_secret: '',
};

/*

  TWEET SCHEDULING AND POSTING

*/

let tweetQueue = []; // { date: time, tweetId: id }
const nextTweet = null;

const sendTweet = (message, auth, id) => {
  const T = new Twit(auth);

  T.post('statuses/update', { status: `${message}` }, (err, data, response) => {
    console.log('Successfully posted to Twitter!');
  });
  removeFromDb(id);
};

const getTweet = (id) => {
  console.log(id);
  find(id, (err, res) => {
    if (err) return console.log(err);
    const { message, token, token_secret } = res;
    user.access_token = token;
    user.access_token_secret = token_secret;
    sendTweet(message, user, id);
  });
};

const nextToTweet = () => {
  const scheduleArray = [];
  tweetQueue.forEach((tweet) => {
    scheduleArray.push({
      id: tweet.tweetId,
      job: schedule.scheduleJob(tweet.date, () => {
        console.log('The answer to life, the universe, and everything!' + tweet.tweetId);
        getTweet(tweet.tweetId);
      }),
    });
  });
  tweetQueue = [];
};

/*
  INSERT INTO DB, UPDATE/SORT QUEUE, VERIFY NEXT TO TWEET
*/

app.post('/post', ({ body: { message, time } }, res) => {
  newTweet.message = message;
  newTweet.date = time;
  insert(newTweet, (err, id) => {
    if (err) return console.log(err);
    tweetQueue.push({ date: time, tweetId: id });
    tweetQueue.sort((a, b) => a.date - b.date);
    nextToTweet();
  });
});

/*

PASSPORT AUTH

*/

app.get('/auth/twitter/login', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/',
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

// Filter stale tweets and push to queue
const processTweets = (tweets) => {
  const tweetBatch = tweets.filter(tweet => tweet.date - Date.now() > 10000);
  tweetBatch.forEach((tweet) => { tweetQueue.push({ date: tweet.date, tweetId: tweet._id }); });
  nextToTweet();
};

async function getTweetsFromDatabase() {
  // Get all tweets
  await findAll((err, data) => {
    if (err, null) return console.log(err);
    processTweets(data);
  });
}

getTweetsFromDatabase();
