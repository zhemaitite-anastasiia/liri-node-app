var fs = require('fs');


//Grabbing data from keys.js
var Keys = require('./keys.js');
//installing libraries and making requests
var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');

var twitterKeys = new twitter(keys.twitterKeys);

//Argument's Array
var nodeArgv = process.argv;
var command = process.argv[2];
var userCommand = process.argv[3];

//Song or movie
switch (command) {
    //handle the my-tweets command
    case 'my-tweets':
        myTweets();
        break;

        //handle the my-spotify command
    case 'my-spotify':
        mySpotify(nodeArgv);
        break;

        //handle the movie command
    case 'movie-this':
        movieThis(nodeArgv);
        break;

        //handle do-what-it-says command
    case 'do-what-it-says';
    doWhatItSays();
    break;
    //when command is not valid
    default:
        console.log("Command not valid! Please try again!");

}

//if the my-tweets function received
function myTweets() {
	console.log("Tweets are on your way!");

    //setting up credentials object for Twitter access
    var client = new Twitter({
        consumer_key: twitterKeys.consumer_key,
        consumer_secret: twitterKeys.consumer_secret,
        access_token_key: twitterKeys.access_token_key,
        access_token_secret: twitterKeys.access_token_secret
    })

    client.get('statuses/user_timeline', function(error, tweets, response) {
        if (error) {
            console.log(error);
            return;
            // going through tweets, to a maximum of 20 but no mmore tweets than on account
            for (var i = 0; i < Math.min(20, tweets.length); i++) {
                output += tweets[i].created_at + "\n" + tweets[i].text + "\n";

            }
        }
    })
}

//if the my-spotify function received
function spotify(){
	console.log("Let's play some Music!");

	var searchMusic;
	if( userCommand === undefined){
		searchMusic = "The Sign";

	}else{
		searchMusic = userCommand;
	}

	//start spotify search
	spotify.search({type:'track', query:searchMusic}, function(err,data){
		if(err){
			console.log("Error occured: " + err);
			return;
		}else{
			console.log("Artist: " + data.tracks.items[0].artists[0].name);
			console.log("Song: " + data.tracks.items[0].name);
			console.log("Album: " + data.tracks.items[0].album.name);
			console.log("Preview Here: " + data.tracks.items[0].preview_url);

		}
		});
	};
}












