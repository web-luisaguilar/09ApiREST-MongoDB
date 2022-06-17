'use strict';

const app = require('./app.js');

const server = app.listen(app.get('port'), () => {
  console.log(`Server en: http://localhost:${app.get('port')}`);
});
