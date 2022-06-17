'use strict';

const MovieController = require('../controllers/movie-controller');
const express = require('express'),
  router = express.Router();

router
  .get('/', MovieController.getAll)
  .get('/agregar', MovieController.addForm)
  //.post('/', MovieController.insert)
  .post('/', MovieController.save)
  .get('/editar/:movie_id', MovieController.getOne)
  //.put('/actualizar/:movie_id', MovieController.update)
  .put('/actualizar/:movie_id', MovieController.save)
  .delete('/eliminar/:movie_id', MovieController.delete)

  .use(MovieController.error404);

module.exports = router;
