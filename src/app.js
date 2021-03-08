const express = require('express');
const { Artist } = require('./models');

const app = express();

app.use(express.json());

app.post("/artists", (req, res) => {
    Artist.create(req.body).then(artist => res.status(201).json(artist));
});

module.exports = app