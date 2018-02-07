require('dotenv').config();

var fs = require('fs');


//Grabbing data from keys.js
var keys = require('./keys.js')

//installing libraries and making requests
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
console.log(keys.twitter)
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify)
//Argument's Array
var nodeArgv = process.argv;
var command = process.argv[2];
var userCommand = process.argv[3];
console.log('command', command)
console.log('userCommand', userCommand)

doSomething(command, userCommand)

function doSomething(action, argument){
	console.log(action)

//Song or movie
switch (action) {
    //handle the my-tweets command
    case 'my-tweets':
        myTweets();
        break;
        //handle the my-spotify command
    case 'my-spotify':
        music(argument);
        break;
        //handle the movie command
    case 'movie-this':
        movieThis(argument);
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

    var params = {screen_name: 'avo_coder'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i=0; i<tweets.length; i++){
        var date = tweets[i].created_at;
    console.log("@avo_coder: " + tweets[i].text + " Created At: " + date.substring(0, 19));
    console.log("----------------------");
}
}
});

}


//if the my-spotify function received
function music(argument) {
    console.log("Let's play some Music!");

    var searchMusic;
    if (argument === undefined) {
        searchMusic = '"The Sign" by Ace of Base';

    } else {
        searchMusic = argument;
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

//music();


//movie function
function movieThis(argument){
	console.log("Lets watch some movie!");

	var searchMovie;
	if(argument === undefined){
		searchMovie = "Mr Nobody";
		//console.log(searchMovie)

	}else{
		searchMovie = argument;
	};

	var url = 'http://www.omdbapi.com/?t=' + searchMovie +'&y=&plot=long&tomatoes=true&r=json&apikey=trilogy';
	//console.log(url)
     request(url, function(error, response, body){
     	if(!error && response.statusCode == 200){
     		console.log("Title: " + JSON.parse(body)["Title"]);
     		console.log("Year: " + JSON.parse(body)["Year"]);
     		console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
            //console.log("Rotten Tomatoes Rating" + JSON.parse(body)["RottenTomatoes"]);
     		console.log("Country: " + JSON.parse(body)["Country"]);
     		console.log("Language: " + JSON.parse(body)["Language"]);
     		console.log("Plot: " + JSON.parse(body)["Plot"]);
     		console.log("Actors: " + JSON.parse(body)["Actors"]);



     	}
     });
     //console.log('after request function')
};

//do-what-it-says function
function doWhatItSays(){
	//console.log('run')
	fs.readFile("random.txt", "utf8", function(err,data){
		if(err){
			logOutput.error(err);
		}else{
			console.log(data)
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




































