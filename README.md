<h1>LIRI NODE APP <h1>

LIRI Bot is a command line interface (CLI) application that allows users to search for information about songs, movies, and artists' concert tour schedules within the command line. The information that the command line returns to the user is served via the <span style="color:blue; font-weight:bold"><a href ="https://developer.spotify.com/documentation/web-api/">Spotify</span></a>, OMDb, and Bandsintown APIs. Since the application runs in the command line and not a browser, the npm packages axios and node-spotify-api were installed to retrieve API data.

##Other npm packages used:

Moment

Used to format the concert date retrieved from the Bandsintown API
DotEnv

Allowed for creation of .env file that was used to store Spotify API keys
file-system

Required to read random.txt file that stored information for a random search in the command line