'use strict';
const MovieModel = require('../models/movie-model');
const MovieController = () => {};

MovieController.getAll = (req, res, next) => {
  MovieModel.getAll((docs) => {
    let locals = {
      title: 'Lista de Peliculas',
      data: docs,
    };
    console.log(docs);
    if (docs.length === 0) {
      res.redirect('/agregar');
    } else {
      res.render('index', locals);
    }
  });
};

MovieController.getOne = (req, res, next) => {
  let movie_id = req.params.movie_id;

  MovieModel.getOne(movie_id, (docs) => {
    let locals = {
      title: 'Editar Peliculas',
      data: docs,
    };

    res.render('edit-movie', locals);
  });
};

MovieController.insert = (req, res, next) => {
  let { movie_id, title, realease, rating, image } = req.body;
  let movie = {
    movie_id,
    title,
    realease,
    rating,
    image,
  };

  MovieModel.insert(movie, (err, rows) => {
    if (err) {
      let locals = {
        title: `Error al agregar el registro con id: ${movie_id}`,
        description: 'Error de Sintaxis SQL',
        error: err,
      };
      res.render('error', locals);
    } else {
      res.redirect('/');
    }
  });
};

MovieController.update = (req, res, next) => {
  let { movie_id, title, realease, rating, image } = req.body;
  let movie = {
    movie_id,
    title,
    realease,
    rating,
    image,
  };
  MovieModel.update(movie, (err) => {
    if (err) {
      let locals = {
        title: `Error al editar el registro con id: ${movie_id}`,
        description: 'Error de Sintaxis SQL',
        error: err,
      };
      res.render('error', locals);
    } else {
      res.redirect('/');
    }
  });
};

MovieController.save = (req, res, next) => {
  let { movie_id, title, realease, rating, image } = req.body;
  let movie = {
    movie_id,
    title,
    realease,
    rating,
    image,
  };
  MovieModel.save(movie, () => res.redirect('/'));
};

MovieController.delete = (req, res, next) => {
  let movie_id = req.params.movie_id;

  MovieModel.delete(movie_id, () => res.redirect('/'));
};

MovieController.addForm = (req, res, next) =>
  res.render('add-movie', { title: 'Agregar Peliculas' });

MovieController.error404 = (req, res, next) => {
  let error = new Error(),
    locals = {
      title: 'Error 404',
      description: 'Recurso no Encontrado',
      error: error,
    };

  error.status = 404;
  res.render('error', locals);
  next();
};

module.exports = MovieController;
