var ntwitter = require('ntwitter');
var auth = require('./auth');

var bot = new ntwitter(auth.getAuth());

// Get a random number from 1 to 10
function getRandNum() {
  var number = Math.floor((Math.random()*10)+1);
  return number;
}

// Get a random element from an array
function getRandIndex(array) {
  var index = Math.floor(array.length*Math.random());
  return array[index];
}

// Get a random pug image
function getRandPug() {
  pugs = [
    'http://bit.ly/1boVVNH',
    'http://on.vh1.com/18q12eV',
    'http://bit.ly/1aVWjl3',
    'http://bit.ly/Ik6yoi',
    'http://bit.ly/1aZrkng',
    'http://bit.ly/18oFYqv',
    'http://bit.ly/doqglS',
    'http://bit.ly/195gk56'
  ];
  return getRandIndex(pugs);
}

// Log errors
var callback = function handleError(error) {
  if (error) {
    console.error('response status:', error.statusCode);
    console.error('data:', error.data);
  }
};

// Array to store streamed tweets
var queue = [];

// Get a stream of Tweets
function startStreaming() {
  bot.stream('statuses/filter', { track: 'need a hug, want a hug, need hugs, want hugs' }, function(stream) {
    console.log('Listening for Tweets...');
    stream.on('data', function(tweet) {
      var number = getRandNum(),
        pugPic = getRandPug(),
        params = {};

      console.log(tweet.text)
      // Check Tweet for specific matching phrases as Twitter's Streaming API doesn't allow for this
      if (tweet.text.match(/need\sa\shug|want\sa\shug|need\shugs|want\shugs/)) {
        // 90% chance of hug
        if (number <= 9) {
          params = {
            status: '@' + tweet.user.screen_name + ' HUGBOT SENDS HUGS',
            in_reply_to_status_id: tweet.id
          };
        } else { // 10% chance of pug
          params = {
            status: '@' + tweet.user.screen_name + ' hugs over the internet can be tricky, but luckily, pugs are plentiful ' + pugPic,
            in_reply_to_status_id: tweet.id
          };
        }
        queue.push(params);
      }
    });
  });
}

// Post 10 random Tweets every 15 minutes
setInterval(function() {
  var index, sampleTweet,
    limit = 10;
  console.log(queue);
  if (queue.length < limit) {
    limit = queue.length;
  }
  // Loop through queue to randomly select 10 Tweets
  for (var i = 0; i < limit; i++) {
    index = Math.floor(Math.random() * queue.length);
    sampleTweet = queue.splice(index, 1);
    console.log(i+1);
    console.log(sampleTweet[0]);

    //bot.updateStatus(sampleTweet[0], sampleTweet[0], callback);
  }
  // Reset the queue
  queue = [];
}, 1000*60);

// Start streaming Tweets
startStreaming();
