
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
var inputSearch = process.argv.slice(3).join(" ");



concert = () => {
    var bandsInTownURL = "https://rest.bandsintown.com/artists/" + inputSearch + "/events?app_id=" + bandsInTownKey;
    axios.get(bandsInTownURL)
        .then((response) => {
            var results = response.data
            if (results.length === 0) {
                console.log("It looks like " + inputSearch + "is not performing. Try a different artist")
            } else {
                console.log("\nUpcoming shows for: " + inputSearch + "\n");

            } for (var i = 0; i < results.length; i++) {

                var eventDate = moment(results[i].datetime).format("MMM Do YYY");
                console.log("Venue Name : " + results[i].venue.name);
                console.log("Venue Location: " + results[i].venue.city + "," + results[i].venue.country);
                console.log("Event Date: " + eventDate);
            }
        })
    }
    getSpotify=()=>{
        if(inputSearch === ""){
            spotify.search({ type: "track", query: "The Sign"}, function(err, data){
                if (err){
                    return console.log(err);
                }
                console.log("\nYou didn't enter a song to search");
                console.log("\n...You might like...\n");
                console.log("Artist Name: " + data.tracks.items[4].artists.name)
                console.log("Song's Name: " + data.tracks.items[4].name)
                console.log("Song's Preview Link: " + data.tracks.items[4].previe_url);
                console.log("Album Name: " + data.tracks.items[4].album.name);
                console.log("\n--------\n");
            })
        } else {
            spotify.search({ type:"track", query: inputSearch}, function(err, data){
                if (err){
                    return console.log("error occurred: " + err);
                }
                console.log("\n---songs information---\n");
                var songs = data.tracks.items;
                for (var i=0; i<songs.length; i++ ){
                    console.log("Artist Name:" + songs[i].artists[0].name )
                    console.log("Song's Name: " + songs[i].name);
                    console.log("Song's Preview Link: " + songs[i].preview_url);
                    console.log("Album Name: " + songs[i].album.name);
                    console.log("\n-----\n");
                }
            });
        }
    };
// getSpotify();

getMovie = ()=>{
    if(inputSearch ===""){
        console.log("\nPlease enter a Movie name to search");
        console.log("\n--Here is one suggestion for you--\n");
        console.log("If you haven't watched \"Mr Nobody\", then you should:");
        console.log("<http://www.imdb.com/title/tt0485947/>");
        console.log("It's on Netflix!");
    } else{
        var movieUrl = "https://www.omdbapi.com/?apikey=" + "trilogy"+ "&t=" + inputSearch;
        axios.get(movieUrl).then((response)=>{
            var results = response.data;
            console.log("\n-----Movie Result------\n");
            console.log("Movie Title: " + results.Title);
            console.log("Release Year: " + results.Year);
            console.log("Imdb Rating: " + results.Ratings.imdbRating );
            console.log("Rotten Tomatoes Rating: " + results.Ratings[1].Value);
            console.log("Country of Production: " + results.Country);
            console.log("Language: " + results.Language);
            console.log("Plot: " + results.Plot);
            console.log("Actors: " + results.Actors);
            
        })
        .catch((err) =>{
            console.log(err);
        })
    }
};


     getMovie();       

           
           
          
           
           
  





// //for test spotify
// getSpotify=()=>{
// spotify.search({ 
//     type: 'track',
//      query: inputSearch }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }else{
//     console.log(data);
//     }
//     var songs = data.tracks.items;
//     for(var i =0; i<songs.length; i++) {
//         console.log(songs[i])
//     }
//      }
// )
//     }
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
// concert();