console.log('Bot started..');
var Twit = require('twit')
var config = require('./config')
var T = new Twit(config)
var previousTweet;
var count =0;
setInterval(getFun, 1000 *60*60*6)
function getFun() {
    getTweet()
}
function getTweet() {
    T.get('search/tweets', { q: '@nytimes', count: 1 }, function (err, data, response) {
        try {

            if (previousTweet != data.statuses[0].text) {
                previousTweet = data.statuses[0].text;
                postTweet(previousTweet);
            }

        } catch (err) {
            console.log('err')
        }
    })
}
function postTweet(TweetStr) {
    T.post('statuses/update', { status: TweetStr }, function(err, data, response) {
        console.log('Posted '+(++count)+' Tweet');    
      })
}
