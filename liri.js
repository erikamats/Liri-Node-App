// import { twitter } from "./keys.js";


//   Variables
var dot = require("dotenv").config();

var keys = require("./keys.js");

var Twitter = require('twitter');
var nodeArgs = process.argv[2];

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var nameMovie = process.argv[3];

var request = require("request");

var queryUrl = "http://www.omdbapi.com/?t=" + nameMovie + "&y=&plot=short&apikey=trilogy";

var mrUrl = "http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy";

var songName = process.argv[3];

var sign = "The Sign";

var fs = require('fs');



//  functions

function theTweets() {
    var client = new Twitter(keys.twitter)

    var params = { screen_name: 'matsimats1' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            for (var i = 0; i < tweets.length; i++) {

                console.log(tweets[i].text + "-" + tweets[i].created_at);

                console.log("--------------");
            }

        }
    });
}

function music() {

    spotify.search(
        { type: 'track', query: songName}, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        
            console.log(data.body)
        }

        // Artist(s)
        console.log("=====================");
        console.log("This is the Artist:");
        console.log(data.tracks.items[0].artists[0].name);

        // The song's name
        console.log("=====================");
        console.log("This is the Song:");
        console.log(data.tracks.items[0].name);

        // A preview link of the song from Spotify
        console.log("=====================");
        console.log("Preview link below");
        console.log("Preview: " + data.tracks.items[0].preview_url);

        // The album that the song is from
        console.log("=====================");
        console.log("The Album Name");
        console.log(data.tracks.items[0].album.name);

    });
}

function noMusic() {

    spotify.search({ type: 'track', query: sign, limit: 5 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

            // Artist(s)
            console.log("=====================");
            console.log("This is the Artist:");
            console.log(data.tracks.items[1].artists[0].name);

            // The song's name
            console.log("=====================");
            console.log("This is the Song:");
            console.log(data.tracks.items[1].name);

            // A preview link of the song from Spotify
            console.log("=====================");
            console.log("Preview link below");
            console.log("Preview: " + data.tracks.items[1].preview_url);

            // The album that the song is from
            console.log("=====================");
            console.log("The Album Name");
            console.log(data.tracks.items[1].album.name);

    });
}
function movie() {

    request(queryUrl, function (error, response, body) {
        console.log("--------------");
        console.log("Movie Info");
        console.log("--------------");
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("--------------");
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("--------------");
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("==============");
    });
}

function mrMovie() {

    request(mrUrl, function (error, response, body) {
        console.log("--------------");
        console.log("Movie Info");
        console.log("--------------");
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("--------------");
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("--------------");
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("==============");



    });
}

function random() {
    
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
          }

          var dataArr = data.split(",");

          nodeArgs = dataArr[0];
          songName = dataArr[1];
       
       name();

          

        });
       
};


function name() {
    if (nodeArgs === "my-tweets") {
        theTweets();

    } else if (nodeArgs === "spotify-this-song" && songName) {
        music();

    } else if (nodeArgs === "spotify-this-song" && !songName) {
        noMusic();

    } else if (nodeArgs === "movie-this" && nameMovie) {
        movie();
    } else if (nodeArgs === "movie-this" && !nameMovie) {
        mrMovie();
    }else if (nodeArgs === "do-what-it-says") {
        random();
    }
}

name();