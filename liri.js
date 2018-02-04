require('dotenv').config();

var fs = require('fs');


//Grabbing data from keys.js
var keys = require('./keys.js')

//installing libraries and making requests
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var twitterKeys = new Twitter(keys.twitterKeys);
var spotify = new Spotify(keys.spotify)
//Argument's Array
var nodeArgv = process.argv;
var command = process.argv[2];
var userCommand = process.argv[3];
console.log('command', command)
console.log('userCommand', userCommand)
function doSomething(action, argument){

//Song or movie
switch (command) {
    //handle the my-tweets command
    case 'my-tweets':
        myTweets();
        break;

        //handle the my-spotify command
    case 'my-spotify':
        console.log('spotify is trying')
        music(nodeArgv);
        break;

        //handle the movie command
    case 'movie-this':
        movieThis(nodeArgv);
        break;

        //handle do-what-it-says command
    case 'do-what-it-says':
    doWhatItSays();
    break;
    //when command is not valid
    default:
        console.log("Command not valid! Please try again!");

 }
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
function music() {
    console.log("Let's play some Music!");

    var searchMusic;
    if (userCommand === undefined) {
        searchMusic = "The Sign";

    } else {
        searchMusic = userCommand;
    }

    //start spotify search
    spotify.search({ type: 'track', query: searchMusic }, function(err, data) {
        if (err) {
            console.log("Error occured: " + err);
            return;
        } else {
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Preview Here: " + data.tracks.items[0].preview_url);

        }
    });
};
console.log('before spoitify')
music();
console.log('after spoitify')

//movie function
function movieThis(){
	console.log("Lets watch some movie!");

	var searchMovie;
	if(userCommand === undefined){
		searchMovie = "Mr Nobody";
		console.log(searchMovie)

	}else{
		searchMovie = userCommand;
	};

	var url = 'http://www.omdbapi.com/?t=' + searchMovie +'&y=&plot=long&tomatoes=true&r=json&apikey=trilogy';
	console.log(url)
     request(url, function(error, response, body){
     	if(!error && response.statusCode == 200){
     		console.log("Title: " + JSON.parse(body)["Title"]);
     		console.log("Year: " + JSON.parse(body)["Year"]);
     		console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
     		console.log("Country: " + JSON.parse(body)["Country"]);
     		console.log("Language: " + JSON.parse(body)["Language"]);
     		console.log("Plot: " + JSON.parse(body)["Plot"]);
     		console.log("Actors: " + JSON.parse(body)["Actors"]);



     	}
     });
     console.log('after request function')
};

//do-what-it-says function
function doWhatItSays(){
	fs.readFile("random.txt", "utf8", function(err,data){
		if(err){
			logOutput.error(err);
		}else{
			var randomArray = data.split(",");

			action = randomArray[0];
			argument = randomArray[1];
			doSomething(action,argument);
		}
	});
};
//log data to the terminal and output to a text file

function logOutput(logText){
	log.info(logText);
	console.log(logText);
}

doSomething(command, userCommand)


































