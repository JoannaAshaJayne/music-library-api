/* src/models/artist.js */
module.exports = (connection, DataTypes) => {
    const schema = {
      name: DataTypes.STRING,
      genre: DataTypes.STRING,
    };
  
    const ArtistModel = connection.define('Artist', schema);
    return ArtistModel;
  };
  /* src/controllers/artists.js */
exports.getArtistById = (req, res) => {
  const { id } = req.params;
  Artist.findByPk(id).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      res.status(200).json(artist);
    }
  });
};