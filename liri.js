

//Grabbing data from keys.js
var fs = require('fs');

var Keys = require('./keys.js');
var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');

var twitterKeys = new twitter(keys.twitterKeys);

//Argument's Array
var nodeArgv = process.argv;
var command = process.argv[2];

//Song or movie
switch (command){
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

	default:
	console.log("Command not valid! Please try again!");

}



 