const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/twitter');

const db = mongoose.connection;

const tweetSchema = mongoose.Schema({
  // id: { type: Number, index: true, required: true },
  user: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: String, required: true },
  token: { type: String, required: true },
  token_secret: { type: String, required: true },
});

const Tweet = mongoose.model('Tweet', tweetSchema);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('we\'re connected!');
});

/*          Methods           */

mongoose.Promise = Promise;

const insert = (tweetObj, callback) => {
  Tweet.create(tweetObj, (err, entry) => {
    if (err) return callback(err, null);
    callback(null, entry._id);
  });
};

const find = (id, callback) => {
  Tweet.findById(id, (err, res) => {
    if (err) return callback(err);
    callback(res);
  });
};

module.exports = {
  insert,
  find,
};
