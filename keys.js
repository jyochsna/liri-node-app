console.log('this is loaded');

exports.APIKeys = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET,
  // omdb_key:process.env.OMDBKey,
  // band_key:process.env.BandsInTownKey
};
exports.omdb = {
  key: process.env.OMDBKey,
};

exports.bandsInTown = {
  key: process.env.BandsInTownKey,
}
