const Twit = require('twit');

const makeTweet = (message, auth) => {
  const T = new Twit(auth);

  T.post('statuses/update', { status: `${message}` }, (err, data, response) => {
    console.log(data);
  });
};

module.exports= {
  makeTweet,
};
