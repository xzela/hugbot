hugbot
=============
A Node.js Twitter bot that sends people hugs and occasionally pugs.

Uses the Twitter Streaming API with [ntwitter](https://github.com/AvianFlu/ntwitter).


## Setting up twitter credentials

Before you can start making calls to Twitter you'll need to make include your twitter API credentials. Make a file called `auth.js` in the root directory and add the following code:

```
exports.getAuth = function() {
	return {
		consumer_key: '', // fill with your info
		consumer_secret: '',
		access_token_key: '',
		access_token_secret: ''
	};
}
```

## Using the Auth in the App

To access the credentials call the `getAuth()` method.

```
var auth = require('./auth');
var bot = new ntwitter(auth.getAuth());
```