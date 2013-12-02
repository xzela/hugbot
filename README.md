hugbot
=============
A Node.js Twitter bot that sends people hugs and occasionally pugs.

Uses the Twitter Streaming API with [ntwitter](https://github.com/AvianFlu/ntwitter).

## Installing hugbot dependencies

Run the following command to install the latest dependencies: 

``` 
$ npm install
```

This will install the lastest version of `ntwitter` by [@avianflu](https://github.com/AvianFlu)


## Setting up twitter credentials

Before you can start making calls to Twitter you'll need to make include your twitter API credentials. Make a file called `auth.js` in the root directory and add the following code:

```
function getAuth() {
	return {
		consumer_key: '',
		consumer_secret: '',
		access_token_key: '',
		access_token_secret: ''
	};
}

module.exports.getAuth = getAuth;
```

## Using the Auth in the App

To access the credentials call the `getAuth()` method.

```
var auth = require('./auth');
var bot = new ntwitter(auth.getAuth());
```