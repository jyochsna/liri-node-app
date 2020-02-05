
require("dotenv").config();

//require npm packages
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

//for keys.js file
var keys = require("./keys.js");

//initialize spotify
var spotify = new Spotify(keys.spotify);
var spotifyRequire = require("node-spotify-api");

//omdb and bandsInTown API
var omdbKey = keys.omdb;
var bandsInTownKey = keys.bandnpsInTownKey;

var command = process.argv[2];
var search = process.argv.slice(3).join(" ");

 
// spotify.search({ 
//     type: 'track',
//      query: 'All the Small Things' }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }
   
//   console.log(data); 
//   });

  function concert(){
      var bandsInTownURL = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";
      axios.get(bandsInTownURL)
      .then (function (response){
          console.log("----");
          console.log(response);
      })
  }