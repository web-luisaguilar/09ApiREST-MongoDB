'use strict';

const conn = require('./movie-connection');
const MovieModel = () => {};

MovieModel.getAll = (cb) => {
  conn.find().exec((err, docs) => {
    if (err) throw err;
    cb(docs);
  });
};

MovieModel.getOne = (id, cb) => {
  conn.findOne({ movie_id: id }).exec((err, docs) => {
    if (err) throw err;
    cb(docs);
  });
};

MovieModel.update = (data, cb) => {};

MovieModel.save = (docs, cb) => {
  conn.count({ movie_id: docs.movie_id }).exec((err, count) => {
    if (err) throw err;
    console.log(`Numero: ${count}`);
    if (count === 0) {
      conn.create(docs, (err) => {
        if (err) throw err;
        cb();
      });
    } else if (count === 1) {
      let { title, realease, rating, image } = docs;
      conn.findOneAndUpdate(
        { movie_id: docs.movie_id },
        { title, realease, rating, image },
        (err) => {
          if (err) throw err;
          cb();
        }
      );
    }
  });
};

MovieModel.delete = (id, cb) => {
  conn.remove({ movie_id: id }, (err) => {
    if (err) throw err;
    cb();
  });
};

module.exports = MovieModel;
