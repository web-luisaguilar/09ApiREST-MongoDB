'use strict';

let express = require('express'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  methodOverride = require('method-override'),
  routes = require('./routes/movie-router'),
  publicDir = express.static(`${__dirname}/public`),
  viewDir = `${__dirname}/views`,
  port = process.env.PORT || 3000,
  app = express();

app
  .set('views', viewDir)
  .set('view engine', 'jade')
  .set('port', port)

  //Midlewares
  //parse application/json
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(methodOverride('X-HTTP-Method-Override'))
  .use(methodOverride('_method'))
  .use(
    methodOverride((req, res) => {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
    })
  )
  .use(logger('dev'))
  .use(publicDir)
  .use(routes);

module.exports = app;
