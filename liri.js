require("dotenv").config();

//require npm packages
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys.js");
//for keys.js file

console.log("KEYS BELOW");
console.log(keys.APIKeys.omdb_key);

//initialize spotify
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.APIKeys);

//omdb and bandsInTown API
var omdbKey = keys.omdb;
var bandsInTownKey = keys.bandsInTown;
console.log("---test---");
console.log(bandsInTownKey);

var command = process.argv[2];

var inputSearch = process.argv.slice(3).join(" ");

//Take in following commands

//get concert function
concert = () => {
  var bandsInTownURL =
    "https://rest.bandsintown.com/artists/" +
    inputSearch +
    "/events?app_id=" +
    bandsInTownKey;
  axios.get(bandsInTownURL).then((response) => {
    var results = response.data;
    if (results.length === 0) {
      console.log(
        "It looks like " +
          inputSearch +
          "is not performing. Try a different artist"
      );
    } else {
      console.log("\nUpcoming shows for: " + inputSearch + "\n");
    }
    for (var i = 0; i < results.length; i++) {
      var eventDate = moment(results[i].datetime).format("MMM Do YYY");
      console.log("Venue Name : " + results[i].venue.name);
      console.log(
        "Venue Location: " +
          results[i].venue.city +
          "," +
          results[i].venue.country
      );
      console.log("Event Date: " + eventDate);
    }
  });
};

// Spotify Function
getSpotify = () => {
  if (inputSearch === "") {
    spotify.search({ type: "track", query: "The Sign" }, function (err, data) {
      if (err) {
        return console.log(err);
      }
      console.log("\nYou didn't enter a song to search");
      console.log("\n...You might like...\n");
      console.log("Artist Name: " + data.tracks.items[4].artists.name);
      console.log("Song's Name: " + data.tracks.items[4].name);
      console.log("Song's Preview Link: " + data.tracks.items[4].previe_url);
      console.log("Album Name: " + data.tracks.items[4].album.name);
      console.log("\n--------\n");
    });
  } else {
    spotify.search({ type: "track", query: inputSearch }, function (err, data) {
      if (err) {
        return console.log("error occurred: " + err);
      }
      console.log("\n---songs information---\n");
      var songs = data.tracks.items;
      for (var i = 0; i < songs.length; i++) {
        console.log("Artist Name:" + songs[i].artists[0].name);
        console.log("Song's Name: " + songs[i].name);
        console.log("Song's Preview Link: " + songs[i].preview_url);
        console.log("Album Name: " + songs[i].album.name);
        console.log("\n-----\n");
      }
    });
  }
};
// getSpotify();
// Movie Function
getMovie = () => {
  if (inputSearch === "") {
    console.log("\nPlease enter a Movie name to search");
    console.log("\n--Here is one suggestion for you--\n");
    console.log('If you haven\'t watched "Mr Nobody", then you should:');
    console.log("<http://www.imdb.com/title/tt0485947/>");
    console.log("It's on Netflix!");
  } else {
    var movieUrl =
      "https://www.omdbapi.com/?apikey=" + "trilogy" + "&t=" + inputSearch;
    axios
      .get(movieUrl)
      .then((response) => {
        var results = response.data;
        console.log("\n-----Movie Result------\n");
        console.log("Movie Title: " + results.Title);
        console.log("Release Year: " + results.Year);
        console.log("Imdb Rating: " + results.Ratings.imdbRating);
        console.log("Rotten Tomatoes Rating: " + results.Ratings[1].Value);
        console.log("Country of Production: " + results.Country);
        console.log("Language: " + results.Language);
        console.log("Plot: " + results.Plot);
        console.log("Actors: " + results.Actors);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
// getMovie();
//do-what-it-says function
doWhatItSays = () => {
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      var txtArray = data.split(",");
      {
        if (txtArray[0] === "spotify-this-song") {
          spotify.search({ type: "track", query: txtArray[1] }, function (
            err,
            data
          ) {
            if (err) {
              console.log(err);
            } else {
              console.log(
                "Artist Name : " + data.tracks.items[0].artists[0].name
              );
              console.log("Song Title : " + data.tracks.items[0].name);
              console.log(
                "Song preview url : " + data.tracks.items[0].preview_url
              );
              console.log("Album name : " + data.tracks.items[0].album.name);
              console.log("\n--------------\n");
            }
          });
        }
      }
    }
  });
};
// liri function
runLiri = () => {
  if (!command) {
    console.log("\nEnter one of the following Commands to search\n");
    console.log('\n node liri.js movie-this "Movie Title" ');
    console.log('\n node liri.js concert-this "Artist Name" ');
    console.log('\n node liri.js spotify-this-song "Song Title" ');
    console.log("\n node liri.js do-what-it-says: ");
  } else if (command === "movie-this") {
    getMovie();
  } else if (command === "concert-this") {
    if (inputSearch) {
      concert();
    } else {
      console.log("Enter an Artist to find where they're performing next!");
    }
  } else if (command === "spotify-this-song") {
    getSpotify();
  } else if (command === "do-what-it-says") {
    doWhatItSays();
  }
};
runLiri();
