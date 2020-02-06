
require("dotenv").config();

//require npm packages
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

//for keys.js file
var keys = require("./keys.js");
console.log("KEYS BELOW")
console.log(keys.APIKeys.omdb_key)

//initialize spotify
// var spotify = new Spotify(keys.spotify);
// var spotifyRequire = require("node-spotify-api");

//omdb and bandsInTown API
var omdbKey = keys.omdb;
var bandsInTownKey = keys.APIKeys.band_key;
console.log("---test---")
console.log(bandsInTownKey);

var command = process.argv[2];
var search = process.argv.slice(3).join(" ");



   concert=()=>{
      var bandsInTownURL = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=" + bandsInTownKey;
      axios.get(bandsInTownURL)
      .then ( (response) => {
          var results = response.data
          if (results.length === 0) {
              console.log("It looks like" + search + "is not performing. Try a different artist")
          }else{
              console.log("\nUpcoming shows for: " + search + "\n");
          }for (var i = 0; i < response.data.length; i++){
              var eventDate = moment(response.data[i])
          }
          console.log("----");
          console.log(response);
      })
  }



//for spotify
 
spotify.search({ 
    type: 'track',
     query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });

  concert();