'use strict';

const mongoose = require('mongoose'),
  conf = require('./db-conf.json'),
  { host, db } = conf.mongo,
  Schema = mongoose.Schema,
  MovieSchema = new Schema(
    {
      movie_id: 'string',
      title: 'string',
      realease: 'string',
      rating: 'string',
      image: 'string',
    },
    {
      collection: 'movie',
    }
  );

const MovieModel = mongoose.model('Movie', MovieSchema);

mongoose.connect(`mongodb:\/\/${host}/${db}`);

module.exports = MovieModel;
