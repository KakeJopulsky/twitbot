const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/twitter');

const db = mongoose.connection;

const tweetSchema = mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, required: true },
});

const Tweet = mongoose.model('Tweet', tweetSchema);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('we\'re connected!');
});

/*          Methods           */

mongoose.Promise = Promise;

const insert = (tweet) => {
  const newTweet = new Tweet({ user: tweet.username, text: tweet.message, date: tweet.date });
  return newTweet.save();
};

module.exports = {
  insert,
};
