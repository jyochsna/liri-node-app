
require("dotenv").config();

//require npm packages
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys.js");
//for keys.js file

console.log("KEYS BELOW")
console.log(keys.APIKeys.omdb_key)

//initialize spotify
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.APIKeys);


//omdb and bandsInTown API
var omdbKey = keys.omdb;
var bandsInTownKey = keys.bandsInTown;
console.log("---test---")
console.log(bandsInTownKey);

var command = process.argv[2];
var search = process.argv.slice(3).join(" ");



concert = () => {
    var bandsInTownURL = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=" + bandsInTownKey;
    axios.get(bandsInTownURL)
        .then((response) => {
            var results = response.data
            if (results.length === 0) {
                console.log("It looks like " + search + "is not performing. Try a different artist")
            } else {
                console.log("\nUpcoming shows for: " + search + "\n");

            } for (var i = 0; i < results.length; i++) {

                var eventDate = moment(results[i].datetime).format("MMM Do YYY");
                console.log("Venue Name : " + results[i].venue.name);
                console.log("Venue Location: " + results[i].venue.city + "," + results[i].venue.country);
                console.log("Event Date: " + eventDate);
            }



            console.log("----");
            //  b
        })
}



// //for spotify
// getSpotify=()=>{
// spotify.search({ 
//     type: 'track',
//      query: search }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }else{
//     console.log(data);
//     }
//     var songs = data.tracks.items;
//     for(var i =0; i<songs.length; i++) 
//   });
// }
//  getSpotify();
// //for movie
// movieThis=()=>{
//     if(search===""){
//         console.log("\n you didn't enter movie to search");

// }else{
//     var movieUrl = "https://www.omdbapi.com/?apikey=" + omdbKey + "&t=" + search;
//     axios.get(movieUrl).then((response) =>{
//         console.log("\n....\n");

//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// }
// };

//do what it says
// doWhatItSays = () =>{

// }
concert();